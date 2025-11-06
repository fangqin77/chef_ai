<template>
  <view class="publish-page">
    <view class="header">
      <text class="title">发布作品</text>
    </view>

    <view class="form">
      <textarea class="textarea" v-model="text" placeholder="写点什么，记录你的美食时刻～" maxlength="200" />
      <view class="imgs">
        <view class="row">
          <input class="img-input" v-model="imgInput" placeholder="图片地址（可选）" />
          <button class="btn small" :disabled="images.length >= 9" @click="addImg">添加</button>
        </view>
        <view class="thumbs" v-if="images.length">
          <text class="count">已添加 {{ images.length }}/9</text>
          <view v-for="(u,i) in images" :key="i" class="thumb">
            <image :src="u" mode="aspectFill" />
            <text class="del" @click="removeImg(i)">×</text>
          </view>
        </view>
      </view>

      <button class="btn primary" :disabled="submitting" @click="submit">发布</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      imgInput: '',
      images: [],
      submitting: false
    }
  },
  methods: {
    addImg() {
      const u = (this.imgInput || '').trim()
      if (!u) {
        uni.showToast({ title: '请输入图片地址', icon: 'none' })
        return
      }
      if (this.images.length >= 9) {
        uni.showToast({ title: '最多上传 9 张图片', icon: 'none' })
        return
      }
      this.images.push(u)
      this.imgInput = ''
    },
    removeImg(i) {
      this.images.splice(i, 1)
    },
    async submit() {
      if (this.submitting) return
      const text = (this.text || '').trim()
      if (text.length > 200) {
        uni.showToast({ title: '文字最多 200 字', icon: 'none' })
        return
      }
      if (!text && this.images.length === 0) {
        uni.showToast({ title: '请输入内容或添加图片', icon: 'none' })
        return
      }
      if (this.images.length > 9) {
        uni.showToast({ title: '最多上传 9 张图片', icon: 'none' })
        return
      }
      this.submitting = true
      try {
        // 调用发布帖子接口
        const response = await createCommunityPost(text, this.images, 1);
        if (response && response.success) {
          uni.showToast({ title: '已发布', icon: 'none' });
          setTimeout(() => {
            // 返回到美食圈首页
            uni.navigateBack({ delta: 1 });
          }, 400);
        } else {
          uni.showToast({ title: '发布失败，请重试', icon: 'none' });
        }
      } catch(e) {
        uni.showToast({ title: '发布失败，请重试', icon: 'none' });
      } finally {
        this.submitting = false;
      }
    }
  }
}
</script>

<style>
.publish-page { background: #f7f2e7; min-height: 100vh; }
.header { height: 88rpx; display: flex; align-items: center; padding: 0 24rpx; background: #fff; }
.title  { font-size: 32rpx; font-weight: 700; color: #111827; }
.form { padding: 16rpx 24rpx 40rpx; }
.textarea {
  width: 100%; min-height: 220rpx; background: #fff; border-radius: 20rpx;
  padding: 16rpx; box-shadow: 0 10rpx 24rpx rgba(0,0,0,0.06); font-size: 28rpx; color: #1f2937;
}
.imgs { margin-top: 16rpx; }
.row { display: flex; gap: 12rpx; align-items: center; }
.img-input {
  flex: 1; height: 72rpx; background: #fff; border-radius: 14rpx; padding: 0 16rpx; font-size: 26rpx;
  box-shadow: 0 6rpx 14rpx rgba(0,0,0,0.06);
}
.btn { height: 80rpx; line-height: 80rpx; text-align: center; border-radius: 16rpx; background: #f3f4f6; color: #374151; }
.btn.small { height: 72rpx; line-height: 72rpx; padding: 0 20rpx; }
.btn.primary { background: linear-gradient(90deg, #FFE27A 0%, #FFC107 100%); color: #fff; margin-top: 20rpx; }
.thumbs { margin-top: 12rpx; display: flex; gap: 12rpx; flex-wrap: wrap; align-items: center; }
.thumb { position: relative; width: 180rpx; height: 180rpx; border-radius: 14rpx; overflow: hidden; background: #eee; }
.thumbs .count { font-size: 24rpx; color: #6b7280; margin-right: 8rpx; }
.thumb image { width: 100%; height: 100%; }
.thumb .del { position: absolute; top: 6rpx; right: 10rpx; color: #fff; background: rgba(0,0,0,0.5); border-radius: 50%; padding: 0 8rpx; }
</style>