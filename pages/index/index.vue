<template>
  <view class="full-bg">

    <!-- 叠加层 -->
    <view class="overlay">
      <!-- 右上角卡通图 -->
      <image class="corner-cartoon" src="/static/retouch_2025102716043091.png" mode="widthFix" />
      <!-- 顶部1/3分割线 -->
      <view class="divider" />
      <!-- 两个小型方块 -->
      <view class="quick-actions small">
        <view class="action-card mini" @click="goRandomRecipe">
          <text class="ac-title">随机菜谱</text>
        </view>
        <view class="action-card mini" @click="goPlan">
          <text class="ac-title">每日菜谱</text>
        </view>
      </view>

      <!-- AI 对话气泡（卡通人物左侧） -->
      <view class="ai-bubble" @click="goChat">
        <text class="ai-text">与 AI 对话，生成今日菜谱</text>
        <view class="ai-tail" />
      </view>

      <!-- 两个方块按钮已移除 -->
      
      <!-- 每日推荐菜谱 -->
      <view class="recommend-section">
        <view class="section-title">每日推荐菜谱</view>
        <view class="recommend-container" v-if="recommendedRecipes.length">
          <view class="arrow left" @click="prevSlide">‹</view>
          <view class="arrow right" @click="nextSlide">›</view>
          <swiper class="recommend-swiper" circular autoplay interval="4000" :current="currentIndex">
            <swiper-item v-for="item in recommendedRecipes" :key="item.id">
              <view class="recipe-card" @click="goRecipeDetail(item)">
                <view class="img-wrap">
                  <image class="recipe-img" :src="item.image || '/static/yuan_97e57f821c79b841651df5b413309328.jpg'" mode="aspectFill" />
                  <view class="name-plate">{{ item.name }}</view>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <view class="recommend-container empty" v-else @click="goChat">
          <text class="empty-text">今日暂无推荐，点我与 AI 对话生成专属菜谱</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recommendedRecipes: [
        { id: 'yuxiang-rousi', name: '鱼香肉丝', image: '/static/yuan_97e57f821c79b841651df5b413309328.jpg' },
        { id: 'r1', name: '宫保鸡丁', image: '' },
        { id: 'r2', name: '红烧肉', image: '' },
        { id: 'r3', name: '麻婆豆腐', image: '' },
        { id: 'r4', name: '清蒸鲈鱼', image: '' }
      ],
      currentIndex: 0
    }
  },
  methods: {
    goChat() {
      uni.navigateTo({ url: '/pages/chat/index' })
    },
    goRandomRecipe() {
      // 随机菜谱：跳转到独立随机页面
      uni.navigateTo({ url: '/pages/recipes/random' })
    },
    goPlan() {
      // 跳到“每日菜谱”（购物车样式）
      uni.navigateTo({ url: '/pages/recipes/daily' })
    },
    goRecipeDetail(item) {
      // 跳到菜谱详情（按你的路由规则调整）
      uni.navigateTo({ url: `/pages/recipes/index?detailId=${item.id}` })
    },
    prevSlide() {
      if (!this.recommendedRecipes.length) return
      this.currentIndex = (this.currentIndex - 1 + this.recommendedRecipes.length) % this.recommendedRecipes.length
    },
    nextSlide() {
      if (!this.recommendedRecipes.length) return
      this.currentIndex = (this.currentIndex + 1) % this.recommendedRecipes.length
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
  background-color: #f7f2e7; /* 米白色 */
}
.bg {
  display: none;
}
/* 覆盖层，负责布局 */
.overlay {
  position: absolute;
  inset: 0;
}
/* 顶部全宽分割线 */
.divider {
  position: absolute;
  left: 0;
  right: 0;
  top: 22%;
  height: 6rpx;
  background: #ffffff;
  box-shadow: 0 4rpx 14rpx rgba(0,0,0,0.18);
}
/* 云朵入口：位于卡通人物下方大致区域（居中偏下，可按需微调） */


/* 两个小型方块：位于分割线下方 */
.quick-actions.small {
  position: absolute;
  top: calc(22% + 26rpx);
  left: 4%;
  right: 4%;
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  z-index: 15; /* 提高层级，确保点击不被遮挡 */
}
.action-card {
  flex: 1 1 0;
  background: rgba(255,255,255,0.95);
  border-radius: 20rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.12);
  padding: 18rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-card.mini { height: 120rpx; }
.ac-title {
  font-size: 34rpx;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
}
.ac-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #4b5563;
}
.center { text-align: center; }
.big { font-size: 44rpx; }

