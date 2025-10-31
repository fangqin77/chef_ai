(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/recipes/index"],{

/***/ 52:
/*!************************************************************************!*\
  !*** C:/myprojects/chef_ai/main.js?{"page":"pages%2Frecipes%2Findex"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/recipes/index.vue */ 53));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 53:
/*!*****************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/index.vue ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=2533633f& */ 54);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 56);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ 58);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/recipes/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 54:
/*!************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/index.vue?vue&type=template&id=2533633f& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=2533633f& */ 55);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_2533633f___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 55:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/index.vue?vue&type=template&id=2533633f& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = _vm.moreCats && _vm.moreCats.length
  var g1 = _vm.showAllCats && _vm.moreCats && _vm.moreCats.length
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, c) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        c = _temp2.c
      var _temp, _temp2
      _vm.activeCat = c.key
    }
    _vm.e1 = function ($event, c) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        c = _temp4.c
      var _temp3, _temp4
      _vm.activeCat = c.key
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 56:
/*!******************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 57);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 57:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _recipes = __webpack_require__(/*! ../../api/recipes.js */ 39);
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
  onLoad: function onLoad(options) {
    if (options && options.cat) {
      this.activeCat = options.cat;
    }
    // 推荐模式入口：/pages/recipes/index?recommend=1
    if (options && (options.recommend === '1' || options.recommend === 1 || options.recommend === true)) {
      this.recommendMode = true;
      this.pickRandom();
    }
    // 随机菜谱入口：从本页挑选4个并立刻打开第一个详情
    if (options && (options.random === '1' || options.random === 1 || options.random === true)) {
      var picked = this.pickFour();
      try {
        uni.setStorageSync('random_selection', (picked || []).map(function (x) {
          return x.id;
        }));
        uni.setStorageSync('random_selection_data', picked || []);
      } catch (e) {}
      if (picked && picked.length) {
        this.openRecipe(picked[0]);
      } else {
        uni.showToast({
          title: '暂无菜谱可选',
          icon: 'none'
        });
      }
    }
  },
  onShow: function onShow() {
    var _this = this;
    var cat = uni.getStorageSync('recipes_cat');
    if (cat) {
      this.activeCat = cat;
      uni.removeStorageSync('recipes_cat');
    }
    // 调用 /api/recipes/list 接口
    console.log('开始请求菜谱数据...');
    (0, _recipes.getRecipes)().then(function (res) {
      console.log('菜谱接口响应数据:', res);
      var arr = Array.isArray(res) ? res : [];
      _this.list = arr.map(function (r) {
        return {
          id: r.id,
          // Recipe.id
          name: r.name || '菜谱',
          // Recipe.name
          cat: (0, _recipes.mapTypeIdToCat)(r.typeId),
          // 将后端typeId映射到前端分类key
          cover: r.feature || _recipes.DEFAULT_COVER,
          // 使用后端返回的feature字段或默认封面
          // 保留后端原始数据，方便后续使用
          originalData: r
        };
      });
      console.log('成功加载菜谱数量:', _this.list.length);
    }).catch(function (err) {
      console.error('获取菜谱列表失败：', err);
      console.log('错误详情:', JSON.stringify(err));
      // 使用模拟数据作为后备方案
      _this.list = _this.getMockData();
      uni.showToast({
        title: '后端服务不可用，使用模拟数据',
        icon: 'none',
        duration: 2000
      });
    });
  },
  data: function data() {
    return {
      recommendMode: false,
      reco: null,
      activeCat: 'all',
      cats: [{
        key: 'all',
        name: '全部'
      }, {
        key: 'cn',
        name: '中式'
      }, {
        key: 'west',
        name: '西式'
      }, {
        key: 'jp',
        name: '日式'
      }, {
        key: 'kr',
        name: '韩式'
      }, {
        key: 'chuancai',
        name: '川菜'
      }, {
        key: 'yuecai',
        name: '粤菜'
      }, {
        key: 'xianggai',
        name: '湘菜'
      }, {
        key: 'zhecai',
        name: '浙菜'
      }, {
        key: 'dongbei',
        name: '东北'
      }, {
        key: 'xibei',
        name: '西北'
      }, {
        key: 'jiachang',
        name: '家常'
      }, {
        key: 'sushi',
        name: '素食'
      }, {
        key: 'shaokao',
        name: '烧烤'
      }, {
        key: 'tianpin',
        name: '甜品'
      }],
      showAllCats: false,
      maxCats: 8,
      topCount: 6,
      // 接口返回数据列表
      list: []
    };
  },
  computed: {
    filteredList: function filteredList() {
      var _this2 = this;
      if (this.activeCat === 'all') return this.list;
      return this.list.filter(function (i) {
        return i.cat === _this2.activeCat;
      });
    },
    // 根据当前列表品类出现频次，热门在前（保持 'all' 置顶）
    orderedCats: function orderedCats() {
      var arr = this.cats || [];
      var counts = {};
      (this.list || []).forEach(function (i) {
        counts[i.cat] = (counts[i.cat] || 0) + 1;
      });
      var head = arr.filter(function (c) {
        return c.key === 'all';
      });
      var rest = arr.filter(function (c) {
        return c.key !== 'all';
      }).sort(function (a, b) {
        return (counts[b.key] || 0) - (counts[a.key] || 0);
      });
      return [].concat((0, _toConsumableArray2.default)(head), (0, _toConsumableArray2.default)(rest));
    },
    topCats: function topCats() {
      var arr = this.orderedCats || this.cats || [];
      var n = Math.min(this.topCount || 8, arr.length);
      return arr.slice(0, n);
    },
    moreCats: function moreCats() {
      var arr = this.orderedCats || this.cats || [];
      return arr.slice(4);
    }
  },
  methods: {
    // 随机挑选四个菜谱
    pickFour: function pickFour() {
      var src = this.list || [];
      var n = Math.min(4, src.length);
      var pool = (0, _toConsumableArray2.default)(src);
      var res = [];
      for (var i = 0; i < n; i++) {
        var idx = Math.floor(Math.random() * pool.length);
        res.push(pool.splice(idx, 1)[0]);
      }
      return res;
    },
    // 推荐模式方法
    pickRandom: function pickRandom() {
      if (!this.list || this.list.length === 0) {
        this.reco = null;
        return;
      }
      var idx = Math.floor(Math.random() * this.list.length);
      this.reco = this.list[idx];
    },
    cancelRecommend: function cancelRecommend() {
      var pages = getCurrentPages && getCurrentPages();
      if (pages && pages.length > 1) {
        uni.navigateBack({
          delta: 1
        });
      } else {
        this.recommendMode = false;
      }
    },
    nextRecommend: function nextRecommend() {
      this.pickRandom();
    },
    onSearch: function onSearch() {
      uni.showToast({
        title: '搜索暂未接入',
        icon: 'none'
      });
    },
    openRecipe: function openRecipe(r) {
      // 跳转到详情页并传参（名称/做法/原料/调料/特性/图片）
      var q = ['id=' + encodeURIComponent(r.id || ''), 'name=' + encodeURIComponent(r.name || ''), 'imageUrl=' + encodeURIComponent(r.cover || '')].join('&');
      uni.navigateTo({
        url: '/pages/recipes/detail?' + q
      });
    },
    toggleCats: function toggleCats() {
      this.showAllCats = !this.showAllCats;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 58:
/*!**************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/index.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=css& */ 59);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 59:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/index.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[52,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recipes/index.js.map