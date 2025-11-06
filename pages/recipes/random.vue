<template>
  <view class="page">
    <view class="header">
      <text class="title">随机菜谱</text>
      <view class="mini-cards">
        <view 
          class="mini-card" 
          v-for="(recipe, index) in randomRecipes" 
          :key="recipe.id"
        >
          <image class="mini-cover" :src="recipe.cover || '/static/recipe-detail-2.jpg'" mode="aspectFill" />
        </view>
      </view>
    </view>

    <!-- 菜谱详情区域 -->
    <view class="detail-view" v-if="selectedRecipe">
      <!-- 上半部分：图片和菜谱名字 -->
      <view class="detail-top">
        <image class="detail-cover" :src="selectedRecipe.cover" mode="aspectFill" />
        <text class="detail-name">{{ selectedRecipe.name }}</text>
      </view>

      <!-- 下方区域：调料、做法和基本信息 -->
      <view class="detail-bottom">
        <!-- 调料 -->
        <view class="detail-section">
          <text class="section-title">调料</text>
          <view class="section-content-container">
            <text class="section-content" style="font-weight: bold; font-size: 32rpx;">{{ selectedRecipe.condiments || '暂无调料信息' }}</text>
          </view>
        </view>
        
        <!-- 做法步骤 -->
        <view class="detail-section">
          <text class="section-title">做法</text>
          <view class="section-content-container">
            <view class="steps-container">
              <view v-for="(step, index) in selectedRecipe.steps" :key="index" class="step">
                <text class="step-text" style="font-weight: normal !important;">{{ index + 1 }}. {{ step.replace(/^\d+\.\s*/, '').trim() }}{{ step.endsWith('。') ? '' : '。' }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <!-- 基本信息 -->
        <view class="detail-section">
          <text class="section-title">基本信息</text>
          <view class="basic-info">
            <text>ID: {{ selectedRecipe.id }}</text>
            <text>分类ID: {{ selectedRecipe.categoryId || '无' }}</text>
            <text>难度: {{ selectedRecipe.level || '适中' }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="nav-buttons">
      <button class="nav-button prev" @click="prevRecipe">上一个</button>
      <button class="nav-button next" @click="nextRecipe">下一个</button>
    </view>
  </view>
</template>

<script>
import { getRandomRecipes } from '@/api/recipes.js';

export default {
  data() {
    return {
      randomRecipes: [],
      selectedIndex: 0
    };
  },
  computed: {
    selectedRecipe() {
      return this.randomRecipes[this.selectedIndex];
    }
  },
  onLoad() {
    this.loadRandomRecipes();
  },
  methods: {
    async loadRandomRecipes() {
      uni.showLoading({ title: '加载中...' });
      try {
        const res = await getRandomRecipes(3);
        this.randomRecipes = Array.isArray(res) ? res.map(r => ({
          id: r.id,
          name: r.name || '菜谱',
          cover: r.feature || '/static/default-recipe-cover.jpg',
          level: r.level || '适中',
          ingredients: r.ingredients,
          steps: r.method ? r.method.split('↵').filter(step => step.trim()).map(step => step.trim()) : ['暂无做法信息'],
          condiments: r.condiments,
          categoryId: r.typeId
        })) : [];
      } catch (err) {
        console.error('加载随机菜谱失败:', err);
        uni.showToast({ title: '加载失败', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    selectRecipe(index) {
      this.selectedIndex = index;
    },
    prevRecipe() {
      if (this.randomRecipes.length === 0) return;
      this.selectedIndex = (this.selectedIndex - 1 + this.randomRecipes.length) % this.randomRecipes.length;
    },
    nextRecipe() {
      if (this.randomRecipes.length === 0) return;
      this.selectedIndex = (this.selectedIndex + 1) % this.randomRecipes.length;
    },
    selectRecipe(index) {
      const recipeId = this.randomRecipes[index].id;
      uni.navigateTo({
        url: `/pages/recipes/detail?id=${recipeId}`
      });
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
  background: #f7f2e7;
  min-height: 100vh;
}

.header {
  margin-top: -100rpx;
  margin-bottom: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
  margin-top: 100rpx;
}

.mini-cards {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  gap: 20rpx;
}

.mini-card {
  flex: 1;
  width: 240rpx;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.mini-cover {
  width: 100%;
  height: 135rpx;
  background: #eee;
}

.detail-view {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.detail-cover {
  width: 100%;
  height: 400rpx;
  background: #eee;
}

.detail-top {
  position: relative;
}

.detail-name {
  position: absolute;
  left: 24rpx;
  bottom: 24rpx;
  font-size: 32rpx;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.detail-bottom {
  padding: 24rpx;
}

.detail-section {
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1a1f36;
  padding-left: 16rpx;
  border-left: 8rpx solid #FFD700;
  margin-bottom: 16rpx;
  display: block;
}

.section-content-container {
  margin-top: 8rpx;
  padding-left: 24rpx;
}

.section-content {
  font-size: 26rpx;
  color: #666;
  white-space: pre-line;
  line-height: 1.8;
  display: block;
}

.basic-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  gap: 20rpx;
}

.nav-button {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 28rpx;
  background: #FFD750;
  color: #1a1f36;
}

.nav-button.prev {
  margin-right: 10rpx;
}

.nav-button.next {
  margin-left: 10rpx;
}

.tag {
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
}

.tag-green {
  background: #e9f8ee;
  color: #27ae60;
}

.tag-orange {
  background: #fff3e6;
  color: #FFC107;
}
</style>