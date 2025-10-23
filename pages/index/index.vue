<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="nav">
      <view class="nav-left">
        <image class="logo" src="/static/logo.png" mode="heightFix" />
        <text class="brand">智趣厨房</text>
      </view>
      <view class="nav-right">
        <text class="bell">󰂞</text>
      </view>
    </view>

    <!-- 搜索框 -->
    <view class="search">
      <text class="search-icon">🔍</text>
      <input class="search-input" type="text" placeholder="搜索菜谱或食材" confirm-type="search" />
    </view>

    <!-- 对话入口按钮 -->
    <view class="chat-btn" hover-class="cta-hover" @click="onOpenChat">
      <text class="chat-btn-text">不知道吃什么？我来给你灵感！</text>
    </view>







    <view style="height: 40rpx;" />
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onOpenChat() {
      uni.navigateTo({ url: '/pages/chat/index' });
    }
  }
}
</script>

<style>
.page {
  padding: 24rpx;
  background: #ffffff;
  min-height: 100vh;
  box-sizing: border-box;
}

/* 顶部栏 */
.nav {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-left {
  display: flex;
  align-items: center;
}
.logo {
  height: 40rpx;
  width: 40rpx;
  border-radius: 8rpx;
}
.brand {
  font-size: 34rpx;
  color: #ff6a00;
  font-weight: 600;
  margin-left: 12rpx;
}
.nav-right .bell {
  font-size: 40rpx;
  color: #333;
}

/* 搜索框 */
.search {
  margin-top: 16rpx;
  height: 88rpx;
  border-radius: 44rpx;
  background: #f5f6f7;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
}
.search-icon {
  font-size: 30rpx;
  color: #999;
  margin-right: 16rpx;
}
.search-input {
  flex: 1;
  font-size: 28rpx;
}

/* 对话入口按钮 */
.chat-btn {
  margin-top: 24rpx;
  height: 100rpx;
  border-radius: 999rpx;
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 10rpx 24rpx rgba(255, 106, 0, 0.25);
}
.cta-hover { opacity: 0.92; }
.chat-btn-text {
  font-size: 30rpx;
  font-weight: 700;
  letter-spacing: 1rpx;
}


</style>