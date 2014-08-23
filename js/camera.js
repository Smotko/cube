define(function(require) {
  return function(player) {

    three.Camera.set({
      type: 'orthographic',
    });

    var camera = three.camera,
        position = camera.position,
        renderer  = three.renderer,
        color = 0x222222,
        pos = 10,
        lookat = new THREE.Vector3();

    camera.position.set(-10,10,0);
    return {
      update: function(t) {
        renderer.setClearColor(color);
        //console.log(player.position, player.pos)
        camera.position.x = player.pposition.x - 10;
        camera.position.z = player.pposition.z - 10;
        camera.position.y = 0.1* pos + position.y * 0.9;
        camera.lookAt(player.pposition);
      },
      invert: function() {
        pos = pos == 10 ? -10 : 10;
      },
      position: camera.position,
    };
  };
});
