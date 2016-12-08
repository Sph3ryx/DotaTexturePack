var fs = require("fs");
var path = require("path");
var structure = {};
var walk = function (dir) {
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    var filePath = dir + '/' + file;
    var stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath)
    } else {
      if (file.indexOf(".png") != -1) {
        addToStructure(dir, file);
      }
    }
  });
};
var addToStructure = function (dir, file) {
  var list = dir.split("/");
  var directory = structure;
  for (var i = 1; i < list.length; i++) {
    if (!directory[list[i]]) {
      directory[list[i]] = {};
      directory[list[i]].files = [];
    }
    directory = directory[list[i]];
  }
  directory.files.push(file);
};
walk("./sph3ryx_ui");
fs.writeFileSync("./structure.json", JSON.stringify(structure));