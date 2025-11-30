const { request } = require('./request');

/**
 * 返回所有非遗信息
 * @returns {Promise<any>}
 */
function getAllHeritages() {
  return request('/api/heritages', {}, 'GET');
}

/**
 * 按分类查询非遗
 * @param {string} type - 分类类型
 * @returns {Promise<any>}
 */
function getHeritagesByType(type) {
  return request('/api/heritages/type', { type }, 'GET');
}

/**
 * 按关键词模糊搜索非遗
 * @param {string} keyword - 搜索关键词
 * @returns {Promise<any>}
 */
function searchHeritages(keyword) {
  return request('/api/heritages/search', { keyword }, 'GET');
}

function getHeritageById(id) {
  // 首选按ID查询端点；若你的后端是 /api/heritages/{id}，可在 request 内部处理路径参数
  return request('/api/heritages/detail', { id }, 'GET');
}

module.exports = {
  getAllHeritages,
  getHeritagesByType,
  searchHeritages,
  getHeritageById
};

