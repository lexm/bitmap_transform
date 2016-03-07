'use strict';

// const EventEmitter = require('events').EventEmitter;
// global.eventEmitter = new EventEmitter();
var eventEmitter = require(__dirname + '/lib/emitter').emitter;

const bmpIo = require(__dirname + '/lib/io');
const invert = require(__dirname + '/lib/invert');

var filename = process.argv[2];
var newFilename = process.argv[3];

let bitmapData = new bmpIo.Bitmap(filename);

eventEmitter.on('fileRead', function() {
  bitmapData.loadMetadata();
});

eventEmitter.on('metadataLoaded', function () {
  console.dir(bitmapData.paletteColors);
  invert.invertBmp(bitmapData);
});

eventEmitter.on('invertDone', function() {
  bitmapData.write(newFilename);
});
