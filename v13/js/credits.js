function credits_init()
{
  stage.clear();
  mycanvas160.clear();
  mycanvas.clear();


  credits_underwater_canvas = new canvas(320,185);
  credits_gradient = new image("gfx/credits_gradient.gif");
  credits_bubble1 = new image("gfx/credits_bubble1.gif");
  credits_bubble2 = new image("gfx/credits_bubble2.gif");
  credits_bubble3 = new image("gfx/credits_bubble3.gif");
  credits_bubble4 = new image("gfx/credits_bubble4.gif");
  credits_font = new image("gfx/font_wiki.gif");
  credits_font.initTile(8,16,32);


  credits_scroller_canvas = new canvas (300,200);

  playSong('sid/Arctic_Circles.sid',0);

  credits_underwater_y=-170;

  sinusScrolltext =  "           THE END";

  sinusScrolltext += "$$$$ 'My god, it's full of sinus!'";
  sinusScrolltext += "$      A C64 demo by AWSM";
  sinusScrolltext += "$       created in 2014";

  sinusScrolltext += "$$     I hope you liked it.";

  sinusScrolltext += "$$$$$Making this demo was";
  sinusScrolltext += "$an amazing experience.";
  sinusScrolltext += "$I revisited many great";
  sinusScrolltext += "$C64 productions again, some";
  sinusScrolltext += "$of them nothing less than";
  sinusScrolltext += "$legendary.";

  sinusScrolltext += "$$$Before going into the credits";
  sinusScrolltext += "$and some more info about this";
  sinusScrolltext += "$demo, I want to thank all those";
  sinusScrolltext += "$coders, artists and musicians";
  sinusScrolltext += "$that brought me so many great";
  sinusScrolltext += "$memories and still amaze me";
  sinusScrolltext += "$with their creativity today.";
  sinusScrolltext += "$$         THANK YOU.";

  sinusScrolltext += "$$$       THE GREETINGS:";
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

  sinusScrolltext += "$$$$C64 LOADER";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$$I ended up building a small";
  sinusScrolltext += "$lib for C64 effects, including";
  sinusScrolltext += "$the right colors, hires- and";
  sinusScrolltext += "$multicolor screen modes,";
  sinusScrolltext += "$rasterbars and other stuff.";
  sinusScrolltext += "$The program loaded in the";
  sinusScrolltext += "$beginning changes randomly";
  sinusScrolltext += "$at start. Give it another try!";

  sinusScrolltext += "$$$THE EAGLESOFT RIPOFF";
  sinusScrolltext += "$Original: EAGLESOFT INC.";
  sinusScrolltext += "$Music:";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$$Just a quick graphic to kick";
  sinusScrolltext += "$things off. My initial idea";
  sinusScrolltext += "$for the demo was to have many";
  sinusScrolltext += "$screens that fake iconic";
  sinusScrolltext += "$cracktros, but in a ironic";
  sinusScrolltext += "$and probably lame way.";
  sinusScrolltext += "$The demo was supposed to be";
  sinusScrolltext += "$named 'The edge of disgust'.";
  sinusScrolltext += "$Well, I lost track of that";
  sinusScrolltext += "$goal and ended up somewhere";
  sinusScrolltext += "$else instead.";

  sinusScrolltext += "$$$THE URIDIUM SCREEN";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$Music: M. Wilson & D. Haynes";
  sinusScrolltext += "$$A classic starfield cracktro";
  sinusScrolltext += "$with a cool tune from";
  sinusScrolltext += "$Cool Croc Twins.";

  sinusScrolltext += "$$$THE AWSM9001 PLASMA";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$Music: Sascha Zeidler (Linus)";
  sinusScrolltext += "$$Original javascript plasma";
  sinusScrolltext += "$code by Kevin Roast.";
  sinusScrolltext += "$Special thanks to";
  sinusScrolltext += "$Sascha Zeidler (Linus)";
  sinusScrolltext += "$for allowing me to use his";
  sinusScrolltext += "$excellent tune 'Locomotive Chef'.";

  sinusScrolltext += "$$$AWSM9000 POSITIVE KARMA";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$Music: Sascha Zeidler (Linus)";
  sinusScrolltext += "$$Again a screen featuring";
  sinusScrolltext += "$music by Linus.";
  sinusScrolltext += "$I liked that song so much that";
  sinusScrolltext += "$I named the screen after it:";
  sinusScrolltext += "$'Positive Karma'.";

  sinusScrolltext += "$$$BLADERUNNER";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$Music: Johan Astrand (Zyron)";

  sinusScrolltext += "$$A magical scene from Bladerunner.";
  sinusScrolltext += "$I had to do a C64 hommage.";
  sinusScrolltext += "$The paper unicorn at the end";
  sinusScrolltext += "$is a very special symbol used";
  sinusScrolltext += "$in the movie.";
  sinusScrolltext += "$If you haven't seen it yet,";
  sinusScrolltext += "$please do it now.";

  sinusScrolltext += "$$$THE CREDITS";
  sinusScrolltext += "$Code & graphics: AWSM";
  sinusScrolltext += "$Music: Stellan Andersson (Dane)";

  sinusScrolltext += "$$Special thanks to Stellan";
  sinusScrolltext += "$for giving me permission to use";
  sinusScrolltext += "$his wonderful 'Artic Circles'.";
  sinusScrolltext += "$I'm a big fan of his work and the";
  sinusScrolltext += "$soundtrack for 'Edge of Disgrace'";
  sinusScrolltext += "$is among the best ever done.";


  credits_init_flyscroll(sinusScrolltext);

  credits_init_waves();

  amount_of_bubbles = 8;
  initBubbles(amount_of_bubbles);
}

