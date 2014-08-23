define(function(require) {
  var BwObject = require('bwobject'),
      Light = require('light');

  return function Player() {
    var size = 0.1,
        pos = size/2,
        bw = new BwObject(size, 0xFF0000, true),
        light = new Light(0xFF0000, 0.5, 5),
        speed = 1,
        group = new THREE.Object3D();
    group.add(light, bw);
    return $.extend(group, {
      update: function(t, objects) {
        bw.position.y = (pos*0.1 + bw.position.y*0.9);
        bw.position.z += 0.01 * speed;

        var vector = new THREE.Vector3(0,0,1);
        var ray = new THREE.Raycaster(bw.position, vector.normalize(), 0, 0.5);
        var intersects = ray.intersectObjects(objects);
        for (var i = 0; i < intersects.length; i++) {
          if (intersects[i].distance > size/2 * 0.9)
            intersects[i].object.warn(intersects[i].distance);
          else {
            console.log('die');
            speed = 0;
          }
        }

        light.position.copy(bw.position);
      },
      invert: function(t) {
        pos = pos > 0 ? -size/2 : size/2;
      },
      pposition: bw.position
    });
  };
});
