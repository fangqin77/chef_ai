<template>
  <view class="page">
    <!-- 顶部大图 + 右下角搜索 -->
    <view class="hero">
      <image class="hero-img" src="/static/assets/1764123838326.png" mode="aspectFill" />
      <view class="search" @tap="onSearchTap">
        <text class="search-icon">🔍</text>
        <input class="search-input" placeholder="搜索陕西非遗项目" confirm-type="search" @confirm="onSearchConfirm" />
      </view>
    </view>

    <!-- 分类横向滑动 -->
    <scroll-view class="tabs" scroll-x enhanced show-scrollbar="false">
      <view class="tab-item" v-for="(c, idx) in categories" :key="c.id"
            :class="{ active: idx === activeIdx }"
            @tap="switchCategory(idx)">
        {{ c.name }}
      </view>
    </scroll-view>

    <!-- 分类大卡片（横向右滑，竖向大图样式） -->
    <view class="cats-section">
      <view v-if="loading" class="loading-tip">加载中...</view>
      <view v-else-if="currentList.length === 0" class="empty-tip">暂无数据</view>
      <scroll-view v-else class="cats-scroll" scroll-x enhanced show-scrollbar="false">
        <view class="cat-card" v-for="item in currentList" :key="item.id" @tap="openDetail(item)">
          <image class="cat-img" :src="getValidImageUrl(item.cover)" mode="aspectFill" @error="handleImageError(item)" />
          <view class="cat-overlay">
            <view class="cat-title">{{ item.name }}</view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 热门推荐（白色圆角卡片：左图右文） -->
    <view class="section">
      <view class="section-title-row">
        <text class="section-title">热门推荐</text>
        <text class="more" @tap="moreHot">更多 ></text>
      </view>
      <view class="hot-list">
        <view class="hot-card" v-if="hotList.length > 0" @tap="openDetail(hotList[0])">
          <image class="hot-thumb" :src="getValidImageUrl(hotList[0].cover)" mode="aspectFill" @error="handleImageError(hotList[0])" />
          <view class="hot-body">
            <view class="hot-name">{{ hotList[0].name }}</view>
            <view class="hot-desc">{{ hotList[0].desc || '——' }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 热门推荐弹窗 -->
    <view v-if="showHotModal" class="hot-modal-overlay" @tap="closeHotModal">
      <view class="hot-modal" @tap.stop>
        <view class="hot-modal-header">
          <text class="hot-modal-title">热门推荐</text>
          <text class="hot-modal-close" @tap="closeHotModal">×</text>
        </view>
        <scroll-view class="hot-modal-content" scroll-y>
          <view class="hot-modal-list">
            <view class="hot-modal-card" v-for="h in hotList" :key="h.id" @tap="openDetailFromModal(h)">
              <image class="hot-modal-thumb" :src="getValidImageUrl(h.cover)" mode="aspectFill" @error="handleImageError(h)" />
              <view class="hot-modal-body">
                <view class="hot-modal-name">{{ h.name }}</view>
                <view class="hot-modal-desc">{{ h.desc || '——' }}</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 图标固定在底部：上方居中一个，下方四个一行，同屏可见 -->
    <view class="icons-fixed">
      <image class="chopsticks-fixed" src="/static/assets/retouch_2025111915301620.png" mode="widthFix" />
      <view class="icons-top">
        <view class="icon-block" @tap="goDock('/pages/index/index')">
          <view class="top-circle-wrap">
            <image class="icon-img" src="/static/assets/retouch_2025112414375907.png" mode="widthFix" />
          </view>
          <text class="icon-label">陕面通</text>
        </view>
      </view>
      <view class="icons-bottom">
        <view class="icon-block" @tap="goDock('/pages/checklist/index')">
          <image class="icon-img" src="/static/assets/retouch_2025112414375907.png" mode="widthFix" />
          <text class="icon-label">陕游记</text>
        </view>
        <view class="icon-block" @tap="goDock('/pages/flavor/index')">
          <image class="icon-img" src="/static/assets/retouch_2025112414391093.png" mode="widthFix" />
          <text class="icon-label">陕味集</text>
        </view>
        <view class="icon-block" @tap="goDock('/pages/heritage/index')">
          <image class="icon-img" src="/static/assets/retouch_2025112414394823.png" mode="widthFix" />
          <text class="icon-label">陕非遗</text>
        </view>
        <view class="icon-block" @tap="goDock('/pages/mine/index')">
          <image class="icon-img" src="/static/assets/retouch_2025112414400271.png" mode="widthFix" />
          <text class="icon-label">个人中心</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const { getAllHeritages, getHeritagesByType, searchHeritages } = require('../../api/heritage.js')

export default {
  name: 'HeritageIndex',
  data() {
    return {
      categories: [
        { id: 'music', name: '音乐戏曲', type: 'music' },
        { id: 'dance', name: '传统舞蹈', type: 'dance' },
        { id: 'drama', name: '传统戏剧', type: 'drama' },
        { id: 'quyi', name: '曲艺', type: 'quyi' },
        { id: 'craft', name: '传统技艺', type: 'craft' },
        { id: 'art', name: '传统美术', type: 'art' },
        { id: 'folk', name: '民俗', type: 'folk' },
        { id: 'food', name: '传统饮食', type: 'food' }
      ],
      activeIdx: 0,
      allData: {
        music: [],
        dance: [],
        drama: [],
        quyi: [],
        craft: [],
        art: [],
        folk: [],
        food: []
      },
      allHeritages: [], // 存储所有非遗数据
      hotList: [],
      hotCursor: 0,
      defaultCover: '/static/assets/retouch_2025112414394823.png', // 默认封面图（使用陕非遗图标）
      showHotModal: false, // 控制热门推荐弹窗显示
      loading: false,
      searchKeyword: ''
    }
  },
  computed: {
    currentList() {
      const id = this.categories[this.activeIdx]?.id || 'music'
      return this.allData[id] || []
    },
    hotIntoView() {
      return 'hot-' + this.hotCursor
    }
  },
  onLoad() {
    this.bootstrap()
  },
  methods: {
    async bootstrap() {
      try {
        this.loading = true
        // 获取所有非遗数据
        const response = await getAllHeritages()
        
        // 根据后端返回的数据结构处理
        // 假设后端返回格式：{ success: true, data: [...] } 或直接返回数组
        const heritages = response.data || response || []
        this.allHeritages = heritages
        
        // 按分类整理数据
        this.categorizeHeritages(heritages)
        
        // 设置热门推荐（取前8条或随机8条），并做字段映射
        this.hotList = heritages.slice(0, 8).map(this.formatHeritageItem)
        

      } catch (error) {
        console.error('加载非遗数据失败:', error)
        uni.showToast({ title: '加载失败，使用示例数据', icon: 'none' })
        // 失败时使用示例数据
        this.loadMockData()
      } finally {
        this.loading = false
      }
    },
    
    // 统一映射后端字段到前端结构
    formatHeritageItem(item) {
      return {
        id: item.id,
        name: item.heritageName || item.name || item.title || '',
        desc: item.contentIntroduction || item.description || item.desc || item.intro || item.historicalOrigin || '',
        cover: item.imageUrl || item.coverImage || item.cover || item.image || this.defaultCover,
        type: item.heritageType || item.type || item.category || '',
        videoUrl: item.videoUrl || '',
        history: item.historicalOrigin || ''
      }
    },
    
    // 按分类整理数据
    categorizeHeritages(heritages) {
      // 清空现有数据
      Object.keys(this.allData).forEach(key => {
        this.allData[key] = []
      })
      
      // 定义类型映射关系（支持多种表述方式）
      const typeMapping = {
        '传统音乐': 'music',
        '音乐戏曲': 'music',
        '音乐': 'music',
        '传统舞蹈': 'dance',
        '舞蹈': 'dance',
        '传统戏剧': 'drama',
        '戏剧': 'drama',
        '曲艺': 'quyi',
        '传统技艺': 'craft',
        '传统技艺（游艺、杂艺）': 'craft',
        '技艺': 'craft',
        '传统美术': 'art',
        '美术': 'art',
        '民俗': 'folk',
        '民俗节庆': 'folk',
        '传统饮食': 'food',
        '饮食': 'food'
      }
      
      // 根据类型分类
      heritages.forEach(item => {
        const heritageType = item.heritageType || item.type || item.category || ''
        const typeKey = typeMapping[heritageType]
        
        // 映射后端字段到前端数据结构
        const formattedItem = this.formatHeritageItem(item)
        // 使用分类映射的友好类型名覆盖
        formattedItem.type = heritageType
        
        // 映射后端类型到前端分类
        if (typeKey && this.allData[typeKey]) {
          this.allData[typeKey].push(formattedItem)
        } else {
          // 如果类型不在预定义分类中，尝试找最接近的分类
          console.warn('未知类型:', heritageType, '尝试智能分配')
          // 根据类型名称关键词智能分配
          if (heritageType.includes('音乐') || heritageType.includes('戏曲')) {
            this.allData.music.push(formattedItem)
          } else if (heritageType.includes('舞蹈')) {
            this.allData.dance.push(formattedItem)
          } else if (heritageType.includes('戏剧')) {
            this.allData.drama.push(formattedItem)
          } else if (heritageType.includes('曲艺')) {
            this.allData.quyi.push(formattedItem)
          } else if (heritageType.includes('技艺') || heritageType.includes('工艺') || heritageType.includes('游艺')) {
            this.allData.craft.push(formattedItem)
          } else if (heritageType.includes('美术') || heritageType.includes('艺术')) {
            this.allData.art.push(formattedItem)
          } else if (heritageType.includes('民俗') || heritageType.includes('节庆') || heritageType.includes('习俗')) {
            this.allData.folk.push(formattedItem)
          } else if (heritageType.includes('饮食') || heritageType.includes('美食') || heritageType.includes('食品')) {
            this.allData.food.push(formattedItem)
          } else {
            // 完全未知的类型，添加到第一个分类
            this.allData.music.push(formattedItem)
          }
        }
      })
    },
    
    // 加载示例数据（用于测试或后端接口失败时）
    loadMockData() {
      const mock = (prefix, n=6) => Array.from({length:n}).map((_,i)=>({
        id: prefix + '-' + i,
        name: prefix + ' · 非遗示例' + (i+1),
        desc: '古老而珍贵的文化遗产，承载着三秦大地的技艺与记忆。',
        cover: this.defaultCover
      }))
      this.allData.music = mock('音乐戏曲')
      this.allData.craft = mock('传统技艺')
      this.allData.fest = mock('民俗节庆', 8)
      this.allData.food = mock('传统饮食', 10)
      this.allData.arch = mock('古建文化', 5)
      this.hotList = mock('热门推荐', 8)
    },
    
    async switchCategory(idx) {
      this.activeIdx = idx
      const category = this.categories[idx]
      
      // 如果该分类数据为空，尝试从后端加载
      if (this.allData[category.id].length === 0) {
        try {
          this.loading = true
          const response = await getHeritagesByType(category.type)
          const heritages = response.data || response || []
          
          this.allData[category.id] = heritages.map(item => ({
            id: item.id,
            name: item.heritageName || item.name || item.title || '',
            desc: item.contentIntroduction || item.description || item.desc || item.intro || item.historicalOrigin || '',
            cover: item.imageUrl || item.coverImage || item.cover || item.image || this.defaultCover,
            type: item.heritageType || item.type || '',
            videoUrl: item.videoUrl || '',
            history: item.historicalOrigin || ''
          }))
        } catch (error) {
          console.error('加载分类数据失败:', error)
          uni.showToast({ title: '加载失败', icon: 'none' })
        } finally {
          this.loading = false
        }
      }
    },
    openDetail(item) {
      const id = encodeURIComponent(item?.id ?? '')
      uni.navigateTo({ url: '/pages/heritage/detail?id=' + id })
    },
    onSearchTap() {
      // 预留搜索跳转
      // uni.navigateTo({ url: '/pages/search/index?scene=heritage' })
    },
    async onSearchConfirm(e) {
      const keyword = e.detail.value || ''
      if (!keyword) {
        uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
        return
      }
      
      try {
        this.loading = true
        this.searchKeyword = keyword
        
        const response = await searchHeritages(keyword)
        const results = response.data || response || []
        
        if (results.length === 0) {
          uni.showToast({ title: '未找到相关非遗项目', icon: 'none' })
          return
        }
        
        // 将搜索结果显示在当前分类中
        const currentCategory = this.categories[this.activeIdx].id
        this.allData[currentCategory] = results.map(item => ({
          id: item.id,
          name: item.heritageName || item.name || item.title || '',
          desc: item.contentIntroduction || item.description || item.desc || item.intro || item.historicalOrigin || '',
          cover: item.imageUrl || item.coverImage || item.cover || item.image || this.defaultCover,
          type: item.heritageType || item.type || '',
          videoUrl: item.videoUrl || '',
          history: item.historicalOrigin || ''
        }))
        
        uni.showToast({ title: `找到 ${results.length} 个结果`, icon: 'success' })
      } catch (error) {
        console.error('搜索失败:', error)
        uni.showToast({ title: '搜索失败', icon: 'none' })
      } finally {
        this.loading = false
      }
    },
    nextHot() {
      if (!this.hotList.length) return
      this.hotCursor = (this.hotCursor + 1) % this.hotList.length
    },
    moreHot() {
      this.showHotModal = true
    },
    closeHotModal() {
      this.showHotModal = false
    },
    openDetailFromModal(item) {
      this.closeHotModal()
      this.openDetail(item)
    },
    
    // 验证并返回有效的图片URL（只允许常见图片后缀，强制 https）
    getValidImageUrl(url) {
      if (!url || typeof url !== 'string') return this.defaultCover
      const raw = url.trim()
      // 屏蔽明显的网页链接/详情页链接
      const pagePatterns = ['baidu.com/item', 'baike.baidu.com', 'view.php', '.html', '.shtml', '.php', 'smart-museum.cn']
      if (pagePatterns.some(p => raw.includes(p))) {
        console.warn('检测到非图片URL:', raw, '使用默认图片')
        return this.defaultCover
      }
      // 仅允许 https
      if (raw.startsWith('http://')) {
        console.warn('检测到HTTP协议:', raw, '使用默认图片')
        return this.defaultCover
      }
      // 去除查询/哈希，校验扩展名
      let pathname = raw
      try {
        const u = new URL(raw)
        pathname = u.pathname || ''
      } catch (e) {
        // 非绝对URL时，仍尝试基于字符串判断
        const qIdx = raw.indexOf('?')
        const hIdx = raw.indexOf('#')
        const cut = [qIdx, hIdx].filter(i => i >= 0)
        pathname = cut.length ? raw.slice(0, Math.min(...cut)) : raw
      }
      const lower = pathname.toLowerCase()
      const allowedExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']
      const ok = allowedExts.some(ext => lower.endsWith(ext))
      return ok ? raw : this.defaultCover
    },
    
    // 处理图片加载错误：直接改写对应项的封面为默认图
    handleImageError(item) {
      console.warn('图片加载失败，使用默认图片')
      if (item && item.cover !== this.defaultCover) {
        item.cover = this.defaultCover
      }
    },
    
    goDock(url) {
      if (!url) {
        uni.showToast({ title: '即将开放', icon: 'none' })
        return
      }
      // 当前页重复点击可忽略
      try {
        const pages = getCurrentPages()
        const cur = pages[pages.length - 1]
        if (cur && ('/' + cur.route) === url) return
      } catch (e) {}
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

<style lang="scss" scoped>
$page-bg: #fff;
$brand-brown: #7A4E2D;
$brand-yellow: #FFD666;
$brand-yellow-deep: #FFC94D;

.page {
  min-height: 100vh;
  background: #fffef7;
  color: #222;
  padding-bottom: 280rpx;
}

/* 顶部大图 */
.hero {
  position: relative;
  width: 100%;
  height: 410rpx;
  overflow: hidden;
  .hero-img {
    width: 100%;
    height: 120%;
    object-fit: cover;
    object-position: top center;
  }
  .search {
    position: absolute;
    right: 24rpx;
    bottom: 20rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    height: 68rpx;
    border-radius: 34rpx;
    background: $brand-yellow;
    color: $brand-brown;
    box-shadow: 0 6rpx 18rpx rgba(255,214,102,0.45);
    .search-icon { margin-right: 10rpx; }
    .search-input {
      width: 340rpx;
      height: 100%;
      font-size: 26rpx;
      color: $brand-brown;
    }
  }
}

/* 分类横滑 */
/* 纯文字标签（横向滑动） */
.tabs {
  white-space: nowrap;
  padding: 18rpx 16rpx 6rpx;
  background: #fffef7;
  .tab-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10rpx 14rpx;
    margin: 0 18rpx 0 0;
    font-size: 28rpx;
    color: #7a7a7a;
    position: relative;
  }
  .tab-item.active {
    color: $brand-brown;
  }
  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -8rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 48rpx;
    height: 4rpx;
    border-radius: 4rpx;
    background: $brand-brown;
  }
}

/* 竖向大卡片（横滑） */
.cats-section { padding: 8rpx 0 12rpx; }
.cats-scroll { white-space: nowrap; padding: 0 16rpx; }
.cat-card {
  display: inline-block;
  width: 455rpx;
  height: 640rpx;
  margin-right: 16rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.10);
  background: #ddd;
  position: relative;
}
.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cat-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18rpx 20rpx 22rpx;
  color: #fff;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.58) 100%);
}
.cat-title { font-size: 30rpx; font-weight: 600; }

