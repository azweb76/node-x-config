/* jshint node:true */

'use strict';

var path   = require('path');
var fs     = require('fs');
var extend = require('x-util').extend;
var json   = require('x-util').json;
var http   = require('http');
var https   = require('https');
var url    = require('url');

function loader(defaultEnv, configDir, systemPath, hostName){
  var config = {}, defaultConfig = {};

  var file = path.join(configDir, 'default.json');
  if (fs.existsSync(file)){
    config = readFile(file);
  }

  var env = getEnv(config, hostName, defaultEnv);
  file = path.join(configDir, env + '.json');
  if (fs.existsSync(file)){
    var c = config; config = readFile(file);
    config = extend(config, c);
  }

  if (config.id){
    file = path.join(process.cwd(), config.id + '.json');
    if (fs.existsSync(file)){
      config = extend(config, readFile(file));
    }
  }

  var argFile = getArgFile(process.argv);
  if(argFile){
    file = path.resolve(argFile);
    if (fs.existsSync(file)){
      config = extend(config, readFile(file));
    }
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

  if(config._rest){

    var rest = config._rest;
    delete config._rest;
    
    return function(cb){

      var u = url.parse(rest.url);
      var opts = {
        hostname: u.hostname,
        port: u.port,
        path: u.path,
        method: 'GET',
        headers: rest.headers
      };

      var restConfig = null;
      var httpOrHttps = (u.protocol === 'http:' ? http : https);
      var req = httpOrHttps.request(opts, function(res){
        var c = '';
        res.on('data', function(data){
          c = c + data;
        });
        res.on('end', function(){
          try{
            restConfig = JSON.parse(c);
            writeBackupConfig(restConfig, rest);
            config = extend(config, restConfig);
            cb(null, config);
          }
          catch(err){
            restConfig = readBackupConfig(rest);
            if(restConfig){
              config = extend(config, restConfig);
              console.log('WARNING: failed to parse results from rest service %s. %s', rest.url, err);
              cb(null, config);
            }
            else {
              cb(err);
            }
          }
        });
      });
      req.on('error', function(e) {
        restConfig = readBackupConfig(rest);
        if(restConfig){
          config = extend(config, restConfig);
          console.log('WARNING: failed to read from rest service %s. %s', rest.url, e);
          cb(null, config);
        }
        else {
          cb(e);
        }
      });
      req.end();
    };
  }
  else {
    return config;
  }
}

function writeBackupConfig(config, opt){
  if(opt.backupFile){
    var file = path.resolve(opt.backupFile);
    fs.writeFileSync(file, JSON.stringify(config), { encoding: 'utf8' });
  }
}

function readBackupConfig( opt){
  if(opt.backupFile){
    var file = path.resolve(opt.backupFile);
    if(fs.existsSync(file)){
      return readFile(file);
    }
  }
  return null;
}

function getArgFile (argv) {
  for (var i = 0; i < argv.length; i++) {
    if(argv[i] === '--config'){
      return argv[i+1];
    }
  }
  return null;
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