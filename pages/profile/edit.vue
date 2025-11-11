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

    <!-- 个人简介输入 -->
    <view class="description-section">
      <text class="label">个人简介</text>
      <textarea class="textarea" v-model="userInfo.description" placeholder="请输入个人简介" maxlength="100" />
      <text class="count">{{ (userInfo.description || '').length }}/100</text>
    </view>
  </view>
</template>

<script>
import { updateUserInfo, updateUserAvatar } from '@/api/user.js';
import { uploadMedia } from '@/api/recipes.js';
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        nickname: '',
        description: ''
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
          const tempPath = res.tempFilePaths[0];
          console.log('选择头像成功，临时路径:', tempPath);
          // 设置为临时路径，上传后会更新为服务器URL
          this.userInfo.avatar = tempPath;
          uni.showToast({ title: '新头像已上传成功', icon: 'none', duration: 2000 });
        },
        fail: (err) => {
          console.error('选择头像失败:', err);
          uni.showToast({ title: '选择头像失败', icon: 'none' });
        }
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
    let avatarUpdated = false;
    let avatarUrl = this.userInfo.avatar;
    
    console.log('保存前头像路径:', avatarUrl);
    
    // 如果头像有更新（是临时文件路径），先上传头像
    if (this.userInfo.avatar && (this.userInfo.avatar.startsWith('wxfile://') || this.userInfo.avatar.startsWith('http://tmp') || this.userInfo.avatar.includes('temp'))) {
      console.log('检测到需要上传头像，开始上传...');
      try {
        avatarUrl = await uploadMedia(this.userInfo.avatar);
        this.userInfo.avatar = avatarUrl;
        avatarUpdated = true;
        console.log('头像上传成功，服务器返回URL:', avatarUrl);
        uni.showToast({ title: '头像上传成功', icon: 'none' });
      } catch (uploadError) {
        console.error('头像上传失败:', uploadError);
        uni.showToast({ title: '头像上传失败，请重试', icon: 'none' });
        throw uploadError;
      }
    } else {
      console.log('头像无需上传，使用现有URL:', avatarUrl);
    }
    
    // 如果头像有更新，需要调用头像更新接口
    if (avatarUpdated && avatarUrl) {
      console.log('调用头像更新接口...');
      try {
        const avatarResponse = await updateUserAvatar(avatarUrl);
        if (!avatarResponse || !avatarResponse.success) {
          throw new Error('头像更新失败：' + (avatarResponse?.message || '未知错误'));
        }
        console.log('头像信息更新成功');
      } catch (avatarError) {
        console.error('头像信息更新失败:', avatarError);
        uni.showToast({ title: '头像信息更新失败', icon: 'none' });
        throw avatarError;
      }
    }
    
    // 更新用户信息（昵称、简介）
    console.log('更新用户信息...');
    const response = await updateUserInfo({
      nickname: this.userInfo.nickname,
      description: this.userInfo.description || ''
    });
    
    if (response && response.success) {
        // 保存到本地存储，同时确保头像字段正确映射
      const userInfoToSave = {
        ...this.userInfo,
        avatar: avatarUrl, // 使用更新后的头像URL
        avatarUrl: avatarUrl // 同时设置avatarUrl字段
      };
      uni.setStorageSync('userInfo', userInfoToSave);
      
      uni.showToast({ title: '保存成功', icon: 'none' });
      
      // 直接触发全局事件，确保更新能传播到我的页面
      uni.$emit('userInfoUpdated');
      
      // 延迟返回，确保事件被处理
      setTimeout(() => {
        uni.navigateBack();
      }, 300);
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

.description-section {
  margin: 24rpx; padding: 20rpx; background: #fff; border-radius: 16rpx;
}

.textarea {
  margin-top: 16rpx; padding: 16rpx; background: #f9f9f9; border-radius: 8rpx;
  font-size: 28rpx; color: #1f2937;
  min-height: 120rpx;
  resize: vertical;
}

.count {
  margin-top: 8rpx; font-size: 24rpx; color: #6b7280; text-align: right;
}

.description-section {
  margin: 24rpx; padding: 20rpx; background: #fff; border-radius: 16rpx;
}

.textarea {
  margin-top: 16rpx; padding: 16rpx; background: #f9f9f9; border-radius: 8rpx;
  font-size: 28rpx; color: #1f2937;
  min-height: 120rpx;
  resize: vertical;
}

.count {
  margin-top: 8rpx; font-size: 24rpx; color: #6b7280; text-align: right;
}

.description-section {
  margin: 24rpx; padding: 20rpx; background: #fff; border-radius: 16rpx;
}

.textarea {
  margin-top: 16rpx; padding: 16rpx; background: #f9f9f9; border-radius: 8rpx;
  font-size: 28rpx; color: #1f2937;
  min-height: 120rpx;
  resize: vertical;
}

.count {
  margin-top: 8rpx; font-size: 24rpx; color: #6b7280; text-align: right;
}

.description-section {
  margin: 24rpx; padding: 20rpx; background: #fff; border-radius: 16rpx;
}

.textarea {
  margin-top: 16rpx; padding: 16rpx; background: #f9f9f9; border-radius: 8rpx;
  font-size: 28rpx; color: #1f2937;
  min-height: 120rpx;
  resize: vertical;
}

.count {
  margin-top: 8rpx; font-size: 24rpx; color: #6b7280; text-align: right;
}
</style>