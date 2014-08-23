define(function(require){

  var Cube = require('cube');


  return function BwObject(size, color, is_up) {
    var group = new THREE.Object3D(),
        cube;

    is_up = is_up || Math.random() < 0.5;
    color = color || (is_up ? 0xFFFFFF : 0x000000);
    cube = new Cube(color, size);
    if (is_up) {
      cube.position.y = size/2;
    } else {
      cube.position.y = -size/2;
    }

    group.add(cube);
    return $.extend(cube, {
      update: function(t) {

      },
      // Player is close: turn the object red
      warn: function(distance) {
        cube.material.color.r += distance/10 ;
      }
    });
  };
});
