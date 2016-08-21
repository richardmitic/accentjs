var util = require('./util.js');

/*
  Enumeration of the latin character sets
*/
var CharacterSets = {
  CYRILLIC:"Cyrillic",
  CYRILLIC_SUPPLEMENTARY:"CyrillicSupplementary"
}

/*
  Character set properties
*/
var CharacterSetProps = {}
CharacterSetProps[CharacterSets.CYRILLIC] = {range: [0x400,0x4FF]}
CharacterSetProps[CharacterSets.CYRILLIC_SUPPLEMENTARY] = {range: [0x500,0x52F]}

if (Object.freeze) {
  Object.freeze(CharacterSets);
  Object.freeze(CharacterSetProps);
} else {
  console.warn("Cyrillic character set info not frozen");
}

/*
  Look up the range that a character code belongs to
*/
function lookupCharacterSet(c) {
  code = c.charCodeAt(0);
  for (var key in CharacterSetProps) {
    min = CharacterSetProps[key].range[0];
    max = CharacterSetProps[key].range[1];
    if (min <= code && code <= max)
      return key;
  }
}

/*
  Get cyrillic characters without the pure accents
*/
function getCyrillic() {
  chars = util.range(0x400, 0x482);
  chars = chars.concat(util.range(0x48A, 0x4FF));
  return chars;
}

function getCyrillicSupplementary() {
  return util.range(0x500, 0x52F);
}

module.exports = {
  Cyrillic: getCyrillic(),
  CyrillicSupplementary: getCyrillicSupplementary(),
  lookupCharacterSet: lookupCharacterSet,
  charSets: CharacterSets
}
