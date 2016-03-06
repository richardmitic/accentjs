/*
  Toolbox for creating and manipulating accented and alternative characters.
  See http://unicode.org/charts/ for charts of all available unicode characters.
*/

var randomItem = require('random-item');

var latin = require('./latin.js')

function randomCharFromSet(set) {
  return randomItem(set);
}

module.exports = {
  latin: latin,
  randomCharFromSet: randomCharFromSet
};
