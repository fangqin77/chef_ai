<template>
  <view class="detail-page">
    <!-- 顶部图 + 渐变遮罩 -->
    <view class="hero">
      <image class="hero-img" :src="recipe.imageUrl || fallbackImg" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-title">
        <text class="name">{{ recipe.name || '菜谱详情' }}</text>
      </view>
      <!-- 收藏星标（右上角） -->
      <view class="fav-btn" @click="toggleFavorite">
        <text class="star">{{ isFavorited ? '★' : '☆' }}</text>
      </view>
    </view>

    <!-- 详情大卡片：原料 / 调料 / 做法 / 基本信息（合并为一个白色方框） -->
    <view class="card big-card">
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

    <!-- 计时卡片 -->


    <view class="card timer-card">
      <view class="card-title">烹饪计时</view>
      <view class="card-body">
        <view class="timer-row">
          <text class="time-left">{{ timeLeft }}</text>
          <view class="preset-group">
            <button class="chip-btn" :class="{active: timerPreset===300}" @click="selectPreset(300)">5分钟</button>
            <button class="chip-btn" :class="{active: timerPreset===600}" @click="selectPreset(600)">10分钟</button>
            <button class="chip-btn" @click="customPresetVisible = !customPresetVisible">自定义</button>
          </view>
          <view v-if="customPresetVisible" class="custom-row">
            <input class="custom-input" type="number" placeholder="分钟数" v-model="customPresetMinutes" />
            <button class="chip-btn set-btn" @click="applyCustomPreset">设定</button>
          </view>
        </view>
        <view class="progress">
          <view class="bar" :style="{ width: progressPct + '%', background: (progressPct > 0 ? 'linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%)' : 'transparent') }"></view>
        </view>
        <view class="timer-actions">
          <button class="btn ghost small" @click="resetTimer">重置</button>
          <button class="btn primary small" @click="timerRunning ? pauseTimer() : startTimer()">
            {{ timerRunning ? '暂停' : '开始' }}
          </button>
        </view>
      </view>
    </view>

    <view style="height: 120rpx" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      fallbackImg: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png',
      selection: [],
      currentIndex: 0,
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
      favorites: [],
      todayPlan: [],
      timerPreset: 0,   // 初始不选预设
      timerSeconds: 0,
      timerRunning: false,
      timerTick: null,
      customPresetVisible: false,
      customPresetMinutes: ''
    }
  },
  computed: {
    // 将“(1) … (2) …”或以换行分段的做法拆成步骤
    steps() {
      const m = this.recipe.method || ''
      if (!m) return []
      // 优先匹配形如 (1)(2) 的编号段落
      const numbered = m.split(/\(\d+\)\s*/).filter(Boolean)
      if (numbered.length > 1) return numbered.map(s => s.trim()).filter(Boolean)
      // 退化：按换行/顿号/句号切
      return m.split(/[\n。]/).map(s => s.trim()).filter(Boolean)
    },
    isFavorited() {
      const id = this.recipe.id
      if (!id) return false
      return (this.favorites || []).includes(String(id)) || (this.favorites || []).includes(Number(id))
    },
    isInPlan() {
      const id = this.recipe.id
      if (!id) return false
      return (this.todayPlan || []).includes(String(id)) || (this.todayPlan || []).includes(Number(id))
    },
    timeLeft() {
      const s = Math.max(0, this.timerSeconds || 0)
      const mm = String(Math.floor(s / 60)).padStart(2, '0')
      const ss = String(s % 60).padStart(2, '0')
      return `${mm}:${ss}`
    },
    progressPct() {
      const total = this.timerPreset || 0
      if (!total || total <= 0) return 0
      const done = Math.min(total, Math.max(0, total - (this.timerSeconds || 0)))
      return Math.round((done / total) * 100)
    }
  },
  onLoad(options) {
    // 接收路由参数，尽量兼容命名
    const id = options?.id || options?.recipeId || options?.菜谱ID
    const typeId = options?.typeId || options?.菜谱类型号
    const name = options?.name || options?.菜谱名称
    const method = options?.method || options?.做法
    const condiments = options?.condiments || options?.调料
    const ingredients = options?.ingredients || options?.原料
    const feature = options?.feature || options?.特性
    const imageUrl = options?.imageUrl || options?.图片URL

    // 如果仅传了 id=952，则填充示例数据
    if (id && String(id) === '952' && !name) {
      this.recipe = {
        id: 952,
        typeId: typeId || 101,
        name: '蛋花丝瓜汤',
        method:
          '(1)丝瓜洗净，去皮切片；香菜择洗干净切段。\n(2)油锅烧热，放入葱花炝锅，下丝瓜煸炒，加适量清水、盐煮沸后，倒入蛋花液，加香菜、味精即成。',
        condiments: '味精,盐,植物油',
        ingredients: '蛋黄1个30克,丝瓜100克',
        feature: feature || '',
        imageUrl: imageUrl || ''
      }
    } else {
      this.recipe = {
        id: id || null,
        typeId: typeId || null,
        name: name || '',
        method: method || '',
        condiments: condiments || '',
        ingredients: ingredients || '',
        feature: feature || '',
        imageUrl: imageUrl || ''
      }
    }

    // 读取本地存储
    try {
      this.favorites = uni.getStorageSync('favorites_recipes') || []
      this.todayPlan = uni.getStorageSync('today_plan_recipes') || []
    } catch(e) {
      this.favorites = []
      this.todayPlan = []
    }

    // 初始化计时（允许通过 ?preset=600 指定）
    const preset = parseInt(options?.preset || '', 10)
    if (!isNaN(preset) && preset > 0) {
      this.timerPreset = preset
    }
    this.timerSeconds = 0

    // 加载四个随机菜谱选择列表
    try {
      const sel = uni.getStorageSync('random_selection_data') || []
      if (Array.isArray(sel) && sel.length) {
        this.selection = sel
        // 当前索引：根据传入的 id 定位
        const curId = this.recipe.id
        const idx = sel.findIndex(x => String(x.id) === String(curId))
        this.currentIndex = idx >= 0 ? idx : 0
        // 统一当前展示为索引项（确保字段映射）
        this.applySelection(this.currentIndex)
      }
    } catch(e) {}
  },
  methods: {
    goBack() {
      const pages = getCurrentPages && getCurrentPages()
      if (pages && pages.length > 1) {
        uni.navigateBack({ delta: 1 })
      } else {
        uni.switchTab ? uni.switchTab({ url: '/pages/index/index' }) : uni.reLaunch({ url: '/pages/index/index' })
      }
    },
    cancelAndBack() {
      const pages = getCurrentPages && getCurrentPages()
      if (pages && pages.length > 1) {
        uni.navigateBack({ delta: 1 })
      } else {
        uni.reLaunch({ url: '/pages/index/index' })
      }
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
    },
    // 收藏/计划本地存储
    saveStorage() {
      uni.setStorageSync('favorites_recipes', this.favorites || [])
      uni.setStorageSync('today_plan_recipes', this.todayPlan || [])
    },
    toggleFavorite() {
      const id = this.recipe.id
      if (!id) return
      const key = String(id)
      const arr = (this.favorites || []).map(x => String(x))
      const idx = arr.indexOf(key)

      // 读取收藏时间元数据与名片
      let meta = {}
      let cards = {}
      try {
        meta = uni.getStorageSync('favorites_meta') || {}
        cards = uni.getStorageSync('favorites_cards') || {}
      } catch(e) {
        meta = {}
        cards = {}
      }

      if (idx >= 0) {
        // 取消收藏
        this.favorites.splice(idx, 1)
        if (meta[key]) delete meta[key]
        if (cards[key]) delete cards[key]
        uni.setStorageSync('favorites_meta', meta)
        uni.setStorageSync('favorites_cards', cards)
        uni.showToast({ title: '已取消收藏', icon: 'none' })
      } else {
        // 添加收藏并记录时间戳与名片
        this.favorites.push(key)
        meta[key] = Date.now()
        cards[key] = {
          id: key,
          name: this.recipe.name || '',
          imageUrl: this.recipe.imageUrl || this.fallbackImg
        }
        uni.setStorageSync('favorites_meta', meta)
        uni.setStorageSync('favorites_cards', cards)
        uni.showToast({ title: '已收藏到每日菜谱', icon: 'none' })
      }

      this.saveStorage()
    },
    togglePlan() {
      const id = this.recipe.id
      if (!id) return
      const key = String(id)
      const arr = (this.todayPlan || []).map(x => String(x))
      const idx = arr.indexOf(key)
      if (idx >= 0) {
        this.todayPlan.splice(idx, 1)
        uni.showToast({ title: '已移出计划', icon: 'none' })
      } else {
        this.todayPlan.push(key)
        uni.showToast({ title: '已加入今日计划', icon: 'none' })
      }
      this.saveStorage()
    },
    // 计时器
    selectPreset(sec) {
      if (this.timerRunning) this.pauseTimer()
      this.timerPreset = sec
      this.timerSeconds = sec
    },
    startTimer() {
      if (this.timerRunning) return
      this.timerRunning = true
      this.timerTick = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds -= 1
        } else {
          this.pauseTimer()
          uni.showToast({ title: '时间到！', icon: 'none' })
        }
      }, 1000)
    },
    pauseTimer() {
      this.timerRunning = false
      if (this.timerTick) {
        clearInterval(this.timerTick)
        this.timerTick = null
      }
    },
    resetTimer() {
      this.pauseTimer()
      this.timerSeconds = 0
    },
    applyCustomPreset() {
      const n = parseInt(this.customPresetMinutes, 10)
      if (isNaN(n) || n <= 0) {
        uni.showToast({ title: '请输入有效分钟数', icon: 'none' })
        return
      }
      const sec = n * 60
      this.selectPreset(sec)
      this.customPresetVisible = false
      uni.showToast({ title: `已设定${n}分钟`, icon: 'none' })
    },
    startCook() {
      // 开始烹饪即启动计时
      if (!this.timerRunning) {
        this.startTimer()
        uni.showToast({ title: '已开始烹饪～', icon: 'none' })
      }
    }
  }
}
</script>

