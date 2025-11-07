<template>
  <view class="detail-page">
    <!-- 顶部图 + 渐变遮罩 -->
    <view class="hero">
      <image class="hero-img" :src="recipe.feature || '../../static/default-recipe-cover.jpg'" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-title">
        <text class="name">{{ recipe.name || '菜谱详情' }}</text>
        <image class="favorite-icon" :src="isFavorite ? '../../static/收藏 -已收藏.png' : '../../static/未收藏.png'" mode="aspectFit" @click="toggleFavorite" style="position: absolute; top: 30rpx; right: 30rpx; z-index: 10;" />
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
          <view class="steps-container">
            <view v-for="(step, index) in formatMethod(recipe.method)" :key="index" class="step">
              <text class="step-text">{{ index + 1 }}. {{ step }}{{ step.endsWith('。') ? '' : '。' }}</text>
            </view>
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
import { getRecipeDetail, mapTypeIdToCat, getDailyFavorites } from '../../api/recipes.js'

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
      },
      isFavorite: false
    }
  },
  onLoad(options) {
    if (options && options.id) {
      this.loadRecipeDetail(options.id)
      // 检查该菜谱是否已被收藏到每日菜谱中
      this.checkFavoriteStatus(options.id)
    }
  },
  methods: {
    // 检查收藏状态
    async checkFavoriteStatus(recipeId) {
      try {
        // 获取每日菜谱列表
        const response = await getDailyFavorites();
        
        if (response.success && response.data && Array.isArray(response.data)) {
          // 检查当前菜谱是否在每日菜谱列表中
          const isInDailyFavorites = response.data.some(item => String(item.id) === String(recipeId));
          this.isFavorite = isInDailyFavorites;
          console.log(`菜谱 ${recipeId} 收藏状态:`, isInDailyFavorites ? '已收藏' : '未收藏');
        }
      } catch (err) {
        console.error('检查收藏状态失败：', err);
        // 如果检查失败，默认设置为未收藏状态
        this.isFavorite = false;
      }
    },
    
    // 切换收藏状态
    toggleFavorite() {
      const api = require('../../api/recipes.js');
      
      // 先检查是否已收藏
      if (this.isFavorite) {
        // 使用取消收藏接口删除收藏记录
        api.removeFavorite(this.recipe.id)
          .then((response) => {
            if (response.success) {
              this.isFavorite = false;
              uni.showToast({
                title: '已取消收藏',
                icon: 'none'
              });
              // 强制刷新UI
              this.$forceUpdate();
              // 触发全局事件，通知每日菜谱页面刷新
              uni.$emit('refreshDailyRecipes');
            } else {
              uni.showToast({
                title: response.message || '取消收藏失败',
                icon: 'none'
              });
            }
          })
          .catch(err => {
            console.error('取消收藏失败：', err);
            uni.showToast({
              title: '操作失败，请重试',
              icon: 'none'
            });
          });
      } else {
        // 直接显示日期选择器，不使用简单的收藏检查
        this.showDateSelector();
      }
    },
    // 显示期选择器
    showDateSelector() 
    {
        // 生成未来七天的日期选项（今日、明日、后日 + 未来四天）
        const today = new Date();
        const dateValues = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份补零
          const day = String(date.getDate()).padStart(2, '0'); // 日期补零
          dateValues.push(`${date.getFullYear()}-${month}-${day}`);
        }
        // 第一页：今日、明日、后日 + 更多
        const firstPageOptions = [
          `今日（${today.getMonth() + 1}月${today.getDate()}日）`,
          `明日（${today.getMonth() + 1}月${today.getDate() + 1}日）`,
          `后日（${today.getMonth() + 1}月${today.getDate() + 2}日）`,
          '更多日期'
        ];
        // 弹出第一页日期选择器
        uni.showActionSheet({
          itemList: firstPageOptions,
          success: (res) => {
            if (res.tapIndex !== undefined) {
              if (res.tapIndex < 3) {
                // 选择今日、明日、后日
                const selectedDate = dateValues[res.tapIndex];
                this.confirmAddToDaily(selectedDate);
              } else {
                // 选择“更多日期”，弹出第二页
                const secondPageOptions = [];
                for (let i = 3; i < 7; i++) {
                  const date = new Date(today);
                  date.setDate(today.getDate() + i);
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  secondPageOptions.push(`${month}月${day}日`);
                }
                uni.showActionSheet({
                  itemList: secondPageOptions,
                  success: (res2) => {
                    if (res2.tapIndex !== undefined) {
                      const selectedDate = dateValues[res2.tapIndex + 3];
                      this.confirmAddToDaily(selectedDate);
                    }
                  },
                  fail: (err) => {
                    console.error('第二页日期选择失败：', err);
                  }
                });
              }
            }
          },
          fail: (err) => {
            console.error('第一页日期选择失败：', err);
          }
        });
    },
    // 确认添加到每日菜谱
    confirmAddToDaily(date) 
    {
      const api = require('../../api/recipes.js');
      // 直接使用带日期的收藏接口，一次性完成收藏+设置日期
      console.log('添加到每日菜谱请求参数:', { recipeId: this.recipe.id, date });
      api.addFavoriteWithDate(this.recipe.id, date)
        .then((res) => {
          console.log('添加到每日菜谱响应:', res);
          if (res.success) {
            this.isFavorite = true;
            uni.showToast({
              title: '已添加到每日菜谱',
              icon: 'none'
            });
            // 强制刷新数据
            this.loadRecipeDetail(this.recipe.id);
            // 触发全局事件，通知每日菜谱页面刷新
            uni.$emit('refreshDailyRecipes');
          } else {
            // 特殊处理"已收藏"的情况
            if (res.message && res.message.includes('已收藏')) {
              this.isFavorite = true;
              uni.showToast({
                title: '菜谱已在每日菜谱中',
                icon: 'none'
              });
              // 触发全局事件，通知每日菜谱页面刷新
              uni.$emit('refreshDailyRecipes');
            } else {
              uni.showToast({
                title: res.message || '操作失败，请重试',
                icon: 'none'
              });
            }
          }
        })
        .catch(err => {
          console.error('添加到每日菜谱失败：', err);
          // 特殊处理"已收藏"的异常情况
          if (err.message && err.message.includes('已收藏')) {
            this.isFavorite = true;
            uni.showToast({
              title: '菜谱已在每日菜谱中',
              icon: 'none'
            });
            // 触发全局事件，通知每日菜谱页面刷新
            uni.$emit('refreshDailyRecipes');
          } else {
            uni.showToast({
              title: '操作失败，请重试',
              icon: 'none'
            });
          }
        });
    },
    // 加载菜谱详情
    loadRecipeDetail(id) 
    {
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
    formatMethod(method) 
    {
      if (!method) return []
      return method.split('↵')
        .filter(step => step.trim())
        .map((step, index) => {
          // 移除步骤中可能存在的额外序号（如第二个 1.）
          const cleanedStep = step.replace(/^\d+\.\s*/, '').trim();
          return cleanedStep;
        })
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
    mapTypeIdToCat,
  }
}

</script>

<style>
.detail-page {
  background: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 40rpx;
}
.favorite-icon {
  width: 48rpx;
  height: 48rpx;
  position: absolute;
  right: 30rpx;
  top: 30rpx;
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