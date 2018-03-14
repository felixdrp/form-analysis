var assert = require('assert');
var customExpansion = require('../transform-modules/custom-expansion');

describe('expand', function() {
  describe('dr as doctor', function() {
    it('It should expand dr', function() {
      assert.equal(customExpansion.expand(' dr '), ' doctor ');
    });
  });
});
