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

	module.exports = __webpack_require__(6);


/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';

	var app = getApp();

	Page({
	    data: {
	        hiddenLoading: true,
	        // details: { investorName: "", taWealthAcctlist:[{prodName:'',issueId:0,totalAsset:0,]}
	        details: {}
	    },
	    onLoad: function onLoad() {
	        var $this = this;
	        $this.setData({
	            hiddenLoading: false
	        });
	        wx.getStorage({
	            key: 'JSESSIONID',
	            success: function success(res) {
	                wx.request({
	                    url: 'http://10.10.10.204/jgb-web/v1/wealth/taAcctDetail',
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            var newData = resData.data.orgTaAcctlist;
	                            $this.setData({
	                                hiddenLoading: true,
	                                details: newData
	                            });
	                        }
	                    }
	                });
	            },
	            fail: function fail() {
	                // wx.switchTab({ url: '../wealth/wealth' });
	                wx.redirectTo({ url: '../index/index' });
	            }
	        });
	    }

	});

/***/ }

/******/ });