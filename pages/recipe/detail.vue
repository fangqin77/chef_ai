<template>
  <view class="page">
    <view v-if="recipe" class="recipe-detail">
      <!-- 封面图 -->
      <image class="cover" :src="recipe.coverImg" mode="widthFix" />

      <!-- 标题与基本信息 -->
      <view class="header">
        <text class="title">{{ recipe.name }}</text>
        <view class="meta">
          <text class="tag">{{ recipe.difficulty || '简单' }}</text>
          <text class="time">⏱ {{ recipe.cookTime || '20' }}分钟</text>
        </view>
      </view>

      <!-- 原料 -->
      <view class="section">
        <view class="section-title">原料</view>
        <view class="ingredients">
          <text class="ingredient" v-for="(item, index) in parseIngredients" :key="index">{{ item }}</text>
        </view>
      </view>

      <!-- 做法 -->
      <view class="section">
        <view class="section-title">做法</view>
        <view class="steps">
          <text class="step" v-for="(step, index) in parseSteps" :key="index">{{ index + 1 }}. {{ step }}</text>
        </view>
      </view>
    </view>

    <view v-else class="loading">
      <text>加载中...</text>
    </view>
  </view>
</template>

<script>
import BASE_URL from '../../config/api.js';

export default {
  data() {
    return {
      recipe: null
    };
  },
  onLoad(options) {
    if (options && options.id) {
      this.loadRecipeDetail(options.id);
    }
  },
  computed: {
    parseIngredients() {
      if (!this.recipe || !this.recipe.ingredients) return [];
      return this.recipe.ingredients.split(/[,\n]/).filter(item => item.trim() !== '');
    },
    parseSteps() {
      if (!this.recipe || !this.recipe.steps) return [];
      return this.recipe.steps.split(/[,\n]/).filter(item => item.trim() !== '');
    }
  },
  methods: {
    loadRecipeDetail(id) {
      uni.request({
        url: `${BASE_URL}/api/recipes/${id}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.recipe = res.data;
          }
        },
        fail: (err) => {
          console.error('加载菜谱详情失败', err);
          uni.showToast({ title: '加载失败', icon: 'none' });
        }
      });
    }
  }
};
</script>

<style>
.page {
  background: #ffffff;
  min-height: 100vh;
}

.cover {
  width: 100%;
  height: 400rpx;
}

.header {
  padding: 24rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
}

.meta {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
}

.tag {
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  background: #fff3e6;
  color: #ff8a34;
}

.time {
  margin-left: 16rpx;
  font-size: 24rpx;
  color: #6b7280;
}

.section {
  padding: 24rpx;
  margin-top: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1f36;
  margin-bottom: 24rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #eee;
}

.ingredients {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.ingredient {
  padding: 12rpx 24rpx;
  background: #f3f4f6;
  border-radius: 999rpx;
  font-size: 26rpx;
  color: #374151;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.step {
  font-size: 28rpx;
  color: #374151;
  line-height: 1.6;
}
</style>