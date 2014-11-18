function part1(){

  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  // c64 load routine
  var c64_games = Array("AWSM IS BACK!", "WORLD GAMES/EPYX", "GIANA SISTERS +5", "TURRICAN +7", "*", "BUBBLE BOBBLE +","GRAND THEFT AUTO VI","CALL OF DUTY 4","WINDOWS 3.11","MANIAC MANSION","PARALLAX+++","SKATEORDIE!","DEFENDER OF THE CROWN","MIKIE +3 /TRIAD","AMIGA EMULATOR","ATARI ST EMULATOR","M.U.L.E.","GHOSTS'N'GOBLINS -5");
  var c64_game = c64_games[Math.floor(Math.random()*c64_games.length)];
  c64.init(c64_game,border,60,60,2,part2);
}
