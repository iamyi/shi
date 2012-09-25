var shi = require('../index');
var assert = require('assert');

describe('shi.daterange', function () {
  it('should work for facebook format', function () {
    var s = 'October 3 - 7, 2012 See below for dance, workshop, DJ & instructor schedule!';
    var r = shi.dateRange(s);

    assert.equal('2012/10/03', r[0]);
    assert.equal('2012/10/07', r[1]);
  });

  it('should work for SAM format', function () {
    var s = '<br>October 11, 2012&#150;January 13, 2013<br>'
    var r = shi.dateRange(s);

    assert.equal('2012/10/11', r[0]);
    assert.equal('2013/01/13', r[1]);
  });
});