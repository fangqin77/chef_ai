const { request } = require('./request');

/**
 * 按关键字搜索菜品（名称/标签）
 * @param {string} name - 菜名关键字（可选）
 * @param {string} tag - 标签关键字（可选）
 * @returns {Promise<any>}
 */
function searchFoods(name, tag) {
  const params = {};
  if (name) params.name = name;
  if (tag) params.tag = tag;
  return request('/api/foods/search', params, 'GET');
}

/**
 * 精准按菜名搜索
 * @param {string} name - 菜名关键字（必填）
 * @returns {Promise<any>}
 */
function searchByName(name) {
  return request('/api/foods/search/by-name', { name }, 'GET');
}

/**
 * 按标签筛选菜品
 * @param {string} tag - 标签值（必填）
 * @returns {Promise<any>}
 */
function searchByTag(tag) {
  return request('/api/foods/search/by-tag', { tag }, 'GET');
}

/**
 * 高级多条件查询（id + 名称 + 标签）
 * @param {Object} params - 查询参数
 * @param {number} params.id - 菜品id（可选）
 * @param {string} params.foodName - 菜名关键字（可选）
 * @param {string} params.tag - 标签关键字（可选）
 * @returns {Promise<any>}
 */
function queryFoods(params) {
  return request('/api/foods/query', params, 'GET');
}

/**
 * 获取所有分类标签
 * @returns {Promise<any>}
 */
function getAllTags() {
  return request('/api/foods/tags', {}, 'GET');
}

/**
 * 按ID获取美食详情
 * @param {number} id - 美食ID
 * @returns {Promise<any>}
 */
function getFoodById(id) {
  // 直接使用 queryFoods，它会调用 /api/foods/query?id=xxx
  return queryFoods({ id });
}

/**
 * 按城市获取美食列表
 * @param {string} city - 城市名称
 * @returns {Promise<any>}
 */
function getFoodsByCity(city) {
  return request('/api/foods/city', { city }, 'GET');
}

/**
 * 按城市和标签获取美食列表
 * @param {string} city - 城市名称
 * @param {string} tag - 标签
 * @returns {Promise<any>}
 */
function getFoodsByCityAndTag(city, tag) {
  return request('/api/foods/city-tag', { city, tag }, 'GET');
}

/**
 * 按特色标签筛选美食（支持多选）
 * @param {Array<string>} tags - 特色标签数组，如 ['非遗美食', '网红打卡']。不传或空数组时返回全部美食
 * @returns {Promise<any>}
 */
function getFoodsByFeatureTags(tags) {
  // request 函数的 buildQueryString 已支持数组参数
  // tags=['非遗美食', '网红打卡'] 会自动转换为 tags=非遗美食&tags=网红打卡
  const params = (tags && tags.length > 0) ? { tags } : {};
  return request('/api/foods/feature-tags', params, 'GET');
}

module.exports = {
  searchFoods,
  searchByName,
  searchByTag,
  queryFoods,
  getAllTags,
  getFoodById,
  getFoodsByCity,
  getFoodsByCityAndTag,
  getFoodsByFeatureTags
};
