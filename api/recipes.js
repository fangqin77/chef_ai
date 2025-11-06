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

// 添加收藏
function addFavorite(recipeId) {
  return request(`/api/recipes/${recipeId}/favorite`, {}, 'POST');
}

// 取消收藏
function removeFavorite(recipeId) {
  return request(`/api/recipes/${recipeId}/favorite`, {}, 'DELETE');
}

// 检查是否已收藏
function isFavorite(recipeId) {
  return request(`/api/recipes/${recipeId}/favorite`, {}, 'GET');
}

// 获取用户收藏列表
function getUserFavorites(page = 1, pageSize = 10) {
  return request(`/api/recipes/favorites?page=${page}&pageSize=${pageSize}`, {}, 'GET');
}

// 获取菜谱被收藏次数
function getRecipeFavoriteCount(recipeId) {
  return request(`/api/recipes/${recipeId}/favorite-count`, {}, 'GET');
}

// 添加到每日菜谱（通过收藏接口）
function addToDailyRecipes(recipeId, date) {
  return request(`/api/recipes/${recipeId}/add-to-daily?date=${date}`, {}, 'POST');
}

// 从每日菜谱中移除
function removeFromDailyRecipes(recipeId, date) {
  return request(`/api/recipes/${recipeId}/remove-from-daily?date=${date}`, {}, 'DELETE');
}

// 获取社区帖子列表
function getCommunityPosts(page = 1, pageSize = 10, keyword = null, userId = null) {
  return request('/api/community/posts', { page, pageSize, keyword, userId }, 'GET');
}

// 发布社区帖子
function createCommunityPost(content, mediaList = [], visibility = 1) {
  return request('/api/community/posts', { content, mediaList, visibility }, 'POST');
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
  addFavorite,
  removeFavorite,
  isFavorite,
  getUserFavorites,
  getRecipeFavoriteCount,
  addToDailyRecipes,
  removeFromDailyRecipes,
  getCommunityPosts,
  createCommunityPost,
  likePost,
  cancelLikePost,
  createComment
}
