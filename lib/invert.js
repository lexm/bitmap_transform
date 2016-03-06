'use strict';

function isPalette(bitmapObj) {
  if(bitmapObj.pixelArrayStart === 1078) {
    return true;
  } else if (bitmapObj.pixelArrayStart == 54) {
    return false;
  } else {
    console.log('Is this really a BMP file?');
    return null;
  }
}

function invertColor(bitmapObj, position) {
  var color = bitmapObj.bitmap.readUInt32LE(position);
  var colorInvert = '0x' + (color ^ 0xFFFFFF).toString(16);
  bitmapObj.bitmap.writeUInt32LE(colorInvert, position);
}

function invertRange(bitmapObj, start, finish) {
  for(var ctr = start; ctr < finish; ctr++) {
    invertColor(bitmapObj, ctr);
  }
}

function invertBmp(bitmapObj) {
  var bmpIsPalette = isPalette(bitmapObj);
  if(bmpIsPalette) {
    invertRange(bitmapObj, 54, 1078);
    eventEmitter.emit('invertDone');
  } else if (bmpIsPalette === false) {
    invertRange(bitmapObj, 54, bitmapObj.size - 54); 
    eventEmitter.emit('invertDone');
  }
}

exports.invertBmp = invertBmp;
