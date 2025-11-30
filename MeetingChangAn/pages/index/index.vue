 <script>
import noodleBowl from '../../static/assets/noodle-bowl.svg'
import shot1 from '../../static/assets/noodle-cut-1.svg'
import shot2 from '../../static/assets/noodle-cut-2.svg'
import shot3 from '../../static/assets/noodle-cut-3.svg'

const shaanxiGeoJSON = require('../../data/shaanxi-map.json')
 // 左上角图片路径
const cornerImage = '/static/assets/retouch_2025111814274381.png'
const echarts = require('../../wxcomponents/ec-canvas/echarts.js')

export default {
  components: {},
  data() {
    return {
      cornerImage,
      cities: [
  {
    id: 'yanan',
    name: '延安',
    color: '#f8d37e',
    top: '8%',
    left: '52%',
    noodles: ['油泼面', '子长煎饼'],
    tagline: '黄土地上的烈烈辣香',},
  {
    id: 'yulin',
    name: '榆林',
    color: '#f2c568',
    top: '2%',
    left: '35%',
    noodles: ['荞面饸饹', '羊杂粉汤'],
    tagline: '榆塞粗犷的陕北筋道',},
  /* 面条方框装饰，放在白色模块内部四周 */


  {
    id: 'tongchuan',
    name: '铜川',
    color: '#f9b0c3',
    top: '28%',
    left: '53%',
    noodles: ['耀州臊子面'],
    tagline: '耀州臊子浇满铜魂',},
  {
    id: 'baoji',
    name: '宝鸡',
    color: '#8fd18c',
    top: '35%',
    left: '28%',
    noodles: ['岐山臊子面', '擀面皮'],
    tagline: '臊子酸辣，擀面皮筋爽'
  },
  {
    id: 'xianyang',
    name: '咸阳',
    color: '#8ec7f4',
    top: '38%',
    left: '42%',
    noodles: ['扯面', 'biángbiáng面'],
    tagline: '泾渭河畔的豪放拉面'
  },
  {
    id: 'weinan',
    name: '渭南',
    color: '#f7b66d',
    top: '38%',
    left: '63%',
    noodles: ['潼关臊子面', '韩城羊肉饸饹'],
    tagline: '黄河东岸的宽与细'
  },
  {
    id: 'xian',
    name: '西安',
    color: '#7ab7ff',
    top: '48%',
    left: '48%',
    noodles: ['biángbiáng面', '油泼面', '凉皮'],
    tagline: '长安城下万面同煮'
  },
  {
    id: 'shangluo',
    name: '商洛',
    color: '#6fc4d2',
    top: '54%',
    left: '66%',
    noodles: ['洛南酸汤面'],
    tagline: '秦岭南麓的山泉酸爽'
  },
  {
    id: 'hanzhong',
    name: '汉中',
    color: '#f59fb5',
    top: '64%',
    left: '28%',
    noodles: ['汉中热米皮', '菜豆腐面'],
    tagline: '巴山背篓里的米皮香'
  },
  {
    id: 'ankang',
    name: '安康',
    color: '#c7a4ff',
    top: '70%',
    left: '55%',
    noodles: ['安康蒸面', '紫阳蒿子面'],
    tagline: '秦巴山里蒸出的湿润口感'
  }
      ],
      noodleIcons: [
  { id: 'travel', label: '陕游记' },
  { id: 'taste', label: '陕味集' },
  { id: 'heritage', label: '陕非遗' },
  { id: 'tong', label: '陕面通' },
  { id: 'style', label: '个人中心' }
      ],
      bottomIcons: [
        { id: 'qingdan', label: '陕游记', img: '/static/assets/retouch_2025112414391093.png' },
        { id: 'fengwei', label: '陕味集', img: '/static/assets/retouch_2025112414392946.png' },
        { id: 'feiyi', label: '陕非遗', img: '/static/assets/retouch_2025112414400271.png' },
        { id: 'profile', label: '个人中心', img: '/static/assets/retouch_2025112414394823.png' }
      ],
      faceShots: [
  {
    id: 'shot1',
    img: shot1,
    answer: '安康蒸面',
    clue: '蒸面偏湿，截面有光泽',
    knowledge: '恭喜！这是安康蒸面，比凉皮粗一点，因为要裹住秦巴山区的辣油。',
    revealed: false
  },
  {
    id: 'shot2',
    img: shot2,
    answer: 'biángbiáng面',
    clue: '宽如皮带，油泼最香',
    knowledge:
      '中！这是西安的biángbiáng面，宽厚能兜住蒜泥与醋香，是秦腔一样的豪迈。',
    revealed: false
  },
  {
    id: 'shot3',
    img: shot3,
    answer: '岐山臊子面',
    clue: '细如筷子，靠臊子提味',
    knowledge: '妙！是岐山臊子面，细面吸饱酸辣臊子，随便搅都是彩虹。',
    revealed: false
  }
      ],
      showGuessModal: false,
      showDialectModal: false,
      activeDialect: {
        title: '面语 · 方言卡',
        content: ['老板问"加面不？"', '答："再来一筷子！"'],
        tip: '安康腔调要拖长，显得豪爽'
      },
      dialects: [
        { id: 'xian', name: '西安', title: '西安 · 面语', content: ['“来碗biángbiáng，辣子要多！”', '“面要硬气点，筋道！”'], tip: '关中口音舒展，语速中等' },
        { id: 'tongchuan', name: '铜川', title: '铜川 · 面语', content: ['“臊子要冲辣，再来点醋！”', '“薄面，快点端！”'], tip: '语调略上扬，干脆利落' },
        { id: 'baoji', name: '宝鸡', title: '宝鸡 · 面语', content: ['“臊子面要酸辣咧！”', '“来个干拌更有味！”'], tip: '尾音略重，干脆有劲' },
        { id: 'xianyang', name: '咸阳', title: '咸阳 · 面语', content: ['“扯面要宽些，油泼要热些！”', '“蒜泥别少咧！”'], tip: '关中腔明显，语调平直' },
        { id: 'weinan', name: '渭南', title: '渭南 · 面语', content: ['“来碗潼关臊子！”', '“酸点，辣点，快点！”'], tip: '吐字清晰，节奏偏快' },
        { id: 'yanan', name: '延安', title: '延安 · 面语', content: ['“来碗油泼，面要干点！”', '“子长煎饼再来一张！”'], tip: '陕北腔浑厚，拉长尾音' },
        { id: 'yulin', name: '榆林', title: '榆林 · 面语', content: ['“来碗荞面饸饹！”', '“辣子多些，撒蒜苗！”'], tip: '陕北味浓，语速偏快' },
        { id: 'hanzhong', name: '汉中', title: '汉中 · 面语', content: ['“热米皮整一碗！”', '“菜豆腐面要清爽点！”'], tip: '陕南口音柔和，婉转' },
        { id: 'ankang', name: '安康', title: '安康 · 面语', content: ['“蒸面要润点！”', '“辣子再来一勺咧！”'], tip: '腔调拖长，热情爽利' },
        { id: 'shangluo', name: '商洛', title: '商洛 · 面语', content: ['“来碗酸汤面！”', '“轻油少辣，清爽些！”'], tip: '语气温和，尾音略上挑' }
      ]
    }
  },
  mounted() {
    // H5 端可在此尝试初始化，但小程序端依赖 ec-canvas 的 onInit
  },
  methods: {
    toggleGuessModal() {
      this.showGuessModal = !this.showGuessModal
    },
    openGuessModal() {
      this.showGuessModal = true
    },
    revealShot(id) {
      const shot = this.faceShots.find((item) => item.id === id)
      if (shot) {
        shot.revealed = true
      }
    },
    goDetail(city) {
      uni.navigateTo({
        url: `/pages/noodle/detail?city=${city.id}`
      })
    },
    goPage(id) {
      const routes = {
        tong: '/pages/index/index',
        qingdan: '/pages/checklist/index',
        fengwei: '/pages/flavor/index',
        profile: '/pages/mine/index',
        feiyi: '/pages/heritage/index'
      }
      const url = routes[id]
      if (!url) {
        uni.showToast({ title: '页面开发中', icon: 'none' })
        return
      }
      // 检查是否是当前页
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      if (currentPage && ('/' + currentPage.route) === url) {
        return
      }
      // 如果跳转到陕面通首页，使用 reLaunch 清空栈
      if (url === '/pages/index/index') {
        uni.reLaunch({ url })
      } else {
        // 其他页面使用 navigateTo，保留返回按钮
      uni.navigateTo({ url })
      }
    },
    // ECharts 初始化：供 ec-canvas 调用
    initSxMapChart(canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr })
      canvas.setChart && canvas.setChart(chart)

      // 注册陕西地图
      try {
        echarts.registerMap('shaanxi', shaanxiGeoJSON)
      } catch (e) {
        // 已注册时忽略
      }

      const option = {
        tooltip: { show: false },
        series: [{
          type: 'map',
          map: 'shaanxi',
          aspectScale: 1.15,
          layoutCenter: ['50%', '48%'],
          layoutSize: '72%',
          zoom: 1,
          selectedMode: 'single',
          roam: false,
          itemStyle: {
            areaColor: '#fff3d6',
            borderColor: '#cfa86a',
            borderWidth: 1
          },
          emphasis: {
            itemStyle: { areaColor: '#ffd98a' },
            label: { show: true, color: '#7b2f00', fontSize: 12 }
          },
          label: { show: true, color: '#8c5c2a', fontSize: 10 },
          // 为不同市设置暖色填充
          data: [
            { name: '西安市',   itemStyle: { areaColor: '#FFE9B0' } }, // 深奶黄
            { name: '铜川市',   itemStyle: { areaColor: '#FFE099' } }, // 玉米黄
            { name: '宝鸡市',   itemStyle: { areaColor: '#FFD689' } }, // 浅琥珀黄
            { name: '咸阳市',   itemStyle: { areaColor: '#FFCB73' } }, // 暖杏黄
            { name: '渭南市',   itemStyle: { areaColor: '#FFC05E' } }, // 蜂蜜橙
            { name: '延安市',   itemStyle: { areaColor: '#FFD59E' } }, // 浅杏橙
            { name: '榆林市',   itemStyle: { areaColor: '#FFD54F' } }, // 暖黄色
            { name: '汉中市',   itemStyle: { areaColor: '#FFC24D' } }, // 橙黄色
            { name: '安康市',   itemStyle: { areaColor: '#FFDE8F' } }, // 亮奶黄
            { name: '商洛市',   itemStyle: { areaColor: '#FFD3A6' } }  // 桃杏奶
          ]
        }]
      }
      chart.setOption(option)

      const nameToId = {
        '西安市': 'xian',
        '铜川市': 'tongchuan',
        '宝鸡市': 'baoji',
        '咸阳市': 'xianyang',
        '渭南市': 'weinan',
        '延安市': 'yanan',
        '榆林市': 'yulin',
        '汉中市': 'hanzhong',
        '安康市': 'ankang',
        '商洛市': 'shangluo'
      }

      chart.on('click', (params) => {
        const id = nameToId[params.name]
        if (id) {
          uni.navigateTo({
            url: `/pages/noodle/detail?city=${id}`
          })
        }
      })

      return chart
    },
    openDialect() {
      this.showDialectModal = true
    },
    closeDialect() {
      this.showDialectModal = false
    },
  }
}
</script>

