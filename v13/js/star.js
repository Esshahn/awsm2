function star_init()
{

  star_rotation = 0;
  lessFPSCounter = 0;

  star_canvas = new canvas (160,100);

  canvas_star_extended = new canvas (180,240);

  star_0 = new Star();
  star_1 = new Star();

  star_pinup_01 = new image ("gfx/pinup_01.gif");


}


function Star()
{

    // http://programmingthomas.wordpress.com/2012/05/16/drawing-stars-with-html5-canvas/

    this.draw = function (canvas, x, y, r, p, m,rot,color){

      this.canvas = canvas;
      this.ctx = this.canvas.contex;
      this.x = x;
      this.y = y;
      this.r = r;
      this.p = p;
      this.m = m;
      this.rot = rot;
      this.color = color;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rot*Math.PI/16);
      this.ctx.moveTo(0,0-this.r);
      for (var i = 0; i < this.p; i++)
        {
          this.ctx.rotate(Math.PI / this.p);
          this.ctx.lineTo(0, 0 - (this.r*this.m));
          this.ctx.rotate(Math.PI / this.p);
          this.ctx.lineTo(0, 0 - this.r);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();

    }

}



function star_render()
{
  // the lessFPSCounter does what it says. It reduces the FPS to give a retro effect

  stage.fill(c64.colors.light_blue);
  star_canvas.clear();
  mycanvas160.fill(c64.colors.light_blue);

  stage.quad(0,50,780,50,c64.colors.light_green);

  star_0.draw(star_canvas, 85, 55, 45, 5, 0.4,star_rotation,c64.colors.blue);
  star_1.draw(star_canvas, 80, 50, 45, 5, 0.4,star_rotation,c64.colors.white);

  lessFPSCounter ++;
  if (lessFPSCounter >= 3){
    star_rotation += 0.50;
    lessFPSCounter = 0;
  }

  star_canvas.draw(mycanvas160,0,0,1,0,1,2);

  star_pinup_01.draw(canvas_star_extended,0,0);
  star_pinup_01.draw(mycanvas160,-10,8);
  canvas_star_extended.draw(stage,20,76,1,0,4,2);
  colorReduce(mycanvas160);
}
