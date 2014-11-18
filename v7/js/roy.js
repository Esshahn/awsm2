function roy_init(){

  roy = new image("gfx/roy3.gif");
  roy_bg = new image("gfx/roy_bg.gif");
  roy_text = new image("gfx/roy_text.gif");
  roy_text_gradient = new image("gfx/roy_text_gradient.gif");
  roy_bg_canvas = new canvas (320,100);
  roy_text_canvas = new canvas(320,200);
  bg_rain =new starfield3D(roy_bg_canvas, 300, 0.1, 320,100, 120, 225,'#888888', 50,0,0);
  front_rain =new starfield3D(mycanvas, 100, 0.1, 320,200, 130, 225,'#444444', 50,0,0);

  roy_text_y = 200;

  if (demoIsLive) playSong('sid/Bladerunner.sid',0);
}





function roy_render(){
  stage.fill(c64.colors["black"]);
  mycanvas.fill(c64.colors["black"]);

  roy_bg.draw(roy_bg_canvas,0,0);
  bg_rain.draw();
  roy_bg_canvas.draw(mycanvas,0,51);
  roy.draw(mycanvas,0,34);
  front_rain.draw();


  if (roy_text_y>-600){
    roy_text_canvas.clear();
    roy_text_y -= 0.15;
    roy_text.draw(roy_text_canvas,0,roy_text_y);
    roy_text_canvas.contex.globalCompositeOperation='darker';
  //  roy_text_gradient.draw(roy_text_canvas,0,0);
    roy_text_canvas.contex.globalCompositeOperation='source-over';

    roy_text_canvas.draw(mycanvas,0,0);
  }
}
