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

  // load the assets
  awsm_logo_outline = new image("gfx/awsm_logo_outline.gif");
  awsm_logo_wee = new image("gfx/wee.gif");
  flicker = new image("gfx/flicker.png");
  myfont = new image("gfx/c64font_9x9_hotline.gif");
  myfont.initTile(8,9,33);

  colors64 = {
    black:"#000000",  white:"#ffffff",  red:"#68372b",  cyan:"#70A4B2",
    purple:"#6F3D86", green:"#588D43",  blue:"#352879", yellow:"#B8C76F", 
    orange:"#6F4F25", brown:"#433900",  light_red:"#9A6759",  dark_grey:"#444444", 
    grey:"#6C6C6C",   light_green:"#9AD284",light_blue:"#6C5EB5",light_grey:"#959595"
  };

  // init variables
  
  myscrolltext = new scrolltext_horizontal();

  myscrolltext.scrtxt="                                          ^S6WHOAAH!!!                ^P1NOTICE:   THIS IS A MULTIPART DEMO ^P2               SO STAY WITH ME!         ^P2                           ^S2IT'S 1989 AND THIS IS AWSM TYPING... AFTER SEVERAL CRACKTRO REMAKES IT WAS TIME FOR SOMETHING ORIGINAL.... DID YOU NOTICE THE C64 LOAD SEQUENCE KICKING OFF THIS LITTLE PROD? I MADE IT NICE AND SIMPLE, JUST ONE JS FILE AND TWO LINES OF CODE TO INTEGRATE IT INTO YOUR DEMO - FEEL FREE TO USE IT!                            ^S6GETTING BORED ALREADY?   ^P1              THEN LET'S MOVE ON!      ^P1";


  myscrolltext.init(mycanvas,myfont,10);
  currentAnim = 1;

  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  // c64 load routine
  c64 = new C64Load();
  var c64_games = Array("AWSM IS BACK!", "WORLD GAMES/EPYX", "GIANA SISTERS +5", "SEX GAMES +", "TURRICAN +7", "*", "BUBBLE BOBBLE +","GRAND THEFT AUTO VI","CALL OF DUTY 4","WINDOWS 3.11","MANIAC MANSION","PARALLAX+++","SKATEORDIE!","DEFENDER OF THE CROWN","MIKIE +3 /TRIAD","AMIGA EMULATOR","ATARI ST EMULATOR","M.U.L.E.","GHOSTS'N'GOBLINS -5");
  var c64_game = c64_games[Math.floor(Math.random()*c64_games.length)];
  c64.init(c64_game,border,60,60,1,prerender);
  //prerender();
}

function prerender(){

  playSong('Turbo.sid',0);  
  requestAnimFrame(render);
}

function clearScreen(){

  if(typeof(counter) == "undefined") counter = 0;
  counter+=2;

  if(counter <= 100){
    mycanvas.fill(colors64["blue"]);  
    border.fill(colors64["light_blue"]); 
    mycanvas.quad(0,100-counter,320,counter*2,this.colors64["light_blue"]);
  }

  if(counter > 100 && counter <= 110){
    mycanvas.fill(colors64["cyan"]);  
    border.fill(colors64["cyan"]);     
  }

  if(counter > 110 && counter <= 120){
    mycanvas.fill(colors64["yellow"]);  
    border.fill(colors64["yellow"]);     
   
  }
  if(counter > 120 && counter <= 130){
    mycanvas.fill(colors64["white"]);  
    border.fill(colors64["white"]);    
  }

  if(counter > 130 && counter <= 140){ 
    mycanvas.fill(colors64["yellow"]); 
    border.fill(colors64["yellow"]);   
  }

  if(counter > 140 && counter <= 150){ 
    mycanvas.fill(colors64["cyan"]); 
    border.fill(colors64["cyan"]); 
  }

  if(counter > 150 && counter <= 160){
    mycanvas.fill(colors64["light_blue"]); 
    border.fill(colors64["light_blue"]); 
  }

  if(counter > 160 && counter <= 170){
    mycanvas.fill(colors64["blue"]);  
    border.fill(colors64["blue"]);  
  }

  if(counter > 170 && counter <= 290){
    if(typeof(counter2) == "undefined") counter2 = 0;
    mycanvas.fill(colors64["blue"]);  
    mycanvas.quad(85,71,150,counter2,this.colors64["white"]);
    counter2++;
  }

  if(counter > 290 && counter <= 440){
    if(typeof(counter3) == "undefined") counter3 = 0;
    mycanvas.fill(colors64["blue"]);  
    mycanvas.quad(85+counter3,71,150-counter3*2,60,this.colors64["white"]);
    awsm_logo_outline.draw(mycanvas,77,68); 
    counter3++;
  }

  if(counter > 440 && counter <= 520){
    mycanvas.fill(colors64["blue"]);  
    awsm_logo_outline.draw(mycanvas,77,68); 
    currentAnim++;
  }
}

function blueScreenScroller(){
  mycanvas.fill(colors64["blue"]);  
  myscrolltext.draw(118);
  awsm_logo_wee.draw(mycanvas,107,116);

  mycanvas.contex.globalCompositeOperation='darker';
    mycanvas.quad(85,117,36,12,this.colors64["light_grey"]);
    mycanvas.quad(34,117,51,12,this.colors64["cyan"]);
    mycanvas.quad(0,117,34,12,this.colors64["light_blue"]);
  mycanvas.contex.globalCompositeOperation='source-over';
  awsm_logo_outline.draw(mycanvas,77,68); 
}

function flickerScreen(){
  if (typeof(toggle) == "undefined") toggle = 0;
  toggle ++;
  if (toggle < 4) var ypos = 0;
  if (toggle >= 4) var ypos = 1;
  if (toggle >= 8) toggle = 0;

  flicker.draw(border,0,ypos);
}

function render(){
    border.fill(colors64["blue"]);
    switch (currentAnim){
      case 1: clearScreen();
              break;
      case 2: blueScreenScroller();
            
              break;
    }

    // draw the 320*200 canvas on the scaled stage including the borders
    mycanvas.draw(border,60,60,1,0,2,2);

    flickerScreen();
    requestAnimFrame(render);
}
