define(function(require){
  return function Box(color, size_x, size_y, size_z, mat) {
    var c;
    if (typeof color === 'number') {

      c = {
        color: color
      };
    } else {
      c = color;
    }
    var material = mat || new THREE.MeshLambertMaterial(c),
        geometry = new THREE.BoxGeometry(size_x, size_y, size_z),
        mesh = new THREE.Mesh(geometry, material);
    return $.extend(mesh, {
      hitNotify: function(distance, player) {
      }
    });
  };
});
