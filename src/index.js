/*
  Toolbox for creating and manipulating accented and alternative characters.
  See http://unicode.org/charts/ for charts of all available unicode characters.
*/

var randomItem = require('random-item');
var latin = require('./latin.js');
var marks = require('./combining_marks.js');
var latinAccentMap = require('./maps/latin_accents.json');

/*
  Get a random character from the given sets
*/
function randomChar(set) {
  return randomItem(set);
}


/*
  Get n random characters from the given set
*/
function randomCharArray(set, n) {
  var arr = [];
  for (var i=0; i<n; i++) {
    arr.push(randomItem(set));
  }
  return arr;
}


/*
  Get a character with an accent
*/
function alternativeChar(c) {
  return randomItem(latinAccentMap[c]);
}

/*
  Add accents to a string
*/
function alternativeString(s) {
  var out = "";
  for (var i = 0; i<s.length; i++) {
    try {
      out += alternativeChar(s.charAt(i));
    } catch (e) {
      // If there are no alternatives, use the original
      out += s.charAt(i);
    }
  }
  return out;
}

/*
  Add an accent to a character using combining marks
*/
function alternativeComboChar(c, accent_set) {
  var accent = randomItem(accent_set);
  return c + accent;
}

/*
  Add an accents to a character using combining marks
*/
function alternativeComboString(s, accent_set) {
  var out = "";
  for (var i = 0; i<s.length; i++) {
    out += alternativeComboChar(s.charAt(i), accent_set);
  }
  return out;
}


module.exports = {
  latin: latin,
  combiningMarks: marks,
  randomChar: randomChar,
  randomCharArray: randomCharArray,
  alternativeChar: alternativeChar,
  alternativeString: alternativeString,
  alternativeComboChar: alternativeComboChar,
  alternativeComboString: alternativeComboString
};
