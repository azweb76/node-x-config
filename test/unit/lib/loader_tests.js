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
        		path.resolve(__dirname, '../fixtures/systemConfigs'), 'xxxxxx');
        assert.deepEqual(config, {
        	id: 'test-app',
            env: 'development',
        	fromSystem: 'system',
        	fromApp: 'app',
        	fromDefault: 'default',
        	fromDev: 'dev',
            keyThat: "shouldNotBeOverriden"
        }, 'should match expected config');
        done();
    });
    
    it("should load local config with no app config", function(done) {
        var config = loader('test', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs'), 'xxxxxx');
        assert.deepEqual(config, {
            env: 'test',
        	fromSystem: 'system',
        	fromDefault: 'default',
            keyThat: "wantsToOverride"
        }, 'should match expected config');
        done();
    });
    
    it("should load local config with missing app config", function(done) {
        var config = loader('production', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs'), 'xxxxxx');
        assert.deepEqual(config, {
        	id: 'test-app2',
            env: 'production',
        	fromSystem: 'system',
        	fromDefault: 'default',
        	fromProd: 'prod',
            keyThat: "wantsToOverride"
        }, 'should match expected config');
        done();
    });
    
    it("should load local config with missing system config", function(done) {
        var config = loader('production', path.resolve(__dirname, '../fixtures/config'),
        		path.resolve(__dirname, '../fixtures/systemConfigs2'), 'xxxxxx');
        assert.deepEqual(config, {
        	id: 'test-app2',
            env: 'production',
        	fromDefault: 'default',
        	fromProd: 'prod',
            keyThat: "wantsToOverride"
        }, 'should match expected config');
        done();
    });

    describe("uses regex for env", function(){
        it("should load config from dev using pattern matching", function(done) {
            var config = loader('not-valid-env', path.resolve(__dirname, '../fixtures/config'),
                    path.resolve(__dirname, '../fixtures/systemConfigs'), 'g1dwtest01');
            assert.deepEqual(config, {
                id: 'test-app',
                env: 'development',
                fromSystem: 'system',
                fromApp: 'app',
                fromDefault: 'default',
                fromDev: 'dev',
                keyThat: "shouldNotBeOverriden"
            }, 'should match expected config');
            done();
        });
    });
});