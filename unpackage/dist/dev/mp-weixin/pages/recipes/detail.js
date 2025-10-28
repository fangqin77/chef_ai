(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/recipes/detail"],{

/***/ 57:
/*!*************************************************************************!*\
  !*** C:/myprojects/chef_ai/main.js?{"page":"pages%2Frecipes%2Fdetail"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/recipes/detail.vue */ 58));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 58:
/*!******************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/detail.vue ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=198c1434& */ 59);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 61);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&lang=css& */ 63);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/recipes/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 59:
/*!*************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/detail.vue?vue&type=template&id=198c1434& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=198c1434& */ 60);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_198c1434___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 60:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/detail.vue?vue&type=template&id=198c1434& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.steps.length
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.customPresetVisible = !_vm.customPresetVisible
    }
    _vm.e1 = function ($event) {
      _vm.timerRunning ? _vm.pauseTimer() : _vm.startTimer()
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 61:
/*!*******************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 62);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 62:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      fallbackImg: '/static/yuan_97e57f821c79b841651df5b413309328.jpg',
      selection: [],
      currentIndex: 0,
      recipe: {
        id: null,
        typeId: null,
        name: '',
        method: '',
        condiments: '',
        ingredients: '',
        feature: '',
        imageUrl: ''
      },
      favorites: [],
      todayPlan: [],
      timerPreset: 0,
      // 初始不选预设
      timerSeconds: 0,
      timerRunning: false,
      timerTick: null,
      timerStarted: false,
      customPresetVisible: false,
      customPresetMinutes: '',
      datePickerVisible: false,
      dateOptions: [],
      dateIso: [],
      _favKey: ''
    };
  },
  computed: {
    // 将“(1) … (2) …”或以换行分段的做法拆成步骤
    steps: function steps() {
      var m = this.recipe.method || '';
      if (!m) return [];
      // 优先匹配形如 (1)(2) 的编号段落
      var numbered = m.split(/\(\d+\)\s*/).filter(Boolean);
      if (numbered.length > 1) return numbered.map(function (s) {
        return s.trim();
      }).filter(Boolean);
      // 退化：按换行/顿号/句号切
      return m.split(/[\n。]/).map(function (s) {
        return s.trim();
      }).filter(Boolean);
    },
    isFavorited: function isFavorited() {
      var id = this.recipe.id;
      if (!id) return false;
      return (this.favorites || []).includes(String(id)) || (this.favorites || []).includes(Number(id));
    },
    isInPlan: function isInPlan() {
      var id = this.recipe.id;
      if (!id) return false;
      return (this.todayPlan || []).includes(String(id)) || (this.todayPlan || []).includes(Number(id));
    },
    timeLeft: function timeLeft() {
      var s = Math.max(0, this.timerSeconds || 0);
      var mm = String(Math.floor(s / 60)).padStart(2, '0');
      var ss = String(s % 60).padStart(2, '0');
      return "".concat(mm, ":").concat(ss);
    },
    progressPct: function progressPct() {
      var total = this.timerPreset || 0;
      if (!total || total <= 0) return 0;
      if (!this.timerStarted) return 0;
      var elapsed = Math.max(0, Math.min(total, total - (this.timerSeconds || 0)));
      return Math.round(elapsed / total * 100);
    }
  },
  onLoad: function onLoad(options) {
    // 接收路由参数，尽量兼容命名
    var id = (options === null || options === void 0 ? void 0 : options.id) || (options === null || options === void 0 ? void 0 : options.recipeId) || (options === null || options === void 0 ? void 0 : options.菜谱ID);
    var typeId = (options === null || options === void 0 ? void 0 : options.typeId) || (options === null || options === void 0 ? void 0 : options.菜谱类型号);
    var name = (options === null || options === void 0 ? void 0 : options.name) || (options === null || options === void 0 ? void 0 : options.菜谱名称);
    var method = (options === null || options === void 0 ? void 0 : options.method) || (options === null || options === void 0 ? void 0 : options.做法);
    var condiments = (options === null || options === void 0 ? void 0 : options.condiments) || (options === null || options === void 0 ? void 0 : options.调料);
    var ingredients = (options === null || options === void 0 ? void 0 : options.ingredients) || (options === null || options === void 0 ? void 0 : options.原料);
    var feature = (options === null || options === void 0 ? void 0 : options.feature) || (options === null || options === void 0 ? void 0 : options.特性);
    var imageUrl = (options === null || options === void 0 ? void 0 : options.imageUrl) || (options === null || options === void 0 ? void 0 : options.图片URL);

    // 如果仅传了 id=952，则填充示例数据
    if (id && String(id) === '952' && !name) {
      this.recipe = {
        id: 952,
        typeId: typeId || 101,
        name: '蛋花丝瓜汤',
        method: '(1)丝瓜洗净，去皮切片；香菜择洗干净切段。\n(2)油锅烧热，放入葱花炝锅，下丝瓜煸炒，加适量清水、盐煮沸后，倒入蛋花液，加香菜、味精即成。',
        condiments: '味精,盐,植物油',
        ingredients: '蛋黄1个30克,丝瓜100克',
        feature: feature || '',
        imageUrl: imageUrl || ''
      };
    } else {
      this.recipe = {
        id: id || null,
        typeId: typeId || null,
        name: name || '',
        method: method || '',
        condiments: condiments || '',
        ingredients: ingredients || '',
        feature: feature || '',
        imageUrl: imageUrl || ''
      };
    }

    // 若缺字段，尝试用本地收藏卡片/随机列表补齐
    this.hydrateById(this.recipe.id);

    // 读取本地存储
    try {
      this.favorites = uni.getStorageSync('favorites_recipes') || [];
      this.todayPlan = uni.getStorageSync('today_plan_recipes') || [];
    } catch (e) {
      this.favorites = [];
      this.todayPlan = [];
    }

    // 初始化计时（允许通过 ?preset=600 指定）
    var preset = parseInt((options === null || options === void 0 ? void 0 : options.preset) || '', 10);
    if (!isNaN(preset) && preset > 0) {
      this.timerPreset = preset;
    }
    this.timerSeconds = 0;

    // 加载四个随机菜谱选择列表
    try {
      var sel = uni.getStorageSync('random_selection_data') || [];
      if (Array.isArray(sel) && sel.length) {
        this.selection = sel;
        // 当前索引：根据传入的 id 定位
        var curId = this.recipe.id;
        var idx = sel.findIndex(function (x) {
          return String(x.id) === String(curId);
        });
        this.currentIndex = idx >= 0 ? idx : 0;
        // 统一当前展示为索引项（确保字段映射）
        this.applySelection(this.currentIndex);
      }
    } catch (e) {}
  },
  methods: {
    // 根据 id 从本地收藏/随机列表补齐详情字段
    hydrateById: function hydrateById(id) {
      if (!id) return;
      var key = String(id);
      try {
        var cards = uni.getStorageSync('favorites_cards') || {};
        var c = cards[key] || {};
        // 收藏卡片：补齐名称与封面
        if (!this.recipe.name && c.name) this.recipe.name = c.name;
        if (!this.recipe.imageUrl && c.imageUrl) this.recipe.imageUrl = c.imageUrl;
      } catch (e) {}
      try {
        var sel = uni.getStorageSync('random_selection_data') || [];
        if (Array.isArray(sel) && sel.length) {
          var s = sel.find(function (x) {
            return String(x.id) === key;
          }) || {};
          // 随机列表：尽量补齐更多字段
          if (!this.recipe.typeId && s.typeId != null) this.recipe.typeId = s.typeId;
          if (!this.recipe.name && s.name) this.recipe.name = s.name;
          if (!this.recipe.method && s.method) this.recipe.method = s.method;
          if (!this.recipe.condiments && s.condiments) this.recipe.condiments = s.condiments;
          if (!this.recipe.ingredients && s.ingredients) this.recipe.ingredients = s.ingredients;
          if (!this.recipe.feature && s.feature) this.recipe.feature = s.feature;
          if (!this.recipe.imageUrl && (s.cover || s.imageUrl)) this.recipe.imageUrl = s.cover || s.imageUrl;
        }
      } catch (e) {}
    },
    goBack: function goBack() {
      var pages = getCurrentPages && getCurrentPages();
      if (pages && pages.length > 1) {
        uni.navigateBack({
          delta: 1
        });
      } else {
        uni.switchTab ? uni.switchTab({
          url: '/pages/index/index'
        }) : uni.reLaunch({
          url: '/pages/index/index'
        });
      }
    },
    cancelAndBack: function cancelAndBack() {
      var pages = getCurrentPages && getCurrentPages();
      if (pages && pages.length > 1) {
        uni.navigateBack({
          delta: 1
        });
      } else {
        uni.reLaunch({
          url: '/pages/index/index'
        });
      }
    },
    // 应用选择项到详情
    applySelection: function applySelection(i) {
      if (!Array.isArray(this.selection) || !this.selection.length) return;
      var n = (i % this.selection.length + this.selection.length) % this.selection.length;
      this.currentIndex = n;
      var s = this.selection[n] || {};
      this.recipe = {
        id: s.id || null,
        typeId: s.typeId || null,
        name: s.name || '',
        method: s.method || '',
        condiments: s.condiments || '',
        ingredients: s.ingredients || '',
        feature: s.feature || '',
        imageUrl: s.cover || s.imageUrl || this.fallbackImg
      };
    },
    // 上一个/下一个
    prevSelection: function prevSelection() {
      if (!this.selection.length) return;
      this.applySelection(this.currentIndex - 1);
    },
    nextSelection: function nextSelection() {
      if (!this.selection.length) return;
      this.applySelection(this.currentIndex + 1);
    },
    // 收藏/计划本地存储
    saveStorage: function saveStorage() {
      uni.setStorageSync('favorites_recipes', this.favorites || []);
      uni.setStorageSync('today_plan_recipes', this.todayPlan || []);
    },
    toggleFavorite: function toggleFavorite() {
      var id = this.recipe.id;
      if (!id) return;
      var key = String(id);
      var arr = (this.favorites || []).map(function (x) {
        return String(x);
      });
      var idx = arr.indexOf(key);

      // 读取收藏时间元数据与名片
      var meta = {};
      var cards = {};
      try {
        meta = uni.getStorageSync('favorites_meta') || {};
        cards = uni.getStorageSync('favorites_cards') || {};
      } catch (e) {
        meta = {};
        cards = {};
      }
      if (idx >= 0) {
        // 取消收藏
        this.favorites.splice(idx, 1);
        if (meta[key]) delete meta[key];
        if (cards[key]) delete cards[key];
        // 同时去掉计划日期
        var planned = uni.getStorageSync('favorites_planned') || {};
        if (planned[key]) {
          delete planned[key];
          uni.setStorageSync('favorites_planned', planned);
        }
        uni.setStorageSync('favorites_meta', meta);
        uni.setStorageSync('favorites_cards', cards);
        uni.showToast({
          title: '已取消收藏',
          icon: 'none'
        });
        this.saveStorage();
      } else {
        // 先选择日期，再加入收藏
        this.planSelectDate(key);
      }
    },
    togglePlan: function togglePlan() {
      var id = this.recipe.id;
      if (!id) return;
      var key = String(id);
      var arr = (this.todayPlan || []).map(function (x) {
        return String(x);
      });
      var idx = arr.indexOf(key);
      if (idx >= 0) {
        this.todayPlan.splice(idx, 1);
        uni.showToast({
          title: '已移出计划',
          icon: 'none'
        });
      } else {
        this.todayPlan.push(key);
        uni.showToast({
          title: '已加入今日计划',
          icon: 'none'
        });
      }
      this.saveStorage();
    },
    // 计时器
    selectPreset: function selectPreset(sec) {
      if (this.timerRunning) this.pauseTimer();
      this.timerPreset = sec;
      this.timerSeconds = sec;
      this.timerStarted = false;
    },
    startTimer: function startTimer() {
      var _this = this;
      if (this.timerRunning) return;
      this.timerRunning = true;
      this.timerStarted = true;
      this.timerTick = setInterval(function () {
        if (_this.timerSeconds > 0) {
          _this.timerSeconds -= 1;
        } else {
          _this.pauseTimer();
          uni.showToast({
            title: '时间到！',
            icon: 'none'
          });
        }
      }, 1000);
    },
    pauseTimer: function pauseTimer() {
      this.timerRunning = false;
      if (this.timerTick) {
        clearInterval(this.timerTick);
        this.timerTick = null;
      }
    },
    resetTimer: function resetTimer() {
      this.pauseTimer();
      this.timerSeconds = 0;
      this.timerStarted = false;
    },
    applyCustomPreset: function applyCustomPreset() {
      var n = parseInt(this.customPresetMinutes, 10);
      if (isNaN(n) || n <= 0) {
        uni.showToast({
          title: '请输入有效分钟数',
          icon: 'none'
        });
        return;
      }
      var sec = n * 60;
      this.selectPreset(sec);
      this.customPresetVisible = false;
      uni.showToast({
        title: "\u5DF2\u8BBE\u5B9A".concat(n, "\u5206\u949F"),
        icon: 'none'
      });
    },
    // 选择待做日期（未来7天，自定义弹层）
    planSelectDate: function planSelectDate(key) {
      var today = new Date();
      var options = [];
      var isoDates = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        var y = d.getFullYear();
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        var iso = "".concat(y, "-").concat(m, "-").concat(day);
        var label = "".concat(m, "\u6708").concat(day, "\u65E5");
        if (i === 0) label = "".concat(m, "\u6708").concat(day, "\u65E5\uFF08\u4ECA\u65E5\uFF09");else if (i === 1) label = "".concat(m, "\u6708").concat(day, "\u65E5\uFF08\u660E\u65E5\uFF09");else if (i === 2) label = "".concat(m, "\u6708").concat(day, "\u65E5\uFF08\u540E\u65E5\uFF09");
        options.push(label);
        isoDates.push(iso);
      }
      this._favKey = String(key);
      this.dateOptions = options;
      this.dateIso = isoDates;
      this.datePickerVisible = true;
    },
    // 选择某个日期
    chooseDate: function chooseDate(pick) {
      var key = this._favKey;
      if (!key || pick == null) return;
      var dateStr = this.dateIso[pick];
      // 写入收藏与名片
      if (!this.favorites.map(String).includes(String(key))) {
        this.favorites.push(String(key));
      }
      var cards = {};
      try {
        cards = uni.getStorageSync('favorites_cards') || {};
      } catch (e) {
        cards = {};
      }
      cards[key] = {
        id: String(key),
        name: this.recipe.name || '',
        imageUrl: this.recipe.imageUrl || this.fallbackImg
      };
      uni.setStorageSync('favorites_cards', cards);
      // 写入计划日期
      var planned = {};
      try {
        planned = uni.getStorageSync('favorites_planned') || {};
      } catch (e) {
        planned = {};
      }
      planned[key] = dateStr;
      uni.setStorageSync('favorites_planned', planned);
      this.saveStorage();
      this.datePickerVisible = false;
      uni.showToast({
        title: "\u5DF2\u52A0\u5165".concat(dateStr, "\u5F85\u505A\u83DC\u8C31"),
        icon: 'none'
      });
    },
    // 关闭弹层
    closeDatePicker: function closeDatePicker() {
      this.datePickerVisible = false;
      uni.showToast({
        title: '已取消',
        icon: 'none'
      });
    },
    startCook: function startCook() {
      // 开始烹饪即启动计时
      if (!this.timerRunning) {
        this.startTimer();
        uni.showToast({
          title: '已开始烹饪～',
          icon: 'none'
        });
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 63:
/*!***************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/detail.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&lang=css& */ 64);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 64:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/detail.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[57,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recipes/detail.js.map