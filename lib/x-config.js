/* jshint node:true */

'use strict';

var cwd    = process.cwd();
var loader = require('./loader');
var env = process.env.ENV || 'development';
var xpath = require('x-util').path;
var locator = require('./locator');

var configDir = locator(__dirname, process.cwd(), xpath.find);
var config = loader(env, configDir, process.env.SYSTEM_CONFIG);

module.exports = config;