var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var locator = require('../../../lib/locator');
var path = require('path');

describe("locator", function() {
    it("is function", function(done) {
        assert.isFunction(locator, 'should be a function');
        done();
    });
    
    it("should locate config dir", function(done) {
        var p = path.sep + 'my' + path.sep + 'path';
        var actual = locator(p, __dirname, function(p, addedPath){
            return path.join(p, addedPath);
        });
        assert.equal(actual, p + path.sep + 'config', 'should match expected path');
        done();
    });
});