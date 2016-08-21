(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Accent = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*jshint -W054 */
(function (exports) {
  'use strict';

  // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  exports.knuthShuffle = shuffle;
}('undefined' !== typeof exports && exports || 'undefined' !== typeof window && window || global));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';
module.exports = function (arr) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	return arr[Math.floor(Math.random() * arr.length)];
};

},{}],3:[function(require,module,exports){
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
  return util.range(0x300, 0x36F);
}

/*
  Get extended inflection marks
*/
function getCombiningDiacriticalMarksExtended() {
  return util.range(0x1AB0, 0x1ABE);
}

/*
  Get supplement inflection marks
*/
function getCombiningDiacriticalMarksSupplement() {
  var marks = util.range(0x1DC0, 0x1DF5);
  marks = marks.concat([0x1DFC, 0x1DFD, 0x1DFE, 0x1DFF]);
  return marks;
}

/*
  Get extended inflection marks
*/
function getCombiningHalfMarks() {
  return util.range(0xFE20, 0xFE2F);
}
},{"./util.js":9}],4:[function(require,module,exports){
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

},{"./util.js":9}],5:[function(require,module,exports){
/*
  Toolbox for creating and manipulating accented and alternative characters.
  See http://unicode.org/charts/ for charts of all available unicode characters.
*/

var randomItem = require('random-item');
var shuffle = require('knuth-shuffle').knuthShuffle;
var latin = require('./latin.js');
var cyrillic = require('./cyrillic.js');
var marks = require('./combining_marks.js');
var latinAccentMap = require('./maps/latin_accents.json');
var cyrillicMap = require('./maps/cyrillic.json');

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

var allMaps = extend(latinAccentMap, cyrillicMap);
// console.log(allMaps)

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
function alternativeChar(c, sets) {
  // Create a copy of the sets and shuffle them.
  // Work through the shuffled sets looking for characters.
  var shuffled_sets = shuffle(sets.slice(0));
  var out;
  for (var i=0; i<shuffled_sets.length; i++) {
    try {
      // out = randomItem(latinAccentMap[shuffled_sets[i]][c]);
      out = randomItem(allMaps[shuffled_sets[i]][c]);
      break;
    } catch(err) {
      // continue
    }
  }
  return out
}

/*
  Add accents to a string
*/
function alternativeString(s, sets) {
  var out = "";
  var alt;
  for (var i = 0; i<s.length; i++) {
    alt = alternativeChar(s.charAt(i), sets);
    if (alt) {
      out += alternativeChar(s.charAt(i), sets);
    } else {
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
  cyrillic: cyrillic,
  combiningMarks: marks,
  randomChar: randomChar,
  randomCharArray: randomCharArray,
  alternativeChar: alternativeChar,
  alternativeString: alternativeString,
  alternativeComboChar: alternativeComboChar,
  alternativeComboString: alternativeComboString
};

},{"./combining_marks.js":3,"./cyrillic.js":4,"./latin.js":6,"./maps/cyrillic.json":7,"./maps/latin_accents.json":8,"knuth-shuffle":1,"random-item":2}],6:[function(require,module,exports){
var util = require('./util.js');

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
  return util.range(0x21, 0x7E);
}


/*
  Get characters for Latin 1 Supplement
*/
function getLatin1Supplement() {
  return util.range(0xA1, 0xFF);
}


/*
  Get valid characters for Latin Extended A
*/
function getLatinExtendedA() {
  return util.range(0x100, 0x17F);
}


/*
  Get valid characters for Latin Extended B
*/
function getLatinExtendedB() {
  return util.range(0x180, 0x24F);
}


/*
  Get valid characters for Latin Extended C
*/
function getLatinExtendedC() {
  return util.range(0x2C60, 0x2C7F);
}


/*
  Get only the valid characters for Latin Extended D
*/
function getLatinExtendedD() {
  chars = util.range(0xA720, 0xA7AD);
  chars = chars.concat(util.range(0xA7B0, 0xA7B7));
  chars = chars.concat(util.range(0xA7F7, 0xA7FF));
  return chars;
}


/*
  Get only the valid characters for Latin Extended E
*/
function getLatinExtendedE() {
  return util.range(0xAB30, 0xAB65);
}


/*
  Get only the valid characters for Latin Extended Additional
*/
function getLatinExtendedAdditional() {
  return util.range(0x1E00, 0x1EFF);
}


/*
  Get valid characters for IPA Extensions
*/
function getIpaExtensions() {
  return util.range(0x250, 0x2AF);
}


/*
  Get valid characters for Phonetic Extensions
*/
function getPhoneticExtensions() {
  return util.range(0x1D00, 0x1D7F);
}


/*
  Get valid characters for Phonetic Extensions Supplement
*/
function getPhoneticExtensionsSupplement() {
  return util.range(0x1D80, 0x1DBF);
}

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
  lookupCharacterSet: lookupCharacterSet,
  charSets: CharacterSets
}

















},{"./util.js":9}],7:[function(require,module,exports){
module.exports={
  "Cyrillic" : {
    "unused" : "Љ З Л П Ы Ю з ы ю љ Ѥ ѥ Ѩ ѩ Ѯ ѯ Ѱ ѱ Ѹ ѹ Ѽ ѽ Ѿ ҂ Ҙ ҙ Ҧ ҧ Ҵ ҵ Ӆ ӆ Ӟ ӟ Ӹ ӹ",
    "A" : ["А","Д","Ӑ","Ӓ","Ӕ","Ѧ","ѧ"],
    "B" : ["В","в"],
    "C" : ["С","Ҁ","Ҫ"],
    "E" : ["Ѐ","Ё","Є","Е","Э","Ӗ","Ӭ"],
    "F" : ["Ғ","Ӻ"],
    "H" : ["Њ","Н","Ң","Ҥ","Ӈ","ӈ","Ӊ","ӊ"],
    "I" : ["І","Ї","Ӏ"],
    "J" : ["Ј"],
    "K" : ["Ќ","К","Қ","Ҝ","Ҟ","Ҡ","Ӄ"],
    "M" : ["М","Ӎ"],
    "N" : ["Ѝ","И","Й","Ҋ","Ӣ","Ӥ"],
    "O" : ["О","Ф","Ѳ","Ѻ","Ӧ","Ө","Ӫ"],
    "P" : ["Р","Ҏ"],
    "Q" : ["Ҩ"],
    "R" : ["Я"],
    "S" : ["Ѕ"],
    "T" : ["Т","Ҭ"],
    "U" : ["Џ","Ц"],
    "V" : ["Ѵ","Ѷ"],
    "W" : ["Ш","Щ"],
    "X" : ["Ж","Х","Җ","Ҳ","Ӂ","Ӝ","Ӽ","Ӿ","Ѫ","Ѭ"],
    "Y" : ["Ў","У","Ү","Ұ","Ӯ","Ӱ","Ӳ"],
    "Z" : ["Ӡ"],
    "a" : ["а","д","ҩ","ӑ","ӓ","ӕ"],
    "b" : ["Б","Ъ","Ь","б","ъ","ь","Ѣ","ѣ","Ҍ","ҍ"],
    "c" : ["с","ҁ","ҫ"],
    "e" : ["ѐ","ё","є","е","э","ѐ","ё","є","Ҽ","ҽ","Ҿ","ҿ","ӗ","Ә","ә","Ӛ","ӛ","ӭ"],
    "f" : ["ғ","ӻ"],
    "h" : ["Ђ","Ч","Ћ","н","ч","ђ","њ","ћ","Ҕ","ҕ","ң","ҥ","Ҷ","ҷ","Ҹ","ҹ","Һ","һ"],
    "i" : ["і","ї"],
    "j" : ["ј"],
    "k" : ["к","ќ","қ","ҝ","ҟ","ҡ","ӄ"],
    "l" : ["ӏ"],
    "m" : ["м","ӎ"],
    "n" : ["и","й","ѝ","ҋ","ӣ","ӥ","л","п"],
    "o" : ["о","ф","ѳ","ѻ","ӧ","ө","ӫ"],
    "p" : ["р","ҏ"],
    "r" : ["Ѓ","Г","г","я","ѓ","Ґ","ґ","Ӷ","ӷ"],
    "s" : ["ѕ"],
    "t" : ["т","ҭ"],
    "u" : ["ц","џ"],
    "v" : ["ѵ","ѷ"],
    "w" : ["ш","щ","Ѡ","ѡ","ѿ"],
    "x" : ["ж","х","җ","ҳ","ӂ","ӝ","ӽ","ӿ","ѫ","ѭ"],
    "y" : ["у","ў","ү","ұ","Ӌ","ӌ","ӯ","ӱ","ӳ","Ӵ","ӵ"],
    "z" : ["ӡ"]
  },
  "CyrillicSupplementary": {
    "d" : ["Ԁ","ԁ","Ԃ","ԃ"],
    "H" : ["Ԋ","ԋ"],
    "G" : ["Ԍ","ԍ"],
    "T" : ["Ԏ"],
    "t" : ["ԏ"],
    "E" : ["Ԑ"],
    "e" : ["ԑ"]
  }
}
},{}],8:[function(require,module,exports){
module.exports={"Latin1Supplement":{"A":["À","Á","Â","Ã","Ä","Å"],"C":["Ç"],"E":["È","É","Ê","Ë"],"I":["Ì","Í","Î","Ï"],"N":["Ñ"],"O":["Ò","Ó","Ô","Õ","Ö","Ø"],"U":["Ù","Ú","Û","Ü"],"Y":["Ý"],"a":["à","á","â","ã","ä","å"],"c":["ç"],"e":["è","é","ê","ë"],"i":["ì","í","î","ï"],"n":["ñ"],"o":["ò","ó","ô","õ","ö","ø"],"u":["ù","ú","û","ü"],"y":["ý","ÿ"]},"LatinExtendedA":{"A":["Ā","Ă","Ą"],"a":["ā","ă","ą"],"C":["Ć","Ĉ","Ċ","Č"],"c":["ć","ĉ","ċ","č"],"D":["Ď","Đ"],"d":["ď","đ"],"E":["Ē","Ĕ","Ė","Ę","Ě"],"e":["ē","ĕ","ė","ę","ě"],"G":["Ĝ","Ğ","Ġ","Ģ"],"g":["ĝ","ğ","ġ","ģ"],"H":["Ĥ","Ħ"],"h":["ĥ","ħ"],"I":["Ĩ","Ī","Ĭ","Į","İ"],"i":["ĩ","ī","ĭ","į"],"J":["Ĵ"],"j":["ĵ"],"K":["Ķ"],"k":["ķ"],"L":["Ĺ","Ļ","Ľ","Ŀ","Ł"],"l":["ĺ","ļ","ľ","ŀ","ł"],"N":["Ń","Ņ","Ň"],"n":["ń","ņ","ň"],"O":["Ō","Ŏ","Ő"],"o":["ō","ŏ","ő"],"R":["Ŕ","Ŗ","Ř"],"r":["ŕ","ŗ","ř"],"S":["Ś","Ŝ","Ş","Š"],"s":["ś","ŝ","ş","š"],"T":["Ţ","Ť","Ŧ"],"t":["ţ","ť","ŧ"],"U":["Ũ","Ū","Ŭ","Ů","Ű","Ų"],"u":["ũ","ū","ŭ","ů","ű","ų"],"W":["Ŵ"],"w":["ŵ"],"Y":["Ŷ","Ÿ"],"y":["ŷ"],"Z":["Ź","Ż","Ž"],"z":["ź","ż","ž"]},"LatinExtendedB":{"b":["ƀ","ƃ"],"B":["Ɓ","Ƃ","Ƀ"],"C":["Ƈ","Ȼ"],"c":["ƈ","ȼ"],"D":["Ɗ","Ƌ"],"d":["ƌ","ƍ","ȡ"],"F":["Ƒ"],"f":["ƒ"],"G":["Ɠ","Ǥ","Ǧ","Ǵ"],"I":["Ɨ","Ǐ","Ȉ","Ȋ"],"K":["Ƙ","Ǩ"],"k":["ƙ","ǩ"],"l":["ƚ","ȴ"],"N":["Ɲ","Ǹ","Ƞ"],"n":["ƞ","ǹ","ȵ"],"O":["Ɵ","Ơ","Ǒ","Ǫ","Ǭ","Ǿ","Ȍ","Ȏ","Ȫ","Ȭ","Ȯ","Ȱ"],"o":["ơ","ǒ","ǫ","ǭ","ǿ","ȍ","ȏ","ȫ","ȭ","ȯ","ȱ"],"P":["Ƥ"],"p":["ƥ"],"t":["ƫ","ƭ","ț","ȶ"],"T":["Ƭ","Ʈ","Ț","Ⱦ"],"U":["Ư","Ǔ","Ǖ","Ǘ","Ǚ","Ǜ","Ȕ","Ȗ"],"u":["ư","ǔ","ǖ","ǘ","ǚ","ǜ","ȕ","ȗ"],"V":["Ʋ"],"Y":["Ƴ","Ȳ","Ɏ"],"y":["ƴ","ȳ","ɏ"],"Z":["Ƶ","Ȥ"],"z":["ƶ","ȥ","ɀ"],"A":["Ǎ","Ǟ","Ǡ","Ǻ","Ȁ","Ȃ","Ȧ","Ⱥ"],"a":["ǎ","ǟ","ǡ","ǻ","ȁ","ȃ","ȧ"],"i":["ǐ","ȉ","ȋ"],"e":["ǝ","ȅ","ȇ","ȩ","ɇ"],"g":["ǥ","ǧ","ǵ"],"j":["ǰ","ɉ"],"E":["Ȅ","Ȇ","Ȩ","Ɇ"],"R":["Ȑ","Ȓ","Ɍ"],"r":["ȑ","ȓ","ɍ"],"S":["Ș"],"s":["ș","ȿ"],"H":["Ȟ"],"h":["ȟ"],"L":["Ƚ"],"J":["Ɉ"],"q":["ɋ"]},"IPAExtensions":{"a":["ɐ","ɒ"],"b":["ɓ"],"c":["ɕ"],"d":["ɖ","ɗ"],"e":["ɘ"],"o":["ɜ","ɝ"],"g":["ɠ"],"h":["ɥ","ɦ","ʮ","ʯ"],"i":["ɨ"],"l":["ɫ","ɬ","ɭ"],"m":["ɯ","ɰ","ɱ"],"n":["ɲ","ɳ"],"r":["ɹ","ɺ","ɻ","ɼ","ɽ","ɾ","ɿ"],"s":["ʂ"],"t":["ʇ","ʈ"],"v":["ʋ","ʌ"],"w":["ʍ"],"y":["ʎ"],"z":["ʐ","ʑ"],"j":["ʝ"],"k":["ʞ"],"q":["ʠ"]},"PhoneticExtensions":{"a":["ᴂ"],"o":["ᴈ","ᴔ"],"i":["ᴉ"],"b":["ᵬ"],"d":["ᵭ"],"f":["ᵮ"],"m":["ᵯ"],"n":["ᵰ"],"p":["ᵱ","ᵽ"],"r":["ᵲ","ᵳ"],"s":["ᵴ"],"t":["ᵵ"],"z":["ᵶ"],"g":["ᵷ"]},"PhoneticExtensionsSupplement":{"b":["ᶀ"],"d":["ᶁ","ᶑ"],"f":["ᶂ"],"g":["ᶃ"],"k":["ᶄ"],"l":["ᶅ"],"m":["ᶆ"],"n":["ᶇ"],"p":["ᶈ"],"r":["ᶉ"],"s":["ᶊ"],"v":["ᶌ"],"x":["ᶍ"],"z":["ᶎ"],"a":["ᶏ"],"e":["ᶒ"],"o":["ᶔ"],"i":["ᶖ"],"u":["ᶙ"]},"LatinExtendedAdditional":{"A":["Ḁ","Ạ","Ả","Ấ","Ầ","Ẩ","Ẫ","Ậ","Ắ","Ằ","Ẳ","Ẵ","Ặ"],"a":["ḁ","ẚ","ạ","ả","ấ","ầ","ẩ","ẫ","ậ","ắ","ằ","ẳ","ẵ","ặ"],"B":["Ḃ","Ḅ","Ḇ"],"b":["ḃ","ḅ","ḇ"],"C":["Ḉ"],"c":["ḉ"],"D":["Ḋ","Ḍ","Ḏ","Ḑ","Ḓ"],"d":["ḋ","ḍ","ḏ","ḑ","ḓ"],"E":["Ḕ","Ḗ","Ḙ","Ḛ","Ḝ","Ẹ","Ẻ","Ẽ","Ế","Ề","Ể","Ễ","Ệ"],"e":["ḕ","ḗ","ḙ","ḛ","ḝ","ẹ","ẻ","ẽ","ế","ề","ể","ễ","ệ"],"F":["Ḟ"],"f":["ḟ"],"G":["Ḡ"],"g":["ḡ"],"H":["Ḣ","Ḥ","Ḧ","Ḩ","Ḫ"],"h":["ḣ","ḥ","ḧ","ḩ","ḫ","ẖ"],"I":["Ḭ","Ḯ","Ỉ","Ị"],"i":["ḭ","ḯ","ỉ","ị"],"K":["Ḱ","Ḳ","Ḵ"],"k":["ḱ","ḳ","ḵ"],"L":["Ḷ","Ḹ","Ḻ","Ḽ"],"l":["ḷ","ḹ","ḻ","ḽ"],"M":["Ḿ","Ṁ","Ṃ"],"m":["ḿ","ṁ","ṃ"],"N":["Ṅ","Ṇ","Ṉ","Ṋ"],"n":["ṅ","ṇ","ṉ","ṋ"],"O":["Ṍ","Ṏ","Ṑ","Ṓ","Ọ","Ỏ","Ố","Ồ","Ổ","Ỗ","Ộ","Ớ","Ờ","Ở","Ỡ","Ợ"],"o":["ṍ","ṏ","ṑ","ṓ","ọ","ỏ","ố","ồ","ổ","ỗ","ộ","ớ","ờ","ở","ỡ","ợ"],"P":["Ṕ","Ṗ"],"p":["ṕ","ṗ"],"R":["Ṙ","Ṛ","Ṝ","Ṟ"],"r":["ṙ","ṛ","ṝ","ṟ"],"S":["Ṡ","Ṣ","Ṥ","Ṧ","Ṩ"],"s":["ṡ","ṣ","ṥ","ṧ","ṩ"],"T":["Ṫ","Ṭ","Ṯ","Ṱ"],"t":["ṫ","ṭ","ṯ","ṱ","ẗ"],"U":["Ṳ","Ṵ","Ṷ","Ṹ","Ṻ","Ụ","Ủ","Ứ","Ừ","Ử","Ữ","Ự"],"u":["ṳ","ṵ","ṷ","ṹ","ṻ","ụ","ủ","ứ","ừ","ử","ữ","ự"],"V":["Ṽ","Ṿ"],"v":["ṽ","ṿ"],"W":["Ẁ","Ẃ","Ẅ","Ẇ","Ẉ"],"w":["ẁ","ẃ","ẅ","ẇ","ẉ","ẘ"],"X":["Ẋ","Ẍ"],"x":["ẋ","ẍ"],"Y":["Ẏ","Ỳ","Ỵ","Ỷ","Ỹ","Ỿ"],"y":["ẏ","ẙ","ỳ","ỵ","ỷ","ỹ","ỿ"],"Z":["Ẑ","Ẓ","Ẕ"],"z":["ẑ","ẓ","ẕ"]},"LatinExtendedC":{"L":["Ⱡ","Ɫ"],"l":["ⱡ"],"P":["Ᵽ"],"R":["Ɽ"],"a":["ⱥ"],"t":["ⱦ"],"H":["Ⱨ"],"h":["ⱨ"],"K":["Ⱪ"],"k":["ⱪ"],"Z":["Ⱬ","Ɀ"],"z":["ⱬ"],"M":["Ɱ"],"v":["ⱱ","ⱴ"],"W":["Ⱳ"],"w":["ⱳ"],"e":["ⱸ"],"r":["ⱹ"],"o":["ⱺ"],"S":["Ȿ"]},"LatinExtendedD":{"c":["ꜿ","ꞓ","ꞔ"],"K":["Ꝁ","Ꝃ","Ꝅ","Ꞣ"],"k":["ꝁ","ꝃ","ꝅ","ꞣ"],"L":["Ꝉ","Ɬ"],"l":["ꝉ","ꞁ","ꞎ"],"O":["Ꝋ","Ꝍ"],"o":["ꝋ","ꝍ"],"P":["Ꝑ","Ꝓ","Ꝕ"],"p":["ꝑ","ꝓ","ꝕ"],"Q":["Ꝗ","Ꝙ"],"q":["ꝗ","ꝙ"],"V":["Ꝟ"],"v":["ꝟ"],"i":["ꝿ"],"N":["Ꞑ","Ꞥ"],"n":["ꞑ","ꞥ"],"C":["Ꞓ"],"h":["ꞕ"],"B":["Ꞗ"],"b":["ꞗ"],"F":["Ꞙ"],"f":["ꞙ"],"G":["Ꞡ"],"g":["ꞡ"],"R":["Ꞧ"],"r":["ꞧ"],"S":["Ꞩ"],"s":["ꞩ"],"H":["Ɦ"],"J":["Ʝ"]},"LatinExtendedE":{"e":["ꬴ"],"l":["ꬷ","ꬸ","ꬹ"],"m":["ꬺ"],"n":["ꬻ"],"o":["ꭁ","ꭂ","ꭃ","ꭄ"],"r":["ꭇ","ꭉ"],"u":["ꭎ","ꭑ","ꭒ"],"x":["ꭖ","ꭗ","ꭘ","ꭙ"],"y":["ꭚ"]}}
},{}],9:[function(require,module,exports){
module.exports = {
  range: range
}


/*
  Return a range of characters based on unicode code points
*/
function range(start,stop) {
  var result=[];
  for (var idx=start; idx <=stop; ++idx){
    result.push(String.fromCharCode(idx));
  }
  return result;
};
},{}]},{},[5])(5)
});