<template>
  <page-meta page-style="overflow:auto;min-height:100vh" />
  <view class="index-page">
    <image :src="cornerImage" class="corner-image" mode="widthFix" />
    <view class="floating-btn" @tap="toggleGuessModal">藏面</view>

    <view class="hero">
      <image :src="noodleBowl" class="hero-bowl" />


      <view class="map-panel">
        <image
          class="noodle-frame"
          src="/static/assets/noodle-frame.png"
          mode="scaleToFill"
          v-show="!(showGuessModal || showDialectModal)"
        />
        <view class="white-bg"></view>
        <image
          class="noodle-splash"
          src="/static/assets/remove.photos-removed-background.png"
          mode="widthFix"
          v-show="!(showGuessModal || showDialectModal)"
        />
        <!-- 标题已移至面图右侧显示 -->
        <view class="map" v-show="!(showGuessModal || showDialectModal)">
          <ec-canvas
            class="sx-map-canvas"
            canvas-id="sx-map"
            :ec="{ onInit: initSxMapChart }"
          ></ec-canvas>
        </view>
      </view>
    </view>

    <view class="feature-cards">
      <view class="feature-card" @tap="openGuessModal">
        <text class="feature-name">猜粗细</text>
        <text class="feature-desc">3 张截面，猜中送面缘</text>
      </view>
      <view class="feature-card" @tap="openDialect">
        <text class="feature-name">面语</text>
        <text class="feature-desc">学一句吃面暗号</text>
      </view>
    </view>

    <image
      class="section-divider"
      src="/static/assets/retouch_2025111915301620.png"
      mode="widthFix"
      v-show="!(showGuessModal || showDialectModal)"
    />

    <view v-if="showGuessModal" class="overlay">
      <view class="modal">
        <view class="modal-header">
          <text>猜粗细 · 面条截面</text>
          <text class="modal-close" @tap="toggleGuessModal">×</text>
        </view>
        <view class="shot-list">
          <view v-for="shot in faceShots" :key="shot.id" class="shot-card">
            <image :src="shot.img" class="shot-img" mode="aspectFit" />
            <text class="shot-clue">{{ shot.clue }}</text>
            <button
              class="shot-btn"
              size="mini"
              type="default"
              @tap="revealShot(shot.id)"
            >
              {{ shot.revealed ? '已揭晓' : '我来猜' }}
            </button>
            <text v-if="shot.revealed" class="shot-knowledge">
              {{ shot.knowledge }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="showDialectModal" class="overlay">
      <view class="modal dialect">
        <view class="modal-header">
          <text>{{ activeDialect.title }}</text>
          <text class="modal-close" @tap="closeDialect">×</text>
        </view>
        <view class="dialect-body">
          <view v-for="d in dialects" :key="d.id" class="dialect-card">
            <text class="dialect-title">{{ d.title }}</text>
            <text v-for="line in d.content" :key="line" class="dialect-line">· {{ line }}</text>
            <text class="dialect-tip">{{ d.tip }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 图标固定在底部：上方居中一个，下方四个一行，同屏可见 -->
    <view class="icons-fixed">
      <view class="icons-top">
        <view class="icon-block" @tap="goPage('tong')">
          <view class="top-circle-wrap">
            <image class="icon-img" src="/static/assets/retouch_2025112414375907.png" mode="widthFix" />
          </view>
          <text class="icon-label">陕面通</text>
        </view>
      </view>
      <view class="icons-bottom">
        <view
          v-for="icon in bottomIcons"
          :key="icon.id"
          class="icon-block"
          @tap="goPage(icon.id)"
        >
          <image class="icon-img" :src="icon.img" mode="widthFix" />
          <text class="icon-label">{{ icon.label }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.index-page {
  min-height: 100vh;
  padding: 40rpx 32rpx 0rpx;
  background: linear-gradient(180deg, #fffaf1 0%, #fff5dc 100%);
  font-family: 'LXGW WenKai Screen', 'PingFang SC', system-ui;
  color: #5a2c12;
  position: relative;
  overflow: visible;
}

/* 左上角图片样式 */
.corner-image {
  position: absolute;
  top: -10rpx;
  left:3rpx;
  z-index: 2;
  width: 180rpx;
  transform: translateY(7rpx) translateX(6rpx) scaleX(1.30);
  transform-origin: left top;
  pointer-events: none;
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 0;
  background: transparent;
}

/* 页面底部图标容器 */
.bottom-icons-container {
  position: fixed;
  bottom: 40rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
}

/* 底部图标行样式 */
.bottom-icons-row {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 80rpx);
  max-width: 600rpx;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 60rpx;
  padding: 16rpx 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
}

.bottom-icon-pill {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12rpx 8rpx;
  border-radius: 40rpx;
  transition: all 0.3s ease;
}

.bottom-icon-pill:active {
  background: rgba(255, 207, 93, 0.3);
  transform: scale(0.95);
}

.bottom-icon-pill .icon-dot {
  width: 16rpx;
  height: 16rpx;
  background: #ff7a18;
  border-radius: 50%;
  margin-bottom: 6rpx;
}

.bottom-icon-pill text {
  font-size: 22rpx;
  font-weight: 500;
  color: #5a2c12;
}

/* 中央上方图标样式 */
.top-center-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 120rpx;
}

.center-icon-pill {
  width: 170rpx;
  height: 150rpx;
  border-radius: 50%;
  background: #ff7a18;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: white;
  font-weight: bold;
  box-shadow: 0 8rpx 16rpx rgba(255, 122, 24, 0.4);
  position: relative;
  z-index: 2;
}

/* 面条连接线 */
.noodle-connector {
  position: absolute;
  top: 280rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 8rpx;
  height: 120rpx;
  background: linear-gradient(180deg, #ff7a18, #ffcf5d);
  border-radius: 4rpx;
  z-index: 1;
  box-shadow: 0 4rpx 8rpx rgba(255, 122, 24, 0.3);
}

/* 下方图标行样式 */
.bottom-icons-row {
  display: flex;
  justify-content: space-between;
  margin: 0 40rpx 60rpx;
  position: relative;
  z-index: 2;
}

.bottom-icon-pill {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #ffe569;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  box-shadow: 0 6rpx 12rpx rgba(255, 200, 0, 0.45);
}

.floating-btn {
  position: fixed;
  right: 40rpx;
  bottom: 160rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #ffcf5d;
  color: #7b2f00;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 10rpx 18rpx rgba(255, 160, 16, 0.35);
  z-index: 20;
}

.hero {
  position: relative;
  padding-top: 60rpx;
  margin-bottom: 60rpx;
}

.hero-bowl {
  width: 150rpx;
  height: 150rpx;
}

.map-panel {
  margin-top: 30rpx;           /* 再上移40rpx */
  padding: 22rpx 1rpx 100rpx 32rpx;   /* 上-10, 右-15, 下-40, 左保持 */
  border-radius: 32rpx;
  background: transparent;          /* 白底交由 .map-bg 控制 */
  overflow: visible;
  box-shadow: 0 20rpx 40rpx rgba(255, 190, 90, 0.2);
}

.map-title {
  font-size: 32rpx;
  font-weight: 600;
}

.map {
  position: relative;
  width: calc(100% - 50rpx);
  height: 750rpx;
  margin-top: 120rpx;
  background: transparent;
  border-radius: 24rpx;
  overflow: visible;
}
/* 渐变白底移至伪元素，便于单独控制尺寸与位置 */
.map::before {
  content: '';
  position: absolute;
  top: -190rpx; /* 下移约 60rpx */
  right: -38rpx;
  bottom: 0;
  left: -30rpx;
  border-radius: 24rpx;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 220, 120, 0.4), transparent 60%),
    radial-gradient(circle at 70% 40%, rgba(255, 180, 150, 0.35), transparent 55%);
  z-index: 1;
  pointer-events: none;
}

.sx-map-canvas {
  position: absolute;
  top: -790rpx;
  right: -120rpx;
  bottom: -440rpx;
  left: -170rpx;
  z-index: 5; /* 提升层级，避免被装饰覆盖 */
  transform: none;
  transform-origin: center;
}

.map-city {
  position: absolute;
  width: 300rpx;
  padding: 25rpx;
  border-radius: 30% 70% 60% 40%;
  text-align: center;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
  transform: translate(-30%, -50%);
  transition: transform 0.2s;
}

.map-city:active {
  transform: translate(-50%, -50%) scale(0.96);
}

.city-name {
  font-weight: 700;
}

.city-tagline {
  display: block;
  font-size: 20rpx;
  margin-top: 6rpx;
}

.feature-cards {
  display: flex;
  gap: 40rpx;
  margin-top: -335rpx;
  margin-bottom: 120rpx;
  position: relative;
  z-index: 40;
}
.feature-cards::before {
  content:"";
  position: absolute;
  top: 0rpx;
  right: 30rpx;
  bottom: -2rpx; /* 下端延长 20rpx */
  left: 30rpx;
  background: #ffffff;
  border-radius: 32rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.08);
  z-index: -1;
  pointer-events: none;
}

