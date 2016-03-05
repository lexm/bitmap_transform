'use strict';
// const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
global.eventEmitter = new EventEmitter();

const bmpIo = require(__dirname + '/lib/bmpIo');
const invert = require(__dirname + '/lib/invert');

var filename = process.argv[2];
var newFilename = process.argv[3];

let bitmapData = new bmpIo.Bitmap(filename);
invert.invertBmp(bitmapData);
bitmapData.write(newFilename);
