function fullofsinus_init()
{

  fos_earth = new image ("gfx/earth.gif");
  fos_moon = new image ("gfx/floppy_moon.gif");

  fos_starfield = new Starfield(mycanvas160,100,1,1,0,-1,0.1,0.1,[c64.colors.white,c64.colors.dark_grey,c64.colors.grey,c64.colors.light_grey]);
  fos_earth.y = 250;
  fos_moon.y = 550;
}



function fullofsinus_render()
{

  stage.fill(c64.colors.black);
  mycanvas160.fill(c64.colors.black);


  fos_starfield.draw(mycanvas160);

  if (fos_earth.y > -100) fos_earth.y -= 0.3;
  if (fos_moon.y > 0) fos_moon.y -= 0.35;

  fos_earth.draw(mycanvas160,70,fos_earth.y);
  fos_moon.draw(mycanvas160,0,Math.floor(fos_moon.y));
}
