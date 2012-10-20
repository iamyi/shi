var util = require('util');
var _ = require('underscore')._;

var shi = exports;

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
  , dateRangeRegex = /(juanuary|febrary|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|20[0-2][0-9]|\s\d+)/g
  , yearRegex = /20[1-2][0-9]/g
  ;

var trim = function (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

var toString = exports.toString = function (d) {
  return (d <= 9) ? '0' + d : d;
};

var toDateString = exports.toDateString = function (year, month, day) {
  return util.format('%s/%s/%s', year, toString(month), toString(day));
};

var year = exports.year = {
  toNumber : function (y) {
    var year = _.isNumber(y) ? y : parseInt(y, 10);

    return (year > 2000) ? year : 2000 + year;
  }
};

var month = exports.month = {
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
  },

  isMonth : function (str) {
    var n = this.toNumber(str);
    return n != -1;
  }
};

var day = exports.day = {
  toNumber : function(d) {
    return _.isNumber(d) ? d : parseInt(d, 10);
  },

  isDay : function (d) {
    var value = this.toNumber(d);
    return (value >= 1 && value <= 31);
  }
};

var clean = exports.clean = function (str) {
  var htmlTags = /<\/?[a-zA-Z\s=\"]*(^>)*>/g;
  return str.replace(htmlTags, '');
};

var parseMonth = exports.parseMonth = function (str) {

};

var parseRange = exports.parseRange = function (str) {
  str = clean(str).toLowerCase();
  var values = str.match(dateRangeRegex);

  values = _.map(values, function (value) { return trim(value); });

  var result = [];
  
  if (values.length === 5) {
    // [ 'september', '5', 'september', '30', '2012' ]
    var fromMonth = month.toNumber(values[0]);
    var fromDay   = day.toNumber(values[1]);
    var toMonth   = month.toNumber(values[2]);
    var toDay     = day.toNumber(values[3]);
    var theYear   = year.toNumber(values[4]);

    result.push(toDateString(theYear, fromMonth, fromDay));
    result.push(toDateString(theYear, toMonth, toDay));
  }
  else if (values.length === 6) {
    // November 3, 2012–November 17, 2013
    var fromMonth = month.toNumber(values[0]);
    var fromDay   = day.toNumber(values[1]);
    var fromYear  = year.toNumber(values[2]);

    var toMonth   = month.toNumber(values[3]);
    var toDay     = day.toNumber(values[4]);
    var toYear    = year.toNumber(values[5]);

    result.push(toDateString(fromYear, fromMonth, fromDay));
    result.push(toDateString(toYear, toMonth, toDay));
  }

  return result;
};
