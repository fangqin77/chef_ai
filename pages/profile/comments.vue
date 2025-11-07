<template>
  <view class="page">
    <view class="header">
      <text class="title">我的评论</text>
    </view>

    <view v-if="!comments.length" class="empty">
      <text class="tip">暂无评论记录</text>
      <button class="btn primary small" @click="goSocial">去美食圈</button>
    </view>

    <scroll-view v-else scroll-y class="list">
      <view class="card" v-for="comment in comments" :key="comment.id">
        <view class="top">
          <image class="avatar" :src="comment.avatarUrl || fallbackImg" mode="aspectFill" />
          <view class="meta">
            <text class="name">{{ comment.userName || '我' }}</text>
            <text class="time">{{ formatTime(comment.createTime) }}</text>
          </view>
          <view class="ops">
            <button class="btn tiny ghost" @click="open(comment)">去查看</button>
          </view>
        </view>
        <view class="content">{{ comment.content }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getUserComments } from '@/api/recipes';

export default {
  data() {
    return {
      comments: [],
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      loading: false
    }
  },
  async onShow() {
    await this.loadComments();
  },
  methods: {
    // 加载评论列表
    async loadComments() {
      if (this.loading) return;
      
      try {
        this.loading = true;
        
        // 检查用户是否登录
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          this.comments = [];
          return;
        }
        
        // 从后端API获取评论列表
        const response = await getUserComments(1, 20);
        console.log('获取评论列表响应:', response);
        
        if (response && response.list) {
          this.comments = response.list.map(comment => ({
            ...comment,
            id: String(comment.id),
            postId: String(comment.postId || comment.postId)
          }));
          console.log(`获取到 ${this.comments.length} 条评论记录`);
        } else {
          console.error('接口返回数据格式错误:', response);
          this.comments = [];
        }
      } catch (error) {
        console.error('获取评论列表失败:', error);
        uni.showToast({ title: '获取评论失败', icon: 'none' });
        this.comments = [];
      } finally {
        this.loading = false;
      }
    },
    
    // 格式化时间显示
    formatTime(timestamp) {
      if (!timestamp) return '刚刚';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      
      if (diff < 60000) return '刚刚';
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
      if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前';
      
      return date.toLocaleDateString();
    },
    
    goSocial() {
      uni.switchTab ? uni.switchTab({ url: '/pages/social/index' }) : uni.navigateTo({ url: '/pages/social/index' })
    },
    
    open(comment) {
      if (!comment || !comment.postId) return;
      // 跳转到对应的帖子详情页
      uni.navigateTo({ 
        url: `/pages/social/detail?id=${encodeURIComponent(comment.postId)}` 
      });
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.header { padding: 16rpx 24rpx; }
.title { font-size: 30rpx; color: #374151; font-weight: 700; }
.list { max-height: calc(100vh - 80rpx); }
.card { margin: 16rpx 24rpx; background: #fff; border-radius: 20rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); padding: 16rpx; }
.top { display: flex; gap: 12rpx; align-items: flex-start; }
.avatar { width: 64rpx; height: 64rpx; border-radius: 50%; background: #eee; }
.meta { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.name { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.time { font-size: 22rpx; color: #9ca3af; margin-top: 6rpx; }
.ops { display: flex; gap: 8rpx; }
.content { margin-top: 10rpx; font-size: 26rpx; color: #374151; }
.btn { border-radius: 12rpx; font-size: 24rpx; }
.btn.primary { background: linear-gradient(90deg,#FFE27A,#FFC107); color: #fff; }
.btn.small { height: 64rpx; line-height: 64rpx; padding: 0 24rpx; }
.btn.tiny { height: 52rpx; line-height: 52rpx; padding: 0 16rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.empty { padding: 60rpx 24rpx; display: flex; flex-direction: column; align-items: center; gap: 16rpx; }
.tip { font-size: 26rpx; color: #6b7280; }
</style>