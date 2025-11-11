<template>
  <view class="page">
    <view class="header">
      <text class="title">我的评论</text>
    </view>

    <view v-if="!comments.length" class="empty">
      <text class="tip">暂无评论记录</text>
      <button class="btn primary small" @click="goSocial">去美食圈</button>
    </view>

    <scroll-view v-else scroll-y class="list">
      <view class="card" v-for="comment in comments" :key="comment.id">

        
        <view class="top">
          <image class="avatar" :src="currentUserAvatar || fallbackImg" mode="aspectFill" />
          <view class="meta">
            <text class="name">{{ currentUserName || '我' }}</text>
            <text class="time">{{ formatTime(comment.createTime) }}</text>
          </view>
          <view class="ops">
            <button class="btn tiny primary" @click="editComment(comment)">编辑</button>
            <button class="btn tiny ghost" @click="deleteComment(comment)">删除</button>
            <button class="btn tiny ghost" @click="open(comment)">查看帖子</button>
          </view>
        </view>
        
        <!-- 评论内容 -->
        <view class="content" v-if="!comment.editing">{{ comment.content }}</view>
        
        <!-- 编辑模式 -->
        <view class="edit-mode" v-if="comment.editing">
          <textarea 
            class="edit-textarea" 
            v-model="comment.editContent" 
            :placeholder="comment.content"
            maxlength="500"
            auto-height
          />
          <view class="edit-actions">
            <button class="btn tiny ghost" @click="cancelEdit(comment)">取消</button>
            <button class="btn tiny primary" @click="saveEdit(comment)">保存</button>
          </view>
        </view>
        
        <!-- 帖子详情展示 -->
        <view class="post-detail" v-if="comment.showPostDetail">
          <view class="post-header">
            <text class="post-detail-title">帖子详情</text>
            <button class="close-btn" @click="closePostDetail(comment)">取消</button>
          </view>
          
          <view class="post-content">
            <text class="post-text">{{ (comment.postDetail && comment.postDetail.content) || '暂无内容' }}</text>
            
            <!-- 帖子图片展示 - 解析JSON字符串并限制最多显示3张图片 -->
            <view class="post-images" v-if="comment.postDetail && comment.postDetail.mediaJson">
              <image 
                v-for="(img, index) in getMediaArray(comment.postDetail.mediaJson).slice(0, 3)" 
                :key="index" 
                :src="img" 
                class="post-image" 
                mode="aspectFill"
                @click="previewImage(getMediaArray(comment.postDetail.mediaJson), index)"
              />
              <!-- 如果图片超过3张，显示更多提示 -->
              <view v-if="getMediaArray(comment.postDetail.mediaJson).length > 3" class="more-images">
                <text class="more-text">+{{ getMediaArray(comment.postDetail.mediaJson).length - 3 }}张</text>
              </view>
            </view>
          </view>
          
          <view class="post-footer">
            <text class="post-time">{{ formatTime(comment.postDetail && comment.postDetail.createTime) }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 确认删除弹窗 -->
    <view class="modal" v-if="showDeleteModal">
      <view class="modal-content">
        <text class="modal-title">确认删除</text>
        <text class="modal-text">确定要删除这条评论吗？</text>
        <view class="modal-actions">
          <button class="btn ghost" @click="showDeleteModal = false">取消</button>
          <button class="btn primary" @click="confirmDelete">确认删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserComments, deleteComment, updateComment, getPostByCommentId } from '@/api/recipes';

