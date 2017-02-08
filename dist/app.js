/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	//app.js
	App({
	    // onLaunch: function() {
	    //     wx.login({
	    //         success: function(res) {
	    //             if (res.code) {
	    //                 //发起网络请求
	    //                 // wx.request({
	    //                 //   url: 'https://test.com/onLogin',
	    //                 //   data: {
	    //                 //     code: res.code
	    //                 //   }
	    //                 // })

	    //                 console.log(res.code)
	    //             } else {
	    //                 console.log('获取用户登录态失败！' + res.errMsg)
	    //             }
	    //         }

	    //     })
	    // onLaunch: function() { 
	    //     wx.getUserInfo({
	    //         success: function(res) {

	    //             let userInfo=res.userInfo;
	    //             console.log(userInfo.nickName)
	    //             console.log(userInfo.avatarUrl)
	    //             console.log(userInfo.gender )//性别 0：未知、1：男、2：女 
	    //             console.log(userInfo.province)
	    //             console.log(userInfo.city)
	    //             console.log(userInfo.country)
	    //         }
	    //     })
	    // },
	    // onShareAppMessage: function(){
	    //     return {
	    //         title: '自定义分享标题',
	    //         desc: '自定义分享描述',
	    //         path: '/page/user?id=123'
	    //     }
	    // },

	    globalData: {
	        userInfo: null
	    }
	});

/***/ }
/******/ ]);