<style>
.detail-page {
  background: #f8fafc;
  min-height: 100vh;
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
}
.hero-title {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
  color: #fff;
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
.tag-orange { background: linear-gradient(90deg, #ff8a34, #ff6a00); }
.tag-green { background: #27ae60; }
.tag-blue { background: #3b82f6; }

/* 顶部收藏星标 */
.fav-btn {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  width: 64rpx;
  height: 64rpx;
  border-radius: 32rpx;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(4rpx);
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}
.star {
  font-size: 40rpx;
  line-height: 1;
  color: #ffd700; /* 金色星标 */
}
.fav-btn:active { transform: scale(0.96); }

/* 云朵元素样式已移除 */

/* 卡片通用 */
.card {
  margin: 12rpx 24rpx 16rpx; /* 下移避免与顶部图片重叠 */
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
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  color: #fff;
  box-shadow: 0 6rpx 16rpx rgba(255,122,0,0.3);
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
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  color: #fff;
  box-shadow: 0 8rpx 22rpx rgba(255,122,0,0.32);
}

/* 计时UI */
.timer-card .timer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time-left {
  font-size: 40rpx;
  font-weight: 800;
  color: #111827;
}
.preset-group {
  display: flex;
  gap: 12rpx;
}
.chip-btn {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  background: #f3f4f6;
  color: #374151;
}
.chip-btn.active {
  color: #fff;
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  box-shadow: 0 6rpx 14rpx rgba(255,122,0,0.28);
}
/* 自定义计时样式 */
.custom-row {
  margin-top: 12rpx;
  display: flex;
  gap: 12rpx;
  align-items: center;
}
.custom-input {
  flex: 1;
  height: 64rpx;
  background: #fff;
  border-radius: 12rpx;
  padding: 0 16rpx;
  font-size: 26rpx;
  box-shadow: 0 6rpx 14rpx rgba(0,0,0,0.06);
}
.set-btn {
  padding: 10rpx 18rpx;
}
.progress {
  margin-top: 16rpx;
  height: 12rpx;
  background: #e5e7eb;
  border-radius: 999rpx;
  overflow: hidden;
}
.progress .bar {
  height: 100%;
  background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%);
  width: 0%;
}
.timer-actions {
  margin-top: 16rpx;
  display: flex;
  gap: 16rpx;
}
.btn.small {
  height: 72rpx;
  line-height: 72rpx;
  font-size: 26rpx;
}
/* 选择条样式 */
.selection-strip {
  margin: 12rpx 24rpx;
  display: flex;
  white-space: nowrap;
}
.sel-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 200rpx;
  margin-right: 16rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
  overflow: hidden;
  border: 2rpx solid transparent;
}
.sel-item.active {
  border-color: #ff8a34;
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
/* 合并大卡片分区样式（与随机页一致） */
.big-card .section + .section {
  border-top: 1rpx solid #f1f5f9;
  margin-top: 8rpx;
  padding-top: 8rpx;
}
.section-body { padding-top: 10rpx; }

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

</style>