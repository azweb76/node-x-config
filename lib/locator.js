/* jshint node:true */

'use strict';

var xpath = require('x-util').path;

function locate(path, defaultPath, locatorCb){
    var p = locatorCb(path, 'config');
    if (p === null) {
        p = defaultPath;
    }
    return p;
}

module.exports = locate;