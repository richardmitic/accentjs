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
  BASIC_LATIN:"BasicLatin",
  LATIN_1_SUPPLEMENT:"Latin1Supplement",
  LATIN_EXTENDED_A:"LatinExtendedA",
  LATIN_EXTENDED_B:"LatinExtendedB",
  LATIN_EXTENDED_C:"LatinExtendedC",
  LATIN_EXTENDED_D:"LatinExtendedD",
  LATIN_EXTENDED_E:"LatinExtendedE",
  LATIN_EXTENDED_ADDITIONAL:"LatinExtendedAdditional",
  IPA_EXTENSIONS:"IPAExtensions",
  PHONETIC_EXTENSIONS:"PhoneticExtensions",
  PHONETIC_EXTENSIONS_SUPPLEMENT:"PhoneticExtensionsSupplement"
}

/*
  Character set properties
*/
var CharacterSetProps = {}
CharacterSetProps[CharacterSets.BASIC_LATIN] = {range: [0x21,0x7E]},
CharacterSetProps[CharacterSets.LATIN_1_SUPPLEMENT] = {range: [0xA1,0xFF]},
CharacterSetProps[CharacterSets.LATIN_EXTENDED_A] = {range: [0x100,0x17F]},
CharacterSetProps[CharacterSets.LATIN_EXTENDED_B] = {range: [0x180,0x24F]},
CharacterSetProps[CharacterSets.LATIN_EXTENDED_C] = {range: [0x2C60,0x2C7F]},
CharacterSetProps[CharacterSets.LATIN_EXTENDED_D] = {range: [0xA720,0xA7FF]},
CharacterSetProps[CharacterSets.LATIN_EXTENDED_E] = {range: [0xAB30,0xAB65]},
CharacterSetProps[CharacterSets.LATIN_EXTENDED_ADDITIONAL] = {range: [0x1E00,0x1EFF]},
CharacterSetProps[CharacterSets.IPA_EXTENSIONS] = {range: [0x250,0x2AF]},
CharacterSetProps[CharacterSets.PHONETIC_EXTENSIONS] = {range: [0x1D00,0x1D7F]},
CharacterSetProps[CharacterSets.PHONETIC_EXTENSIONS_SUPPLEMENT] = {range: [0x1D80,0x1DBF]}

if (Object.freeze) {
  Object.freeze(CharacterSets);
  Object.freeze(CharacterSetProps);
} else {
  console.warn("Latin character set info not frozen");
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
