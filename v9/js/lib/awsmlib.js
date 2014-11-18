/*

  awsmlib    written by Ingo Hinterding 2014

*/


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function AnimGIF (file,width,height,loops,delay){
  this.file = file;
  this.width = width;
  this.height = height;
  this.loops = loops;
  this.delay = delay;
  this.image = new image(this.file);
  this.image.initTile(this.width,this.height);

  this.play = function (canvas,x,y){
    if(typeof(this.loop)=="undefined") this.loop = 0;
    if(typeof(this.count)=="undefined") this.count = 0;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.image.drawTile(this.canvas,this.loop,this.x,this.y);

    this.count++;
    if(this.count >= this.delay){
      this.loop++;
      this.count = 0;
      if(this.loop > this.loops) this.loop = 0;
    }

  }
}


function Rasterbar (width, colorheight, colors){

  this.width = width;
  this.colorheight = colorheight;
  this.colors = colors;

  this.canvas = new canvas(this.width, this.colors.length * this.colorheight);

  for(var i = 0; i <= this.colors.length; i++){
    this.canvas.quad(0,i * this.colorheight,this.width,this.colorheight,this.colors[i]);
  }

  return this.canvas;
}


function colorReduce(canvas,cols)
{
    // reduces all colors on a canvas to the palette defined

    var canvasOriginal=canvas;
    var ctx=canvasOriginal.contex;
    var canvasMapped=canvas;
    var ctxMapped=canvasMapped.contex;

    // create an array of palette colors
    if (typeof(cols)!="undefined" && cols !="")
      {
        var palette = cols;
      }else{
        var palette=[
            {r:0,g:0,b:0},
            {r:255,g:255,b:255},
            {r:104,g:55,b:43},
            {r:112,g:164,b:178},

            {r:111,g:61,b:134},
            {r:88,g:141,b:67},
            {r:53,g:40,b:121},
            {r:184,g:199,b:111},

            {r:111,g:79,b:37},
            {r:67,g:57,b:0},
            {r:154,g:103,b:89},
            {r:68,g:68,b:68},

            {r:108,g:108,b:108},
            {r:154,g:210,b:132},
            {r:108,g:94,b:181},
            {r:149,g:149,b:149}
            ];
      }



    // load all pixels into an array
    var imageData=ctx.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var data=imageData.data;

    // rewrite all pixels using only the mapped colors
    var mappedColor;
    for(var i=0; i<data.length; i+=4) {
      mappedColor = mapColorToPalette(data[i], data[i+1], data[i+2]);

      if(data[i+3]>10){
          data[i]   = mappedColor.r;
          data[i+1] = mappedColor.g;
          data[i+2] = mappedColor.b;
      }
    }
    ctxMapped.putImageData(imageData,0,0);

    // use Euclidian distance to find closest color
    function mapColorToPalette(red,green,blue){
        var color,diffR,diffG,diffB,diffDistance,mappedColor;
        var distance=250000;
        for(var i=0;i<palette.length;i++){
            color=palette[i];
            diffR=( color.r - red );
            diffG=( color.g - green );
            diffB=( color.b - blue );
            diffDistance = diffR*diffR + diffG*diffG + diffB*diffB;
            if( diffDistance < distance  ){
                distance=diffDistance;
                mappedColor=palette[i];
            };
        }
        return(mappedColor);
    }

}


function rastertest_init(){
  params = [
    c64.colors["dark_grey"],
    c64.colors["grey"],
    c64.colors["light_grey"],
    c64.colors["white"],
    c64.colors["light_grey"],
    c64.colors["grey"],
    c64.colors["dark_grey"],
  ];
  raster = [];
  for (var i = 0; i<10; i++){
    raster[i] = new Rasterbar(320, 2, params);
  }

}


function rastertest_render(){
  stage.clear();
for (var i = 0; i<10; i++){
  raster[i].draw(mycanvas,0,i*20);
}
}
