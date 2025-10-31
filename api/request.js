
import { BASE_URL } from './config'
/**
 * 通用请求封装
 * @param {string} path - 接口路径（可以是相对路径或完整URL）
 * @param {Object} data - 请求数据
 * @param {string} method - 请求方法（GET/POST/PUT/DELETE）
 * @returns Promise
 */
export function request(path, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    // 拼接完整 URL
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`
    
    console.log('请求URL:', url) // 调试日志

    uni.request({
      url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        // 如果需要 token，可在此处加上 Authorization
        // 'Authorization': uni.getStorageSync('token') || ''
      },
      success(res) {
        console.log('请求响应:', res.statusCode, res.data) // 调试日志
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          console.error('请求错误：', res)
          let errorMsg = '服务器错误'
          if (res.statusCode === 502) {
            errorMsg = '后端服务不可达，请检查服务是否启动'
          }
          uni.showToast({
            title: errorMsg,
            icon: 'none'
          })
          reject(res)
        }
      },
      fail(err) {
        console.error('请求失败：', err)
        uni.showToast({
          title: '网络连接失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}
