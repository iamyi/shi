
var shi = require('../shi');
var assert = require('assert');

describe('shi.month', function () {
  it('should parse month digits to digits', function () {
    assert.equal(1, shi.month.toNumber(1));
    assert.equal(10, shi.month.toNumber(10));
  });

  it('should parse month string to number', function () {
    assert.equal(3, shi.month.toNumber('3'));
    assert.equal(11, shi.month.toNumber('11'));
  });

  it('should parse month description to number', function () {
    assert.equal(8, shi.month.toNumber('august'));
    assert.equal(12, shi.month.toNumber('December'));
  });
});
