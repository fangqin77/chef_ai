<template>
  <view class="page">
    <view class="header">
      <text class="title">浏览历史</text>
    </view>

    <view v-if="!items.length" class="empty">
      <text class="tip">暂无浏览记录</text>
      <button class="btn primary small" @click="goSocial">去美食圈</button>
    </view>

    <view v-else>
      <scroll-view scroll-y class="list">
        <view class="card" v-for="it in items" :key="it.key">
          <!-- 发帖人信息 -->
          <view class="user-info">
            <image class="avatar" :src="it.avatar || fallbackImg" mode="aspectFill" />
            <view class="user-details">
              <text class="username">{{ it.nickname || '用户' }}</text>
              <text class="time">{{ it.time || '刚刚' }}</text>
            </view>
            <button class="btn tiny danger" @click="remove(it)">删除</button>
          </view>
          
          <!-- 帖子内容 -->
          <view class="content">
            <text class="post-content">{{ it.content || it.title || '作品' }}</text>
          </view>
          
          <!-- 帖子图片 -->
          <view v-if="it.images && it.images.length > 0" class="images">
            <image 
              v-for="(img, idx) in it.images" 
              :key="idx"
              :src="img" 
              class="post-image" 
              mode="aspectFill" 
              @tap="previewImage(it.images, idx)" />
          </view>
        </view>
      </scroll-view>
      
      <!-- 清空浏览历史按钮 - 放在页面底部中央 -->
      <view class="clear-section-bottom">
        <button class="btn clear-btn" @click="clearAllHistory">清空浏览历史</button>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserBrowsingHistory, clearBrowsingHistory } from '@/api/recipes'

