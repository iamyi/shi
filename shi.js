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

  _.extend(Year.prototype, {
    toString: function () {
      return '' + this._year;
    }
  });

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

  _.extend(Day.prototype, {
    toString : function () {
      return (this._day > 9) ? '' + this._day : '0' + this._day;
    }
  });

  var ShiDate = shi.date = function(year, month, day) {
    year = new Year(year);
    month = new Month(month);
    day = new Day(day);

    this._date = util.format('%s/%s/%s'
      , year.toString()
      , month.toString()
      , day.toString()
    );

    return this._date;
  };

  var dateRange = shi.dateRange = function (str) {
    // remove escaped html: &#150;
    str = str.replace(/&#\d+;/g, ' ');
    // clean up input string    
    str = str.toLowerCase().replace(/[^a-z0-9]/g, ' ');

    // if the ranges are within the same year: SEPT. 27—OCT. 28, 2012
    var year1 = null, year2 = null;
    var yearRegex = /[12]\d\d\d/g;
    var matches = str.match(yearRegex);

    if (matches.length === 1) year1 = year2 = matches[0];
    else if (matches.length === 2) {
      year1 = matches[0];
      year2 = matches[1];
    } 
    else return null;

    // make sure the year1 <= year2
    if (year1 > year2) return null;

    // remove the year values from the input string
    str = str.replace(/[12]\d\d\d/g, '');

    var month1 = null, month2 = null;
    var monthRegex = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/g;

    var matches = str.match(monthRegex);
  
    if (matches.length === 1) {
      month1 = month2 = matches[0];
    }    
    else if (matches.length === 2) {
      month1 = matches[0];      
      month2 = matches[1];
    }
    else return null;

    // remove the month values from the input string
    str = str.replace(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z\.]*/, '');

    // now look for the dates, by now, there should be two dates in the cleaned up string
    var day1 = null, day2 = null;

    var datesRegex = /\d{1,2}/g;
    matches = str.match(datesRegex);

    if (matches.length !== 2) return null;

    day1 = matches[0];
    day2 = matches[1];

    month1 = new Month(month1);
    month2 = new Month(month2);

    day1 = new Day(day1);
    day2 = new Day(day2);

    var result1 = util.format('%s/%s/%s', year1, month1.toString(), day1.toString());
    var result2 = util.format('%s/%s/%s', year2, month2.toString(), day2.toString());

    return [result1, result2];

  };

}).call(this);
