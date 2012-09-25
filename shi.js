var util = require('util');
var _ = require('underscore')._;

var shi = {};

module.exports = shi;

var january = ['january', 'jan']
  , february = ['february', 'feb']
  , march = ['march', 'mar']
  , april = ['april']
  , may = ['may']
  , june = ['june']
  , july = ['july']
  , august = ['august', 'aug']
  , september = ['september', 'sept']
  , october = ['october', 'oct']
  , november = ['november', 'nov']
  , december = ['december', 'dec']
  , months = [january, february, march, april, may, june, july, august, september, october, november, december]
  ;

var toString = function (d) {
  return (d <= 9) ? '0' + d : d;
};

var toDateString = exports.toDateString = function (year, month, day) {
  return util.format('%s/%s/%s', year, toString(month), toString(day));
};

shi.year = {
  toNumber : function (y) {
    var year = _.isNumber(y) ? y : parseInt(y, 10);

    return (year > 2000) ? year : 2000 + year;
  }
};

shi.month = {
  toNumber : function (m) { 
    if (_.isNumber(m)) return m;

    if (m[0] > '0' && m[0] <= '9') return parseInt(m, 10);

    var s = m.toLowerCase();
    var result = 0;
    var i = 0;

    _.each(months, function (month) {    
      if (_.indexOf(month, s) !== -1) result = i;
      else i += 1;
    });

    if (i===12) return -1;
    else return result+1; 
  }
};

shi.day = {
  toNumber : function(d) {
    return _.isNumber(d) ? d : parseInt(d, 10);
  }
};
