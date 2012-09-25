var shi = require('../index');
var assert = require('assert');

describe('shi', function () {

  describe('shi.year', function () {
    it('should parse year digits to digits', function () {
      assert.equal(2001, shi.year(1));
      assert.equal(2010, shi.year(10));
    });

    it('should parse year string to number', function () {
      assert.equal(2011, shi.year('2011'));
    });
  });

  describe('shi.month', function () {
    it('should parse month digits to digits', function () {
      assert.equal(1, shi.month(1));
      assert.equal(10, shi.month(10));
    });

    it('should parse month string to number', function () {
      assert.equal(3, shi.month('3'));
      assert.equal(11, shi.month('11'));
    });

    it('should parse month description to number', function () {
      assert.equal(8, shi.month('august'));
      assert.equal(12, shi.month('December'));
    });

    it('should convert to two-digit string', function () {
      var m = new shi.month(4);
      assert.equal('04', m.toString());
    });
  });

  describe('shi.date', function () {
    it('should have correct string format for number input', function () {
      assert.equal('2012/09/12', shi.date(2012,9,12));
      assert.equal('2009/12/01', shi.date(2009, 12, 1));
    });

    it('should have correct string format for string input', function () {
      assert.equal('2012/09/12', shi.date('2012','9','12'));
      assert.equal('2009/12/01', shi.date('2009', '12', '01'));
    });
  });
});