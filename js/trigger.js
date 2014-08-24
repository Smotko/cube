define(function(require) {

  var Box = require('box');

  return function Trigger(call) {
    var box = new Box({color: 0x00FF00, transparent: true, opacity: 0.01}, 0.2, .4, .01, new THREE.MeshBasicMaterial({wireframe:true, wireframeLinewidth:0 }));
    box.hitNotify = call;
    return box;
  };
});
