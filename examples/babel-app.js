/* 由于修饰器属于ES7的特性，ES6要支持的话，需要用babel进行转码 */
require('babel-register')
/* 这里是为了使ES5的环境，支持ES6的api，可以根据情况添加 */
// require('babel-polyfill')
require('./app')
