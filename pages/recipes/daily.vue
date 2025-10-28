<template>
  <view class="daily-page">
    <view class="header">
      <text class="title">每日菜谱</text>
      <view class="actions">
        <button class="btn ghost small" @click="clearAll" v-if="items.length">清空</button>
      </view>
    </view>

    <view v-if="!items.length" class="empty">
      <text class="empty-text">还没有收藏的菜谱，去逛逛吧～</text>
      <button class="btn primary small" @click="goExplore">去菜谱大全</button>
    </view>

    <scroll-view scroll-y class="list">
      <view v-for="g in groups" :key="g.date" class="date-section">
        <view class="date-header">{{ g.date }}</view>
        <view v-for="(it, idx) in g.items" :key="it.id" class="cart-row">
          <view class="row-content"
                :style="{ transform: 'translateX(' + (it._dx || 0) + 'px)' }"
                @touchstart.stop="onTouchStart($event, it._gIndex)"
                @touchmove="onTouchMove($event, it._gIndex)"
                @touchend="onTouchEnd($event, it._gIndex)"
                @tap="handleTap(it)">
            <image class="cover" :src="it.imageUrl || fallbackImg" mode="aspectFill" />
            <view class="info">
              <view class="name">{{ it.name || ('菜谱 ' + it.id) }}</view>
            </view>
          </view>
          <view class="ops" v-if="it._open">
            <button class="btn ghost tiny" @click.stop="remove(it)">删除</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      items: [],
      groups: [],
      _startX: 0,
      _pendingTapTimer: null
    }
  },
  onShow() {
    this.loadData()
  },
  methods: {
    loadData() {
      // 读取收藏ID列表
      let ids = []
      try {
        ids = uni.getStorageSync('favorites_recipes') || []
      } catch(e) {
        ids = []
      }
      // 读取名片与计划日期
      let recent = []
      let cards = {}
      let planned = {}
      try { recent = uni.getStorageSync('random_selection_data') || [] } catch(e) { recent = [] }
      try { cards = uni.getStorageSync('favorites_cards') || {} } catch(e) { cards = {} }
      try { planned = uni.getStorageSync('favorites_planned') || {} } catch(e) { planned = {} }

      // 组装显示项
      const items = (ids || []).map(id => {
        const key = String(id)
        const fromCard = cards[key] || {}
        const fromRecent = (recent || []).find(x => String(x.id) === key) || {}
        const dateStr = planned[key] || '未安排'
        return {
          id,
          name: this.safeDecode(fromCard.name || fromRecent.name || ''),
          imageUrl: fromCard.imageUrl || fromRecent.cover || fromRecent.imageUrl || '',
          plannedDate: dateStr,
          _dx: 0,
          _open: false
        }
      })
      this.items = items

      // 分组：按日期倒序，未安排置底
      const map = {}
      items.forEach((it, idx) => {
        const d = it.plannedDate || '未安排'
        if (!map[d]) map[d] = []
        // 记录一份全局索引，供滑动行用（引用原对象，保持 _open/_dx 响应）
        const idx0 = this.findIndexById(it.id)
        if (idx0 >= 0) this.items[idx0]._gIndex = idx0
        map[d].push(this.items[idx0])
      })
      // 按与今天的“接近程度”排序，最近的在上；“未安排”置底
      const todayBase = new Date()
      const base = new Date(todayBase.getFullYear(), todayBase.getMonth(), todayBase.getDate())
      const diffDays = (ds) => {
        if (!ds || ds === '未安排') return Number.POSITIVE_INFINITY
        const parts = String(ds).split('-').map(Number)
        if (parts.length !== 3 || parts.some(isNaN)) return Number.POSITIVE_INFINITY
        const d = new Date(parts[0], parts[1] - 1, parts[2])
        return Math.abs((d - base) / 86400000)
      }
      const keys = Object.keys(map).sort((a, b) => {
        const da = diffDays(a)
        const db = diffDays(b)
        if (da !== db) return da - db
        // 若接近度相同，则按日期先后排序（“未安排”已在无穷大末尾）
        return a > b ? 1 : -1
      })
      this.groups = keys.map(k => ({ date: k, items: map[k] }))
    },
    findIndexById(id) {
      return (this.items || []).findIndex(x => String(x.id) === String(id))
    },
    remove(it) {
      // 从收藏中移除
      const key = String(it.id)
      const ids = (uni.getStorageSync('favorites_recipes') || []).map(x => String(x))
      const idx = ids.indexOf(key)
      if (idx >= 0) {
        ids.splice(idx, 1)
        uni.setStorageSync('favorites_recipes', ids)
      }
      // 兼容旧的收藏时间元数据（若存在则清理）
      const meta = uni.getStorageSync('favorites_meta') || {}
      if (meta[key]) {
        delete meta[key]
        uni.setStorageSync('favorites_meta', meta)
      }
      // 移除计划日期
      const planned = uni.getStorageSync('favorites_planned') || {}
      if (planned[key]) {
        delete planned[key]
        uni.setStorageSync('favorites_planned', planned)
      }
      uni.showToast({ title: '已删除', icon: 'none' })
      this.loadData()
    },
    // 滑动交互
    onTouchStart(e, idx) {
      this._startX = (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      // 只保留当前项展开，其它收回
      this.closeAll(idx)
    },
    onTouchMove(e, idx) {
      const x = (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const dx = x - (this._startX || 0)
      // 仅允许向左滑动显示删除
      const clamped = Math.max(-200, Math.min(0, dx))
      const it = this.items[idx]
      if (it) {
        this.$set(this.items[idx], '_dx', clamped)
        // 降低展开阈值，提升易用性
        this.$set(this.items[idx], '_open', clamped < -48)
      }
    },
    onTouchEnd(e, idx) {
      const it = this.items[idx]
      if (!it) return
      // 轻点判定：横向位移很小视为点击
      const endX = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : (this._startX || 0))
      const distance = Math.abs(endX - (this._startX || 0))
      if (distance < 8) {
        // 收起展开，避免 .ops 覆盖导致点不到
        this.$set(this.items[idx], '_dx', 0)
        this.$set(this.items[idx], '_open', false)
        // 微任务触发点击，避免与触摸流竞争
        Promise.resolve().then(() => this.handleTap ? this.handleTap(it) : this.onRowTap(it))
        return
      }
      const dx = it._dx || 0
      // 左滑超过阈值：固定展开删除按钮；否则收回
      if (dx < -48) {
        this.$set(this.items[idx], '_dx', -140)
        this.$set(this.items[idx], '_open', true)
      } else {
        this.$set(this.items[idx], '_dx', 0)
        this.$set(this.items[idx], '_open', false)
      }
    },
    closeAll(keepIdx = -1) {
      (this.items || []).forEach((row, i) => {
        if (i !== keepIdx) {
          row._dx = 0
          row._open = false
        }
      })
    },
    // 收回当前项（用于“取消”按钮）
    closeOne(it) {
      const idx = this.findIndexById(it.id)
      if (idx >= 0) {
        this.$set(this.items[idx], '_dx', 0)
        this.$set(this.items[idx], '_open', false)
      }
    },
    clearAll() {
      uni.removeStorageSync('favorites_recipes')
      uni.removeStorageSync('favorites_meta')
      uni.removeStorageSync('favorites_planned')
      uni.showToast({ title: '已清空', icon: 'none' })
      this.loadData()
    },
    // 统一 tap 点击入口（由模板 @tap 调用）
    handleTap(it) {
      this.onRowTap(it)
    },
    onRowTap(it) {
      // 若该行处于展开，先收回，不跳转
      const idx = this.findIndexById(it.id)
      if (idx >= 0) {
        const row = this.items[idx]
        if (row && row._open) {
          this.$set(this.items[idx], '_dx', 0)
          this.$set(this.items[idx], '_open', false)
          return
        }
      }
      // 保险地收起其它滑开的行后再跳转
      this.closeAll()
      this.goDetail(it)
    },
    goDetail(it) {
      const rawId = it && it.id != null ? this.safeDecode(String(it.id)) : ''
      const encodedId = rawId ? encodeURIComponent(rawId) : ''
      const url = encodedId ? `/pages/recipes/detail?id=${encodedId}` : '/pages/recipes/detail'
      uni.navigateTo({
        url,
        fail: () => {
          uni.showToast({ title: '跳转失败，请检查 pages.json 是否已注册 detail 页面', icon: 'none' })
          // 兜底一次，避免极端环境 navigateTo 失败
          uni.redirectTo({ url })
        }
      })
    },
    safeDecode(val) {
      if (typeof val !== 'string') return val
      let result = val
      for (let i = 0; i < 2; i++) {
        if (typeof result === 'string' && result.includes('%')) {
          try {
            const decoded = decodeURIComponent(result)
            if (decoded === result) break
            result = decoded
            continue
          } catch(e) {
            break
          }
        }
        break
      }
      return result
    },
    goExplore() {
      uni.switchTab ? uni.switchTab({ url: '/pages/recipes/index' }) : uni.reLaunch({ url: '/pages/recipes/index' })
    }
  }
}
</script>

