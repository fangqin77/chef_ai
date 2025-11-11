<template>
  <view class="fav-page">
    <view class="header">
      <text class="title">我的收藏</text>
    </view>

    <view class="list" v-if="favorites.length">
      <!-- 美化后的收藏卡片 -->
      <view class="post-card" v-for="item in favorites" :key="item.id">
        <!-- 顶部作者信息 -->
        <view class="post-header">
          <image class="author-avatar" :src="item.avatar || '/static/picture/profile.png'" mode="aspectFill" />
          <view class="author-info">
            <text class="author-name">{{ item.name || item.nickname || '用户' }}</text>
            <text class="post-time">{{ item.time || item.collectedAt || '刚刚收藏' }}</text>
          </view>
          <view class="action-buttons">
            <button class="delete-btn" @click.stop="remove(item.id)">取消收藏</button>
          </view>
        </view>

        <!-- 帖子内容 -->
        <view class="post-content">
          <text class="content-text">{{ item.content || item.text || '' }}</text>
        </view>

        <!-- 帖子图片 -->
        <view v-if="item.images && item.images.length > 0" class="post-images">
          <view class="images-grid" :class="'cols-' + getGridCols(item.images)">
            <image 
              v-for="(img, idx) in item.images.slice(0, 3)" 
              :key="idx"
              class="post-image"
              :src="getImageUrl(img)" 
              mode="aspectFill"
              @click="previewImage(item.images, idx)"
              @error="onImageError"
            />
            <!-- 如果图片超过3张，显示更多数量 -->
            <view v-if="item.images.length > 3" class="more-images">
              <text class="more-text">+{{ item.images.length - 3 }}</text>
            </view>
          </view>
        </view>

        <!-- 底部统计信息 -->
        <view class="post-footer">
          <view class="stats">
            <view class="stat">
              <text class="heart-icon">❤</text>
              <text class="stat-num">{{ item.likes || 0 }}</text>
            </view>
            <view class="stat">
              <text class="comment-icon">💬</text>
              <text class="stat-num">{{ item.commentCount || 0 }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="empty" v-else>
      <image class="empty-icon" src="/static/picture/profile.png" mode="aspectFit"></image>
      <text class="tip">暂时没有收藏，去美食圈逛逛吧～</text>
      <button class="btn" @click="goSocial">去美食圈</button>
    </view>
  </view>
</template>

<script>
import { getUserFavorites, likePost, cancelLikePost } from '@/api/recipes';

export default {
  data() {
    return {
      favorites: [],
      fallback: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      loading: false
    }
  },
  async onShow() {
    await this.loadFavorites();
  },
  methods: {
    // 加载收藏列表
    async loadFavorites() {
      if (this.loading) return;
      
      try {
        this.loading = true;
        
        // 检查用户是否登录
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          this.favorites = [];
          return;
        }
        
        // 优先从本地存储获取收藏列表
        const favoritesList = uni.getStorageSync('favorites_list') || {};
        const likedPosts = uni.getStorageSync('liked_posts') || {};
        
        // 如果本地有收藏数据，使用本地数据
        if (Object.keys(favoritesList).length > 0) {
          this.favorites = Object.values(favoritesList).filter(item => likedPosts[item.id]);
          console.log(`从本地存储获取到 ${this.favorites.length} 条收藏记录`);
        } else {
          // 如果本地没有数据，从后端API获取收藏列表
          const response = await getUserFavorites(1, 20);
          console.log('获取收藏列表响应:', response);
          
          if (response && response.list) {
            this.favorites = response.list.map(item => ({
              ...item,
              id: String(item.id)
            }));
            console.log(`从API获取到 ${this.favorites.length} 条收藏记录`);
          } else {
            console.error('接口返回数据格式错误:', response);
            this.favorites = [];
          }
        }
      } catch (error) {
        console.error('获取收藏列表失败:', error);
        // 如果API调用失败，尝试使用本地数据
        try {
          const favoritesList = uni.getStorageSync('favorites_list') || {};
          const likedPosts = uni.getStorageSync('liked_posts') || {};
          this.favorites = Object.values(favoritesList).filter(item => likedPosts[item.id]);
          console.log(`API失败，使用本地存储数据: ${this.favorites.length} 条收藏记录`);
        } catch (localError) {
          console.error('本地数据获取失败:', localError);
          uni.showToast({ title: '获取收藏失败', icon: 'none' });
          this.favorites = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    // 获取图片网格列数
    getGridCols(images) {
      if (!images || images.length === 0) return 1;
      if (images.length === 1) return 1;
      if (images.length === 2) return 2;
      return 3;
    },
    
    // 处理图片URL
    getImageUrl(img) {
      if (!img) return '/static/picture/profile.png';
      
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
      
      return '/static/picture/profile.png';
    },
    
    // 图片预览
    previewImage(images, currentIndex) {
      if (!images || images.length === 0) return;
      
      const urls = images.map(img => this.getImageUrl(img));
      const current = urls[currentIndex] || '';
      
      uni.previewImage({
        current,
        urls,
        indicator: 'number',
        loop: true,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏']
        }
      });
    },
    
    // 图片加载失败处理
    onImageError(e) {
      console.warn('图片加载失败:', e.detail);
      
      const imageElement = e.target || e.currentTarget;
      if (imageElement) {
        imageElement.src = '/static/picture/profile.png';
      }
    },
    
    // 取消收藏
    async remove(id) {
      uni.showModal({
        title: '取消收藏',
        content: '确定要取消收藏该作品吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              // 调用取消点赞接口实现取消收藏
              const response = await cancelLikePost(id);
              
              if (response && response.success) {
                // 从本地列表中移除
                this.favorites = this.favorites.filter(item => String(item.id) !== id);
                
                // 同时更新本地存储
                try {
                  // 移除收藏状态
                  const likedPosts = uni.getStorageSync('liked_posts') || {};
                  delete likedPosts[id];
                  uni.setStorageSync('liked_posts', likedPosts);
                  
                  // 移除收藏列表中的帖子信息
                  const favoritesList = uni.getStorageSync('favorites_list') || {};
                  delete favoritesList[id];
                  uni.setStorageSync('favorites_list', favoritesList);
                  
                  console.log('已从本地存储移除收藏:', id);
                } catch (storageError) {
                  console.error('更新本地存储失败:', storageError);
                }
                
                uni.showToast({ title: '取消收藏成功', icon: 'success' });
              } else {
                uni.showToast({ title: response?.message || '取消收藏失败', icon: 'none' });
              }
            } catch (error) {
              console.error('取消收藏失败:', error);
              uni.showToast({ title: '取消收藏失败，请重试', icon: 'none' });
            }
          }
        }
      });
    },
    
    open(id) {
      // 打开美食圈并跳转到对应帖子详情页
      uni.navigateTo({ 
        url: `/pages/social/detail?id=${encodeURIComponent(id)}` 
      });
    },
    
    goSocial() {
      uni.switchTab ? uni.switchTab({ url: '/pages/social/index' }) : uni.navigateTo({ url: '/pages/social/index' })
    }
  }
}
</script>

