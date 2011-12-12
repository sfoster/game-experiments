define(['world', 'player'], function(world, player){
  
  return {
    name: "main",
    init: function(){
      Crafty.scene("main", function() {
        console.log("init world");
        world.init();
        console.log("/init world");

        console.log("creating player entity");
        var pc = player.init();
        pc.attr({x: 3*16, y: 3*16, z: 1});
        
      });
    }
  };

});