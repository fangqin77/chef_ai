<template>
  <view class="random-page">
    <!-- 顶部随机菜谱选择条（可点击切换） -->
    <scroll-view class="selection-strip" scroll-x v-if="selection.length">
      <view
        class="sel-item"
        v-for="(s, i) in selection"
        :key="s.id"
        :class="i===currentIndex ? 'active' : ''"
        @click="applySelection(i)"
      >
        <image class="sel-cover" :src="s.cover || s.imageUrl || fallbackImg" mode="aspectFill" />
        <text class="sel-name">{{ s.name || '菜谱' }}</text>
      </view>
    </scroll-view>

    <!-- 顶部图 + 标题 -->
    <view class="hero" @tap="openDetail" @click="openDetail">
      <image class="hero-img" :src="recipe.imageUrl || fallbackImg" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-title">
        <text class="name">{{ recipe.name || '随机菜谱' }}</text>
        <view class="meta">
          <view v-if="recipe.feature" class="tag tag-blue">{{ recipe.feature }}</view>
        </view>
      </view>
    </view>



    <!-- 详情大卡片：原料 / 调料 / 做法 / 基本信息（合并为一个白色方框） -->
    <view class="card big-card" @tap="openDetail" @click="openDetail">
      <view class="section">
        <view class="card-title">原料</view>
        <view class="card-body section-body">
          <text class="para">{{ recipe.ingredients || '—' }}</text>
        </view>
      </view>
      <view class="section">
        <view class="card-title">调料</view>
        <view class="card-body section-body">
          <text class="para">{{ recipe.condiments || '—' }}</text>
        </view>
      </view>
      <view class="section">
        <view class="card-title">做法</view>
        <view class="card-body section-body">
          <view v-if="steps.length" class="steps">
            <view v-for="(s, i) in steps" :key="i" class="step-item">
              <view class="step-index">{{ i + 1 }}</view>
              <text class="step-text">{{ s }}</text>
            </view>
          </view>
          <text v-else class="para">{{ recipe.method || '—' }}</text>
        </view>
      </view>
      <view class="section">
        <view class="card-title">基本信息</view>
        <view class="card-body info-list section-body">
          <view class="info-item"><text class="info-label">菜谱ID：</text><text class="info-value">{{ recipe.id || '—' }}</text></view>
          <view class="info-item"><text class="info-label">菜谱类型号：</text><text class="info-value">{{ recipe.typeId || '—' }}</text></view>
          <view class="info-item"><text class="info-label">特性：</text><text class="info-value">{{ recipe.feature || '—' }}</text></view>
        </view>
      </view>
    </view>

    <view style="height: 120rpx" />

    <!-- 底部操作条：上一个 / 下一个 -->
    <view class="bottom-bar">
      <button class="btn ghost" @click="prevSelection">上一个</button>
      <button class="btn primary" @click="nextSelection">下一个</button>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    // 进入页面时随机挑选四个（本地示例数据，未连接数据库）
    const picked = this.pickFour();
    this.selection = picked;
    this.applySelection(0);
  },
  data() {
    return {
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      selection: [],
      currentIndex: 0,
      // 当前展示的菜谱详情
      recipe: {
        id: null,
        typeId: null,
        name: '',
        method: '',
        condiments: '',
        ingredients: '',
        feature: '',
        imageUrl: ''
      },
      // 示例数据：与菜谱大全类似，可后续替换为接口返回
      list: [
        { id: 'mapo-tofu', name: '麻婆豆腐', level: '简单', time: 20, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png', method: '（1）备料。（2）起锅。（3）调味。', ingredients: '豆腐、牛肉末', condiments: '豆瓣酱、花椒粉' },
        { id: 'egg-fried-rice', name: '蛋炒饭', level: '简单', time: 15, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png', method: '（1）打蛋。（2）炒饭。（3）出锅。', ingredients: '米饭、鸡蛋', condiments: '盐、葱花' },
        { id: 'hongshao-rou', name: '红烧肉', level: '中等', time: 45, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png', method: '（1）焯水。（2）煸糖色。（3）收汁。', ingredients: '五花肉', condiments: '冰糖、酱油' },
        { id: 'tangcu-liji', name: '糖醋里脊', level: '中等', time: 35, cat: 'cn', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png', method: '（1）挂糊。（2）炸制。（3）糖醋汁。', ingredients: '里脊肉', condiments: '糖、醋' },
        { id: 'sushi', name: '寿司拼盘', level: '中等', time: 40, cat: 'jp', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png', method: '（1）蒸饭。（2）拌醋。（3）卷制。', ingredients: '米、海苔', condiments: '寿司醋' },
        { id: 'bibimbap', name: '石锅拌饭', level: '简单', time: 25, cat: 'kr', cover: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png', method: '（1）配菜。（2）拌酱。（3）加热。', ingredients: '米、蔬菜', condiments: '韩式拌酱' }
      ]
    }
  },
  computed: {
    // 将“(1) … (2) …”或以换行分段的做法拆成步骤
    steps() {
      const m = this.recipe.method || ''
      if (!m) return []
      const numbered = m.split(/\（\d+\）|\(\d+\)\s*/).filter(Boolean)
      if (numbered.length > 1) return numbered.map(s => s.trim()).filter(Boolean)
      return m.split(/[\n。]/).map(s => s.trim()).filter(Boolean)
    }
  },
  methods: {
    openDetail() {
      const r = this.recipe || {}
      const id = r.id
      uni.showToast({ title: '打开详情...', icon: 'none', duration: 600 })
      const url = id ? `/pages/recipes/detail?id=${encodeURIComponent(id)}` : '/pages/recipes/detail'
      uni.navigateTo({ url })
    },
    // 随机挑选四个菜谱
    pickFour() {
      const src = this.list || [];
      const n = Math.min(3, src.length);
      const pool = [...src];
      const res = [];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        res.push(pool.splice(idx, 1)[0]);
      }
      return res;
    },
    // 应用选择项到详情
    applySelection(i) {
      if (!Array.isArray(this.selection) || !this.selection.length) return
      const n = ((i % this.selection.length) + this.selection.length) % this.selection.length
      this.currentIndex = n
      const s = this.selection[n] || {}
      this.recipe = {
        id: s.id || null,
        typeId: s.typeId || null,
        name: s.name || '',
        method: s.method || '',
        condiments: s.condiments || '',
        ingredients: s.ingredients || '',
        feature: s.feature || '',
        imageUrl: s.cover || s.imageUrl || this.fallbackImg
      }
    },
    // 上一个/下一个
    prevSelection() {
      if (!this.selection.length) return
      this.applySelection(this.currentIndex - 1)
    },
    nextSelection() {
      if (!this.selection.length) return
      this.applySelection(this.currentIndex + 1)
    }
  }
}
</script>

<style>
.random-page {
  background: #f7f2e7;
  min-height: 100vh;
}

/* 顶部选择条 */
.selection-strip {
  margin: 24rpx 0;
  padding: 0 20rpx 0 36rpx;   /* 整体向右挪一点：左更大、右更小 */
  display: flex;
  justify-content: center;    /* 居中排列 */
  gap: 36rpx;                 /* 三卡片间隔更大且一致 */
  white-space: nowrap;
}
.sel-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 200rpx;
  margin-right: 0;            /* 去掉右侧多余间距 */
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
  overflow: hidden;
  border: 2rpx solid transparent;
}
.sel-item.active {
  border-color: #FFC107;
}
.sel-cover {
  width: 200rpx;
  height: 140rpx;
  background: #eee;
}
.sel-name {
  padding: 10rpx 12rpx 14rpx;
  font-size: 24rpx;
  color: #1f2937;
  max-width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 顶部大图 */
.hero {
  position: relative;
  height: 420rpx;
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
  background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%);
  pointer-events: none;
}
.hero-title {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: 12rpx;
  color: #fff;
  pointer-events: none;
}
.name {
  font-size: 40rpx;
  font-weight: 800;
}
.meta {
  margin-top: 12rpx;
  display: flex;
  gap: 12rpx;
}
.tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  background: rgba(255,255,255,0.2);
  color: #fff;
}
.tag-orange { background: linear-gradient(90deg, #FFE27A, #FFC107); }
.tag-green { background: #27ae60; }
.tag-blue { background: #3b82f6; }

/* 卡片通用 */
.card {
  margin: 24rpx 24rpx 16rpx; /* 再下移，避免与上方图片重叠 */
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 16rpx 36rpx rgba(0,0,0,0.08);
  overflow: hidden;
}
.card-title {
  padding: 22rpx 24rpx 0;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}
.card-body {
  padding: 16rpx 24rpx 24rpx;
}
.para {
  font-size: 26rpx;
  color: #4b5563;
  line-height: 1.7;
}

/* 步骤列表 */
.steps {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
}
.step-index {
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
  font-weight: 700;
  background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%);
  color: #fff;
  box-shadow: 0 6rpx 16rpx rgba(255,193,7,0.3);
}
.step-text {
  flex: 1;
  font-size: 26rpx;
  color: #374151;
}

/* 底部操作条 */
.bottom-bar {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  padding: 12rpx 20rpx 22rpx;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(6rpx);
  display: flex;
  gap: 16rpx;
}
.btn {
  flex: 1 1 0;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 28rpx;
}
.btn.ghost {
  background: #f3f4f6;
  color: #374151;
}
.btn.primary {
  background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%);
  color: #fff;
  box-shadow: 0 8rpx 22rpx rgba(255,193,7,0.32);
}
/* 基本信息样式 */
.info-list {
  padding-top: 6rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.info-item {
  display: flex;
  align-items: flex-start;
  gap: 8rpx;
  line-height: 1.6;
}
.info-label {
  color: #6b7280;
  font-size: 26rpx;
}
.info-value {
  color: #1f2937;
  font-size: 26rpx;
  flex: 1;
}
.info-value.break {
  word-break: break-all;
}

/* 让最下方的“基本信息”卡片再往下挪一点 */
.info-card { margin-top: 32rpx; }

/* 合并大卡片的分隔与上内边距（让“原料”的文字再往下挪一点） */
.big-card .section + .section {
  border-top: 1rpx solid #f1f5f9;
  margin-top: 8rpx;
  padding-top: 8rpx;
}
.section-body { padding-top: 10rpx; }

/* 兼容不支持 flex gap 的环境，增加项间距备用 */
.selection-strip .sel-item + .sel-item { margin-left: 36rpx; }

</style>