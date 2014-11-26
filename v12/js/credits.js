function credits_init()
{
  stage.clear();
  mycanvas160.clear();
  mycanvas.clear();

  credits_underwater_320 = new image("gfx/credits_underwater_320.gif");
  credits_gradient = new image("gfx/credits_gradient.gif");
  credits_font = new image("gfx/slimfont_awsm.gif");
  credits_font2 = new image("gfx/font_hotline.gif");
  credits_font2.initTile(8,8,33);
  credits_font.initTile(10,21,32);

  credits_scroller_canvas = new canvas (300,200);

  playSong('sid/Arctic_Circles.sid',0);

  credits_underwater_y=-180;

  sinusScrolltext =  "THE END";
  sinusScrolltext += "$$$THE EDGE OF DISGUST";
  sinusScrolltext += "$A C64 DEMO BY AWSM";
  sinusScrolltext += "$CREATED WITH CODEF IN 2014";
  sinusScrolltext += "$$HOPE YOU LIKED IT!";
  sinusScrolltext += "$$MAKING THIS DEMO WAS";
  sinusScrolltext += "$AN AMAZING EXPERIENCE.";
  sinusScrolltext += "$I REVISITED SO MANY EXCELLENT";
  sinusScrolltext += "$C64 PRODUCTIONS AGAIN, SOME";
  sinusScrolltext += "$OF THEM NOTHING LESS THAN";
  sinusScrolltext += "$LEGENDARY.";
  sinusScrolltext += "$$SO BEFORE GOING INTO THE";
  sinusScrolltext += "$CREDITS AND SOME MORE INFO";
  sinusScrolltext += "$ABOUT THIS DEMO, I WANT";
  sinusScrolltext += "$TO SAY THANK YOU TO ALL";
  sinusScrolltext += "$THOSE CODERS, ARTISTS AND";
  sinusScrolltext += "$MUSICIANS THAT BROUGHT ME";
  sinusScrolltext += "$SO MANY GOOD MEMORIES AND";
  sinusScrolltext += "$STILL AMAZE ME WITH THEIR";
  sinusScrolltext += "$CREATIVITY TODAY.";
  initFlyScroll(sinusScrolltext);
}


function initFlyScroll(text){

  flyScrollText = text;
  flyScrollAllText = [];
  flyScrollFontWidth = 11;
  flyScrollX = 0;
  flyScrollY = 0;
  flyScrollStartSin = 0;

  for (i = 0; i<flyScrollText.length;i++){
    if (flyScrollText[i]=="$"){
      flyScrollX=0;
      flyScrollY+=21;
      flyScrollX = -(i+1) * flyScrollFontWidth;
      flyScrollStartSin = 0;
    }

    flyScrollAllText[i] = new FlyScroll (flyScrollText[i],flyScrollX+flyScrollFontWidth*i,220+flyScrollY,0.2,flyScrollStartSin,0.05);
    flyScrollStartSin -= 0.25;

  }

}


function FlyScroll(text, xPos, yPos, speed, initSin, ampSin)
{

  // moves text

  this.text = text;
  this.initSin = initSin;
  this.xPos = xPos;
  this.yPos = yPos;
  this.speed = speed;
  this.ampSin = ampSin;

  this.draw = function(canvas)
  {
    if (this.yPos > -50){

      this.canvas = canvas;

      this.yPos -= this.speed;
      this.sinus = Math.floor(Math.sin(this.initSin)*10);
      this.initSin += this.ampSin;

      credits_font.print(this.canvas,this.text,this.xPos,this.yPos+this.sinus);

    }
  }

}


function credits_render()
{

    mycanvas.clear();
    stage.fill(c64.colors.black);
    credits_scroller_canvas.clear();


    if (credits_underwater_y<0) credits_underwater_y += 0.1;
    credits_underwater_320.draw(mycanvas,0,credits_underwater_y);

    for (i = 0; i<sinusScrolltext.length;i++){
      flyScrollAllText[i].draw(credits_scroller_canvas);
    }


    credits_scroller_canvas.contex.globalCompositeOperation='source-atop';
    credits_gradient.draw(credits_scroller_canvas,0,0);
    credits_scroller_canvas.quad(0,0,320,50,c64.colors.white);
    credits_scroller_canvas.contex.globalCompositeOperation='source-over';

    credits_scroller_canvas.draw(mycanvas,10,0);


}
