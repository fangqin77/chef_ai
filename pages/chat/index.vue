<template>
  <view class="chat-page">
    <!-- 顶部安全区域占位（小程序默认导航栏已由 pages.json 设置标题） -->

    <!-- 会话区 -->
    <scroll-view class="messages" scroll-y>
      <view class="msg assistant">
        <image class="avatar" src="https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png" mode="aspectFit" />
        <view class="bubble">
          今天吃点什么呢？可以输入食材或口味偏好，我来给你灵感～
        </view>
      </view>

      <!-- 可继续追加更多消息 -->
    </scroll-view>

    <!-- 输入区（占位，后续接入工作流） -->
    <view class="input-bar">
      <view class="input-placeholder">输入食材/偏好（占位，后续接入工作流）</view>
      <button class="send-btn" disabled>发送</button>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {},
};
</script>

<style>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f7f9;
}

/* 会话区 */
.messages {
  flex: 1;
  padding: 24rpx 24rpx 12rpx 24rpx;
  box-sizing: border-box;
}
.msg {
  display: flex;
  margin-bottom: 20rpx;
}
.msg.assistant .avatar {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
  border-radius: 12rpx;
}
.bubble {
  max-width: 560rpx;
  padding: 18rpx 22rpx;
  border-radius: 18rpx 18rpx 18rpx 6rpx;
  background: #ffffff;
  color: #1f2937;
  font-size: 28rpx;
  line-height: 1.6;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.05);
}

/* 输入区 */
.input-bar {
  padding: 16rpx 20rpx 28rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #f7f7f9;
  box-sizing: border-box;
}
.input-placeholder {
  flex: 1;
  height: 88rpx;
  border-radius: 44rpx;
  background: #eceff3;
  color: #9aa3af;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  font-size: 26rpx;
}
.send-btn {
  height: 88rpx;
  padding: 0 28rpx;
  border-radius: 44rpx;
  background: #ff6a00;
  color: #fff;
  font-size: 28rpx;
  opacity: 0.6;
}
</style>