.feature-card {
  flex: 0 0 calc(50% - 92rpx); /* 在 20rpx 间距的两列布局上，每张卡再减 20rpx */
  padding: 32rpx;
  border-radius: 32rpx;
  background: #ffefc2;
  box-shadow: inset 0 0 0 6rpx rgba(255, 255, 255, 0.8), 0 12rpx 20rpx rgba(255, 174, 65, 0.2);
}

.feature-name {
  font-size: 36rpx;
  font-weight: 700;
}

.feature-desc {
  display: block;
  margin-top: 8rpx;
  font-size: 26rpx;
}

.section-divider {
  width: 100%;
  display: block;
  margin:-102rpx 0 32rpx;
  position: relative;
  z-index: 60;
}

.divider {
  margin-top: 60rpx;
}

.chopsticks {
  height: 14rpx;
  background: linear-gradient(90deg, #6b3b1f, #a15a2f);
  border-radius: 14rpx;
  position: relative;
  margin-bottom: 24rpx;
}

.chopsticks::after {
  content: '';
  position: absolute;
  right: 60rpx;
  top: -10rpx;
  width: 12rpx;
  height: 34rpx;
  background: #d5c06f;
  border-radius: 4rpx;
  box-shadow: -18rpx 0 0 #d5c06f, -36rpx 0 0 #d5c06f;
}

.icon-row {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 10rpx;
}

.icon-row::before {
  content: '';
  position: absolute;
  top: -16rpx;
  left: 0;
  right: 0;
  height: 80rpx;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="80"><path d="M0 40 Q50 0 100 40 T200 40 T300 40 T400 40" stroke="%23ffcf5d" stroke-width="6" fill="none" stroke-linecap="round"/></svg>')
    center/contain no-repeat;
  z-index: -1;
}

.icon-pill {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background: #ffe569;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  z-index: 1;
  box-shadow: 0 6rpx 10rpx rgba(255, 200, 0, 0.45);
}

.icon-dot {
  width: 18rpx;
  height: 18rpx;
  background: #d54c10;
  border-radius: 50%;
  margin-bottom: 6rpx;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal {
  width: 90%;
  max-height: 84vh;
  background: #fffefa;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 30rpx 60rpx rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 32rpx;
  margin-bottom: 24rpx;
}

.modal-close {
  font-size: 48rpx;
  line-height: 1;
}

.shot-list {
  overflow-y: auto;
  gap: 24rpx;
  display: flex;
  flex-direction: column;
}

.shot-card {
  background: #fff5df;
  padding: 24rpx;
  border-radius: 24rpx;
  box-shadow: inset 0 0 0 4rpx rgba(255, 255, 255, 0.7);
  text-align: center;
}

.shot-img {
  width: 180rpx;
  height: 180rpx;
}

.shot-clue {
  display: block;
  margin: 12rpx 0;
  font-size: 26rpx;
}

.shot-btn {
  margin-bottom: 12rpx;
  border-radius: 999px;
  background: #ffc34a;
  color: #5a2c12;
}

.shot-knowledge {
  font-size: 24rpx;
  color: #a14b1f;
}

.modal.dialect .dialect-body {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  font-size: 28rpx;
}

.dialect-tip {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #8c5c2a;
}

/* 面语卡片样式：每条面语独立卡片分隔显示 */
.dialect-card {
  background: #fff5df;
  border-radius: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(0,0,0,0.08);
  border: 3rpx solid #e8d4b8;
  padding: 16rpx 18rpx;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}
.dialect-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #5a2c12;
  margin-bottom: 4rpx;
}


.dialect-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #5a2c12;
  margin-bottom: 4rpx;
}
.dialect-line {
  display: block;
  font-size: 26rpx;
  color: #5a2c12;
  line-height: 1.6;
}

