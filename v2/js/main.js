function init(){

  // the stage canvas includes the c64 borders
  // canvas is 320*200 scaled up to 640*400, so the borders are 60 pixels each
  border = new canvas(760,520,"main");
  border.contex.imageSmoothingEnabled = false;
  border.contex.mozImageSmoothingEnabled = false;
  border.contex.oImageSmoothingEnabled = false;
  border.contex.webkitImageSmoothingEnabled = false;
  border.fill("#000000"); 

  mycanvas = new canvas(320,200);

  awsm_logo_blueScreen_canvas = new canvas(320,200);
  awsm_logo_blueScreen_canvas_inner = new canvas(320,200);

  // load the assets
  awsm_logo_outline = new image("gfx/awsm_logo_outline.gif");
  awsm_logo_inner = new image("gfx/awsm_logo_inner.gif");
  awsm_logo_wee = new image("gfx/wee.gif");
  awsm_logo_gradient = new image("gfx/gradient.gif");
  scroller_gradient = new image("gfx/scroller_gradient.gif");
  flowers = new image("gfx/ninja.gif");
  myfont = new image("gfx/c64font_9x9_hotline.gif");
  myfont.initTile(8,9,33);

  // init variables
  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="                                          ^S6WHOAAH!!!                ^P1NOTICE:   THIS IS A MULTIPART DEMO ^P2               SO STAY WITH ME!         ^P2                           ^S2IT'S 1989 AND THIS IS AWSM TYPING... AFTER SEVERAL CRACKTRO REMAKES IT WAS TIME FOR SOMETHING ORIGINAL.... DID YOU NOTICE THE C64 LOAD SEQUENCE KICKING OFF THIS LITTLE PROD? I MADE IT NICE AND SIMPLE, JUST ONE JS FILE AND TWO LINES OF CODE TO INTEGRATE IT INTO YOUR DEMO - FEEL FREE TO USE IT!                            ^S6GETTING BORED ALREADY?   ^P1              THEN LET'S MOVE ON!      ^P1";
  myscrolltext.init(mycanvas,myfont,10);


  // c64 load routine
  c64 = new C64Load();
  var c64_games = Array("AWSM IS BACK!", "WORLD GAMES/EPYX", "GIANA SISTERS +5", "TURRICAN +7", "*", "BUBBLE BOBBLE +","GRAND THEFT AUTO VI","CALL OF DUTY 4","WINDOWS 3.11","MANIAC MANSION","PARALLAX+++","SKATEORDIE!","DEFENDER OF THE CROWN","MIKIE +3 /TRIAD","AMIGA EMULATOR","ATARI ST EMULATOR","M.U.L.E.","GHOSTS'N'GOBLINS -5");
  var c64_game = c64_games[Math.floor(Math.random()*c64_games.length)];
  
  environment = "live";

  if (environment == "dev"){
    currentAnim = 2;
    prerender();
  }else{
    currentAnim = 1;
    c64.init(c64_game,border,60,60,2,prerender);
  }

}

function prerender(){

  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  if (environment != "dev") playSong('Turbo.sid',0);  
  requestAnimFrame(render);
}

function clearScreen(){

  if(typeof(counter) == "undefined") counter = 0;
  counter+=2;

  if(counter <= 100){
    mycanvas.fill(c64.colors["blue"]);  
    border.fill(c64.colors["light_blue"]); 
    mycanvas.quad(0,100-counter,320,counter*2,this.c64.colors["light_blue"]);
  }

  if(counter > 100 && counter <= 110){
    mycanvas.fill(c64.colors["cyan"]);  
    border.fill(c64.colors["cyan"]);     
  }

  if(counter > 110 && counter <= 120){
    mycanvas.fill(c64.colors["yellow"]);  
    border.fill(c64.colors["yellow"]);     
   
  }
  if(counter > 120 && counter <= 130){
    mycanvas.fill(c64.colors["white"]);  
    border.fill(c64.colors["white"]);    
  }

  if(counter > 130 && counter <= 140){ 
    mycanvas.fill(c64.colors["yellow"]); 
    border.fill(c64.colors["yellow"]);   
  }

  if(counter > 140 && counter <= 150){ 
    mycanvas.fill(c64.colors["cyan"]); 
    border.fill(c64.colors["cyan"]); 
  }

  if(counter > 150 && counter <= 160){
    mycanvas.fill(c64.colors["light_blue"]); 
    border.fill(c64.colors["light_blue"]); 
  }

  if(counter > 160 && counter <= 170){
    mycanvas.fill(c64.colors["blue"]);  
    border.fill(c64.colors["blue"]);  
  }

  if(counter > 170 && counter <= 290){
    if(typeof(counter2) == "undefined") counter2 = 0;
    mycanvas.fill(c64.colors["blue"]);  
    mycanvas.quad(85,71,150,counter2,this.c64.colors["white"]);
    counter2++;
  }

  if(counter > 290 && counter <= 440){
    if(typeof(counter3) == "undefined") counter3 = 0;
    mycanvas.fill(c64.colors["blue"]);  
    mycanvas.quad(85+counter3,71,150-counter3*2,60,this.c64.colors["white"]);
    awsm_logo_outline.draw(mycanvas,77,68); 
    counter3++;
  }

  if(counter > 440 && counter <= 520){
    mycanvas.fill(c64.colors["blue"]);  
    awsm_logo_outline.draw(mycanvas,77,68); 
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

function render(){
  if(typeof(globalTimer) == "undefined") globalTimer = 0;
    border.fill(c64.colors["blue"]);
    switch (currentAnim){
      case 1: clearScreen();
              break;
      case 2: mycanvas.fill(c64.colors["blue"]);              
              myscrolltext.draw(118);
              blueScreenRaster();
              sinusMove();
              break;
    }

    // draw the 320*200 canvas on the scaled stage including the borders
    mycanvas.draw(border,60,60,1,0,2,2);

    if (environment != "dev") c64.showScanlines();
    requestAnimFrame(render);
}
