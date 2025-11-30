// 用户相关接口
const { request } = require('./request');

/**
 * 微信授权登录（获取 token + 注册/更新用户）
 * POST /api/user/login
 * @param {{code: string, userInfo?: {nickName?: string, avatarUrl?: string, gender?: number, city?: string, province?: string, country?: string}}} payload
 * @returns {Promise<{success: boolean, message: string, data?: {token: string, userId?: string}}>}
 */
function login(payload) {
  return request('/api/user/login', payload, 'POST');
}

/**
 * 统一登录流程（UniApp Vue2）
 * - 调用 uni.login 拿 code
 * - 调 /api/user/login 换 token
 * - token 持久化到 Storage
 * @returns {Promise<{token: string, userId?: string, nickname?: string, avatarUrl?: string}>}
 */
async function doWxLoginAndSave() {
  const code = await new Promise((resolve, reject) => {
    uni.login({
      success: (res) => resolve(res.code),
      fail: reject
    });
  });
  const resp = await login({ code });
  if (resp && resp.success && resp.data && resp.data.token) {
    try { uni.setStorageSync('token', resp.data.token); } catch (_) {}
    return resp.data;
  }
  throw new Error(resp?.message || '登录失败');
}

module.exports = {
  login,
  doWxLoginAndSave
};