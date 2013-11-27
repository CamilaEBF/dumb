var http = require("http");
var url = require("url");

function start(route,handle) {
  /*
  using an anonymous function allows for asynchronous requests 
  because the results of the function don't have to be calculated before
  continuing on to other tasks
  */
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    var content = route(handle,pathname);
    response.write(content);
    response.end();
  }).listen(8888);

  console.log("Server has started.");
}

exports.start = start;
