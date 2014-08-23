define(function(require) {
  return function Light(color, intensity, distance) {
    return new THREE.PointLight(color, intensity, distance);
  };
});
