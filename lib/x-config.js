/* jshint node:true */

'use strict';

var cwd    = process.cwd();
var loader = require('./loader');
var env = process.env.ENV || 'development';
var xpath = require('x-util').path;
var locator = require('./locator');
var path    = require('path');
var os      = require('os');

var configDir = locator(path.dirname(module.parent.filename), process.cwd(), xpath.find);
var config = loader(env, configDir, process.env.SYSTEM_CONFIG, os.hostname());

module.exports = config;