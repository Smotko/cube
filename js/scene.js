define(function(require, exports) {

  var Cube = require('cube'),
      Plane = require('plane'),
      Player = require('player');

  return function() {
    var NUM_OBJECTS = 100,
        scene = three.scene,
        player = new Player(),
        obstacle,
        b_plane = Plane(0x222222),
        w_plane = Plane(0xEEEEEE),
        objects = [];

    for (var i = 0; i < NUM_OBJECTS; i++) {
      obstacle = new Cube(0xEEEEEE, 0.2);
      obstacle.position.set((i%4 - 2)*0.3, obstacle.position.y, (i - NUM_OBJECTS/2)*0.3);
      //objects.push(obstacle);
    }
    b_plane.position.y = -0.001;
    w_plane.position.y = +0.001;
    w_plane.rotation.y = Math.PI;
    obstacle.position.z = 1.1;
    scene.add(player, obstacle,  b_plane, w_plane);
    scene.add.apply(scene, objects);
    return {
      update: function(t) {
        player.update(t, objects);
        for (var i = 0; i < objects.length; i++) {
          objects[i].update();
        }
      },
      player: player,
      objects: objects,
    };
  };
});
