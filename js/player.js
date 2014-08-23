define(function(require) {
  var BwObject = require('bwobject'),
      Light = require('light');

  return function Player() {
    var size = 0.1,
        pos = size/2,
        bw = new BwObject(size, 0xFF0000, true),
        light = new Light(0xFF0000, 0.5, 5),
        speed = 0.05,
        original = -size/2,
        group = new THREE.Object3D(),
        position = new THREE.Vector3(0, size/2, -size/2),
        pivot = new THREE.Object3D();
    pivot.add(bw);
    bw.position.z = -size/2;
    bw.position.y = size/2;
    group.add(light, pivot);
    return $.extend(group, {
      update: function(t, objects) {
        if (pos > 0) {
          pivot.rotation.x += speed;
          position.z = original + Math.sin(pivot.rotation.x)*size;

        }
        else {
          pivot.rotation.x -= speed;
          position.z = original - Math.sin(pivot.rotation.x)*size;
        }

        if (Math.abs(pivot.rotation.x) > Math.PI/2) {
          pivot.position.z += size;
          original += size;
          pivot.rotation.x = 0;
        }

        position.y =  pos;
        bw.position.y = pos;

        var vector = new THREE.Vector3(0,0,1);
        var ray = new THREE.Raycaster(position, vector.normalize(), 0, 0.5);
        var intersects = ray.intersectObjects(objects);
        for (var i = 0; i < intersects.length; i++) {
          if (intersects[i].distance > size/2 * 0.8)
            intersects[i].object.warn(intersects[i].distance);
          else {
            console.log('die');
            speed = 0;
          }
        }

        light.position.copy(position);
      },
      invert: function(t) {
        pos = pos > 0 ? -size/2 : size/2;

        //original -= Math.sin(pivot.rotation.x)*size
        //pivot.rotation.x = 0;

      },
      pposition: position
    });
  };
});
