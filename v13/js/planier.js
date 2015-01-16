function planier_init()
{
  stage.fill(c64.colors.black);

  if (demoIsLive) playSong('sid/Big_Funk.sid',0);

  planier = [];

  planier.logo = new image ("gfx/awsm_logo_bubble.gif");
  planier.logoborder = new image ("gfx/awsm_logo_bubble320.gif");

  lessFPSCounter = 0;

  planier.canvas = new canvas (120,30);
  planier.checker = new Planier_checker(c64.colors.dark_grey,c64.colors.black,12,24,2.2);

  planier.font1 = new image("gfx/font_awsm_5x5_shadow.gif");
  planier.font1.initTile(5,8,33);
  planier.font2 = new image("gfx/font_awsm_5x10_shadow.gif");
  planier.font2.initTile(5,12,33);

  planier.scrolltext = "$$  THE GREETINGS SCREEN!";
  planier.scrolltext += "$$$$ADT // ABSOLUTE";
  planier.scrolltext += "$$$$AIRO";
  planier.scrolltext += "$$AYOROS";
  planier.scrolltext += "$$BL4CK // N-VC 1993";
  planier.scrolltext += "$$BRAINWALKER";
  planier.scrolltext += "$$CRAYFISH77 // DESIRE";
  planier.scrolltext += "$$DANE // BOOZE DESIGN";
  planier.scrolltext += "$$DRSKULL";
  planier.scrolltext += "$$EOF // SCIZORS";
  planier.scrolltext += "$$E$G // HOKUTO FORCE";
  planier.scrolltext += "$$GANDALF";
  planier.scrolltext += "$$HIQ // COMPAGIONS";
  planier.scrolltext += "$$JARI VUOKSENRANTA";
  planier.scrolltext += "$$JOHN // IPHONE1911";
  planier.scrolltext += "$$LINUS // VIRUZ";
  planier.scrolltext += "$$MELLOW MAN // UP ROUGH";
  planier.scrolltext += "$$NEW CORE";
  planier.scrolltext += "$$NONAMENO // CODEF";
  planier.scrolltext += "$$SOLO";
  planier.scrolltext += "$$STC // HEMOROIDS";
  planier.scrolltext += "$$STF // FLOOD";
  planier.scrolltext += "$$STIVEGATES // WINDOWS93";  
  planier.scrolltext += "$$SUBZERO";
  planier.scrolltext += "$$TINY'R'SID";
  planier.scrolltext += "$$TOTORMAN";
  planier.scrolltext += "$$WERTSTAHL // GENESIS PROJECT";
  planier.scrolltext += "$$AND ALL CODEF DEVS";

  planier_init_planierscroll(mycanvas160,planier.scrolltext);
  planier.sinY = 1.5;

}


function planier_init_planierscroll(canvas,text)
{

  plaScrollText = text;
  plaScrollAllText = [];
  plaScrollFontWidth = 4;
  plaScrollX = 0;
  plaScrollY = 0;
  plaScrollCharCounter = 0;
  playSinY = 0;

  for (i = 0; i<plaScrollText.length;i++){

    playSinY += 0.2;
    if (plaScrollText[i]=="W" || plaScrollText[i]=="N" || plaScrollText[i]=="M" ){
      plaScrollX+=1;
    }

    if (plaScrollText[i]=="I"){
      plaScrollX-=1;
    }

    if (plaScrollText[i]=="$"){
      plaScrollX = -(i+1) * plaScrollFontWidth;
      plaScrollY-=14;
    }else{

      plaScrollAllText[plaScrollCharCounter] = new PlanierScroll (canvas,plaScrollText[i],30+plaScrollX+plaScrollFontWidth*i,plaScrollY,0.4,playSinY,planier.font1,planier.font2);
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


function PlanierScroll(canvas,text, xPos, yPos, speed,sinY, font1,font2)
{

  // moves text

  this.canvas = canvas;
  this.text = text;
  this.xPos = xPos;
  this.yPos = yPos;
  this.speed = speed;
  this.sinY = sinY;
  this.font1 = font1;
  this.font2 = font2;
  this.currentFont = this.font1;
  this.planiert = 0;
  this.sinYPos = 0;

  this.draw = function(){

    this.sinYPos = Math.floor(Math.sin(this.sinY)*4);

     if (!this.planiert){
       this.sinY += 0.4;
     }


    // as long as the text isn't past the upper border, do the movement math
    if (this.yPos < 220){
      this.yPos += this.speed;
    }

    if (this.yPos > 40 && this.yPos < 220){
      // if text is within visible area, draw it to the canvas
      this.currentFont.print(this.canvas,this.text,this.xPos,Math.floor(this.yPos+this.sinYPos));
    }

    if (this.yPos > planier.yPos){
      // if text is within visible area, draw it to the canvas
      this.currentFont = this.font2;
      this.planiert = 1;
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

  this.draw = function (canvas,yspeed){
    this.yspeed = yspeed;
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

    }

    this.canvas.contex.globalCompositeOperation='lighter';
    this.canvas.quad(0,4,120,22,c64.colors.grey);
    this.canvas.quad(0,11,122,8,c64.colors.dark_grey);
    this.canvas.quad(0,6,120,1,c64.colors.dark_grey);
    this.canvas.contex.globalCompositeOperation='source-over';

  };

}


function planier_render()
{

  lessFPSCounter ++;
  if (lessFPSCounter%3===0){

    mycanvas160.fill(c64.colors.black);
    mycanvas160.quad(25,0,110,200,c64.colors.light_red);
    border.quad(80,0,220,30,c64.colors.red);
    border.quad(80,200,220,120,c64.colors.red);
    border.quad(80,29,220,1,c64.colors.white);
    border.quad(80,230,220,1,c64.colors.white);

    planier.yPos = Math.floor(Math.sin(planier.sinY)*50+100);
    planier.sinY+=0.03;


    mycanvas160.quad(25,planier.yPos+30,110,10,c64.colors.red);

    // draw scroller

    // draw the scrolltext to the scroller canvas
    for (i = 0; i<plaScrollCharCounter;i++){
      plaScrollAllText[i].draw();
    }
    // draw the checker to the checker canvas


    mycanvas160.contex.globalCompositeOperation='darker';
    mycanvas160.quad(25,planier.yPos+30,110,10,c64.colors.light_grey);
    mycanvas160.contex.globalCompositeOperation='source-over';

    planier.checker.draw(planier.canvas,Math.floor(Math.cos(planier.sinY)*3)+0.2);

    planier.canvas.draw(mycanvas160,20,planier.yPos);

    mycanvas160.quad(25,0,110,44,c64.colors.light_red);
    planier.logoborder.draw(border,136,18);
    planier.logo.draw(mycanvas160,53,-12);

  }

    colorReduce(mycanvas160);
}
