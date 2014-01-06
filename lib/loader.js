/* jshint node:true */

'use strict';

var path   = require('path');
var fs     = require('fs');
var extend = require('x-util').extend;

function loader(env, configDir, systemPath){
	var config = {};
	
	var file = path.join(configDir, env + '.json');
	if (fs.existsSync(file)){
		config = extend(readFile(file), config);
	}

	file = path.join(configDir, 'default.json');
	if (fs.existsSync(file)){
		config = extend(readFile(file), config);
	}

	var configPath = systemPath || config.systemConfig;
	if (configPath){
		if (config.id){
			file = path.join(configPath, config.id + '.json');
			if (fs.existsSync(file)){
				config = extend(readFile(file), config);
			}
		}
		
		file = path.join(configPath, 'default.json');
		if (fs.existsSync(file)){
			config = extend(readFile(file), config);
		}
	}
	
	return config;
}

function readFile(file){
	var s = fs.readFileSync(file, { encoding: 'utf8' });
	return JSON.parse(s);
}

module.exports = loader;