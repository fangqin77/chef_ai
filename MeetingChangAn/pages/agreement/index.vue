<template>
  <scroll-view class="page" scroll-y>
    <view class="container">
      <view class="title">用户登录指引协议</view>
      <view class="text">
        为了向你提供更稳定、个性化的服务，我们将使用你的微信登录凭证以完成账户身份识别与登录。登录即表示你已阅读并同意本指引：
        1）我们仅在完成登录、保障账号安全的范围内使用相关信息；2）你可以在设置中退出登录；3）更多条款以平台隐私政策、用户协议为准。
      </view>
      <view class="footer">
        <button class="btn" @tap="back">已阅读，返回</button>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  methods: {
    back() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background: #fff8eb; }
.container { padding: 32rpx; }
.title { font-size: 36rpx; font-weight: 600; margin-bottom: 16rpx; }
.text { color: #555; line-height: 1.8; font-size: 28rpx; }
.footer { margin-top: 32rpx; }
.btn { height: 84rpx; line-height: 84rpx; background: #111; color: #fff; border-radius: 12rpx; }
</style>