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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type RowItem = {
  id: string | number
  name: string
  imageUrl: string
  plannedDate: string
  _dx?: number
  _open?: boolean
  _gIndex?: number
}

type Group = { date: string; items: RowItem[] }

const fallbackImg = '/static/yuan_97e57f821c79b841651df5b413309328.jpg'
const items = ref<RowItem[]>([])
const groups = ref<Group[]>([])
let _startX = 0

function safeDecode(val: unknown): string | unknown {
  if (typeof val !== 'string') return val
  let result: string = val
  for (let i = 0; i < 2; i++) {
    if (typeof result === 'string' && result.includes('%')) {
      try {
        const decoded = decodeURIComponent(result)
        if (decoded === result) break
        result = decoded
        continue
      } catch (e) {
        break
      }
    }
    break
  }
  return result
}

function findIndexById(id: string | number): number {
  return (items.value || []).findIndex(x => String(x.id) === String(id))
}

function buildGroups(list: RowItem[]) {
  const map: Record<string, RowItem[]> = {}
  list.forEach(it => {
    const d = it.plannedDate || '未安排'
    if (!map[d]) map[d] = []
    const idx0 = findIndexById(it.id)
    if (idx0 >= 0) items.value[idx0]._gIndex = idx0
    map[d].push(items.value[idx0])
  })
  const todayBase = new Date()
  const base = new Date(todayBase.getFullYear(), todayBase.getMonth(), todayBase.getDate())
  const MS_PER_DAY = 86400000
  const diffDays = (ds: string): number => {
    if (!ds || ds === '未安排') return Number.POSITIVE_INFINITY
    const parts = String(ds).split('-').map(Number)
    if (parts.length !== 3 || parts.some(n => Number.isNaN(n))) return Number.POSITIVE_INFINITY
    const d = new Date(parts[0], parts[1] - 1, parts[2])
    return Math.abs((d.getTime() - base.getTime()) / MS_PER_DAY)
  }
  const keys = Object.keys(map).sort((a, b) => {
    const da = diffDays(a)
    const db = diffDays(b)
    if (da !== db) return da - db
    return a > b ? 1 : -1
  })
  groups.value = keys.map(k => ({ date: k, items: map[k] }))
}

function loadData() {
  let ids: Array<string | number> = []
  try {
    ids = (uni.getStorageSync && uni.getStorageSync('favorites_recipes')) || []
  } catch (e) {
    ids = []
  }
  let recent: any[] = []
  let cards: Record<string, any> = {}
  let planned: Record<string, string> = {}
  try { recent = (uni.getStorageSync && uni.getStorageSync('random_selection_data')) || [] } catch (e) { recent = [] }
  try { cards = (uni.getStorageSync && uni.getStorageSync('favorites_cards')) || {} } catch (e) { cards = {} }
  try { planned = (uni.getStorageSync && uni.getStorageSync('favorites_planned')) || {} } catch (e) { planned = {} }

  const list: RowItem[] = (ids || []).map((id) => {
    const key = String(id)
    const fromCard = cards[key] || {}
    const fromRecent = (recent || []).find((x: any) => String(x.id) === key) || {}
    const dateStr = planned[key] || '未安排'
    return {
      id,
      name: String(safeDecode(fromCard.name || fromRecent.name || '')),
      imageUrl: fromCard.imageUrl || fromRecent.cover || fromRecent.imageUrl || '',
      plannedDate: dateStr,
      _dx: 0,
      _open: false
    }
  })
  items.value = list
  buildGroups(list)
}

function remove(it: RowItem) {
  const key = String(it.id)
  const ids = ((uni.getStorageSync && uni.getStorageSync('favorites_recipes')) || []).map((x: any) => String(x))
  const idx = ids.indexOf(key)
  if (idx >= 0) {
    ids.splice(idx, 1)
    uni.setStorageSync && uni.setStorageSync('favorites_recipes', ids)
  }
  const meta = (uni.getStorageSync && uni.getStorageSync('favorites_meta')) || {}
  if (meta[key]) {
    delete meta[key]
    uni.setStorageSync && uni.setStorageSync('favorites_meta', meta)
  }
  const planned = (uni.getStorageSync && uni.getStorageSync('favorites_planned')) || {}
  if (planned[key]) {
    delete planned[key]
    uni.setStorageSync && uni.setStorageSync('favorites_planned', planned)
  }
  uni.showToast && uni.showToast({ title: '已删除', icon: 'none' })
  loadData()
}

function onTouchStart(e: any, idx: number) {
  _startX = (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
  closeAll(idx)
}

function onTouchMove(e: any, idx: number) {
  const x = (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
  const dx = x - (_startX || 0)
  const clamped = Math.max(-200, Math.min(0, dx))
  const it = items.value[idx]
  if (it) {
    it._dx = clamped
    it._open = clamped < -48
  }
}

function onTouchEnd(e: any, idx: number) {
  const it = items.value[idx]
  if (!it) return
  const endX = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : (_startX || 0))
  const distance = Math.abs(endX - (_startX || 0))
  if (distance < 8) {
    it._dx = 0
    it._open = false
    setTimeout(() => handleTap(it), 0)
    return
  }
  const dx = it._dx || 0
  if (dx < -48) {
    it._dx = -140
    it._open = true
  } else {
    it._dx = 0
    it._open = false
  }
}

function closeAll(keepIdx: number = -1) {
  (items.value || []).forEach((row, i) => {
    if (i !== keepIdx) {
      row._dx = 0
      row._open = false
    }
  })
}

function clearAll() {
  uni.removeStorageSync && uni.removeStorageSync('favorites_recipes')
  uni.removeStorageSync && uni.removeStorageSync('favorites_meta')
  uni.removeStorageSync && uni.removeStorageSync('favorites_planned')
  uni.showToast && uni.showToast({ title: '已清空', icon: 'none' })
  loadData()
}

function handleTap(it: RowItem) {
  onRowTap(it)
}

function onRowTap(it: RowItem) {
  const idx = findIndexById(it.id)
  if (idx >= 0) {
    const row = items.value[idx]
    if (row && row._open) {
      row._dx = 0
      row._open = false
      return
    }
  }
  closeAll()
  goDetail(it)
}

function goDetail(it: RowItem) {
  const rawId = it && it.id != null ? safeDecode(String(it.id)) : ''
  const encodedId = typeof rawId === 'string' && rawId ? encodeURIComponent(rawId) : ''
  const url = encodedId ? `/pages/recipes/detail?id=${encodedId}` : '/pages/recipes/detail'
  uni.navigateTo && uni.navigateTo({
    url,
    fail: () => {
      uni.showToast && uni.showToast({ title: '跳转失败，请检查 pages.json 是否已注册 detail 页面', icon: 'none' })
      uni.redirectTo && uni.redirectTo({ url })
    }
  })
}

function goExplore() {
  if (uni.switchTab) {
    uni.switchTab({ url: '/pages/recipes/index' })
  } else {
    uni.reLaunch && uni.reLaunch({ url: '/pages/recipes/index' })
  }
}

onMounted(loadData)
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