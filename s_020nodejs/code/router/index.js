/*
* @Author: anchen
* @Date:   2016-12-07 10:03:40
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-07 10:04:22
*/

'use strict';
var server = require("./server");
var router = require("./router");

server.start(router.route);