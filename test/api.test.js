var vows = require('vows');
var assert = require('assert');
var workable = require('../index.js');


vows.describe('api tests').addBatch({

  // isFunction
  'when instantiating workable':{
    topic:function(){
      return new workable();
    },
    'workable should be an instantiable object':function(topic) {
      assert.equal(typeof(topic), 'object');
    }
  }


}).export(module);