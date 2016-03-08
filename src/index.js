/*
  Toolbox for creating and manipulating accented and alternative characters.
  See http://unicode.org/charts/ for charts of all available unicode characters.
*/

var randomItem = require('random-item');

var latin = require('./latin.js')

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

module.exports = {
  latin: latin,
  randomChar: randomChar,
  randomCharArray: randomCharArray
};
