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
      <view v-for="(it, idx) in items" :key="it.id" class="cart-row">
        <view class="row-content"
              :style="{ transform: 'translateX(' + (it._dx || 0) + 'px)' }"
              @touchstart="onTouchStart($event, idx)"
              @touchmove="onTouchMove($event, idx)"
              @touchend="onTouchEnd($event, idx)"
              @click="goDetail(it)">
          <image class="cover" :src="it.imageUrl || fallbackImg" mode="aspectFill" />
          <view class="info">
            <view class="name">{{ it.name || ('菜谱 ' + it.id) }}</view>
            <view class="meta">
              <text class="meta-text">收藏时间：{{ formatTime(it.favTs) }}</text>
            </view>
          </view>
        </view>
        <view class="ops" v-if="it._open">
          <button class="btn ghost tiny" @click.stop="remove(it)">删除</button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      fallbackImg: 'https://img.js.design/assets/img/6638d48432d24d4ad14381c3.png',
      items: []
    }
  },
  onShow() {
    this.loadData()
  },
  methods: {
    loadData() {
      // 读取收藏ID列表与时间元数据
      let ids = []
      let meta = {}
      try {
        ids = uni.getStorageSync('favorites_recipes') || []
        meta = uni.getStorageSync('favorites_meta') || {}
      } catch(e) {
        ids = []
        meta = {}
      }
      // 读取最近随机页的选择（兜底）与收藏名片
      let recent = []
      let cards = {}
      try {
        recent = uni.getStorageSync('random_selection_data') || []
      } catch(e) { recent = [] }
      try {
        cards = uni.getStorageSync('favorites_cards') || {}
      } catch(e) { cards = {} }

      // 组装显示项（优先用收藏名片，其次用最近随机页）
      const items = (ids || []).map(id => {
        const key = String(id)
        const fromCard = cards[key] || {}
        const fromRecent = (recent || []).find(x => String(x.id) === key) || {}
        const favTs = meta && meta[key] ? meta[key] : 0
        return {
          id,
          name: fromCard.name || fromRecent.name || '',
          imageUrl: fromCard.imageUrl || fromRecent.cover || fromRecent.imageUrl || '',
          favTs,
          _dx: 0,
          _open: false
        }
      })
      // 最新优先
      items.sort((a, b) => (b.favTs || 0) - (a.favTs || 0))
      this.items = items
    },
    formatTime(ts) {
      if (!ts) return '未知'
      const d = new Date(ts)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      return `${y}-${m}-${day} ${hh}:${mm}`
    },
    remove(it) {
      // 从收藏中移除
      const ids = (uni.getStorageSync('favorites_recipes') || []).map(x => String(x))
      const idx = ids.indexOf(String(it.id))
      if (idx >= 0) {
        ids.splice(idx, 1)
        uni.setStorageSync('favorites_recipes', ids)
      }
      const meta = uni.getStorageSync('favorites_meta') || {}
      if (meta[it.id]) {
        delete meta[it.id]
        uni.setStorageSync('favorites_meta', meta)
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
      const clamped = Math.max(-160, Math.min(0, dx))
      const it = this.items[idx]
      if (it) {
        this.$set(this.items[idx], '_dx', clamped)
        this.$set(this.items[idx], '_open', clamped < -80)
      }
    },
    onTouchEnd(e, idx) {
      const it = this.items[idx]
      if (!it) return
      const dx = it._dx || 0
      // 左滑超过阈值：固定展开删除按钮；否则收回
      if (dx < -80) {
        this.$set(this.items[idx], '_dx', -120)
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
    clearAll() {
      uni.removeStorageSync('favorites_recipes')
      uni.removeStorageSync('favorites_meta')
      uni.showToast({ title: '已清空', icon: 'none' })
      this.loadData()
    },
    goDetail(it) {
      // 跳转详情（仅传递 id，详情页自行回填）
      uni.navigateTo({ url: `/pages/recipes/detail?id=${it.id}` })
    },
    goExplore() {
      uni.switchTab ? uni.switchTab({ url: '/pages/recipes/index' }) : uni.reLaunch({ url: '/pages/recipes/index' })
    }
  }
}
</script>

<style>
.daily-page { background: #f8fafc; min-height: 100vh; }
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx 12rpx;
}
.title { font-size: 36rpx; font-weight: 800; color: #111827; }
.actions { display: flex; gap: 12rpx; }
.list { max-height: calc(100vh - 120rpx); }

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
}
.btn { height: 72rpx; line-height: 72rpx; text-align: center; border-radius: 14rpx; font-size: 28rpx; }
.btn.small { height: 64rpx; line-height: 64rpx; font-size: 26rpx; }
.btn.tiny { height: 56rpx; line-height: 56rpx; font-size: 24rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.btn.primary { background: linear-gradient(90deg, #ff8a34 0%, #ff6a00 100%); color: #fff; }
.empty {
  padding: 60rpx 24rpx;
  display: flex; flex-direction: column; align-items: center; gap: 16rpx;
}
.empty-text { font-size: 28rpx; color: #6b7280; }
</style>