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

// 获取用户信息
function getUserInfo() {
  return request('/api/user/info', {}, 'GET');
}

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
export function createCommunityPost(content, mediaList = [], visibility = 1) {
  console.log('调用 createCommunityPost 接口，参数:', { content, mediaList, visibility });
  return request('/api/community/posts', { content, mediaList, visibility }, 'POST')
    .then(response => {
      console.log('createCommunityPost 接口响应:', response);
      return response;
    })
    .catch(error => {
      console.error('createCommunityPost 接口错误:', error);
      throw error;
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
  return request(`/api/community/posts/${postId}`, {}, 'DELETE');
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

module.exports = {
  getRecipes,
  getRecipeDetail,
  getCategories,
  getRecipesByCategory,
  searchRecipes,
  getRandomRecipes,
  mapTypeIdToCat,
  DEFAULT_COVER,
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
  // 新添加的接口
  getUserNotifications,
  getUserBrowsingHistory
}
