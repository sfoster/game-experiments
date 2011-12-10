define(['map'], function(map){
	// Method to randomy generate the map
	
	function generateMap(map) {
		var rows = map.grid, 
				cols = null,
				width = map.width, 
				height = map.height,
				col = 0, row = 0, chr, tile, 
				grassType, 
				comps = "";
		console.log("num tiles: ", rows.length * rows[0].length);
		while( (cols = rows.shift())) {
			while( (chr = cols.shift())) {
				// draw grass
				grassType = Crafty.randRange(1, 4);
				Crafty.e("2D, Canvas, grass"+grassType)
					.attr({x: col * 16, y: row * 16});
				
				switch(chr){
					case "000": 
						// draw a bush
    				comps = [
    				  "2D", "Canvas", "bush"+Crafty.randRange(1,2), 
    				  (row===0 ? "wall_top" : row==height-1 ? "wall_bottom" : col===0 ? "wall_left" : col==width-1 ? "wall_right": "wall")
    				].join(", ");
    				// console.log("draw bush at ", col * 16, row * 16, comps);
						Crafty.e(comps)
							.attr({x: col * 16, y: row * 16, z: 2});
						break;
					default: 
						// maybe draw flower
						if (Crafty.randRange(0, 50) > 49) {
							Crafty.e("2D, DOM, flower, animate")
								.attr({x: col * 16, y: row * 16})
								.animate("wind", 0, 1, 3)
								.bind("enterframe", function() {
									if (!this.isPlaying())
										this.animate("wind", 80);
								});
						}
						break;
				}
  			col++;
			}
			col=0
  		row++;
		}
	}
	function generateWorld() {
		//generate the grass along the x-axis
		for(var i = 0; i < 25; i++) {
			//generate the grass along the y-axis
			for(var j = 0; j < 20; j++) {
				grassType = Crafty.randRange(1, 4);
				Crafty.e("2D, Canvas, grass"+grassType)
					.attr({x: i * 16, y: j * 16});
				
				//1/50 chance of drawing a flower and only within the bushes
				if(i > 0 && i < 24 && j > 0 && j < 19 && Crafty.randRange(0, 50) > 49) {
					Crafty.e("2D, DOM, flower, Animate")
						.attr({x: i * 16, y: j * 16})
						.animate("wind", 0, 1, 3)
						.bind("enterframe", function() {
							if(!this.isPlaying())
								this.animate("wind", 80);
						});
				}
			}
		}
		
		//create the bushes along the x-axis which will form the boundaries
		for(var i = 0; i < 25; i++) {
			Crafty.e("2D, Canvas, wall_top, bush"+Crafty.randRange(1,2))
				.attr({x: i * 16, y: 0, z: 2});
			Crafty.e("2D, Canvas, wall_bottom, bush"+Crafty.randRange(1,2))
				.attr({x: i * 16, y: 304, z: 2});
		}
		
		//create the bushes along the y-axis
		//we need to start one more and one less to not overlap the previous bushes
		for(var i = 1; i < 19; i++) {
			Crafty.e("2D, Canvas, wall_left, bush"+Crafty.randRange(1,2))
				.attr({x: 0, y: i * 16, z: 2});
			Crafty.e("2D, Canvas, wall_right, bush"+Crafty.randRange(1,2))
				.attr({x: 384, y: i * 16, z: 2});
		}
	}	 
	
	return {
		init: function(){
			map.init();
			var data = {
				src: './map.png',
				height: 20, width: 20
			};
			map.loadMap(data, function(grid){
				data.grid = grid;
				generateMap(data);
			});
		}
	};
});