<template>
  <view class="page">


    <view class="debug-visible" />
    <!-- 顶部 -->
    <view class="header">
      <text class="title">我的</text>
    </view>

    <!-- 名片 -->
    <view class="card" @click="handleUserCardClick">
      <view class="card-top">
        <view class="avatar-wrap">
          <image class="avatar" :src="userInfo.avatarUrl || userInfo.avatar || '/static/avatar-default.png'" mode="aspectFill" />
        </view>
        <view class="profile">
          <text class="name">{{ userInfo.nickname || '用户' }}</text>
          <text class="desc">美食爱好者</text>
        </view>
      </view>
      <view class="stats">
        <view class="stat">
          <text class="num">{{ userInfo.followCount || 0 }}</text>
          <text class="label">关注</text>
        </view>
        <view class="divider" />
        <view class="stat">
          <text class="num">{{ userInfo.fansCount || 0 }}</text>
          <text class="label">粉丝</text>
        </view>
        <view class="divider" />
        <view class="stat">
          <text class="num">{{ userInfo.likeCount || 0 }}</text>
          <text class="label">获赞</text>
        </view>
      </view>
    </view>



    <!-- 我的（放在工具与服务前） -->
    <view class="group">
      <view class="group-title">我的内容</view>
      <view class="cell" @click="goFavorites">
        <text class="cell-icon">❤</text><text class="cell-text">我的收藏</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="goMyComments">
        <text class="cell-icon">💬</text><text class="cell-text">我的评论</text><text class="arrow">›</text>
      </view>
    </view>

    <view class="group">
      <view class="group-title">我的</view>
      <view class="cell" @click="goMyWorks">
        <text class="cell-icon">🖼</text><text class="cell-text">我的作品</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="goHistory">
        <text class="cell-icon">🕘</text><text class="cell-text">浏览历史</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="goMyInfo">
        <text class="cell-icon">👤</text><text class="cell-text">我的信息</text><text class="arrow">›</text>
      </view>
    </view>

    <view class="group">
      <view class="group-title">其他</view>
      <view class="cell" @click="toast('帮助与反馈')">
        <text class="cell-icon">🎧</text><text class="cell-text">帮助与反馈</text><text class="arrow">›</text>
      </view>
      <view class="cell" @click="toast('关于我们')">
        <text class="cell-icon">ℹ</text><text class="cell-text">关于我们</text><text class="arrow">›</text>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="group" v-if="userInfo.isLoggedIn">
      <view class="cell logout-cell" @click="handleLogout">
        <text class="cell-icon">🚪</text>
        <text class="cell-text logout-text">退出登录</text>
        <text class="arrow">›</text>
      </view>
    </view>

    <view style="height: 40rpx;" />
  </view>
</template>

