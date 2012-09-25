var shi = require('../index');
var assert = require('assert');

describe('shi.daterange', function () {
  it('should able to parse range from common string', function () {
    var s, r;

    s = 'October 3 - 7, 2012 See below for dance, workshop, DJ & instructor schedule!';
    r = shi.dateRange(s);

    assert.equal('2012/10/03', r[0]);
    assert.equal('2012/10/07', r[1]);

    s = '<br>October 11, 2012&#150;January 13, 2013<br>'
    r = shi.dateRange(s);

    assert.equal('2012/10/11', r[0]);
    assert.equal('2013/01/13', r[1]);

    s = '<h2>Photo Center Faculty Exhibition<br /><strong>January 1 &#8211; 27, 2013</strong></h2>';
    r = shi.dateRange(s);

    assert.equal('2013/01/01', r[0]);
    assert.equal('2013/01/27', r[1]);
  });

  it('should use current year if year is not specified', function () {
    var s,r;

    s = '<strong>August 3 &#8211; September 18</strong>'
    r = shi.dateRange(s);

    assert.equal('2012/08/03', r[0]);
    assert.equal('2012/09/18', r[1]);
  });  

});