.recommend-section {
  position: absolute;
  top: calc(22% + 200rpx); /* 分割线 + 两个小方块之后 */
  left: 4%;
  right: 4%;
  bottom: 60rpx; /* 加宽底部留白 */
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16rpx;
  text-shadow: 0 2rpx 6rpx rgba(0,0,0,0.12);
}

.recommend-swiper {
  width: 100%;
  height: calc(100% - 60rpx); /* 头部标题占位后剩余全高 */
  border-radius: 24rpx;
  overflow: hidden;
}

.recipe-card {
  width: 100%;
  height: 100%;
  background: transparent;   /* 阴影背景不再放在整卡片，避免左右溢出 */
  padding: 24rpx;            /* 维持整体留白 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.img-wrap {
  width: 94%;                /* 与图片同宽，避免左右突出 */
  margin: 0 auto;            /* 容器居中 */
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,210,0.95)); /* 黄色阴影只在图片等宽范围内 */
  border-radius: 18rpx;
  padding: 0;                /* 无左右内边距，确保不超过图片边缘 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;        /* 允许在内部定位名牌 */
  overflow: visible;         /* 允许底部名牌凸出到图片外 */
}
.recipe-img {
  width: 100%;               /* 填满 img-wrap，左右边与黄色框对齐 */
  height: 640rpx;
  border-radius: 18rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.16);
  margin-bottom: 12rpx;
}

.recipe-name {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
  margin-top: 8rpx;          /* 与图片分隔，防止被遮挡 */
}

.name-plate {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -18rpx;            /* 底部向下凸出到图片外 */
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,210,0.95));
  color: #1f2937;
  font-size: 30rpx;
  font-weight: 700;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.12);
}

/* AI 对话气泡（卡通人物左侧） */
.ai-bubble {
  position: absolute;
  top: 52rpx; /* 下移一点 */
  right: 240rpx; /* 往左挪一点点 */
  background: #ffffff;
  color: #1f2937;
  padding: 20rpx 26rpx; /* 扩大气泡 */
  border-radius: 24rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.12);
  border: 2rpx solid rgba(255,255,255,0.9);
  display: inline-flex;
  align-items: center;
  white-space: nowrap; /* 宽度随文字自适应 */
  z-index: 21;
}
.ai-text {
  font-size: 34rpx; /* 扩大文字 */
  font-weight: 700;
}
.ai-tail {
  position: absolute;
  top: 50%;
  right: -16rpx;
  transform: translateY(-50%);
  width: 0; height: 0;
  border-top: 12rpx solid transparent;
  border-bottom: 12rpx solid transparent;
  border-left: 16rpx solid #ffffff;
  filter: drop-shadow(0 2rpx 4rpx rgba(0,0,0,0.12));
}
/* 推荐区域箭头 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48rpx;
  height: 48rpx;
  line-height: 48rpx;
  text-align: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.12);
  font-size: 36rpx;
  color: #1f2937;
  z-index: 10;
}
.arrow.left { left: 0; }
.arrow.right { right: 0; }

.recommend-container {
  width: 100%;
  background: rgba(255,255,255,0.96);
  border: 2rpx solid rgba(255,255,255,0.9);
  border-radius: 24rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.14);
  padding: 12rpx 0; /* 去除左右内边距，使白色方框与上方左右边缘对齐 */
  min-height: 760rpx; /* 再加大一些留白 */
  position: relative;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #374151;
}

/* 右上角卡通图样式 */
.corner-cartoon {
  position: absolute;
  top: 20rpx; /* 再上挪一点点 */
  right: 20rpx;
  width: 180rpx; /* 保持当前尺寸 */
  z-index: 20;
}

</style>