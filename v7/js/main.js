function init(){

  // ----------------- set this to true or false
  demoIsLive = true;


  // the stage canvas includes the c64 stages
  // canvas is 320*200 scaled up to 640*400, so the borders are 60 pixels each
  stage = new canvas(760,520,"main");
  stage.contex.imageSmoothingEnabled = false;
  stage.contex.mozImageSmoothingEnabled = false;
  stage.contex.oImageSmoothingEnabled = false;
  stage.contex.webkitImageSmoothingEnabled = false;
  stage.fill("#000000");
  mycanvas = new canvas(320,200);    // the inner screen of the C64
  border = new canvas(380,260);      // the border of the C64

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

  var c64_games = Array("AWSM IS BACK!", "WORLD GAMES/EPYX", "GIANA SISTERS +5", "TURRICAN +7", "*", "BUBBLE BOBBLE +","GRAND THEFT AUTO VI","CALL OF DUTY 4","WINDOWS 3.11","MANIAC MANSION","PARALLAX+++","SKATEORDIE!","DEFENDER OF THE CROWN","MIKIE +3 /TRIAD","AMIGA EMULATOR","ATARI ST EMULATOR","M.U.L.E.","GHOSTS'N'GOBLINS -5");
  c64_game = c64_games[Math.floor(Math.random()*c64_games.length)];

  c64 = new C64Load();    // needs to be set always (e.g. for colors)

  // -----------------

  if (demoIsLive){
    c64.init(c64_game,stage,60,60,2,0,render);
    playPart = 1;
  }else{
    c64.init(c64_game,stage,60,60,2,1,render);
    playPart = 11;
  }

}

function checkKeyPressed(e){
  var keyCode = e.keyCode;

  if (keyCode == 32){
    playPart ++;
  }

  if (keyCode == 80){

    if (playPart == 0){
       playPart = tempPlayPart;
    }else{
      tempPlayPart = playPart;
      playPart = 0;
    }
  }
}


function render(){

  /*
  Main demo loop. Usually there are different parts with functions named after the JS file.
  init funcs are run only once, so playPart++ can be called right after calling the init.
  loop funcs are running in loops, so the playPart++ runs from within the demo part when needed.
  */

  //console.log("Playing part: " + playPart);

  switch (playPart){

    case 1:
            clearScreen();
            break;
    case 2:
            eaglesoft_init();
            playPart ++;
            break;
    case 3:
            eaglesoft_render();
            break;
    case 4:
            whiteToBlack();
            break;
    case 5:
            uridium_init();
            playPart ++;
            break;
    case 6:
            uridium_render();
            break;
    case 7:
            //rastertest_init();
            playPart++;
            break;
    case 8:
            //rastertest_render();
            whiteToBlack();
            break;
    case 9:
            plasma_init();
            playPart++;
            break;
    case 10:
            plasma_render();
            break;
    case 11:
            roy_init();
            playPart++;
            break;
    case 12:
            roy_render();
            break;
    case 13:
            rick_init();
            playPart++;
            break;
    case 14:
            rick_render();
            break;
  }

  // draw the 320*200 canvas on the scaled stage including the stages
  mycanvas.draw(stage,60,60,1,0,2,2);
  border.draw(stage,0,0,1,0,2,2);

  if (demoIsLive) c64.showScanlines();
  requestAnimFrame(render);
}
