function credits_init()
{
  stage.clear();
  mycanvas160.clear();
  mycanvas.clear();

  credits_underwater_320 = new image("gfx/credits_underwater_320.gif");
  credits_underwater_canvas = new canvas(320,185);
  credits_gradient = new image("gfx/credits_gradient.gif");
  credits_font = new image("gfx/font_wiki.gif");
  credits_font.initTile(8,16,32);


  credits_scroller_canvas = new canvas (300,200);

  playSong('sid/Arctic_Circles.sid',0);

  credits_underwater_y=-170;

  sinusScrolltext =  "THE END";

  sinusScrolltext += "$$$THE EDGE OF DISGUST";
  sinusScrolltext += "$A C64 DEMO BY AWSM";
  sinusScrolltext += "$CREATED IN 2014";

  sinusScrolltext += "$$HOPE YOU LIKED IT.";

  sinusScrolltext += "$$MAKING THIS DEMO WAS";
  sinusScrolltext += "$AN AMAZING EXPERIENCE.";
  sinusScrolltext += "$I REVISITED MANY EXCELLENT";
  sinusScrolltext += "$C64 PRODUCTIONS AGAIN, SOME";
  sinusScrolltext += "$OF THEM NOTHING LESS THAN";
  sinusScrolltext += "$LEGENDARY.";

  sinusScrolltext += "$$SO BEFORE GOING INTO THE";
  sinusScrolltext += "$CREDITS AND SOME MORE INFO";
  sinusScrolltext += "$ABOUT THIS DEMO, I WANT";
  sinusScrolltext += "$TO THANK ALL THOSE CODERS,";
  sinusScrolltext += "$ARTISTS AND MUSICIANS";
  sinusScrolltext += "$THAT BROUGHT ME SO MANY";
  sinusScrolltext += "$GREAT MEMORIES AND STILL";
  sinusScrolltext += "$AMAZE ME WITH THEIR";
  sinusScrolltext += "$CREATIVITY TODAY.";

  sinusScrolltext += "$$$     THE GREETINGS:";
  sinusScrolltext += "$$ AIRO";
  sinusScrolltext += "$$         AYOROS";
  sinusScrolltext += "$$    DANE";
  sinusScrolltext += "$$                GANDALF";
  sinusScrolltext += "$$   JARI VUOKSENRANTA";
  sinusScrolltext += "$$  LINUS";
  sinusScrolltext += "$$          MELLOW MAN";
  sinusScrolltext += "$$NEW CORE";
  sinusScrolltext += "$$                NONAMENO";
  sinusScrolltext += "$$            SOLO";
  sinusScrolltext += "$$    SUBZERO";
  sinusScrolltext += "$$             TINY'R'SID";
  sinusScrolltext += "$$ TOTORMAN";
  sinusScrolltext += "$$     AND ALL CODEF DEVS";


  credits_init_flyscroll(sinusScrolltext);

  credits_init_waves();
}


function credits_init_flyscroll(text)
{

  flyScrollText = text;
  flyScrollAllText = [];
  flyScrollFontWidth = 7;
  flyScrollX = 0;
  flyScrollY = 0;
  flyScrollStartSin = 0;

  for (i = 0; i<flyScrollText.length;i++){
    if (flyScrollText[i]=="$"){
      flyScrollX=0;
      flyScrollY+=18;
      flyScrollX = -(i+1) * flyScrollFontWidth;
      flyScrollStartSin = 0;
    }

    flyScrollAllText[i] = new FlyScroll (flyScrollText[i],flyScrollX+flyScrollFontWidth*i,200+flyScrollY,0.2,flyScrollStartSin,0.05);
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

function credits_init_waves(){

  var credits_waves_sin = 0;
  allWaves = [];

  for (i=0; i<200; i++){
    credits_waves_sin+=0.6;
    allWaves[i] = new credits_Waves(i,credits_waves_sin);
  }
}


function credits_Waves(yPos,sin){
  this.yPos = yPos;
  this.sin = sin;

  this.draw =function (canvas)
  {
    credits_underwater_canvas.drawPart(credits_underwater_canvas,0,this.yPos,Math.floor(Math.sin(this.sin)*5),this.yPos,320,1);
    this.sin += 0.02;
  }
}


function credits_render()
{

    mycanvas.clear();
    stage.fill(c64.colors.black);
    credits_scroller_canvas.clear();

    credits_underwater_320.draw(credits_underwater_canvas,0,0);

    for (i = 0; i<64;i++){
      allWaves[i].draw();
    }

    if (credits_underwater_y<0) credits_underwater_y += 0.18;

    credits_underwater_canvas.draw(mycanvas,0,credits_underwater_y);

    for (i = 0; i<sinusScrolltext.length;i++){
      flyScrollAllText[i].draw(credits_scroller_canvas);
    }

    credits_scroller_canvas.contex.globalCompositeOperation='source-atop';
    credits_gradient.draw(credits_scroller_canvas,0,0);
    credits_scroller_canvas.contex.globalCompositeOperation='source-over';

    // reflection on top
    credits_scroller_canvas.drawPart(mycanvas,10,16,0,0,320,10,1,0,1,-1);
    credits_scroller_canvas.draw(mycanvas,10,15);


}
