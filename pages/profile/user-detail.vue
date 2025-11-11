<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
        <text class="back-text">返回</text>
      </view>
      <text class="title">用户简介</text>
      <view class="placeholder"></view>
    </view>

    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <!-- 头像 -->
        <image class="avatar" :src="userInfo.avatar || '/static/picture/profile.png'" mode="aspectFill" @error="onAvatarError" />
        
        <!-- 用户名和个人简介 -->
        <view class="user-details">
          <text class="username">{{ userInfo.name || '美食达人' }}</text>
          <text class="bio">{{ userInfo.bio || '这个人很懒，还没有写简介~' }}</text>
        </view>
      </view>

      <!-- 统计数据 -->
      <view class="stats">
        <view class="stat-item" @click="showFollowList">
          <text class="stat-number">{{ userInfo.followCount || 0 }}</text>
          <text class="stat-label">关注</text>
        </view>
        <view class="divider"></view>
        <view class="stat-item" @click="showFansList">
          <text class="stat-number">{{ userInfo.fansCount || 0 }}</text>
          <text class="stat-label">粉丝</text>
        </view>
        <view class="divider"></view>
        <view class="stat-item" @click="showLikesList">
          <text class="stat-number">{{ userInfo.likeCount || 0 }}</text>
          <text class="stat-label">获赞</text>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="actions" v-if="!isCurrentUser">
        <button class="follow-btn" :class="{ 'followed': userInfo.isFollowed }" @click="toggleFollow">
          {{ userInfo.isFollowed ? '已关注' : '关注' }}
        </button>
        <button class="message-btn" @click="sendMessage">私信</button>
      </view>
    </view>

    <!-- 帖子列表 -->
    <view class="posts-section">
      <view class="section-title">
        <text class="title-text">作品列表</text>
        <text class="posts-count">({{ posts.length }})</text>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="loading">
        <view class="loading-spinner"></view>
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-else-if="!loading && posts.length === 0">
        <image class="empty-icon" src="/static/picture/profile.png" mode="aspectFit"></image>
        <text class="empty-title">暂无作品</text>
        <text class="empty-desc">这个用户还没有发布任何作品</text>
      </view>

      <!-- 帖子列表 -->
      <view class="posts-list" v-else>
        <view class="post-item" v-for="post in posts" :key="post.id" @click="viewPostDetail(post)">
          <view class="post-content">
            <text class="post-text">{{ post.content || '无文字内容' }}</text>
          </view>
          
          <!-- 图片展示 -->
          <view class="post-images" v-if="hasImages(post)" :class="'cols-' + gridCols(post)">
            <image v-for="(img, idx) in getImages(post)"
                   :key="idx"
                   :src="getImageUrl(img)"
                   class="post-image"
                   mode="aspectFill"
                   @error="onImageError" />
          </view>
          
          <!-- 帖子信息 -->
          <view class="post-info">
            <text class="post-time">{{ displayTime(post) }}</text>
            <view class="post-stats">
              <view class="stat">
                <text class="heart-icon" :class="{ 'liked': post.liked }">❤</text>
                <text class="stat-count">{{ post.likes || 0 }}</text>
              </view>
              <view class="stat">
                <text class="comment-icon">💬</text>
                <text class="stat-count">{{ getCommentCount(post.id) }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 40rpx;" />
  </view>
</template>

<script>
import { 
  getCommunityPosts, 
  getUserInfo, 
  followUser, 
  unfollowUser, 
  getFollowStats, 
  checkIsFollowed,
  getFollowingList,
  getFollowersList
} from '@/api/recipes';
import { getUserInfoById } from '@/api/user';

export default {
  data() {
    return {
      userInfo: {
        id: '',
        name: '',
        avatar: '',
        bio: '',
        followCount: 0,
        fansCount: 0,
        likeCount: 0,
        isFollowed: false
      },
      posts: [],
      loading: false,
      commentsMap: {},
      isCurrentUser: false
    }
  },
  
  async onLoad(options) {
    console.log('用户简介页面参数:', options);
    await this.loadUserInfo(options);
    this.loadUserPosts(options.userId);
  },
  
  methods: {
    // 加载用户信息
    async loadUserInfo(options) {
      const { userId, userName, userAvatar } = options;
      
      try {
        // 解码URL参数（特别是头像URL）
        const decodedUserAvatar = userAvatar ? decodeURIComponent(userAvatar) : '/static/picture/profile.png';
        const decodedUserName = userName ? decodeURIComponent(userName) : '美食达人';
        
        console.log('解码后的用户信息:', {
          userId,
          userName: decodedUserName,
          userAvatar: decodedUserAvatar
        });
        
        // 优先使用URL参数作为默认值，然后通过API获取真实数据
        this.userInfo = {
          id: userId || '',
          name: decodedUserName,
          avatar: decodedUserAvatar,
          bio: '热爱美食，分享生活',
          followCount: 0,
          fansCount: 0,
          likeCount: 0,
          isFollowed: false
        };
        
        // 检查是否是当前用户
        this.checkIfCurrentUser(userId);
        
        // 通过API获取真实的用户信息
        if (userId) {
          await this.loadRealUserInfo(userId);
        }
        
        // 获取关注统计信息
        await this.loadFollowStats();
        
        // 检查是否已关注该用户
        if (userId && !this.isCurrentUser) {
          await this.checkFollowStatus(userId);
        }
        
      } catch (error) {
        console.error('加载用户信息失败:', error);
        // 如果API调用失败，使用默认值
        this.userInfo.followCount = 0;
        this.userInfo.fansCount = 0;
        this.userInfo.likeCount = 0;
      }
    },
    
    // 通过API获取真实的用户信息
    async loadRealUserInfo(userId) {
      try {
        const userData = await getUserInfoById(userId);
        console.log('获取用户信息API响应:', userData);
        
        // 更新用户信息为API返回的真实数据
        this.userInfo.name = userData.nickname || this.userInfo.name;
        this.userInfo.avatar = userData.avatar || this.userInfo.avatar;
        this.userInfo.bio = userData.bio || userData.introduction || this.userInfo.bio;
        
        console.log('更新后的用户信息:', this.userInfo);
      } catch (error) {
        console.error('调用用户信息API失败:', error);
        // API调用失败时，继续使用URL参数的值
      }
    },
    
    // 检查是否是当前用户
    checkIfCurrentUser(userId) {
      try {
        // 从本地存储获取当前用户信息
        const currentUser = uni.getStorageSync('userInfo');
        if (currentUser && currentUser.id) {
          this.isCurrentUser = String(currentUser.id) === String(userId);
        } else {
          this.isCurrentUser = false;
        }
        console.log('检查是否是当前用户:', { currentUserId: currentUser?.id, targetUserId: userId, isCurrentUser: this.isCurrentUser });
      } catch (error) {
        console.error('检查当前用户失败:', error);
        this.isCurrentUser = false;
      }
    },
    
    // 获取关注统计信息
    async loadFollowStats() {
      try {
        const response = await getFollowStats();
        console.log('获取关注统计响应:', response);
        
        if (response && response.success) {
          const stats = response.data || {};
          this.userInfo.followCount = stats.followingCount || 0; // 关注数
          this.userInfo.fansCount = stats.followerCount || 0;     // 粉丝数
          this.userInfo.likeCount = stats.likeCount || 0;        // 获赞数
        } else {
          console.warn('获取关注统计失败，使用默认值');
        }
      } catch (error) {
        console.error('获取关注统计失败:', error);
      }
    },
    
    // 检查是否已关注该用户
    async checkFollowStatus(targetId) {
      try {
        const response = await checkIsFollowed(targetId);
        console.log('检查关注状态响应:', response);
        
        if (response && response.success) {
          this.userInfo.isFollowed = response.data || false;
        } else {
          console.warn('检查关注状态失败，使用默认值');
          this.userInfo.isFollowed = false;
        }
      } catch (error) {
        console.error('检查关注状态失败:', error);
        this.userInfo.isFollowed = false;
      }
    },
    
    // 加载用户帖子
    async loadUserPosts(userId) {
      this.loading = true;
      try {
        // 获取该用户的帖子列表
        const response = await getCommunityPosts(1, 20, null, userId);
        console.log('获取用户帖子响应:', response);
        
        if (response && response.list) {
          this.posts = response.list.map(post => ({
            ...post,
            liked: false // 初始化点赞状态
          }));
          
          // 恢复收藏状态
          this.restoreLikedStatus(this.posts);
        } else {
          this.posts = [];
        }
      } catch (error) {
        console.error('获取用户帖子失败:', error);
        uni.showToast({ title: '获取帖子列表失败', icon: 'none' });
        this.posts = [];
      } finally {
        this.loading = false;
      }
    },
    
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    
    // 显示关注列表
    async showFollowList() {
      // 检查用户是否登录
      const token = uni.getStorageSync('token');
      if (!token) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      
      // 检查是否是查看当前用户的关注列表
      if (this.isCurrentUser) {
        try {
          const response = await getFollowingList();
          console.log('关注列表响应:', response);
          
          if (response && response.success && response.data) {
            const followingList = response.data.list || [];
            uni.showToast({ title: `关注列表: ${followingList.length}人`, icon: 'none' });
          } else {
            uni.showToast({ title: '获取关注列表失败', icon: 'none' });
          }
        } catch (error) {
          console.error('获取关注列表失败:', error);
          uni.showToast({ title: '获取关注列表失败', icon: 'none' });
        }
      } else {
        // 查看其他用户的关注列表，目前API不支持，提示用户
        uni.showToast({ title: '查看他人关注列表功能暂未开放', icon: 'none' });
      }
    },
    
    // 显示粉丝列表
    async showFansList() {
      // 检查用户是否登录
      const token = uni.getStorageSync('token');
      if (!token) {
        uni.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      
      // 检查是否是查看当前用户的粉丝列表
      if (this.isCurrentUser) {
        try {
          const response = await getFollowersList();
          console.log('粉丝列表响应:', response);
          
          if (response && response.success && response.data) {
            const followersList = response.data.list || [];
            uni.showToast({ title: `粉丝列表: ${followersList.length}人`, icon: 'none' });
          } else {
            uni.showToast({ title: '获取粉丝列表失败', icon: 'none' });
          }
        } catch (error) {
          console.error('获取粉丝列表失败:', error);
          uni.showToast({ title: '获取粉丝列表失败', icon: 'none' });
        }
      } else {
        // 查看其他用户的粉丝列表，目前API不支持，提示用户
        uni.showToast({ title: '查看他人粉丝列表功能暂未开放', icon: 'none' });
      }
    },
    
    // 显示点赞列表
    showLikesList() {
      uni.showToast({ title: '查看获赞列表', icon: 'none' });
    },
    
    // 切换关注状态
    async toggleFollow() {
      if (!this.userInfo.id) {
        uni.showToast({ title: '用户信息不完整', icon: 'none' });
        return;
      }
      
      try {
        uni.showLoading({ title: '处理中...' });
        
        if (this.userInfo.isFollowed) {
          // 取消关注
          const response = await unfollowUser(this.userInfo.id);
          if (response && response.success) {
            this.userInfo.isFollowed = false;
            this.userInfo.fansCount = Math.max(0, this.userInfo.fansCount - 1);
            uni.showToast({ title: '已取消关注', icon: 'success' });
          } else {
            throw new Error('取消关注失败');
          }
        } else {
          // 关注用户
          const response = await followUser(this.userInfo.id);
          if (response && response.success) {
            this.userInfo.isFollowed = true;
            this.userInfo.fansCount++;
            uni.showToast({ title: '关注成功', icon: 'success' });
          } else {
            throw new Error('关注失败');
          }
        }
      } catch (error) {
        console.error('切换关注状态失败:', error);
        uni.showToast({ title: '操作失败，请重试', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 发送私信
    sendMessage() {
      uni.showToast({ title: '私信功能开发中', icon: 'none' });
    },
    
    // 查看帖子详情
    viewPostDetail(post) {
      uni.showToast({ title: '查看帖子详情', icon: 'none' });
      // 这里可以跳转到帖子详情页
    },
    
    // 图片相关方法
    hasImages(post) {
      return !!(post && this.getImages(post).length > 0);
    },
    
    gridCols(post) {
      const len = this.getImages(post).length;
      if (len <= 1) return 1;
      if (len === 2) return 2;
      return 3;
    },
    
    // 获取图片数组
    getImages(post) {
      if (!post) return [];
      
      // 处理 mediaJson 字段
      if (post.mediaJson) {
        try {
          const media = JSON.parse(post.mediaJson);
          if (Array.isArray(media)) {
            return media.map(item => {
              if (typeof item === 'string') return item;
              if (item && item.url) return item.url;
              return '';
            }).filter(url => url);
          }
        } catch (e) {
          console.error('解析 mediaJson 失败:', e);
        }
      }
      
      // 处理 images 字段
      if (Array.isArray(post.images)) {
        return post.images.filter(url => url);
      }
      
      return [];
    },
    
    // 处理图片URL
    getImageUrl(img) {
      if (!img) return '';
      
      // 检查是否是有效的URL
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img;
      }
      
      // 处理微信小程序临时文件路径
      if (img.startsWith('http://tmp/')) {
        return img.replace('http://tmp/', 'wxfile://tmp/');
      }
      
      // 处理开发服务器临时文件路径
      if (img.startsWith('http://127.0.0.1')) {
        return '/static/picture/profile.png';
      }
      
      // 处理wxfile协议路径
      if (img.startsWith('wxfile://')) {
        return img;
      }
      
      // 处理data URI图片
      if (img.startsWith('data:image/')) {
        return img;
      }
      
      // 处理相对路径
      if (img.startsWith('/')) {
        return img;
      }
      
      return img;
    },
    
    // 头像加载失败处理
    onAvatarError(e) {
      console.warn('头像加载失败:', e.detail);
      // 当头像加载失败时，使用默认头像
      this.userInfo.avatar = '/static/picture/profile.png';
    },
    
    // 头像加载失败处理
    onAvatarError(e) {
      console.warn('头像加载失败:', e.detail);
      // 当头像加载失败时，使用默认头像
      this.userInfo.avatar = '/static/picture/profile.png';
    },
    
    // 图片加载失败处理
    onImageError(e) {
      console.warn('图片加载失败:', e.detail);
      const imageElement = e.target || e.currentTarget;
      if (imageElement) {
        imageElement.src = '/static/picture/profile.png';
      }
    },
    
    // 显示时间
    displayTime(post) {
      const t = post && post.time;
      if (!t) return '刚刚';
      const s = String(t).trim().toLowerCase();
      if (!s || s === 'null' || s === 'undefined') return '刚刚';
      return t;
    },
    
    // 获取评论数量
    getCommentCount(pid) {
      const cm = this.commentsMap || {};
      const list = cm[String(pid)] || [];
      return Array.isArray(list) ? list.length : 0;
    },
    
    // 从本地存储恢复收藏状态
    restoreLikedStatus(posts) {
      try {
        const likedPosts = uni.getStorageSync('liked_posts') || {};
        posts.forEach(post => {
          if (post && post.id) {
            const postId = String(post.id);
            if (likedPosts[postId]) {
              this.$set(post, 'liked', true);
            }
          }
        });
      } catch (error) {
        console.error('恢复收藏状态失败:', error);
      }
    }
  }
}
</script>

<style>
.page {
  background: #f7f2e7;
  min-height: 100vh;
}

/* 顶部导航栏 */
.header {
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #666;
}

.back-icon {
  font-size: 40rpx;
  margin-right: 8rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
}

.placeholder {
  width: 80rpx;
}

/* 用户信息卡片 */
.user-card {
  margin: 16rpx 24rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}

.user-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 32rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 24rpx;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
  margin-bottom: 12rpx;
}

.bio {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
}

/* 统计数据 */
.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 32rpx;
  padding: 20rpx 0;
  border-top: 1rpx solid #f0f2f5;
  border-bottom: 1rpx solid #f0f2f5;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-number {
  font-size: 32rpx;
  font-weight: 700;
  color: #1a1f36;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
}

.divider {
  width: 1rpx;
  height: 60rpx;
  background: #e5e7eb;
}

/* 操作按钮 */
.actions {
  display: flex;
  gap: 16rpx;
}

.follow-btn, .message-btn {
  flex: 1;
  height: 80rpx;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.follow-btn {
  background: linear-gradient(135deg, #ff6a00 0%, #ff8c00 100%);
  color: white;
}

.follow-btn.followed {
  background: #f0f2f5;
  color: #666;
}

.message-btn {
  background: #fff;
  color: #ff6a00;
  border: 2rpx solid #ff6a00;
}

/* 帖子列表区域 */
.posts-section {
  margin: 16rpx 24rpx;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: 700;
  color: #1a1f36;
}

.posts-count {
  font-size: 24rpx;
  color: #666;
  margin-left: 12rpx;
}

/* 帖子列表 */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.post-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.post-content {
  margin-bottom: 16rpx;
}

.post-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 图片展示 */
.post-images {
  margin-bottom: 16rpx;
  display: grid;
  grid-gap: 8rpx;
}

.post-images.cols-1 {
  grid-template-columns: 1fr;
}

.post-images.cols-2 {
  grid-template-columns: 1fr 1fr;
}

.post-images.cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.post-image {
  width: 100%;
  height: 200rpx;
  border-radius: 12rpx;
  background: #eee;
}

/* 帖子信息 */
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-time {
  font-size: 24rpx;
  color: #999;
}

.post-stats {
  display: flex;
  gap: 24rpx;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.heart-icon, .comment-icon {
  font-size: 24rpx;
}

.heart-icon.liked {
  color: #ff4d4f;
}

.stat-count {
  font-size: 24rpx;
  color: #666;
}

/* 加载状态 */
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

/* 空状态 */
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
  line-height: 1.5;
}
</style>