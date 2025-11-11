const { request } = require('./request')

// 获取所有菜谱
function getRecipes() {
  return request('/api/recipes/list', {}, 'GET')
}

// 获取菜谱详情
function getRecipeDetail(id) {
  return request(`/api/recipes/${id}`, {}, 'GET')
}

// 获取分类列表
function getCategories() {
  return request('/api/recipes/all-categories', {}, 'GET')
}

// 根据分类获取菜谱
function getRecipesByCategory(categoryId, limit) {
  return request(`/api/recipes/by-category?categoryId=${categoryId}`, { limit }, 'GET')
}

// 搜索菜谱
function searchRecipes(keyword) {
  return request('/api/recipes/search', { keyword }, 'GET')
}

// 随机获取菜谱
function getRandomRecipes(count) {
  return request('/api/recipes/random', { id: count }, 'GET')
}

// 根据后端返回的菜谱类型ID映射到前端分类key
function mapTypeIdToCat(typeId) {
  const typeMap = {
    1: 'cn',      // 中式
    2: 'west',     // 西式
    3: 'jp',       // 日式
    4: 'kr',       // 韩式
    5: 'chuancai', // 川菜
    6: 'yuecai',   // 粤菜
    7: 'xianggai', // 湘菜
    8: 'zhecai',   // 浙菜
    9: 'dongbei',  // 东北
    10: 'xibei',   // 西北
    11: 'jiachang', // 家常
    12: 'sushi',   // 素食
    13: 'shaokao', // 烧烤
    14: 'tianpin'  // 甜品
  }
  return typeMap[typeId] || 'all'
}

// 默认封面图片URL（可以根据需要替换）
const DEFAULT_COVER = '/static/default-recipe-cover.jpg'

// ========== 收藏与计划管理接口（RecipePlanController） ==========

// 1. 设置收藏并选择计划日期（幂等操作）
function addFavoriteWithDate(recipeId, planCookDate) {
  return request(`/api/recipes/favorites/plan?recipeId=${recipeId}&planCookDate=${planCookDate}`, {}, 'POST');
}

// 2. 获取每日菜谱（获取今日的菜谱）
function getDailyFavorites() {
  return request('/api/recipes/favorites/plan/daily', {}, 'GET');
}

// 3. 修改计划日期
function updatePlanDate(recipeId, planCookDate) {
  return request(`/api/recipes/favorites/plan/update?recipeId=${recipeId}&planCookDate=${planCookDate}`, {}, 'PUT');
}

// 4. 取消计划
function cancelPlan(recipeId) {
  return request(`/api/recipes/favorites/plan/cancel?recipeId=${recipeId}`, {}, 'PUT');
}

// 5. 取消收藏（删除收藏记录）
function removeFavorite(recipeId) {
  return request(`/api/recipes/${recipeId}/favorite`, {}, 'DELETE');
}

// 6. 取消计划/移除每日菜谱（保留收藏记录）
function cancelPlanWithFavorite(recipeId) {
  return request(`/api/recipes/favorites/plan/cancel?recipeId=${recipeId}`, {}, 'PUT');
}

// ========== 社区功能接口 ==========

// 获取社区帖子列表
function getCommunityPosts(page = 1, pageSize = 10, keyword = null, userId = null) {
  // 构建参数对象，当userId为null时不传递该参数
  const params = { page, pageSize };
  if (keyword !== null) params.keyword = keyword;
  if (userId !== null && userId !== 'current') params.userId = userId;
  
  // 如果是获取当前用户的作品，使用不同的接口
  if (userId === 'current') {
    return request('/api/community/posts/my', params, 'GET');
  }
  
  return request('/api/community/posts', params, 'GET');
}

// 发布社区帖子
function createCommunityPost(content, mediaList = [], visibility = 1) {
  console.log('调用 createCommunityPost 接口，参数:', { content, mediaList, visibility });
  
  // 检查当前token状态
  const currentToken = uni.getStorageSync('token');
  console.log('当前token状态:', currentToken ? 'token存在' : 'token不存在');
  
  if (!currentToken) {
    console.error('发布失败: token不存在');
    return Promise.reject(new Error('发布失败：请先登录后再发布内容'));
  }
  
  // 添加额外的token验证请求，确认token有效性
  return new Promise((resolve, reject) => {
    // 先验证token是否有效
    uni.request({
      url: 'http://172.20.10.3:9000/api/user/info',
      method: 'GET',
      header: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json'
      },
      success: (res) => {
        // 如果token验证通过，再调用发布接口
        request('/api/community/posts', { content, mediaList, visibility }, 'POST')
          .then(response => {
            console.log('createCommunityPost 接口响应:', response);
            resolve(response);
          })
          .catch(error => {
            console.error('createCommunityPost 接口错误:', error);
            
            // 如果是401错误，提供更友好的错误信息
            if (error.message.includes('用户未登录') || error.message.includes('未授权') || error.message.includes('登录状态已失效')) {
              console.error('发布失败原因: 用户登录状态失效，当前token:', currentToken);
              reject(new Error('发布失败：登录状态已失效，请重新登录'));
            } else {
              reject(error);
            }
          });
      },
      fail: (err) => {
        console.error('token验证失败:', err);
        reject(new Error('登录状态已失效，请重新登录'));
      }
    });
  });
}

