
<template>
  <view class="page">
    <image class="bg" src="/static/assets/beijingtu.png" mode="aspectFill" />
    <view class="content">
      <view class="btn-group">
        <button class="btn btn-primary" :disabled="loading" hover-class="btn-primary--hover" @tap="onWxLogin">
          一键登录微信账号
        </button>
        <button class="btn btn-skip" hover-class="btn-skip--hover" @tap="onSkip">
          先逛逛
        </button>
      </view>

      <view class="agreement">
        <checkbox-group @change="onAgreeChange">
          <label class="agree-row">
            <checkbox class="agree-checkbox" value="agree" :checked="checked" />
            <text class="agree-text">我们的服务依赖于微信账号登录，请阅读并同意</text>
          </label>
          <text class="agree-link" @tap="toAgreement">《用户登录指引协议》</text>
        </checkbox-group>
      </view>
    </view>

    <!-- 授权弹框（底部弹出） -->
    <view v-if="showAuthSheet" class="sheet-mask" @tap="closeSheet">
      <view class="sheet" @tap.stop>
        <view class="sheet-title">授权并完善资料</view>

        <view class="profile-col">
          <view class="avatar-wrap center" @tap="pickAvatar">
            <image class="avatar" :src="displayAvatar" :key="displayAvatar" mode="aspectFill" @error="onAvatarError" />
            <view class="avatar-edit">更换</view>
          </view>

          <input class="name-input center" type="text" maxlength="20" v-model="draftName" placeholder="请输入昵称" />
          <button class="btn btn-mini" @tap="fetchWxProfile">获取微信信息</button>
        </view>

        <view class="sheet-actions">
          <button class="btn btn-cancel" @tap="closeSheet">取消</button>
          <button class="btn btn-primary" :loading="loading" @tap="confirmAndLogin">确认授权并登录</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 接口：支持 login({ code, userInfo })
const { login } = require('../../api/user.js')

