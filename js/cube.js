define(function(require) {


  return function Cube(color, size) {
    var material = new THREE.MeshLambertMaterial({ color: color }),
        geometry = new THREE.BoxGeometry(size, size, size),
        mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };
});
