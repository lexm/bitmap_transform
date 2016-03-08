'use strict';

const fs = require('fs');

var Bitmap = function(filename) {
  this.filename = filename;
};

Bitmap.prototype.readBitmapFile = function(callback) {
  var thisBmp = this;
  console.log(this.filename);
  fs.readFile(this.filename, function(err, data) {
    thisBmp.bitmap = data;
    if(callback) { callback(); }
  });
};

Bitmap.prototype.loadMetadata = function(callback) {
  this.headField = this.bitmap.toString('ascii', 0, 2);
  this.size = this.bitmap.readUInt32LE(2);
  this.pixelArrayStart = this.bitmap.readUInt32LE(10);
  this.paletteColors = this.bitmap.readUInt32LE(46);
  if(callback) { callback(); }
};

Bitmap.prototype.write = function(newFilename, callback) {
  fs.writeFile(__dirname + '/../' + newFilename, this.bitmap, function() {
    if(callback) {
      callback();
    }
  });
};

exports.Bitmap = Bitmap;