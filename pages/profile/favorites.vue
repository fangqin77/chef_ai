<template>
  <view class="fav-page">
    <view class="header">
      <text class="title">我的收藏</text>
    </view>

    <view class="list" v-if="favorites.length">
      <view class="item" v-for="item in favorites" :key="item.id" @click="open(item.id)">
        <image class="cover" :src="(item.images && item.images[0]) || fallback" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ item.name || item.content || '作品' }}</text>
          <text class="desc ellipsis">{{ item.content || item.text || '' }}</text>
        </view>
        <button class="del" @click.stop="remove(item.id)">删除</button>
        <text class="arrow">›</text>
      </view>
    </view>

    <view class="empty" v-else>
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
        
        // 从后端API获取收藏列表
        const response = await getUserFavorites(1, 20);
        console.log('获取收藏列表响应:', response);
        
        if (response && response.list) {
          this.favorites = response.list.map(item => ({
            ...item,
            id: String(item.id)
          }));
          console.log(`获取到 ${this.favorites.length} 条收藏记录`);
        } else {
          console.error('接口返回数据格式错误:', response);
          this.favorites = [];
        }
      } catch (error) {
        console.error('获取收藏列表失败:', error);
        uni.showToast({ title: '获取收藏失败', icon: 'none' });
        this.favorites = [];
      } finally {
        this.loading = false;
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
.header { height: 88rpx; display: flex; align-items: center; padding: 0 24rpx; background: #fff; }
.title { font-size: 32rpx; font-weight: 700; color: #111827; }
.list { padding: 16rpx 24rpx 24rpx; }
.item {
  display: flex; align-items: center; gap: 12rpx;
  background: #fff; border-radius: 20rpx; padding: 12rpx; margin-bottom: 12rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.cover { width: 120rpx; height: 90rpx; border-radius: 12rpx; background: #eee; }
.info { flex: 1; display: flex; flex-direction: column; }
.name { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.desc { margin-top: 6rpx; font-size: 24rpx; color: #6b7280; }
.ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.arrow { font-size: 36rpx; color: #c7cdd3; }
.empty { padding: 60rpx 24rpx; display: flex; flex-direction: column; gap: 16rpx; align-items: center; }
.tip { font-size: 26rpx; color: #6b7280; }
.btn { height: 72rpx; line-height: 72rpx; padding: 0 22rpx; border-radius: 14rpx; background: #f3f4f6; color: #374151; }
</style>