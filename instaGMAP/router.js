function route(handle,pathname) {
  console.log("routing a request for " + pathname);
  if (typeof(handle[pathname]) === 'function') {
    return handle[pathname]();
  } else {
    console.log("No req handler found for " + pathname);
    return "404 not found";
  }
}

exports.route = route;
