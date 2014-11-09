var request = require('request');
var cheerio = require('cheerio');

var url = 'http://en.wikipedia.org/wiki/Special:Random';

request(url, function(err, resp, body) {
  if (err) { throw err; }
  $ = cheerio.load(body);
  var pgTitle = $('h1#firstHeading span');
  console.log(pgTitle.text());
});
