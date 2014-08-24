define(function(require) {

  var Box = require('box');

  return function Trigger(call) {
    var box = new Box({color: 0x00FF00, transparent: true, opacity: 0.01}, 1, 10, 1);
    box.hitNotify = call;
    return box;
  };
});
