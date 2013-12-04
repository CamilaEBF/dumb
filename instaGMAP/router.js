function route(handle,pathname,response,postData) {
  console.log("routing a request for " + pathname);
  if (typeof(handle[pathname]) === 'function') {
    handle[pathname](response,postData);
  } else {
    console.log("No req handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;
