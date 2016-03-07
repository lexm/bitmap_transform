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
  return { color: color, colorInvert: colorInvert};
}

function invertRange(bitmapObj, start, finish) {
  for(var ctr = start; ctr < finish; ctr++) {
    invertColor(bitmapObj, ctr);
  }
}

function invertBmp(bitmapObj, callback) {
  var bmpIsPalette = isPalette(bitmapObj);
  if(bmpIsPalette) {
    invertRange(bitmapObj, 54, 1078);
    if(callback) { callback(); }
  } else if (bmpIsPalette === false) {
    invertRange(bitmapObj, 54, bitmapObj.size - 54);
    if(callback) { callback(); }
  }
}

exports.isPalette = isPalette;

exports.invertBmp = invertBmp;
