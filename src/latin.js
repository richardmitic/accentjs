var util = require('./util.js');

module.exports = {
  BasicLatin: getBasicLatin(),
  Latin1Supplement: getLatin1Supplement(),
  LatinExtendedA: getLatinExtendedA(),
  LatinExtendedB: getLatinExtendedB(),
  LatinExtendedC: getLatinExtendedC(),
  LatinExtendedD: getLatinExtendedD(),
  LatinExtendedE: getLatinExtendedE(),
  LatinExtendedAdditional: getLatinExtendedAdditional(),
  IPAExtensions: getIpaExtensions(),
  PhoneticExtensions: getPhoneticExtensions(),
  PhoneticExtensionsSupplement: getPhoneticExtensionsSupplement(),
  lookupCharacterSet: lookupCharacterSet
}

/*
Enumeration of the latin character sets
*/
var CharacterSets = {
  BasicLatin:0x1,
  Latin1Supplement:0x2,
  LatinExtendedA:0x4,
  LatinExtendedB:0x8,
  LatinExtendedC:0x10,
  LatinExtendedD:0x20,
  LatinExtendedE:0x40,
  LatinExtendedAdditional:0x80,
  IPAExtensions:0x100,
  PhoneticExtensions:0x200,
  PhoneticExtensionsSupplement:0x400,
  properties: {
    0x1: {name: "BasicLatin", value: 1, range: [0x21,0x7E]},
    0x2: {name: "Latin1Supplement", value: 0x2, range: [0xA1,0xFF]},
    0x4: {name: "LatinExtendedA", value: 0x4, range: [0x100,0x17F]},
    0x8: {name: "LatinExtendedB", value: 0x8, range: [0x180,0x24F]},
    0x10: {name: "LatinExtendedC", value: 0x10, range: [0x2C60,0x2C7F]},
    0x20: {name: "LatinExtendedD", value: 0x20, range: [0xA720,0xA7FF]},
    0x40: {name: "LatinExtendedE", value: 0x40, range: [0xAB30,0xAB65]},
    0x80: {name: "LatinExtendedAdditional", value: 0x80, range: [0x1E00,0x1EFF]},
    0x100: {name: "IPAExtensions", value: 0x100, range: [0x250,0x2AF]},
    0x200: {name: "PhoneticExtensions", value: 0x200, range: [0x1D00,0x1D7F]},
    0x400: {name: "PhoneticExtensionsSupplement", value: 0x400, range: [0x1D80,0x1DBF]}
  }
};

if (Object.freeze) {
  Object.freeze(CharacterSets);
} else {
  console.warn("Latin character set info not frozen");
}

/*
  Look up the range that a character code belongs to
*/
function lookupCharacterSet(c) {
  for (var key in CharacterSets) {
    if (CharacterSets.hasOwnProperty(key) && key != "properties") {
      code = c.charCodeAt(0);
      val = CharacterSets[key];
      min = CharacterSets.properties[val].range[0];
      max = CharacterSets.properties[val].range[1];
      if (min <= code && code <= max)
        return CharacterSets.properties[val];
    }
  }
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
  Get only the valid characters for Latin Extended Additional
*/
function getLatinExtendedAdditional() {
  return util.rangeFromValues(0x1E00, 0x1EFF);
}


/*
  Get valid characters for IPA Extensions
*/
function getIpaExtensions() {
  return util.rangeFromValues(0x250, 0x2AF);
}


/*
  Get valid characters for Phonetic Extensions
*/
function getPhoneticExtensions() {
  return util.rangeFromValues(0x1D00, 0x1D7F);
}


/*
  Get valid characters for Phonetic Extensions Supplement
*/
function getPhoneticExtensionsSupplement() {
  return util.rangeFromValues(0x1D80, 0x1DBF);
}
