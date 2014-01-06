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
        var actual = locator('/my/path', __dirname, function(p, addedPath){
            return path.join(p, addedPath);
        });
        assert.equal(actual, '/my/path/config', 'should match expected path');
        done();
    });
});