function initBubbles(amount){

  allBubbles = [];

  for (i = 0; i< amount; i++){
    allBubbles[i] = new Bubble();
  }
}

function Bubble(){

  this.bubbleImages = [credits_bubble1,credits_bubble2,credits_bubble3,credits_bubble4];
  this.image = this.bubbleImages[Math.floor(Math.random()*this.bubbleImages.length)];
  this.y = Math.random()*100+200;
  this.x = Math.random()*320;
  this.sin = Math.random()*5;
  this.amp = Math.random()*5;
  this.speed = Math.random()+0.2;

  this.draw = function (canvas){

    this.canvas = canvas;
    this.image.draw(this.canvas,this.x + Math.floor(Math.sin(this.sin)*this.amp),this.y);
    this.y -= this.speed;
    this.sin += 0.05;
    this.speed += 0.005;

    if (this.y < -50){
      this.y = Math.random()*100+200;
      this.x = Math.random()*320;
      this.speed = Math.random()+0.2;
      this.image = this.bubbleImages[Math.floor(Math.random()*this.bubbleImages.length)];
    }

  }

}

function credits_init_flyscroll(text)
{

  flyScrollText = text;
  flyScrollAllText = [];
  flyScrollFontWidth = 8;
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

    flyScrollAllText[i] = new FlyScroll (flyScrollText[i],flyScrollX+flyScrollFontWidth*i,200+flyScrollY,0.3,flyScrollStartSin,0.06);
    flyScrollStartSin -= 0.15;

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
    }

    if (this.yPos > -50 && this.yPos < 200){
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
    //mycanvas.fill(c64.colors.black);
    stage.fill(c64.colors.black);
    border.quad(0,58,400,144,c64.colors.blue);
    border.quad(0,60,400,140,c64.colors.light_blue);

    credits_scroller_canvas.clear();


    for (i = 0; i<allWaves.length;i++){
      allWaves[i].draw();
    }


  //  credits_underwater_canvas.draw(mycanvas,0,credits_underwater_y);


      for (i = 0; i< allBubbles.length; i++){
        allBubbles[i].draw(credits_scroller_canvas);
      }


    for (i = 0; i<sinusScrolltext.length;i++){
      flyScrollAllText[i].draw(credits_scroller_canvas);
    }


    credits_scroller_canvas.contex.globalCompositeOperation='source-atop';
    credits_gradient.draw(credits_scroller_canvas,0,0);
    credits_scroller_canvas.contex.globalCompositeOperation='source-over';

    // reflection on top
    credits_scroller_canvas.drawPart(mycanvas,40,16,0,0,320,10,1,0,1,-1);
    credits_scroller_canvas.draw(mycanvas,40,15);




}
