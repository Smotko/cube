define(function(require) {
  var Cube = require('cube');

  return function MovingCube(color, size) {
    var mesh = Cube(color, size),
        speed = new THREE.Vector3(),
        new_speed = new THREE.Vector3(),
        is_up = true,
        group = new THREE.Object3D(),
        can_move = true;

    group.add(mesh);
    return $.extend(group, {

      update: function() {
        if (!can_move) {
          return;
        }
        if (speed.x === 0 && speed.z === 0) {
          speed.x = new_speed.x;
          speed.z = new_speed.z;
        }
        var nor_speed = speed.clone().normalize();

        mesh.position.copy(nor_speed).multiplyScalar(-size/2);
        mesh.position.y = is_up ? size/2 : -size/2;
        if (is_up) {
          group.rotation.x += speed.z;
          group.rotation.z -= speed.x;
        } else {
          group.rotation.x -= speed.z;
          group.rotation.z += speed.x;
        }
        if (Math.abs(group.rotation.x) >= Math.PI/2 || Math.abs(group.rotation.z) >= Math.PI/2) {
          group.position.z += size * nor_speed.z;
          group.position.x += size * nor_speed.x;
          group.rotation.x = 0;
          group.rotation.z = 0;
          this.changeDirection();
        }
      },
      changeDirection: function() {
        var sum = speed.clone().add(new_speed);
        if (sum.x > 0 && sum.z > 0) {
          speed.x = new_speed.x;
          speed.z = new_speed.z;
        }
      },
      invert: function() {
        is_up = !is_up;

      },
      warn: function() {

      },
      setSpeed: function(x, z) {
        speed.setX(x);
        speed.setZ(z);
      },
      getSpeed: function() {
        return speed.z;
      },
      isMoving: function() {
        return speed.x > 0 || speed.z > 0;
      },
      stopMoving: function() {
        can_move = false;
      },
      startMoving: function() {
        can_move = true;
      },
      getPosition: function() {

        var v = group.position.clone(),
            nor_speed = speed.clone().normalize(),
            adj_x = Math.sin(group.rotation.z)*size*nor_speed.x,
            adj_z = Math.sin(group.rotation.x)*size*nor_speed.z;
        if (is_up) {
          v.z += adj_z;
          v.x -= adj_x;
        } else {
          v.z -= adj_z;
          v.x += adj_x;
        }
        return v.add(new THREE.Vector3(-size/2 * nor_speed.x, is_up ? size/2 : -size/2, -size/2 * nor_speed.z));
      },
      speed: speed,
    });
  };
});
