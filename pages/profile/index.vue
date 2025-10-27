<template>
  <view class="page">
    <view class="debug-visible" />
    <!-- 顶部 -->
    <view class="header">
      <text class="title">我的</text>
      <text class="gear" @click="onSettings">⚙</text>
    </view>

    <!-- 名片 -->
    <view class="card">
      <view class="card-top">
        <view class="avatar-wrap">
          <image class="avatar" :src="userInfo.avatarUrl || 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png'" mode="aspectFill" />
        </view>
        <view class="profile">
          <text class="name">{{ userInfo.nickName || '美食爱好者' }}</text>
          <text class="desc">{{ userInfo.signature || '分享生活中的美好味道' }}</text>
        </view>
      </view>
      <view class="stats">
        <view class="stat">
          <text class="num">{{ stats.follow }}</text>
          <text class="label">关注</text>
        </view>
        <view class="divider" />
        <view class="stat">
          <text class="num">{{ stats.fans }}</text>
          <text class="label">粉丝</text>
        </view>
        <view class="divider" />
        <view class="stat">
          <text class="num">{{ stats.likes }}</text>
          <text class="label">获赞</text>
        </view>
      </view>
    </view>

    <!-- 登录按钮 (如果未登录) -->
    <view class="login-section" v-if="!userInfo.nickName">
      <button class="login-btn" @click="handleLogin">微信授权登录</button>
    </view>

    <!-- 我的（放在工具与服务前） -->
    <view class="group">
      <view class="group-title">我的内容</view>
      <view class="cell" @click="toast('我的收藏')">
        <text class="cell-icon">❤</text><text class="cell-text">我的收藏</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="toast('浏览历史')">
        <text class="cell-icon">↻</text><text class="cell-text">浏览历史</text><text class="arrow">›</text>
      </view>
    </view>

    <view class="group">
      <view class="group-title">工具与服务</view>
      <view class="cell" @click="toast('营养计算器')">
        <text class="cell-icon">🧮</text><text class="cell-text">营养计算器</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="toast('烹饪计时器')">
        <text class="cell-icon">⏱</text><text class="cell-text">烹饪计时器</text><text class="arrow">›</text>
      </view>

    </view>

    <view class="group">
      <view class="group-title">其他</view>
      <view class="cell" @click="toast('帮助与反馈')">
        <text class="cell-icon">🎧</text><text class="cell-text">帮助与反馈</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="toast('关于我们')">
        <text class="cell-icon">ℹ</text><text class="cell-text">关于我们</text><text class="arrow">›</text>
      </view>
    </view>

    <view style="height: 40rpx;" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      stats: { follow: 125, fans: '1.2k', likes: '3.6k' },
      quicks: []
    }
  },
  onLoad() {
    // 页面加载时获取用户信息
    this.getUserInfo();
  },
  onShow() {
    // 每次显示页面时都刷新用户信息
    this.getUserInfo();
  },
  methods: {
    onSettings() { 
      uni.showToast({ title: '设置入口预留', icon: 'none' }) 
    },
    tapQuick(q) { 
      uni.showToast({ title: q.text, icon: 'none' }) 
    },
    toast(t) { 
      uni.showToast({ title: t, icon: 'none' }) 
    },
    
    // 获取用户信息
    getUserInfo() {
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo) {
          this.userInfo = userInfo;
        }
      } catch (e) {
        console.error('获取用户信息失败', e);
      }
    },
    
    // 处理登录
    handleLogin() {
      // 调用App的登录方法
      const app = getApp();
      if (app && app.$options.methods) {
        app.$options.methods.wxLogin.call(app);
        // 登录后更新页面用户信息
        setTimeout(() => {
          this.getUserInfo();
        }, 1500);
      }
    }
  }
}
</script>

<style>
.page { background: #f7f8fa; min-height: 100vh; }
.debug-visible { height: 2rpx; background: transparent; }

/* 顶部 */
.header {
  height: 88rpx; padding: 0 24rpx;
  display: flex; align-items: center; justify-content: space-between; background: #fff;
}
.title { font-size: 36rpx; font-weight: 700; color: #1a1f36; }
.gear { font-size: 36rpx; color: #6b7280; }

/* 名片 */
.card {
  margin: 16rpx 24rpx; border-radius: 24rpx; padding: 20rpx;
  background: #fff; color: #1f2937;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.card-top { display: flex; align-items: center; }
.avatar-wrap { width: 96rpx; height: 96rpx; border-radius: 50%; overflow: hidden; background: rgba(255,255,255,0.25); }
.avatar { width: 100%; height: 100%; }
.profile { margin-left: 16rpx; display: flex; flex-direction: column; }
.name { font-size: 32rpx; font-weight: 700; }
.desc { margin-top: 6rpx; font-size: 24rpx; opacity: 0.9; }
.stats { margin-top: 16rpx; display: flex; align-items: center; justify-content: space-between; }
.stat { flex: 1; text-align: center; }
.num { font-size: 30rpx; font-weight: 700; }
.label { font-size: 22rpx; opacity: 0.9; }
.divider { width: 1rpx; height: 40rpx; background: #e5e7eb; }

/* 快捷入口 */
.quick {
  margin: 0 24rpx; padding: 20rpx; background: #fff; border-radius: 24rpx;
  display: flex; flex-wrap: wrap; justify-content: space-between;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.quick-item { width: 25%; padding: 8rpx 0; display: flex; flex-direction: column; align-items: center; box-sizing: border-box; }
.q-icon { font-size: 36rpx; color: #ff6a00; }
.q-text { margin-top: 8rpx; font-size: 24rpx; color: #374151; }

/* 分组列表 */
.group { margin: 16rpx 24rpx; background: #fff; border-radius: 24rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); }
.group-title { padding: 20rpx 20rpx 0; font-size: 26rpx; color: #6b7280; }
.cell { padding: 24rpx 20rpx; display: flex; align-items: center; }
.cell + .cell { border-top: 1rpx solid #f0f2f5; }
.cell-icon { width: 48rpx; text-align: center; font-size: 30rpx; color: #ff6a00; }
.cell-text { flex: 1; font-size: 28rpx; color: #1f2937; }
.arrow { font-size: 36rpx; color: #c7cdd3; }

/* 登录按钮 */
.login-section {
  display: flex;
  justify-content: center;
  margin: 20rpx 24rpx;
}
.login-btn {
  width: 80%;
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  color: #fff;
  border-radius: 999rpx;
  font-size: 30rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>