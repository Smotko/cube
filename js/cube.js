define(function(require) {


  return function Cube(color, size) {
    var material = new THREE.MeshLambertMaterial({ color: color }),
        geometry = new THREE.BoxGeometry(size, size, size),
        mesh = new THREE.Mesh(geometry, material),
        speed = new THREE.Vector3(),
        is_up = true;

    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size/2, -size/2));

    return $.extend(mesh, {
      update: function() {
        mesh.rotation.x += speed.z;
        mesh.rotation.z += speed.x;
        if (mesh.rotation.x >= Math.PI/2) {
          mesh.position.z += size;
          mesh.rotation.x = 0;
        }
        mesh.position.y = is_up ? size/2 : -size/2;
      },
      invert: function() {
        is_up = !is_up;
      },
      warn: function() {

      },
      getPosition: function(){
        var v = mesh.position.clone();
        v.z += Math.sin(mesh.rotation.x)*size;
        v.x += Math.sin(mesh.rotation.z)*size;
        return v.add(new THREE.Vector3(0, size/2, 0));
      },
      speed: speed,
    });
  };
});
