define(function(require) {
  return function(player) {

    three.Camera.set({
      type: 'orthographic',
    });

    var camera = three.camera,
        position = camera.position,
        renderer  = three.renderer,
        color = 0x222222,
        p = 2,
        pos = new THREE.Vector3(-p, 2, -p),
        lookat = new THREE.Vector3(),
        perspectives = [
          [p,p],
          [p,-p],
          [-p,-p],
          [-p,p],
        ],
        current_perspective = 0;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    camera.position.set(p,p,p);
    return {
      update: function(t) {
        var playerpos =player.getPosition();
        renderer.setClearColor(color);
        //console.log(player.position, player.pos)
        camera.position.x = 0.1*(playerpos.x + pos.x) + position.x * 0.9;
        camera.position.z = 0.1*(playerpos.z + pos.z) + position.z * 0.9;
        camera.position.y = 0.1 * (pos.y) + position.y * 0.9;
        camera.lookAt(playerpos);
        //console.log(camera.position);
      },
      invert: function() {
        pos.y = -pos.y;
        return pos.y > 0;
      },
      nextPerspective: function() {
        var curr = perspectives[++current_perspective%perspectives.length];
        pos.set(curr[0], pos.y, curr[1]);
      },
      prevPerspective: function() {
        if (--current_perspective < 0) {
          current_perspective = perspectives.length - 1;
        }

        var curr = perspectives[current_perspective%perspectives.length];
        pos.set(curr[0], pos.y, curr[1]);
      },
      changePosition: function(x,z) {
        pos.set(x,pos.y,z);
      },
      position: camera.position,
    };
  };
});
