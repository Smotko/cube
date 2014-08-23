require([], function() {
  require.config({
    urlArgs: "bust=" + (new Date()).getTime()
  });

  var three = THREE.Bootstrap('core', 'stats');
  // Insert a cube
  var mesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial());
  three.scene.add(mesh);

  // Orbit the camera
  three.on('update', function() {
    var t = three.Time.now;
    three.camera.position.set(Math.cos(t), 0.5, Math.sin(t));
    three.camera.lookAt(new THREE.Vector3());
  });
});
