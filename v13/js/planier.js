function planier_init()
{
  stage.fill(c64.colors.black);

  lessFPSCounter = 0;

  planier_canvas = new canvas (140,40);
  planier_checker = new Planier_checker(c64.colors.dark_grey,c64.colors.black,14,28,-1.2);

}


function Planier_checker(color1,color2,xtilesize,ytilesize,yspeed){
  this.color1 = color1;
  this.color2 = color2;
  this.xtilesize = xtilesize;
  this.ytilesize = ytilesize;
  this.yspeed = yspeed;
  this.ymove = 0;

  this.draw = function (canvas){
    this.canvas = canvas;
    this.xstart = 0;
    this.ymove += this.yspeed;
    this.canvas.fill(this.color2);

    if (Math.abs(this.ymove) >= this.ytilesize*2){
      this.ymove = 0;
    }

    for (var j= -this.ytilesize; j<= (this.canvas.height+this.ytilesize*2)/this.ytilesize; j++){
      if (this.xstart === 0){
        this.xstart = this.xtilesize;
      }else{
        this.xstart = 0;
      }
      for (var i= -xtilesize; i<= (this.canvas.width+this.xtilesize*2)/this.xtilesize; i+=2){
          this.canvas.quad(Math.floor(this.xstart+i*this.xtilesize),Math.floor(this.ymove+j*this.ytilesize),this.xtilesize,this.ytilesize,this.color1);
      }
      this.canvas.quad(0,0,2,4,c64.colors.red);
      this.canvas.quad(138,0,2,4,c64.colors.red);
      this.canvas.quad(0,4,1,7,c64.colors.red);
      this.canvas.quad(139,4,1,7,c64.colors.red);
      this.canvas.quad(0,29,1,7,c64.colors.red);
      this.canvas.quad(139,29,1,7,c64.colors.red);
      this.canvas.quad(0,36,2,4,c64.colors.red);
      this.canvas.quad(138,36,2,4,c64.colors.red);
    }
  };


}


function planier_render()
{



  lessFPSCounter ++;
  if (lessFPSCounter%3===0){
    mycanvas160.fill(c64.colors.red);
    border.quad(30,0,320,30,c64.colors.red);
    border.quad(30,200,320,120,c64.colors.red);

    // draw the checker to the checker canvas
    mycanvas160.quad(14,98,132,2,c64.colors.brown);
    mycanvas160.quad(14,140,132,2,c64.colors.brown);
    planier_checker.draw(planier_canvas);

    planier_canvas.contex.globalCompositeOperation='lighter';
    planier_canvas.quad(2,4,136,32,c64.colors.grey);
    planier_canvas.quad(2,11,138,18,c64.colors.dark_grey);
    planier_canvas.contex.globalCompositeOperation='source-over';

    planier_canvas.draw(mycanvas160,10,100);

  }

    colorReduce(mycanvas160);
}
