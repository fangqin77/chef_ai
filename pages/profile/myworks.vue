<template>
  <view class="page">
    <view v-if="!posts.length" class="empty">
      <text class="tip">还没有发布作品</text>
      <button class="btn primary small" @click="goPublish">去发布</button>
    </view>

    <scroll-view v-else scroll-y class="list">
      <view class="card" v-for="p in posts" :key="p.id">
        <view class="top">
          <image class="cover" :src="(p.images && p.images[0]) || fallbackImg" mode="aspectFill" />
          <view class="meta">
            <text class="name">{{ p.name || p.text || '' }}</text>
            <text class="time">{{ p.time || '刚刚' }}</text>
          </view>
          <view class="ops">
            <button class="btn tiny ghost" @click="editPost(p)" v-if="!p._editing">编辑</button>
            <button class="btn tiny danger" @click="deletePost(p)">删除</button>
          </view>
        </view>

        <!-- 非编辑态：展示正文 -->
        <view class="content" v-if="!p._editing">{{ p.text }}</view>

        <!-- 编辑态：就地编辑标题与文案 -->
        <view class="edit-panel" v-else>
          <view class="row">
            <text class="label">标题</text>
            <input class="input" v-model="p._editForm.name" placeholder="请输入标题（选填）" />
          </view>
          <view class="row">
            <text class="label">文案</text>
            <textarea class="textarea" v-model="p._editForm.text" placeholder="编辑你的文案" maxlength="200" />
          </view>
          <view class="edit-ops">
            <button class="btn tiny primary" @click="saveEdit(p)">保存</button>
            <button class="btn tiny ghost" @click="cancelEdit(p)">取消</button>
          </view>
          <text class="hint">文字限制 200 字</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg'
    }
  },
  onShow() {
    this.loadPosts()
  },
  methods: {
    loadPosts() {
      try {
        const local = uni.getStorageSync('social_posts') || []
        const arr = Array.isArray(local) ? local : []
        // 预设编辑态属性，保证响应式
        arr.forEach(p => {
          if (typeof p.id === 'undefined' || p.id === null) {
            // 补一个 id（时间戳），避免后续编辑/删除失败
            p.id = Date.now() + Math.random().toString(36).slice(2,7)
          }
          this.$set(p, '_editing', false)
          this.$set(p, '_editForm', {
            name: p.name || '',
            text: p.text || ''
          })
        })
        this.posts = arr
      } catch(e) {
        this.posts = []
      }
    },
    persist() {
      // 去除内部编辑态字段后保存
      const clean = this.posts.map(p => {
        const { _editing, _editForm, ...rest } = p
        // 以编辑态表单为准（但只有保存时才写入）
        return rest
      })
      uni.setStorageSync('social_posts', clean)
    },
    goPublish() {
      uni.navigateTo({ url: '/pages/social/publish' })
    },
    editPost(p) {
      // 开启编辑态，表单预填
      this.$set(p, '_editing', true)
      this.$set(p, '_editForm', {
        name: p.name || '',
        text: p.text || ''
      })
    },
    cancelEdit(p) {
      this.$set(p, '_editing', false)
      // 取消不修改原数据
    },
    saveEdit(p) {
      const form = p._editForm || {}
      const name = String(form.name || '').trim()
      const text = String(form.text || '').trim()
      if (text.length > 200) {
        uni.showToast({ title: '文案超出 200 字', icon: 'none' })
        return
      }
      // 更新原数据
      this.$set(p, 'name', name)
      this.$set(p, 'text', text)
      // 更新时间戳（可选）
      this.$set(p, 'time', this.formatNow())
      // 退出编辑态并持久化
      this.$set(p, '_editing', false)
      this.persist()
      uni.showToast({ title: '已保存', icon: 'none' })
    },
    deletePost(p) {
      const id = String(p.id)
      uni.showModal({
        title: '删除作品',
        content: '确定要删除该作品吗？删除后不可恢复',
        success: (res) => {
          if (res.confirm) {
            const next = this.posts.filter(item => String(item.id) !== id)
            this.posts = next
            this.persist()
            uni.showToast({ title: '已删除', icon: 'none' })
          }
        }
      })
    },
    formatNow() {
      // 简易时间展示：刚刚
      return '刚刚'
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.list { max-height: calc(100vh - 0rpx); }
.card { margin: 16rpx 24rpx; background: #fff; border-radius: 20rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); padding: 16rpx; }
.top { display: flex; gap: 12rpx; align-items: flex-start; }
.cover { width: 160rpx; height: 120rpx; border-radius: 12rpx; background: #eee; }
.meta { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.name { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.time { font-size: 22rpx; color: #9ca3af; margin-top: 6rpx; }
.ops { display: flex; gap: 8rpx; }
.content { margin-top: 10rpx; font-size: 26rpx; color: #374151; }

/* 编辑态 */
.edit-panel { margin-top: 12rpx; background: #f9fafb; border-radius: 12rpx; padding: 12rpx; }
.row { display: flex; align-items: center; gap: 12rpx; padding: 6rpx 0; }
.label { width: 120rpx; color: #374151; font-size: 26rpx; }
.input { flex: 1; height: 64rpx; background: #fff; border-radius: 12rpx; padding: 0 16rpx; font-size: 26rpx; border: 1px solid #e5e7eb; }
.textarea { min-height: 120rpx; background: #fff; border-radius: 12rpx; padding: 12rpx 16rpx; font-size: 26rpx; border: 1px solid #e5e7eb; }
.edit-ops { margin-top: 8rpx; display: flex; gap: 10rpx; }
.hint { margin-top: 6rpx; font-size: 22rpx; color: #9ca3af; }

/* 按钮样式 */
.btn { border-radius: 12rpx; font-size: 24rpx; }
.btn.primary { background: linear-gradient(90deg,#FFE27A,#FFC107); color: #fff; }
.btn.small { height: 64rpx; line-height: 64rpx; padding: 0 24rpx; }
.btn.tiny { height: 52rpx; line-height: 52rpx; padding: 0 16rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.btn.danger { background: #ef4444; color: #fff; }
.empty { padding: 60rpx 24rpx; display: flex; flex-direction: column; align-items: center; gap: 16rpx; }
.tip { font-size: 26rpx; color: #6b7280; }
</style>