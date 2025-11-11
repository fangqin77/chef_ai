<template>
  <view class="page">

    <!-- 顶部栏 -->
    <view class="header">
      <text class="title">美食圈</text>
      <text class="add" @click="onCreate">＋</text>
    </view>

    <!-- 动态列表 -->
    <view class="feed">
      <!-- 加载状态 -->
      <view class="loading-state" v-if="loading">
        <view class="loading-spinner"></view>
        <text class="loading-text">加载中...</text>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-else-if="!loading && posts.length === 0">
        <image class="empty-icon" src="/static/picture/profile.png" mode="aspectFit"></image>
        <text class="empty-title">暂无动态</text>
        <text class="empty-desc">快来发布第一条美食分享吧</text>
        <button class="empty-btn" @click="onCreate">发布动态</button>
      </view>
      
      <!-- 帖子列表 -->
      <view class="post" :class="{ 'highlighted': p._highlighted }" v-for="p in posts" :key="p.id" v-else>
        <view class="post-top">
          <image class="avatar" :src="p.avatar || '/static/picture/profile.png'" mode="aspectFill" @click="goToUserProfile(p)" />
          <view class="author">
            <text class="name" @click="goToUserProfile(p)">{{ p.nickname || '美食达人' }}</text>
          </view>
          <text class="more" v-if="!hasImages(p)" @click="toggleMenu(p)">···</text>
        </view>

        <view class="content">
          <text class="post-content">{{ p.content }}</text>
        </view>

        <view v-if="hasImages(p)" class="images" :class="'cols-' + gridCols(p)">
          <image v-for="(img, idx) in (getImages(p) || [])"
                 :key="idx"
                 :src="getImageUrl(img)"
                 class="img"
                 mode="aspectFill"
                 @tap="onImageTap(p, idx)"
                 @error="onImageError" />
        </view>
        <!-- 图片下方一行：左时间，右省略号 -->
        <view v-if="hasImages(p)" class="img-footer">
          <text class="time-badge">{{ displayTime(p) }}</text>
          <text class="menu-dot" @click.stop="toggleMenu(p)">···</text>
        </view>

        <view class="menu-mask" v-if="p._menuOpen" @click="closeOverlayFor(p)"></view>
        <view class="actions-menu" v-if="p._menuOpen">
          <view class="am-item" @click="toggleLike(p)">
            <text :class="['heart', p.liked ? 'liked' : '']">❤</text>
            <text>{{ p.liked ? '取消收藏' : '收藏' }}（{{ p.likes }}）</text>
          </view>
          <view class="am-item" @click="focusComment(p)">
            <text>💬</text>
            <text>评论（{{ getCommentCount(p.id) }}）</text>
          </view>
          <view class="am-item" @click="share(p)">
            <text>🔗</text>
            <text>分享</text>
          </view>
        </view>
        <!-- 隐藏底部操作栏，只保留在菜单中显示 -->

        <!-- 评论区 -->
        <view class="comments">
          <view class="c-list" v-if="getComments(p.id).length">
            <view class="c-item" v-for="(c,i) in getComments(p.id)" :key="i">
              <text class="c-name">{{ c.name }}：</text>
              <text class="c-text">{{ c.text }}</text>
              <text class="c-time">{{ c.time }}</text>
            </view>
          </view>
          <!-- 评论输入框 -->
          <view class="c-input compact" v-if="p._commenting">
            <input class="input compact"
                   :focus="focusMap[p.id]"
                   :placeholder="'评论 @' + (p.nickname || '美食达人')"
                   v-model="inputMap[p.id]"
                   @confirm="submitComment(p)"
                   @blur="endComment(p)" />
            <button class="btn micro" @tap="handleSendComment(p)" @click="handleSendComment(p)" style="z-index: 1000; position: relative;">发送</button>
          </view>
        </view>
      </view>
    </view>

    <view class="page-mask" v-if="anyOverlayOpen" @click="closeAllOverlays"></view>
    <view style="height: 24rpx;" />
  </view>
</template>

<script>
import { getCommunityPosts, likePost, cancelLikePost, createComment, recordBrowsingHistory } from '@/api/recipes';
import { getUserInfoById } from '@/api/user';

