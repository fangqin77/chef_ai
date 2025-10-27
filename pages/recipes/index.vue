<template>
  <view class="page">
    <!-- 推荐模式全屏卡片 -->
    <view v-if="recommendMode" class="recom-mask">
      <view class="recom-card">
        <image class="recom-cover" :src="(reco && reco.cover) || ''" mode="aspectFill" />
        <view class="recom-info">
          <text class="recom-name">{{ (reco && reco.name) || '今日推荐' }}</text>
          <view class="recom-meta">
            <view class="tag" :class="((reco && reco.level) === '简单') ? 'tag-green' : 'tag-orange'">{{ (reco && reco.level) || '适中' }}</view>
            <text class="time">{{ (reco && reco.time) || '--' }}min</text>
          </view>
        </view>
        <view class="recom-actions">
          <button class="btn cancel" @click="cancelRecommend">取消</button>
          <button class="btn change" @click="nextRecommend">换一个</button>
        </view>
      </view>
    </view>
    <!-- 顶部栏 -->
    <view class="header">
      <text class="title">菜谱大全</text>
      <text class="icon-search" @click="onSearch">🔍</text>
    </view>

    <!-- 分类筛选 -->
    <scroll-view class="chips" scroll-x>
      <view
        v-for="c in cats"
        :key="c.key"
        :class="['chip', activeCat === c.key ? 'active' : '']"
        @click="activeCat = c.key"
      >
        {{ c.name }}
      </view>
    </scroll-view>

    <!-- 两列卡片网格 -->
    <view class="grid">
      <view class="card" v-for="r in filteredList" :key="r.id" @click="openRecipe(r)">
        <image class="cover" :src="r.cover" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ r.name }}</text>
          <view class="meta">
            <view class="tag" :class="r.level === '简单' ? 'tag-green' : 'tag-orange'">{{ r.level }}</view>
            <text class="time">{{ r.time }}min</text>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 24rpx;" />
  </view>
</template>

<script>
export default {
  onLoad(options) {
    if (options && options.cat) {
      this.activeCat = options.cat;
    }
    // 推荐模式入口：/pages/recipes/index?recommend=1
    if (options && (options.recommend === '1' || options.recommend === 1 || options.recommend === true)) {
      this.recommendMode = true;
      this.pickRandom();
    }
  },
  onShow() {
    const cat = uni.getStorageSync('recipes_cat');
    if (cat) {
      this.activeCat = cat;
      uni.removeStorageSync('recipes_cat');
    }
  },
  data() {
    return {
      recommendMode: false,
      reco: null,
      activeCat: 'all',
      cats: [
        { key: 'all', name: '全部' },
        { key: 'cn', name: '中式' },
        { key: 'west', name: '西式' },
        { key: 'jp', name: '日式' },
        { key: 'kr', name: '韩式' }
      ],
      // 示例数据：可替换为接口返回
      list: [
        { id: 'mapo-tofu', name: '麻婆豆腐', level: '简单', time: 20, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png' },
        { id: 'egg-fried-rice', name: '蛋炒饭', level: '简单', time: 15, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png' },
        { id: 'hongshao-rou', name: '红烧肉', level: '中等', time: 45, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png' },
        { id: 'tangcu-liji', name: '糖醋里脊', level: '中等', time: 35, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png' },
        { id: 'sushi', name: '寿司拼盘', level: '中等', time: 40, cat: 'jp', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png' },
        { id: 'bibimbap', name: '石锅拌饭', level: '简单', time: 25, cat: 'kr', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png' }
      ]
    }
  },
  computed: {
    filteredList() {
      if (this.activeCat === 'all') return this.list
      return this.list.filter(i => i.cat === this.activeCat)
    }
  },
  methods: {
    // 推荐模式方法
    pickRandom() {
      if (!this.list || this.list.length === 0) {
        this.reco = null
        return
      }
      const idx = Math.floor(Math.random() * this.list.length)
      this.reco = this.list[idx]
    },
    cancelRecommend() {
      const pages = getCurrentPages && getCurrentPages()
      if (pages && pages.length > 1) {
        uni.navigateBack({ delta: 1 })
      } else {
        this.recommendMode = false
      }
    },
    nextRecommend() {
      this.pickRandom()
    },
    onSearch() {
      uni.showToast({ title: '搜索暂未接入', icon: 'none' })
    },
    openRecipe(r) {
      // 跳转到详情页并传参（名称/做法/原料/调料/特性/图片）
      const q = [
        'id=' + encodeURIComponent(r.id || ''),
        'name=' + encodeURIComponent(r.name || ''),
        'imageUrl=' + encodeURIComponent(r.cover || '')
      ].join('&')
      uni.navigateTo({ url: '/pages/recipes/detail?' + q })
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
.header {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
}
.icon-search {
  font-size: 36rpx;
  color: #5f6368;
}

/* 分类 Chip */
.chips {
  margin-top: 16rpx;
  white-space: nowrap;
}
.chip {
  display: inline-flex;
  padding: 12rpx 24rpx;
  background: #f3f4f6;
  color: #374151;
  border-radius: 999rpx;
  font-size: 26rpx;
  margin-right: 16rpx;
}
.chip.active {
  color: #fff;
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  box-shadow: 0 6rpx 16rpx rgba(255, 122, 0, 0.3);
}

/* 网格 */
.grid {
  margin-top: 20rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* 卡片 */
.card {
  width: calc(50% - 10rpx);
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.06);
}
.cover {
  width: 100%;
  height: 300rpx;
  background: #eee;
}
.info {
  padding: 18rpx;
}
.name {
  font-size: 28rpx;
  color: #1f2937;
}
.meta {
  margin-top: 14rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: #ff8a34;
}
.time {
  font-size: 24rpx;
  color: #6b7280;
}
/* 推荐模式样式 */
.recom-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recom-card {
  width: 86%;
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 22rpx 60rpx rgba(0,0,0,0.22);
}
.recom-cover {
  width: 100%;
  height: 360rpx;
  background: #eee;
}
.recom-info {
  padding: 24rpx;
}
.recom-name {
  font-size: 34rpx;
  font-weight: 800;
  color: #111827;
}
.recom-meta {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.recom-actions {
  display: flex;
  padding: 18rpx 22rpx 26rpx;
  gap: 18rpx;
}
.btn {
  flex: 1 1 0;
  height: 84rpx;
  line-height: 84rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 28rpx;
}
.btn.cancel {
  background: #f3f4f6;
  color: #374151;
}
.btn.change {
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  color: #fff;
  box-shadow: 0 8rpx 20rpx rgba(255,122,0,0.35);
}

</style>