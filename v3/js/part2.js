function part2(){

  awsm_logo_blueScreen_canvas = new canvas(320,200);
  awsm_logo_blueScreen_canvas_inner = new canvas(320,200);

  // load the assets
  awsm_logo_outline = new image("gfx/awsm_logo_outline.gif");
  awsm_logo_inner = new image("gfx/awsm_logo_inner.gif");
  awsm_logo_gradient = new image("gfx/grad_logo_outline.gif");
  scroller_gradient = new image("gfx/grad_scroller.gif");
  flowers = new image("gfx/grad_logo_diagonal.gif");
  myfont = new image("gfx/font_hotline.gif");
  myfont.initTile(8,9,33);

  // init variables
  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="                                          ^S6WHOAAH!!!                ^P1NOTICE:   THIS IS A MULTIPART DEMO ^P2               SO STAY WITH ME!         ^P2                           ^S2IT'S 1989 AND THIS IS AWSM TYPING... AFTER SEVERAL CRACKTRO REMAKES IT WAS TIME FOR SOMETHING ORIGINAL.... DID YOU NOTICE THE C64 LOAD SEQUENCE KICKING OFF THIS LITTLE PROD? I MADE IT NICE AND SIMPLE, JUST ONE JS FILE AND TWO LINES OF CODE TO INTEGRATE IT INTO YOUR DEMO - FEEL FREE TO USE IT!                            ^S6GETTING BORED ALREADY?   ^P1              THEN LET'S MOVE ON!      ^P1";
  myscrolltext.init(mycanvas,myfont,10);

  if (demoIsLive) playSong('sid/Turbo.sid',0);

  requestAnimFrame(render_part2);
}


function clearScreen(){

  if(typeof(counter) == "undefined") counter = 0;
  counter+=2;

  if(counter <= 90){
    mycanvas.fill(c64.colors["blue"]);
    border.fill(c64.colors["light_blue"]);
    mycanvas.quad(0,100-counter,320,counter*2,this.c64.colors["light_blue"]);
  }

  if(counter > 90 && counter <= 100){
    mycanvas.fill(c64.colors["cyan"]);
    border.fill(c64.colors["cyan"]);
  }

  if(counter > 100 && counter <= 110){
    mycanvas.fill(c64.colors["yellow"]);
    border.fill(c64.colors["yellow"]);

  }
  if(counter > 110 && counter <= 120){
    mycanvas.fill(c64.colors["white"]);
    border.fill(c64.colors["white"]);
  }

  if(counter > 120 && counter <= 130){
    mycanvas.fill(c64.colors["yellow"]);
    border.fill(c64.colors["yellow"]);
  }

  if(counter > 130 && counter <= 140){
    mycanvas.fill(c64.colors["cyan"]);
    border.fill(c64.colors["cyan"]);
  }

  if(counter > 140 && counter <= 150){
    mycanvas.fill(c64.colors["light_blue"]);
    border.fill(c64.colors["light_blue"]);
  }

  if(counter > 150 && counter <= 160){
    mycanvas.fill(c64.colors["blue"]);
    border.fill(c64.colors["blue"]);
  }

  if(counter > 160 && counter <= 170){
    mycanvas.fill(c64.colors["black"]);
    border.fill(c64.colors["black"]);
  }

  if(counter > 170 && counter <= 290){
    if(typeof(counter2) == "undefined") counter2 = 0;
    mycanvas.fill(c64.colors["black"]);
    mycanvas.quad(85,71,150,counter2,this.c64.colors["white"]);
    counter2++;
  }

  if(counter > 290 && counter <= 440){
    if(typeof(counter3) == "undefined") counter3 = 0;
    mycanvas.fill(c64.colors["black"]);
    mycanvas.quad(85+counter3,71,150-counter3*2,60,this.c64.colors["white"]);
    awsm_logo_outline.draw(mycanvas,77,68);
    counter3++;
  }

  if(counter > 440 && counter <= 520){
    mycanvas.fill(c64.colors["black"]);
    awsm_logo_outline.draw(mycanvas,77,68);
    currentAnim++;
  }
}



