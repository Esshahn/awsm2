function init(){

  // the stage canvas includes the c64 stages
  // canvas is 320*200 scaled up to 640*400, so the borders are 60 pixels each
  stage = new canvas(760,580,"main");
  stage.contex.imageSmoothingEnabled = false;
  stage.contex.mozImageSmoothingEnabled = false;
  stage.contex.oImageSmoothingEnabled = false;
  stage.contex.webkitImageSmoothingEnabled = false;
  stage.fill("#000000");
  mycanvas = new canvas(320,200);    // the inner screen of the C64
  mycanvas160 = new canvas (160,200); // the inner screen of the C64 with low resolution
  border = new canvas(380,320);      // the border of the C64

  // -----------------

  window.addEventListener("keydown", checkKeyPressed, false);

  // -----------------

  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  // -----------------

  // c64 load routine

  var c64_games = Array(
    "AWSM IS BACK!", "WORLD GAMES/EPYX", "GIANA SISTERS +5",
    "TURRICAN +7", "*", "BUBBLE BOBBLE +","GRAND THEFT AUTO VI",
    "FULL OF SINUS","WINDOWS 3.11","MANIAC MANSION","PARALLAX+++",
    "SKATEORDIE!","DEFENDER OF THE CROWN","MIKIE +3 /TRIAD",
    "AMIGA EMULATOR","ATARI ST EMULATOR","M.U.L.E.","GHOSTS'N'GOBLINS -5");
  c64_game = c64_games[Math.floor(Math.random()*c64_games.length)];

  c64 = new C64Load();    // needs to be set always (e.g. for colors)

  decrunch = new Decrunch(c64.colors,c64.colors.blue,c64.colors.light_blue,mycanvas,border,"@@@",200);

  // -----------------
  // Adding a variable "dev" as a URL param switches to dev mode
  // and starts with the demo part number set by m
  // eg. m=3 start the demo with part 3

  URL_param = location.search.split('dev=')[1];

  if(typeof(URL_param) != "undefined"){
    playPart = parseInt(URL_param);
    demoIsLive = false;
    c64.init(c64_game,stage,60,60,2,1,render);
  }else{
    playPart = 1;
    demoIsLive = true;
    c64.init(c64_game,stage,60,60,2,0,render);
  }


}

function checkKeyPressed(e){
  var keyCode = e.keyCode;

  if (keyCode == 32){
    // space key
    e.preventDefault(); // block scrolling behaviour of browsers for pressing 'space'

    // the code below simulates some waiting time between the parts
    // to make it look more like a c64. If stuff comes too fast the
    // illusion of sitting in front of the 64 is easily destroyed.
    tempPlayPart = playPart;
    playPart = 0;
    stage.fill(c64.colors.black);
    mycanvas.fill(c64.colors.black);
    mycanvas160.fill(c64.colors.black);
    border.fill(c64.colors.black);
    playSong('sid/empty.sid',0);
    window.setTimeout(callNextPartKeyPress,Math.random()*3000+1000);
  }

  if (keyCode == 70){
    // f key
    e.preventDefault(); // block behaviour of browsers for pressing 'f'
    fullscr('main');
  }

  if (keyCode == 80){
    // p key
    if (playPart === 0){
       playPart = tempPlayPart;
    }else{
      tempPlayPart = playPart;
      playPart = 0;
    }
  }
}

function callNextPartKeyPress(){
  // after the window timeout, the right part to play needs to be restored
  // before we can move on. This only gets called from they keypress event.
  playPart = tempPlayPart;
  callNextPart();
}

function callNextPart(){
  border.clear();
  mycanvas.clear();
  mycanvas160.clear();
  playPart++;
}


function render(){

  /*
  Main demo loop. Usually there are different parts with functions named after the JS file.
  init funcs are run only once, so callNextPart can be called right after calling the init.
  loop funcs are running in loops, so the callNextPart runs from within the demo part when needed.
  */

  //console.log("Playing part: " + playPart);

  switch (playPart){

    case 1:
            //clearScreen();
            callNextPart();
            break;

    case 2:
            eaglesoft_init();
            callNextPart();
            break;

    case 3:
            eaglesoft_render();
            break;

    case 4:
            callNextPart();
            break;

    case 5:
            decrunch.draw();
            break;

    case 6:
            fullofsinus_init();
            callNextPart();
            break;

    case 7:
            fullofsinus_render();
            break;

    case 8:
            whiteToBlack();
            break;
    case 9:
            uridium_init();
            callNextPart();
            break;
    case 10:
            uridium_render();
            break;
    case 11:
            checker_init();
            callNextPart();
            break;
    case 12:
            checker_render();
            break;
    case 13:
            plasma_init();
            callNextPart();
            break;
    case 14:
            plasma_render();
            break;
    case 15:
            karma_init();
            callNextPart();
            break;
    case 16:
            karma_render();
            break;
    case 17:
            tunnel_init();
            callNextPart();
            break;
    case 18:
            tunnel_render();
            break;
    case 19:
            planier_init();
            callNextPart();
            break;
    case 20:
            planier_render();
            break;
    case 21:
            roy_init();
            callNextPart();
            break;
    case 22:
            roy_render();
            break;
    case 23:
            credits_init();
            callNextPart();
            break;
    case 24:
            credits_render();
            break;

  }

  // draw the 320*200 canvas on the scaled stage including the stages

  border.draw(stage,0,0,1,0,2,2);
  mycanvas.draw(stage,60,60,1,0,2,2);
  mycanvas160.draw(stage,60,60,1,0,4,2);

  /*
  stage.contex.globalCompositeOperation='darker';
  mycanvas160.draw(stage,62,62,0.5,0,4,2);
  stage.contex.globalCompositeOperation='source-over';
  */

  // only show the scanlines whenn in live mode and not in fullscreen
  if (demoIsLive &&
    !(document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement)) {
    c64.showScanlines();
  }

  requestAnimFrame(render);
}
