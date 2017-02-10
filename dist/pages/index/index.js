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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73);


/***/ },

/***/ 73:
/***/ function(module, exports) {

	'use strict';

	var app = getApp();

	Page({
	    data: {
	        eye: false,
	        user: '',
	        pwd: ''
	    },
	    switchEye: function switchEye(e) {
	        this.setData({
	            eye: !this.data.eye
	        });
	    },
	    bindPwd: function bindPwd(e) {
	        var val = e.detail.value;
	        this.setData({
	            pwd: val
	        });
	    },

	    bindUser: function bindUser(e) {
	        var val = e.detail.value;
	        this.setData({
	            user: val
	        });
	    },
	    login: function login() {
	        var user = this.data.user;
	        var pwd = this.data.pwd;

	        if (!user) {
	            wx.showModal({
	                title: '提示',
	                content: '请填写账号',
	                success: function success(res) {
	                    if (res.confirm) {
	                        console.log('用户点击确定');
	                    }
	                }
	            });
	        }
	        if (!pwd) {
	            wx.showModal({
	                title: '提示',
	                content: '请填写密码',
	                success: function success(res) {
	                    if (res.confirm) {
	                        console.log('用户点击确定');
	                    }
	                }
	            });
	        }
	        if (user != '' && pwd != '') {
	            wx.request({
	                url: 'http://10.10.10.204/jgb-web/v1/organ/login',
	                data: {
	                    telphone: user,
	                    passwd: pwd
	                },
	                method: 'POST',
	                header: {
	                    'content-type': 'application/json'
	                },
	                success: function success(res) {
	                    var resData = res.data;
	                    if (resData.errCode == 'J0009') {
	                        wx.showModal({
	                            title: '提示',
	                            content: '账户名或密码错误',
	                            success: function success(res) {
	                                if (res.confirm) {
	                                    console.log('用户点击确定');
	                                }
	                            }
	                        });
	                    }
	                }
	            });
	        }
	    }
	});

/***/ }

/******/ });