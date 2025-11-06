const { request } = require('./request.js');

// 微信授权登录
function wechatLogin(code) {
    return request('/api/user/login', { code }, 'POST', { 'Token': '' });
}

// 退出登录
function logout() {
    return request('/api/logout', {}, 'POST');
}

// 获取用户信息
function getUserInfo() {
    return request('/api/user/info', {}, 'GET');
}

// 更新用户信息
function updateUserInfo(userInfo) {
    return request('/api/user/update', userInfo, 'POST');
}

// 更新用户头像
function updateUserAvatar(avatarUrl) {
    return request('/api/user/update-avatar', { avatar: avatarUrl }, 'POST');
}

module.exports = {
    wechatLogin,
    logout,
    getUserInfo,
    updateUserInfo,
    updateUserAvatar
}