export default {
  data() {
    return {
      items: [],
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg'
    }
  },
  
  mounted() {
    this.load()
  },
  
  methods: {
    async load() {
      try {
        // 检查是否有token
        const token = uni.getStorageSync && uni.getStorageSync('token')
        if (!token) {
          // 如果没有token，使用本地数据
          this.loadLocalHistory()
          return
        }

        // 调用后端API
        const response = await getUserBrowsingHistory()
        if (response && response.code === 200 && response.data) {
          // 成功获取后端数据，直接使用后端数据，不合并本地数据
          const backendHistory = await this.formatBackendHistory(response.data)
          this.items = backendHistory
        } else {
          // 后端API失败，使用本地数据
          const localHistory = this.loadLocalHistory()
          this.items = localHistory
        }
      } catch (error) {
        console.error('获取浏览历史失败:', error)
        // 失败时使用本地数据
        const localHistory = this.loadLocalHistory()
        this.items = localHistory
      }
    },
    
    loadLocalHistory() {
      try {
        const arr = (uni.getStorageSync && uni.getStorageSync('social_history')) || []
        const localItems = Array.isArray(arr) ? arr.map(item => ({
          key: item.key || String(item.post_id || Date.now()),
          postId: String(item.post_id || ''),
          cover: item.cover || '',
          title: item.title || '作品',
          time: item.time || '刚刚',
          nickname: '美食达人',
          avatar: this.fallbackImg,
          content: item.title || '作品',
          images: item.cover ? [item.cover] : []
        })) : []
        
        // 只返回本地历史数据，不直接设置到this.items
        return localItems
      } catch (e) {
        return []
      }
    },
    
    async formatBackendHistory(historyData) {
      if (!Array.isArray(historyData)) return []
      
      const formattedHistory = []
      
      for (const item of historyData) {
        try {
          // 获取帖子详情
          const postDetail = await this.getPostDetail(item.post_id || item.id)
          
          formattedHistory.push({
            key: String(item.id || item.post_id || Date.now()),
            postId: String(item.post_id || item.id || ''),
            cover: item.cover || item.image || '',
            title: item.title || item.name || '作品',
            time: this.formatTime(item.createTime || item.timestamp || item.time || item.browse_time),
            // 优先使用接口返回的用户信息，避免被 postDetail 覆盖
            nickname: item.user_nickname || postDetail.user_nickname || '用户',
            // 跳过 fixImageUrl 直接使用原始 URL，避免无效值问题
            avatar: item.user_avatar_url || postDetail.user_avatar_url || this.fallbackImg,
            content: postDetail.content || item.title || '作品',
            images: this.getImagesFromPostDetail(postDetail)
          })
        } catch (error) {
          console.error('获取帖子详情失败:', error)
          // 如果获取详情失败，直接使用接口返回的用户信息
          formattedHistory.push({
            key: String(item.id || item.post_id || Date.now()),
            postId: String(item.post_id || item.id || ''),
            cover: item.cover || item.image || '',
            title: item.title || item.name || '作品',
            time: this.formatTime(item.createTime || item.timestamp || item.time || item.browse_time),
            nickname: item.user_nickname || '用户',
            avatar: item.user_avatar_url || this.fallbackImg,
            content: item.title || '作品',
            images: item.cover ? [item.cover] : []
          })
        }
      }
      
      return formattedHistory
    },
    
    // 获取帖子详情
    async getPostDetail(postId) {
      if (!postId) return {}
      
      try {
        const response = await this.$api.getPostDetail(postId)
        if (response && response.code === 200 && response.data) {
          return response.data
        }
      } catch (error) {
        console.error('获取帖子详情失败:', error)
      }
      
      // 如果API调用失败，尝试从社区帖子中获取
      try {
        const response = await this.$api.getCommunityPosts(1, 100, null, null)
        if (response && response.code === 200 && response.data && response.data.list) {
          const post = response.data.list.find(p => p.id == postId)
          if (post) return post
        }
      } catch (error) {
        console.error('从社区帖子中获取详情失败:', error)
      }
      
      return {}
    },
    
    // 从帖子详情中提取图片
    getImagesFromPostDetail(postDetail) {
      if (!postDetail) return []
      
      // 尝试从不同字段获取图片
      if (postDetail.mediaJson) {
        try {
          const media = JSON.parse(postDetail.mediaJson)
          if (Array.isArray(media) && media.length > 0) {
            return media.map(m => m.url || m)
          }
        } catch (error) {
          console.error('解析mediaJson失败:', error)
        }
      }
      
      if (postDetail.images && Array.isArray(postDetail.images)) {
        return postDetail.images
      }
      
      if (postDetail.cover) {
        return [postDetail.cover]
      }
      
      return []
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '刚刚'
      
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now.getTime() - time.getTime()
      
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
      if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
      
      return time.toLocaleDateString()
    },
    
    save(list) {
      uni.setStorageSync && uni.setStorageSync('social_history', list)
    },
    
    goSocial() {
      if (uni.switchTab) {
        uni.switchTab({ url: '/pages/social/index' })
      } else {
        uni.navigateTo && uni.navigateTo({ url: '/pages/social/index' })
      }
    },
    
    async open(it) {
      if (!it || !it.postId) return
      
      try {
        // 调用新的API接口获取帖子详情
        const response = await this.$api.getPostByCommentId(it.postId)
        
        if (response && response.code === 200 && response.data) {
          // 如果获取到帖子详情，跳转到美食圈页面并传递帖子ID
          uni.navigateTo({ 
            url: '/pages/social/index?postId=' + encodeURIComponent(String(it.postId))
          })
        } else {
          // 如果API调用失败，显示提示信息
          uni.showToast({ 
            title: '获取帖子详情失败', 
            icon: 'none' 
          })
        }
      } catch (error) {
        console.error('获取帖子详情失败:', error)
        // 异常情况下直接跳转
        uni.navigateTo({ 
          url: '/pages/social/index?postId=' + encodeURIComponent(String(it.postId))
        })
      }
    },
    
    remove(it) {
      const key = it && it.key
      const next = this.items.filter(x => x.key !== key)
      this.items = next
      this.save(next)
      uni.showToast && uni.showToast({ title: '已删除', icon: 'none' })
    },
    
    // 图片预览
    previewImage(images, currentIndex) {
      if (!images || images.length === 0) return
      
      uni.previewImage({
        urls: images,
        current: images[currentIndex]
      })
    },
    
    // 清空所有浏览历史
    async clearAllHistory() {
      uni.showModal({
        title: '确认清空',
        content: '确定要清空所有浏览历史吗？此操作不可撤销',
        success: async (res) => {
          if (res.confirm) {
            try {
              // 检查是否有token
              const token = uni.getStorageSync && uni.getStorageSync('token')
              if (token) {
                // 调用后端API清空历史记录
                await clearBrowsingHistory()
                console.log('后端浏览历史已清空')
              }
              
              // 清空本地历史记录
              this.items = []
              this.save([])
              
              uni.showToast && uni.showToast({ title: '浏览历史已清空', icon: 'none' })
            } catch (error) {
              console.error('清空浏览历史失败:', error)
              
              // 如果后端API失败，仍然清空本地数据
              this.items = []
              this.save([])
              
              uni.showToast && uni.showToast({ title: '本地历史已清空', icon: 'none' })
            }
          }
        }
      })
    },
    
    // 修复图片URL
    fixImageUrl(img) {
      if (!img) return '';
      
      // 将HTTP转换为HTTPS，避免小程序不支持HTTP的问题
      if (img.startsWith('http://')) {
        return img.replace('http://', 'https://');
      }
      
      // 检查是否是有效的HTTPS URL
      if (img.startsWith('https://')) {
        return img;
      }
      
      // 处理微信小程序临时文件路径
      if (img.startsWith('http://tmp/')) {
        return img.replace('http://tmp/', 'wxfile://tmp/');
      }
      
      // 处理开发服务器临时文件路径
      if (img.startsWith('http://127.0.0.1')) {
        return '/static/picture/profile.png';
      }
      
      // 处理wxfile协议路径
      if (img.startsWith('wxfile://')) {
        return img;
      }
      
      // 处理data URI图片
      if (img.startsWith('data:image/')) {
        return img;
      }
      
      // 处理相对路径
      if (img.startsWith('/')) {
        return img;
      }
      
      return img;
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.header { padding: 16rpx 24rpx; }
.title { font-size: 30rpx; color: #374151; font-weight: 700; }
.list { max-height: calc(100vh - 80rpx); }

/* 卡片样式 */
.card { 
  margin: 16rpx 24rpx; 
  background: #fff; 
  border-radius: 20rpx; 
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); 
  padding: 24rpx;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #f3f4f6;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.time {
  font-size: 22rpx;
  color: #9ca3af;
}

/* 帖子内容 */
.content {
  margin-bottom: 20rpx;
}

.post-content {
  font-size: 26rpx;
  color: #374151;
  line-height: 1.6;
}

/* 图片样式 */
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.post-image {
  width: 220rpx;
  height: 220rpx;
  border-radius: 12rpx;
  background: #f3f4f6;
}

/* 按钮样式 */
.btn { 
  border-radius: 12rpx; 
  font-size: 24rpx; 
}
.btn.primary { 
  background: linear-gradient(90deg,#FFE27A,#FFC107); 
  color: #fff; 
}
.btn.small { 
  height: 64rpx; 
  line-height: 64rpx; 
  padding: 0 24rpx; 
}
.btn.tiny { 
  height: 52rpx; 
  line-height: 52rpx; 
  padding: 0 16rpx; 
}
.btn.danger { 
  background: #ef4444; 
  color: #fff; 
}

/* 空状态 */
.empty { 
  padding: 60rpx 24rpx; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 16rpx; 
}
.tip { 
  font-size: 26rpx; 
  color: #6b7280; 
}

/* 清空历史按钮 */
.clear-section-bottom {
  padding: 20rpx 24rpx;
  display: flex;
  justify-content: center;
}

.clear-btn {
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 12rpx;
  font-size: 24rpx;
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 32rpx;
}
</style>