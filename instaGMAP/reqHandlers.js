var querystring = require("querystring");
var exec = require("child_process").exec;

function start(response,postData) {
  var body = "<html><head></head><body><form action='/upload' method='post'><textarea name='text' rows='20' cols='40'></textarea><input type='submit' value='submittt'/></body></html>";
  generateResponse(response,"html",body);
}

function contents(response) {
  exec("ls -lah", function(error, stdout, stderr) {
    generateResponse(response, "plain", stdout);
  });
}

function upload(response,postData) {
  var dataa = querystring.parse(postData).text;
  var htmlcontents = "<html><head></head><body><p>yo son sup "+dataa+"</p></body></html>";
  generateResponse(response, "html", htmlcontents);
}

function about(response) {
  generateResponse(response,"plain", "lololo about");
}

function generateResponse(response, type, content) {
  response.writeHead(200, {"Content-Type": "text/"+type});
  response.write(content);
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.about = about;
