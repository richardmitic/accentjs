/*
 * Module dependencies
 */
var express = require('express')
var accent = require('../src/index')
var url = require('url')


var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))


function getRandomAccentedString(str, sets) {
  return accent.alternativeString(str, chrSets);
}

function test_combining_marks(title_, accent_set) {
  var original_char = 'z';
  var accented_chars = [];
  for (var i = 0; i < accent_set.length; i++) {
    var new_c = original_char+accent_set[i];
    accented_chars.push(new_c);
  }
  return {title:title_, characters:accented_chars.join(' ')}
}

var siteData = {
  charSets: [
    accent.latin.BasicLatin,
    accent.latin.Latin1Supplement,
    accent.latin.LatinExtendedA,
    accent.latin.LatinExtendedB,
    accent.latin.LatinExtendedC,
    accent.latin.LatinExtendedD,
    accent.latin.LatinExtendedE,
    accent.latin.LatinExtendedAdditional,
    accent.latin.IPAExtensions,
    accent.latin.PhoneticExtensions,
    accent.latin.PhoneticExtensionsSupplement
  ],
  charSetTests:[
    {title: "Basic Latin", characters: accent.latin.BasicLatin.join(' ')},
    {title: "Latin-1 Supplement", characters: accent.latin.Latin1Supplement.join(' ')},
    {title: "Latin Extended-A", characters: accent.latin.LatinExtendedA.join(' ')},
    {title: "Latin Extended-B", characters: accent.latin.LatinExtendedB.join(' ')},
    {title: "Latin Extended-C", characters: accent.latin.LatinExtendedC.join(' ')},
    {title: "Latin Extended-D", characters: accent.latin.LatinExtendedD.join(' ')},
    {title: "Latin Extended-E", characters: accent.latin.LatinExtendedE.join(' ')},
    {title: "Latin Extended Additional", characters: accent.latin.LatinExtendedAdditional.join(' ')},
    {title: "IPA Extensions", characters: accent.latin.IPAExtensions.join(' ')},
    {title: "Phonetic Extensions", characters: accent.latin.PhoneticExtensions.join(' ')},
    {title: "Phonetic Extensions Supplement", characters: accent.latin.PhoneticExtensionsSupplement.join(' ')}
  ],
  combiningMarkTests: [
    test_combining_marks("Combining Diacritical Marks", accent.combiningMarks.CombiningDiacriticalMarks),
    test_combining_marks("Combining Diacritical Marks Extended", accent.combiningMarks.CombiningDiacriticalMarksExtended),
    test_combining_marks("Combining Diacritical Marks Supplement", accent.combiningMarks.CombiningDiacriticalMarksSupplement),
    test_combining_marks("Combining Half Marks", accent.combiningMarks.CombiningHalfMarks)
  ]
}

app.get('/', function (req, res) {
  res.render('index', { title : 'Home', data:siteData})
})


function getACharacter() {
  accent.latin.randomChar(accent.latin.LatinExtendedB)
}

app.get('/albumart', function (req, res) {
  data = {
    queryparams:req.query,
    getChar: getACharacter
  }
  res.render('albumart', {title:'Album Art', data:data})
})

// app.get('/replacements', function (req, res) {
//   var parts = url.parse(req.url, true);
//   var sets = JSON.parse(parts.query.sets);
//   var str = parts.query.str;
//   res.json({result:getRandomAccentedString(str,sets)});
// })


app.listen(3000)