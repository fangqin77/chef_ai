<template>
  <view class="page">
    <view v-if="!posts.length" class="empty">
      <text class="tip">还没有发布作品</text>
      <button class="btn primary small" @click="goPublish">去发布</button>
    </view>

    <scroll-view v-else scroll-y class="list" @refresherrefresh="onRefresh" refresher-enabled="true" refresher-background="#f7f2e7" @scrolltolower="loadMore">
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
import { getCommunityPosts, updateCommunityPost, deleteCommunityPost } from '@/api/recipes';

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
        
        // 从后端API获取当前用户的帖子
        const response = await getCommunityPosts(this.currentPage, this.pageSize, null, 'current');
        console.log('获取我的作品响应:', response);
        
        if (response && response.list) {
          // 处理返回的数据，添加编辑状态
          const posts = response.list.map(post => {
            const processedPost = {
              ...post,
              _editing: false,
              _editForm: {
                name: post.name || '',
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
          this.hasMore = response.list.length === this.pageSize;
          
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
        text: p.text || ''
      })
    },
    cancelEdit(p) {
      this.$set(p, '_editing', false)
      // 取消不修改原数据
    },
    async saveEdit(p) {
      const form = p._editForm || {}
      const name = String(form.name || '').trim()
      const text = String(form.text || '').trim()
      
      if (text.length > 200) {
        uni.showToast({ title: '文案超出 200 字', icon: 'none' })
        return
      }
      
      try {
        // 调用后端API更新帖子
        const response = await updateCommunityPost(p.id, text, p.images || [], p.visibility || 1);
        
        if (response && response.success) {
          // 更新本地数据
          this.$set(p, 'name', name)
          this.$set(p, 'text', text)
          this.$set(p, 'content', text) // 同步 content 字段
          this.$set(p, 'time', this.formatNow())
          this.$set(p, '_editing', false)
          
          uni.showToast({ title: '修改成功', icon: 'success' })
        } else {
          uni.showToast({ title: response?.message || '修改失败', icon: 'none' })
        }
      } catch (error) {
        console.error('修改作品失败:', error);
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
              
              if (response && response.success) {
                // 从本地列表中移除
                const next = this.posts.filter(item => String(item.id) !== id)
                this.posts = next
                uni.showToast({ title: '删除成功', icon: 'success' })
              } else {
                uni.showToast({ title: response?.message || '删除失败', icon: 'none' })
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