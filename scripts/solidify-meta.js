var shared = require('./');
var placename = require('placename');
var fs = require('graceful-fs');
var path = require('path');
var async = require('async');

var replacer = function(key, val) {
  if (typeof val === "string" && val.length === 0) {
    return;
  }
  return val;
};

var fixMeta = function(loc, cb){
  var folder = path.join(shared.locationsDir, loc);
  var metaFile = path.join(folder, 'meta.json');
  var meta = require(metaFile);
  if (!meta.name) return cb(new Error("Missing name attr for "+loc));
  placename(meta.name, function(err, places){
    if (err) return cb(err);
    if (places.length === 0) return cb(new Error("Invalid place name for "+loc));
    meta.meta = places[0];
    fs.writeFile(metaFile, JSON.stringify(meta, replacer, 2), cb);
  });
};

shared.getLocations(function(err, locs){
  if (err) return console.error(err);
  async.forEach(locs, fixMeta, function(err){
    if (err) return console.error(err);
    console.log('Done!');
  });
});