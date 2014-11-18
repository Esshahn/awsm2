function scarlett_init()
{

  scarlett = new image("gfx/scarlett.gif");
  blende = new Blend(mycanvas,2,0);
}



function scarlett_render()
{
    stage.fill(c64.colors["black"]);
    scarlett.draw(mycanvas,0,0);

    blende.draw();

}