<style>
.daily-page { background: #f7f2e7; min-height: 100vh; }
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx 12rpx;
}
.title { font-size: 36rpx; font-weight: 800; color: #111827; }
.actions { display: flex; gap: 12rpx; }
.list { max-height: calc(100vh - 120rpx); }
.date-section { margin-bottom: 12rpx; }
.date-header {
  padding: 8rpx 24rpx;
  font-size: 26rpx;
  color: #6b7280;
}

.cart-row {
  position: relative;
  overflow: hidden;
  padding: 16rpx 24rpx;
  margin: 0 24rpx 16rpx;
  background: #fff;
  border-radius: 18rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.06);
}
.row-content {
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  will-change: transform;
}
.cover {
  width: 140rpx;
  height: 100rpx;
  border-radius: 12rpx;
  background: #eee;
  margin-right: 16rpx;
}
.info { flex: 1; display: flex; flex-direction: column; }
.name { font-size: 30rpx; font-weight: 700; color: #1f2937; }
.meta { margin-top: 6rpx; }
.meta-text { font-size: 24rpx; color: #6b7280; }

.ops {
  position: absolute;
  right: 24rpx;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 2;
}
.btn { height: 72rpx; line-height: 72rpx; text-align: center; border-radius: 14rpx; font-size: 28rpx; }
.btn.small { height: 64rpx; line-height: 64rpx; font-size: 26rpx; }
.btn.tiny { height: 56rpx; line-height: 56rpx; font-size: 24rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.btn.primary { background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%); color: #fff; }
.empty {
  padding: 60rpx 24rpx;
  display: flex; flex-direction: column; align-items: center; gap: 16rpx;
}
.empty-text { font-size: 28rpx; color: #6b7280; }
</style>