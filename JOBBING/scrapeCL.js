// lol
var request = require('request'); // this is what is used to get content from the pasted url
var cheerio = require('cheerio'); // this is jQuery, basically

var url = 'http://newyork.craigslist.org/search/jjj?addFour=part-time'

var fuckinBullshit = ['escort','feet','sexy','*','tutor','prep','teacher','telemarketer','unpaid'];
var noRepeatsBitch = [];

request(url, function(err, resp, body) {
  if (err) {
    throw err;
  }
  $ = cheerio.load(body);
  var jobz = $('span.pl a');
  jobz.each(function() {
    var title = $(this).text().toLowerCase();
    var link = $(this).attr('href');
    // filter out garbage
    var shit = false;
    var i = 0;
    while ((!shit) && (i < fuckinBullshit.length)) {
      if (title.indexOf(fuckinBullshit[i]) != -1) {
        shit = true;
        break;
      }
      i++;
    }
    if (noRepeatsBitch.indexOf(title) != -1) {
      shit = true;
    } else {
      noRepeatsBitch.push(title);
    }
    if (!shit) {
      console.log(title+": @"+link);
    }
  });
});

//ok so i'm basically building a loose API
// the next step is to go into each one of these pages and eliminate the ones that say "compensation: unpaid" or whatever alarm words
