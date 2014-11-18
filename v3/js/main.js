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

  // -----------------

  c64 = new C64Load();    // needs to be set always (e.g. for colors)

  demoIsLive = true;        // trigger to be able to skip parts of the demo in development stage

  if (demoIsLive){
    // start with the C64 load sequence (Part1)
    part1();
  }else{
    part3();
  }

}
