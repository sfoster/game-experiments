define(['world', 'player-controls'], function(world, controls){
  
  return {
    name: "main",
    init: function(){
      Crafty.scene("main", function() {
        console.log("init world");
        world.init();
        console.log("/init world");

        console.log("init playercontrols");
        controls.init();
        console.log("init playercontrols");
        
        // Create our player entity with some premade components
        var components = [
          "2D", "DOM", "player", "controls", 
          controls.name, "animate", "collision"
        ].join(", ");
        console.log("creating player entity with components: ", components);
        var player = Crafty.e(components)
          .attr({x: 160, y: 144, z: 1})
          .playercontrols(2)
          .animate("walk_left", 6, 3, 8)
          .animate("walk_right", 9, 3, 11)
          .animate("walk_up", 3, 3, 5)
          .animate("walk_down", 0, 3, 2);
        //
        
      });
    }
  };

});