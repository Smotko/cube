define(function(require){

  var Cube = require('cube'),
      Box = require('box'),
      Dialog = require('dialog'),
      Trigger = require('trigger'),
      dialog,
      start = 0.5;

  return {
    load: function(level, o) {
      var result = this[level].apply(this);
      result.decals.position.z = o;
      result.obstacles.position.z = o;
      return result;
    },
    nextDialog: function(c) {
      dialog.nextDialog(c);
    },
    nextLevelTrigger: function() {
      return new Trigger(function(d, p){
        if (d < 0.05) {
          SCENE.nextLevel();
        }
      });
    },
    randomDecals: function() {
      var NUM_DECALS = 100,
          group = new THREE.Object3D(),
          rnd1 = Math.random(),
          rnd2 = Math.random(),
          rnd3 = Math.random(), i, mat;

      mat = {color: 0x000000, transparent: false, opacity: 0.6};

      for (i = 0; i < NUM_DECALS; i++) {
        rndBox = new Box(mat, rnd1+1.502, rnd2+1.01, rnd3+1.501);
        rndBox.position.x =  rnd1 * 1;
        rndBox.position.y = - 5 - rnd1;
        rndBox.position.z = rnd3 * 1 * i;
        group.add(rndBox);
      }
      return group;

    },
    level0: function() {
      var NUM_OBJECTS = 2,
          self = this,
          group = new THREE.Object3D();

      dialog = new Dialog([
        "Hi there! I am <i style='color:red'>cube</i>.<br><small>Press <i class='key'>[enter]</i></small>",
        "I have a <i class='superpower'>superpower</i>!<br><small>Press <i class='key'>[enter]</i></small>",
        "I can slide between <i>Worlds</i>.<br><small>Press <i class='superpower'>[space]</i> to try it now!</small>",
        "That was cool, right?<br> <small>Press <i class='superpower'>[space]</i> to get back to<br> the first world.</small>",
        "OK, try to use the <i class='superpower'>superpower</i> to get past obstacles!<br><small>Press <i class='key'>[enter]</i></small>"
      ], true);

      var size = 1;
      var obstacle = new Box(0x222222, size, size*10, size);
      obstacle.position.set(0, size*10/2, start + size);
      return {
        obstacles: group,
        decals: self.randomDecals(),
      };
    },
    level1: function() {
      var NUM_OBJECTS = 3, i,
          self = this,
          group = new THREE.Object3D(),
          obstacle;

      dialog = new Dialog([
      ]);

      for (i = 0; i < NUM_OBJECTS; i++) {

        var size = 0.2,
            is_up = i%2 === 0;
        obstacle = new Box(is_up ? 0x222222 : 0xFFFFFF, size*100, size, size);
        obstacle.position.set(0, i%2 === 0 ? size/2 : -size/2, (i + 4)*size*3);
        group.add(obstacle);
      }
      var t = this.nextLevelTrigger();
      t.position.set(0, 0, obstacle.position.z + 0.5);
      group.add(t);
      return {
        obstacles: group,
        decals: self.randomDecals(),
        perspective: 0,
      };
    },
    level2: function() {
      var NUM_OBJECTS = 10, i,
          self = this,
          group = new THREE.Object3D(),
          obstacle;

      dialog = new Dialog([
      ]);

      for (i = 0; i < NUM_OBJECTS; i++) {
        for (j = 0; j < NUM_OBJECTS; j++) {
          var size = 0.2,
              is_up = (j+i)%2 === 0;
          obstacle = new Box(is_up ? 0x222222 : 0xFFFFFF, size, size, size);
          obstacle.position.set((j - NUM_OBJECTS/2)*size*2, (j+i)%2 === 0 ? size/2 : -size/2, (i + 2)*size*3);
          group.add(obstacle);
        }
      }
      var t = this.nextLevelTrigger();
      t.position.set(0, 0, obstacle.position.z + 0.5);
      group.add(t);
      return {
        obstacles: group,
        decals: self.randomDecals(),
        perspective: 0,
      };
    },
    level3: function() {
      var NUM_OBJECTS = 10, i,
          self = this,
          group = new THREE.Object3D(),
          obstacle;

      dialog = new Dialog([
      ]);

      for (i = 0; i < NUM_OBJECTS; i++) {
        for (j = 0; j < NUM_OBJECTS; j++) {
          var size = 0.2,
              is_up = (i)%2 === 0;
          obstacle = new Box(is_up ? 0x222222 : 0xFFFFFF, size, size*2, size);
          obstacle.position.set((j - NUM_OBJECTS/2)*size*1.5, (i)%2 === 0 ? size : -size, (i + 2)*size*2.5);
          group.add(obstacle);
        }
      }
      var t = this.nextLevelTrigger();
      t.position.set(0, 0, obstacle.position.z + 0.5);
      group.add(t);
      return {
        obstacles: group,
        decals: self.randomDecals(),
        perspective: 1,
      };
    },
    level4: function() {
      var NUM_OBJECTS = 10, i,
          self = this,
          group = new THREE.Object3D(),
          obstacle;

      dialog = new Dialog([
      ]);

      for (i = 0; i < NUM_OBJECTS; i++) {
        for (j = 0; j < NUM_OBJECTS; j++) {
          var size = 0.2,
              is_up = Math.random() < 0.5;
          obstacle = new Box(is_up ? 0x222222 : 0xFFFFFF, size, size*4, size);
          obstacle.position.set((j - NUM_OBJECTS/2)*size*1.5, is_up ? size*2 : -size*2, (i + 2)*size*2.5);
          group.add(obstacle);
        }
      }
      var t = this.nextLevelTrigger();
      t.position.set(0, 0, obstacle.position.z + 0.5);
      group.add(t);
      return {
        obstacles: group,
        decals: self.randomDecals(),
        perspective: 0
      };
    },
    level5: function() {
      var NUM_OBJECTS = 10, i,
          self = this,
          group = new THREE.Object3D(),
          obstacle;

      dialog = new Dialog([
      ]);

      for (i = 0; i < NUM_OBJECTS; i++) {
        for (j = 0; j < NUM_OBJECTS; j++) {
          var size = 0.2,
              is_up = Math.random() < 0.5
              height = Math.random()*1.2 + 0.1;
          obstacle = new Box(is_up ? 0x222222 : 0xFFFFFF, size, height, size);
          obstacle.position.set((j - NUM_OBJECTS/2)*size*1.5, is_up ? height/2 : -height/2, (i + 2)*size*2.5);
          group.add(obstacle);
        }
      }
      var t = this.nextLevelTrigger();
      t.position.set(0, 0, obstacle.position.z + 0.5);
      group.add(t);
      return {
        obstacles: group,
        decals: self.randomDecals(),
        perspective: 1
      };
    },

  };
});
