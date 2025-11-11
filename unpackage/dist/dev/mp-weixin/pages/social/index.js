(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/social/index"],{

/***/ 72:
/*!***********************************************************************!*\
  !*** C:/myprojects/chef_ai/main.js?{"page":"pages%2Fsocial%2Findex"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/social/index.vue */ 73));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 73:
/*!****************************************************!*\
  !*** C:/myprojects/chef_ai/pages/social/index.vue ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=03cabca9& */ 74);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 76);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=css& */ 78);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 35);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/social/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 74:
/*!***********************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/social/index.vue?vue&type=template&id=03cabca9& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=03cabca9& */ 75);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_03cabca9___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 75:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/social/index.vue?vue&type=template&id=03cabca9& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var g0 = !_vm.loading ? !_vm.loading && _vm.posts.length === 0 : null
  var l2 =
    !_vm.loading && !g0
      ? _vm.__map(_vm.posts, function (p, __i0__) {
          var $orig = _vm.__get_orig(p)
          var m0 = _vm.hasImages(p)
          var m1 = _vm.hasImages(p)
          var m2 = m1 ? _vm.gridCols(p) : null
          var l0 = m1
            ? _vm.__map(_vm.getImages(p) || [], function (img, idx) {
                var $orig = _vm.__get_orig(img)
                var m3 = _vm.getImageUrl(img)
                return {
                  $orig: $orig,
                  m3: m3,
                }
              })
            : null
          var m4 = _vm.hasImages(p)
          var m5 = m4 ? _vm.displayTime(p) : null
          var m6 = p._menuOpen ? _vm.getCommentCount(p.id) : null
          var g1 = _vm.getComments(p.id).length
          var l1 = g1 ? _vm.getComments(p.id) : null
          return {
            $orig: $orig,
            m0: m0,
            m1: m1,
            m2: m2,
            l0: l0,
            m4: m4,
            m5: m5,
            m6: m6,
            g1: g1,
            l1: l1,
          }
        })
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, p, idx) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        p = _temp2.p,
        idx = _temp2.idx
      var _temp, _temp2
      return _vm.onImageTap(p, idx)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        l2: l2,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 76:
