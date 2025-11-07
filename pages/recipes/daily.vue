<template>
  <view class="daily-page">
    <view class="header">
      <text class="title">每日菜谱</text>
      <view class="actions">
        <button class="btn ghost small" @click="clearAll" v-if="items.length">清空</button>
      </view>
    </view>

    <view v-if="!items.length" class="empty">
      <text class="empty-text">还没有收藏的菜谱，去逛逛吧～</text>
      <button class="btn primary small" @click="goExplore">去菜谱大全</button>
    </view>

    <scroll-view scroll-y class="list">
      <view v-for="g in groups" :key="g.date" class="date-section">
        <view class="date-header">{{ g.date }}</view>
        <view v-for="(it, idx) in g.items" :key="it.id" class="cart-row">
          <view class="row-content"
                :style="{ transform: 'translateX(' + (it._dx || 0) + 'px)' }"
                @touchstart.stop="onTouchStart($event, it._gIndex)"
                @touchmove="onTouchMove($event, it._gIndex)"
                @touchend="onTouchEnd($event, it._gIndex)"
                @tap="handleTap(it)">
            <image class="cover" :src="it.imageUrl || fallbackImg" mode="aspectFill" />
            <view class="info">
              <view class="name">{{ it.name || ('菜谱 ' + it.id) }}</view>
            </view>
          </view>
          <view class="ops" v-if="it._open">
            <button class="btn ghost tiny" @click.stop="remove(it)">删除</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
