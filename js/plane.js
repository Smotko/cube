define(function(require) {
  return function(color) {
    var geometry = new THREE.PlaneGeometry(2000, 2000),
        material = new THREE.MeshBasicMaterial(
          {color: color, transparent: true, opacity: 0.9}
        ),
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI/2;
    return mesh;
  };
});
