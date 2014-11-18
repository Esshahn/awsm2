function roy_init(){

  roy = new image("gfx/roy.gif");

  if (demoIsLive) playSong('sid/Bladerunner.sid',0);
}





function roy_render(){
  stage.fill(c64.colors["black"]);
  mycanvas.fill(c64.colors["black"]);

  roy.draw(mycanvas,0,34);


}
