define(['player-controls'], function(controls){
  return {
    init: function(){

      controls.init();
      // Create our player entity with some premade components
      var components = [
        "2D", "DOM", "player", "controls", 
        controls.name, "animate", "collision"
      ].join(", ");

      var player = Crafty.e(components)
        .attr({x: 160, y: 144, z: 1});

      // init the custom controls
      player[controls.name](1);
        
      player
        .animate("walk_left", 6, 3, 8)
        .animate("walk_right", 9, 3, 11)
        .animate("walk_up", 3, 3, 5)
        .animate("walk_down", 0, 3, 2);

      player.bind("enterframe", function(e) {
          if (this.__move.left) {
            if (!this.isPlaying("walk_left"))
              this.stop().animate("walk_left", 10);
          }
          if (this.__move.right) {
            if (!this.isPlaying("walk_right"))
              this.stop().animate("walk_right", 10);
          }
          if (this.__move.up) {
            if (!this.isPlaying("walk_up"))
              this.stop().animate("walk_up", 10);
          }
          if (this.__move.down) {
            if (!this.isPlaying("walk_down"))
              this.stop().animate("walk_down", 10);
          }
        });
      player.bind("keyup", function(e) {
        this.stop();
      });
      
      // set up collision
      player.collision()
        .onhit("wall_left", function() {
          this.x += this._speed;
          this.stop();
        }).onhit("wall_right", function() {
          this.x -= this._speed;
          this.stop();
        }).onhit("wall_bottom", function() {
          this.y -= this._speed;
          this.stop();
        }).onhit("wall_top", function() {
          this.y += this._speed;
          this.stop();
        });      
      
    },
    name: "player-controls"
  };
});