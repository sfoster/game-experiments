define(['loading-scene', 'main-scene'], function(loading, main){
  return {
    init: function(){
      //start crafty
      console.log("game init");
      Crafty.init(320, 320);
      Crafty.canvas();
      
      //turn the sprite map into usable components
      Crafty.sprite(16, "sprite.png", {
          grass1: [0,0],
          grass2: [1,0],
          grass3: [2,0],
          grass4: [3,0],
          flower: [0,1],
          bush1: [0,2],
          bush2: [1,2],
          player: [0,3]
      });
      
      console.log("init main");
      main.init();
      console.log("/init main");

      console.log("init loading");
      loading.init();
      console.log("/init loading");

      // Automatically play the loading scene
      Crafty.scene("loading");

    }
  };
  
});
