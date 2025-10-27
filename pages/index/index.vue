<template>
  <view class="full-bg">
    <image class="bg" src="/static/home-bg.jpg" mode="aspectFill" />
    <!-- 叠加层 -->
    <view class="overlay">
      <!-- 顶部1/3分割线 -->
      <view class="divider" />

      <!-- 云朵点击入口：进入AI聊天 -->
      <view class="cloud-entry" @click="goChat">
        <text class="cloud-text">进入 AI 对话聊天</text>
      </view>

      <!-- 两个方块按钮 -->
      <view class="quick-actions">
        <view class="action-card left" @click="goRandomRecipe">
          <text class="ac-title">随机食谱</text>
          <text class="ac-desc">今天吃什么？点我推荐</text>
        </view>
        <view class="action-card right" @click="goPlan">
          <text class="ac-title">每日计划收藏</text>
          <text class="ac-desc">查看今日想做的菜</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goChat() {
      uni.navigateTo({ url: '/pages/chat/index' })
    },
    goRandomRecipe() {
      // 跳到菜谱页的推荐模式
      uni.navigateTo({ url: '/pages/recipes/index?recommend=1' })
    },
    goPlan() {
      // 跳到个人页（收藏/计划）
      uni.navigateTo({ url: '/pages/profile/index' })
    }
  }
}
</script>

<style>
.full-bg {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* 覆盖层，负责布局 */
.overlay {
  position: absolute;
  inset: 0;
}
/* 顶部1/3分割线 */
.divider {
  position: absolute;
  left: 6%;
  right: 6%;
  top: 33%;
  height: 2rpx;
  background: rgba(255,255,255,0.7);
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.12);
}
/* 云朵入口：位于卡通人物下方大致区域（居中偏下，可按需微调） */
.cloud-entry {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 48%;
  background: #ffffff;
  color: #333;
  padding: 18rpx 28rpx;
  border-radius: 9999rpx;
  box-shadow: 0 12rpx 30rpx rgba(0,0,0,0.12);
  border: 2rpx solid rgba(255,255,255,0.85);
  min-width: 360rpx;
  text-align: center;
  opacity: 0.95;
}
.cloud-text {
  font-size: 28rpx;
  font-weight: 600;
}
/* 两个方块按钮：位于分割线下方 */
.quick-actions {
  position: absolute;
  top: calc(33% + 40rpx);
  left: 6%;
  right: 6%;
  display: flex;
  justify-content: space-between;
  gap: 28rpx;
}
.action-card {
  flex: 1 1 0;
  height: 220rpx;
  background: rgba(255,255,255,0.9);
  border-radius: 24rpx;
  box-shadow: 0 16rpx 36rpx rgba(0,0,0,0.16);
  backdrop-filter: blur(6rpx);
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ac-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}
.ac-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #4b5563;
}
</style>