/* 加载和空状态提示 */
.loading-tip,
.empty-tip {
  text-align: center;
  padding: 80rpx 0;
  font-size: 28rpx;
  color: #999;
}

/* 热门推荐（左图右文卡片） */
.section { padding: 8rpx 16rpx 0; }
.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8rpx 0 12rpx;
}
.section-title { font-size: 30rpx; font-weight: 600; color: #111; }
.more { font-size: 24rpx; color: #9a9a9a; }

.hot-list { display: flex; flex-direction: column; gap: 16rpx; padding-bottom: 16rpx; }
.hot-card {
  display: flex;
  align-items: stretch;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
  padding: 12rpx;
}
.hot-thumb {
  width: 220rpx;
  height: 300rpx;
  border-radius: 16rpx;
  object-fit: cover;
  flex-shrink: 0;
}
.hot-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10rpx 14rpx 8rpx 18rpx;
  justify-content: center;
}
.hot-name { font-size: 28rpx; font-weight: 600; color: #333; margin-bottom: 6rpx; }
.hot-desc { font-size: 24rpx; color: #666; line-height: 1.5; }

/* 热门推荐弹窗 */
.hot-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hot-modal {
  width: 90%;
  max-width: 700rpx;
  max-height: 80vh;
  background: #fffef7;
  border-radius: 24rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.hot-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 28rpx;
  border-bottom: 2rpx solid #e8e8e8;
}
.hot-modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}
.hot-modal-close {
  font-size: 48rpx;
  color: #999;
  line-height: 1;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hot-modal-content {
  flex: 1;
  max-height: calc(80vh - 100rpx);
}
.hot-modal-list {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.hot-modal-card {
  display: flex;
  align-items: stretch;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
  padding: 12rpx;
}
.hot-modal-thumb {
  width: 180rpx;
  height: 130rpx;
  border-radius: 16rpx;
  object-fit: cover;
  flex-shrink: 0;
}
.hot-modal-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4rpx 10rpx 4rpx 14rpx;
}
.hot-modal-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 6rpx;
}
.hot-modal-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
}

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

/* 新图标布局（图片 + 下方文字），不使用圆形底色，不被白色方框包裹 */
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