define(function(){
  
  var canvas, 
      ctx;
      
  function getImageData(img){
    ctx = canvas.getContext("2d");
    var x = 0, y = 0, width = img.width, height = img.height;
    canvas.height = height; 
    canvas.width = width;
    ctx.drawImage(img, x, y);
    var imgd = ctx.getImageData(x, y, width, height);
    var imxpxl = imgd.data;
    return imxpxl;
  }
  
  
  
  return {
    init: function(){
      canvas = document.createElement("canvas");
      canvas.style.cssText = "border: 1px solid red; position: absolute; top: 0; z-index: 10; display:block";
      canvas.id = "map_offscreen";
      document.body.appendChild(canvas);
    },
    loadMap: function(img, cb){
      var map = new Image(img.width, img.height);
      var loaded = function () {
        var data = getImageData(this),
            width = map.height, 
            height = map.width, 
            col = 0, row = 0, 
            rows = [],
            tone, 
            str="";
        console.log("image data for width: %s, height: %s", width, height)
        for (var i = 0, n = data.length; i < n; i += 4) {
          // i+3 is alpha
          col = i/4 % width;
          row = (i/4 - col) / height;
          tone = Math.floor(data[i+3]/128);
          if(col){
            rows[row] += ""+tone; 
          } else {
            rows[row] = tone; 
          }
        }
        map.removeEventListener("load", loaded, false);
        cb(rows);
      };
      map.addEventListener("load", loaded, false);
      map.src = img.src;
    }
  }
})