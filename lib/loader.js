var path   = require('path');
var cwd    = process.cwd();
var fs     = require('fs');
var extend = require('extend');

//var config = {};
//console.log(require('../config/development'));
//
//
var env = process.env.ENV || 'development';
var config = {};
//
var file = path.join(cwd, 'config', env + '.json');
console.log(file, require(file));

if (fs.existsSync(file)){
	config = extend(require(file), config);
}

file = path.join(cwd, 'config', 'default.json');
if (fs.existsSync(file)){
	config = extend(require(file), config);
}

var configPath = process.env.CONFIG_PATH || config.systemConfig;
if (configPath){
	if (config.id){
		file = path.join(configPath, config.id + '.json');
		if (fs.existsSync(file)){
			config = extend(require(file), config);
		}
	}
	
	file = path.join(configPath, 'default.json');
	if (fs.existsSync(file)){
		config = extend(require(file), config);
	}
}

module.exports = config;