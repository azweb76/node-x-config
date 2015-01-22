[![Build Status](https://travis-ci.org/azweb76/node-x-config.png?branch=master)](https://travis-ci.org/azweb76/node-x-config)

#x-config
This package provides an easy way to access configuration information based on local or system configuration files. This package follows the following inheritance flow:

- ./config/default.json
- ./config/{{environment}}.json
- {{system}}/{{id}}.json
- {{system}}/default.json

NOTES:
- The locator climbs the path from the parent module location to the volume root looking for a config directory. This enables packages to maintain seperate configurations.
- The environment can be determined via HOSTNAME, or by placing env in default.json with dev, test, or prod, or pattern matching (see below).

##Usage

npm install x-config --save

```json
{
	"id": "my-app",
	"env": { "dev": "^dev", "test": "^test", "prod": "^prod" }, 
	"consoleEnabled": true
}
```

```javascript
var config = require('x-config');
if (config.consoleEnabled){
	console.log(config);
}
```

```javascript
var configFn = require('x-config'); // returns a function if _rest is enabled.

configFn(function(err, config){
  if (config.consoleEnabled){
    console.log(config);
  }
});
```

The path to the system configuration files can either be defined using a SYSTEM_CONFIG environment variable or set systemConfig in the default or environment config files.

```json
{ "systemConfig": "/etc/node/" }
```

To pull configuration from a REST service, use the following. This will cause the config library to return a function which you will want to call.

```json
{ "_rest": { "url": "http://myrestservice/...", "headers": { "X-AuthToken": "auth-token" } } }
```

