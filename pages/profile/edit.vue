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
import { updateUserInfo, updateUserAvatar } from '@/api/user.js';
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        nickname: ''
      },
       submitting: false  // 添加这一行
    }
  },
  onLoad() {
    // 从本地存储加载用户信息
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
      this.userInfo ={ ...userInfo }; 
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
      // 设置为临时路径，上传后会更新为服务器URL  // 添加这行注释
      this.userInfo.avatar = res.tempFilePaths[0];
        }
      });

    },
    // 上传头像到服务器
async uploadAvatarToServer() {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'http://172.20.10.3:9000/api/user/upload-avatar',
      filePath: this.userInfo.avatar,
      name: 'avatar',
      header: {
        'Token': uni.getStorageSync('token') // 修复为 Token
      },
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          if (data && data.success && data.data && data.data.avatarUrl) {
            this.userInfo.avatar = data.data.avatarUrl;
            resolve();
          } else {
            reject(new Error(data.message || '头像上传失败'));
          }
        } catch (e) {
          reject(new Error('头像上传响应解析失败'));
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
},
    async saveProfile() {
  if (this.submitting) return;
  
  // 验证昵称
  if (!this.userInfo.nickname || this.userInfo.nickname.trim() === '') {
    uni.showToast({ title: '昵称不能为空', icon: 'none' });
    return;
  }
  
  this.submitting = true;
  uni.showLoading({ title: '保存中...' });
  
  try {
    // 如果头像有更新（是临时文件路径），先上传头像
    if (this.userInfo.avatar && this.userInfo.avatar.startsWith('wxfile://')) {
      await this.uploadAvatarToServer();
    }
    
    // 更新用户信息
    const response = await updateUserInfo({
      nickname: this.userInfo.nickname
    });
    
    if (response && response.success) {
        // 保存到本地存储，同时确保头像字段正确映射
      const userInfoToSave = {
        ...this.userInfo,
        avatarUrl: this.userInfo.avatar // 确保头像URL字段正确
      };
      uni.setStorageSync('userInfo', userInfoToSave);
      
      uni.showToast({ title: '保存成功', icon: 'none' });
      
      // 返回上一页并触发刷新
      uni.navigateBack({
        success: () => {
          // 通过事件总线或全局事件通知父页面刷新
          setTimeout(() => {
            // 触发全局事件，让"我的"页面重新加载用户信息
            uni.$emit('userInfoUpdated');
          }, 500);
        }
      });
    } else {
      uni.showToast({ title: response.message || '保存失败', icon: 'none' });
    }
  } catch (error) {
    console.error('保存用户信息失败:', error);
    uni.showToast({ title: '网络错误，请重试', icon: 'none' });
  } finally {
    uni.hideLoading();
    this.submitting = false;
  }
},

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