// 打卡相关接口
const { request } = require('./request');
const { BASE_URL } = require('./config');

/**
 * 解析定位：经纬度 → 地址 + 周边 POI 列表
 * GET /api/checkin/get-location
 * @param {{longitude: number, latitude: number}} params
 * @returns {Promise<{formattedAddress: string, poiList: Array}>}
 */
function getLocation(params) {
  return request('/api/checkin/get-location', params, 'GET');
}

/**
 * 提交打卡（图片 + 文案 + 定位）
 * POST /api/checkin/add
 * - 若有多张图片：逐张以字段名 images 上传；返回最后一次响应
 * - 若无图片：以 JSON 直接 POST（后端若仅接受 multipart，可据需调整）
 * - 鉴权：使用 Authorization: Bearer {token}
 * @param {{
 *   locationName: string,
 *   longitude: number|string,
 *   latitude: number|string,
 *   content?: string,
 *   imagePaths?: string[]  // 本地临时路径（wx.chooseMedia/chooseImage 返回）
 * }} payload
 * @returns {Promise<any>}
 */
async function addCheckin(payload) {
  const { locationName, longitude, latitude, content, imagePaths } = payload || {};
  const baseForm = { locationName, longitude, latitude };
  if (content) baseForm.content = content;

  // 无图片：直接 JSON 提交，由 request.js 注入 Authorization
  if (!imagePaths || imagePaths.length === 0) {
    return request('/api/checkin/add', baseForm, 'POST');
  }

  // 有图片：逐张上传，字段名均为 images；需要手动带上 Authorization 头
  const url = `${BASE_URL}/api/checkin/add`;
  let token = '';
  try { token = uni.getStorageSync('token') || ''; } catch (_) { token = ''; }
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const uploadOne = (filePath) => new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      name: 'images',
      filePath,
      formData: baseForm,
      header: headers,
      success(res) {
        // 兼容后端返回纯文本或 JSON
        try {
          const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          resolve(data);
        } catch (_) {
          resolve(res.data);
        }
      },
      fail: reject
    });
  });

  let last = null;
  for (let i = 0; i < imagePaths.length; i++) {
    last = await uploadOne(imagePaths[i]);
  }
  return last;
}

/**
 * 查询“我的”打卡列表（使用 token）
 * GET /api/checkin/me
 * @param {{page?: number, size?: number}} params
 * @returns {Promise<Array|{list:Array,page:number,size:number,total?:number}>}
 */
function getMyCheckins({ page = 1, size = 10 } = {}) {
  return request(`/api/checkin/me`, { page, size }, 'GET');
}

/**
 * 定位并拉取候选地点（地址 + POI 列表）
 * @returns {Promise<{latitude:number, longitude:number, formattedAddress?: string, poiList?: Array}>}
 */
async function fetchLocationCandidates() {
  const { latitude, longitude } = await new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success: (res) => resolve({ latitude: res.latitude, longitude: res.longitude }),
      fail: reject
    });
  });
  const info = await getLocation({ latitude, longitude });
  return { ...info, latitude, longitude };
}

/**
 * 提交打卡的快捷流程（选择图片可选）
 * @param {{ locationName: string, longitude: number|string, latitude: number|string, content?: string, maxImageCount?: number }} params
 * @returns {Promise<any>}
 */
async function submitCheckinFlow({ locationName, longitude, latitude, content = '', maxImageCount = 9 }) {
  // 需要先完成登录以获取 token
  let token = '';
  try { token = uni.getStorageSync('token') || ''; } catch (_) { token = ''; }
  if (!token) throw new Error('用户未登录，请先授权');

  let imagePaths = [];
  try {
    const res = await uni.chooseImage({ count: maxImageCount });
    imagePaths = res.tempFilePaths || [];
  } catch (_) {
    imagePaths = [];
  }

  return addCheckin({ locationName, longitude, latitude, content, imagePaths });
}

/**
 * 加载“我的打卡列表”
 * @param {number} [page=1]
 * @param {number} [size=10]
 * @returns {Promise<Array>}
 */
async function loadMyCheckins(page = 1, size = 10) {
  let token = '';
  try { token = uni.getStorageSync('token') || ''; } catch (_) { token = ''; }
  if (!token) throw new Error('用户未登录，请先授权');

  const res = await getMyCheckins({ page, size });
  if (Array.isArray(res)) return res;
  if (res && res.data && Array.isArray(res.data.list)) return res.data.list;
  if (res && Array.isArray(res.data)) return res.data;
  return [];
}

module.exports = {
  getLocation,
  addCheckin,
  getMyCheckins,
  fetchLocationCandidates,
  submitCheckinFlow,
  loadMyCheckins
};