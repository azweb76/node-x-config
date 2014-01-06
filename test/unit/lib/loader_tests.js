var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var loader = require('../../../lib/loader');
var path   = require('path');

describe("loader", function() {
    it("is function", function(done) {
        assert.isFunction(loader, 'should be a function');
        done();
    });
    
    it("should load local config", function(done) {
        var config = loader('development', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs'));
        assert.deepEqual(config, {
        	id: 'test-app',
        	fromSystem: 'system',
        	fromApp: 'app',
        	fromDefault: 'default',
        	fromDev: 'dev'
        }, 'should match expected config');
        done();
    });
    
    it("should load local config with no app config", function(done) {
        var config = loader('test', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs'));
        assert.deepEqual(config, {
        	fromSystem: 'system',
        	fromDefault: 'default'
        }, 'should match expected config');
        done();
    });
    
    it("should load local config with missing app config", function(done) {
        var config = loader('production', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs'));
        assert.deepEqual(config, {
        	id: 'test-app2',
        	fromSystem: 'system',
        	fromDefault: 'default',
        	fromProd: 'prod'
        }, 'should match expected config');
        done();
    });
    
    it("should load local config with missing system config", function(done) {
        var config = loader('production', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs2'));
        assert.deepEqual(config, {
        	id: 'test-app2',
        	fromDefault: 'default',
        	fromProd: 'prod'
        }, 'should match expected config');
        done();
    });
});