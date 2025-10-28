<template>
  <view class="page">
    <view class="header">
      <text class="title">我的评论</text>
    </view>

    <view v-if="!items.length" class="empty">
      <text class="tip">暂无评论记录</text>
      <button class="btn primary small" @click="goSocial">去美食圈</button>
    </view>

    <scroll-view v-else scroll-y class="list">
      <view class="card" v-for="it in items" :key="it.key">
        <view class="top">
          <image class="avatar" :src="it.avatar || fallbackImg" mode="aspectFill" />
          <view class="meta">
            <text class="name">{{ it.name || '我' }}</text>
            <text class="time">{{ it.time || '刚刚' }}</text>
          </view>
          <view class="ops">
            <button class="btn tiny ghost" @click="open(it)">去查看</button>
          </view>
        </view>
        <view class="content">{{ it.text }}</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg'
    }
  },
  onShow() {
    this.load()
  },
  methods: {
    meName() {
      try {
        const v = uni.getStorageSync('profile_info') || {}
        const name = String(v.name || '').trim()
        return name || '我'
      } catch(e) { return '我' }
    },
    load() {
      const me = this.meName()
      let cm = {}
      try { cm = uni.getStorageSync('social_comments') || {} } catch(e) { cm = {} }
      const list = []
      Object.keys(cm).forEach(pid => {
        const arr = Array.isArray(cm[pid]) ? cm[pid] : []
        arr.forEach((c, idx) => {
          if (String(c.name || '').trim() === me) {
            list.push({
              key: pid + '_' + idx,
              postId: String(pid),
              name: c.name || '我',
              text: c.text || '',
              time: c.time || '刚刚',
              avatar: c.avatar || ''
            })
          }
        })
      })
      // 可按时间简排序（这里保持插入顺序）
      this.items = list
    },
    goSocial() {
      uni.switchTab ? uni.switchTab({ url: '/pages/social/index' }) : uni.navigateTo({ url: '/pages/social/index' })
    },
    open(it) {
      if (!it || !it.postId) return
      uni.navigateTo({ url: '/pages/social/index?postId=' + encodeURIComponent(String(it.postId)) })
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.header { padding: 16rpx 24rpx; }
.title { font-size: 30rpx; color: #374151; font-weight: 700; }
.list { max-height: calc(100vh - 80rpx); }
.card { margin: 16rpx 24rpx; background: #fff; border-radius: 20rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); padding: 16rpx; }
.top { display: flex; gap: 12rpx; align-items: flex-start; }
.avatar { width: 64rpx; height: 64rpx; border-radius: 50%; background: #eee; }
.meta { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.name { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.time { font-size: 22rpx; color: #9ca3af; margin-top: 6rpx; }
.ops { display: flex; gap: 8rpx; }
.content { margin-top: 10rpx; font-size: 26rpx; color: #374151; }
.btn { border-radius: 12rpx; font-size: 24rpx; }
.btn.primary { background: linear-gradient(90deg,#FFE27A,#FFC107); color: #fff; }
.btn.small { height: 64rpx; line-height: 64rpx; padding: 0 24rpx; }
.btn.tiny { height: 52rpx; line-height: 52rpx; padding: 0 16rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.empty { padding: 60rpx 24rpx; display: flex; flex-direction: column; align-items: center; gap: 16rpx; }
.tip { font-size: 26rpx; color: #6b7280; }
</style>