const { getDailyFavorites, cancelPlanWithFavorite } = require('@/api/recipes.js')
export default {
  data() {
    return {
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      items: [],
      groups: [],
      _startX: 0
    }
  },
  onShow() {
    this.loadData();
    uni.$on('refreshDailyRecipes', () => {
      this.loadData();
    });
  },
  onUnload() {
    uni.$off('refreshDailyRecipes');
  },
  methods: {
    safeDecode(val) {
      if (typeof val !== 'string') return val
      let result = val
      for (let i = 0; i < 2; i++) {
        if (typeof result === 'string' && result.includes('%')) {
          try {
            const decoded = decodeURIComponent(result)
            if (decoded === result) break
            result = decoded
            continue
          } catch (e) {
            break
          }
        }
        break
      }
      return result
    },

    findIndexById(id) {
      return (this.items || []).findIndex(x => String(x.id) === String(id))
    },

    buildGroups(list) {
      const map = {}
      list.forEach(it => {
        const d = it.plannedDate || '未安排'
        if (!map[d]) map[d] = []
        const idx0 = this.findIndexById(it.id)
        if (idx0 >= 0) this.items[idx0]._gIndex = idx0
        map[d].push(this.items[idx0])
      })
      const todayBase = new Date()
      const base = new Date(todayBase.getFullYear(), todayBase.getMonth(), todayBase.getDate())
      const MS_PER_DAY = 86400000
      const diffDays = (ds) => {
        if (!ds || ds === '未安排') return Number.POSITIVE_INFINITY
        const parts = String(ds).split('-').map(Number)
        if (parts.length !== 3 || parts.some(n => Number.isNaN(n))) return Number.POSITIVE_INFINITY
        const d = new Date(parts[0], parts[1] - 1, parts[2])
        return Math.abs((d.getTime() - base.getTime()) / MS_PER_DAY)
      }
      const keys = Object.keys(map).sort((a, b) => {
        const da = diffDays(a)
        const db = diffDays(b)
        if (da !== db) return da - db
        return a > b ? 1 : -1
      })
      this.groups = keys.map(k => ({ date: k, items: map[k] }))
    },

    async loadData() {
      try {
        // 从本地存储获取 Token（如果有）
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          });
          // 跳转到登录页
          uni.navigateTo({ url: '/pages/login/index' });
          return;
        }
        // 检查 Token 是否有效
        if (typeof token !== 'string' || token.trim() === '') {
          uni.showToast({
            title: 'Token无效，请重新登录',
            icon: 'none'
          });
          uni.navigateTo({ url: '/pages/login/index' });
          return;
        }

        // 使用 API 获取今日的每日菜谱
        const response = await getDailyFavorites();
        
        console.log('今日菜谱接口响应:', response);
        
        // 处理返回的数据结构
        this.items = [];
        if (response.success && response.data && Array.isArray(response.data)) {
          // 数组格式：[{...}, {...}, ...]
          this.items = response.data.map(item => ({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            plannedDate: item.plannedDate || '未安排',
            _dx: 0,
            _open: false
          }));
        }
        
        console.log('处理后的菜谱数据:', this.items);
        this.buildGroups(this.items);
      } catch (err) {
        console.error('获取每日菜谱失败：', err);
        uni.showToast({
          title: '获取每日菜谱失败，请重试',
          icon: 'none'
        });
      }
    },

    // 收藏菜谱到今日（带日期的收藏接口）
    async favoriteRecipe(recipeId) {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }

        // 使用带日期的收藏接口，收藏到今日
        const today = new Date().toISOString().split('T')[0];
        const [err, response] = await uni.request({
          url: `/api/recipes/favorites/plan?recipeId=${recipeId}&planCookDate=${today}`,
          method: 'POST',
          header: { Authorization: `Bearer ${token}` }
        });

        if (err || !response.data.success) {
          console.error('收藏失败:', err || response.data);
          uni.showToast({ title: '收藏失败', icon: 'none' });
          return;
        }

        uni.showToast({ title: '已添加到今日菜谱' });
      } catch (err) {
        console.error('收藏异常:', err);
        uni.showToast({ title: '收藏异常', icon: 'none' });
      }
    },

    // 取消收藏（从每日菜谱中移除）
    async unfavoriteRecipe(recipeId) {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }

        // 使用带日期的收藏接口的删除功能
        const [err, response] = await uni.request({
          url: `/api/recipes/favorites/plan?recipeId=${recipeId}`,
          method: 'DELETE',
          header: { Authorization: `Bearer ${token}` }
        });

        if (err || !response.data.success) {
          console.error('取消收藏失败:', err || response.data);
          uni.showToast({ title: '取消收藏失败', icon: 'none' });
          return;
        }

        uni.showToast({ title: '已从每日菜谱移除' });
      } catch (err) {
        console.error('取消收藏异常:', err);
        uni.showToast({ title: '取消收藏异常', icon: 'none' });
      }
    },

    // 添加到每日菜谱
    async addToDaily(recipeId, date) {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }

        const [err, response] = await uni.request({
          url: `/api/recipes/${recipeId}/add-to-daily`,
          method: 'POST',
          data: { date },
          header: { Authorization: `Bearer ${token}` }
        });

        if (err || !response.data.success) {
          console.error('添加到每日菜谱失败:', err || response.data);
          uni.showToast({ title: '添加失败', icon: 'none' });
          return;
        }

        uni.showToast({ title: '添加成功' });
        this.loadData(); // 刷新列表
      } catch (err) {
        console.error('添加异常:', err);
        uni.showToast({ title: '添加异常', icon: 'none' });
      }
    },

    // 从每日菜谱中移除（调用 cancelPlanWithFavorite 接口）
    async remove(it) {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }

        // 调用取消计划接口（保留收藏记录）
        const response = await cancelPlanWithFavorite(it.id);

        if (!response.success) {
          console.error('移除失败:', response);
          uni.showToast({ title: '移除失败', icon: 'none' });
          return;
        }

        uni.showToast({ title: '已从每日菜谱移除' });
        this.loadData();
      } catch (err) {
        console.error('移除异常:', err);
        uni.showToast({ title: '移除异常', icon: 'none' });
      }
    },

    onTouchStart(e, idx) {
      this._startX = (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      this.closeAll(idx)
    },

    onTouchMove(e, idx) {
      const x = (e.touches && e.touches[0] ? e.touches[0].clientX : 0)
      const dx = x - (this._startX || 0)
      const clamped = Math.max(-200, Math.min(0, dx))
      const it = this.items[idx]
      if (it) {
        it._dx = clamped
        it._open = clamped < -48
      }
    },

    onTouchEnd(e, idx) {
      const it = this.items[idx]
      if (!it) return
      const endX = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : (this._startX || 0))
      const distance = Math.abs(endX - (this._startX || 0))
      if (distance < 8) {
        it._dx = 0
        it._open = false
        setTimeout(() => this.handleTap(it), 0)
        return
      }
      const dx = it._dx || 0
      if (dx < -48) {
        it._dx = -140
        it._open = true
      } else {
        it._dx = 0
        it._open = false
      }
    },

    closeAll(keepIdx = -1) {
      (this.items || []).forEach((row, i) => {
        if (i !== keepIdx) {
          row._dx = 0
          row._open = false
        }
      })
    },

    // 清空所有每日菜谱
    async clearAll() {
      try {
        const token = uni.getStorageSync('token');
        if (!token) {
          uni.showToast({ title: '请先登录', icon: 'none' });
          return;
        }

        // 如果没有菜谱，直接返回
        if (!this.items.length) {
          uni.showToast({ title: '暂无菜谱可清空', icon: 'none' });
          return;
        }

        // 显示确认对话框
        uni.showModal({
          title: '确认清空',
          content: '确定要清空所有每日菜谱吗？此操作不可撤销。',
          success: async (res) => {
            if (res.confirm) {
              // 批量删除所有菜谱
              let successCount = 0;
              let errorCount = 0;
              
              // 显示加载中
              uni.showLoading({ title: '清空中...', mask: true });
              
              // 循环调用删除接口删除每个菜谱
              for (const item of this.items) {
                try {
                  const response = await cancelPlanWithFavorite(item.id);
                  if (response.success) {
                    successCount++;
                  } else {
                    errorCount++;
                    console.error(`删除菜谱 ${item.id} 失败:`, response);
                  }
                } catch (err) {
                  errorCount++;
                  console.error(`删除菜谱 ${item.id} 异常:`, err);
                }
              }
              
              uni.hideLoading();
              
              // 显示结果
              if (errorCount === 0) {
                uni.showToast({ title: `已清空 ${successCount} 个菜谱`, icon: 'none' });
              } else if (successCount > 0) {
                uni.showToast({ title: `成功清空 ${successCount} 个，失败 ${errorCount} 个`, icon: 'none' });
              } else {
                uni.showToast({ title: '清空失败，请重试', icon: 'none' });
              }
              
              // 刷新数据
              this.loadData();
            }
          }
        });
      } catch (err) {
        console.error('清空操作异常:', err);
        uni.showToast({ title: '清空异常，请重试', icon: 'none' });
      }
    },

    handleTap(it) {
      this.onRowTap(it)
    },

    onRowTap(it) {
      const idx = this.findIndexById(it.id)
      if (idx >= 0) {
        const row = this.items[idx]
        if (row && row._open) {
          row._dx = 0
          row._open = false
          return
        }
      }
      this.closeAll()
      this.goDetail(it)
    },

    goDetail(it) {
      const rawId = it && it.id != null ? this.safeDecode(String(it.id)) : ''
      const encodedId = typeof rawId === 'string' && rawId ? encodeURIComponent(rawId) : ''
      const url = encodedId ? `/pages/recipes/detail?id=${encodedId}` : '/pages/recipes/detail'
      uni.navigateTo && uni.navigateTo({
        url,
        fail: () => {
          uni.showToast && uni.showToast({ title: '跳转失败，请检查 pages.json 是否已注册 detail 页面', icon: 'none' })
          uni.redirectTo && uni.redirectTo({ url })
        }
      })
    },

    goExplore() {
      if (uni.switchTab) {
        uni.switchTab({ url: '/pages/recipes/index' })
      } else {
        uni.reLaunch && uni.reLaunch({ url: '/pages/recipes/index' })
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style>
.daily-page { background: #f7f2e7; min-height: 100vh; }
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 24rpx 12rpx;
}
.title { font-size: 36rpx; font-weight: 800; color: #111827; }
.actions { display: flex; gap: 12rpx; }
.list { max-height: calc(100vh - 120rpx); }
.date-section { margin-bottom: 12rpx; }
.date-header {
  padding: 8rpx 24rpx;
  font-size: 26rpx;
  color: #6b7280;
}

.cart-row {
  position: relative;
  overflow: hidden;
  padding: 16rpx 24rpx;
  margin: 0 24rpx 16rpx;
  background: #fff;
  border-radius: 18rpx;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.06);
}
.row-content {
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  will-change: transform;
}
.cover {
  width: 140rpx;
  height: 100rpx;
  border-radius: 12rpx;
  background: #eee;
  margin-right: 16rpx;
}
.info { flex: 1; display: flex; flex-direction: column; }
.name { font-size: 30rpx; font-weight: 700; color: #1f2937; }
.meta { margin-top: 6rpx; }
.meta-text { font-size: 24rpx; color: #6b7280; }

.ops {
  position: absolute;
  right: 24rpx;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 2;
}
.btn { height: 72rpx; line-height: 72rpx; text-align: center; border-radius: 14rpx; font-size: 28rpx; }
.btn.small { height: 64rpx; line-height: 64rpx; font-size: 26rpx; }
.btn.tiny { height: 56rpx; line-height: 56rpx; font-size: 24rpx; }
.btn.ghost { background: #f3f4f6; color: #374151; }
.btn.primary { background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%); color: #fff; }
.empty {
  padding: 60rpx 24rpx;
  display: flex; flex-direction: column; align-items: center; gap: 16rpx;
}
.empty-text { font-size: 28rpx; color: #6b7280; }
</style>