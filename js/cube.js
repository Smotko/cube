define(function(require) {

  var Box = require('box');

  return function Cube(color, size) {
    return Box(color, size, size, size);
  };
});