function clearScreen2(){

  if(typeof(counter4) == "undefined"){
    counter4 = 0;
    this.step = 4;
  }
  counter4+=1;

  if(counter4 > this.step && counter4 <= this.step*2){
    mycanvas.fill(c64.colors["dark_grey"]);
    border.fill(c64.colors["dark_grey"]);
  }

  if(counter4 > this.step*2 && counter4 <= this.step*3){
    mycanvas.fill(c64.colors["grey"]);
    border.fill(c64.colors["grey"]);
  }

  if(counter4 > this.step*3 && counter4 <= this.step*4){
    mycanvas.fill(c64.colors["light_grey"]);
    border.fill(c64.colors["light_grey"]);
  }

  if(counter4 > this.step*4 && counter4 <= this.step*5){
    mycanvas.fill(c64.colors["white"]);
    border.fill(c64.colors["white"]);
  }

  if(counter4 > this.step*5 && counter4 <= this.step*6){
    mycanvas.fill(c64.colors["light_blue"]);
    border.fill(c64.colors["light_blue"]);
  }

  if(counter4 > this.step*6 && counter4 <= this.step*7){
    mycanvas.fill(c64.colors["blue"]);
    border.fill(c64.colors["blue"]);
    currentAnim++;
  }

  if(counter4 > this.step*7 && counter4 <= this.step*8){
    mycanvas.fill(c64.colors["black"]);
    border.fill(c64.colors["black"]);
    currentAnim++;
  }

}


function sinusMove(){
  if(typeof(mySinus) == "undefined") mySinus = 0;
  this.sin = Math.ceil(Math.sin(mySinus)*84);
  mySinus += 0.0235;

  awsm_logo_blueScreen_canvas.draw(mycanvas,this.sin,0);
  awsm_logo_blueScreen_canvas_inner.draw(mycanvas,this.sin,0);

  mycanvas.contex.globalCompositeOperation='darker';
    scroller_gradient.draw(mycanvas,this.sin-200,121);
  mycanvas.contex.globalCompositeOperation='source-over';

}


function blueScreenRaster(){
  if(typeof(myRaster) == "undefined") myRaster = 71;

  if (myRaster <= -121) myRaster = 71;

  awsm_logo_outline.draw(awsm_logo_blueScreen_canvas,77,68);
  awsm_logo_blueScreen_canvas.contex.globalCompositeOperation='source-atop';
    awsm_logo_gradient.draw(awsm_logo_blueScreen_canvas,0,myRaster);
  awsm_logo_blueScreen_canvas.contex.globalCompositeOperation='source-over';

  awsm_logo_inner.draw(awsm_logo_blueScreen_canvas_inner,77,68);
  awsm_logo_blueScreen_canvas_inner.contex.globalCompositeOperation='source-atop';
    flowers.draw(awsm_logo_blueScreen_canvas_inner,this.sin,this.sin*0.5);
  awsm_logo_blueScreen_canvas_inner.contex.globalCompositeOperation='source-over';

  myRaster -= 1;
}

function render_part2(){
    border.fill(c64.colors["black"]);

    if (typeof(currentAnim) == "undefined") currentAnim = 1;

    switch (currentAnim){
      case 1: clearScreen();
              break;
      case 2: mycanvas.fill(c64.colors["black"]);
              myscrolltext.draw(118);
              blueScreenRaster();
              sinusMove();

              if (typeof(this.countDownNextPart) == "undefined") this.countDownNextPart = 250;
              this.countDownNextPart--;
              if (this.countDownNextPart <= 0){
                currentAnim++;
              }
              break;
      case 3: mycanvas.fill(c64.colors["blue"]);
              myscrolltext.draw(118);
              blueScreenRaster();
              sinusMove();
              clearScreen2();
              break;
      case 4: mycanvas.fill(c64.colors["black"]);
              keepPlayingPart2 = false;
              part3();
              break;
    }

    // draw the 320*200 canvas on the scaled stage including the borders
    mycanvas.draw(border,60,60,1,0,2,2);

    if (demoIsLive) c64.showScanlines();
    if (typeof(keepPlayingPart2) == "undefined") requestAnimFrame(render_part2);
}
