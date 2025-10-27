<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="header">
      <text class="title">菜谱大全</text>
      <text class="icon-search" @click="onSearchDialog">🔍</text>
    </view>

    <!-- 搜索框（默认隐藏，点击搜索图标显示） -->
    <view class="search-container" v-if="showSearch">
      <input 
        class="search-input" 
        type="text" 
        placeholder="搜索菜谱或食材..." 
        v-model="searchKeyword"
        @confirm="doSearch"
      />
      <text class="cancel-btn" @click="showSearch = false">取消</text>
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

    <!-- 空状态提示 -->
    <view class="empty" v-if="filteredList.length === 0">
      <text>没有找到相关菜谱哦~</text>
    </view>

    <view style="height: 24rpx;" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeCat: 'all',
      cats: [
        { key: 'all', name: '全部' }
        // 其他分类将从接口加载
      ],
      list: [],          // 所有菜谱数据
      searchKeyword: '', // 搜索关键词
      showSearch: false  // 是否显示搜索框
    }
  },
  onLoad(options) {
    if (options && options.cat) {
      this.activeCat = options.cat;
    }
    this.loadCategories();
    this.loadRecipes();
  },
  onShow() {
    const cat = uni.getStorageSync('recipes_cat');
    if (cat) {
      this.activeCat = cat;
      uni.removeStorageSync('recipes_cat');
    }
  },
  computed: {
    filteredList() {
      // 优先显示搜索结果
      if (this.searchKeyword) {
        return this.list;
      }
      // 分类筛选
      if (this.activeCat === 'all') return this.list;
      return this.list.filter(i => i.cat.toString() === this.activeCat);
    }
  },
  methods: {
    // 加载分类（排除根节点）
    loadCategories() {
      uni.request({
        url: 'http://localhost:8080/api/recipes/categories',
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            // 合并默认的"全部"选项和接口返回的分类
            this.cats = [
              { key: 'all', name: '全部' },
              ...res.data.map(type => ({
                key: type.nodeId.toString(),
                name: type.typeName
              }))
            ];
          }
        },
        fail: (err) => {
          console.error('加载分类失败', err);
        }
      });
    },
    
    // 加载菜谱数据
    loadRecipes() {
      const categoryId = this.activeCat === 'all' ? '' : this.activeCat;
      uni.request({
        url: `http://localhost:8080/api/recipes?categoryId=${categoryId}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.list = res.data.map(recipe => ({
              id: recipe.recipeId,
              name: recipe.name,
              level: recipe.difficulty || '简单',
              time: recipe.cookTime || Math.floor(Math.random() * 30) + 10,
              cat: recipe.cuisineType,
              cover: recipe.coverImg || 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png'
            }));
          }
        },
        fail: (err) => {
          console.error('加载菜谱失败', err);
        }
      });
    },
    
    // 显示搜索框
    onSearchDialog() {
      this.showSearch = true;
      // 自动聚焦（需要配合组件实现）
      setTimeout(() => {
        // 注意：在uni-app中，直接聚焦可能不生效，需要使用ref方式
      }, 100);
    },
    
    // 执行搜索
    doSearch() {
      if (!this.searchKeyword.trim()) {
        uni.showToast({ title: '请输入搜索内容', icon: 'none' });
        return;
      }
      
      uni.request({
        url: `http://localhost:8080/api/recipes/search?keyword=${encodeURIComponent(this.searchKeyword)}`,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200 && res.data) {
            this.list = res.data.map(recipe => ({
              id: recipe.recipeId,
              name: recipe.name,
              level: recipe.difficulty || '简单',
              time: recipe.cookTime || Math.floor(Math.random() * 30) + 10,
              cat: recipe.cuisineType,
              cover: recipe.coverImg || 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png'
            }));
          }
        },
        fail: (err) => {
          console.error('搜索失败', err);
          uni.showToast({ title: '搜索失败', icon: 'none' });
        }
      });
    },
    
    // 打开菜谱详情
    openRecipe(r) {
      uni.navigateTo({ url: `/pages/recipe/detail?id=${r.id}` });
    }
  },
  watch: {
    activeCat() {
      // 切换分类时清空搜索关键词
      this.searchKeyword = '';
      this.loadRecipes();
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

/* 搜索框 */
.search-container {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  background: #f5f6f7;
  border-radius: 44rpx;
  margin: 16rpx 0;
}
.search-input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
  background: transparent;
}
.cancel-btn {
  color: #ff6a00;
  font-size: 28rpx;
  margin-left: 16rpx;
  padding: 8rpx 0;
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

/* 空状态 */
.empty {
  padding: 100rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style>