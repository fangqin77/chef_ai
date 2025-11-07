<template>
  <view class="page">
    <!-- 仅显示通知列表，不包含资料编辑 -->
    <view class="group">
      <view class="group-title">我的信息</view>
      <view v-if="!notices.length" class="empty">
        <text class="tip">暂无新消息</text>
      </view>
      <scroll-view v-else scroll-y class="list">
        <view class="notice" v-for="(n,i) in notices" :key="i">
          <image class="avatar" :src="n.avatar || fallbackImg" mode="aspectFill" />
          <view class="meta">
            <text class="title">{{ n.title }}</text>
            <text class="brief">{{ n.brief }}</text>
            <text class="time">{{ n.time || '刚刚' }}</text>
          </view>
          <button class="btn tiny" @click="goPost(n.postId)">去查看</button>
        </view>
      </scroll-view>
      <view class="ops" v-if="notices.length">
        <button class="btn clear" @click="clearNotices">清空通知</button>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserNotifications } from '@/api/recipes';

export default {
  data() {
    return {
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      notices: [],
      loading: false
    }
  },
  onShow() {
    this.loadNotifications()
  },
  methods: {
    async loadNotifications() {
      this.loading = true
      try {
        // 检查是否有token
        const token = uni.getStorageSync('token')
        if (!token) {
          // 如果没有token，使用本地数据
          this.notices = this.buildLocalNotices()
          return
        }

        // 调用后端API
        const response = await getUserNotifications()
        if (response && response.code === 200 && response.data) {
          // 成功获取后端数据
          const backendNotices = this.formatBackendNotifications(response.data)
          // 合并本地通知
          const localNotices = this.buildLocalNotices()
          const allNotices = [...backendNotices, ...localNotices]
          
          // 去重
          const seen = new Set(), uniq = []
          allNotices.forEach(n => {
            const k = [n.postId, n.title, n.brief].join('|')
            if (!seen.has(k)) { seen.add(k); uniq.push(n) }
          })
          this.notices = uniq
        } else {
          // 后端API失败，使用本地数据
          this.notices = this.buildLocalNotices()
        }
      } catch (error) {
        console.error('获取通知失败:', error)
        // 失败时使用本地数据
        this.notices = this.buildLocalNotices()
      } finally {
        this.loading = false
      }
    },

    formatBackendNotifications(notifications) {
      if (!Array.isArray(notifications)) return []
      
      return notifications.map(notif => ({
        type: notif.type || 'notification',
        postId: notif.postId || notif.relatedId || '',
        title: notif.title || '新通知',
        brief: notif.content || notif.message || '',
        time: this.formatTime(notif.createTime || notif.timestamp),
        avatar: notif.avatar || notif.senderAvatar || ''
      }))
    },

    formatTime(timestamp) {
      if (!timestamp) return '刚刚'
      
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now - time
      
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
      if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
      
      return time.toLocaleDateString()
    },

    buildLocalNotices() {
      // 从本地资料读取昵称（如果之前保存过），否则默认"我"
      let me = '我'
      try {
        const v = uni.getStorageSync('profile_info') || {}
        if (v && v.name) me = String(v.name).trim() || '我'
      } catch(e) {}

      const cm = this.commentsMap()
      const localPosts = this.basePosts()
      const list = []

      // 1) 评论我的作品
      localPosts.forEach(p => {
        const pid = String(p.id)
        const comments = Array.isArray(cm[pid]) ? cm[pid] : []
        comments.forEach(c => {
          if ((c.name || '').trim() !== me) {
            list.push({
              type: 'comment_on_my_post',
              postId: pid,
              title: `${c.name || '有人'} 评论了你的作品`,
              brief: c.text || '',
              time: c.time || '刚刚',
              avatar: c.avatar || ''
            })
          }
        })
      })

      // 2) 回复我的评论：@我 或 @昵称
      const atMe1 = '@我'
      const atMe2 = '@' + me
      Object.keys(cm).forEach(pid => {
        const comments = Array.isArray(cm[pid]) ? cm[pid] : []
        comments.forEach(c => {
          const txt = String(c.text || '')
          if (txt.includes(atMe1) || txt.includes(atMe2)) {
            list.push({
              type: 'reply_to_me',
              postId: pid,
              title: `${c.name || '有人'} 回复了你`,
              brief: c.text || '',
              time: c.time || '刚刚',
              avatar: c.avatar || ''
            })
          }
        })
      })

      // 合并已保存通知（若有）
      let saved = []
      try { saved = uni.getStorageSync('profile_notifications') || [] } catch(e) { saved = [] }
      const all = [...saved, ...list]

      // 去重
      const seen = new Set(), uniq = []
      all.forEach(n => {
        const k = [n.postId, n.title, n.brief].join('|')
        if (!seen.has(k)) { seen.add(k); uniq.push(n) }
      })
      
      return uniq
    },

    basePosts() {
      let local = []
      try { local = uni.getStorageSync('social_posts') || [] } catch(e) {}
      return Array.isArray(local) ? local : []
    },
    commentsMap() {
      try { return uni.getStorageSync('social_comments') || {} } catch(e) { return {} }
    },
    clearNotices() {
      uni.removeStorageSync('profile_notifications')
      this.notices = []
      uni.showToast({ title: '已清空', icon: 'none' })
    },
    goPost(postId) {
      if (!postId) return
      uni.navigateTo({ url: '/pages/social/index?postId=' + encodeURIComponent(postId) })
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; padding: 24rpx; }

/* 通知列表 */
.group { margin-top: 16rpx; }
.group-title { margin: 12rpx 4rpx; font-size: 26rpx; color: #6b7280; }
.list { max-height: calc(100vh - 160rpx); }
.notice {
  margin: 12rpx 0;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 20rpx rgba(0,0,0,0.06);
  padding: 16rpx;
  display: flex; gap: 12rpx; align-items: center;
}
.notice .avatar { width: 64rpx; height: 64rpx; border-radius: 50%; background: #eee; }
.notice .meta { flex: 1; display: flex; flex-direction: column; gap: 6rpx; }
.notice .title { font-size: 28rpx; color: #111827; font-weight: 700; }
.notice .brief { font-size: 24rpx; color: #374151; }
.notice .time { font-size: 22rpx; color: #9ca3af; }
.btn.tiny { height: 52rpx; line-height: 52rpx; font-size: 24rpx; padding: 0 16rpx; background: #f3f4f6; color: #374151; border-radius: 12rpx; }
.ops { margin-top: 12rpx; display: flex; justify-content: flex-end; }
.btn.clear { height: 60rpx; line-height: 60rpx; font-size: 24rpx; padding: 0 20rpx; background: #f3f4f6; color: #374151; border-radius: 12rpx; }
.empty { background: #fff; border-radius: 16rpx; padding: 24rpx; text-align: center; color: #9ca3af; }
.tip { font-size: 26rpx; }
</style>