// 点赞帖子
function likePost(postId) {
  return request(`/api/community/posts/${postId}/like`, {}, 'POST');
}

// 取消点赞帖子
function cancelLikePost(postId) {
  return request(`/api/community/posts/${postId}/like`, {}, 'DELETE');
}

// 发表评论
function createComment(postId, content, parentId = null) {
  return request(`/api/community/posts/${postId}/comments`, { content, parentId }, 'POST');
}

// 编辑社区帖子
function updateCommunityPost(postId, content, mediaList = [], visibility = 1) {
  return request(`/api/community/posts/${postId}`, { content, mediaList, visibility }, 'PUT');
}

// 删除社区帖子
function deleteCommunityPost(postId) {
  return request(`/api/community/posts/${postId}/delete`, {}, 'POST');
}

// 修改评论
function updateComment(commentId, content) {
  return request(`/api/community/comments/${commentId}`, { content }, 'PUT');
}

// 删除评论
function deleteComment(commentId) {
  return request(`/api/community/comments/${commentId}`, {}, 'DELETE');
}

// 修改评论
function updateComment(commentId, content) {
  return request(`/api/community/comments/${commentId}`, { content }, 'PUT');
}

// 获取用户收藏的帖子列表
function getUserFavorites(page = 1, pageSize = 20) {
  return request('/api/community/posts/favorites', { page, pageSize }, 'GET');
}

// 获取用户发表的评论列表
function getUserComments(page = 1, pageSize = 20) {
  return request('/api/community/comments/my', { page, pageSize }, 'GET');
}

// 获取用户通知
function getUserNotifications() {
  return request('/api/notifications', {}, 'GET');
}

// 获取用户浏览历史
function getUserBrowsingHistory(page = 1, pageSize = 20) {
  return request('/api/browsing/history', { page, pageSize }, 'GET');
}

// 获取用户发布的帖子列表（包含用户昵称和头像）
function getUserPublishedPosts(page = 1, pageSize = 10) {
  return request('/api/community/posts/my/view', { page, pageSize }, 'GET');
}

// 通过评论ID获取对应帖子详情
function getPostByCommentId(commentId) {
  return request(`/api/community/comments/${commentId}/post`, {}, 'GET');
}

// 记录浏览历史
function recordBrowsingHistory(postId) {
  return request(`/api/browsing/history/record?postId=${postId}`, {}, 'POST');
}

// 清空浏览历史
function clearBrowsingHistory() {
  return request('/api/browsing/history', {}, 'DELETE');
}

// 获取用户简介信息
function getUserIntroduction() {
  return request('/api/user/introduction', {}, 'GET');
}

// ========== 关注功能接口 ==========

// 关注用户
function followUser(targetId) {
  return request(`/api/user/follows/${targetId}`, {}, 'POST');
}

// 取消关注用户
function unfollowUser(targetId) {
  return request(`/api/user/follows/${targetId}`, {}, 'DELETE');
}

// 获取关注/粉丝统计
function getFollowStats() {
  return request('/api/user/follows/stats', {}, 'GET');
}

// 获取我关注的列表
function getFollowingList(page = 1, pageSize = 20) {
  return request('/api/user/follows/following', { page, pageSize }, 'GET');
}

// 获取我的粉丝列表
function getFollowersList(page = 1, pageSize = 20) {
  return request('/api/user/follows/followers', { page, pageSize }, 'GET');
}

// 检查是否已关注该用户
function checkIsFollowed(targetId) {
  return request(`/api/user/follows/check/${targetId}`, {}, 'GET');
}

// ========== 图片上传接口 ==========

