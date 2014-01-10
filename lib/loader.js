/* jshint node:true */

'use strict';

var path   = require('path');
var fs     = require('fs');
var extend = require('x-util').extend;
var json   = require('x-util').json;

function loader(defaultEnv, configDir, systemPath){
	var config = {}, defaultConfig = {};

	var file = path.join(configDir, 'default.json');
	if (fs.existsSync(file)){
		config = readFile(file);
	}

	var env = getEnv(config, process.env.HOSTNAME, defaultEnv);
	file = path.join(configDir, env + '.json');
	if (fs.existsSync(file)){
		var c = config; config = readFile(file);
		console.log(c, config);
		config = extend(config, c);
	}

	var configPath = systemPath || config.systemConfig;
	if (configPath){
		if (config.id){
			file = path.join(configPath, config.id + '.json');
			if (fs.existsSync(file)){
				config = extend(config, readFile(file));
			}
		}
		
		file = path.join(configPath, 'default.json');
		if (fs.existsSync(file)){
			config = extend(config, readFile(file));
		}
	}

	if (config._linksEnabled){
		return json.resolveLinks(config);
	}
	return config;
}

function readFile(file){
	var s = fs.readFileSync(file, { encoding: 'utf8' });
	return JSON.parse(s);
}

function getEnv(config, hostname, defaultEnv){
	// { development: "^.{2}[d]", test: "^.{2}[t]", production: "^.{2}[p]" }
	var configEnv = config.env;
	if (configEnv){
		if (typeof configEnv === 'object'){
			for(var p in configEnv){
				if (new RegExp(configEnv[p]).test(hostname)){
					config.env = p;
					return p;
				}
			}
		}
		else {
			return configEnv;
		}
	}
	config.env = defaultEnv;
	return defaultEnv;
}

module.exports = loader;