var http = require("http");
var url = require("url");

function start(route,handle) {
  /*
  using an anonymous function allows for asynchronous requests 
  because the results of the function don't have to be calculated before
  continuing on to other tasks
  */
  http.createServer(function(request, response) {
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("data: "+postDataChunk);
    });
    request.addListener("end", function() {
      /*
      route handles the response
      */
      route(handle, pathname, response, postData);
    });
  }).listen(8888);

  console.log("Server has started.");
}

exports.start = start;
