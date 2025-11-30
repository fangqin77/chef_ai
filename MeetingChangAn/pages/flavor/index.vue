<script>
const { searchFoods, searchByTag, getAllTags, getFoodsByFeatureTags } = require('../../api/foods.js')

export default {
  data() {
    return {
      query: '',
      selectedCatId: '',
      // 左列分类（整合了基础分类和特色标签）
      categories: [],
      // 右侧美食卡片
      foods: [],
      // 热门推荐列表
      hotFoods: [],
      // 默认图片
      defaultImg: '/static/assets/retouch_2025112414392946.png',
      bottomIcons: [
        { id: 'qingdan', label: '陕游记', img: '/static/assets/retouch_2025112414391093.png' },
        { id: 'fengwei', label: '陕味集', img: '/static/assets/retouch_2025112414392946.png' },
        { id: 'feiyi', label: '陕非遗', img: '/static/assets/retouch_2025112414400271.png' },
        { id: 'profile', label: '个人中心', img: '/static/assets/retouch_2025112414394823.png' }
      ],
      loading: false
    }
  },
  onLoad() {
    this.initCategories()
    this.loadHotFoods()
  },
  methods: {
    // 初始化分类
    async initCategories() {
      // 整合基础分类和特色标签
      this.categories = [
        // 基础分类
        { id: 'noodle', name: '面食', type: 'category', tag: '面食' },
        { id: 'snack', name: '小吃', type: 'category', tag: '小吃' },
        // 特色标签
        { id: 'heritage', name: '非遗美食', type: 'feature', featureTag: '非遗美食' },
        { id: 'classic', name: '老字号', type: 'feature', featureTag: '老字号' },
        { id: 'trending', name: '网红打卡', type: 'feature', featureTag: '网红打卡' },
        { id: 'local', name: '本地人推荐', type: 'feature', featureTag: '本地人推荐' },
        // 热门推荐
        { id: 'hot', name: '热门推荐', type: 'hot' }
      ]
      
      // 默认选中第一个分类
      this.selectedCatId = this.categories[0].id
      
      // 加载第一个分类的数据
      await this.loadFoodsByCategory(this.categories[0])
      
      // 预加载热门推荐数据
      await this.loadHotFoods()
    },
    
    // 搜索功能
    async onSearch() {
      const keyword = this.query.trim()
      if (!keyword) {
        uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
        return
      }
      
      try {
        this.loading = true
        // 同时按名称和标签搜索
        const response = await searchFoods(keyword, keyword)
        
        // 处理不同的返回格式
        let results = []
        if (response && response.data) {
          results = Array.isArray(response.data) ? response.data : []
        } else if (Array.isArray(response)) {
          results = response
        }
        
        if (results.length === 0) {
          uni.showToast({ title: '未找到相关美食', icon: 'none' })
          return
        }
        
        // 映射后端字段到前端
        this.foods = results.map(item => ({
          id: item.id,
          name: item.foodName || item.name || '',
          img: item.imageUrl || item.image || item.img || item.coverImage || this.defaultImg,
          tag: item.tag || '',
          city: item.city || '',
          introduction: item.introduction || '',
          features: item.features || '',
          history: item.history || ''
        }))
        
        uni.showToast({ title: `找到 ${results.length} 个结果`, icon: 'success' })
      } catch (error) {
        console.error('搜索失败:', error)
        uni.showToast({ title: '搜索失败', icon: 'none' })
      } finally {
        this.loading = false
      }
    },
    
    addToList(food) {
      // 预留加清单逻辑
      uni.showToast({ title: '已加入清单', icon: 'success' })
    },
    
    // 跳转到美食详情页
    goFoodDetail(food) {
      if (!food || !food.id) {
        uni.showToast({ title: '美食信息不完整', icon: 'none' })
        return
      }
      uni.navigateTo({
        url: `/pages/noodle/item?id=${food.id}&foodName=${encodeURIComponent(food.name)}`
      })
    },
    
    // 选择分类
    async selectCategory(cat) {
      this.selectedCatId = cat.id
      await this.loadFoodsByCategory(cat)
    },
    
    // 按分类加载美食
    async loadFoodsByCategory(cat) {
      try {
        this.loading = true
        
        // 如果是热门推荐，直接使用已加载的热门数据
        if (cat.type === 'hot') {
          this.foods = this.hotFoods.map(item => ({
            id: item.id,
            name: item.name,
            img: item.img,
            tag: '',
            city: '',
            introduction: item.intro || '',
            features: '',
            history: ''
          }))
          this.loading = false
          return
        }
        
        let response
        let foods = []
        
        // 判断是基础分类还是特色标签
        if (cat.type === 'feature') {
          // 特色标签筛选
          console.log('[特色标签筛选] 标签:', cat.featureTag)
          response = await getFoodsByFeatureTags([cat.featureTag])
        } else {
          // 基础分类筛选
          console.log('[基础分类筛选] 标签:', cat.tag)
          response = await searchByTag(cat.tag || cat.name)
        }
        
        // 处理不同的返回格式
        if (response && response.data) {
          foods = Array.isArray(response.data) ? response.data : []
        } else if (Array.isArray(response)) {
          foods = response
        }
        
        // 映射后端字段到前端
        this.foods = foods.map(item => ({
          id: item.id,
          name: item.foodName || item.name || '',
          img: item.imageUrl || item.image || item.img || item.coverImage || this.defaultImg,
          tag: item.tag || '',
          city: item.city || '',
          introduction: item.introduction || '',
          features: item.features || '',
          history: item.history || '',
          featureTags: item.featureTags || '' // 新增特色标签字段
        }))
        
        if (this.foods.length === 0) {
          console.log('该分类暂无数据，使用示例数据')
          this.loadMockData()
        }
      } catch (error) {
        console.error('加载分类数据失败:', error)
        // 失败时使用示例数据
        this.loadMockData()
      } finally {
        this.loading = false
      }
    },
    
    // 加载示例数据（测试用）
    loadMockData() {
      this.foods = [
        { id: 'biang', name: 'biángbiáng面', img: this.defaultImg },
        { id: 'qishan', name: '岐山臊子面', img: this.defaultImg },
        { id: 'youpo', name: '油泼面', img: this.defaultImg },
        { id: 'liangpi', name: '凉皮', img: this.defaultImg }
      ]
    },
    
    // 加载热门推荐美食
    async loadHotFoods() {
      try {
        console.log('[热门推荐] 开始加载...')
        
        // 获取所有美食数据（不传标签参数）
        const response = await getFoodsByFeatureTags([])
        
        // 处理不同的返回格式
        let allFoods = []
        if (response && response.data) {
          allFoods = Array.isArray(response.data) ? response.data : []
        } else if (Array.isArray(response)) {
          allFoods = response
        }
        
        console.log('[热门推荐] 获取到美食数量:', allFoods.length)
        
        if (allFoods.length === 0) {
          console.warn('[热门推荐] 没有数据')
          return
        }
        
        // 选取前6个作为热门推荐（可以根据实际需求调整数量或排序逻辑）
        const hotCount = Math.min(6, allFoods.length)
        const selectedFoods = allFoods.slice(0, hotCount)
        
        // 映射后端字段到前端，只保留需要的字段：图片、名字、介绍
        this.hotFoods = selectedFoods.map(item => ({
          id: item.id,
          name: item.foodName || item.name || '',
          img: item.imageUrl || item.image || item.img || item.coverImage || this.defaultImg,
          intro: item.introduction || item.intro || item.description || item.features || ''
        }))
        
        console.log('[热门推荐] 热门美食数量:', this.hotFoods.length)
      } catch (error) {
        console.error('[热门推荐] 加载失败:', error)
      }
    },

    goPage(id) {
      const routes = {
        tong: '/pages/index/index',
        fengwei: '/pages/flavor/index',
        qingdan: '/pages/checklist/index',
        profile: '/pages/mine/index',
        feiyi: '/pages/heritage/index'
      }
      const url = routes[id]
      if (!url) {
        uni.showToast({ title: '页面开发中', icon: 'none' })
        return
      }
      // 如果是当前页，不跳转
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      if (currentPage && ('/' + currentPage.route) === url) {
        return
      }
      // 如果跳转到陕面通首页，使用 reLaunch 清空栈
      if (url === '/pages/index/index') {
        uni.reLaunch({ url })
      } else {
        // 其他页面使用 navigateTo，保留返回按钮
        uni.navigateTo({ url })
      }
    }
  }
}
</script>

