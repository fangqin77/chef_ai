<script>
import { wechatLogin } from './api/user.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.checkLoginStatus();
			// 监听登录触发事件
			uni.$on('triggerLogin', () => {
				this.handleWechatLogin();
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 检查登录状态（不自动弹出登录提示）
			checkLoginStatus() {
				const token = uni.getStorageSync('token');
				console.log('App启动检查登录状态，token:', token ? 'token存在' : '未登录');
				// 不再自动弹出登录提示，让用户在需要时手动登录
			},
			// 显示登录授权弹窗
			showLoginModal() {
				uni.showModal({
					title: '需要登录',
					content: '请授权登录以继续操作',
					confirmText: '立即登录',
					cancelText: '稍后再说',
					confirmColor: '#ff8a34',
					success: (res) => {
						if (res.confirm) {
							this.handleWechatLogin();
						}
					}
				});
			},
			// 检查登录状态，未登录则触发授权弹窗
			checkLoginAndAuth() {
				const token = uni.getStorageSync('token');
				if (!token) {
					this.showLoginModal();
					return false;
				}
				return true;
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
				console.log('调用登录接口，微信code:', code);
				if (!code) {
					console.error('微信授权失败：未获取到code');
					uni.showToast({ title: '微信授权失败，请重试', icon: 'none' });
					return;
				}
				wechatLogin(code)
					.then(res => {
						console.log('登录接口返回:', JSON.stringify(res));
						// 直接根据状态码判断成功（如果后端未返回 success 字段）
						if (res && (res.success || res.token)) {
							// 保存token到本地存储
							const token = res.token || res.data?.token;
							console.log('保存token:', token);
							if (!token) {
								console.error('Token为空，请检查后端返回格式');
								uni.showToast({ title: '登录失败：Token无效', icon: 'none' });
								return;
							}
							uni.setStorageSync('token', token);
							console.log('Token已存储:', uni.getStorageSync('token'));
							uni.showToast({ title: '登录成功' });
							// 登录成功后刷新页面状态
							uni.$emit('userLoginSuccess');
							// 触发全局重试事件
							uni.$emit('retryFailedRequests');
							// 触发登录成功事件（用于首页接口调用）
							uni.$emit('loginSuccess');
							// 触发登录成功事件（用于首页接口调用）
							uni.$emit('loginSuccess');
						} else {
							uni.showToast({ title: res?.msg || '登录失败', icon: 'none' });
						}
					})
					.catch(err => {
						console.error('调用登录接口失败:', err);
						uni.showToast({ title: '网络错误，请重试', icon: 'none' });
					});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	page { background-color: #f7f2e7; }
</style>
