function planier_init()
{
  stage.fill(c64.colors.black);

  planier = [];

  planier.logo = new image ("gfx/awsm_logo_bubble320.gif");

  lessFPSCounter = 0;

  planier.canvas = new canvas (140,40);
  planier.checker = new Planier_checker(c64.colors.dark_grey,c64.colors.black,14,28,-1.2);

  planier.font = new image("gfx/font_awsm_5x5.gif");
  planier.font.initTile(5,6,33);
  planier.font2 = new image("gfx/font_awsm_5x10.gif");
  planier.font2.initTile(5,12,33);

  sinusScrolltext = "ABC DEFGH IJKLM NOP";
  sinusScrolltext += "$QR STUV WXYZ";
  sinusScrolltext += "$1 2345 678 90";
  sinusScrolltext += "$LIBAT QUALCKKK ERS!!";
  sinusScrolltext += "$LEFT NENF ALL KNARR";
  sinusScrolltext += "$ZELONG HAWINF NIEDER";
  planier_init_planierscroll(mycanvas160,sinusScrolltext);

}


function planier_init_planierscroll(canvas,text)
{

  plaScrollText = text;
  plaScrollAllText = [];
  plaScrollFontWidth = 4;
  plaScrollX = 0;
  plaScrollY = 0;
  plaScrollCharCounter = 0;

  for (i = 0; i<plaScrollText.length;i++){

    if (plaScrollText[i]==" "){
      plaScrollY-=8;
      plaScrollX+=2;
    }

    if (plaScrollText[i]=="W" || plaScrollText[i]=="N" || plaScrollText[i]=="M" ){
      plaScrollX+=1;
    }

    if (plaScrollText[i]=="I"){
      plaScrollX-=1;
    }

    if (plaScrollText[i]=="$"){

      plaScrollX = -(i+1) * plaScrollFontWidth;
      plaScrollY-=12;

    }else{

      plaScrollAllText[plaScrollCharCounter] = new PlanierScroll (canvas,plaScrollText[i],20+plaScrollX+plaScrollFontWidth*i,-10+plaScrollY,0.6);
      plaScrollCharCounter ++;
    }

    if (plaScrollText[i]=="W" || plaScrollText[i]=="N" || plaScrollText[i]=="M" || plaScrollText[i]=="Q"){
      plaScrollX+=1;
    }

    if (plaScrollText[i]=="I"){
      plaScrollX-=1;
    }
  }
}


function PlanierScroll(canvas,text, xPos, yPos, speed)
{

  // moves text

  this.canvas = canvas;
  this.text = text;
  this.xPos = xPos;
  this.yPos = yPos;
  this.speed = speed;
  this.speedMulti = Math.random(1)/50;
  this.xPosMulti = (Math.random(1)-0.5)/2;
  this.burstY = 40 + Math.random()*40-20;

  this.draw = function()
{
  // as long as the text isn't past the upper border, do the movement math
  if (this.yPos < 220){
    this.yPos += this.speed;

  }


  if (this.yPos >-20 && this.yPos < this.burstY){
    // if the text is high enough, increase x and speed to make it slowly break apart
  //  this.speed += this.speedMulti;
  //  this.xPos += this.xPosMulti;
  }

  if (this.yPos > -20 && this.yPos < 100){
    // if text is within visible area, draw it to the canvas
    planier.font.print(this.canvas,this.text,this.xPos,Math.floor(this.yPos));
  }

  if (this.yPos > 90 && this.yPos < 220){
    // if text is within visible area, draw it to the canvas
    planier.font2.print(this.canvas,this.text,this.xPos,Math.floor(this.yPos));
  }

};
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
      this.canvas.quad(0,0,2,4,c64.colors.light_red);
      this.canvas.quad(138,0,2,4,c64.colors.light_red);
      this.canvas.quad(0,4,1,7,c64.colors.light_red);
      this.canvas.quad(139,4,1,7,c64.colors.light_red);
      this.canvas.quad(0,29,1,7,c64.colors.light_red);
      this.canvas.quad(139,29,1,7,c64.colors.light_red);
      this.canvas.quad(0,36,2,4,c64.colors.light_red);
      this.canvas.quad(138,36,2,4,c64.colors.light_red);
    }
  };

}


function planier_render()
{

  lessFPSCounter ++;
  if (lessFPSCounter%3===0){

    mycanvas160.fill(c64.colors.light_red);

    border.quad(30,0,320,30,c64.colors.light_red);
    border.quad(30,200,320,120,c64.colors.light_red);

    // draw scroller

    // draw the scrolltext to the scroller canvas
    for (i = 0; i<plaScrollCharCounter;i++){
      plaScrollAllText[i].draw();
    }

    // draw the checker to the checker canvas

    //mycanvas160.quad(12,110,136,20,c64.colors.red);


    planier.checker.draw(planier.canvas);

    planier.canvas.contex.globalCompositeOperation='lighter';
    planier.canvas.quad(2,4,136,32,c64.colors.grey);
    planier.canvas.quad(2,11,138,18,c64.colors.dark_grey);
    planier.canvas.contex.globalCompositeOperation='source-over';

    planier.canvas.draw(mycanvas160,10,70);
    planier.logo.draw(border,140,230);



  }

    colorReduce(mycanvas160);
}
