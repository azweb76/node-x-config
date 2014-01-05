/* jshint node:true */

'use strict';

var cwd    = process.cwd();
var loader = require('./loader');
var env = process.env.ENV || 'development';

var config = loader(env, cwd, process.env.SYSTEM_CONFIG);

module.exports = config;