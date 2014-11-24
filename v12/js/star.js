function star_init()
{

  lowres_canvas = new canvas (160,100);
  star_rotation = 0;
  mycanvas.clear();
  lessFPSCounter = 0;
  star_switch = 1;
}


function star(ctx, x, y, r, p, m,rot,color)
{

    // http://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/

    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(rot*Math.PI/16);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();

}



function star_render()
{
  // the lessFPSCounter does what it says. It reduces the FPS to give a retro effect
  lessFPSCounter ++;
  if (lessFPSCounter >= 5){

    switch(star_switch){

      case 1:
              stage.fill(c64.colors["blue"]);
              lowres_canvas.fill(c64.colors["blue"]);
              star(lowres_canvas.contex, 80, 50, 45, 5, 0.4,star_rotation,c64.colors["white"]);

              lowres_canvas.contex.globalCompositeOperation='darker';
              star(lowres_canvas.contex, 80, 50, 45, 5, 0.4,-star_rotation*2,c64.colors["light_blue"]);
              lowres_canvas.contex.globalCompositeOperation='source-over';
              star_rotation += 0.3;
              lessFPSCounter = 0;

              break;
      default:
              break;
    }

    colorReduce(lowres_canvas);
    lowres_canvas.draw(stage,60,60,1,0,4,4);
  }

}
