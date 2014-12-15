/*

  awsmlib    written by Ingo Hinterding 2014

*/


function Starfield(canvas,amount,w,h,xdir, ydir, minSpeed,maxSpeed,colors){
  /*

  canvas = the canvas to display
  amount = number of stars to display
  w = width of a star in pixels
  h = height of a star in pixels
  xdir = horizontal direction (0, 1 or -1)
  ydir = vertical direction (0, 1 or -1)
  minSpeed = the minimum speed a star can have
  maxSpeed = the maximum speed a star can have
  colors = array with colors, e.g. ["#ff0000", "#FF00FF"]

  */
  this.canvas = canvas;
  this.amount = amount;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.w = w;
  this.h = h;
  this.xdir = xdir;
  this.ydir = ydir;
  this.colors = colors;

  this.allStars = [];

  for(var i = 0; i<this.amount; i++){
    this.star = {
      speed: this.minSpeed + Math.random()*(this.maxSpeed-this.minSpeed),
      x: Math.floor(Math.random()*this.canvas.width),
      y: Math.floor(Math.random()*this.canvas.height),
      c: this.colors[Math.floor(Math.random()*this.colors.length)]

    };

    this.allStars.push(this.star);

  }


  this.draw = function(canvas){
    this.canvas = canvas;
    for(var i = 0; i<this.amount; i++){
      this.canvas.quad(Math.floor(this.allStars[i].x),Math.floor(this.allStars[i].y),this.w,this.h,this.allStars[i].c);

      this.allStars[i].x += this.xdir * this.allStars[i].speed;
      this.allStars[i].y += this.ydir * this.allStars[i].speed;

      if(this.allStars[i].x < -this.w){
        this.allStars[i].x = this.canvas.width+this.w;
        this.allStars[i].y =Math.random()*this.canvas.height;
      }

      if(this.allStars[i].x > this.canvas.width +this.w){
        this.allStars[i].x = 0-this.w;
        this.allStars[i].y = Math.random()*this.canvas.height;
      }

      if(this.allStars[i].y < -this.h){
        this.allStars[i].y = this.canvas.height+this.h;
        this.allStars[i].x = Math.random()*this.canvas.width;
      }

      if(this.allStars[i].y > this.canvas.height +this.h){
        this.allStars[i].y = 0-this.h;
        this.allStars[i].x = Math.random()*this.canvas.width;
      }


    }
  };

}


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


function Blend(canvas,time,blendmode)
{
  this.canvas = canvas;
  this.time = time;
  this.blendmode = blendmode;
  this.counter = 0;

  this.palette=[
    {r:0,g:0,b:0},
    {r:67,g:57,b:0},
    {r:53,g:40,b:121},
    {r:104,g:55,b:43},
    {r:68,g:68,b:68},
    {r:111,g:61,b:134},
    {r:111,g:79,b:37},
    {r:108,g:94,b:181},
    {r:108,g:108,b:108},
    {r:154,g:103,b:89},
    {r:88,g:141,b:67},
    {r:149,g:149,b:149},
    {r:112,g:164,b:178},
    {r:184,g:199,b:111},
    {r:154,g:210,b:132},
    {r:255,g:255,b:255}
    ];


  this.draw = function()
  {

      this.counter ++;

      if(this.counter >= this.time && this.palette.length > 0){
        if(this.blendmode == 0){
          this.palette.pop();
        }else{
          this.palette.shift();
        }
        this.counter = 0;
      }

      colorReduce(this.canvas,this.palette);
  }


}
