<template>
  <view class="page">
    <view v-if="!posts.length" class="empty">
      <text class="tip">还没有发布作品</text>
      <button class="btn primary small" @click="goPublish">去发布</button>
    </view>

    <scroll-view v-else scroll-y class="list" @refresherrefresh="onRefresh" refresher-enabled="true" refresher-background="#f7f2e7" @scrolltolower="loadMore">
      <view class="card" v-for="p in posts" :key="p.id">
        <!-- 非编辑态：显示图片和基本信息 -->
        <view v-if="!p._editing" class="post-item">
          <view class="post-header">
            <!-- 左侧图片展示 -->
            <view class="post-image-section">
              <image class="post-image" :src="getFirstImage(p) || fallbackImg" mode="aspectFill" />
              <!-- 图片数量指示器 -->
              <view v-if="getImageCount(p) > 1" class="image-count-badge">
                <text class="count-text">{{ getImageCount(p) }}图</text>
              </view>
            </view>
            
            <!-- 右侧信息区域 -->
            <view class="post-content-section">
              <!-- 内容标题 -->
              <text class="post-content">{{ p.content || p.text || '美食作品' }}</text>
              
              <!-- 时间信息 -->
              <text class="post-time">{{ formatPostTime(p) }}</text>
            </view>
            
            <!-- 操作按钮 -->
            <view class="post-actions">
              <button class="btn tiny ghost" @click="editPost(p)">编辑</button>
              <button class="btn tiny danger" @click="deletePost(p)">删除</button>
            </view>
          </view>
        </view>

        <!-- 编辑态：编辑文案和图片 -->
        <view v-else class="edit-panel">
          <view class="edit-image-section">
            <text class="label">图片</text>
            <view class="images-preview">
              <!-- 图片预览区域 -->
              <view class="image-list">
                <view v-for="(img, index) in (p._editForm.images || p.images || [])" :key="index" class="image-item">
                  <image class="preview-image" :src="img || fallbackImg" mode="aspectFill" />
                  <view class="remove-btn" @click="removeImage(p, index)">
                    <text class="remove-icon">×</text>
                  </view>
                </view>
                <!-- 添加图片按钮 -->
                <view v-if="(p._editForm.images || p.images || []).length < 9" class="add-image-btn" @click="changeImage(p)">
                  <text class="add-icon">+</text>
                  <text class="add-text">添加图片</text>
                </view>
              </view>
              <text class="image-count">已选择 {{ (p._editForm.images || p.images || []).length }}/9 张图片</text>
            </view>
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
import { getCommunityPosts, updateCommunityPost, deleteCommunityPost, getUserPublishedPosts, uploadImages } from '@/api/recipes';

