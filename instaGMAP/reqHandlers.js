function start() {
  console.log("req handler start");
  return "<h1>hello start</h1>";
}

function upload() {
  console.log("req handler upload");
  return "hello upload";
}

function about() {
  console.log("aboutttt");
  return "<em>about</em>";
}

exports.start = start;
exports.upload = upload;
exports.about = about;
