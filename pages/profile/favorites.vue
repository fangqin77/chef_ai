<template>
  <view class="fav-page">
    <view class="header">
      <text class="title">我的收藏</text>
    </view>

    <view class="list" v-if="ids.length">
      <view class="item" v-for="id in ids" :key="id" @click="open(id)">
        <image class="cover" :src="(map[id] && map[id].cover) || fallback" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ (map[id] && map[id].name) || '作品' }}</text>
          <text class="desc ellipsis">{{ (map[id] && map[id].text) || '' }}</text>
        </view>
        <button class="del" @click.stop="remove(id)">删除</button>
        <text class="arrow">›</text>
      </view>
    </view>

    <view class="empty" v-else>
      <text class="tip">暂时没有收藏，去美食圈逛逛吧～</text>
      <button class="btn" @click="goSocial">去美食圈</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      map: {},
      ids: [],
      fallback: '/static/yuan_97e57f821c79b841651df5b413309328.jpg'
    }
  },
  onShow() {
    const fav = uni.getStorageSync('my_fav_posts') || {}
    this.map = fav
    this.ids = Object.keys(fav)
  },
  methods: {
    remove(id) {
      try {
        let fav = uni.getStorageSync('my_fav_posts') || {}
        if (fav[id]) delete fav[id]
        uni.setStorageSync('my_fav_posts', fav)
        this.map = fav
        this.ids = Object.keys(fav)
        uni.showToast({ title: '已删除收藏', icon: 'none' })
      } catch(e) {
        uni.showToast({ title: '删除失败', icon: 'none' })
      }
    },
    open(id) {
      // 打开美食圈并滚动到对应项（简单跳转到美食圈即可）
      uni.switchTab ? uni.switchTab({ url: '/pages/social/index' }) : uni.navigateTo({ url: '/pages/social/index' })
    },
    goSocial() {
      uni.switchTab ? uni.switchTab({ url: '/pages/social/index' }) : uni.navigateTo({ url: '/pages/social/index' })
    }
  }
}
</script>

<style>
.fav-page { background: #f7f2e7; min-height: 100vh; }
.header { height: 88rpx; display: flex; align-items: center; padding: 0 24rpx; background: #fff; }
.title { font-size: 32rpx; font-weight: 700; color: #111827; }
.list { padding: 16rpx 24rpx 24rpx; }
.item {
  display: flex; align-items: center; gap: 12rpx;
  background: #fff; border-radius: 20rpx; padding: 12rpx; margin-bottom: 12rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.cover { width: 120rpx; height: 90rpx; border-radius: 12rpx; background: #eee; }
.info { flex: 1; display: flex; flex-direction: column; }
.name { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.desc { margin-top: 6rpx; font-size: 24rpx; color: #6b7280; }
.ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.arrow { font-size: 36rpx; color: #c7cdd3; }
.empty { padding: 60rpx 24rpx; display: flex; flex-direction: column; gap: 16rpx; align-items: center; }
.tip { font-size: 26rpx; color: #6b7280; }
.btn { height: 72rpx; line-height: 72rpx; padding: 0 22rpx; border-radius: 14rpx; background: #f3f4f6; color: #374151; }
</style>