export default {
  data() {
    return {
      posts: [],
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      currentPage: 1,
      pageSize: 20,
      hasMore: true,
      loading: false
    }
  },
  onShow() {
    this.loadPosts()
  },
  methods: {
    async loadPosts(refresh = false) {
      if (this.loading) return;
      
      try {
        this.loading = true;
        
        // 检查用户是否登录
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          this.posts = [];
          return;
        }
        
        // 如果是刷新，重置页码
        if (refresh) {
          this.currentPage = 1;
          this.hasMore = true;
        }
        
        // 如果没有更多数据，直接返回
        if (!this.hasMore && !refresh) {
          return;
        }
        
        // 从后端API获取当前用户发布的帖子，优先使用 getUserPublishedPosts 接口
        let response;
        try {
          response = await getUserPublishedPosts(this.currentPage, this.pageSize);
          console.log('获取我的作品响应 (新接口):', response);
        } catch (error) {
          console.log('新接口调用失败，尝试使用旧接口:', error);
          // 如果新接口失败，回退到旧接口
          response = await getCommunityPosts(this.currentPage, this.pageSize, null, 'current');
          console.log('获取我的作品响应 (旧接口):', response);
        }
        
        if (response && (response.list || response.data)) {
          // 处理返回的数据，兼容不同接口的数据结构
          const postList = response.list || response.data || [];
          
          const posts = postList.map(post => {
            // 处理图片数据，优先使用 media_json 字段
            let images = [];
            if (post.media_json) {
              try {
                images = JSON.parse(post.media_json);
              } catch (e) {
                console.error('解析 media_json 失败:', e);
                images = post.images || post.mediaList || [];
              }
            } else {
              images = post.images || post.mediaList || [];
            }
            
            // 处理字段映射，兼容不同接口的字段名
            const processedPost = {
              id: post.id || post.postId,
              name: post.name || post.title || '',
              text: post.text || post.content || '',
              content: post.content || post.text || '',
              images: images,
              media_json: post.media_json, // 保留原始字段
              time: post.createTime || post.createdAt || post.time || '刚刚',
              visibility: post.visibility || 1,
              _editing: false,
              _editForm: {
                name: post.name || post.title || '',
                text: post.content || post.text || ''
              }
            };
            
            // 确保有ID
            if (typeof processedPost.id === 'undefined' || processedPost.id === null) {
              processedPost.id = Date.now() + Math.random().toString(36).slice(2,7);
            }
            
            return processedPost;
          });
          
          // 判断是否还有更多数据
          this.hasMore = postList.length === this.pageSize;
          
          if (refresh) {
            // 刷新时替换所有数据
            this.posts = posts;
          } else {
            // 加载更多时追加数据
            this.posts = [...this.posts, ...posts];
          }
          
          // 增加页码
          if (!refresh && this.hasMore) {
            this.currentPage++;
          }
          
          console.log(`获取到 ${posts.length} 条我的作品，当前共 ${this.posts.length} 条`);
        } else {
          console.error('接口返回数据格式错误:', response);
          if (refresh) {
            this.posts = [];
          }
        }
      } catch (error) {
        console.error('获取我的作品失败:', error);
        uni.showToast({ title: '获取作品失败', icon: 'none' });
        if (refresh) {
          this.posts = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    // 下拉刷新
    onRefresh() {
      this.loadPosts(true);
    },
    
    // 加载更多
    loadMore() {
      if (!this.loading && this.hasMore) {
        this.loadPosts(false);
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
        text: p.text || '',
        images: p.images || []
      })
    },
    
    // 更换图片（支持多张）
    async changeImage(p) {
      uni.chooseImage({
        count: 9, // 最多选择9张图片
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: async (res) => {
          const tempFilePaths = res.tempFilePaths
          if (tempFilePaths && tempFilePaths.length > 0) {
            try {
              uni.showLoading({ title: '上传图片中...' })
              
              // 调用上传接口上传图片
              const uploadedUrls = await uploadImages(tempFilePaths)
              
              if (uploadedUrls && uploadedUrls.length > 0) {
                // 更新编辑表单中的图片URL
                this.$set(p._editForm, 'images', uploadedUrls)
                console.log('图片上传成功，URL数量:', uploadedUrls.length)
                uni.showToast({ title: `已上传${uploadedUrls.length}张图片`, icon: 'none' })
              } else {
                uni.showToast({ title: '图片上传失败，请重试', icon: 'none' })
              }
            } catch (uploadError) {
              console.error('图片上传失败:', uploadError)
              uni.showToast({ title: '图片上传失败，请重试', icon: 'none' })
            } finally {
              uni.hideLoading()
            }
          }
        },
        fail: (err) => {
          console.error('选择图片失败:', err)
          uni.showToast({ title: '选择图片失败', icon: 'none' })
        }
      })
    },

    // 删除单张图片
    removeImage(p, index) {
      const images = [...(p._editForm.images || [])]
      images.splice(index, 1)
      this.$set(p._editForm, 'images', images)
    },
    cancelEdit(p) {
      this.$set(p, '_editing', false)
      // 取消不修改原数据
    },
    async saveEdit(p) {
      const form = p._editForm || {}
      const name = String(form.name || '').trim()
      const text = String(form.text || '').trim()
      const images = form.images || p.images || []
      
      if (text.length > 200) {
        uni.showToast({ title: '文案超出 200 字', icon: 'none' })
        return
      }
      
      try {
        // 如果有新图片需要上传
        let finalImages = images
        
        // 检查是否有临时图片（需要上传）
        const hasTempImage = images.some(img => img && img.includes('http://tmp/'))
        
        if (hasTempImage) {
          uni.showLoading({ title: '上传图片中...' })
          
          // 这里需要实现图片上传逻辑
          // 暂时先使用本地图片路径，实际项目中需要调用上传接口
          console.log('检测到临时图片，需要上传:', images)
          
          // 临时处理：如果是临时图片，先保持原样，实际项目中需要替换为上传后的URL
          finalImages = images
        }
        
        // 调用后端API更新帖子
        const response = await updateCommunityPost(p.id, text, finalImages, p.visibility || 1);
        
        if (response && response.success) {
          // 更新本地数据
          this.$set(p, 'name', name)
          this.$set(p, 'text', text)
          this.$set(p, 'content', text) // 同步 content 字段
          this.$set(p, 'images', finalImages)
          this.$set(p, 'time', this.formatNow())
          this.$set(p, '_editing', false)
          
          uni.hideLoading()
          uni.showToast({ title: '修改成功', icon: 'success' })
        } else {
          uni.hideLoading()
          uni.showToast({ title: response?.message || '修改失败', icon: 'none' })
        }
      } catch (error) {
        console.error('修改作品失败:', error);
        uni.hideLoading()
        uni.showToast({ title: '修改失败，请重试', icon: 'none' })
      }
    },
    async deletePost(p) {
      const id = String(p.id)
      uni.showModal({
        title: '删除作品',
        content: '确定要删除该作品吗？删除后不可恢复',
        success: async (res) => {
          if (res.confirm) {
            try {
              // 调用后端API删除帖子
              const response = await deleteCommunityPost(id);
              console.log('删除响应:', response);
              
              // 检查后端返回的success字段
              if (response && response.success === true) {
                // 从本地列表中移除
                const next = this.posts.filter(item => String(item.id) !== id)
                this.posts = next
                uni.showToast({ title: '删除成功', icon: 'success' })
              } else {
                // 后端返回success:false，显示具体错误信息
                const errorMsg = response?.message || response?.msg || '删除失败，请检查权限或联系管理员'
                uni.showToast({ title: errorMsg, icon: 'none' })
                console.error('删除失败，后端返回:', response)
              }
            } catch (error) {
              console.error('删除作品失败:', error);
              uni.showToast({ title: '删除失败，请重试', icon: 'none' })
            }
          }
        }
      })
    },
    formatNow() {
      // 简易时间展示：刚刚
      return '刚刚'
    },
    
    // 获取第一张图片
    getFirstImage(p) {
      if (!p) return '';
      
      // 处理 media_json 字段
      if (p.media_json) {
        try {
          const images = JSON.parse(p.media_json);
          if (Array.isArray(images) && images.length > 0) {
            return images[0];
          }
        } catch (e) {
          console.error('解析 media_json 失败:', e);
        }
      }
      
      // 处理 images 字段
      if (Array.isArray(p.images) && p.images.length > 0) {
        return p.images[0];
      }
      
      return '';
    },
    
    // 获取图片数量
    getImageCount(p) {
      if (!p) return 0;
      
      // 处理 media_json 字段
      if (p.media_json) {
        try {
          const images = JSON.parse(p.media_json);
          if (Array.isArray(images)) {
            return images.length;
          }
        } catch (e) {
          console.error('解析 media_json 失败:', e);
        }
      }
      
      // 处理 images 字段
      if (Array.isArray(p.images)) {
        return p.images.length;
      }
      
      return 0;
    },
    
    // 格式化帖子时间
    formatPostTime(p) {
      if (!p) return '刚刚';
      
      // 优先使用后端返回的时间字段
      const timeStr = p.updated_at || p.created_at || p.time;
      if (!timeStr) return '刚刚';
      
      // 如果是时间戳格式
      if (/^\d+$/.test(timeStr)) {
        const timestamp = parseInt(timeStr);
        // 如果是秒级时间戳，转换为毫秒
        const date = timestamp < 1000000000000 ? new Date(timestamp * 1000) : new Date(timestamp);
        return this.formatRelativeTime(date);
      }
      
      // 如果是日期字符串格式
      try {
        const date = new Date(timeStr);
        if (!isNaN(date.getTime())) {
          return this.formatRelativeTime(date);
        }
      } catch (e) {
        console.error('解析时间失败:', e);
      }
      
      return timeStr;
    },
    
    // 格式化相对时间
    formatRelativeTime(date) {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      
      // 小于1分钟
      if (diff < 60000) {
        return '刚刚';
      }
      
      // 小于1小时
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}分钟前`;
      }
      
      // 小于1天
      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}小时前`;
      }
      
      // 小于1个月
      if (diff < 2592000000) {
        const days = Math.floor(diff / 86400000);
        return `${days}天前`;
      }
      
      // 小于1年
      if (diff < 31536000000) {
        const months = Math.floor(diff / 2592000000);
        return `${months}个月前`;
      }
      
      // 超过1年
      const years = Math.floor(diff / 31536000000);
      return `${years}年前`;
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.list { max-height: calc(100vh - 0rpx); }
.card { margin: 16rpx 24rpx; background: #fff; border-radius: 20rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); padding: 16rpx; }

/* 帖子项样式 */
.post-header { display: flex; gap: 20rpx; align-items: flex-start; padding: 16rpx 0; }

/* 图片区域 */
.post-image-section { position: relative; flex-shrink: 0; }
.post-image { width: 140rpx; height: 140rpx; border-radius: 16rpx; background: linear-gradient(135deg, #f5f5f5, #e8e8e8); }
.image-count-badge { position: absolute; top: 8rpx; right: 8rpx; background: rgba(0,0,0,0.7); color: white; padding: 4rpx 8rpx; border-radius: 8rpx; font-size: 20rpx; }
.count-text { font-size: 20rpx; font-weight: 600; }

/* 内容区域 */
.post-content-section { flex: 1; display: flex; flex-direction: column; gap: 12rpx; }
.post-content { font-size: 28rpx; color: #1f2937; line-height: 1.5; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* 时间信息 */
.post-time { font-size: 22rpx; color: #9ca3af; margin-top: 8rpx; }

/* 操作按钮 */
.post-actions { display: flex; flex-direction: column; gap: 8rpx; flex-shrink: 0; }

/* 编辑态 */
.edit-panel { background: #f9fafb; border-radius: 12rpx; padding: 12rpx; }
.edit-image-section { display: flex; align-items: flex-start; gap: 16rpx; margin-bottom: 16rpx; }
.edit-image-section .label { width: 80rpx; color: #374151; font-size: 26rpx; line-height: 120rpx; }

/* 多图预览样式 */
.images-preview { flex: 1; }
.image-list { display: flex; flex-wrap: wrap; gap: 12rpx; margin-bottom: 8rpx; }
.image-item { position: relative; width: 120rpx; height: 120rpx; border-radius: 8rpx; overflow: hidden; }
.preview-image { width: 100%; height: 100%; background: #eee; }
.remove-btn { position: absolute; top: 4rpx; right: 4rpx; width: 36rpx; height: 36rpx; background: rgba(0,0,0,0.7); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.remove-icon { color: white; font-size: 24rpx; font-weight: bold; line-height: 1; }
.add-image-btn { width: 120rpx; height: 120rpx; border: 2rpx dashed #d1d5db; border-radius: 8rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8rpx; }
.add-icon { font-size: 32rpx; color: #6b7280; font-weight: bold; }
.add-text { font-size: 22rpx; color: #6b7280; }
.image-count { font-size: 22rpx; color: #9ca3af; text-align: center; }
.row { display: flex; align-items: flex-start; gap: 16rpx; padding: 8rpx 0; }
.row .label { width: 80rpx; color: #374151; font-size: 26rpx; line-height: 1.4; }
.textarea { flex: 1; min-height: 120rpx; background: #fff; border-radius: 12rpx; padding: 12rpx 16rpx; font-size: 26rpx; border: 1px solid #e5e7eb; }
.edit-ops { margin-top: 16rpx; display: flex; gap: 10rpx; justify-content: flex-end; }
.hint { margin-top: 8rpx; font-size: 22rpx; color: #9ca3af; text-align: right; }

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