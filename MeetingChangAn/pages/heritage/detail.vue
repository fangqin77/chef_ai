<template>
  <view class="detail-page">

    <!-- 顶部媒体模块：优先视频，无视频则显示图片 -->
    <view class="media-wrap">
      <video
        v-if="media.type === 'video'"
        class="media"
        :src="media.src"
        controls
        :poster="poster"
        enable-progress-gesture
        show-progress
        show-fullscreen-btn
      />
      <image
        v-else
        class="media"
        :src="media.src"
        mode="aspectFill"
        :lazy-load="true"
      />
    </view>

    <!-- 绿色名称条 -->
    <view class="name-bar">
      <text class="heritage-name">{{ detail.name }}</text>
    </view>

    <!-- 历史渊源 -->
    <view class="section history">
      <view class="section-title">历史渊源</view>
      <view class="section-body">
        <text class="section-text">{{ detail.history || '暂无介绍' }}</text>
      </view>
    </view>

    <!-- 内容介绍 -->
    <view class="section content">
      <view class="section-title">内容介绍</view>
      <view class="section-body">
        <text class="section-text">{{ detail.desc || '暂无介绍' }}</text>
      </view>
    </view>


  </view>
</template>

<script>
const { getAllHeritages, searchHeritages, getHeritageById } = require('../../api/heritage.js')

export default {
  name: 'HeritageDetail',
  data() {
    return {
      id: '',
      detail: {
        id: '',
        name: '',
        desc: '',
        cover: '/static/assets/retouch_2025112414394823.png',
        history: '',
        videoUrl: ''
      },
      poster: '/static/assets/retouch_2025112414394823.png'
    }
  },
  computed: {
    media() {
      // 选择媒体：有视频用视频，否则用封面图
      const video = this.detail.videoUrl
      const cover = this.detail.cover || this.poster
      if (this.isValidVideoUrl(video)) {
        return { type: 'video', src: video }
      }
      return { type: 'image', src: cover }
    }
  },
  onLoad(query) {
    this.id = query?.id || ''
    if (!this.id) {
      // 必须从“陕非遗”列表卡片进入，未携带 id 时强制返回列表页
      uni.showToast({ title: '请从列表卡片进入详情', icon: 'none', duration: 1500 })
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/heritage/index' })
      }, 300)
      return
    }
    this.bootstrap()
  },
  methods: {
    async bootstrap() {
      try {
        let found = null

        // 1) 优先按 id 直接查询
        if (this.id) {
          try {
            const r1 = await getHeritageById(this.id)
            const d1 = r1?.data || r1
            if (d1 && (d1.id || d1.heritageName)) {
              found = d1
            }
          } catch (_) {}
        }

        // 2) 回退：拉取全部再匹配 id
        if (!found) {
          const resp = await getAllHeritages()
          const list = resp?.data || resp || []
          found = list.find(h => String(h.id) === String(this.id)) || null


        }

        // 最终映射
        const item = found || {}
        this.detail = {
          id: item.id || this.id,
          name: item.heritageName || item.name || item.title || '非遗项目',
          desc: item.contentIntroduction || item.description || item.desc || '',
          cover: this.pickCover(item),
          history: item.historicalOrigin || '',
          videoUrl: item.videoUrl || item.video || item.videoURL || item.mediaUrl || ''
        }
        this.poster = this.detail.cover
      } catch (e) {
        console.warn('加载详情失败:', e)
      }
    },
    pickCover(item) {
      const def = this.detail.cover
      const url = item.imageUrl || item.coverImage || item.cover || item.image || def
      return this.getValidImageUrl(url)
    },
    // 与列表页保持一致的图片合法性判断
    getValidImageUrl(url) {
      if (!url || typeof url !== 'string') return this.poster
      const raw = url.trim()
      const pagePatterns = ['baidu.com/item', 'baike.baidu.com', 'view.php', '.html', '.shtml', '.php', 'smart-museum.cn']
      if (pagePatterns.some(p => raw.includes(p))) return this.poster
      if (raw.startsWith('http://')) return this.poster
      // 尝试校验扩展名
      let pathname = raw
      try { const u = new URL(raw); pathname = u.pathname || raw } catch (e) {}
      const lower = pathname.toLowerCase()
      const exts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']
      return exts.some(ext => lower.endsWith(ext)) ? raw : this.poster
    },

    isValidVideoUrl(url) {
      if (!url || typeof url !== 'string') return false
      const raw = url.trim()
      if (!raw.startsWith('https://')) return false
      let pathname = raw
      try { const u = new URL(raw); pathname = u.pathname || raw } catch (e) {}
      const lower = pathname.toLowerCase()
      const allowedExts = ['.mp4', '.m3u8', '.mov', '.m4v', '.webm']
      const hasExt = allowedExts.some(ext => lower.endsWith(ext))
      if (!hasExt) return false
      const blockedDomains = ['youtube.com', 'youtu.be']
      if (blockedDomains.some(d => raw.includes(d))) return false
      return true
    },
    
    goDock(url) {
      if (!url) return
      try {
        const pages = getCurrentPages()
        const cur = pages[pages.length - 1]
        if (cur && ('/' + cur.route) === url) return
      } catch (e) {}
      if (url === '/pages/index/index') {
        uni.reLaunch({ url })
      } else {
        uni.navigateTo({ url })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* 继承整体米白背景+柔和阴影与圆角，控制蓝/绿为低饱和度以不跳脱 */
$bg-page: #fffef7;
$text-brown: #5a2c12; /* 与其他页一致的文字主色 */
$blue-soft: #fff5dc;  /* 暖黄色，与项目主色调一致 */
$green-soft: #7A4E2D; /* 品牌棕色，统一视觉 */
$card-shadow: 0 10rpx 24rpx rgba(0,0,0,0.10);

.detail-page {
  min-height: 100vh;
  background: $bg-page;
  color: $text-brown;
  padding-bottom: 0;
}



/* 顶部媒体模块（蓝色背景容器） */
.media-wrap {
  margin: 16rpx 16rpx 10rpx;
  padding: 16rpx;
  background: $blue-soft;
  border-radius: 24rpx;
  box-shadow: $card-shadow;
}
.media {
  width: 100%;
  height: 42vh; /* 下调视频高度，页面更紧凑 */
  border-radius: 16rpx;
  object-fit: cover;
  display: block;
  background: #0003;
}

/* 绿色名称条 */
.name-bar {
  margin: 12rpx 16rpx 16rpx;
  padding: 24rpx 22rpx;
  background: $green-soft;
  color: #fff;
  text-align: center; /* 名称文字居中 */
  border-radius: 20rpx;
  box-shadow: $card-shadow;
}
.heritage-name {
  font-size: 32rpx;
  font-weight: 700;
}

/* 内容卡片（延续白底圆角+柔和阴影） */
.section {
  margin: 12rpx 16rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: $card-shadow;
  overflow: hidden;
}
.section-title {
  padding: 20rpx 22rpx 8rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: $text-brown;
}
.section-body {
  padding: 0 22rpx 22rpx;
}
.section-text {
  display: block; /* 设为块级，确保首行缩进生效 */
  font-size: 28rpx;
  line-height: 1.7;
  color: #6b4a2e;
  text-indent: 2em; /* 首行缩进 */
}


</style>