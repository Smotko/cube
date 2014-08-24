define(function(require, exports) {

  var Cube = require('cube'),
      Plane = require('plane'),
      Player = require('player'),
      Levels = require('levels');

  return function() {
    var scene = three.scene,
        player = new Player(),
        b_plane = Plane(0x444444),
        w_plane = Plane(0xFFFFFF),
        current_level = 0,
        all_levels = 6,
        level = {};

    b_plane.position.y = -0.001;
    b_plane.receiveShadow = true;
    w_plane.position.y = +0.001;
    w_plane.rotation.y = Math.PI;
    scene.add(player,  b_plane, w_plane);

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 1, 1, 0 );
    scene.add( directionalLight );
    directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( -1, -1, 0 );
    scene.add( directionalLight );
    return {
      update: function(t) {
        player.update(t, level.obstacles);
        //directionalLight.position.copy(player.getPosition());
        // for (var i = 0; i < objects.length; i++) {
        //   //objects[i].update();
        // }
      },
      death: function() {

      },
      restartScene: function() {
        player.reset();
        this.loadScene();
      },
      loadScene: function(first) {
        scene.remove(level.obstacles, level.decals);
        level = Levels.load('level'+current_level%all_levels, player.getPosition().z);
        scene.add(level.obstacles, level.decals);
      },
      nextLevel: function() {
        current_level++;
        if (current_level >= all_levels) {
          current_level = 1;
          player.setSpeed(0, player.getSpeed() + 0.05);
        }
        this.loadScene();
      },
      prevLevel: function() {
        current_level--;
        current_level = Math.max(0, current_level);
        this.loadScene();
      },
      nextDialog: function(c) {
        Levels.nextDialog(c);
      },
      player: player,
    };
  };
});