export default {
  name: 'LoginIndex',
  data() {
    return {
      checked: false,
      loading: false,
      // 授权弹框数据
      showAuthSheet: false,
      draftName: '',
      draftAvatar: '',
      defaultAvatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO8x+fQAAAAASUVORK5CYII=', // 内置占位，避免404
      wxCode: '', // 暂存 code
      savedProfile: null
    }
  },
  computed: {
    displayAvatar() {
      return this.draftAvatar || (this.savedProfile && this.savedProfile.avatarUrl) || this.defaultAvatar
    }
  },
  onLoad() {
    try {
      const p = uni.getStorageSync('profile')
      if (p && (p.nickName || p.avatarUrl)) {
        this.savedProfile = p
      }
    } catch (_) {}
  },
  methods: {
    onAgreeChange(e) {
      this.checked = Array.isArray(e.detail.value) && e.detail.value.includes('agree')
    },

    // 重新拉取微信资料，自动填充
    async fetchWxProfile() {
      // #ifdef MP-WEIXIN
      try {
        const prof = await uni.getUserProfile({ desc: '用于完善会员资料' })
        this.draftName = prof?.userInfo?.nickName || this.draftName
        this.draftAvatar = prof?.userInfo?.avatarUrl || this.draftAvatar
        uni.showToast({ title: '已获取微信信息', icon: 'success' })
      } catch (_) {
        uni.showToast({ title: '未获取到授权信息', icon: 'none' })
      }
      // #endif
    },

    // 第一步：点击登录 -> 拉起授权弹框（先取微信资料 + code，允许用户编辑）
    async onWxLogin() {
      if (!this.checked) {
        uni.showToast({ title: '请先勾选并同意协议', icon: 'none' })
        return
      }
      if (this.loading) return
      try {
        this.loading = true
        // 优先使用本地保存的资料，不足再取微信资料
        let nick = this.savedProfile?.nickName || ''
        let avatar = this.savedProfile?.avatarUrl || ''
        // #ifdef MP-WEIXIN
        if (!nick || !avatar) {
          try {
            const prof = await uni.getUserProfile({ desc: '用于完善会员资料' })
            nick = nick || (prof?.userInfo?.nickName || '')
            avatar = avatar || (prof?.userInfo?.avatarUrl || '')
          } catch (_) {
            // 用户拒绝也允许继续，让其自行填写
          }
        }
        // #endif

        // 获取 wx login code
        const code = await new Promise((resolve, reject) => {
          uni.login({
            success: res => resolve(res.code),
            fail: reject
          })
        })

        this.wxCode = code
        this.draftName = nick || this.draftName || ''
        this.draftAvatar = avatar || this.draftAvatar || ''
        this.showAuthSheet = true
      } catch (err) {
        console.error('prepare auth sheet error', err)
        uni.showToast({ title: '拉起授权失败', icon: 'none' })
      } finally {
        this.loading = false
      }
    },

    // 选择头像（仅本地预览；如需上传服务器，请在此添加上传逻辑以换取 URL）
    async pickAvatar() {
      try {
        const res = await uni.chooseImage({
          count: 1,
          sizeType: ['compressed','original'],
          sourceType: ['album','camera']
        })
        const filePath =
          (res && res.tempFilePaths && res.tempFilePaths[0]) ||
          (res && res.tempFiles && (res.tempFiles[0].path || res.tempFiles[0].tempFilePath)) ||
          ''
        if (filePath) {
          this.draftAvatar = filePath
          uni.showToast({ title: '已选择头像', icon: 'success' })
        } else {
          uni.showToast({ title: '未获取到图片', icon: 'none' })
        }
      } catch (e) {
        // 用户取消选择或权限拒绝
      }
    },

    closeSheet() {
      this.showAuthSheet = false
    },

    // 第二步：确认并登录 -> 调服务端
    async confirmAndLogin() {
      if (this.loading) return
      if (!this.wxCode) {
        uni.showToast({ title: '登录状态失效，请重试', icon: 'none' })
        return
      }
      this.loading = true
      try {
        const payload = {
          code: this.wxCode,
          userInfo: {
            nickName: this.draftName || undefined,
            avatarUrl: this.draftAvatar || undefined
          }
        }
        const resp = await login(payload)
        if (resp && resp.success && resp.data && resp.data.token) {
          try {
            uni.setStorageSync('isLoggedIn', true)
            uni.setStorageSync('token', resp.data.token)
            if (payload.userInfo) {
              uni.setStorageSync('profile', payload.userInfo)
            }
          } catch (_) {}
          this.showAuthSheet = false
          uni.showToast({ title: '登录成功', icon: 'success' })
          setTimeout(() => uni.reLaunch({ url: '/pages/index/index' }), 300)
        } else {
          throw new Error(resp?.message || '登录失败')
        }
      } catch (err) {
        console.error('confirm login error', err)
        uni.showToast({ title: '登录失败', icon: 'none' })
      } finally {
        this.loading = false
      }
    },

    toAgreement() {
      uni.navigateTo({ url: '/pages/agreement/index' })
    },

    // 不登录进入首页
    onSkip() {
      try { uni.removeStorageSync('isLoggedIn') } catch (_) {}
      uni.reLaunch({ url: '/pages/index/index' })
    },

    onAvatarError() {
      // 图片加载失败回退到占位
      this.draftAvatar = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 4%;
  background: transparent;
}
.btn-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.btn {
  width: 100%;
  height: 92rpx;
  line-height: 92rpx;
  border-radius: 12rpx;
  font-size: 32rpx;
  letter-spacing: 1rpx;
}
.btn-primary {
  color: #7A4E2D;            /* 棕色文字 */
  background: #FFD666;       /* 明亮黄色 */
  box-shadow: 0 6rpx 16rpx rgba(255, 214, 102, 0.45);
  border: 1rpx solid rgba(122, 78, 45, 0.12);
}
.btn-primary[disabled] { opacity: 0.6; }
.btn-primary--hover {
  background: #FFC94D;
  opacity: 0.98;
  transform: translateY(2rpx);
}
/* 次级按钮：先逛逛 */
.btn-skip {
  color: #7A4E2D;
  background: rgba(255,255,255,0.55);
  border: 1rpx solid rgba(122,78,45,0.25);
}
.btn-skip--hover { background: rgba(255,255,255,0.7); }

.agreement {
  width: 100%;
  margin: 24rpx 0 48rpx;
  color: #7A4E2D; /* 棕色 */
  font-size: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.agree-row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.agree-text {
  margin: 0 8rpx 0 12rpx;
  flex: none;
  font-size: 22rpx;
}
.agree-checkbox {
  transform: scale(0.8);
  transform-origin: left center;
  margin-right: 8rpx;
}
.agree-link {
  color: #3aa0ff;
  display: block;
  margin-left: 0;
  margin-top: 8rpx;
  font-size: 22rpx;
}

/* 授权弹框样式 */
.sheet-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 10;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.sheet {
  width: 100%;
  background: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  padding: 36rpx 28rpx 40rpx;
  max-height: 78vh; /* 弹窗更高，向上延伸 */
  overflow: auto;
}
.sheet-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
  color: #333;
}
.profile-col {
  display: flex;
  flex-direction: column;
  align-items: center;  /* 居中头像与输入框 */
  gap: 20rpx;
  margin-bottom: 20rpx;
}
.avatar-wrap {
  position: relative;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.08);
}
.avatar-wrap.center { margin: 0 auto; }
.avatar {
  width: 100%;
  height: 100%;
}
.avatar-edit {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0,0.4);
  color: #fff;
  text-align: center;
  font-size: 22rpx;
  padding: 6rpx 0;
}
.name-input {
  width: 88%;
  background: #f6f6f6;
  border-radius: 12rpx;
  padding: 20rpx 16rpx;
  font-size: 28rpx;
}
.name-input.center { margin: 0 auto; }
.sheet-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 16rpx;
}
.btn-cancel {
  flex: 1;
  background: #f6f6f6;
  color: #333;
}
.btn-primary {
  flex: 1;
}
.btn-mini {
  align-self: center;
  height: 64rpx;
  line-height: 64rpx;
  padding: 0 24rpx;
  font-size: 26rpx;
  border-radius: 12rpx;
  color: #7A4E2D;
  background: #FFE8A3;
  border: 1rpx solid rgba(122,78,45,0.18);
}
</style>