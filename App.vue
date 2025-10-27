<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检查登录状态
			this.checkLogin();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 检查登录状态
			checkLogin() {
				// 检查是否有用户信息
				const userInfo = uni.getStorageSync('userInfo');
				if (!userInfo) {
					// 如果没有用户信息，不自动执行登录
					console.log('用户未登录');
				}
			},
			
			// 微信登录
			wxLogin() {
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log('登录成功', loginRes);
						// 获取用户信息
						uni.getUserProfile({
							desc: '用于完善会员资料',
							success: (userRes) => {
								console.log('获取用户信息成功', userRes);
								// 发送code和用户信息到后端进行登录验证
								this.syncUserInfoToServer(loginRes.code, userRes.userInfo);
							},
							fail: (err) => {
								console.log('获取用户信息失败', err);
								uni.showToast({
									title: '需要授权才能使用完整功能',
									icon: 'none'
								});
							}
						});
					},
					fail: (err) => {
						console.log('登录失败', err);
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						});
					}
				});
				// #endif
			},
			
			// 同步用户信息到服务器
			syncUserInfoToServer(code, userInfo) {
				// 这里调用后端接口，将code和用户信息发送到服务器进行验证
				uni.request({
					url: 'http://localhost:8080/api/login', // 后端登录接口地址
					method: 'POST',
					header: {
						'content-type': 'application/json'
					},
					data: {
						code: code,
						userInfo: userInfo // 传递用户信息给后端
					},
					success: (res) => {
						console.log('登录成功', res.data);
						if (res.data && res.data.token) {
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync('userInfo', res.data.userInfo);
							uni.showToast({ 
								title: '登录成功', 
								icon: 'success' 
							});
							// 登录成功后刷新当前页面
							const pages = getCurrentPages();
							const currentPage = pages[pages.length - 1];
							if (currentPage && typeof currentPage.onLoad === 'function') {
								currentPage.onLoad(currentPage.options);
							}
						} else {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.log('同步用户信息到服务器失败', err);
						uni.showToast({
							title: '服务器连接失败',
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>