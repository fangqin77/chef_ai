
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
      
      // 定义不需要登录的公共接口路径
      const publicPaths = [
        '/api/recipes/list',
        '/api/recipes/random',
        '/api/recipes/by-category',
        '/api/recipes/search',
        '/api/recipes/all-categories'
      ];
      
      // 添加 Token 头（跳过登录接口和公共接口）
      if (token && !path.includes('/api/user/login')) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (!token && !path.includes('/api/user/login') && !publicPaths.some(publicPath => path.includes(publicPath))) {
        // 如果token为空且不是登录接口或公共接口，直接跳转到登录页面
        uni.showToast({ title: '请先登录', icon: 'none' });
        uni.navigateTo({ url: '/pages/login/index' });
        reject(new Error('用户未登录'));
        return;
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
            
            // 解析响应数据（可能是字符串格式的JSON）
            let responseData = res.data;
            if (typeof responseData === 'string') {
              try {
                responseData = JSON.parse(responseData);
              } catch (parseError) {
                console.warn('解析响应数据失败:', parseError);
              }
            }
            
            // 处理 401 未授权或用户未登录错误
            if (res.statusCode === 401 || 
                (responseData && responseData.success === false && (responseData.code === 401 || responseData.message === '用户未登录'))) {
              // 不自动清除token，只返回错误信息，让调用方决定如何处理
              console.warn('Token已失效，但不自动清除');
              
              if (responseData?.msg || responseData?.message) {
                reject(new Error(responseData.msg || responseData.message));
              } else {
                reject(new Error('用户登录状态已失效，请重新登录'));
              }
              return;
            }
            
            // 处理其他错误状态码或 success: false
            if (res.statusCode !== 200 || (responseData && responseData.success === false)) {
              // 特殊处理"已收藏"的情况，将success改为true，因为操作实际上是成功的
              if (responseData && responseData.message && responseData.message.includes('已收藏')) {
                resolve({
                  ...responseData,
                  success: true,
                  message: '收藏成功'
                });
                return;
              }
              
              // 为DELETE操作提供更具体的错误信息
              let errorMsg = responseData?.msg || responseData?.message;
              if (!errorMsg && method === 'DELETE') {
                errorMsg = '删除失败，可能原因：权限不足、帖子不存在或已被删除';
              } else if (!errorMsg) {
                errorMsg = '请求失败，请重试';
              }
              
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
