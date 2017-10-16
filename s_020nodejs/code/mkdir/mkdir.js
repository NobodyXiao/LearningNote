/*
* @Author: anchen
* @Date:   2016-11-30 08:00:00
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-30 08:29:32
*/

'use strict';
// 引入模块
var mkdirs = require('./mkdirModule');
var path = require('path');
mkdirs(process.argv[2], (err) => { console.log(err); });