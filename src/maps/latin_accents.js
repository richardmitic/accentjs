var extractor = require('file-extractor');
var fs = require('fs');
var http = require('http');
var Q = require('q');
require('string.fromcodepoint');

var map = {};

function unichr(str) {
  var int = parseInt("0x"+str);
  var code = String.fromCodePoint(int);
  return code;
}

function ensure_char(c, map) {
  if (map[c] == undefined) {
    map[c] = []
  }
}

function capital_match(m) {
  ensure_char(m[2], map);
  map[m[2]].push(unichr(m[1]));
}

function small_match(m) {
  var char = m[2].toLowerCase();
  ensure_char(char, map);
  map[char].push(unichr(m[1]));
}


exports.run = function() {
  var deferred = Q.defer();
  var capital_regex = /([A-Z0-9]+);LATIN CAPITAL LETTER ([A-Z]) WITH/g;
  var small_regex = /([A-Z0-9]+);LATIN SMALL LETTER ([A-Z]) WITH/g;
  var url = "http://ftp.unicode.org/Public/UNIDATA/UnicodeData.txt";
  
  var request = http.get(url, function(response) {
    var ex = extractor()
      .matches(capital_regex, capital_match)
      .matches(small_regex, small_match)
      .on('end', function() {
        fs.writeFile(__filename+"on", JSON.stringify(map), "utf8");
        deferred.resolve();
      })
      .start(response);
  });
  
  return deferred.promise;
}


