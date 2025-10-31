import { request } from './request'

// 获取所有菜谱
export function getRecipes() {
  return request('/api/recipes/list', {}, 'GET')
}

// 获取菜谱详情
export function getRecipeDetail(id) {
  return request(`/api/recipes/${id}`, {}, 'GET')
}

// 获取分类列表
export function getCategories() {
  return request('/api/recipes/categories', {}, 'GET')
}

// 根据分类获取菜谱
export function getRecipesByCategory(categoryId, limit) {
  return request('/api/recipes', { categoryId, limit }, 'GET')
}

// 搜索菜谱
export function searchRecipes(keyword) {
  return request('/api/recipes/search', { keyword }, 'GET')
}

// 随机获取菜谱
export function getRandomRecipes(count) {
  return request('/api/recipes/random', { count }, 'GET')
}

// 根据后端返回的菜谱类型ID映射到前端分类key
export function mapTypeIdToCat(typeId) {
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
export const DEFAULT_COVER = '/static/default-recipe-cover.jpg'
