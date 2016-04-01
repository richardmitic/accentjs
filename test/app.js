/*
 * Module dependencies
 */
var express = require('express')
var accent = require('../src/index')


var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))


var siteData = {
  charSetTests:[
    {title: "Basic Latin", characters: accent.latin.BasicLatin)},
    {title: "Latin-1 Supplement", characters: accent.latin.Latin1Supplement)},
    {title: "Latin Extended-A", characters: accent.latin.LatinExtendedA)},
    {title: "Latin Extended-B", characters: accent.latin.LatinExtendedB)},
    {title: "Latin Extended-C", characters: accent.latin.LatinExtendedC)},
    {title: "Latin Extended-D", characters: accent.latin.LatinExtendedD)},
    {title: "Latin Extended-E", characters: accent.latin.LatinExtendedE)},
    {title: "Latin Extended Additional", characters: accent.latin.LatinExtendedAdditional)},
    {title: "IPA Extensions", characters: accent.latin.IPAExtensions)},
    {title: "Phonetic Extensions", characters: accent.latin.PhoneticExtensions)},
    {title: "Phonetic Extensions Supplement", characters: accent.latin.PhoneticExtensionsSupplement})
  ]
}

app.get('/', function (req, res) {
  res.render('index', { title : 'Home', data:siteData})
})


app.listen(3000)