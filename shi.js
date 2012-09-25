(function() {

  var root = this;

  var util = require('util');
  var _ = require('underscore')._;

  var shi = {};

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = shi;
    }
    exports.shi = shi;
  } else {
    root['shi'] = shi;
  }  

  shi.VERSION = '0.0.0';

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

  var Year = shi.year = function (y) {
      var year = _.isNumber(y) ? y : parseInt(y, 10);

      (year > 2000) || (year += 2000);

      return this._year = year;
  };

  var Month = shi.month = function (m) {
    if (_.isNumber(m)) this._month = m;
    else if (m[0] > '0' && m[0] <= '9') this._month = parseInt(m, 10);
    else {
      var s = m.toLowerCase();
      var result = 0;
      var i = 0;

      _.each(months, function (month) {    
        if (_.indexOf(month, s) !== -1) result = i;
        else i += 1;
      });

      if (i===12) this._month = -1;
      else this._month = result+1; 
    }

    return this._month;
  };

  _.extend(Month.prototype, {
    toString : function () {
      return (this._month > 9) ? '' + this._month : '0' + this._month;
    }
  });

  var Day = shi.day = function (d) {
    _.isNumber(d) || (d = parseInt(d, 10));
    return this._day = d;
  };

}).call(this);
