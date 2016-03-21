var util = require('./util.js');

module.exports = {
  CombiningDiacriticalMarks: getCombiningDiacriticalMarks(),
  CombiningDiacriticalMarksExtended: getCombiningDiacriticalMarksExtended(),
  CombiningDiacriticalMarksSupplement: getCombiningDiacriticalMarksSupplement(),
  CombiningHalfMarks: getCombiningHalfMarks()
}

/*
  Get basic inflection marks
*/
function getCombiningDiacriticalMarks() {
  return util.rangeFromValues(0x300, 0x36F);
}

/*
  Get extended inflection marks
*/
function getCombiningDiacriticalMarksExtended() {
  return util.rangeFromValues(0x1AB0, 0x1ABE);
}

/*
  Get supplement inflection marks
*/
function getCombiningDiacriticalMarksSupplement() {
  var marks = util.rangeFromValues(0x1DC0, 0x1DF5);
  marks = marks.concat([0x1DFC, 0x1DFD, 0x1DFE, 0x1DFF]);
  return marks;
}

/*
  Get extended inflection marks
*/
function getCombiningHalfMarks() {
  return util.rangeFromValues(0xFE20, 0xFE2F);
}