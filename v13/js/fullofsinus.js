function fullofsinus_init()
{

//fos_earth = new image ("gfx/earth.gif");
//fos_moon = new image ("gfx/moon.gif");

  fos_starfield = new Starfield(mycanvas160,100,1,1,0,-1,0.3,0.4,[c64.colors.white,c64.colors.dark_grey,c64.colors.grey,c64.colors.light_grey]);
}



function fullofsinus_render()
{

  stage.fill(c64.colors.black);
  mycanvas160.fill(c64.colors.black);


  fos_starfield.draw(mycanvas160);

//  fos.earth.draw(mycanvas160,80,30);
//  fos.moon.draw(mycanvas160,0,0);
}
