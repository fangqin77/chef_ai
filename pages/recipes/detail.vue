<template>
  <view class="detail-page">
    <!-- 顶部图 + 渐变遮罩 -->
    <view class="hero">
      <image class="hero-img" :src="recipe.feature || '../../static/default-recipe-cover.jpg'" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-title">
        <text class="name">{{ recipe.name || '菜谱详情' }}</text>
      </view>
    </view>

    <!-- 详情卡片 -->
    <view class="card">
      <!-- 调料 -->
      <view class="section">
        <view class="section-title">调料</view>
        <view class="section-content">
          <text>{{ recipe.condiments || '暂无调料信息' }}</text>
        </view>
      </view>

      <!-- 做法 -->
      <view class="section">
        <view class="section-title">做法</view>
        <view class="section-content">
          <view v-for="(step, index) in formatMethod(recipe.method)" :key="index" class="step">
            <text class="step-index">{{ index + 1 }}.</text>
            <text class="step-text">{{ step }}</text>
          </view>
        </view>
      </view>

      <!-- 基本信息 -->
      <view class="section">
        <view class="section-title">基本信息</view>
        <view class="section-content info-list">
          <view class="info-item">
            <text class="info-label">ID：</text>
            <text class="info-value">{{ recipe.id || '未知' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">分类ID：</text>
            <text class="info-value">{{ recipe.typeId || '未知' }}</text>
          </view>
          <view class="info-item">
            <text class="info-label">难度：</text>
            <text class="info-value">{{ recipe.ingredients || '未知' }}</text>
          </view>
          
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getRecipeDetail, mapTypeIdToCat } from '../../api/recipes.js'

export default {
  data() {
    return {
      recipe: {
        id: null,
        typeId: null,
        name: '',
        method: '',
        condiments: '',
        ingredients: null,
        feature: ''
      }
    }
  },
  onLoad(options) {
    if (options && options.id) {
      this.loadRecipeDetail(options.id)
    }
  },
  methods: {
    // 加载菜谱详情
    loadRecipeDetail(id) {
      getRecipeDetail(id)
        .then(res => {
          if (res) {
            this.recipe = {
              id: res.id,
              typeId: res.typeId,
              name: res.name,
              method: res.method || '',
              condiments: res.condiments || '',
              ingredients: res.ingredients || 0,
              feature: res.feature || ''
            }
            console.log('菜谱详情数据:', this.recipe); // 调试日志
          }
        })
        .catch(err => {
          console.error('获取菜谱详情失败：', err)
          uni.showToast({
            title: '加载失败，请重试',
            icon: 'none'
          })
        })
    },
    // 格式化做法步骤
    formatMethod(method) {
      if (!method) return []
      return method.split('↵')
        .filter(step => step.trim())
        .map(step => step.replace(/^\d+\.\s*/, '')) // 移除步骤前的序号（如 1.）
    },
    // 难度等级文本
    getDifficultyText(level) {
      return level || '未知';
    },
    // 难度等级样式
    getDifficultyClass(level) {
      if (level === 1) return 'tag-green'
      if (level === 2) return 'tag-orange'
      if (level === 3) return 'tag-red'
      return ''
    },
    mapTypeIdToCat
  }
}
</script>

<style>
.detail-page {
  background: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 40rpx;
}

/* 顶部大图 */
.hero {
  position: relative;
  height: 500rpx;
  overflow: hidden;
}
.hero-img {
  width: 100%;
  height: 100%;
  display: block;
}
.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%);
}
.hero-title {
  position: absolute;
  left: 30rpx;
  right: 30rpx;
  bottom: 30rpx;
  color: #fff;
}
.name {
  font-size: 48rpx;
  font-weight: 800;
  margin-bottom: 16rpx;
}

/* 详情卡片 */
.card {
  margin: 20rpx 30rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.section {
  margin-bottom: 30rpx;
}
.section:last-child {
  margin-bottom: 0;
}
.section-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
  border-left: 6rpx solid #ff8a34;
}
.section-content {
  font-size: 32rpx;
  color: #555;
  line-height: 1.8;
}
.step {
  display: flex;
  margin-bottom: 16rpx;
  padding-left: 0;
  margin-left: 0;
}
.step-index {
  margin-right: 8rpx;
  width: 50rpx;             /* 固定宽度，防止10.变长挤压 */
  text-align: left;         /* 靠左对齐 */
  color: #333;
}
.step-text {
  flex: 1;
  font-size: 32rpx;
  line-height: 1.8;
}
.info-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.info-item {
  display: flex;
  align-items: center;
}
.info-label {
  color: #888;
  margin-right: 8rpx;
}
.info-value {
  color: #333;
  font-size: 32rpx;
}
</style>