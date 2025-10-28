<template>
  <view class="page">
    <view class="header">
      <text class="title">浏览历史</text>
    </view>

    <view v-if="!items.length" class="empty">
      <text class="tip">暂无浏览记录</text>
      <button class="btn primary small" @click="goSocial">去美食圈</button>
    </view>

    <scroll-view v-else scroll-y class="list">
      <view class="card" v-for="it in items" :key="it.key">
        <view class="top">
          <image class="cover" :src="it.cover || fallbackImg" mode="aspectFill" />
          <view class="meta">
            <text class="name">{{ it.title || '作品' }}</text>
            <text class="time">{{ it.time || '刚刚' }}</text>
          </view>
          <view class="ops">
            <button class="btn tiny ghost" @click="open(it)">查看</button>
            <button class="btn tiny danger" @click="remove(it)">删除</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
declare const uni: any

type HistoryItem = {
  key: string
  postId?: string | number
  cover?: string
  title?: string
  time?: string
}

const items = ref<HistoryItem[]>([])
const fallbackImg = '/static/yuan_97e57f821c79b841651df5b413309328.jpg'

function load() {
  try {
    const arr = (uni.getStorageSync && uni.getStorageSync('social_history')) || []
    items.value = Array.isArray(arr) ? (arr as HistoryItem[]) : []
  } catch (e) {
    items.value = []
  }
}

function save(list: HistoryItem[]) {
  uni.setStorageSync && uni.setStorageSync('social_history', list)
}

function goSocial() {
  if (uni.switchTab) {
    uni.switchTab({ url: '/pages/social/index' })
  } else {
    uni.navigateTo && uni.navigateTo({ url: '/pages/social/index' })
  }
}

function open(it: HistoryItem | undefined) {
  if (!it || !it.postId) return
  uni.navigateTo && uni.navigateTo({ url: '/pages/social/index?postId=' + encodeURIComponent(String(it.postId)) })
}

function remove(it: HistoryItem | undefined) {
  const key = it && it.key
  const next = items.value.filter(x => x.key !== key)
  items.value = next
  save(next)
  uni.showToast && uni.showToast({ title: '已删除', icon: 'none' })
}

onMounted(load)
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.header { padding: 16rpx 24rpx; }
.title { font-size: 30rpx; color: #374151; font-weight: 700; }
.list { max-height: calc(100vh - 80rpx); }
.card { margin: 16rpx 24rpx; background: #fff; border-radius: 20rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); padding: 16rpx; }
.top { display: flex; gap: 12rpx; align-items: flex-start; }
.cover { width: 160rpx; height: 120rpx; border-radius: 12rpx; background: #eee; }
.meta { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.name { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.time { font-size: 22rpx; color: #9ca3af; margin-top: 6rpx; }
.ops { display: flex; gap: 8rpx; }
.btn { border-radius: 12rpx; font-size: 24rpx; }
.btn.primary { background: linear-gradient(90deg,#FFE27A,#FFC107); color: #fff; }
.btn.small { height: 64rpx; line-height: 64rpx; padding: 0 24rpx; }
.btn.tiny { height: 52rpx; line-height: 52rpx; padding: 0 16rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.btn.danger { background: #ef4444; color: #fff; }
.empty { padding: 60rpx 24rpx; display: flex; flex-direction: column; align-items: center; gap: 16rpx; }
.tip { font-size: 26rpx; color: #6b7280; }
</style>