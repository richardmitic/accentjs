var util = require('./util.js');

module.exports = {
  CombiningDiacriticalMarks: getCombiningDiacriticalMarks()
}

/*
  Get basic inflection marks
*/
function getCombiningDiacriticalMarks() {
  return util.rangeFromValues(0x300, 0x36F);
}