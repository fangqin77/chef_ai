<template>
  <view class="page">
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
    onSearch() {
      uni.showToast({ title: '搜索暂未接入', icon: 'none' })
    },
    openRecipe(r) {
      uni.showToast({ title: '打开：' + r.name, icon: 'none' })
      // 可跳转到详情页
      // uni.navigateTo({ url: '/pages/recipe/detail?id=' + r.id })
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
</style>