<script>
import { wechatLogin } from '../../api/user.js';
import { request } from '../../api/request.js';
export default {
  data() {
    return {
      userInfo: {
        avatar: '',        // 头像（未登录为空）
        nickname: '',      // 昵称（未登录为空）
        followCount: 0,    // 关注数
        fansCount: 0,      // 粉丝数
        likeCount: 0,      // 获赞数
        isLoggedIn: false  // 登录状态
      },
      quicks: []
    }
  },
  async onLoad() {
    this.checkLoginStatus();
  },

    async onShow() {
    // 每次显示页面时重新加载用户信息
    const token = uni.getStorageSync('token');
    if (token) {
      this.loadUserInfo(); // 从服务器获取最新信息
    } else {
      this.checkLoginStatus();
    }
  },
  
  onLoad() {
    // 监听用户信息更新事件
    uni.$on('userInfoUpdated', () => {
      console.log('收到用户信息更新事件，重新加载用户信息');
      this.loadUserInfo();
    });
  },
  
  onUnload() {
    // 移除事件监听
    uni.$off('userInfoUpdated');
  },
  
  onLoad() {
    // 监听用户信息更新事件
    uni.$on('userInfoUpdated', () => {
      console.log('收到用户信息更新事件，重新加载用户信息');
      this.loadUserInfo();
    });
  },
  
  onUnload() {
    // 移除事件监听
    uni.$off('userInfoUpdated');
  },

  methods: {
    // 检查登录状态
    checkLoginStatus() {
      const token = uni.getStorageSync('token');
      console.log('检查登录状态，token:', token); // 调试日志
      if (token) {
        this.loadUserInfo();
      } else {
        // 未登录状态使用默认数据
        this.userInfo = {
          avatar: '/static/avatar-default.png',
          nickname: '用户',
          followCount: 0,
          fansCount: 0,
          likeCount: 0,
          isLoggedIn: false
        };
        console.log('未登录状态，userInfo:', this.userInfo); // 调试日志
      }
    },
    // 点击卡片事件
    handleUserCardClick() {
      uni.navigateTo({ url: '/pages/profile/edit' });
    },
    // 显示微信授权弹窗
    showWechatAuthModal() {
      uni.showModal({
        title: '微信授权登录',
        content: '请授权登录以使用完整功能',
        confirmText: '授权登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.handleWechatLogin();
          }
        }
      });
    },
    // 微信授权登录
    handleWechatLogin() {
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          console.log('获取到微信code:', loginRes.code);
          // 使用code调用后端登录接口
          this.loginWithCode(loginRes.code);
        },
        fail: (err) => {
          console.error('微信登录失败:', err);
          uni.showToast({ title: '登录失败', icon: 'none' });
        }
      });
    },
    // 使用code调用后端登录接口
    loginWithCode(code) {
      wechatLogin(code)
        .then(res => {
          if (res && res.success) {
            // 保存token到本地存储
            uni.setStorageSync('token', res.token || res.data?.token);
            uni.showToast({ title: '登录成功' });
            this.checkLoginStatus(); // 刷新页面状态
          } else {
            uni.showToast({ title: res.msg || '登录失败', icon: 'none' });
          }
        })
        .catch(err => {
          console.error('调用登录接口失败:', err);
          uni.showToast({ title: '网络错误，请重试', icon: 'none' });
        });
    },
    // 加载用户信息（已登录状态）
    async loadUserInfo() {
      try {
        const token = uni.getStorageSync('token');
        console.log('当前 token:', token, '存储时间:', new Date().toISOString());
        
        if (!token) {
          // 未登录状态使用默认数据
          this.userInfo = {
            avatar: '/static/avatar-default.png',
            nickname: '用户',
            followCount: 0,
            fansCount: 0,
            likeCount: 0,
            isLoggedIn: false
          };
          return;
        }
        
        // 检查 token 是否有效（示例：非空且长度合理）
        if (token.length < 10) {
          uni.showToast({ title: '登录凭证无效，请重新登录', icon: 'none' });
          uni.navigateTo({ url: '/pages/login/index' });
          return;
        }
        
        const [res, err] = await new Promise((resolve) => {
          const requestConfig = {
            url: 'http://172.20.10.3:9000/api/user/info',
            method: 'GET',
            header: {
              'Token': token.trim(), // 修改为后端预期的头名称
              'Content-Type': 'application/json'
            },
            timeout: 10000,
            withCredentials: true
          };
          console.log('请求配置:', JSON.stringify(requestConfig, null, 2)); // 打印完整配置
          
          uni.request({
            ...requestConfig,
            complete: (response) => {
              console.log('请求用户信息完成:', response);
              if (response.statusCode === 401) {
                console.error('Token 无效，后端返回:', response.data);
              }
              resolve([response, null]);
            },
            fail: (error) => {
              console.error('请求用户信息失败:', error);
              resolve([null, error]);
            }
          });
        });
        
        if (err || !res || res.statusCode !== 200) {
          if (res?.statusCode === 401) {
            uni.removeStorageSync('token');
            uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
            uni.navigateTo({ url: '/pages/login/index' });
          } else {
            uni.showToast({ title: '网络错误，请重试', icon: 'none' });
          }
          return;
        }
        
        // 更新用户信息 - 正确处理API返回的数据结构
        const apiData = res.data.data || res.data;
        if (apiData) {
          // 映射后端字段到前端字段
          this.userInfo = {
            avatarUrl: apiData.avatarUrl || apiData.avatar, // 后端返回 avatarUrl
            nickname: apiData.nickname,
            followCount: apiData.followCount || 0,
            fansCount: apiData.fansCount || 0,
            likeCount: apiData.likeCount || 0,
            isLoggedIn: true
          };
        }
      } catch (err) {
        console.error('获取用户信息失败:', err);
        uni.showToast({ title: '获取信息失败', icon: 'none' });
      }
    },
    goHistory() {
      uni.navigateTo({ url: '/pages/profile/history' });
    },
    goFavorites() {
      uni.navigateTo({ url: '/pages/profile/favorites' });
    },
    goMyComments() {
      uni.navigateTo({ url: '/pages/profile/comments' });
    },
    goMyWorks() {
      uni.navigateTo({ url: '/pages/profile/works' });
    },
    goMyInfo() {
      uni.navigateTo({ url: '/pages/profile/myinfo' });
    },
    // 退出登录
    handleLogout() {
      uni.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 调用退出登录接口
            request('/api/logout', {}, 'POST')
              .then(() => {
                // 清除本地存储的 token 和用户信息
                uni.removeStorageSync('token');
                this.userInfo = {
                  avatar: '/static/avatar-default.png',
                  nickname: '用户',
                  followCount: 0,
                  fansCount: 0,
                  likeCount: 0,
                  isLoggedIn: false
                };
                uni.showToast({ title: '退出登录成功', icon: 'none' });
              })
              .catch(err => {
                console.error('退出登录失败:', err);
                uni.showToast({ title: '退出登录失败', icon: 'none' });
              });
          }
        }
      });
    }
  }
      }
      
  
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; position: relative; }
/* AI 对话气泡（位于右上角卡通图左侧） */



