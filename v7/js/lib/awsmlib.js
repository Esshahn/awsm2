/*

  awsmlib    written by Ingo Hinterding 2014

*/

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
