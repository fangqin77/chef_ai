<template>
	<view>
		<!-- 这里放置您的页面内容 -->
		<router-view></router-view>
	</view>
</template>

<script>
	export default {
  onLaunch() {
    // 启动统一进入登录页
    // 如果需要“已登录直接进首页”，可在此判断 token 后跳首页
    try {
      const token = uni.getStorageSync('token')
      if (token) {
        // 已登录，进首页
        uni.reLaunch({ url: '/pages/index/index' })
      } else {
        // 未登录，进登录页
        uni.reLaunch({ url: '/pages/login/index' })
      }
    } catch (e) {
      uni.reLaunch({ url: '/pages/login/index' })
    }
  },

		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./uni.scss";
</style>