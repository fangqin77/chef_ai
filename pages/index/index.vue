<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="nav">
      <view class="nav-left">
        <image class="logo" src="/static/logo.png" mode="heightFix" />
        <text class="brand">logo</text>
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

    <!-- CTA 按钮 -->
    <view class="cta" hover-class="cta-hover" @click="onPickToday">
      <text class="cta-icon">🍽</text>
      <text class="cta-text">今天吃啥?</text>
    </view>

    <!-- 分类 -->
    <scroll-view class="categories" scroll-x>
      <view class="cat-item" v-for="c in categories" :key="c.key" @click="onTapCategory(c)">
        <view class="cat-avatar">
          <text class="cat-emoji">{{ c.emoji }}</text>
        </view>
        <text class="cat-name">{{ c.name }}</text>
      </view>
    </scroll-view>

    <!-- 推荐标题 -->
    <view class="section-title">推荐菜谱</view>

    <!-- 推荐卡片 -->
    <view class="card" @click="onOpenRecipe(recommend.id)">
      <image class="card-cover" :src="recommend.cover" mode="aspectFill" />
      <view class="card-body">
        <view class="card-row">
          <text class="card-title">{{ recommend.title }}</text>
          <text class="card-like">♡</text>
        </view>
        <view class="card-meta">
          <view class="tag tag-green">简单</view>
          <view class="meta-item">⏱ {{ recommend.time }} 分钟</view>
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
      categories: [
        { key: 'cn', name: '中式菜谱', emoji: '🥘' },
        { key: 'west', name: '西式菜谱', emoji: '🥗' },
        { key: 'jp', name: '日式菜谱', emoji: '🍣' },
        { key: 'kr', name: '韩式菜谱', emoji: '🥣' },
        { key: 'veg', name: '素食', emoji: '🥦' },
      ],
      recommend: {
        id: 'gongbao-jiding',
        title: '宫保鸡丁',
        time: 25,
        // 临时占位图：使用本地 logo 以避免外链依赖，项目内可替换为真实图片 /static/xxx.jpg
        cover: '/static/logo.png'
      }
    }
  },
  methods: {
    onPickToday() {
      uni.removeStorageSync('recipes_cat');
      uni.switchTab({ url: '/pages/recipes/index' });
    },
    onTapCategory(c) {
      uni.setStorageSync('recipes_cat', c.key);
      uni.switchTab({ url: '/pages/recipes/index' });
    },
    onOpenRecipe(id) {
      uni.showToast({ title: '打开：' + id, icon: 'none' })
      // 这里按需跳转到详情页
      // uni.navigateTo({ url: '/pages/recipe/detail?id=' + id })
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

/* CTA */
.cta {
  margin-top: 24rpx;
  height: 100rpx;
  border-radius: 20rpx;
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.cta-hover {
  opacity: 0.9;
}
.cta-icon {
  font-size: 34rpx;
  margin-right: 12rpx;
}
.cta-text {
  font-size: 32rpx;
  font-weight: 600;
}

/* 分类 */
.categories {
  margin-top: 28rpx;
  white-space: nowrap;
}
.cat-item {
  display: inline-flex;
  width: 160rpx;
  flex-direction: column;
  align-items: center;
  margin-right: 12rpx;
}
.cat-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 24rpx;
  background: #fff;
  box-shadow: 0 10rpx 20rpx rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cat-emoji {
  font-size: 56rpx;
}
.cat-name {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #333;
}

/* 标题 */
.section-title {
  margin-top: 28rpx;
  font-size: 32rpx;
  font-weight: 700;
  color: #223;
}

/* 卡片 */
.card {
  margin-top: 20rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.06);
}
.card-cover {
  width: 100%;
  height: 360rpx;
  background: #eee;
}
.card-body {
  padding: 24rpx;
}
.card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #1d1e20;
}
.card-like {
  color: #bdc1c6;
  font-size: 30rpx;
}
.card-meta {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
}
.tag {
  padding: 6rpx 16rpx;
  border-radius: 100rpx;
  font-size: 22rpx;
  margin-right: 18rpx;
}
.tag-green {
  background: #e9f8ee;
  color: #27ae60;
}
.meta-item {
  font-size: 24rpx;
  color: #6b7280;
  display: flex;
  align-items: center;
}
</style>