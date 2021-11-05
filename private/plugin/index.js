const fs = require("fs");
const crypto = require("crypto");

module.exports.authorization = (rootFiles, algorithm) => {
  var database = {};
  getRoot(root);
  function getRoot(rootFiles) {
    current = fs.readdirSync(rootFiles);
    for (var file in current) {
      if (fs.statSync(rootFiles + "/" + current[file]).isDirectory()) {
        getRoot(rootFiles + "/" + current[file]);
      }
      else {
        database[rootFiles + "/" + current[file]] = crypto.createHash(algorithm).update(Math.floor((Math.random() * 9999999999) + 1000000000).toString()).digest("hex");
      }
    }
  }
  return database
}
