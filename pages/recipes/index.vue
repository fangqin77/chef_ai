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
      <view class="search-btn" @click="onSearch">
        <text class="icon">🔍</text>
        <text class="label">搜索</text>
      </view>
    </view>


    <!-- 分类筛选（顶排展示 4 个 + 省略号） -->
    <scroll-view class="chips" scroll-x>
      <view
        v-for="c in topCats"
        :key="c.key"
        :class="['chip', activeCat === c.key ? 'active' : '']"
        @click="activeCat = c.key"
      >
        {{ c.name }}
      </view>
      <view
        v-if="moreCats && moreCats.length"
        class="chip more"
        @click="toggleCats"
      >···</view>
    </scroll-view>

    <!-- 展开后在下方展示更多标签 -->
    <view v-if="showAllCats && moreCats && moreCats.length" class="chips-more">
      <view
        v-for="c in moreCats"
        :key="c.key"
        :class="['chip', activeCat === c.key ? 'active' : '']"
        @click="activeCat = c.key"
      >
        {{ c.name }}
      </view>
    </view>

    <!-- 两列卡片网格 -->
    <view class="grid">
      <view class="card" v-for="r in filteredList" :key="r.id" @click="openRecipe(r)">
        <image class="cover" :src="r.cover" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ r.name }}</text>
          <view class="meta">
            <view class="tag" :class="r.level === '简单' ? 'tag-green' : 'tag-orange'">{{ r.level }}</view>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 24rpx;" />
  </view>
</template>

<script>
import {getRecipes, mapTypeIdToCat, DEFAULT_COVER} from '../../api/recipes.js' 
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
    // 随机菜谱入口：从本页挑选4个并立刻打开第一个详情
    if (options && (options.random === '1' || options.random === 1 || options.random === true)) {
      const picked = this.pickFour();
      try {
        uni.setStorageSync('random_selection', (picked || []).map(x => x.id));
        uni.setStorageSync('random_selection_data', picked || []);
      } catch(e) {}
      if (picked && picked.length) {
        this.openRecipe(picked[0]);
      } else {
        uni.showToast({ title: '暂无菜谱可选', icon: 'none' });
      }
    }
  },
  onShow() {
    const cat = uni.getStorageSync('recipes_cat');
    if (cat) {
      this.activeCat = cat;
      uni.removeStorageSync('recipes_cat');
    }
    // 调用 /api/recipes/list 接口
    console.log('开始请求菜谱数据...')
    getRecipes()
      .then(res => {
        console.log('菜谱接口响应数据:', res)
        const arr = Array.isArray(res) ? res : []
        this.list = arr.map(r => ({
          id: r.id,                 // Recipe.id
          name: r.name || '菜谱',   // Recipe.name
          cat: mapTypeIdToCat(r.typeId),   // 将后端typeId映射到前端分类key
          cover: r.feature || DEFAULT_COVER,     // 使用后端返回的feature字段或默认封面
          // 保留后端原始数据，方便后续使用
          originalData: r
        }))
        console.log('成功加载菜谱数量:', this.list.length)
      })
      .catch(err => {
        console.error('获取菜谱列表失败：', err)
        console.log('错误详情:', JSON.stringify(err))
        // 使用模拟数据作为后备方案
        this.list = this.getMockData()
        uni.showToast({
          title: '后端服务不可用，使用模拟数据',
          icon: 'none',
          duration: 2000
        })
      })
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
        { key: 'kr', name: '韩式' },
        { key: 'chuancai', name: '川菜' },
        { key: 'yuecai', name: '粤菜' },
        { key: 'xianggai', name: '湘菜' },
        { key: 'zhecai', name: '浙菜' },
        { key: 'dongbei', name: '东北' },
        { key: 'xibei', name: '西北' },
        { key: 'jiachang', name: '家常' },
        { key: 'sushi', name: '素食' },
        { key: 'shaokao', name: '烧烤' },
        { key: 'tianpin', name: '甜品' }
      ],
      showAllCats: false,
      maxCats: 8,
      topCount: 6,
      // 接口返回数据列表
      list: []
    }
  },
  computed: {
    filteredList() {
      if (this.activeCat === 'all') return this.list
      return this.list.filter(i => i.cat === this.activeCat)
    },
    // 根据当前列表品类出现频次，热门在前（保持 'all' 置顶）
    orderedCats() {
      const arr = this.cats || []
      const counts = {}
      ;(this.list || []).forEach(i => {
        counts[i.cat] = (counts[i.cat] || 0) + 1
      })
      const head = arr.filter(c => c.key === 'all')
      const rest = arr.filter(c => c.key !== 'all')
        .sort((a, b) => (counts[b.key] || 0) - (counts[a.key] || 0))
      return [...head, ...rest]
    },
    topCats() {
      const arr = this.orderedCats || this.cats || []
      const n = Math.min(this.topCount || 8, arr.length)
      return arr.slice(0, n)
    },
    moreCats() {
      const arr = this.orderedCats || this.cats || []
      return arr.slice(4)
    }
  },
  methods: {
    // 随机挑选四个菜谱
    pickFour() {
      const src = this.list || [];
      const n = Math.min(4, src.length);
      const pool = [...src];
      const res = [];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        res.push(pool.splice(idx, 1)[0]);
      }
      return res;
    },
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
    },
    toggleCats() {
      this.showAllCats = !this.showAllCats
    }
  }
}
</script>

<style>
.page {
  padding: 24rpx;
  background: #f7f2e7;
  position: relative;
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
/* 显眼的搜索按钮 */
.search-btn {
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
  padding: 10rpx 18rpx;
  background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%);
  color: #fff;
  border-radius: 999rpx;
  box-shadow: 0 8rpx 20rpx rgba(255,122,0,0.28);
}
.search-btn .icon {
  font-size: 30rpx;
}
.search-btn .label {
  font-size: 28rpx;
  font-weight: 600;
}

.subheading {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #6b7280;
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
.chip.more {
  background: #e5e7eb;
  color: #374151;
}
/* 下方更多标签容器：允许换行 */
.chips-more {
  margin-top: 12rpx;
  display: flex;
  flex-wrap: wrap;
}
.chip.active {
  color: #fff;
  background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%);
  box-shadow: 0 6rpx 16rpx rgba(255, 193, 7, 0.3);
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
  color: #FFC107;
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
  background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%);
  color: #fff;
  box-shadow: 0 8rpx 20rpx rgba(255,193,7,0.35);
}

/* 右上角卡通图样式（统一） */

</style>