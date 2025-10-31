(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/recipes/daily"],{

/***/ 84:
/*!************************************************************************!*\
  !*** C:/myprojects/chef_ai/main.js?{"page":"pages%2Frecipes%2Fdaily"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _daily = _interopRequireDefault(__webpack_require__(/*! ./pages/recipes/daily.vue */ 85));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_daily.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 85:
/*!*****************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/daily.vue ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./daily.vue?vue&type=template&id=0ded1d06& */ 86);
/* harmony import */ var _daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./daily.vue?vue&type=script&setup=true&lang=ts& */ 88);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./daily.vue?vue&type=style&index=0&lang=css& */ 90);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["render"],
  _daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/recipes/daily.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 86:
/*!************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/daily.vue?vue&type=template&id=0ded1d06& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./daily.vue?vue&type=template&id=0ded1d06& */ 87);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_template_id_0ded1d06___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 87:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/daily.vue?vue&type=template&id=0ded1d06& ***!
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
  var g0 = _vm.items.length
  var g1 = _vm.items.length
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

/***/ 88:
/*!*****************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/daily.vue?vue&type=script&setup=true&lang=ts& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_ts_loader_index_js_ref_14_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/ts-loader??ref--14-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-2!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./daily.vue?vue&type=script&setup=true&lang=ts& */ 89);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_ts_loader_index_js_ref_14_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_ts_loader_index_js_ref_14_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_ts_loader_index_js_ref_14_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_ts_loader_index_js_ref_14_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_ts_loader_index_js_ref_14_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_script_setup_true_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 89:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-2!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/daily.vue?vue&type=script&setup=true&lang=ts& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _vue = __webpack_require__(/*! vue */ 25);
var fallbackImg = '/static/yuan_97e57f821c79b841651df5b413309328.jpg';
var items = (0, _vue.ref)([]);
var groups = (0, _vue.ref)([]);
var _startX = 0;
function safeDecode(val) {
  if (typeof val !== 'string') return val;
  var result = val;
  for (var i = 0; i < 2; i++) {
    if (typeof result === 'string' && result.includes('%')) {
      try {
        var decoded = decodeURIComponent(result);
        if (decoded === result) break;
        result = decoded;
        continue;
      } catch (e) {
        break;
      }
    }
    break;
  }
  return result;
}
function findIndexById(id) {
  return (items.value || []).findIndex(function (x) {
    return String(x.id) === String(id);
  });
}
function buildGroups(list) {
  var map = {};
  list.forEach(function (it) {
    var d = it.plannedDate || '未安排';
    if (!map[d]) map[d] = [];
    var idx0 = findIndexById(it.id);
    if (idx0 >= 0) items.value[idx0]._gIndex = idx0;
    map[d].push(items.value[idx0]);
  });
  var todayBase = new Date();
  var base = new Date(todayBase.getFullYear(), todayBase.getMonth(), todayBase.getDate());
  var MS_PER_DAY = 86400000;
  var diffDays = function diffDays(ds) {
    if (!ds || ds === '未安排') return Number.POSITIVE_INFINITY;
    var parts = String(ds).split('-').map(Number);
    if (parts.length !== 3 || parts.some(function (n) {
      return Number.isNaN(n);
    })) return Number.POSITIVE_INFINITY;
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    return Math.abs((d.getTime() - base.getTime()) / MS_PER_DAY);
  };
  var keys = Object.keys(map).sort(function (a, b) {
    var da = diffDays(a);
    var db = diffDays(b);
    if (da !== db) return da - db;
    return a > b ? 1 : -1;
  });
  groups.value = keys.map(function (k) {
    return {
      date: k,
      items: map[k]
    };
  });
}
function loadData() {
  var ids = [];
  try {
    ids = uni.getStorageSync && uni.getStorageSync('favorites_recipes') || [];
  } catch (e) {
    ids = [];
  }
  var recent = [];
  var cards = {};
  var planned = {};
  try {
    recent = uni.getStorageSync && uni.getStorageSync('random_selection_data') || [];
  } catch (e) {
    recent = [];
  }
  try {
    cards = uni.getStorageSync && uni.getStorageSync('favorites_cards') || {};
  } catch (e) {
    cards = {};
  }
  try {
    planned = uni.getStorageSync && uni.getStorageSync('favorites_planned') || {};
  } catch (e) {
    planned = {};
  }
  var list = (ids || []).map(function (id) {
    var key = String(id);
    var fromCard = cards[key] || {};
    var fromRecent = (recent || []).find(function (x) {
      return String(x.id) === key;
    }) || {};
    var dateStr = planned[key] || '未安排';
    return {
      id: id,
      name: String(safeDecode(fromCard.name || fromRecent.name || '')),
      imageUrl: fromCard.imageUrl || fromRecent.cover || fromRecent.imageUrl || '',
      plannedDate: dateStr,
      _dx: 0,
      _open: false
    };
  });
  items.value = list;
  buildGroups(list);
}
function remove(it) {
  var key = String(it.id);
  var ids = (uni.getStorageSync && uni.getStorageSync('favorites_recipes') || []).map(function (x) {
    return String(x);
  });
  var idx = ids.indexOf(key);
  if (idx >= 0) {
    ids.splice(idx, 1);
    uni.setStorageSync && uni.setStorageSync('favorites_recipes', ids);
  }
  var meta = uni.getStorageSync && uni.getStorageSync('favorites_meta') || {};
  if (meta[key]) {
    delete meta[key];
    uni.setStorageSync && uni.setStorageSync('favorites_meta', meta);
  }
  var planned = uni.getStorageSync && uni.getStorageSync('favorites_planned') || {};
  if (planned[key]) {
    delete planned[key];
    uni.setStorageSync && uni.setStorageSync('favorites_planned', planned);
  }
  uni.showToast && uni.showToast({
    title: '已删除',
    icon: 'none'
  });
  loadData();
}
function onTouchStart(e, idx) {
  _startX = e.touches && e.touches[0] ? e.touches[0].clientX : 0;
  closeAll(idx);
}
function onTouchMove(e, idx) {
  var x = e.touches && e.touches[0] ? e.touches[0].clientX : 0;
  var dx = x - (_startX || 0);
  var clamped = Math.max(-200, Math.min(0, dx));
  var it = items.value[idx];
  if (it) {
    it._dx = clamped;
    it._open = clamped < -48;
  }
}
function onTouchEnd(e, idx) {
  var it = items.value[idx];
  if (!it) return;
  var endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : _startX || 0;
  var distance = Math.abs(endX - (_startX || 0));
  if (distance < 8) {
    it._dx = 0;
    it._open = false;
    setTimeout(function () {
      return handleTap(it);
    }, 0);
    return;
  }
  var dx = it._dx || 0;
  if (dx < -48) {
    it._dx = -140;
    it._open = true;
  } else {
    it._dx = 0;
    it._open = false;
  }
}
function closeAll() {
  var keepIdx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
  (items.value || []).forEach(function (row, i) {
    if (i !== keepIdx) {
      row._dx = 0;
      row._open = false;
    }
  });
}
function clearAll() {
  uni.removeStorageSync && uni.removeStorageSync('favorites_recipes');
  uni.removeStorageSync && uni.removeStorageSync('favorites_meta');
  uni.removeStorageSync && uni.removeStorageSync('favorites_planned');
  uni.showToast && uni.showToast({
    title: '已清空',
    icon: 'none'
  });
  loadData();
}
function handleTap(it) {
  onRowTap(it);
}
function onRowTap(it) {
  var idx = findIndexById(it.id);
  if (idx >= 0) {
    var row = items.value[idx];
    if (row && row._open) {
      row._dx = 0;
      row._open = false;
      return;
    }
  }
  closeAll();
  goDetail(it);
}
function goDetail(it) {
  var rawId = it && it.id != null ? safeDecode(String(it.id)) : '';
  var encodedId = typeof rawId === 'string' && rawId ? encodeURIComponent(rawId) : '';
  var url = encodedId ? "/pages/recipes/detail?id=".concat(encodedId) : '/pages/recipes/detail';
  uni.navigateTo && uni.navigateTo({
    url: url,
    fail: function fail() {
      uni.showToast && uni.showToast({
        title: '跳转失败，请检查 pages.json 是否已注册 detail 页面',
        icon: 'none'
      });
      uni.redirectTo && uni.redirectTo({
        url: url
      });
    }
  });
}
function goExplore() {
  if (uni.switchTab) {
    uni.switchTab({
      url: '/pages/recipes/index'
    });
  } else {
    uni.reLaunch && uni.reLaunch({
      url: '/pages/recipes/index'
    });
  }
}
(0, _vue.onMounted)(loadData);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 90:
/*!**************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/recipes/daily.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./daily.vue?vue&type=style&index=0&lang=css& */ 91);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_daily_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 91:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/recipes/daily.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[84,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recipes/daily.js.map