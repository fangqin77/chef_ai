<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="nav">
      <view class="nav-left">
        <image class="logo" src="https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png" mode="heightFix" />
        <text class="brand">智趣厨房</text>
      </view>
      <view class="nav-right">
        <text class="bell" @click="goToProfileOrLogin">👤</text>
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

    <!-- 推荐菜谱 -->
    <view class="recommend-section">
      <view class="recommend-title">猜你喜欢</view>
      <view class="recipe-list">
        <view class="recipe-card" v-for="(recipe, index) in recipes" :key="index">
          <image class="recipe-image" :src="recipe.image" mode="aspectFill" />
          <view class="recipe-info">
            <text class="recipe-title">{{ recipe.title }}</text>
            <text class="recipe-author">{{ recipe.author }}</text>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 40rpx;" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      recipes: [
        {
          image: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png',
          title: '家常红烧肉',
          author: '厨房日记'
        },
        {
          image: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png',
          title: '清炒时蔬',
          author: '美味厨房'
        },
        {
          image: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png',
          title: '香煎三文鱼',
          author: '爱生活的吃货'
        },
        {
          image: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png',
          title: '麻婆豆腐',
          author: '川菜大师'
        }
      ]
    };
  },
  methods: {
    onOpenChat() {
      uni.navigateTo({ url: '/pages/chat/index' });
    },
    goToProfileOrLogin() {
      // 检查是否已登录
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo && userInfo.nickName) {
        // 已登录，跳转到个人中心
        uni.switchTab({ url: '/pages/profile/index' });
      } else {
        // 未登录，执行微信登录
        const app = getApp();
        if (app && app.$options.methods) {
          app.$options.methods.wxLogin.call(app);
        }
      }
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

/* 推荐菜谱 */
.recommend-section {
  margin-top: 40rpx;
}
.recommend-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
}
.recipe-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}
.recipe-card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}
.recipe-image {
  width: 100%;
  height: 240rpx;
}
.recipe-info {
  padding: 16rpx;
}
.recipe-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 70rpx
}
.recipe-author {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}
</style>