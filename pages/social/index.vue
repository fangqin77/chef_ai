<template>
  <view class="page">

    <!-- 顶部栏 -->
    <view class="header">
      <text class="title">美食圈</text>
      <text class="add" @click="onCreate">＋</text>
    </view>

    <!-- 动态列表 -->
    <view class="feed">
      <view class="post" v-for="p in posts" :key="p.id">
        <view class="post-top">
          <image class="avatar" :src="p.avatar" mode="aspectFill" />
          <view class="author">
            <text class="name">{{ p.name }}</text>
          </view>
          <text class="more" v-if="!hasImages(p)" @click="toggleMenu(p)">···</text>
        </view>

        <view class="content">{{ p.text }}</view>

        <view v-if="hasImages(p)" class="images" :class="'cols-' + gridCols(p)">
          <image v-for="(img, idx) in (p.images || [])"
                 :key="idx"
                 :src="img"
                 class="img"
                 mode="aspectFill"
                 @tap="onImageTap(p, idx)" />
        </view>
        <!-- 图片下方一行：左时间，右省略号 -->
        <view v-if="hasImages(p)" class="img-footer">
          <text class="time-badge">{{ displayTime(p) }}</text>
          <text class="menu-dot" @click.stop="toggleMenu(p)">···</text>
        </view>

        <view class="menu-mask" v-if="p._menuOpen" @click="closeOverlayFor(p)"></view>
        <view class="actions-menu" v-if="p._menuOpen">
          <view class="am-item" @click="toggleLike(p)">{{ p.liked ? ('取消收藏（' + p.likes + '）') : ('收藏（' + p.likes + '）') }}</view>
          <view class="am-item" @click="focusComment(p)">评论（{{ getCommentCount(p.id) }}）</view>
          <view class="am-item" @click="share(p)">分享</view>
        </view>
        <view class="actions" v-if="false">
          <view class="action" @click="toggleLike(p)">
            <text :class="['heart', p.liked ? 'liked' : '']">❤</text>
            <text class="num">{{ p.likes }}</text>
          </view>
          <view class="action" @click="focusComment(p)"><text>💬</text><text class="num">{{ getCommentCount(p.id) }}</text></view>
          <view class="action" @click="share(p)"><text>🔗</text><text class="num">分享</text></view>
        </view>

        <!-- 评论区 -->
        <view class="comments">
          <view class="c-list" v-if="getComments(p.id).length">
            <view class="c-item" v-for="(c,i) in getComments(p.id)" :key="i">
              <text class="c-name">{{ c.name }}：</text>
              <text class="c-text">{{ c.text }}</text>
              <text class="c-time">{{ c.time }}</text>
            </view>
          </view>
          <!-- 评论输入仅在点击“评论”时显示，并自动聚焦，失焦且无内容时收起 -->
          <view class="c-input compact" v-if="p._commenting">
            <input class="input compact"
                   :focus="focusMap[p.id]"
                   :placeholder="'评论 @' + p.name"
                   v-model="inputMap[p.id]"
                   @confirm="submitComment(p)"
                   @blur="endComment(p)" />
            <button class="btn micro" @click="submitComment(p)">发送</button>
          </view>
        </view>
      </view>
    </view>

    <view class="page-mask" v-if="anyMenuOpen" @click="closeAllMenus"></view>
    <view style="height: 24rpx;" />
  </view>
</template>

<script>
import { getCommunityPosts } from '@/api/recipes';