export default {
  data() {
    return {
      posts: [],
      commentsMap: {},   // { [postId]: [{name,text,time}] }
      inputMap: {},      // { [postId]: 'input text' }
      focusMap: {},      // { [postId]: boolean }
      loading: false,    // 加载状态
      sendingComment: false // 防止重复发送评论
    }
  },
  
  async onShow() {
    this.loading = true;
    
    // 添加评论更新监听器
    this.setupCommentsUpdateListener();
    
    // 获取URL参数中的postId
    const options = getCurrentPages()[getCurrentPages().length - 1].options || {};
    const targetPostId = options.postId || null;
    
    try {
      // 获取所有用户的帖子（不传入用户ID参数），确保获取全部帖子
      const response = await getCommunityPosts(1, 50); // 增加获取数量
      
      if (response && response.list) {
        // 如果接口返回的 list 为空，显示提示
        if (response.list.length === 0) {
          this.posts = [];
        } else {
          // 处理帖子数据，直接使用后端返回的用户信息
          this.posts = response.list.map((post) => {
            
            // 直接使用后端返回的用户信息
            const nickname = post.user_nickname || '美食达人';
            const avatar = post.user_avatar_url || '/static/picture/profile.png';
            
            // 处理时间显示
            const displayTime = this.getRelativeTime(new Date(post.updated_at || post.created_at).getTime());
            
            // 处理点赞数
            const likes = post.like_count || 0;
            
            // 处理评论数
            const commentCount = post.comment_count || 0;
            
            // 处理图片
            let images = [];
            if (post.media_json) {
              try {
                images = JSON.parse(post.media_json);
              } catch (e) {
                console.error('解析 media_json 失败:', e);
                images = [];
              }
            }
            
            return {
              ...post,
              nickname: nickname,
              avatar: avatar,
              time: displayTime, // 显示相对时间
              likes: likes,
              commentCount: commentCount,
              images: images,
              content: post.content || '',
              _menuOpen: false,
              _commenting: false
            };
          });
          
          // 恢复收藏状态
          this.restoreLikedStatus(this.posts);
        }
      } else {
        console.error('接口返回数据格式错误:', response);
        this.posts = [];
      }
      
      // 初始化评论和焦点状态
      const im = {};
      const fm = {};
      this.posts.forEach(post => {
        im[post.id] = '';
        fm[post.id] = false;
      });
      this.inputMap = im;
      this.focusMap = fm;
      
      // 从本地存储加载评论数据
      this.loadCommentsFromStorage();
      
        // 如果传入了targetPostId，自动滚动到对应帖子
        if (targetPostId) {
          console.log('获取到目标帖子ID:', targetPostId, '当前帖子数量:', this.posts.length);
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollToPost(targetPostId);
            }, 1000); // 增加延迟时间，确保帖子列表完全加载
          });
        }
    } catch (error) {
      console.error('获取所有用户帖子列表失败:', error);
      uni.showToast({ title: '获取帖子列表失败', icon: 'none' });
      this.posts = [];
    } finally {
      this.loading = false;
    }
  },
  
  onShareAppMessage(res) {
    return {
      title: '分享一篇美食圈作品',
      path: '/pages/social/index'
    }
  },
  computed: {
    anyMenuOpen() {
      return (this.posts || []).some(p => p && p._menuOpen)
    },
    anyOverlayOpen() {
      return (this.posts || []).some(p => p && (p._menuOpen || p._commenting))
    }
  },
  methods: {
    // 设置评论更新监听器
    setupCommentsUpdateListener() {
      // 监听评论更新事件
      uni.$on('commentsUpdated', (data) => {
        console.log('收到评论更新事件:', data);
        
        // 重新加载评论数据
        this.loadCommentsFromStorage();
        
        // 强制更新视图
        this.$forceUpdate();
        
        // 如果指定了特定帖子，可以刷新该帖子的评论显示
        if (data.postId && data.postId !== 'undefined' && data.postId !== 'unknown') {
          const postId = String(data.postId);
          console.log(`刷新帖子 ${postId} 的评论显示`);
          
          // 重新加载特定帖子的评论
          this.reloadPostComments(postId);
        } else {
          // 如果没有指定postId，刷新所有帖子的评论显示
          console.log('刷新所有帖子的评论显示');
          this.reloadAllPostsComments();
        }
      });
    },
    
    // 重新加载特定帖子的评论
    reloadPostComments(postId) {
      if (this.posts && this.posts.length > 0) {
        const post = this.posts.find(p => String(p.id) === String(postId));
        if (post) {
          // 重新加载该帖子的评论数据
          const socialComments = uni.getStorageSync('social_comments') || {};
          post.comments = socialComments[postId] || [];
          
          // 更新评论数量
          if (post.commentCount !== undefined) {
            post.commentCount = post.comments.length;
          }
        }
      }
    },
    
    // 重新加载所有帖子的评论
    reloadAllPostsComments() {
      if (this.posts && this.posts.length > 0) {
        const socialComments = uni.getStorageSync('social_comments') || {};
        
        this.posts.forEach(post => {
          const postId = String(post.id);
          if (socialComments[postId]) {
            post.comments = socialComments[postId];
            
            // 更新评论数量
            if (post.commentCount !== undefined) {
              post.commentCount = post.comments.length;
            }
          }
        });
      }
    },
    
    async onImageTap(p, idx) {
      const urls = this.getImages(p)
      const current = urls[idx] || ''
      
      // 写入浏览历史到后端
      try {
        const token = uni.getStorageSync('token')
        if (token && p.id) {
          // 调用后端API记录浏览历史
          await recordBrowsingHistory(p.id)
          console.log('浏览历史已记录到后端，帖子ID:', p.id)
        } else {
          console.log('用户未登录，跳过后端浏览历史记录')
        }
      } catch (error) {
        console.error('记录浏览历史到后端失败:', error)
        // 忽略后端错误，继续本地记录
      }
      
      // 写入本地浏览历史
      try {
        const list = uni.getStorageSync('social_history') || []
        
        // 生成唯一的key，避免重复
        const key = Date.now() + '_' + String(p.id || idx)
        
        // 检查是否已存在相同帖子的记录
        const existingIndex = list.findIndex(item => item.postId === String(p.id))
        
        if (existingIndex !== -1) {
          // 如果已存在，更新记录
          list[existingIndex].time = '刚刚'
          list[existingIndex].cover = current || (urls[0] || '')
          list[existingIndex].title = String(p.content || p.nickname || '作品').slice(0, 60)
        } else {
          // 如果不存在，添加新记录
          const entry = {
            key: key,
            postId: String(p.id || ''),
            title: String(p.content || p.nickname || '作品').slice(0, 60),
            cover: current || (urls[0] || ''),
            time: '刚刚'
          }
          list.unshift(entry)
        }
        
        // 限制历史记录数量，最多保存100条
        const next = list.slice(0, 100)
        uni.setStorageSync('social_history', next)
        
        console.log('浏览历史已记录到本地，帖子ID:', p.id)
      } catch (e) {
        console.error('记录本地浏览历史失败:', e)
      }
      
      // 预览图片（支持缩放、双指缩放、长按保存等）
      if (urls.length) {
        uni.previewImage({
          current,          // 当前显示的图片
          urls,             // 需要预览的图片链接列表
          indicator: 'number', // 显示数字指示器
          loop: true,       // 循环预览
          longPressActions: { // 长按菜单
            itemList: ['发送给朋友', '保存图片', '收藏']
          }
        })
      }
    },
    hasImages(p) {
      return !!(p && this.getImages(p).length > 0)
    },
    gridCols(p) {
      const len = this.getImages(p).length
      if (len <= 1) return 1
      if (len === 2) return 2
      return 3
    },
    // 获取图片数组
    getImages(p) {
      if (!p) return []
      
      // 处理 mediaJson 字段
      if (p.mediaJson) {
        try {
          const media = JSON.parse(p.mediaJson)
          if (Array.isArray(media)) {
            return media.map(item => {
              if (typeof item === 'string') return item
              if (item && item.url) return item.url
              return ''
            }).filter(url => url)
          }
        } catch (e) {
          console.error('解析 mediaJson 失败:', e)
        }
      }
      
      // 处理 images 字段
      if (Array.isArray(p.images)) {
        return p.images.filter(url => url)
      }
      
      return []
    },
    // 处理图片URL
    getImageUrl(img) {
      if (!img) return ''
      
      // 检查是否是有效的URL
      if (img.startsWith('http://') || img.startsWith('https://')) {
        // 如果是网络图片，直接返回
        return img
      }
      
      // 处理微信小程序临时文件路径（http://tmp/ 转为 wxfile://tmp/）
      if (img.startsWith('http://tmp/')) {
        // 在微信小程序中，临时文件路径应该是 wxfile://tmp/
        return img.replace('http://tmp/', 'wxfile://tmp/')
      }
      
      // 处理开发服务器临时文件路径
      if (img.startsWith('http://127.0.0.1')) {
        // 开发服务器临时文件可能不稳定，返回备选图片
        console.warn('开发服务器临时文件，使用备选图片:', img)
        return '/static/picture/profile.png'
      }
      
      // 处理wxfile协议路径（微信小程序专用）
      if (img.startsWith('wxfile://')) {
        return img
      }
      
      // 处理data URI图片
      if (img.startsWith('data:image/')) {
        return img
      }
      
      // 处理相对路径
      if (img.startsWith('/')) {
        return img
      }
      
      // 对于其他情况，尝试直接返回
      console.warn('处理图片路径:', img)
      return img
    },
    onCreate() {
      uni.navigateTo({ url: '/pages/social/publish' })
    },
    
    // 跳转到用户简介页面
    goToUserProfile(post) {
      if (!post || !post.id) {
        console.warn('帖子数据不完整，无法跳转到用户简介页面');
        return;
      }
      
      // 构建用户简介页面的参数
      // 注意：这里应该传递用户ID（user_id），而不是帖子ID（id）
      const params = {
        userId: post.user_id || post.id, // 优先使用user_id，如果没有则使用帖子id
        userName: post.nickname || post.name || '美食达人',
        userAvatar: post.avatar || '/static/picture/profile.png'
      };
      
      console.log('跳转到用户简介页面，参数:', params);
      
      // 编码参数
      const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
      
      uni.navigateTo({ 
        url: `/pages/profile/user-detail?${queryString}` 
      });
    },
    closeAllMenus() {
      (this.posts || []).forEach(item => {
        if (item && item._menuOpen) this.$set(item, '_menuOpen', false)
      })
    },
    closeAllOverlays() {
      (this.posts || []).forEach(item => {
        if (!item) return
        if (item._menuOpen) this.$set(item, '_menuOpen', false)
        if (item._commenting) this.$set(item, '_commenting', false)
        const id = String(item.id)
        this.$set(this.focusMap, id, false)
      })
    },
    closeOverlayFor(p) {
      if (!p) return
      // 只关闭菜单，不影响评论框
      this.$set(p, '_menuOpen', false)
    },
    toggleMenu(p) {
      // 先关闭其他帖子的菜单与评论框
      (this.posts || []).forEach(item => {
        if (!item) return
        if (item._menuOpen) this.$set(item, '_menuOpen', false)
        if (item._commenting) this.$set(item, '_commenting', false)
        const id = String(item.id)
        this.$set(this.focusMap, id, false)
      })
      // 切换当前帖子的操作菜单（使用 $set 确保响应式），并收起当前帖子的评论框
      const next = !(p && p._menuOpen)
      this.$set(p, '_menuOpen', next)
      const pid = String(p.id)
      this.$set(this.focusMap, pid, false)
      this.$set(p, '_commenting', false)
    },
    // 计算相对时间
    displayTime(p) {
      const t = p && p.time
      if (!t) return '刚刚'
      
      const s = String(t).trim().toLowerCase()
      if (!s || s === 'null' || s === 'undefined') return '刚刚'
      
      // 如果已经是相对时间格式（如：5分钟前），直接返回
      if (s.includes('前') || s.includes('分钟') || s.includes('小时') || s.includes('天') || s.includes('月') || s.includes('年')) {
        return t
      }
      
      // 如果是时间戳格式，计算相对时间
      let timestamp = null
      
      // 尝试解析时间戳（秒或毫秒）
      if (/^\d+$/.test(s)) {
        timestamp = parseInt(s)
        // 如果时间戳是秒级（小于当前时间戳的10倍），转换为毫秒
        if (timestamp < 1000000000000) {
          timestamp *= 1000
        }
      } else {
        // 尝试解析日期字符串
        try {
          timestamp = new Date(s).getTime()
        } catch (e) {
          console.warn('无法解析时间格式:', t)
          return t
        }
      }
      
      // 如果解析失败，返回原始时间
      if (!timestamp || isNaN(timestamp)) {
        return t
      }
      
      return this.getRelativeTime(timestamp)
    },
    
    // 获取相对时间（如：5分钟前、2小时前）
    getRelativeTime(timestamp) {
      const now = Date.now()
      const diff = now - timestamp
      
      // 小于1分钟
      if (diff < 60000) {
        return '刚刚'
      }
      
      // 小于1小时
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000)
        return `${minutes}分钟前`
      }
      
      // 小于1天
      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000)
        return `${hours}小时前`
      }
      
      // 小于1个月
      if (diff < 2592000000) {
        const days = Math.floor(diff / 86400000)
        return `${days}天前`
      }
      
      // 小于1年
      if (diff < 31536000000) {
        const months = Math.floor(diff / 2592000000)
        return `${months}个月前`
      }
      
      // 超过1年
      const years = Math.floor(diff / 31536000000)
      return `${years}年前`
    },
    startComment(p) {
      if (!p) return
      this.$set(p, '_menuOpen', false)
      this.$set(p, '_commenting', true)
      const id = String(p.id)
      this.$set(this.focusMap, id, true)
    },
    endComment(p) {
      if (!p) return
      const id = String(p.id)
      const text = (this.inputMap[id] || '').trim()
      
      // 失焦时仅取消焦点，不自动收起评论框
      this.$set(this.focusMap, id, false)
      
      // 只有在输入框为空且用户明确点击了其他地方时才收起评论框
      // 这里不自动收起，让用户通过点击其他地方或明确操作来关闭
    },
    async toggleLike(p) {
      if (p) p._menuOpen = false
      const id = String(p.id)
      
      try {
        const token = uni.getStorageSync('token')
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' })
          return
        }
        
        if (p.liked) {
          // 取消点赞（取消收藏）
          const response = await cancelLikePost(id)
          if (response && response.success) {
            this.$set(p, 'liked', false)
            this.$set(p, 'likes', Math.max((p.likes || 0) - 1, 0))
            // 从本地存储中移除收藏状态和帖子信息
            this.removeFromLikedPosts(id)
            uni.showToast({ title: '已取消收藏', icon: 'none' })
          } else {
            uni.showToast({ title: response?.message || '取消收藏失败', icon: 'none' })
          }
        } else {
          // 点赞（收藏）
          const response = await likePost(id)
          if (response && response.success) {
            this.$set(p, 'liked', true)
            this.$set(p, 'likes', (p.likes || 0) + 1)
            // 保存到本地存储
            this.saveToLikedPosts(p)
            uni.showToast({ title: '已收藏', icon: 'none' })
          } else {
            uni.showToast({ title: response?.message || '收藏失败', icon: 'none' })
          }
        }
      } catch (error) {
        console.error('点赞操作失败:', error)
        uni.showToast({ title: '操作失败，请重试', icon: 'none' })
      }
    },
    
    // 保存收藏状态和帖子信息到本地存储
    saveToLikedPosts(post) {
      try {
        const postId = String(post.id)
        
        // 保存收藏状态
        const likedPosts = uni.getStorageSync('liked_posts') || {}
        likedPosts[postId] = true
        uni.setStorageSync('liked_posts', likedPosts)
        
        // 保存帖子信息到收藏列表
        const favoritesList = uni.getStorageSync('favorites_list') || {}
        
        // 提取需要保存的帖子信息
        const favoritePost = {
          id: postId,
          name: post.nickname || post.userName || post.name || '用户',
          nickname: post.nickname || post.userName || post.name || '用户',
          content: post.content || '',
          images: this.getImages(post),
          time: post.time || '刚刚',
          likes: post.likes || 0,
          avatar: post.avatar || '/static/picture/profile.png',
          collectedAt: new Date().toISOString() // 收藏时间
        }
        
        favoritesList[postId] = favoritePost
        uni.setStorageSync('favorites_list', favoritesList)
        
      } catch (error) {
      }
    },
    
    // 从本地存储中移除收藏状态和帖子信息
    removeFromLikedPosts(postId) {
      try {
        // 移除收藏状态
        const likedPosts = uni.getStorageSync('liked_posts') || {}
        delete likedPosts[postId]
        uni.setStorageSync('liked_posts', likedPosts)
        
        // 移除收藏列表中的帖子信息
        const favoritesList = uni.getStorageSync('favorites_list') || {}
        delete favoritesList[postId]
        uni.setStorageSync('favorites_list', favoritesList)
        
      } catch (error) {
      }
    },
    
    // 从本地存储恢复收藏状态
    restoreLikedStatus(posts) {
      try {
        const likedPosts = uni.getStorageSync('liked_posts') || {}
        posts.forEach(post => {
          if (post && post.id) {
            const postId = String(post.id)
            if (likedPosts[postId]) {
              this.$set(post, 'liked', true)
            }
          }
        })
      } catch (error) {
      }
    },
    getComments(pid) {
      const cm = this.commentsMap || {}
      const list = cm[String(pid)] || []
      
      // 过滤评论：只显示作者和当前用户的评论
      const filteredList = list.filter(comment => {
        // 显示当前用户的评论
        if (comment.userId === 'current') {
          return true
        }
        
        // 显示帖子作者的评论（需要从帖子信息中获取作者ID）
        const post = this.posts.find(p => String(p.id) === String(pid))
        if (post && comment.userId === String(post.userId)) {
          return true
        }
        
        return false
      })
      
      return Array.isArray(filteredList) ? filteredList : []
    },
    
    // 从本地存储加载评论数据
    loadCommentsFromStorage() {
      try {
        const savedComments = uni.getStorageSync('social_comments')
        if (savedComments) {
          this.commentsMap = savedComments
          } else {
          this.commentsMap = {}
        }
      } catch (error) {
        console.error('加载评论数据失败:', error)
        this.commentsMap = {}
      }
    },
    
    // 格式化制作方法
    formatMethod(method) {
      if (!method) return '';
      // 去除换行符和多余空格，用句号分隔步骤
      return method.replace(/\r?\n+/g, '。') // 换行改成句号
               .replace(/\s+/g, ' ')     // 去除多余空格
               .trim();                  // 去除首尾空格
    },
    getCommentCount(pid) {
      // 优先使用后端返回的 comment_count 字段
      const post = this.posts.find(p => String(p.id) === String(pid));
      if (post && (post.commentCount || post.comment_count)) {
        return post.commentCount || post.comment_count;
      }
      
      // 如果没有后端字段，使用本地评论数量
      return this.getComments(pid).length
    },
    focusComment(p) {
      if (!p) return
      
      // 先关闭其他帖子的菜单与评论框
      (this.posts || []).forEach(item => {
        if (!item) return
        if (item._menuOpen) this.$set(item, '_menuOpen', false)
        if (item._commenting && item.id !== p.id) {
          this.$set(item, '_commenting', false)
          const itemId = String(item.id)
          this.$set(this.focusMap, itemId, false)
        }
      })
      
      // 打开当前帖子的评论框
      this.$set(p, '_menuOpen', false)
      this.$set(p, '_commenting', true)
      const id = String(p.id)
      this.$set(this.focusMap, id, true)
      
      // 确保输入框为空
      this.$set(this.inputMap, id, '')
    },
    handleSendComment(p) {
      console.log('发送按钮被点击，帖子ID:', p.id)
      // 防止重复点击
      if (this.sendingComment) {
        console.log('正在发送评论，请稍候...')
        return
      }
      
      this.sendingComment = true
      this.submitComment(p).finally(() => {
        this.sendingComment = false
      })
    },
    handleSendComment(p) {
      console.log('发送按钮被点击，帖子ID:', p.id)
      // 防止重复点击
      if (this.sendingComment) {
        console.log('正在发送评论，请稍候...')
        return
      }
      
      this.sendingComment = true
      this.submitComment(p).finally(() => {
        this.sendingComment = false
      })
    },
    async submitComment(p) {
      console.log('submitComment 方法被调用，帖子ID:', p.id)
      const pid = String(p.id)
      const text = (this.inputMap[pid] || '').trim()
      
      if (!text) {
        uni.showToast({ title: '请输入评论内容', icon: 'none' })
        return
      }
      
      // 立即显示评论发送中提示
      uni.showToast({ title: '评论发送中...', icon: 'loading', duration: 2000 })
      
      // 检查用户是否登录
      const token = uni.getStorageSync('token')
      if (!token) {
        uni.showToast({ title: '请先登录后再评论', icon: 'none' })
        return
      }
      
      // 使用 uni.request 直接调用后端API，避免 console.log 问题
      uni.request({
        url: `http://172.20.10.3:9000/api/community/posts/${pid}/comments`,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {
          content: text
        },
        success: (res) => {
          console.log('API调用成功，响应:', res)
          
          // 服务器保存成功，保存到本地
          const one = { 
            name: '我', 
            text: text, 
            time: '刚刚',
            userId: 'current',
            avatar: uni.getStorageSync('userAvatar') || '/static/picture/profile.png'
          }
          
          const cm = { ...(this.commentsMap || {}) }
          const list = Array.isArray(cm[pid]) ? cm[pid].slice() : []
          list.push(one)
          cm[pid] = list
          this.commentsMap = cm
          uni.setStorageSync('social_comments', cm)
          
          // 清空输入框
          this.$set(this.inputMap, pid, '')
          
          // 更新评论数量显示
          this.$set(p, 'commentCount', (p.commentCount || 0) + 1)
          
          // 评论成功后，自动收起评论框
          this.$set(p, '_commenting', false)
          this.$set(this.focusMap, pid, false)
          
          uni.showToast({ title: '评论成功', icon: 'success' })
        },
        fail: (err) => {
          console.log('API调用失败，错误:', err)
          // 如果API调用失败，只显示提示，不再本地保存（避免重复）
          uni.showToast({ title: '评论发送失败，请重试', icon: 'none' })
        }
      })
    },
    share(p) {
      if (p) p._menuOpen = false
      const link = `${this.baseUrl()}/#/pages/social/index?postId=${encodeURIComponent(p.id)}`
      uni.setClipboardData({
        data: link,
        success: () => uni.showToast({ title: '链接已复制', icon: 'none' }),
        fail: () => uni.showToast({ title: '复制失败', icon: 'none' })
      })
    },
    baseUrl() {
      try {
        if (typeof location !== 'undefined' && location.origin) return location.origin
      } catch(e) {}
      return 'https://example.com'
    },
    
    // 滚动到指定帖子
    scrollToPost(postId) {
      if (!postId) return;
      
      console.log('开始滚动到帖子:', postId, '当前帖子列表:', this.posts);
      
      // 查找对应帖子的索引
      const targetIndex = this.posts.findIndex(post => {
        const postIdStr = String(postId);
        const currentPostIdStr = String(post.id);
        console.log('比较帖子ID:', '目标:', postIdStr, '当前:', currentPostIdStr, '是否相等:', postIdStr === currentPostIdStr);
        return postIdStr === currentPostIdStr;
      });
      
      if (targetIndex === -1) {
        console.warn('未找到帖子ID:', postId, '当前帖子列表ID:', this.posts.map(p => p.id));
        uni.showToast({ title: '未找到对应的帖子', icon: 'none' });
        return;
      }
      
      console.log('找到帖子，准备滚动:', postId, '索引:', targetIndex);
      
      // 使用更简单的滚动方式，直接计算滚动位置
      this.$nextTick(() => {
        setTimeout(() => {
          // 计算每个帖子的高度（包括边距），大约为 400rpx
          const postHeight = 400; // 每个帖子的预估高度（rpx）
          const margin = 20; // 帖子之间的边距（rpx）
          const scrollTop = (postHeight + margin) * targetIndex;
          
          uni.pageScrollTo({
            scrollTop: scrollTop,
            duration: 500
          });
          
          console.log('已滚动到位置:', scrollTop);
          
          // 添加高亮效果（使用uni-app的方式）
          const targetPost = this.posts[targetIndex];
          if (targetPost) {
            // 临时添加高亮样式类
            targetPost._highlighted = true;
            
            setTimeout(() => {
              targetPost._highlighted = false;
            }, 2000);
          }
        }, 300);
      });
    },
    
    // 图片加载失败处理
    onImageError(e) {
      console.warn('图片加载失败:', e.detail)
      
      // 获取图片元素
      const imageElement = e.target || e.currentTarget;
      
      // 设置默认图片
      if (imageElement) {
        // 使用本地默认图片
        imageElement.src = '/static/default-recipe-cover.jpg';
      }
      
      // 如果是临时文件加载失败，静默处理，不显示错误
      if (e.detail && e.detail.errMsg && e.detail.errMsg.includes('http://tmp/')) {
        // 临时文件加载失败，已替换为默认图片
      }
      
      // 如果是示例图片加载失败，静默处理
      if (e.detail && e.detail.errMsg && e.detail.errMsg.includes('example.com')) {
        // 示例图片加载失败，已替换为默认图片
      }
    }
  }
}
</script>

