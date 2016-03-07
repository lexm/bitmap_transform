'use strict';

const fs = require('fs');
var eventEmitter = require(__dirname + '/emitter').emitter;

var Bitmap = function(filename) {
  this.filename = filename;
};

Bitmap.prototype.readBitmapFile = function() {
  var thisBmp = this;
  console.log(this.filename);
  fs.readFile(this.filename, function(err, data) {
    thisBmp.bitmap = data;
    eventEmitter.emit('fileRead');
  });
}

Bitmap.prototype.loadMetadata = function(callback) {
  this.headField = this.bitmap.toString('ascii', 0, 2);
  this.size = this.bitmap.readUInt32LE(2);
  this.pixelArrayStart = this.bitmap.readUInt32LE(10);
  this.paletteColors = this.bitmap.readUInt32LE(46);
  console.log('md load');
  eventEmitter.emit('metadataLoaded');
  if(callback) { callback(); }
};

Bitmap.prototype.write = function(newFilename) {
  fs.writeFileSync(__dirname + '/' + newFilename, this.bitmap);
};

exports.Bitmap = Bitmap;