export default {
  data() {
    return {
      posts: [],
      commentsMap: {},   // { [postId]: [{name,text,time}] }
      inputMap: {},      // { [postId]: 'input text' }
      focusMap: {}       // { [postId]: boolean }
    }
  },
  async onShow() {
    try {
      // 获取当前用户 ID，确保传递正确的数据类型（null 或 Long）
      const userId = uni.getStorageSync('userId');
      const parsedUserId = userId === 'null' ? null : Number(userId);
      
      const response = await getCommunityPosts(1, 10, null, parsedUserId);
      if (response && response.list) {
        // 如果接口返回的 list 为空，使用默认数据或显示提示
        if (response.list.length === 0) {
          uni.showToast({ title: '暂无帖子数据', icon: 'none' });
          this.posts = [];
        } else {
          this.posts = response.list.map(post => ({
            ...post,
            _menuOpen: false,
            _commenting: false
          }));
        }
      } else {
        uni.showToast({ title: '数据格式错误', icon: 'none' });
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
    } catch (error) {
      console.error('获取帖子列表失败:', error);
      uni.showToast({ title: '获取帖子列表失败', icon: 'none' });
      this.posts = [];
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
    onImageTap(p, idx) {
      const urls = Array.isArray(p.images) ? p.images : []
      const current = urls[idx] || ''
      // 写入浏览历史
      try {
        const list = uni.getStorageSync('social_history') || []
        const entry = {
          key: Date.now() + '_' + String(p.id || idx),
          postId: String(p.id || ''),
          title: String(p.text || p.name || '').slice(0, 60),
          cover: current || (urls[0] || ''),
          time: '刚刚'
        }
        const next = [entry, ...list].slice(0, 200)
        uni.setStorageSync('social_history', next)
      } catch (e) {}
      // 预览图片（支持缩放）
      if (urls.length) {
        uni.previewImage({
          current,
          urls,
          indicator: 'number',
          loop: true
        })
      }
    },
    hasImages(p) {
      return !!(p && Array.isArray(p.images) && p.images.length > 0)
    },
    gridCols(p) {
      const len = (p && Array.isArray(p.images)) ? p.images.length : 0
      if (len <= 1) return 1
      if (len === 2) return 2
      return 3
    },
    onCreate() {
      uni.navigateTo({ url: '/pages/social/publish' })
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
    displayTime(p) {
      const t = p && p.time
      if (!t) return '刚刚'
      const s = String(t).trim().toLowerCase()
      if (!s || s === 'null' || s === 'undefined') return '刚刚'
      return t
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
      // 失焦时仅取消焦点，不收起评论框
      this.$set(this.focusMap, id, false)
    },
    toggleLike(p) {
      if (p) p._menuOpen = false
      const key = 'social_likes'
      const favKey = 'my_fav_posts'
      const id = String(p.id)
      let arr = uni.getStorageSync(key) || []
      const set = new Set(arr.map(String))
      const before = set.has(id)
      let fav = {}
      try { fav = uni.getStorageSync(favKey) || {} } catch(e) { fav = {} }
      if (before) {
        set.delete(id)
        p.liked = false
        p.likes = Math.max((p.likes || 0) - 1, 0)
        if (fav[id]) delete fav[id]
        uni.showToast({ title: '已取消收藏', icon: 'none' })
      } else {
        set.add(id)
        p.liked = true
        p.likes = (p.likes || 0) + 1
        fav[id] = {
          id,
          name: p.name,
          time: p.time,
          avatar: p.avatar,
          text: p.text,
          cover: Array.isArray(p.images) && p.images.length ? p.images[0] : ''
        }
        uni.showToast({ title: '已收藏', icon: 'none' })
      }
      arr = Array.from(set)
      uni.setStorageSync(key, arr)
      uni.setStorageSync(favKey, fav)
    },
    getComments(pid) {
      const cm = this.commentsMap || {}
      const list = cm[String(pid)] || []
      return Array.isArray(list) ? list : []
    },
    getCommentCount(pid) {
      return this.getComments(pid).length
    },
    focusComment(p) {
      this.startComment(p)
    },
    submitComment(p) {
      const pid = String(p.id)
      const text = (this.inputMap[pid] || '').trim()
      if (!text) {
        uni.showToast({ title: '请输入评论', icon: 'none' })
        return
      }
      const one = { name: '我', text, time: '刚刚' }
      const cm = { ...(this.commentsMap || {}) }
      const list = Array.isArray(cm[pid]) ? cm[pid].slice() : []
      list.push(one)
      cm[pid] = list
      this.commentsMap = cm
      uni.setStorageSync('social_comments', cm)
      this.$set(this.inputMap, pid, '')
      uni.showToast({ title: '已评论', icon: 'none' })
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

/* 操作栏（隐藏旧的底部按钮，仅保留折叠菜单） */
.actions {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 8rpx;
  color: #6b7280;
}
.action {
  display: inline-flex;
  align-items: center;
  font-size: 26rpx;
}
.action .num {
  margin-left: 8rpx;
}
.heart {
  font-size: 28rpx;
  color: #9ca3af;
  transition: color 0.2s;
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
.btn.micro { height: 52rpx; line-height: 52rpx; padding: 0 14rpx; border-radius: 10rpx; background: #f3f4f6; color: #374151; font-size: 24rpx; }

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

/* 右上角卡通图样式（统一） */
</style>