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

function getUserInfoById(userId) {
    // 如果后端没有实现按用户ID获取信息的接口，暂时返回默认信息
    // 或者调用当前用户信息接口（如果用户已登录）
    return new Promise((resolve, reject) => {
        try {
            const currentUser = uni.getStorageSync('userInfo');
            if (currentUser && currentUser.id === userId) {
                // 如果是当前用户，返回当前用户信息
                resolve(currentUser);
            } else {
                // 如果不是当前用户，返回默认信息
                resolve({
                    nickname: `用户${userId}`,
                    avatar: '/static/picture/profile.png'
                });
            }
        } catch (error) {
            // 如果获取失败，返回默认信息
            resolve({
                nickname: `用户${userId}`,
                avatar: '/static/picture/profile.png'
            });
        }
    });
}

module.exports = {
    wechatLogin,
    logout,
    getUserInfo,
    updateUserInfo,
    updateUserAvatar,
    getUserInfoById
}