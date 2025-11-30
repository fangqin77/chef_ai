const { BASE_URL } = require('./config');

/**
 * 极简请求封装
 * - path 可为完整 URL 或相对路径（相对路径会用 BASE_URL 拼接）
 * - 不处理登录/Token、不进行日期格式化
 * - 成功直接返回 res.data，失败抛错
 * @param {string} path
 * @param {Object} data
 * @param {string} method
 * @param {Object} headers
 * @returns {Promise<any>}
 */
/**
 * 手动构建 query string（兼容小程序环境，支持数组参数）
 * @param {Object} params 
 * @returns {string}
 */
function buildQueryString(params) {
  const pairs = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        // 支持数组参数，例如 tags=['非遗美食', '网红打卡'] -> tags=非遗美食&tags=网红打卡
        if (Array.isArray(value)) {
          value.forEach(item => {
            if (item !== undefined && item !== null) {
              pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(item));
            }
          });
        } else {
          pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
      }
    }
  }
  return pairs.join('&');
}

function request(path, data = {}, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    try {
      const isFull = /^https?:\/\//.test(path);
      let url = isFull ? path : `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
      
      // 对于 GET 请求，将参数拼接到 URL 上
      if (method === 'GET' && data && Object.keys(data).length > 0) {
        const queryString = buildQueryString(data);
        if (queryString) {
          url += (url.includes('?') ? '&' : '?') + queryString;
        }
      }
      
      console.log('[request] ->', method, url, method === 'GET' ? {} : data);

      // 从本地读取 token，自动注入 Authorization 头
      let token = '';
      try { token = uni.getStorageSync('token') || ''; } catch (_) { token = ''; }
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

      uni.request({
        url,
        method,
        data: method === 'GET' ? {} : data, // GET 请求不传 data
        header: {
          'Content-Type': 'application/json',
          ...authHeader,
          ...headers
        },
        success(res) {
          console.log('[request] <-', method, url, res.statusCode, res.data);
          // 直接返回服务端数据（可能是对象或字符串）
          resolve(res.data);
        },
        fail(err) {
          console.error('[request] x ', method, url, err);
          reject(err);
        }
      });
    } catch (err) {
      console.error('[request] exception', err);
      reject(err);
    }
  });
}

module.exports = {
  request
};