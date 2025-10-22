<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="header">
      <text class="title">美食圈</text>
      <text class="add" @click="onCreate">＋</text>
    </view>

    <!-- 动态列表 -->
    <view class="feed">
      <view class="post" v-for="p in posts" :key="p.id">
        <view class="post-top">
          <image class="avatar" :src="p.avatar" mode="aspectFill" />
          <view class="author">
            <text class="name">{{ p.name }}</text>
            <text class="time">{{ p.time }}</text>
          </view>
          <text class="more">···</text>
        </view>

        <view class="content">{{ p.text }}</view>

        <view v-if="hasImages(p)" class="images" :class="'cols-' + gridCols(p)">
          <image v-for="(img, idx) in (p.images || [])"
                 :key="idx"
                 :src="img"
                 class="img"
                 mode="aspectFill" />
        </view>

        <view class="actions">
          <view class="action" @click="toggleLike(p)">
            <text :class="['heart', p.liked ? 'liked' : '']">❤</text>
            <text class="num">{{ p.likes }}</text>
          </view>
          <view class="action" @click="comment(p)"><text>💬</text><text class="num">{{ p.comments }}</text></view>
          <view class="action" @click="share(p)"><text>🔗</text><text class="num">分享</text></view>
        </view>
      </view>
    </view>

    <view style="height: 24rpx;" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 'p1',
          name: '小雅厨房',
          time: '2 小时前',
          avatar: '/static/logo.png',
          text: '今天尝试做了传说中的网红芝士蛋糕，第一次做就成功了！奶香浓郁、入口即化，太满足了～',
          images: ['/static/logo.png'],
          likes: 128,
          comments: 24
        },
        {
          id: 'p2',
          name: '老八的美食',
          time: '5 小时前',
          avatar: '/static/logo.png',
          text: '周末在家做了一锅香喷喷的红烧肉，肥而不腻、瘦而不柴。秘诀就是要用冰糖炒糖色，火候掌握好！',
          images: ['/static/logo.png','/static/logo.png'],
          likes: 256,
          comments: 18
        },
        {
          id: 'p3',
          name: '美食达人小丽',
          time: '1 天前',
          avatar: '/static/logo.png',
          text: '分享一个超简单的早餐食谱！牛油果吐司配煎蛋，营养丰富又美味，5 分钟就能搞定～',
          images: ['/static/logo.png'],
          likes: 173,
          comments: 31
        }
      ]
    }
  },
  methods: {
    hasImages(p) {
      return !!(p && Array.isArray(p.images) && p.images.length > 0)
    },
    gridCols(p) {
      const len = (p && Array.isArray(p.images)) ? p.images.length : 0
      if (len <= 1) return 1
      if (len === 2) return 2
      return 3
    },
    onCreate() {
      uni.showToast({ title: '发布入口预留', icon: 'none' })
    },
    toggleLike(p) {
      const liked = !!p.liked
      p.liked = !liked
      if (p.liked) {
        p.likes = (p.likes || 0) + 1
      } else {
        p.likes = Math.max((p.likes || 0) - 1, 0)
      }
    },
    comment(p) {
      uni.showToast({ title: '评论入口预留', icon: 'none' })
    },
    share(p) {
      uni.showToast({ title: '已复制分享链接', icon: 'none' })
    }
  }
}
</script>

<style>
.page {
  background: #f7f8fa;
  min-height: 100vh;
}

/* 顶部栏 */
.header {
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1f36;
}
.add {
  font-size: 40rpx;
  color: #ff6a00;
}

/* 列表与卡片 */
.feed {
  padding: 16rpx 24rpx 24rpx;
}
.post {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.post-top {
  display: flex;
  align-items: center;
}
.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}
.author {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 28rpx;
  color: #111827;
  font-weight: 600;
}
.time {
  font-size: 22rpx;
  color: #9ca3af;
}
.more {
  color: #9ca3af;
  font-size: 36rpx;
  padding: 0 8rpx;
}
.content {
  margin-top: 16rpx;
  font-size: 28rpx;
  color: #1f2937;
  line-height: 1.6;
}

/* 图片栅格 */
.images {
  margin-top: 16rpx;
  display: grid;
  grid-gap: 12rpx;
}
.images.cols-1 {
  grid-template-columns: 1fr;
}
.images.cols-2 {
  grid-template-columns: 1fr 1fr;
}
.images.cols-3 {
  grid-template-columns: 1fr 1fr 1fr;
}
.img {
  width: 100%;
  height: 300rpx;
  border-radius: 16rpx;
  background: #eee;
}

/* 操作栏 */
.actions {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 8rpx;
  color: #6b7280;
}
.action {
  display: inline-flex;
  align-items: center;
  font-size: 26rpx;
}
.action .num {
  margin-left: 8rpx;
}
/* 点赞样式 */
.heart {
  font-size: 28rpx;
  color: #9ca3af;
  transition: color 0.2s;
}
.heart.liked {
  color: #ff4d4f;
}

</style>