<style>
.fav-page { background: #f7f2e7; min-height: 100vh; }
.header { 
  height: 88rpx; 
  display: flex; 
  align-items: center; 
  padding: 0 24rpx; 
  background: #fff; 
  border-bottom: 1rpx solid #f0f0f0;
}
.title { font-size: 32rpx; font-weight: 700; color: #111827; }

.list { padding: 20rpx; }

/* 美化后的收藏卡片样式 */
.post-card {
  background: #fff;
  border-radius: 24rpx;
  margin-bottom: 20rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card:active {
  transform: translateY(-2rpx);
  box-shadow: 0 6rpx 30rpx rgba(0, 0, 0, 0.12);
}

/* 顶部作者信息 */
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.author-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  margin-right: 16rpx;
  border: 2rpx solid #f0f0f0;
}

.author-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 4rpx;
}

.post-time {
  font-size: 22rpx;
  color: #999;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.delete-btn {
  padding: 8rpx 16rpx;
  background: #fff;
  border: 1rpx solid #ff4d4f;
  border-radius: 20rpx;
  color: #ff4d4f;
  font-size: 24rpx;
  line-height: 1;
}

.delete-btn:active {
  background: #ff4d4f;
  color: #fff;
}

/* 帖子内容 */
.post-content {
  margin-bottom: 16rpx;
}

.content-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 帖子图片 */
.post-images {
  margin-bottom: 16rpx;
}

.images-grid {
  display: grid;
  grid-gap: 8rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.images-grid.cols-1 {
  grid-template-columns: 1fr;
}

.images-grid.cols-2 {
  grid-template-columns: 1fr 1fr;
}

.images-grid.cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.post-image {
  width: 100%;
  height: 200rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
}

.more-images {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8rpx;
}

.more-text {
  color: #fff;
  font-size: 24rpx;
  font-weight: 600;
}

/* 底部统计信息 */
.post-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12rpx;
  border-top: 1rpx solid #f0f0f0;
}

.stats {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.heart-icon, .comment-icon {
  font-size: 24rpx;
}

.heart-icon {
  color: #ff4d4f;
}

.comment-icon {
  color: #1890ff;
}

.stat-num {
  font-size: 22rpx;
  color: #666;
}



/* 空状态样式 */
.empty {
  padding: 120rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 32rpx;
  opacity: 0.5;
}

.tip {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 32rpx;
}

.btn {
  height: 72rpx;
  line-height: 72rpx;
  padding: 0 32rpx;
  border-radius: 36rpx;
  background: linear-gradient(135deg, #ff6a00 0%, #ff8c00 100%);
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  border: none;
  box-shadow: 0 4rpx 16rpx rgba(255, 106, 0, 0.3);
}

.btn:active {
  transform: scale(0.98);
  box-shadow: 0 2rpx 8rpx rgba(255, 106, 0, 0.3);
}
</style>