<style>
.page {
  background: #f7f2e7;
  position: relative;
  min-height: 100vh;
}

/* 顶部栏 */
.header {
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
}
.add {
  font-size: 40rpx;
  color: #ff6a00;
}

/* 列表与卡片 */
.feed {
  padding: 16rpx 24rpx 24rpx;
}
.post {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
  transition: box-shadow 0.3s ease;
}
.post.highlighted {
  box-shadow: 0 0 20rpx rgba(255, 106, 0, 0.5);
}
.post { position: relative; }
.post-top {
  display: flex;
  align-items: center;
}
.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}
.author {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 28rpx;
  color: #111827;
  font-weight: 600;
}
.time {
  font-size: 22rpx;
  color: #9ca3af;
}
.more {
  color: #9ca3af;
  font-size: 36rpx;
  padding: 0 8rpx;
}
.content {
  margin-top: 16rpx;
  font-size: 28rpx;
  color: #1f2937;
  line-height: 1.6;
}

.post-content {
  display: block;
  font-size: 30rpx;
  color: #333;
  line-height: 1.5;
}

/* 图片栅格 */
.images {
  margin-top: 16rpx;
  display: grid;
  grid-gap: 12rpx;
}
.images.cols-1 {
  grid-template-columns: 1fr;
}
.images.cols-2 {
  grid-template-columns: 1fr 1fr;
}
.images.cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}
.img {
  width: 100%;
  height: 300rpx;
  border-radius: 16rpx;
  background: #eee;
}