.dialect-line {
  display: block;
  font-size: 26rpx;
  color: #5a2c12;
  line-height: 1.6;
}
/* 面条方框装饰，放在白色模块内部四周 */
.noodle-frame {
  position: absolute;
  top: -125rpx;             /* 四边统一内缩 20rpx，总体长宽各缩小 40rpx */
  left: -60rpx;
  right: -42rpx;
  bottom: 250rpx;
  width: auto;
  height: auto;
  border-radius: 32rpx;   /* 与 map-panel 圆角一致 */
  z-index: 1;             /* 装饰层 */
  pointer-events: none;   /* 不干扰点击 */
}

/* 面条方框装饰，放在白色模块内部四周 */
.noodle-frame {
  position: absolute;
  top: -125rpx;             /* 四边统一内缩 20rpx，总体长宽各缩小 40rpx */
  left: -60rpx;
  right: -42rpx;
  bottom: 250rpx;
  width: auto;
  height: auto;
  border-radius: 32rpx;   /* 与 map-panel 圆角一致 */
  z-index: 1;             /* 装饰层 */
  pointer-events: none;   /* 不干扰点击 */
}


.dialect-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #5a2c12;
  margin-bottom: 4rpx;
}


.dialect-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #5a2c12;
  margin-bottom: 4rpx;
}
.dialect-line {
  display: block;
  font-size: 26rpx;
  color: #5a2c12;
  line-height: 1.6;
}
.dialect-line {
  display: block;
  font-size: 26rpx;
  color: #5a2c12;
  line-height: 1.6;
}
/* 面条方框装饰，放在白色模块内部四周 */
.noodle-frame {
  position: absolute;
  top: -125rpx;             /* 四边统一内缩 20rpx，总体长宽各缩小 40rpx */
  left: -60rpx;
  right: -42rpx;
  bottom: 250rpx;
  width: auto;
  height: auto;
  border-radius: 32rpx;   /* 与 map-panel 圆角一致 */
  z-index: 1;             /* 装饰层 */
  pointer-events: none;   /* 不干扰点击 */
}
/* 面条方框装饰，放在白色模块内部四周 */
.noodle-frame {
  position: absolute;
  top: -125rpx;             /* 四边统一内缩 20rpx，总体长宽各缩小 40rpx */
  left: -60rpx;
  right: -42rpx;
  bottom: 250rpx;
  width: auto;
  height: auto;
  border-radius: 32rpx;   /* 与 map-panel 圆角一致 */
  z-index: 1;             /* 装饰层 */
  pointer-events: none;   /* 不干扰点击 */
}

