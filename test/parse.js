var shi = require('../shi');
var assert = require('assert');

describe('shi.parseRange', function () {
  it('September 5&#150;September 30, 2012', function () {
    var str = 'September 5&#150;September 30, 2012';
    var dates = shi.parseRange(str);

    assert.equal(dates.length, 2);
    assert.equal(dates[0], '2012/09/05');
    assert.equal(dates[1], '2012/09/30');
  });

  it('June 27&#150;September 8, 2013', function () {
    var str = '<p class="title"><b>Future Beauty: Thirty Years of Japanese Fashion </b><br>June 27&#150;September 8, 2013<br>SAM Simonyi Special Exhibition Galleries</p>';

    var dates = shi.parseRange(str);
    assert.equal(dates.length, 2);
    assert.equal(dates[0], '2013/06/27');
    assert.equal(dates[1], '2013/09/08');
  });

});