// 上传媒体文件（图片/视频）
// 方法/路径：POST /api/media/upload
// 请求：multipart/form-data，字段 file
function uploadMedia(filePath, retryCount = 0) {
  return new Promise((resolve, reject) => {
    // 验证文件路径
    if (!filePath || filePath.trim() === '') {
      reject(new Error('文件路径为空'));
      return;
    }
    
    // 检查文件是否存在（在微信小程序中有限制）
    uni.getFileInfo({
      filePath: filePath,
      success: (fileInfo) => {
        if (fileInfo.size === 0) {
          reject(new Error('文件为空'));
          return;
        }
        
        // 检查文件大小（限制为10MB）
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (fileInfo.size > maxSize) {
          reject(new Error(`文件过大，请选择小于10MB的文件`));
          return;
        }
        
        // 检查token是否存在
        const token = uni.getStorageSync('token');
        if (!token) {
          reject(new Error('用户未登录，请先登录'));
          return;
        }
        
        // 开始上传
        uni.uploadFile({
          url: 'http://172.20.10.3:9000/api/media/upload',
          filePath: filePath,
          name: 'file',
          header: {
            'Authorization': `Bearer ${token}`
            // 不要手动设置Content-Type，uni.uploadFile会自动处理multipart边界
          },
          success: (res) => {
            console.log('上传响应状态码:', res.statusCode, '数据:', res.data);
            try {
              const data = JSON.parse(res.data || '{}');
              
              // 处理 401 未授权或用户未登录错误
              if (res.statusCode === 401 || 
                  (data && data.success === false && (data.code === 401 || data.message === '用户未登录'))) {
                console.error('图片上传时token失效，但不自动清除token');
                
                if (data?.msg || data?.message) {
                  reject(new Error(data?.msg || data?.message));
                } else {
                  reject(new Error('图片上传失败：用户登录状态已失效'));
                }
                return;
              }
              
              if (res.statusCode === 200 && data.success && data.url) {
                // 直接返回服务器返回的URL
                resolve(data.url);
              } else {
                // 如果是网络错误，尝试重试
                if (retryCount < 2 && res.statusCode >= 500) {
                  console.log(`上传失败，第${retryCount + 1}次重试...`);
                  setTimeout(() => {
                    uploadMedia(filePath, retryCount + 1).then(resolve).catch(reject);
                  }, 1000);
                  return;
                }
                
                const errorMsg = data.message || `上传失败: ${res.statusCode}`;
                reject(new Error(errorMsg));
              }
            } catch (error) {
              reject(new Error('解析响应失败: ' + res.data));
            }
          },
          fail: (err) => {
            // 如果是网络错误，尝试重试
            if (retryCount < 2) {
              console.log(`上传请求失败，第${retryCount + 1}次重试...`);
              setTimeout(() => {
                uploadMedia(filePath, retryCount + 1).then(resolve).catch(reject);
              }, 1000);
              return;
            }
            reject(new Error('上传请求失败: ' + err.errMsg));
          }
        });
      },
      fail: (err) => {
        reject(new Error('文件不存在或无法访问: ' + err.errMsg));
      }
    });
  });
}

// 更新用户头像
// 方法/路径：POST /api/user/update-avatar
// Header： Token
// Body： { "avatar": "<上一步返回的url>" }
function updateUserAvatar(avatarUrl) {
  return request('/api/user/update-avatar', { avatar: avatarUrl }, 'POST');
}

// 获取当前用户信息
// 方法/路径：GET /api/user/info
// Header： Token
function getUserInfo() {
  return request('/api/user/info', {}, 'GET');
}

// 批量上传图片
async function uploadImages(filePaths) {
  console.log('开始批量上传图片，数量:', filePaths.length);
  
  // 检查当前token状态
  const currentToken = uni.getStorageSync('token');
  console.log('图片上传前token状态:', currentToken ? 'token存在' : 'token不存在');
  
  if (!currentToken) {
    throw new Error('用户未登录，请先登录后再上传图片');
  }
  
  const uploadPromises = filePaths.map(filePath => uploadMedia(filePath));
  try {
    const uploadedUrls = await Promise.all(uploadPromises);
    
    // 检查是否有图片上传失败
    const failedUploads = uploadedUrls.filter(url => !url);
    if (failedUploads.length > 0) {
      console.warn('部分图片上传失败:', failedUploads.length);
      // 只返回成功上传的URL
      return uploadedUrls.filter(url => url);
    }
    
    console.log('图片批量上传成功，URL数量:', uploadedUrls.length);
    return uploadedUrls;
  } catch (error) {
    console.error('图片批量上传失败:', error);
    
    // 如果是401错误，说明token在图片上传过程中失效了
    if (error.message.includes('未授权') || error.message.includes('用户未登录')) {
      console.error('图片上传过程中token失效，当前token:', currentToken);
      throw new Error('图片上传失败：用户登录状态已失效，请重新登录后再试');
    }
    
    throw error;
  }
}

module.exports = {
  getRecipes,
  getRecipeDetail,
  getCategories,
  getRecipesByCategory,
  searchRecipes,
  getRandomRecipes,
  mapTypeIdToCat,
  DEFAULT_COVER,
  uploadMedia,
  updateUserAvatar,
  getUserInfo,
  // 收藏与计划管理接口
  addFavoriteWithDate,
  getDailyFavorites,
  updatePlanDate,
  cancelPlan,
  removeFavorite,
  cancelPlanWithFavorite,
  // 社区功能接口
  getCommunityPosts,
  createCommunityPost,
  likePost,
  cancelLikePost,
  createComment,
  updateCommunityPost,
  deleteCommunityPost,
  getUserFavorites,
  getUserComments,
  deleteComment,
  updateComment,
  // 新添加的接口
  getUserNotifications,
  getUserBrowsingHistory,
  getUserPublishedPosts,
  getPostByCommentId,
  // 新增接口
  recordBrowsingHistory,
  clearBrowsingHistory,
  getUserIntroduction,
  // 图片上传接口
  uploadImages,
  // 关注功能接口
  followUser,
  unfollowUser,
  getFollowStats,
  getFollowingList,
  getFollowersList,
  checkIsFollowed
}