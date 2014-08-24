define(function(require) {
  var MovingCube = require('movingcube'),
      Light = require('light'),
      Cube = require('cube'),
      Collision = require('collision');

  return function Player() {
    var size = 0.1,
        pos = size/2,
        mc = new MovingCube(0xFF0000, size),
        debug_cube = new Cube(0x00FF00, size),
        light = new Light(0xFF0000, 0.7, 1),
        group = new THREE.Object3D();
    group.add(light, mc);
    mc.setSpeed(0, 0.05);
    return $.extend(group, {
      update: function(t, objects) {
        var self = this;
        mc.update(t);

        var result = Collision(objects, mc.getPosition());
        function bf(collision) {
          if (collision.distance < (size/2)*0.7) {
            mc.stopMoving();
          } else if (collision.distance < 1) {
            collision.object.material.color.r += 0.01;
          }
          collision.object.hitNotify(collision.distance, mc);
        }
        function lf(collision) {
          collision.object.material.color.r += 0.01;
          collision.object.hitNotify(collision.distance, mc);
        }
        $.map(result.forward, bf);
        //$.map(result.backward, bf);
        $.map(result.left, lf);
        $.map(result.right, lf);

        light.position.copy(mc.getPosition());
        debug_cube.position.copy(mc.getPosition());
      },
      invert: function(t) {
        mc.invert();
      },
      setSpeed: function(x,z) {
        mc.setSpeed(x,z);
      },
      getSpeed: function() {
        return mc.getSpeed();
      },
      reset: function() {
        mc.startMoving();
      },
      getPosition: function() {
        return mc.getPosition().clone();
      }
    });
  };
});
