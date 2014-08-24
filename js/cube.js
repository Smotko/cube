define(function(require) {


  return function Cube(color, size) {
    var material = new THREE.MeshLambertMaterial({ color: color }),
        geometry = new THREE.BoxGeometry(size, size, size),
        original_geometry = geometry.clone(),
        mesh = new THREE.Mesh(geometry, material),
        speed = new THREE.Vector3(),
        is_up = true,
        group = new THREE.Object3D(); // needed for rotation changes;

    group.add(mesh);
    return $.extend(group, {

      update: function() {
        mesh.position.copy(speed).normalize().multiplyScalar(-size/2);
        mesh.position.y = is_up ? size/2 : -size/2;
        if (is_up) {
          group.rotation.x += speed.z;
          group.rotation.z -= speed.x;
        } else {
          group.rotation.x -= speed.z;
          group.rotation.z += speed.x;
        }
        if (Math.abs(group.rotation.x) >= Math.PI/2) {
          group.position.z += size;
          group.rotation.x = 0;
        }
      },
      invert: function() {
        is_up = !is_up;
      },
      warn: function() {

      },
      getPosition: function(){
        var v = group.position.clone();
        if (is_up) {
          v.z += Math.sin(group.rotation.x)*size;
          v.x += Math.sin(group.rotation.z)*size;
        } else {
          v.z -= Math.sin(group.rotation.x)*size;
          v.x -= Math.sin(group.rotation.z)*size;
        }
        return v.add(new THREE.Vector3(0, 0, 0));
      },
      speed: speed,
    });
  };
});
