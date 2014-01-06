[![Build Status](https://travis-ci.org/azweb76/node-x-config.png?branch=master)](https://travis-ci.org/azweb76/node-x-config)

#x-config
This package provides an easy way to access configuration information based on local or system configuration files. This package follows the following inheritance flow:

- ./config/default.json
- ./config/{{environment}}.json
- {{system}}/{{id}}.json
- {{system}}/default.json

NOTE: The locator climbs the path from node_modules/x-config location to the volume root looking for a config directory. This enables packages to maintain seperate configurations.

##Usage

npm install x-config --save

```json
{
	"id": "my-app",
	"consoleEnabled": true
}
```

```javascript
var config = require('x-config');
if (config.consoleEnabled){
	console.log(config);
}
```

The path to the system configuration files can either be defined using a SYSTEM_CONFIG environment variable or set systemConfig in the default or environment variable.

```json
{ "systemConfig": "/etc/node/" }
```