export default {
  data() {
    return {
      comments: [],
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      loading: false,
      showDeleteModal: false,
      deletingComment: null,
      currentUserAvatar: '',
      currentUserName: ''
    }
  },
  async onShow() {
    this.loadCurrentUserInfo();
    await this.loadComments();
  },
  methods: {
    // 加载当前用户信息
    loadCurrentUserInfo() {
      try {
        // 从本地存储获取用户信息
        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo) {
          this.currentUserAvatar = userInfo.avatar || userInfo.avatarUrl || '';
          this.currentUserName = userInfo.nickname || '';
          console.log('加载当前用户信息:', { avatar: this.currentUserAvatar, name: this.currentUserName });
        } else {
          console.log('未找到用户信息，使用默认值');
          this.currentUserAvatar = '';
          this.currentUserName = '';
        }
      } catch (error) {
        console.error('加载用户信息失败:', error);
        this.currentUserAvatar = '';
        this.currentUserName = '';
      }
    },
    
    // 加载评论列表
    async loadComments() {
      if (this.loading) return;
      
      try {
        this.loading = true;
        
        // 检查用户是否登录
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          this.comments = [];
          return;
        }
        
        // 从后端API获取评论列表
        const response = await getUserComments(1, 20);
        console.log('获取评论列表响应:', response);
        
        if (response && response.list) {
          this.comments = response.list.map(comment => ({
            ...comment,
            id: String(comment.id),
            postId: String(comment.postId || comment.postId),
            // 确保帖子标题正确显示，兼容不同接口的字段名，如果没有真实数据则不显示
            postTitle: comment.postTitle || comment.postContent || '',
            editing: false,
            editContent: '',
            // 新增字段：用于控制帖子详情显示
            showPostDetail: false,
            postDetail: null
          }));
          console.log(`获取到 ${this.comments.length} 条评论记录`);
          
          // 打印每条评论的帖子信息，便于调试
          this.comments.forEach(comment => {
            console.log(`评论ID: ${comment.id}, 帖子ID: ${comment.postId}, 帖子标题: ${comment.postTitle}`);
          });
        } else {
          console.error('接口返回数据格式错误:', response);
          this.comments = [];
        }
      } catch (error) {
        console.error('获取评论列表失败:', error);
        uni.showToast({ title: '获取评论失败', icon: 'none' });
        this.comments = [];
      } finally {
        this.loading = false;
      }
    },
    
    // 格式化时间显示
    formatTime(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      
      if (diff < 60000) return '';
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
      if (diff < 2592000000) return Math.floor(diff / 86400000) + '天前';
      
      return date.toLocaleDateString();
    },
    
    goSocial() {
      uni.switchTab ? uni.switchTab({ url: '/pages/social/index' }) : uni.navigateTo({ url: '/pages/social/index' })
    },
    
    async open(comment) {
      if (!comment || !comment.id) {
        uni.showToast({ title: '评论信息不完整', icon: 'none' });
        return;
      }
      
      try {
        uni.showLoading({ title: '加载中...' });
        
        // 调用接口获取帖子详情
        const response = await getPostByCommentId(comment.id);
        console.log('获取帖子详情响应:', response);
        
        if (response && response.success && response.data) {
          const postData = response.data.post; // 帖子数据在 data.post 中
          
          if (postData) {
            console.log('获取到帖子详情:', postData);
            
            // 关闭其他帖子的详情展示
            this.comments.forEach(c => {
              if (c.id !== comment.id) {
                c.showPostDetail = false;
              }
            });
            
            // 显示当前帖子的详情
            comment.showPostDetail = true;
            comment.postDetail = postData;
            
            // 更新帖子标题显示
            comment.postTitle = postData.content || postData.title || '';
            
            uni.showToast({ title: '已显示帖子详情', icon: 'none' });
          } else {
            uni.showToast({ title: '未找到对应帖子', icon: 'none' });
          }
        } else {
          uni.showToast({ title: '无法获取帖子信息', icon: 'none' });
        }
      } catch (error) {
        console.error('获取帖子详情失败:', error);
        uni.showToast({ title: '获取帖子失败，请重试', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 关闭帖子详情
    closePostDetail(comment) {
      comment.showPostDetail = false;
      comment.postDetail = null;
    },
    
    // 解析mediaJson字符串为数组
    getMediaArray(mediaJson) {
      if (!mediaJson) return [];
      
      try {
        // 如果已经是数组，直接返回
        if (Array.isArray(mediaJson)) {
          return mediaJson;
        }
        
        // 解析JSON字符串
        const parsed = JSON.parse(mediaJson);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error('解析mediaJson失败:', error);
        return [];
      }
    },
    
    // 预览图片
    previewImage(images, currentIndex) {
      if (!images || images.length === 0) return;
      
      uni.previewImage({
        urls: images,
        current: currentIndex
      });
    },
    
    // 编辑评论
    editComment(comment) {
      // 先关闭其他正在编辑的评论
      this.comments.forEach(c => {
        if (c.id !== comment.id) {
          c.editing = false;
          c.editContent = '';
        }
      });
      
      comment.editing = true;
      comment.editContent = comment.content;
    },
    
    // 取消编辑
    cancelEdit(comment) {
      comment.editing = false;
      comment.editContent = '';
    },
    
    // 保存编辑
    async saveEdit(comment) {
      if (!comment.editContent || comment.editContent.trim() === '') {
        uni.showToast({ title: '评论内容不能为空', icon: 'none' });
        return;
      }
      
      if (comment.editContent === comment.content) {
        comment.editing = false;
        return;
      }
      
      try {
        uni.showLoading({ title: '保存中...' });
        
        // 使用更简单的数据格式，避免后端字段验证问题
        const response = await updateComment(comment.id, comment.editContent.trim());
        
        if (response && response.success) {
          comment.content = comment.editContent;
          comment.editing = false;
          uni.showToast({ title: '评论修改成功', icon: 'success' });
        } else {
          // 如果后端返回错误，检查是否是字段缺失问题
          if (response && response.message && response.message.includes('updated_at')) {
            uni.showToast({ title: '后端数据库字段缺失，请联系管理员', icon: 'none' });
          } else {
            throw new Error('修改失败');
          }
        }
      } catch (error) {
        console.error('修改评论失败:', error);
        uni.showToast({ title: '修改失败，请重试', icon: 'none' });
      } finally {
        uni.hideLoading();
      }
    },
    
    // 删除评论
    deleteComment(comment) {
      this.deletingComment = comment;
      this.showDeleteModal = true;
    },
    
    // 确认删除
    async confirmDelete() {
      if (!this.deletingComment) return;
      
      try {
        uni.showLoading({ title: '删除中...' });
        
        const response = await deleteComment(this.deletingComment.id);
        
        if (response && response.success) {
          // 从列表中移除删除的评论
          this.comments = this.comments.filter(c => c.id !== this.deletingComment.id);
          uni.showToast({ title: '评论删除成功', icon: 'success' });
        } else {
          throw new Error('删除失败');
        }
      } catch (error) {
        console.error('删除评论失败:', error);
        uni.showToast({ title: '删除失败，请重试', icon: 'none' });
      } finally {
        uni.hideLoading();
        this.showDeleteModal = false;
        this.deletingComment = null;
      }
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

/* 帖子信息样式 */
.post-info { margin-bottom: 12rpx; padding: 8rpx 0; border-bottom: 1rpx solid #f0f0f0; }
.post-label { font-size: 24rpx; color: #6b7280; margin-right: 8rpx; }
.post-title { font-size: 26rpx; color: #374151; font-weight: 600; }

/* 编辑模式样式 */
.edit-mode { margin-top: 12rpx; }
.edit-textarea { width: 100%; min-height: 120rpx; border: 1rpx solid #e5e7eb; border-radius: 8rpx; padding: 12rpx; font-size: 26rpx; background: #f9fafb; }
.edit-actions { display: flex; justify-content: flex-end; gap: 12rpx; margin-top: 12rpx; }

/* 模态框样式 */
.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.modal-content { background: #fff; border-radius: 20rpx; padding: 32rpx; width: 80%; max-width: 600rpx; }
.modal-title { font-size: 32rpx; font-weight: 700; color: #1f2937; display: block; text-align: center; margin-bottom: 16rpx; }
.modal-text { font-size: 28rpx; color: #374151; display: block; text-align: center; margin-bottom: 24rpx; }
.modal-actions { display: flex; gap: 16rpx; justify-content: center; }

/* 帖子详情展示样式 */
.post-detail {
  margin-top: 16rpx;
  background: #f9fafb;
  border-radius: 12rpx;
  padding: 16rpx;
  border: 1rpx solid #e5e7eb;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.post-detail-title {
  font-size: 26rpx;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  font-size: 24rpx;
  height: 40rpx;
  line-height: 24rpx;
}

.post-content {
  margin-bottom: 12rpx;
}

.post-text {
  font-size: 26rpx;
  color: #374151;
  line-height: 1.5;
  display: block;
  margin-bottom: 12rpx;
}

.post-images {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 12rpx;
}

.post-image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 8rpx;
  background: #eee;
}

/* 更多图片提示样式 */
.more-images {
  width: 180rpx;
  height: 180rpx;
  border-radius: 8rpx;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.more-text {
  font-size: 24rpx;
  color: #fff;
  font-weight: 600;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1rpx solid #e5e7eb;
  padding-top: 12rpx;
}

.post-time {
  font-size: 22rpx;
  color: #9ca3af;
}

/* 帖子操作按钮容器 */
.post-actions {
  display: flex;
  gap: 12rpx;
}
</style>