var path = require('path');
var fs = require('graceful-fs');
var placename = require('placename');

var locationsDir = path.join(__dirname, '../locations');

module.exports.locationsDir = locationsDir;
module.exports.getLocations = function(cb){
  fs.readdir(locationsDir, function(err, files){
    if (err) return cb(err);
    cb(null, files);
  });
};