<template>
  <page-meta page-style="overflow:auto;min-height:100vh" />
  <view class="flavor-page">

    <view class="top-search">
      <input class="search-input" v-model="query" placeholder="搜索陕味..." confirm-type="search" @confirm="onSearch" />
      <view class="search-icon">+</view> <!-- 使用加号样式作为放大镜圆角，视觉更接近示意图 -->
    </view>

    <view class="brown-dashed"></view>

    <view class="image-holder">
      <image class="holder-img" src="/static/assets/IMG_20251125_171347.jpg" mode="aspectFill" />
    </view>

    <view class="grid-wrap">
      <view class="grid-left">
        <view class="left-header">分类</view>
        <view class="left-lines">
          <view
            v-for="(cat, index) in categories"
            :key="cat.id"
            class="left-cell"
            :class="{ active: selectedCatId === cat.id, 'last-item': index === categories.length - 1 }"
            @tap="selectCategory(cat)"
          >
            {{ cat.name }}
          </view>
        </view>
      </view>

      <scroll-view class="grid-right" scroll-y>
        <view v-if="loading" class="loading-tip">加载中...</view>
        <view v-else-if="foods.length === 0" class="empty-tip">暂无数据</view>
        <template v-else>
          <view v-for="food in foods" :key="food.id" class="food-row">
            <view class="food-card" @tap="goFoodDetail(food)">
              <text class="food-name">{{ food.name }}</text>
              <image class="food-img" :src="food.img" mode="aspectFill" />
            </view>
            <view class="add-circle" @tap.stop="addToList(food)"><text class="plus">+</text></view>
          </view>
        </template>
      </scroll-view>
    </view>



    <!-- 固定底部图标：复用首页结构样式 -->
    <view class="icons-fixed">
      <image class="chopsticks-fixed" src="/static/assets/retouch_2025111915301620.png" mode="widthFix" />
      <view class="icons-top">
        <view class="icon-block" @tap="goPage('tong')">
          <view class="top-circle-wrap">
            <image class="icon-img" src="/static/assets/retouch_2025112414375907.png" mode="widthFix" />
          </view>
          <text class="icon-label">陕面通</text>
        </view>
      </view>
      <view class="icons-bottom">
        <view v-for="icon in bottomIcons" :key="icon.id" class="icon-block" @tap="goPage(icon.id)">
          <image class="icon-img" :src="icon.img" mode="widthFix" />
          <text class="icon-label">{{ icon.label }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.flavor-page {
  min-height: 100vh;
  padding: 32rpx 28rpx 20rpx;
  padding-bottom: calc(280rpx + env(safe-area-inset-bottom));
  background: #fffef7;
  color: #5a2c12;
  font-family: 'LXGW WenKai Screen', 'PingFang SC', system-ui;
  position: relative;
}

/* 搜索框 + 图标 */
.top-search {
  position: relative;
  width: 70%;
  margin-left: -10rpx;
  margin-top: -25rpx;
}
.search-input {
  height: 72rpx;
  background: #ffe6a8;
  border-radius: 36rpx;
  padding: 0 72rpx 0 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(0,0,0,0.08);
}
.search-icon {
  position: absolute;
  right: 8rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  border: 4rpx solid #cfa86a;
  color: #cfa86a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* 棕色虚线分隔 */
.brown-dashed {
  margin: 10rpx 0 12rpx;
  height: 0;
  border-top: 10rpx dashed #7b4a2b;
}

/* 上方图片位占位 */
.image-holder {
  height: auto;
  display: flex;
  align-items: center;
  padding: 0;
  margin-left: -28rpx;
  margin-right: -28rpx;
  margin-top: -17rpx;
}
.holder-text { color: #c59a6a; }
.holder-img {
  width: 100%;
  height: 380rpx;
  display: block;
  border-radius: 12rpx;
  object-fit: cover;
  object-position: top;
}

/* 黑色线格子 */
.grid-wrap {
  display: flex;
  border: 6rpx solid #5a2c12;
  border-radius: 16rpx;
  overflow: hidden;
  margin-left: -28rpx;
  margin-right: -28rpx;
  margin-top: 1rpx;
  margin-bottom: 40rpx;
  height: calc(100vh - 220rpx - 120rpx);
}
.grid-left {
  width: 188rpx;
  border-right: 6rpx solid #5a2c12;
}
.left-header {
  font-weight: 700;
  padding: 16rpx;
  border-bottom: 6rpx solid #5a2c12;
}
.left-lines {
  overflow-y: auto;
  height: calc(100vh - 220rpx - 120rpx - 57rpx);
}

.left-lines .left-cell {
  height: 65rpx;
  padding: 0 17rpx;
  display: flex;
  align-items: center;
  border-bottom: 6rpx solid #5a2c12;
}

.left-lines .left-cell.active { 
  background: #fff5dc; 
}

.left-lines .left-cell.last-item {
  border-bottom: 6rpx solid #5a2c12 !important;
}

.left-lines .left-cell:last-child { 
  border-bottom: 6rpx solid #5a2c12; 
}

.grid-right {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 320rpx - 120rpx);
}
.food-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 6rpx solid #5a2c12;
  padding: 18rpx 16rpx;
}

.grid-right .food-row:last-child { border-bottom: 0; }
.food-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.food-name {
  font-weight: 700;
  min-width: 160rpx;
}
.food-img {
  margin-left: auto;
  width: 180rpx;
  height: 120rpx;
  background: #fff3d6;
  border: 4rpx solid #cfa86a;
  border-radius: 12rpx;
  object-fit: cover;
  display: block;
}
.add-circle {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  border: 4rpx solid #e3b34b;
  color: #e3b34b;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(10rpx);
}
.plus { font-size: 36rpx; line-height: 1; }

/* 加载和空状态提示 */
.loading-tip,
.empty-tip {
  text-align: center;
  padding: 60rpx 20rpx;
  font-size: 28rpx;
  color: #999;
}


/* 筷子分割线（与首页一致风格） */
.chopsticks {
  width: 100%;
  height: auto;
  display: block;
  margin: 24rpx 0;
  border-radius: 0;
}
.chopsticks::after { content: none; }

/* 固定在底部图标上方的筷子图片 */
.chopsticks-fixed {
  position: absolute;
  left: 12rpx;
  right: 12rpx;
  top: 60rpx;
  width: calc(100% - 24rpx);
  height: auto;
  display: block;
  z-index: 19;
  border-radius: 0;
}

/* 复用首页底部图标布局样式（关键选择器与结构保持一致） */
.icons-top {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20rpx 0 20rpx;
  padding-top: 0;
  z-index:-1;
}
.icons-top .icon-block {
  transform: translateY(75rpx);
  will-change: transform;
}
.icons-top::before {
  content: none;
}
.icons-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 35rpx;
  padding: 0 10rpx;
  background: transparent;
  margin-top: -12rpx;
}
.icons-bottom .icon-block:nth-child(2) { margin-right: 24rpx; }
.icons-bottom .icon-block:nth-child(3) { margin-left: 24rpx; }

.icon-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
}
.icon-img { width: 58rpx; height: auto; display: block; }
.icons-top .icon-img { width: 68rpx; }
.icon-label {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #5a2c12;
  text-align: center;
}
.top-circle-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 50%;
  padding: 18rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
  border: 0;
  position: relative;
  z-index: -2;
}
.icons-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60rpx;
  padding: 60rpx 20rpx 16rpx;
  background: transparent;
  z-index: 20;
}
.icons-fixed::before {
  content: '';
  position: absolute;
  left: 12rpx;
  right: 12rpx;
  bottom: -5rpx;
  top: 158rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  z-index: -1;
}

</style>