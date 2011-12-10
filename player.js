define(['player-controls'], function(controls){
  return {
    init: function(){

      controls.init();
      // Create our player entity with some premade components
      var components = [
        "2D", "Canvas", "player", "Controls", 
        controls.name, "Animate", "Collision"
      ].join(", ");

      var player = Crafty.e(components);

      // init the custom controls
      player[controls.name](1);

  		//create our player entity with some premade components
  		player
  			.attr({x: 160, y: 144, z: 1})
  			.animate("walk_left", 6, 3, 8)
  			.animate("walk_right", 9, 3, 11)
  			.animate("walk_up", 3, 3, 5)
  			.animate("walk_down", 0, 3, 2)
  			.bind("enterframe", function(e) {
  				if(this.isDown("LEFT_ARROW")) {
  					if(!this.isPlaying("walk_left"))
  						this.stop().animate("walk_left", 10);
  				} else if(this.isDown("RIGHT_ARROW")) {
  					if(!this.isPlaying("walk_right"))
  						this.stop().animate("walk_right", 10);
  				} else if(this.isDown("UP_ARROW")) {
  					if(!this.isPlaying("walk_up"))
  						this.stop().animate("walk_up", 10);
  				} else if(this.isDown("DOWN_ARROW")) {
  					if(!this.isPlaying("walk_down"))
  						this.stop().animate("walk_down", 10);
  				}
  			}).bind("keyup", function(e) {
  				this.stop();
  			})
  			.collision()
  			.onHit("wall", function() {
  				// console.log("hit wall, direction: ", this._direction);
  				switch(this._direction){
  				  case "u":
  				    this.y += this._speed; // back up
  				    break;
  				  case "d":
			        this.y -= this._speed; // back up
  				    break;
  				  case "l":
			        this.x += this._speed; // back up
  				    break;
  				  case "r":
		          this.x -= this._speed; // back up
  				    break;
  				  default: break;
  				}
  				this.stop();
  			})
  			.onHit("wall_left", function() {
  				this.x += this._speed;
  				this.stop();
  			})
  			.onHit("wall_right", function() {
  				this.x -= this._speed;
  				this.stop();
  			})
  			.onHit("wall_bottom", function() {
  				this.y -= this._speed;
  				this.stop();
  			})
  			.onHit("wall_top", function() {
  				this.y += this._speed;
  				this.stop();
  			});
  			
  			return player;
    },
    name: "player-controls"
  };
});