define(function(require) {

  three = THREE.Bootstrap('core');
  var scene = require('scene')(),
      camera = require('camera')(scene.player),
      keydown = false;


  SCENE = scene;
  CAMERA = camera;
  STATS = {
    'superpower': 0,
    'distance': 0
  }
  scene.loadScene();
  var amb = new THREE.AmbientLight( 0x404040 ); // soft white light
  three.scene.add(amb);

  var directionalLight = new THREE.PointLight(0xF0F0F0, 0.5, 100);
  three.scene.add( directionalLight );

  // Orbit the camera
  three.on('update', function() {
    var t = three.Time.now;
    camera.update(t);
    directionalLight.position.copy(camera.position);
    scene.update(t);

  });

  $(window).keyup(function(e){
    keydown = false;
  });
  $(window).keydown(function(e){
    if (keydown) {
      return;
    }
    scene.nextDialog(e.keyCode);
    keydown = true;
    switch(e.keyCode) {

      case 32:
        keydown = true;
        if(camera.invert()) {
          $("#dialog").removeClass('white');
        } else {
          $("#dialog").addClass('white');
        }
        STATS.superpower += 1;
        scene.player.invert();
        break;
      case 87: //w
        //scene.player.setSpeed(0, 0.05);
        camera.nextPerspective();
        break;
      case 65: //a
        //scene.player.setSpeed(0.05, 0);
        camera.prevPerspective();
        break;
      case 83: //s
        //scene.player.setSpeed(-0.05, 0);
        break;
      case 68: //d
        //scene.player.setSpeed(0, -0.05);
        break;

      case 78: //n
        scene.nextLevel();
        break;
      case 80: //p
        scene.prevLevel();
        break;
      case 82:
        STATS = {
          'superpower': 0,
          'distance': 0
        };
        scene.restartScene();
        break;
    }
  });
  return function (){};
});
