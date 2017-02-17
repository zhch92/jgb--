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

	module.exports = __webpack_require__(85);


/***/ },

/***/ 85:
/***/ function(module, exports) {

	'use strict';

	var app = getApp();

	Page({
	    data: {
	        trade: true,
	        hiddenLoading: true,
	        purchase: true,
	        redemption: true,
	        tradeList: [],
	        earningsList: []
	    },
	    tradeSwitch: function tradeSwitch() {
	        this.setData({
	            trade: true
	        });
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
	                    url: 'http://10.10.10.204/jgb-web/v1/tradelist',
	                    data: {
	                        startDate: '',
	                        endDate: '',
	                        pageNo: 1,
	                        txnType: ''
	                    },
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            $this.setData({
	                                hiddenLoading: true,

	                                tradeList: resData.data.resultList
	                            });
	                        }
	                    }
	                });
	            },
	            fail: function fail() {
	                wx.redirectTo({ url: '../index/index' });
	            }
	        });
	    },
	    purchase: function purchase() {
	        var $this = this;
	        $this.setData({
	            hiddenLoading: false
	        });

	        wx.getStorage({
	            key: 'JSESSIONID',
	            success: function success(res) {
	                wx.request({
	                    url: 'http://10.10.10.204/jgb-web/v1/tradelist',
	                    data: {
	                        startDate: '',
	                        endDate: '',
	                        pageNo: 1,
	                        txnType: 0
	                    },
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            $this.setData({
	                                hiddenLoading: true,
	                                tradeList: resData.data.resultList
	                            });
	                        }
	                    }
	                });
	            },
	            fail: function fail() {
	                wx.redirectTo({ url: '../index/index' });
	            }
	        });
	    },
	    redemption: function redemption() {
	        var $this = this;
	        $this.setData({
	            hiddenLoading: false
	        });
	        wx.getStorage({
	            key: 'JSESSIONID',
	            success: function success(res) {
	                wx.request({
	                    url: 'http://10.10.10.204/jgb-web/v1/tradelist',
	                    data: {
	                        startDate: '',
	                        endDate: '',
	                        pageNo: 1,
	                        txnType: 1
	                    },
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            $this.setData({
	                                hiddenLoading: true,

	                                tradeList: resData.data.resultList
	                            });
	                        }
	                    }
	                });
	            },
	            fail: function fail() {
	                wx.redirectTo({ url: '../index/index' });
	            }
	        });
	    },
	    earnings: function earnings() {
	        var $this = this;
	        $this.setData({
	            hiddenLoading: false
	        });

	        wx.getStorage({
	            key: 'JSESSIONID',
	            success: function success(res) {
	                wx.request({
	                    url: 'http://10.10.10.204/jgb-web/v1/wealth/income',
	                    data: {
	                        startDate: '',
	                        endDate: '',
	                        pageNo: 1
	                    },
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            $this.setData({
	                                trade: false,
	                                hiddenLoading: true,

	                                earningsList: resData.data.resultList
	                            });
	                        }
	                    }
	                });
	            },
	            fail: function fail() {
	                wx.redirectTo({ url: '../index/index' });
	            }
	        });
	    }

	});

/***/ }

/******/ });