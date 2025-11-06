<template>
  <view class="page">
    <!-- 顶部栏 -->
    <view class="header">
      <text class="title">编辑资料</text>
      <text class="save-btn" @click="saveProfile">保存</text>
    </view>

    <!-- 头像上传 -->
    <view class="avatar-section">
      <text class="label">头像</text>
      <view class="avatar-upload" @click="uploadAvatar">
        <image class="avatar" :src="userInfo.avatar || '/static/avatar-default.png'" mode="aspectFill" />
        <text class="upload-text">点击更换</text>
      </view>
    </view>

    <!-- 昵称输入 -->
    <view class="nickname-section">
      <text class="label">昵称</text>
      <input class="input" v-model="userInfo.nickname" placeholder="请输入昵称" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        nickname: ''
      }
    }
  },
  onLoad() {
    // 从本地存储加载用户信息
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      this.userInfo = userInfo;
    }
  },
  methods: {
    // 上传头像
    uploadAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.userInfo.avatar = res.tempFilePaths[0];
        }
      });
    },
    // 保存资料
    saveProfile() {
      // 保存到本地存储
      uni.setStorageSync('userInfo', this.userInfo);
      uni.showToast({ title: '保存成功', icon: 'none' });
      // 返回上一页
      uni.navigateBack();
    }
  }
}
</script>

<style>
.page { background: #f7f2e7; min-height: 100vh; }
.header {
  height: 88rpx; padding: 0 24rpx;
  display: flex; align-items: center; justify-content: space-between; background: #fff;
}
.title { font-size: 36rpx; font-weight: 700; color: #1a1f36; }
.save-btn { font-size: 28rpx; color: #ff6a00; }

.avatar-section, .nickname-section {
  margin: 24rpx; padding: 20rpx; background: #fff; border-radius: 16rpx;
}
.label { font-size: 28rpx; color: #6b7280; }
.avatar-upload {
  margin-top: 16rpx; display: flex; flex-direction: column; align-items: center;
}
.avatar { width: 120rpx; height: 120rpx; border-radius: 50%; }
.upload-text { margin-top: 8rpx; font-size: 24rpx; color: #6b7280; }

.input {
  margin-top: 16rpx; padding: 16rpx; background: #f9f9f9; border-radius: 8rpx;
  font-size: 28rpx; color: #1f2937;
}
</style>