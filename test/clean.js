var shi = require('../shi');
var assert = require('assert');

describe('shi.clean', function () {

  it('case 1', function () {
    var str = '<p class="title"><b>Future Beauty: Thirty Years of Japanese Fashion </b> <br>June 27&#150;September 8, 2013 <br>SAM Simonyi Special Exhibition Galleries</p>';
    var result = shi.clean(str);
  
    // verify the html tags are all removed
    assert.equal(result.indexOf('<b>'), -1);
    assert.equal(result.indexOf('</b>'), -1);
    assert.equal(result.indexOf('<br>'), -1);
    assert.equal(result.indexOf('<p'), -1);
    assert.equal(result.indexOf('</p>'), -1);
  });

});