/* 纯白圆角背景层（非渐变、非面条方框）：仅控制白底自身大小与位置 */
.white-bg {
  position: absolute;
  top: -20rpx;
  right:44rpx;
  bottom: 330rpx;
  left: 10rpx;
  background: #fffef7;
  border-radius: 32rpx;
  z-index: 0;       /* 高于 noodle-frame(0)，低于内容(map,2) */
  pointer-events: none;
}

/* 确保模块内容在装饰之上 */
.map-panel { position: relative; }
.map { position: relative; z-index: 2; }
/* 右下角装饰 */
.noodle-splash {
  position: absolute;
  right: -17rpx;   /* 向内收，避免外溢 */
  bottom: 250rpx;
  width: 150rpx;  /* 可按视觉再调 140~220rpx */
  z-index: 4;     /* 在方框之上，低于内容 */
  pointer-events: none;
}

.floating-btn,
.bottom-icons-container {
  display: none !important;
}

/* 新图标布局（图片 + 下方文字），不使用圆形底色，不被白色方框包裹 */
.icons-top {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -40rpx 0 20rpx;
  padding-top: 0;
  z-index:-1;
}
.icons-top .icon-block {
  transform: translateY(75rpx); /* 仅下移陕面通图标，不影响底栏背景 */
  will-change: transform;
}
/* 延长上方“陕面通”米黄色背景，仅背景加长不改图标大小 */
.icons-top::before {
  content: '';
  position: absolute;
  top: -20rpx;
  left: 0;
  right: 0rpx;
  height: 140rpx; /* 可根据效果再调 */
  background: #fff5dc;
  border-radius: 24rpx;
  z-index: -2;
}

