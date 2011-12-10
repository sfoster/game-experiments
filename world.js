define(function(){
  // Method to randomy generate the map
  function generateWorld() {
    // Generate the grass along the x-axis
    for (var i = 0; i < 25; i++) {
      // Generate the grass along the y-axis
      for (var j = 0; j < 20; j++) {
        grassType = Crafty.randRange(1, 4);
        Crafty.e("2D, canvas, grass" + grassType)
          .attr({x: i * 16, y: j * 16});

        // 1/50 chance of drawing a flower and only within the bushes
        if (i > 0 && i < 24 && j > 0 && j < 19 && Crafty.randRange(0, 50) > 49) {
          Crafty.e("2D, DOM, flower, animate")
            .attr({x: i * 16, y: j * 16})
            .animate("wind", 0, 1, 3)
            .bind("enterframe", function() {
              if (!this.isPlaying())
                this.animate("wind", 80);
            });
        }
      }
    }

    // Create the bushes along the x-axis which will form the boundaries
    for (var i = 0; i < 25; i++) {
      Crafty.e("2D, canvas, wall_top, bush"+Crafty.randRange(1,2))
        .attr({x: i * 16, y: 0, z: 2});
      Crafty.e("2D, canvas, wall_bottom, bush"+Crafty.randRange(1,2))
        .attr({x: i * 16, y: 304, z: 2});
    }

    // Create the bushes along the y-axis
    // We need to start one more and one less to not overlap the previous bushes
    for (var i = 1; i < 19; i++) {
      Crafty.e("2D, canvas, wall_left, bush" + Crafty.randRange(1,2))
        .attr({x: 0, y: i * 16, z: 2});
      Crafty.e("2D, canvas, wall_right, bush" + Crafty.randRange(1,2))
        .attr({x: 384, y: i * 16, z: 2});
    }
  }  
  
  return {
    init: function(){
      generateWorld();
    }
  };
})