/* 隐藏底部操作栏的样式 */
.actions {
  display: none;
}
.heart {
  font-size: 28rpx;
  color: #9ca3af;
  transition: color 0.2s;
  margin-right: 8rpx;
}
.heart.liked {
  color: #ff4d4f;
}

/* 评论区 */
.comments { margin-top: 12rpx; }
.c-list { display: flex; flex-direction: column; gap: 6rpx; background: #fafafa; border-radius: 12rpx; padding: 10rpx; }
.c-item { font-size: 24rpx; color: #374151; line-height: 1.4; }
.c-name { color: #1f2937; font-weight: 600; margin-right: 6rpx; }
.c-time { margin-left: 8rpx; color: #9ca3af; font-size: 22rpx; }
.c-input { margin-top: 8rpx; display: flex; gap: 8rpx; align-items: center; }
.c-input.compact { margin-top: 6rpx; }
.input { flex: 1; height: 56rpx; background: #fff; border-radius: 10rpx; padding: 0 12rpx; font-size: 24rpx; box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.06); }
.input.compact { height: 52rpx; font-size: 24rpx; }
.btn.micro { height: 52rpx; line-height: 52rpx; padding: 0 14rpx; border-radius: 10rpx; background: #f3f4f6; color: #374151; font-size: 24rpx; border: none; pointer-events: auto; position: relative; z-index: 1000; cursor: pointer; }

/* 折叠菜单（类似朋友圈） */
.actions-menu {
  position: absolute;
  right: 16rpx;
  bottom: 120rpx;
  background: #fff;
  border-radius: 14rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.12);
  overflow: hidden;
  min-width: 200rpx;
  z-index: 5;
}
.am-item {
  padding: 14rpx 22rpx;
  font-size: 26rpx;
  color: #1f2937;
}
.am-item + .am-item { border-top: 1rpx solid #f0f2f5; }

/* 页面级遮罩：任一菜单展开时出现，点击可关闭所有菜单；低于菜单的 z-index */
.page-mask {
  position: fixed;
  inset: 0;
  z-index: 4; /* actions-menu 是 5 */
  background: transparent;
}

/* 菜单遮罩：覆盖整张卡片，点击可收起菜单 */
.menu-mask {
  position: absolute;
  inset: 0;
  z-index: 4; /* 低于 actions-menu 的 z-index:5，高于卡片内容 */
  background: transparent;
}

/* 图片下方信息行：左时间、右省略号 */
.img-footer {
  margin-top: 8rpx;
  padding: 0 6rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time-badge {
  background: transparent;
  color: #9ca3af;
  font-size: 24rpx;
  padding: 0;
}
.menu-dot {
  color: #9ca3af;
  font-size: 32rpx;
  padding: 4rpx 8rpx;
  border-radius: 8rpx;
}

/* 加载状态样式 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
  background: #f7f2e7;
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 6rpx solid #ffd166;
  border-left: 6rpx solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24rpx;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 28rpx;
  color: #666;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  background: #f7f2e7;
  text-align: center;
}

.empty-icon {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 32rpx;
  opacity: 0.7;
}

.empty-title {
  font-size: 32rpx;
  color: #666;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 40rpx;
  line-height: 1.5;
}

.empty-btn {
  background: linear-gradient(135deg, #ff6a00 0%, #ff8c00 100%);
  color: white;
  border: none;
  border-radius: 50rpx;
  padding: 20rpx 48rpx;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 8rpx 24rpx rgba(255, 106, 0, 0.3);
  transition: all 0.3s ease;
}

.empty-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 12rpx rgba(255, 106, 0, 0.3);
}

/* 右上角卡通图样式（统一） */
</style>