.icons-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 35rpx;
  padding: 0 10rpx;
  /* 无背景，无边框，确保不被任何白色方框包住 */
  background: transparent;
  margin-top: -12rpx; /* 整体上移一点，不影响大小 */
}
/* 仅增大“陕味集”(第2个) 与 “陕非遗”(第3个) 的间距 */
.icons-bottom .icon-block:nth-child(2) { margin-right: 24rpx; }
.icons-bottom .icon-block:nth-child(3) { margin-left: 24rpx; }

.icon-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
}

.icon-img {
  width: 58rpx;    /* 再缩小 0.5 倍 */
  height: auto;
  display: block;
}
/* 仅放大顶部“陕面通”图标，不影响底部四个 */
.icons-top .icon-img { width: 68rpx; }

.icon-label {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #5a2c12;
  text-align: center;
}

/* 顶部“陕面通”图标白色圆形包裹层：让圆形白底看起来置于底栏内部 */
.top-circle-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 50%;
  padding: 18rpx;              /* 圆形白底厚度 */
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06); /* 轻阴影，避免突兀 */
  border: 0;
  position: relative;
  z-index: -2;                 /* 降低层级到底栏之下 */
}

/* 固定底部容器：确保图标始终贴底，并覆盖多余空白 */
.icons-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60rpx; 
  padding: 10rpx 20rpx 16rpx; /* 适度内边距，避免贴边 */
  background: transparent;
  z-index: 20; /* 降低层级，避免覆盖卡片 */
}
/* 统一底栏背景：白色圆角条，覆盖五个图标区域 */
.icons-fixed::before {
  content: '';
  position: absolute;
  left: 12rpx;
  right: 12rpx;
  bottom: -5rpx;
  top: 100rpx;  /* 下移背景上边界，避免压住卡片 */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  z-index: -1; /* 置于图标后面，仅作为背景 */
}
</style>

