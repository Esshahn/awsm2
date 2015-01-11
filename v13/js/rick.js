function rick_init(){

  rick = new AnimGIF("gfx/rick.gif",278,186,20,8);

  if (demoIsLive) playSong('sid/Never_Gonna_Give_You_Up.sid',0);

}





function rick_render(){
  stage.fill(c64.colors["black"]);
  mycanvas.fill(c64.colors["black"]);

  rick.play(mycanvas,21,7);


}
