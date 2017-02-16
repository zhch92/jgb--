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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(2);

	var app = getApp();

	Page({
	    data: {
	        point: { totalPoint: 0, availPoint: 0.1, frozePoint: 0, availDate: 0 },
	        pointList: []
	    },
	    onLoad: function onLoad() {
	        var $this = this;
	        wx.getStorage({
	            key: 'JSESSIONID',
	            success: function success(res) {
	                wx.request({
	                    url: 'http://10.10.10.204/jgb-web/v1/points/point',
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            var oldData = resData.data;
	                            var newData = {};
	                            newData['totalPoint'] = util.thousands(oldData.totalPoint);
	                            newData['availPoint'] = util.thousands(oldData.availPoint);
	                            newData['frozePoint'] = util.thousands(oldData.frozePoint);
	                            newData['availDate'] = util.dateFormat(oldData.availDate, 'MM月dd日');
	                            $this.setData({
	                                point: newData
	                            });
	                        }
	                    }
	                });
	                wx.request({
	                    url: 'http://10.10.10.204/jgb-web/v1/points',
	                    header: {
	                        'content-type': 'application/json',
	                        'Cookie': 'JSESSIONID=' + res.data + ''
	                    },
	                    data: {
	                        type: -1,
	                        pageNo: 1
	                    },
	                    success: function success(res) {
	                        var resData = res.data;
	                        if (resData.errCode == '-1004') {
	                            wx.redirectTo({ url: '../index/index' });
	                        } else {
	                            var oldData = resData.data.resultList;
	                            var newData = oldData.map(function (obj) {
	                                var rObj = {};
	                                rObj['time'] = util.dateFormat(obj.time, 'yyyy-MM-dd');
	                                rObj['actionDesc'] = obj.actionDesc;
	                                rObj['investorName'] = obj.investorName;
	                                rObj['point'] = obj.point;
	                                rObj['productName'] = obj.productName;
	                                rObj['memo'] = util.formatMoney(obj.memo);
	                                return rObj;
	                            });
	                            $this.setData({
	                                pointList: newData
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function hint(msg) {
	    var headline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '提示';

	    wx.showModal({
	        title: headline,
	        content: msg,
	        success: function success(res) {
	            if (res.confirm) {
	                console.log('用户点击确定');
	            }
	        }
	    });
	}

	function setTitle(text) {
	    wx.setNavigationBarTitle({ title: text });
	    console.log(text);
	}

	function dateFormat(date, fmt) {
	    if (!isNaN(date) && date != null) {
	        var str = new Date(date);
	        var obj = {
	            'M+': str.getMonth() + 1,
	            'd+': str.getDate(),
	            'h+': str.getHours(),
	            'm+': str.getMinutes(),
	            's+': str.getSeconds(),
	            'q+': Math.floor((str.getMonth() + 3) / 3),
	            'S': str.getMilliseconds()
	        };
	        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
	        for (var k in obj) {
	            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? obj[k] : ('00' + obj[k]).substr(('' + obj[k]).length));
	        }return fmt;
	    } else {
	        return '';
	    }
	}
	/**
	* 数字千分位
	* @param {number} value - 数字
	* @returns {string}
	*/
	function thousands(value) {
	    if (!isNaN(value) && value != null) {
	        var s = parseFloat((value + '').replace(/[^\d.-]/g, '')) + '';
	        var l = s.split('.')[0].split('').reverse();
	        var t = '';
	        for (var i = 0; i < l.length; i++) {
	            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
	        }
	        return t.split('').reverse().join('');
	    } else {
	        return '0';
	    }
	}
	/**
	 * 数字千分位保留两位小数点
	 * @param {number} value - 数字
	 * @returns {string}
	 */

	function formatMoney(value) {
	    if (!isNaN(value) && value != null) {
	        var num = parseFloat(value).toFixed(2);
	        var regx = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
	        return num.replace(regx, "$1,");
	    } else {
	        return '0.00';
	    }
	}
	/**
	 * 小数点转百分号
	 * @param {number} value - 小数点
	 * @returns {string}
	 */
	function toPercent(value) {
	    var newValue = '',
	        digit = 4;

	    !isNaN(value) && value != null ? newValue = (value * 100).toFixed(digit) : newValue = 0 .toFixed(digit) + '%';
	    return newValue;
	}

	function tonIteger(value) {
	    var newValue = '',
	        digit = 0;

	    !isNaN(value) && value != null ? newValue = (value * 100000000).toFixed(digit) : newValue = 0 .toFixed(digit);
	    return newValue;
	}

	/**
	 * 小数点后保留固定位数
	 * @param {number} value - 数字
	 * @returns {string}
	 */
	function keepDecimal(value) {
	    var newValue = '',
	        digit = 4;

	    !isNaN(value) && value != null ? newValue = value.toFixed(digit) : newValue = 0 .toFixed(digit);
	    return newValue;
	}

	module.exports.hint = hint;
	exports.setTitle = setTitle;
	exports.dateFormat = dateFormat;
	exports.thousands = thousands;
	exports.formatMoney = formatMoney;
	exports.toPercent = toPercent;
	exports.keepDecimal = keepDecimal;
	exports.tonIteger = tonIteger;

/***/ }
/******/ ]);