.debug-visible { height: 2rpx; background: transparent; }

/* 顶部 */
.header {
  height: 88rpx; padding: 0 24rpx;
  display: flex; align-items: center; justify-content: space-between; background: #fff;
}
.title { font-size: 36rpx; font-weight: 700; color: #1a1f36; }
.gear { font-size: 36rpx; color: #6b7280; }

/* 名片 */
.card {
  margin: 16rpx 24rpx; border-radius: 24rpx; padding: 20rpx;
  background: #fff; color: #1f2937;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.card-top { display: flex; align-items: center; }
.avatar-wrap { width: 96rpx; height: 96rpx; border-radius: 50%; overflow: hidden; background: rgba(255,255,255,0.25); }
.avatar { width: 100%; height: 100%; }
.profile { margin-left: 16rpx; display: flex; flex-direction: column; }
.name { font-size: 32rpx; font-weight: 700; }
.desc { margin-top: 6rpx; font-size: 24rpx; opacity: 0.9; }
.stats { margin-top: 16rpx; display: flex; align-items: center; justify-content: space-between; }
.stat { flex: 1; text-align: center; }
.num { font-size: 30rpx; font-weight: 700; }
.label { font-size: 22rpx; opacity: 0.9; }
.divider { width: 1rpx; height: 40rpx; background: #e5e7eb; }

/* 快捷入口 */
.quick {
  margin: 0 24rpx; padding: 20rpx; background: #fff; border-radius: 24rpx;
  display: flex; flex-wrap: wrap; justify-content: space-between;
  box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06);
}
.quick-item { width: 25%; padding: 8rpx 0; display: flex; flex-direction: column; align-items: center; box-sizing: border-box; }
.q-icon { font-size: 36rpx; color: #ff6a00; }
.q-text { margin-top: 8rpx; font-size: 24rpx; color: #374151; }

/* 分组列表 */
.group { margin: 16rpx 24rpx; background: #fff; border-radius: 24rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); }
.group-title { padding: 20rpx 20rpx 0; font-size: 26rpx; color: #6b7280; }
.cell { padding: 24rpx 20rpx; display: flex; align-items: center; }
.cell + .cell { border-top: 1rpx solid #f0f2f5; }
.cell-icon { width: 48rpx; text-align: center; font-size: 30rpx; color: #ff6a00; }
.cell-text { flex: 1; font-size: 28rpx; color: #1f2937; }
.arrow { font-size: 36rpx; color: #c7cdd3; }

/* 退出登录样式 */
.logout-cell {
  background: #fff;
}
.logout-text {
  color: #ff4757 !important;
}
/* 右上角卡通图样式（统一） */

</style>