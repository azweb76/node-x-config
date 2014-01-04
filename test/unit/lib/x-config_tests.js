var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var config = require('../../../lib/x-config');

describe("x-config", function() {
    it("is object", function(done) {
        assert.isObject(config);
        done();
    });
});