/*!*****************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/social/index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 77);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 77:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/social/index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 43));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 45));
var _recipes = __webpack_require__(/*! @/api/recipes */ 42);
var _user = __webpack_require__(/*! @/api/user */ 30);
var _methods;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      posts: [],
      commentsMap: {},
      // { [postId]: [{name,text,time}] }
      inputMap: {},
      // { [postId]: 'input text' }
      focusMap: {},
      // { [postId]: boolean }
      loading: false,
      // 加载状态
      sendingComment: false // 防止重复发送评论
    };
  },
  onShow: function onShow() {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var options, targetPostId, response, im, fm;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.loading = true;

              // 添加评论更新监听器
              _this.setupCommentsUpdateListener();

              // 获取URL参数中的postId
              options = getCurrentPages()[getCurrentPages().length - 1].options || {};
              targetPostId = options.postId || null;
              _context.prev = 4;
              _context.next = 7;
              return (0, _recipes.getCommunityPosts)(1, 50);
            case 7:
              response = _context.sent;
              // 增加获取数量

              if (response && response.list) {
                // 如果接口返回的 list 为空，显示提示
                if (response.list.length === 0) {
                  _this.posts = [];
                } else {
                  // 处理帖子数据，直接使用后端返回的用户信息
                  _this.posts = response.list.map(function (post) {
                    // 直接使用后端返回的用户信息
                    var nickname = post.user_nickname || '美食达人';
                    var avatar = post.user_avatar_url || '/static/picture/profile.png';

                    // 处理时间显示
                    var displayTime = _this.getRelativeTime(new Date(post.updated_at || post.created_at).getTime());

                    // 处理点赞数
                    var likes = post.like_count || 0;

                    // 处理评论数
                    var commentCount = post.comment_count || 0;

                    // 处理图片
                    var images = [];
                    if (post.media_json) {
                      try {
                        images = JSON.parse(post.media_json);
                      } catch (e) {
                        console.error('解析 media_json 失败:', e);
                        images = [];
                      }
                    }
                    return _objectSpread(_objectSpread({}, post), {}, {
                      nickname: nickname,
                      avatar: avatar,
                      time: displayTime,
                      // 显示相对时间
                      likes: likes,
                      commentCount: commentCount,
                      images: images,
                      content: post.content || '',
                      _menuOpen: false,
                      _commenting: false
                    });
                  });

                  // 恢复收藏状态
                  _this.restoreLikedStatus(_this.posts);
                }
              } else {
                console.error('接口返回数据格式错误:', response);
                _this.posts = [];
              }

              // 初始化评论和焦点状态
              im = {};
              fm = {};
              _this.posts.forEach(function (post) {
                im[post.id] = '';
                fm[post.id] = false;
              });
              _this.inputMap = im;
              _this.focusMap = fm;

              // 从本地存储加载评论数据
              _this.loadCommentsFromStorage();

              // 如果传入了targetPostId，自动滚动到对应帖子
              if (targetPostId) {
                console.log('获取到目标帖子ID:', targetPostId, '当前帖子数量:', _this.posts.length);
                _this.$nextTick(function () {
                  setTimeout(function () {
                    _this.scrollToPost(targetPostId);
                  }, 1000); // 增加延迟时间，确保帖子列表完全加载
                });
              }
              _context.next = 23;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](4);
              console.error('获取所有用户帖子列表失败:', _context.t0);
              uni.showToast({
                title: '获取帖子列表失败',
                icon: 'none'
              });
              _this.posts = [];
            case 23:
              _context.prev = 23;
              _this.loading = false;
              return _context.finish(23);
            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 18, 23, 26]]);
    }))();
  },
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: '分享一篇美食圈作品',
      path: '/pages/social/index'
    };
  },
  computed: {
    anyMenuOpen: function anyMenuOpen() {
      return (this.posts || []).some(function (p) {
        return p && p._menuOpen;
      });
    },
    anyOverlayOpen: function anyOverlayOpen() {
      return (this.posts || []).some(function (p) {
        return p && (p._menuOpen || p._commenting);
      });
    }
  },
  methods: (_methods = {
    // 设置评论更新监听器
    setupCommentsUpdateListener: function setupCommentsUpdateListener() {
      var _this2 = this;
      // 监听评论更新事件
      uni.$on('commentsUpdated', function (data) {
        console.log('收到评论更新事件:', data);

        // 重新加载评论数据
        _this2.loadCommentsFromStorage();

        // 强制更新视图
        _this2.$forceUpdate();

        // 如果指定了特定帖子，可以刷新该帖子的评论显示
        if (data.postId && data.postId !== 'undefined' && data.postId !== 'unknown') {
          var postId = String(data.postId);
          console.log("\u5237\u65B0\u5E16\u5B50 ".concat(postId, " \u7684\u8BC4\u8BBA\u663E\u793A"));

          // 重新加载特定帖子的评论
          _this2.reloadPostComments(postId);
        } else {
          // 如果没有指定postId，刷新所有帖子的评论显示
          console.log('刷新所有帖子的评论显示');
          _this2.reloadAllPostsComments();
        }
      });
    },
    // 重新加载特定帖子的评论
    reloadPostComments: function reloadPostComments(postId) {
      if (this.posts && this.posts.length > 0) {
        var post = this.posts.find(function (p) {
          return String(p.id) === String(postId);
        });
        if (post) {
          // 重新加载该帖子的评论数据
          var socialComments = uni.getStorageSync('social_comments') || {};
          post.comments = socialComments[postId] || [];

          // 更新评论数量
          if (post.commentCount !== undefined) {
            post.commentCount = post.comments.length;
          }
        }
      }
    },
    // 重新加载所有帖子的评论
    reloadAllPostsComments: function reloadAllPostsComments() {
      if (this.posts && this.posts.length > 0) {
        var socialComments = uni.getStorageSync('social_comments') || {};
        this.posts.forEach(function (post) {
          var postId = String(post.id);
          if (socialComments[postId]) {
            post.comments = socialComments[postId];

            // 更新评论数量
            if (post.commentCount !== undefined) {
              post.commentCount = post.comments.length;
            }
          }
        });
      }
    },
    onImageTap: function onImageTap(p, idx) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var urls, current, token, list, key, existingIndex, entry, next;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                urls = _this3.getImages(p);
                current = urls[idx] || ''; // 写入浏览历史到后端
                _context2.prev = 2;
                token = uni.getStorageSync('token');
                if (!(token && p.id)) {
                  _context2.next = 10;
                  break;
                }
                _context2.next = 7;
                return (0, _recipes.recordBrowsingHistory)(p.id);
              case 7:
                console.log('浏览历史已记录到后端，帖子ID:', p.id);
                _context2.next = 11;
                break;
              case 10:
                console.log('用户未登录，跳过后端浏览历史记录');
              case 11:
                _context2.next = 16;
                break;
              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](2);
                console.error('记录浏览历史到后端失败:', _context2.t0);
                // 忽略后端错误，继续本地记录
              case 16:
                // 写入本地浏览历史
                try {
                  list = uni.getStorageSync('social_history') || []; // 生成唯一的key，避免重复
                  key = Date.now() + '_' + String(p.id || idx); // 检查是否已存在相同帖子的记录
                  existingIndex = list.findIndex(function (item) {
                    return item.postId === String(p.id);
                  });
                  if (existingIndex !== -1) {
                    // 如果已存在，更新记录
                    list[existingIndex].time = '刚刚';
                    list[existingIndex].cover = current || urls[0] || '';
                    list[existingIndex].title = String(p.content || p.nickname || '作品').slice(0, 60);
                  } else {
                    // 如果不存在，添加新记录
                    entry = {
                      key: key,
                      postId: String(p.id || ''),
                      title: String(p.content || p.nickname || '作品').slice(0, 60),
                      cover: current || urls[0] || '',
                      time: '刚刚'
                    };
                    list.unshift(entry);
                  }

                  // 限制历史记录数量，最多保存100条
                  next = list.slice(0, 100);
                  uni.setStorageSync('social_history', next);
                  console.log('浏览历史已记录到本地，帖子ID:', p.id);
                } catch (e) {
                  console.error('记录本地浏览历史失败:', e);
                }

                // 预览图片（支持缩放、双指缩放、长按保存等）
                if (urls.length) {
                  uni.previewImage({
                    current: current,
                    // 当前显示的图片
                    urls: urls,
                    // 需要预览的图片链接列表
                    indicator: 'number',
                    // 显示数字指示器
                    loop: true,
                    // 循环预览
                    longPressActions: {
                      // 长按菜单
                      itemList: ['发送给朋友', '保存图片', '收藏']
                    }
                  });
                }
              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 13]]);
      }))();
    },
    hasImages: function hasImages(p) {
      return !!(p && this.getImages(p).length > 0);
    },
    gridCols: function gridCols(p) {
      var len = this.getImages(p).length;
      if (len <= 1) return 1;
      if (len === 2) return 2;
      return 3;
    },
    // 获取图片数组
    getImages: function getImages(p) {
      if (!p) return [];

      // 处理 mediaJson 字段
      if (p.mediaJson) {
        try {
          var media = JSON.parse(p.mediaJson);
          if (Array.isArray(media)) {
            return media.map(function (item) {
              if (typeof item === 'string') return item;
              if (item && item.url) return item.url;
              return '';
            }).filter(function (url) {
              return url;
            });
          }
        } catch (e) {
          console.error('解析 mediaJson 失败:', e);
        }
      }

      // 处理 images 字段
      if (Array.isArray(p.images)) {
        return p.images.filter(function (url) {
          return url;
        });
      }
      return [];
    },
    // 处理图片URL
    getImageUrl: function getImageUrl(img) {
      if (!img) return '';

      // 检查是否是有效的URL
      if (img.startsWith('http://') || img.startsWith('https://')) {
        // 如果是网络图片，直接返回
        return img;
      }

      // 处理微信小程序临时文件路径（http://tmp/ 转为 wxfile://tmp/）
      if (img.startsWith('http://tmp/')) {
        // 在微信小程序中，临时文件路径应该是 wxfile://tmp/
        return img.replace('http://tmp/', 'wxfile://tmp/');
      }

      // 处理开发服务器临时文件路径
      if (img.startsWith('http://127.0.0.1')) {
        // 开发服务器临时文件可能不稳定，返回备选图片
        console.warn('开发服务器临时文件，使用备选图片:', img);
        return '/static/picture/profile.png';
      }

      // 处理wxfile协议路径（微信小程序专用）
      if (img.startsWith('wxfile://')) {
        return img;
      }

      // 处理data URI图片
      if (img.startsWith('data:image/')) {
        return img;
      }

      // 处理相对路径
      if (img.startsWith('/')) {
        return img;
      }

      // 对于其他情况，尝试直接返回
      console.warn('处理图片路径:', img);
      return img;
    },
    onCreate: function onCreate() {
      uni.navigateTo({
        url: '/pages/social/publish'
      });
    },
    // 跳转到用户简介页面
    goToUserProfile: function goToUserProfile(post) {
      if (!post || !post.id) {
        console.warn('帖子数据不完整，无法跳转到用户简介页面');
        return;
      }

      // 构建用户简介页面的参数
      // 注意：这里应该传递用户ID（user_id），而不是帖子ID（id）
      var params = {
        userId: post.user_id || post.id,
        // 优先使用user_id，如果没有则使用帖子id
        userName: post.nickname || post.name || '美食达人',
        userAvatar: post.avatar || '/static/picture/profile.png'
      };
      console.log('跳转到用户简介页面，参数:', params);

      // 编码参数
      var queryString = Object.keys(params).map(function (key) {
        return "".concat(key, "=").concat(encodeURIComponent(params[key]));
      }).join('&');
      uni.navigateTo({
        url: "/pages/profile/user-detail?".concat(queryString)
      });
    },
    closeAllMenus: function closeAllMenus() {
      var _this4 = this;
      (this.posts || []).forEach(function (item) {
        if (item && item._menuOpen) _this4.$set(item, '_menuOpen', false);
      });
    },
    closeAllOverlays: function closeAllOverlays() {
      var _this5 = this;
      (this.posts || []).forEach(function (item) {
        if (!item) return;
        if (item._menuOpen) _this5.$set(item, '_menuOpen', false);
        if (item._commenting) _this5.$set(item, '_commenting', false);
        var id = String(item.id);
        _this5.$set(_this5.focusMap, id, false);
      });
    },
    closeOverlayFor: function closeOverlayFor(p) {
      if (!p) return;
      // 只关闭菜单，不影响评论框
      this.$set(p, '_menuOpen', false);
    },
    toggleMenu: function toggleMenu(p) {
      var _this6 = this;
      // 先关闭其他帖子的菜单与评论框
      (this.posts || []).forEach(function (item) {
        if (!item) return;
        if (item._menuOpen) _this6.$set(item, '_menuOpen', false);
        if (item._commenting) _this6.$set(item, '_commenting', false);
        var id = String(item.id);
        _this6.$set(_this6.focusMap, id, false);
      });
      // 切换当前帖子的操作菜单（使用 $set 确保响应式），并收起当前帖子的评论框
      var next = !(p && p._menuOpen);
      this.$set(p, '_menuOpen', next);
      var pid = String(p.id);
      this.$set(this.focusMap, pid, false);
      this.$set(p, '_commenting', false);
    },
    // 计算相对时间
    displayTime: function displayTime(p) {
      var t = p && p.time;
      if (!t) return '刚刚';
      var s = String(t).trim().toLowerCase();
      if (!s || s === 'null' || s === 'undefined') return '刚刚';

      // 如果已经是相对时间格式（如：5分钟前），直接返回
      if (s.includes('前') || s.includes('分钟') || s.includes('小时') || s.includes('天') || s.includes('月') || s.includes('年')) {
        return t;
      }

      // 如果是时间戳格式，计算相对时间
      var timestamp = null;

      // 尝试解析时间戳（秒或毫秒）
      if (/^\d+$/.test(s)) {
        timestamp = parseInt(s);
        // 如果时间戳是秒级（小于当前时间戳的10倍），转换为毫秒
        if (timestamp < 1000000000000) {
          timestamp *= 1000;
        }
      } else {
        // 尝试解析日期字符串
        try {
          timestamp = new Date(s).getTime();
        } catch (e) {
          console.warn('无法解析时间格式:', t);
          return t;
        }
      }

      // 如果解析失败，返回原始时间
      if (!timestamp || isNaN(timestamp)) {
        return t;
      }
      return this.getRelativeTime(timestamp);
    },
    // 获取相对时间（如：5分钟前、2小时前）
    getRelativeTime: function getRelativeTime(timestamp) {
      var now = Date.now();
      var diff = now - timestamp;

      // 小于1分钟
      if (diff < 60000) {
        return '刚刚';
      }

      // 小于1小时
      if (diff < 3600000) {
        var minutes = Math.floor(diff / 60000);
        return "".concat(minutes, "\u5206\u949F\u524D");
      }

      // 小于1天
      if (diff < 86400000) {
        var hours = Math.floor(diff / 3600000);
        return "".concat(hours, "\u5C0F\u65F6\u524D");
      }

      // 小于1个月
      if (diff < 2592000000) {
        var days = Math.floor(diff / 86400000);
        return "".concat(days, "\u5929\u524D");
      }

      // 小于1年
      if (diff < 31536000000) {
        var months = Math.floor(diff / 2592000000);
        return "".concat(months, "\u4E2A\u6708\u524D");
      }

      // 超过1年
      var years = Math.floor(diff / 31536000000);
      return "".concat(years, "\u5E74\u524D");
    },
    startComment: function startComment(p) {
      if (!p) return;
      this.$set(p, '_menuOpen', false);
      this.$set(p, '_commenting', true);
      var id = String(p.id);
      this.$set(this.focusMap, id, true);
    },
    endComment: function endComment(p) {
      if (!p) return;
      var id = String(p.id);
      var text = (this.inputMap[id] || '').trim();

      // 失焦时仅取消焦点，不自动收起评论框
      this.$set(this.focusMap, id, false);

      // 只有在输入框为空且用户明确点击了其他地方时才收起评论框
      // 这里不自动收起，让用户通过点击其他地方或明确操作来关闭
    },
    toggleLike: function toggleLike(p) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var id, token, response, _response;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (p) p._menuOpen = false;
                id = String(p.id);
                _context3.prev = 2;
                token = uni.getStorageSync('token');
                if (token) {
                  _context3.next = 7;
                  break;
                }
                uni.showToast({
                  title: '请先登录',
                  icon: 'none'
                });
                return _context3.abrupt("return");
              case 7:
                if (!p.liked) {
                  _context3.next = 14;
                  break;
                }
                _context3.next = 10;
                return (0, _recipes.cancelLikePost)(id);
              case 10:
                response = _context3.sent;
                if (response && response.success) {
                  _this7.$set(p, 'liked', false);
                  _this7.$set(p, 'likes', Math.max((p.likes || 0) - 1, 0));
                  // 从本地存储中移除收藏状态和帖子信息
                  _this7.removeFromLikedPosts(id);
                  uni.showToast({
                    title: '已取消收藏',
                    icon: 'none'
                  });
                } else {
                  uni.showToast({
                    title: (response === null || response === void 0 ? void 0 : response.message) || '取消收藏失败',
                    icon: 'none'
                  });
                }
                _context3.next = 18;
                break;
              case 14:
                _context3.next = 16;
                return (0, _recipes.likePost)(id);
              case 16:
                _response = _context3.sent;
                if (_response && _response.success) {
                  _this7.$set(p, 'liked', true);
                  _this7.$set(p, 'likes', (p.likes || 0) + 1);
                  // 保存到本地存储
                  _this7.saveToLikedPosts(p);
                  uni.showToast({
                    title: '已收藏',
                    icon: 'none'
                  });
                } else {
                  uni.showToast({
                    title: (_response === null || _response === void 0 ? void 0 : _response.message) || '收藏失败',
                    icon: 'none'
                  });
                }
              case 18:
                _context3.next = 24;
                break;
              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](2);
                console.error('点赞操作失败:', _context3.t0);
                uni.showToast({
                  title: '操作失败，请重试',
                  icon: 'none'
                });
              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 20]]);
      }))();
    },
    // 保存收藏状态和帖子信息到本地存储
    saveToLikedPosts: function saveToLikedPosts(post) {
      try {
        var postId = String(post.id);

        // 保存收藏状态
        var likedPosts = uni.getStorageSync('liked_posts') || {};
        likedPosts[postId] = true;
        uni.setStorageSync('liked_posts', likedPosts);

        // 保存帖子信息到收藏列表
        var favoritesList = uni.getStorageSync('favorites_list') || {};

        // 提取需要保存的帖子信息
        var favoritePost = {
          id: postId,
          name: post.nickname || post.userName || post.name || '用户',
          nickname: post.nickname || post.userName || post.name || '用户',
          content: post.content || '',
          images: this.getImages(post),
          time: post.time || '刚刚',
          likes: post.likes || 0,
          avatar: post.avatar || '/static/picture/profile.png',
          collectedAt: new Date().toISOString() // 收藏时间
        };

        favoritesList[postId] = favoritePost;
        uni.setStorageSync('favorites_list', favoritesList);
      } catch (error) {}
    },
    // 从本地存储中移除收藏状态和帖子信息
    removeFromLikedPosts: function removeFromLikedPosts(postId) {
      try {
        // 移除收藏状态
        var likedPosts = uni.getStorageSync('liked_posts') || {};
        delete likedPosts[postId];
        uni.setStorageSync('liked_posts', likedPosts);

        // 移除收藏列表中的帖子信息
        var favoritesList = uni.getStorageSync('favorites_list') || {};
        delete favoritesList[postId];
        uni.setStorageSync('favorites_list', favoritesList);
      } catch (error) {}
    },
    // 从本地存储恢复收藏状态
    restoreLikedStatus: function restoreLikedStatus(posts) {
      var _this8 = this;
      try {
        var likedPosts = uni.getStorageSync('liked_posts') || {};
        posts.forEach(function (post) {
          if (post && post.id) {
            var postId = String(post.id);
            if (likedPosts[postId]) {
              _this8.$set(post, 'liked', true);
            }
          }
        });
      } catch (error) {}
    },
    getComments: function getComments(pid) {
      var _this9 = this;
      var cm = this.commentsMap || {};
      var list = cm[String(pid)] || [];

      // 过滤评论：只显示作者和当前用户的评论
      var filteredList = list.filter(function (comment) {
        // 显示当前用户的评论
        if (comment.userId === 'current') {
          return true;
        }

        // 显示帖子作者的评论（需要从帖子信息中获取作者ID）
        var post = _this9.posts.find(function (p) {
          return String(p.id) === String(pid);
        });
        if (post && comment.userId === String(post.userId)) {
          return true;
        }
        return false;
      });
      return Array.isArray(filteredList) ? filteredList : [];
    },
    // 从本地存储加载评论数据
    loadCommentsFromStorage: function loadCommentsFromStorage() {
      try {
        var savedComments = uni.getStorageSync('social_comments');
        if (savedComments) {
          this.commentsMap = savedComments;
        } else {
          this.commentsMap = {};
        }
      } catch (error) {
        console.error('加载评论数据失败:', error);
        this.commentsMap = {};
      }
    },
    // 格式化制作方法
    formatMethod: function formatMethod(method) {
      if (!method) return '';
      // 去除换行符和多余空格，用句号分隔步骤
      return method.replace(/\r?\n+/g, '。') // 换行改成句号
      .replace(/\s+/g, ' ') // 去除多余空格
      .trim(); // 去除首尾空格
    },
    getCommentCount: function getCommentCount(pid) {
      // 优先使用后端返回的 comment_count 字段
      var post = this.posts.find(function (p) {
        return String(p.id) === String(pid);
      });
      if (post && (post.commentCount || post.comment_count)) {
        return post.commentCount || post.comment_count;
      }

      // 如果没有后端字段，使用本地评论数量
      return this.getComments(pid).length;
    },
    focusComment: function focusComment(p) {
      var _this10 = this;
      if (!p) return;

      // 先关闭其他帖子的菜单与评论框
      (this.posts || []).forEach(function (item) {
        if (!item) return;
        if (item._menuOpen) _this10.$set(item, '_menuOpen', false);
        if (item._commenting && item.id !== p.id) {
          _this10.$set(item, '_commenting', false);
          var itemId = String(item.id);
          _this10.$set(_this10.focusMap, itemId, false);
        }
      });

      // 打开当前帖子的评论框
      this.$set(p, '_menuOpen', false);
      this.$set(p, '_commenting', true);
      var id = String(p.id);
      this.$set(this.focusMap, id, true);

      // 确保输入框为空
      this.$set(this.inputMap, id, '');
    },
    handleSendComment: function handleSendComment(p) {
      var _this11 = this;
      console.log('发送按钮被点击，帖子ID:', p.id);
      // 防止重复点击
      if (this.sendingComment) {
        console.log('正在发送评论，请稍候...');
        return;
      }
      this.sendingComment = true;
      this.submitComment(p).finally(function () {
        _this11.sendingComment = false;
      });
    }
  }, (0, _defineProperty2.default)(_methods, "handleSendComment", function handleSendComment(p) {
    var _this12 = this;
    console.log('发送按钮被点击，帖子ID:', p.id);
    // 防止重复点击
    if (this.sendingComment) {
      console.log('正在发送评论，请稍候...');
      return;
    }
    this.sendingComment = true;
    this.submitComment(p).finally(function () {
      _this12.sendingComment = false;
    });
  }), (0, _defineProperty2.default)(_methods, "submitComment", function submitComment(p) {
    var _this13 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
      var pid, text, token;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log('submitComment 方法被调用，帖子ID:', p.id);
              pid = String(p.id);
              text = (_this13.inputMap[pid] || '').trim();
              if (text) {
                _context4.next = 6;
                break;
              }
              uni.showToast({
                title: '请输入评论内容',
                icon: 'none'
              });
              return _context4.abrupt("return");
            case 6:
              // 立即显示评论发送中提示
              uni.showToast({
                title: '评论发送中...',
                icon: 'loading',
                duration: 2000
              });

              // 检查用户是否登录
              token = uni.getStorageSync('token');
              if (token) {
                _context4.next = 11;
                break;
              }
              uni.showToast({
                title: '请先登录后再评论',
                icon: 'none'
              });
              return _context4.abrupt("return");
            case 11:
              // 使用 uni.request 直接调用后端API，避免 console.log 问题
              uni.request({
                url: "http://172.20.10.3:9000/api/community/posts/".concat(pid, "/comments"),
                method: 'POST',
                header: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                },
                data: {
                  content: text
                },
                success: function success(res) {
                  console.log('API调用成功，响应:', res);

                  // 服务器保存成功，保存到本地
                  var one = {
                    name: '我',
                    text: text,
                    time: '刚刚',
                    userId: 'current',
                    avatar: uni.getStorageSync('userAvatar') || '/static/picture/profile.png'
                  };
                  var cm = _objectSpread({}, _this13.commentsMap || {});
                  var list = Array.isArray(cm[pid]) ? cm[pid].slice() : [];
                  list.push(one);
                  cm[pid] = list;
                  _this13.commentsMap = cm;
                  uni.setStorageSync('social_comments', cm);

                  // 清空输入框
                  _this13.$set(_this13.inputMap, pid, '');

                  // 更新评论数量显示
                  _this13.$set(p, 'commentCount', (p.commentCount || 0) + 1);

                  // 评论成功后，自动收起评论框
                  _this13.$set(p, '_commenting', false);
                  _this13.$set(_this13.focusMap, pid, false);
                  uni.showToast({
                    title: '评论成功',
                    icon: 'success'
                  });
                },
                fail: function fail(err) {
                  console.log('API调用失败，错误:', err);
                  // 如果API调用失败，只显示提示，不再本地保存（避免重复）
                  uni.showToast({
                    title: '评论发送失败，请重试',
                    icon: 'none'
                  });
                }
              });
            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }), (0, _defineProperty2.default)(_methods, "share", function share(p) {
    if (p) p._menuOpen = false;
    var link = "".concat(this.baseUrl(), "/#/pages/social/index?postId=").concat(encodeURIComponent(p.id));
    uni.setClipboardData({
      data: link,
      success: function success() {
        return uni.showToast({
          title: '链接已复制',
          icon: 'none'
        });
      },
      fail: function fail() {
        return uni.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
  }), (0, _defineProperty2.default)(_methods, "baseUrl", function baseUrl() {
    try {
      if (typeof location !== 'undefined' && location.origin) return location.origin;
    } catch (e) {}
    return 'https://example.com';
  }), (0, _defineProperty2.default)(_methods, "scrollToPost", function scrollToPost(postId) {
    var _this14 = this;
    if (!postId) return;
    console.log('开始滚动到帖子:', postId, '当前帖子列表:', this.posts);

    // 查找对应帖子的索引
    var targetIndex = this.posts.findIndex(function (post) {
      var postIdStr = String(postId);
      var currentPostIdStr = String(post.id);
      console.log('比较帖子ID:', '目标:', postIdStr, '当前:', currentPostIdStr, '是否相等:', postIdStr === currentPostIdStr);
      return postIdStr === currentPostIdStr;
    });
    if (targetIndex === -1) {
      console.warn('未找到帖子ID:', postId, '当前帖子列表ID:', this.posts.map(function (p) {
        return p.id;
      }));
      uni.showToast({
        title: '未找到对应的帖子',
        icon: 'none'
      });
      return;
    }
    console.log('找到帖子，准备滚动:', postId, '索引:', targetIndex);

    // 使用更简单的滚动方式，直接计算滚动位置
    this.$nextTick(function () {
      setTimeout(function () {
        // 计算每个帖子的高度（包括边距），大约为 400rpx
        var postHeight = 400; // 每个帖子的预估高度（rpx）
        var margin = 20; // 帖子之间的边距（rpx）
        var scrollTop = (postHeight + margin) * targetIndex;
        uni.pageScrollTo({
          scrollTop: scrollTop,
          duration: 500
        });
        console.log('已滚动到位置:', scrollTop);

        // 添加高亮效果（使用uni-app的方式）
        var targetPost = _this14.posts[targetIndex];
        if (targetPost) {
          // 临时添加高亮样式类
          targetPost._highlighted = true;
          setTimeout(function () {
            targetPost._highlighted = false;
          }, 2000);
        }
      }, 300);
    });
  }), (0, _defineProperty2.default)(_methods, "onImageError", function onImageError(e) {
    console.warn('图片加载失败:', e.detail);

    // 获取图片元素
    var imageElement = e.target || e.currentTarget;

    // 设置默认图片
    if (imageElement) {
      // 使用本地默认图片
      imageElement.src = '/static/default-recipe-cover.jpg';
    }

    // 如果是临时文件加载失败，静默处理，不显示错误
    if (e.detail && e.detail.errMsg && e.detail.errMsg.includes('http://tmp/')) {
      // 临时文件加载失败，已替换为默认图片
    }

    // 如果是示例图片加载失败，静默处理
    if (e.detail && e.detail.errMsg && e.detail.errMsg.includes('example.com')) {
      // 示例图片加载失败，已替换为默认图片
    }
  }), _methods)
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 78:
/*!*************************************************************************************!*\
  !*** C:/myprojects/chef_ai/pages/social/index.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.4.66.2025051912/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&lang=css& */ 79);
/* harmony import */ var _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_4_66_2025051912_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 79:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/myprojects/chef_ai/pages/social/index.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[72,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/social/index.js.map