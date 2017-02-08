var server1 = 'https://im.server1.url';
var server2 = 'https://im.server2.url';

var server = null;
// es6 版本
// if(NODE_ENV === 'dev') {
// 	server = server1;
// } else if(NODE_ENV === 'production') {
// 	server = server2;
// }

// es5 版本
if('NODE_ENV' === 'dev') { // NODE_ENV 要写字符串
	server = server1;
} else if('NODE_ENV' === 'production') {
	server = server2;
}
module.exports = server;