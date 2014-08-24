define(function(require){

  var directions = {
    'forward': new THREE.Vector3(0,0,1),
    'backward': new THREE.Vector3(0,0,-1),
    'right': new THREE.Vector3(1,0,0),
    'left': new THREE.Vector3(-1,0,0),
    'up': new THREE.Vector3(0,1,0),
    'down': new THREE.Vector3(0,-1,0)
  };

  return function Collision(object, position) {
    var result = {};
    $.map(directions, function(v, k){
      var ray = new THREE.Raycaster(position, v),
          intersects = ray.intersectObject(object, true);
      result[k] = intersects;
    });
    return result;
  };
});
