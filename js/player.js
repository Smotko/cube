define(function(require) {
  var Cube = require('cube'),
      Light = require('light');

  return function Player() {
    var size = 0.1,
        pos = size/2,
        bw = new Cube(0xFF0000, size),
        light = new Light(0xFF0000, 0.5, 5),
        group = new THREE.Object3D();
    group.add(light, bw);
    bw.speed.setZ(0.01);
    return $.extend(group, {
      update: function(t, objects) {
        bw.update(t);
        //console.log(bw.position)

        var ray = new THREE.Raycaster(bw.position, new THREE.Vector3(0,0,1), 0 , 1000000);
        var intersects = ray.intersectObjects(objects, true);
        //console.log(intersects.length);

        for (var i = 0; i < intersects.length; i++) {
          if (intersects[i].distance > size/2 * 0.5){
            //intersects[i].object.warn(intersects[i].distance);
          }
          else {
            //console.log(intersects[i].distance)
            //console.log('die');
            bw.speed.setZ(0.0);
          }
        }
        //console.log(bw.position+Math.sin(bw.rotation.x)*size)
        light.position.copy(bw.getPosition());
        //group.position.copy(bw.getRotPos());
      },
      invert: function(t) {
        bw.invert();
      },
      getPosition: function() {
        return bw.getPosition().clone();
      }
    });
  };
});
