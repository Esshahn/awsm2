function scarlett_init()
{

  scarlett = new image("gfx/scarlett.gif");
  blende = new Blend(mycanvas,2,0);
}



function Blend(canvas,time,blendmode)
{
  this.canvas = canvas;
  this.time = time;
  this.blendmode = blendmode;
  this.counter = 0;

  this.palette=[
    {r:0,g:0,b:0},
    {r:67,g:57,b:0},
    {r:53,g:40,b:121},
    {r:104,g:55,b:43},
    {r:68,g:68,b:68},
    {r:111,g:61,b:134},
    {r:111,g:79,b:37},
    {r:108,g:94,b:181},
    {r:108,g:108,b:108},
    {r:154,g:103,b:89},
    {r:88,g:141,b:67},
    {r:149,g:149,b:149},
    {r:112,g:164,b:178},
    {r:184,g:199,b:111},
    {r:154,g:210,b:132},
    {r:255,g:255,b:255}
    ];

  this.draw = function()
  {
      this.counter ++;
      if(this.counter >= this.time && this.palette.length > 1){
        if(blendmode == 0){
          this.palette.pop();
        }else{
          this.palette.shift();
        }
        this.counter = 0;
      }

      colorReduce(this.canvas,this.palette);

  }


}


function scarlett_render()
{
    stage.fill(c64.colors["black"]);
    scarlett.draw(mycanvas,0,0);

    blende.draw();

}
