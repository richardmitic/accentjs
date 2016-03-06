var util = require('./util.js');

module.exports = {
  BasicLatin: getBasicLatin(),
  Latin1Supplement: getLatin1Supplement(),
  LatinExtendedA: getLatinExtendedA(),
  LatinExtendedB: getLatinExtendedB(),
  LatinExtendedC: getLatinExtendedC(),
  LatinExtendedD: getLatinExtendedD(),
  LatinExtendedE: getLatinExtendedE(),
  LatinExtendedAdditional: getLatinExtendedAdditional()
}

/*
  Get only the non-whitespace characters from Basic Latin
*/
function getBasicLatin() {
  return util.range('!', '~');
}


/*
  Get characters for Latin 1 Supplement
*/
function getLatin1Supplement() {
  return util.rangeFromValues(0xA1, 0xFF);
}


/*
  Get valid characters for Latin Extended A
*/
function getLatinExtendedA() {
  return util.rangeFromValues(0x100, 0x17F);
}


/*
  Get valid characters for Latin Extended B
*/
function getLatinExtendedB() {
  return util.rangeFromValues(0x180, 0x24F);
}


/*
  Get valid characters for Latin Extended C
*/
function getLatinExtendedC() {
  return util.rangeFromValues(0x2C60, 0x2C7F);
}


/*
  Get only the valid characters for Latin Extended D
*/
function getLatinExtendedD() {
  chars = util.rangeFromValues(0xA720, 0xA7AD);
  chars = chars.concat(util.rangeFromValues(0xA7B0, 0xA7B7));
  chars = chars.concat(util.rangeFromValues(0xA7F7, 0xA7FF));
  return chars;
}


/*
  Get only the valid characters for Latin Extended E
*/
function getLatinExtendedE() {
  return util.rangeFromValues(0xAB30, 0xAB65);
}


/*
  Get only the valid characters for Latin Extended D
*/
function getLatinExtendedAdditional() {
  return util.rangeFromValues(0x1E00, 0x1EFF);
}