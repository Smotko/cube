define(function(require){
  return function Dialog(lines, cont){
    var current = 0,
        $dialog = $("#dialog");

    $dialog.html(lines[current]);
    return {
      nextDialog: function(c) {
        current += 1;
        if(current < lines.length) {
          $dialog.html(lines[current]);
        } else {
          $dialog.html("");
          if (cont) {
            // This is horrible too
            SCENE.nextLevel();
          }
        }
      }
    };
  };
});
