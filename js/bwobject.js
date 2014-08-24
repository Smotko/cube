define(function(require){

  var Cube = require('cube');


  return function BwObject(size, color, is_up) {
    var group = new THREE.Object3D(),
        invert = false,
        speed = new THREE.Vector3(),
        position = new THREE.Vector3(),
        original = 0,
        cube;

    is_up = typeof is_up !== 'undefined' ? is_up : Math.random() < 0.5;
    color = color || (is_up ? 0xFFFFFF : 0x000000);

    cube = new Cube(color, size);
    group.add(cube);
    group.position.y -= size/2;
    return $.extend(group, {
      update: function(t) {

        cube.position.copy(speed).normalize().multiplyScalar(-size/2);
        if (is_up) {
          cube.position.y = size/2;
          group.rotation.x += speed.z;
          group.rotation.z += speed.x;
          position.z = original + Math.sin(group.rotation.x)*size;
        } else {
          cube.position.y = -size/2;
          group.rotation.x -= speed.z;
          group.rotation.z -= speed.x;
          position.z = original - Math.sin(group.rotation.x)*size;
        }

        if (Math.abs(group.rotation.x) > Math.PI/2) {
          group.position.z += size;
          original += size;
          group.rotation.x = 0;
        }
      },
      // Player is close: turn the object red
      warn: function(distance) {
        cube.material.color.r += distance/10 ;
      },
      invert: function() {
        is_up = !is_up;
      },
      speed: speed,
      pposition: position,
    });
  };
});
