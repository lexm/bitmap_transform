'use strict';

const fs = require('fs');


var Bitmap = function(filename) {
  this.bitmap = fs.readFileSync(filename);
  this.headField = this.bitmap.toString('ascii', 0, 2);
  this.size = this.bitmap.readUInt32LE(2);
  this.pixelArrayStart = this.bitmap.readUInt32LE(10);
  this.paletteColors = this.bitmap.readUInt32LE(46);
};

Bitmap.prototype.write = function(newFilename) {
  fs.writeFileSync(__dirname + '/' + newFilename, this.bitmap);
};

exports.Bitmap = Bitmap;
