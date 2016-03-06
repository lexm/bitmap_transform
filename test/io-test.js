'use strict';
var expect = require('chai').expect;
var bmpio = require(__dirname + '/../lib/io');
var Bitmap = bmpio.Bitmap;
var bm = new Bitmap(__dirname + '/../img/palette-bitmap.bmp');

describe('testing object creation', function() {
  it('should be of type object', function () {
    expect(bm).to.be.an('object');
  });
});


// describe('testing file input', function() {
//   it('should have a buffer in the bitmap prop', function(){
//     expect()
//
//   });
// });
