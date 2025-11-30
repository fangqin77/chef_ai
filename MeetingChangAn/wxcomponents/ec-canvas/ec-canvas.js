const isWeapp = typeof wx !== 'undefined';

Component({
  properties: {
    canvasId: { type: String, value: 'ec-canvas' },
    ec: { type: Object },
    disableTouch: { type: Boolean, value: false }
  },
  lifetimes: {
    ready() { this.init(); }
  },
  methods: {
    init() {
      const ec = this.data.ec;
      if (!ec || typeof ec.onInit !== 'function') {
        console.warn('请传入 ec 对象，包含 onInit：<ec-canvas :ec="{ onInit: initChart }" />');
        return;
      }
      const sys = isWeapp && wx.getSystemInfoSync ? wx.getSystemInfoSync() : { pixelRatio: 1 };
      const dpr = sys.pixelRatio || 1;

      const query = wx.createSelectorQuery().in(this);
      // 关键：node: true 可拿到 2D Canvas 节点
      query.select('.ec-canvas').fields({ node: true, size: true }).exec(res => {
        if (!res || !res[0] || !res[0].node) {
          console.error('未获取到 2D Canvas 节点，请在开发者工具启用 2D Canvas，基础库≥2.9.2');
          return;
        }
        const canvas = res[0].node;
        const width = res[0].width;
        const height = res[0].height;

        // 设置像素比，避免模糊
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext && canvas.getContext('2d');
        if (!ctx) {
          console.error('canvas.getContext 不可用，请确认启用 2D Canvas');
          return;
        }

        try {
          const echarts = require('./echarts.js');
          const WxCanvas = require('./wx-canvas.js').default || require('./wx-canvas.js');
          const canvasWrap = new WxCanvas(ctx, this.data.canvasId, true, canvas);
          // 使用适配后的 WxCanvas 初始化，避免浏览器 API 依赖
          const chart = (ec.onInit && ec.onInit(canvasWrap, width, height, dpr)) || echarts.init(canvasWrap, null, {
            renderer: 'canvas',
            width,
            height,
            devicePixelRatio: dpr
          });
          if (canvasWrap.setChart) canvasWrap.setChart(chart);
          this._canvas = canvasWrap;
          this._chart = chart;
        } catch (e) {
          console.error('加载 echarts.js 失败或初始化异常，请确认文件已放置 wxcomponents/ec-canvas/echarts.js', e);
        }
      });
    },
    touchStart(e) {
      if (this.data && this.data.disableTouch) return;
      if (this._canvas && this._canvas.event && this._canvas.event.touchStart) this._canvas.event.touchStart(e);
    },
    touchMove(e) {
      if (this.data && this.data.disableTouch) return;
      if (this._canvas && this._canvas.event && this._canvas.event.touchMove) this._canvas.event.touchMove(e);
    },
    touchEnd(e) {
      if (this.data && this.data.disableTouch) return;
      if (this._canvas && this._canvas.event && this._canvas.event.touchEnd) this._canvas.event.touchEnd(e);
    },
    getChart() { return this._chart; }
  }
});