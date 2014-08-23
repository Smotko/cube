define(function(require) {

  three = THREE.Bootstrap('core', 'stats');
  var scene = require('scene')(),
      camera = require('camera')(scene.player);

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


  window.addEventListener('keydown', function(){
    switch(event.keyCode) {
      case 32:
        camera.invert();
        scene.player.invert();
        break;
    }
  });
  return function (){};
});
