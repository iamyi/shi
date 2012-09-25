var shi = require('../index');
var assert = require('assert');

describe('shi', function () {
  it('should not be empty', function () {
    assert.equal(1, shi.month.toNumber(1));
  });
});