'use strict';

const bmpIo = require(__dirname + '/lib/io');
const invert = require(__dirname + '/lib/invert');

var filename = process.argv[2];
var newFilename = process.argv[3];

let bitmapData = new bmpIo.Bitmap(filename);

bitmapData.readBitmapFile(function() {
  bitmapData.loadMetadata(function() {
    invert.invertBmp(bitmapData, function() {
      bitmapData.write(newFilename);
    });
  });
});
