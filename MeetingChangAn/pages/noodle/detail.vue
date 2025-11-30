<template>
  <view class="city-page">


    <!-- 顶部城市头图：满屏宽，展示上端，超出裁掉下端 -->
    <view class="hero">
      <image :src="cityHero" class="hero-img" />
    </view>

    <view class="section-title">特色美食</view>
    <view class="noodle-list">
      <view v-for="item in noodles" :key="item.slug" class="noodle-card" @tap="goNoodle(item)">
        <image :src="item.img" class="noodle-img" mode="aspectFill" />
        <view class="noodle-body">
          <text class="noodle-name">{{ item.name }}</text>

          <view class="noodle-tags">
            <text v-for="t in item.tags" :key="t" class="tag">#{{ t }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 经典与时令两列并排 -->
    <view class="extra-sections">
      <view class="col">
        <view class="section-title">经典美食组合</view>
        <view class="pair-list">
          <view v-for="p in pairings" :key="p.key" class="pair-card">
            <view class="pair-body">
              <text class="pair-title">{{ p.title }}</text>
              <text class="pair-desc">{{ p.desc }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="col">
        <view class="section-title">时令与民俗美食</view>
        <view class="season-list">
          <view v-for="s in seasonalFoods" :key="s.key" class="season-card">
            <view class="season-badge">{{ s.badge }}</view>
            <text class="season-desc">{{ s.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 美食打卡 -->
    <view class="section-title section-title--with-action">
      <text>美食打卡</text>
      <text class="section-action" @tap="openPostDialog">发布</text>
    </view>

    <!-- 发布弹窗（小窗口） -->
    <view v-if="showPostDialog" class="modal-mask" @tap="closePostDialog">
      <view class="modal" @tap.stop>
        <view class="modal-title">发布美食打卡</view>
        <view class="upload-form">
          <view class="uploader">
            <view class="thumb" v-for="(img, i) in draftImages" :key="img">
              <image :src="img" mode="aspectFill" @tap="previewDraft(i)" />
              <text class="thumb-del" @tap="removeDraftImage(i)">×</text>
            </view>
            <view class="thumb add" v-if="draftImages.length < 3" @tap="pickImages">
              <text class="add-plus">+</text>
              <text class="add-text">添加图片</text>
            </view>
          </view>

          <view class="form-fields">
            <input class="input" type="text" v-model="draftCaption" placeholder="写一句美食感受（必填）" />
            <input class="input" type="text" v-model="draftLocation" placeholder="位置/店名（可选）" />
            <button class="post-btn" type="default" size="mini" @tap="chooseLocation">选择位置</button>
            <button class="post-btn" type="default" size="mini" @tap="locateWithAMap">用高德定位</button>
          </view>

          <view class="form-actions">
            <button class="post-btn" type="primary" size="mini" @tap="submitPost">发布</button>
            <button class="post-btn" type="default" size="mini" @tap="closePostDialog">取消</button>
          </view>
        </view>
      </view>
    </view>

    <!-- 已发布打卡列表（全局，整行卡片，最多三图等分） -->
    <view class="post-list">
      <view v-for="(it, idx) in posts" :key="it.id" class="post-card">
        <view class="post-images-row">
          <image
            v-for="(img, i) in it.imgs.slice(0,3)"
            :key="img"
            :src="img"
            class="post-img-tn"
            mode="aspectFill"
            @tap="previewPost(it, i)"
          />
        </view>
        <text class="post-caption">{{ it.caption || '暂无文案' }}</text>
        <view class="post-meta">
          <text class="post-location" v-if="it.location">{{ it.location }}</text>
          <text class="post-time">{{ formatTime(it.createdAt) }}</text>
        </view>
        <text class="post-del" @tap="removePost(idx)">删除</text>
      </view>
    </view>
  </view>
</template>

<script>
const { getFoodsByCity, getFoodsByCityAndTag } = require('../../api/foods');
const { doWxLoginAndSave } = require('../../api/user');
const { addCheckin } = require('../../api/checkin');
// 引入高德小程序 SDK（需先 npm install @amap/amap-wx 并构建 npm）
// 注意：把下面的 Key 替换为你的「微信小程序」类型的高德 Key
var amapFile = require('../../utils/amap-wx.js');
var myAmapFun = new amapFile.AMapWX({
  key: 'c1aa30397cfa389d36803935266398ad'
});
export default {
  data() {
    return {
      cityId: '',
      cityInfo: { name: '', tagline: '' },
      noodles: [],
      pairings: [],
      seasonalFoods: [],
      posts: [],
      // 打卡上传草稿
      draftImages: [],
      draftCaption: '',
      draftLocation: '',
      showPostDialog: false,
      draftLongitude: null,
      draftLatitude: null
    }
  },
  computed: {
    cityHero() {
      // 城市头图：已配置本地图（西安、宝鸡、咸阳、渭南、延安、榆林、汉中、安康、商洛、铜川），其他使用占位
      const heroMap = {
        xian: '/static/assets/xian.jpg',
        baoji: '/static/assets/baoji.jpg',
        xianyang: '/static/assets/xianyang.jpg',
        weinan: '/static/assets/weinan.jpg',
        yanan: '/static/assets/yanan.jpg',
        yulin: '/static/assets/retouch_2025112420283592.jpg',
        hanzhong: '/static/assets/hanzhong.jpg',
        ankang: '/static/assets/ankang.jpg',
        shangluo: '/static/assets/shangluo.jpg',
        tongchuan: '/static/assets/tongchuan.jpg'
      }
      const defaultHero = '/static/assets/retouch_2025111814274381.png'
      return heroMap[this.cityId] || defaultHero
    }
  },
  onLoad(query) {
    this.cityId = (query.city || '').trim()
    const cityMap = {
      xian:    { name: '西安',    tagline: '长安城下的万面同煮' },
      tongchuan:{ name: '铜川',  tagline: '耀州臊子浇满铜魂' },
      baoji:   { name: '宝鸡',   tagline: '臊子酸辣，擀面皮筋爽' },
      xianyang:{ name: '咸阳',   tagline: '泾渭河畔的豪放拉面' },
      weinan:  { name: '渭南',   tagline: '黄河东岸的宽与细' },
      yanan:   { name: '延安',   tagline: '黄土地上的烈烈辣香' },
      yulin:   { name: '榆林',   tagline: '因地处农牧交错带，榆林美食融合了陕北农耕的质朴与草原游牧的豪放，面食多用荞麦、杂粮，肉食以羊、驴为特色，体现了黄土高原人民的饮食智慧。' },
      hanzhong:{ name: '汉中',   tagline: '巴山背篓里的米皮香' },
      ankang:  { name: '安康',   tagline: '秦巴山里蒸出的湿润口感' },
      shangluo:{ name: '商洛',   tagline: '秦岭南麓的山泉酸爽' },
    }
    this.cityInfo = cityMap[this.cityId] || { name: '陕西', tagline: '三秦大地面香长' }
    // 通过接口按城市加载美食，替换原本的静态数据
    this.fetchCityFoods()
    this.pairings = this.getPairings(this.cityId)
    this.seasonalFoods = this.getSeasonalFoods(this.cityId)
    // 设置顶部导航标题为城市名
    uni.setNavigationBarTitle({ title: this.cityInfo.name })
    // 加载本地持久化的打卡
    this.loadPostsFromStorage()
  },
  methods: {
    // 简单存在性判断：H5/小程序无法直接读文件，这里用约定占位，若需要严格判断可改为服务器地址或维护清单
    exists(_path) { return false },

    // 排序：含“面食”标签的优先
    rankMianshi(list) {
      try {
        const hasMianshi = (tags) => Array.isArray(tags) && tags.some(t => String(t).includes('面食'))
        return [...list].sort((a, b) => {
          const A = hasMianshi(a.tags)
          const B = hasMianshi(b.tags)
          if (A === B) return 0
          return A ? -1 : 1
        })
      } catch (e) {
        return list
      }
    },

    getCityNoodles(id) {
      // 保留静态数据作为后备（接口失败时兜底）
      const img = (slug) => `/static/assets/retouch_2025112414392946.png`
      const data = {
        xian: [
          { slug: 'biangbiang', name: 'biángbiáng面', intro: '宽厚能兜住蒜泥与醋香，豪迈又筋道。', tags: ['宽面','油泼','陕味'], img: img('biangbiang') },
        ]
      }
      return data[id] || []
    },

    // 通过接口获取城市美食（可选 tag 过滤）
    fetchCityFoods(tag) {
      const cityName = this.cityInfo?.name || ''
      const api = tag ? getFoodsByCityAndTag : getFoodsByCity
      api(cityName, tag)
        .then(res => {
          // 后端可能返回 {data:[]} 或直接 []
          const list = Array.isArray(res) ? res : (res.data || [])
          this.noodles = list.map(it => {
            const name = it.foodName || it.name
            const intro = it.introduction || it.intro || it.description || ''
            const img = it.imageUrl || it.img || '/static/assets/retouch_2025112414392946.png'
            let tags = []
            if (Array.isArray(it.tags)) {
              tags = it.tags
            } else if (it.tag != null) {
              if (typeof it.tag === 'string') {
                tags = it.tag.split(/[,\s]+/).filter(Boolean)
              } else {
                tags = [it.tag]
              }
            }
            return {
              // 规范字段名，确保页面渲染正常（slug 优先用 id 或名称）
              slug: it.slug || it.id || name,
              id: it.id,
              foodName: it.foodName || name,
              name,
              intro,
              tags,
              img
            }
          })
          this.noodles = this.rankMianshi(this.noodles)
        })
        .catch(err => {
          console.warn('按城市获取美食失败，使用本地兜底：', err)
          this.noodles = this.rankMianshi(this.getCityNoodles(this.cityId))
        })
    },
    // 经典美食组合：不同城市返回不同的本地经典搭配（纯文字）
    getPairings(id) {
      const map = {
        xian: [
          { key: 'xa-1', title: 'biángbiáng面 + 糖蒜', desc: '宽面兜汁，配上微甜酸的糖蒜，咸甜平衡更开胃。' },
          { key: 'xa-2', title: '肉夹馍 + 豆皮/凉皮', desc: '酥脆馍与清爽凉皮同食，层次丰富不腻口。' }
        ],
        tongchuan: [
          { key: 'tc-1', title: '耀州臊子面 + 豆腐脑', desc: '酸辣臊子配软嫩豆腐脑，冷热互补很下饭。' },
          { key: 'tc-2', title: '油泼面 + 耀州小菜', desc: '热油泼辣子与当地咸香小菜搭配，香辣更过瘾。' }
        ],
        baoji: [
          { key: 'bj-1', title: '岐山臊子面 + 醪糟蛋', desc: '酸辣咸香的臊子面配甜香醪糟，冷热搭配层次足。' },
          { key: 'bj-2', title: '擀面皮 + 油泼辣子', desc: '筋爽擀面皮拌一勺油泼辣子，香辣更提味。' }
        ],
        xianyang: [
          { key: 'xy-1', title: '扯面 + 凉拌菜', desc: '宽长扯面配爽口凉菜，解腻清口，夏季尤佳。' },
          { key: 'xy-2', title: '臊子面 + 荞面饸饹', desc: '酸辣臊子与饸饹筋道同桌，双面主食更满足。' }
        ],
        weinan: [
          { key: 'wn-1', title: '潼关臊子面 + 陕西小酥肉', desc: '酸辣臊子面配上小酥肉，咸香与脆嫩相映。' },
          { key: 'wn-2', title: '韩城羊肉饸饹 + 蒜醋小菜', desc: '饸饹筋道配酸香小菜，羊汤更不腻。' }
        ],
        yanan: [
          { key: 'ya-1', title: '擀面皮 + 臊子/辣子', desc: '柔韧擀面皮加臊子或辣子，酸辣层次分明。' },
          { key: 'ya-2', title: '油泼面 + 黄米馍馍', desc: '辣香油泼面与甜糯黄米馍馍形成反差。' }
        ],
        yulin: [
          { key: 'yl-1', title: '荞面饸饹 + 芝麻油旋饼', desc: '饸饹酸辣劲道配饼酥脆，是榆林常见的早餐组合。' },
          { key: 'yl-2', title: '羊肉面 + 陕北腌菜', desc: '浓郁羊汤面配酸辣腌菜，解腻提味更耐食。' }
        ],
        hanzhong: [
          { key: 'hz-1', title: '热米皮 + 油泼辣子', desc: '热食更筋韧，拌上油泼辣子，香气直上。' },
          { key: 'hz-2', title: '菜豆腐面 + 时蔬凉菜', desc: '清爽豆香与时蔬凉菜的清冽相得益彰。' }
        ],
        ankang: [
          { key: 'ak-1', title: '蒸面 + 魔芋凉粉', desc: '湿润蒸面与清爽凉粉同桌，口感反差更有趣。' },
          { key: 'ak-2', title: '安康面 + 豆香小食', desc: '清淡面食配豆香小食，营养均衡不腻。' }
        ],
        shangluo: [
          { key: 'sl-1', title: '酸汤面 + 荠菜包子', desc: '山泉酸爽与草本清香结合，自然清冽。' },
          { key: 'sl-2', title: '荞面 + 野菜凉拌', desc: '荞香朴实配山野清爽凉拌，清口更解腻。' }
        ]
      }
      return map[id] || map['xian']
    },
    // 时令与民俗美食：按城市定制两条示例
    getSeasonalFoods(id) {
      const map = {
        xian: [
          { key: 'xa-s1', badge: '上巳/踏青', desc: '凉皮与粉浆饭，春日踏青的清爽选择。' },
          { key: 'xa-s2', badge: '中秋', desc: '葫芦头与稠酒同桌，咸香与甜醇并存。' }
        ],
        tongchuan: [
          { key: 'tc-s1', badge: '立夏', desc: '耀州臊子面清而不腻，夏令可口。' },
          { key: 'tc-s2', badge: '寒露', desc: '热汤面配小菜，驱寒暖胃。' }
        ],
        baoji: [
          { key: 'bj-s1', badge: '立冬', desc: '岐山臊子面更热更香，暖胃驱寒。' },
          { key: 'bj-s2', badge: '腊八', desc: '杂粮粥与面食同桌，朴实温暖。' }
        ],
        xianyang: [
          { key: 'xy-s1', badge: '霜降', desc: '扯面配暖油泼，霜寒初至也要热气腾腾。' },
          { key: 'xy-s2', badge: '小满', desc: '清爽凉菜配面食，解暑清口。' }
        ],
        weinan: [
          { key: 'wn-s1', badge: '处暑', desc: '潼关臊子面酸辣适中，暑气渐退更合口。' },
          { key: 'wn-s2', badge: '寒衣节', desc: '清淡面食纪念祖先，温饱与敬意同在。' }
        ],
        yanan: [
          { key: 'ya-s1', badge: '二月二', desc: '擀面皮与豆香小食，祈愿“龙抬头”兴旺。' },
          { key: 'ya-s2', badge: '七月', desc: '臊子面加酸菜，夏日里也要酸辣开胃。' }
        ],
        yulin: [
          { key: 'yl-s1', badge: '腊月', desc: '腊肉、驴肉、羊杂粉汤，寒冬里的热乎味。' },
          { key: 'yl-s2', badge: '春社', desc: '荞面饸饹与旋饼，社日里朴实满足的味道。' }
        ],
        hanzhong: [
          { key: 'hz-s1', badge: '谷雨', desc: '热米皮加新鲜辣子油，春雨润物更筋道。' },
          { key: 'hz-s2', badge: '冬至', desc: '菜豆腐面温润清爽，适合一家共享。' }
        ],
        ankang: [
          { key: 'ak-s1', badge: '端午', desc: '蒸面与粽子同桌，秦巴风味并陈。' },
          { key: 'ak-s2', badge: '立秋', desc: '面食配山野凉拌，清冽解暑。' }
        ],
        shangluo: [
          { key: 'sl-s1', badge: '寒露', desc: '酸汤面最清冽，山泉与粮香相融。' },
          { key: 'sl-s2', badge: '清明', desc: '荠菜馅与清爽面食，草本清香应季。' }
        ]
      }
      return map[id] || map['xian']
    },
    // 选择草稿图片（最多3张）
    pickImages() {
      const remain = 3 - this.draftImages.length
      if (remain <= 0) return
      uni.chooseImage({
        count: remain,
        sizeType: ['compressed'],
        sourceType: ['album','camera'],
        success: (res) => {
          const paths = res.tempFilePaths || []
          this.draftImages = this.draftImages.concat(paths).slice(0, 3)
        }
      })
    },
    // 预览草稿图片
    previewDraft(index) {
      uni.previewImage({
        current: this.draftImages[index],
        urls: this.draftImages
      })
    },
    // 删除草稿图片
    removeDraftImage(index) {
      this.draftImages.splice(index, 1)
    },
    // 提交发布（调用后端打卡接口）
    async submitPost() {
      const caption = (this.draftCaption || '').trim()
      if (!caption) {
        uni.showToast({ title: '请填写一句美食感受', icon: 'none' })
        return
      }
      if (this.draftImages.length === 0) {
        uni.showToast({ title: '请至少添加一张图片', icon: 'none' })
        return
      }
      try {
        // 确保已登录（基于 token）
        let token = ''
        try { token = uni.getStorageSync('token') || '' } catch (_) { token = '' }
        if (!token) {
          const info = await doWxLoginAndSave()
          token = info?.token || ''
        }
        if (!token) {
          uni.showToast({ title: '登录失败，请重试', icon: 'none' })
          return
        }
        let longitude = this.draftLongitude
        let latitude = this.draftLatitude
        if (longitude == null || latitude == null) {
          const pos = await new Promise((resolve, reject) => {
            uni.getLocation({
              type: 'gcj02',
              success: (res) => resolve({ longitude: res.longitude, latitude: res.latitude }),
              fail: reject
            })
          })
          longitude = pos.longitude
          latitude = pos.latitude
        }
        const locationName = (this.draftLocation || this.cityInfo?.name || '').trim()
        const imagePaths = [...this.draftImages]
        await addCheckin({
          locationName,
          longitude,
          latitude,
          content: caption,
          imagePaths
        })
        const now = Date.now()
        this.posts.unshift({
          id: now,
          createdAt: now,
          imgs: imagePaths,
          caption,
          location: locationName,
          city: this.cityInfo?.name || ''
        })
        this.savePostsToStorage()
        this.draftImages = []
        this.draftCaption = ''
        this.draftLocation = ''
        this.draftLongitude = null
        this.draftLatitude = null
        this.showPostDialog = false
        uni.showToast({ title: '发布成功', icon: 'success' })
      } catch (e) {
        console.error('[submitPost] failed:', e)
        uni.showToast({ title: '发布失败，请稍后重试', icon: 'none' })
      }
    },
    // 预览已发布图片
    previewPost(item, index = 0) {
      uni.previewImage({
        current: item.imgs[index],
        urls: item.imgs
      })
    },
    // 选择位置（小程序可用，H5端可能不支持）
    chooseLocation() {
      if (!uni.chooseLocation) {
        uni.showToast({ title: '当前端不支持地图选点，请手动输入', icon: 'none' })
        return
      }
      uni.chooseLocation({
        success: (res) => {
          this.draftLocation = res.name || res.address || `${res.latitude},${res.longitude}`
          this.draftLatitude = res.latitude
          this.draftLongitude = res.longitude
        },
        fail: () => {
          uni.showToast({ title: '选择位置已取消', icon: 'none' })
        }
      })
    },
    // 本地存储（全局显示所有用户与城市）
    storageKey() {
      return 'noodle_posts_all'
    },
    savePostsToStorage() {
      try {
        uni.setStorageSync(this.storageKey(), this.posts)
      } catch (e) { /* ignore */ }
    },
    loadPostsFromStorage() {
      try {
        const list = uni.getStorageSync(this.storageKey())
        if (Array.isArray(list)) this.posts = list
      } catch (e) { /* ignore */ }
    },
    // 删除已发布
    removePost(idx) {
      this.posts.splice(idx, 1)
      this.savePostsToStorage()
    },
    goNoodle(item) {
      uni.navigateTo({
        url: `/pages/noodle/item?slug=${item.slug}&city=${this.cityId}&id=${(item && item.id) != null ? item.id : ''}&foodName=${encodeURIComponent((item && (item.foodName || item.name)) || '')}`
      })
    },
    openPostDialog() {
      this.showPostDialog = true
    },
    closePostDialog() {
      this.showPostDialog = false
    },
    // 使用高德 SDK 获取当前位置并逆地理解析
    locateWithAMap() {
      if (!myAmapFun) {
        uni.showToast({ title: '定位不可用：SDK未就绪', icon: 'none' });
        return;
      }
      try {
        myAmapFun.getRegeo({
          success: (data) => {
            const item = Array.isArray(data) ? data[0] : data
            const addr = item?.name || item?.desc || (item?.regeocodeData && item.regeocodeData.formatted_address) || ''
            this.draftLocation = addr || item?.location || ''
            uni.getLocation({
              type: 'gcj02',
              success: (pos) => {
                this.draftLatitude = pos.latitude
                this.draftLongitude = pos.longitude
              }
            })
            uni.showToast({ title: '定位成功', icon: 'success' })
          },
          fail: (err) => {
            console.warn('AMap getRegeo fail:', err)
            uni.showToast({ title: '定位失败，请稍后重试', icon: 'none' })
          }
        })
      } catch (e) {
        console.error('AMap init/locate error:', e)
        uni.showToast({ title: '定位不可用，请检查Key或npm构建', icon: 'none' })
      }
    },
    formatTime(ts) {
      try {
        if (!ts) return ''
        const d = new Date(ts)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hh = String(d.getHours()).padStart(2, '0')
        const mm = String(d.getMinutes()).padStart(2, '0')
        return `${y}-${m}-${day} ${hh}:${mm}`
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.city-page {
  min-height: 100vh;
  background: linear-gradient(180deg,#fffaf1 0%, #fff5dc 100%);
  color: #5a2c12;
  padding-bottom: 40rpx;
}
.top-row {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 20rpx 24rpx 8rpx;
}
.hero-line {
  width: 100%;
  height: 2rpx;
  background: #8c5c2a;
  border-radius: 2rpx;
}

.hero {
  position: relative;        /* 作为绝对定位图片的参照 */
  width: 100%;               /* 占满页面内容宽度，避免 vw 溢出 */
  height: 360rpx;            /* 头图显示高度，可按需调整 */
  overflow: hidden;          /* 超出部分裁剪（主要裁掉下端） */
  margin-top: 0;             /* 紧贴页面顶端 */
}
.hero-img {
  position: absolute;     /* 覆盖容器 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;      /* 充满容器并裁切 */
  object-position: top;   /* 从顶部对齐，裁掉底部 */
  transform: none;        /* 移除下移，避免露出顶部背景 */
  display: block;
}
.city-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.city-name {
  font-size: 40rpx;
  font-weight: 700;
}
.city-desc {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #8c5c2a;
}
.section-title {
  margin: 20rpx 24rpx 12rpx; /* 与特色面食卡片左边缘对齐 */
  font-size: 32rpx;
  font-weight: 600;
}
.section-title--with-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.section-action {
  background: #ffd98a;
  color: #7b2f00;
  padding: 6rpx 16rpx;
  border-radius: 999px;
  font-size: 24rpx;
}
.noodle-list {
  padding: 0 24rpx;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列网格 */
  gap: 12rpx; /* 更紧凑的间距 */
}
.noodle-card {
  background: #fff5df;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.08);
  display: flex;                /* 纵向：上图下文 */
  flex-direction: column;
  padding: 12rpx;               /* 更紧凑的内边距 */
}
.noodle-img {
  width: 100%;                  /* 两列卡片占满卡片宽度 */
  height: 240rpx;               /* 拉长20rpx，展示更大 */
  border-radius: 16rpx;
  object-fit: cover;            /* 充满并裁切，视觉更好 */
  display: block;
}
.noodle-body {
  padding: 8rpx 4rpx 4rpx;      /* 适配纵向卡片 */
  display: flex;                /* 垂直排列文本 */
  flex-direction: column;
  gap: 10rpx;                   /* 更紧凑的段间距 */
  flex: 1;                      /* 撑满卡片剩余空间，便于把标签压到最底部 */
}
.noodle-name {
  font-size: 28rpx;             /* 两列更紧凑的标题 */
  font-weight: 700;
  display: block;               /* 保证换行 */
}

.noodle-tags {
  margin-top: auto;             /* 将标签推到底部 */
  padding-top: 8rpx;            /* 与名字保持一点点间距 */
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx 12rpx;
}
.tag {
  font-size: 22rpx;
  color: #7b2f00;
  background: #ffecc7;
  padding: 6rpx 12rpx;
  border-radius: 999px;
}

/* 经典组合 */
.pair-list {
  padding: 0; /* 交由外层 extra-sections 控制统一左右内边距 */
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.pair-card {
  background: #fff5df;
  border-radius: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(0,0,0,0.08);
  padding: 16rpx;
}
.pair-body {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.pair-title {
  font-size: 30rpx;
  font-weight: 700;
}
.pair-desc {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #8c5c2a;
}

/* 时令民俗 */
.season-list {
  padding: 0; /* 交由外层 extra-sections 控制统一左右内边距 */
  display: flex;
  flex-direction: column; /* 每列纵向排列卡片 */
  gap: 16rpx;
}
.season-card {
  background: #fff5df;
  border-radius: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(0,0,0,0.08);
  padding: 16rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.season-badge {
  background: #ffd98a;
  color: #7b2f00;
  padding: 6rpx 12rpx;
  border-radius: 999px;
  font-size: 22rpx;
  flex-shrink: 0;
}
.season-desc {
  font-size: 26rpx;
}

/* 打卡区 - 上传表单 */
.upload-form {
  padding: 0 24rpx 12rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.modal-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal {
  width: 86%;
  max-width: 640rpx;
  background: #fff5df;
  border-radius: 24rpx;
  box-shadow: 0 16rpx 32rpx rgba(0,0,0,0.18);
  overflow: hidden;
}
.modal-title {
  padding: 16rpx 20rpx 0;
  font-size: 30rpx;
  font-weight: 700;
  color: #7b2f00;
}
.uploader {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
}
.thumb {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
  background: #fff5df;
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.06);
}
.thumb image {
  width: 100%;
  height: 100%;
}
.thumb-del {
  position: absolute;
  right: 8rpx;
  top: 8rpx;
  background: rgba(0,0,0,0.45);
  color: #fff;
  border-radius: 999px;
  padding: 2rpx 10rpx;
  font-size: 22rpx;
}
.thumb.add {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #7b2f00;
}
.add-plus {
  font-size: 40rpx;
  line-height: 1;
}
.add-text {
  font-size: 22rpx;
}
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
.input {
  background: #fff5df;
  border-radius: 12rpx;
  padding: 12rpx;
  font-size: 26rpx;
  box-shadow: inset 0 0 0 1rpx rgba(0,0,0,0.06);
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}
.post-btn {
  background: #ffc34a;
  color: #5a2c12;
  border-radius: 999px;
  padding: 0 16rpx;
}
/* 两列容器：左经典、右时令 */
.extra-sections {
  padding: 0 24rpx; /* 统一左右内边距，确保与上方卡片左侧对齐 */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.post-list {
  padding: 0 24rpx 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.post-card {
  background: #fff5df;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 18rpx rgba(0,0,0,0.08);
  overflow: hidden;
  padding: 10rpx 10rpx 12rpx;
  position: relative;
}
.post-img {
  width: 100%;
  height: 220rpx;
  object-fit: cover;
  display: block;
}
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6rpx 12rpx 8rpx;
  font-size: 22rpx;
  color: #8c5c2a;
}
.post-time {
  opacity: 0.9;
}
.post-location {
  opacity: 0.9;
}
.post-caption {
  display: block;
  padding: 10rpx 6rpx 6rpx;
  font-size: 26rpx;
}
.post-del {
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  background: rgba(0,0,0,0.35);
  color: #fff;
  border-radius: 999px;
  padding: 2rpx 10rpx;
  font-size: 22rpx;
}
/* 新增：三图等分与底部元信息布局 */
.post-images-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6rpx;
  width: 100%;
}
.post-img-tn {
  width: 100%;
  height: 200rpx;
  object-fit: cover;
  display: block;
  border-radius: 10rpx;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6rpx;
  font-size: 22rpx;
  color: #8c5c2a;
}
</style>