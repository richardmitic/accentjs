var extractor = require('file-extractor');
var fs = require('fs');
var http = require('http');
var Q = require('q');
require('string.fromcodepoint');
var latin = require('../latin');

var map = {};
var unicode_database_url = "http://ftp.unicode.org/Public/UNIDATA/UnicodeData.txt";

function unichr(str) {
  var int = parseInt("0x"+str);
  var code = String.fromCodePoint(int);
  return code;
}

function ensure_char(c, set, map) {
  if (map[set] == undefined) {
    map[set] = {}
  }
  if (map[set][c] == undefined) {
    map[set][c] = [];
  }
}

function capital_match(m) {
  chr = unichr(m[1]);
  chrSet = latin.lookupCharacterSet(chr);
  if (!chrSet) {
    return
  }
  ensure_char(m[2], chrSet.name, map);
  map[chrSet.name][m[2]].push(chr);
}

function small_match(m) {
  var char = m[2].toLowerCase();
  chr = unichr(m[1]);
  chrSet = latin.lookupCharacterSet(chr);
  if (!chrSet) {
    return
  }
  ensure_char(char, chrSet.name, map);
  map[chrSet.name][char].push(chr);
}


exports.run = function() {
  var deferred = Q.defer();
  var capital_regex = /^([A-F0-9]+);LATIN CAPITAL LETTER ([A-Z]) WITH.*;Lu/m;
  var small_regex = /^([A-F0-9]+);LATIN SMALL LETTER ([A-Z]) WITH.*;Ll/m;
  var captial_turned_regex = /^([A-F0-9]+);LATIN CAPTIAL LETTER TURNED ([A-Z]).*;Lu;/m;
  var small_turned_regex = /^([A-F0-9]+);LATIN SMALL LETTER TURNED ([A-Z]).*;Ll;/m;
  var capital_reversed_regex = /^([A-F0-9]+);LATIN CAPTIAL LETTER REVERSED ([A-Z]).*;Lu;/m;
  var small_reversed_regex = /^([A-F0-9]+);LATIN SMALL LETTER REVERSED ([A-Z]).*;Ll;/m;
  
  var request = http.get(unicode_database_url, function(response) {
    var ex = extractor()
      .matches(capital_regex, capital_match)
      .matches(small_regex, small_match)
      .matches(captial_turned_regex, capital_match)
      .matches(small_turned_regex, small_match)
      .matches(capital_reversed_regex, capital_match)
      .matches(small_reversed_regex, small_match)
      .on('end', function() {
        fs.writeFile(__filename+"on", JSON.stringify(map), "utf8");
        deferred.resolve();
      })
      .start(response);
  });
  
  return deferred.promise;
}


