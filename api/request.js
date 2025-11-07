
const { BASE_URL } = require('./config')
/**
 * 通用请求封装
 * @param {string} path - 接口路径（可以是相对路径或完整URL）
 * @param {Object} data - 请求数据（日期字段需格式化为 yyyy-MM-dd）
 * @param {string} method - 请求方法（GET/POST/PUT/DELETE）
 * @param {Object} customHeaders - 自定义请求头
 * @returns Promise
 */
function request(path, data = {}, method = 'GET', customHeaders = {}) {
  return new Promise((resolve, reject) => {
    try {
      // 拼接完整 URL，自动处理路径格式
      const url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`
      
      console.log('请求URL:', url)

      // 获取 token（统一使用 'token' 作为键名）
      const token = uni.getStorageSync('token')
      
      // 构建请求头
      const headers = {
        'Content-Type': 'application/json',
        ...customHeaders
      }
      
      // 添加 Token 头（跳过登录接口）
      if (token && !path.includes('/api/user/login')) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // 统一处理日期字段（确保 yyyy-MM-dd 格式）
      const processedData = { ...data };
      Object.keys(processedData).forEach(key => {
        if (processedData[key] instanceof Date) {
          processedData[key] = processedData[key].toISOString().split('T')[0];
        }
      });

      uni.request({
        url, 
        method,
        data: processedData,
        header: headers,
        success(res) {
          try {
            console.log('请求响应:', res.statusCode, res.data)
            
            // 处理 401 未授权或 success: false
            if (res.statusCode === 401 || (res.data && res.data.success === false && res.data.code === 401)) {
              uni.removeStorageSync('token');
              uni.showToast({
                title: res.data?.msg || '登录已过期，请重新登录',
                icon: 'none'
              });
              uni.navigateTo({ url: '/pages/login/index' });
              reject(new Error(res.data?.msg || '未授权，请重新登录'));
              return;
            }
            
            // 处理其他错误状态码或 success: false
            if (res.statusCode !== 200 || (res.data && res.data.success === false)) {
              // 特殊处理"已收藏"的情况，将success改为true，因为操作实际上是成功的
              if (res.data && res.data.message && res.data.message.includes('已收藏')) {
                resolve({
                  ...res.data,
                  success: true,
                  message: '收藏成功'
                });
                return;
              }
              
              const errorMsg = res.data?.msg || res.data?.message || '请求失败，请重试';
              uni.showToast({ title: errorMsg, icon: 'none' });
              reject(new Error(errorMsg));
              return;
            }
            
            resolve(res.data);
          } catch (err) {
            console.error('处理响应数据失败:', err);
            uni.showToast({ title: '处理数据失败', icon: 'none' });
            reject(err);
          }
        },
        fail(err) {
          console.error('请求失败:', err);
          uni.showToast({ 
            title: err.errMsg || '网络连接失败', 
            icon: 'none' 
          });
          reject(err);
        }
      });
    } catch (err) {
      console.error('请求封装异常:', err);
      uni.showToast({ title: '请求异常', icon: 'none' });
      reject(err);
    }
  });
}

module.exports = {
  request
};
