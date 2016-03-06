'use strict';

const fs = require('fs');

var Bitmap = function(filename) {
  var thisBmp = this;
  console.log(filename);
  fs.readFile(filename, function(err, data) {
    thisBmp.bitmap = data;
    eventEmitter.emit('fileRead');
  });

};

Bitmap.prototype.loadMetadata = function() {
  this.headField = this.bitmap.toString('ascii', 0, 2);
  this.size = this.bitmap.readUInt32LE(2);
  this.pixelArrayStart = this.bitmap.readUInt32LE(10);
  this.paletteColors = this.bitmap.readUInt32LE(46);
  eventEmitter.emit('metadataLoaded');
};

Bitmap.prototype.write = function(newFilename) {
  fs.writeFileSync(__dirname + '/' + newFilename, this.bitmap);
};

exports.Bitmap = Bitmap;
