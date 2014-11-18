
function plasma_init(){

    plasma_rasterlines = new image("gfx/plasma_rasterlines.gif");
    awsm_plasma = new image("gfx/awsm_plasma.gif");
    girl = new AnimGIF("gfx/girl.gif",115,160,8,7);
    plasma_canvas = new canvas (260,100);

    RAD = Math.PI/180.0;
    Sin = Math.sin;
    Cos = Math.cos;
    Sqrt = Math.sqrt;

    // fullscreen the canvas element

    WIDTH = 320;
    HEIGHT = 200;

    // create the Plasma object
    g_plasma = new Plasma(plasma_canvas);

    // init the animation loop
    g_framestart = Date.now();
    
    if (demoIsLive) playSong('sid/Night_of_the_Sentinels.sid',0);

}

function Plasma(canvas){

    this.canvas = canvas;

    var c64rgb = {
      black:"rgb(0,0,0)",
      white:"rgb(255,255,255)",
      red:"rgb(104,55,43)",
      cyan:"rgb(112,164,178)",
      purple:"rgb(111,61,134)",
      green:"rgb(88,141,67)",
      blue:"rgb(53,40,121)",
      yellow:"rgb(184,199,111)",
      orange:"rgb(111,79,37)",
      brown:"rgb(67,57,0)",
      light_red:"rgb(154,103,89)",
      dark_grey:"rgb(68,68,68)",
      grey:"rgb(108,108,108)",
      light_green:"rgb(154,210,132)",
      light_blue:"rgb(108,94,181)",
      light_grey:"rgb(149,149,149)"
      };

      // generate some palettes


      function multi(color)
      {
        for(j=0;j<10;j++){
            palette.push(color);
        }

      }

      this.palettes = [];

      var palette = [];
        for (var i=0; i<16; i++){
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["black"]);

          multi(c64rgb["blue"]);
          multi(c64rgb["light_blue"]);
          multi(c64rgb["cyan"]);
          multi(c64rgb["light_blue"]);
          multi(c64rgb["blue"]);

          multi(c64rgb["black"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["red"]);
          multi(c64rgb["light_red"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_red"]);
          multi(c64rgb["red"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["black"]);
        }

      this.palettes.push(palette);

      var palette = [];
        for (var i=0; i<22; i++){

          multi(c64rgb["dark_blue"]);
          multi(c64rgb["light_blue"]);
          multi(c64rgb["cyan"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_green"]);
          multi(c64rgb["green"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["red"]);
          multi(c64rgb["light_red"]);
          multi(c64rgb["white"]);

        }

      this.palettes.push(palette);


      var palette = [];
        for (var i=0; i<128; i++){

          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
        }

      this.palettes.push(palette);


      // init public properties for the GUI controls
      this.CycleSpeed = 1;
      this.PlasmaDensity = 64;
      this.TimeFunction = 128;
      this.PlasmaFunction = 1;
      this.Jitter = 0;
      this.Alpha = 1;
      this.PaletteIndex = 2;

      return this;
   }

   Plasma.prototype =
   {


      // internal properties
      paletteoffset: 0,
      palettes: null,

      // animation frame rendering function
      frame: function frame()
      {
         // init context and img data buffer
         var w = WIDTH, h = HEIGHT,                      // canvas width and height
             pw = this.PlasmaDensity, ph = (pw * (h/w)),    // plasma source width and height
             ctx = this.canvas.contex,
             palette = this.palettes[this.PaletteIndex],
             paletteoffset = this.paletteoffset+=this.CycleSpeed,
             plasmafun = this.PlasmaFunction;
         // scale the plasma source to the canvas width/height
         var vpx = (w/pw), vpy = (h/ph);

         var dist = function dist(a, b, c, d)
         {
            return Sqrt((a - c) * (a - c) + (b - d) * (b - d));
         }

         var time = Date.now() / this.TimeFunction;

         var colour = function colour(x, y)
         {
            switch (plasmafun)
            {
               case 0:
                  return ((Sin(dist(x + time, y, 128.0, 128.0) / 8.0)
                          + Sin(dist(x - time, y, 64.0, 64.0) / 8.0)
                          + Sin(dist(x, y + time / 7, 192.0, 64) / 7.0)
                          + Sin(dist(x, y, 192.0, 100.0) / 8.0)) + 4) * 32;
                  break;
               case 1:
                  return (128 + (128 * Sin(x * 0.0625)) +
                          128 + (128 * Sin(y * 0.03125)) +
                          128 + (128 * Sin(dist(x + time, y - time, w, h) * 0.125)) +
                          128 + (128 * Sin(Sqrt(x * x + y * y) * 0.125)) ) * 0.25;
                  break;
            }
         }

         ctx.save();
         ctx.globalAlpha = this.Alpha;
         var jitter = this.Jitter ? (-this.Jitter + (Math.random()*this.Jitter*2)) : 0;
         for (var y=0,x; y<ph; y++)
         {
            for (x=0; x<pw; x++)
            {
               // map plasma pixels to canvas pixels using the virtual pixel size
               ctx.fillStyle = palette[(~~colour(x, y) + paletteoffset) % 256];
               ctx.fillRect(x * vpx + jitter, y * vpy + jitter, vpx, vpy);
            }
         }
         ctx.restore();
      }
   }



function plasma_render()
{
   stage.fill(c64.colors["black"]);
   mycanvas.fill(c64.colors["black"]);
   g_plasma.frame.call(g_plasma);
   plasma_canvas.draw(mycanvas,30,55);
   plasma_rasterlines.draw(mycanvas,0,0);
   girl.play(mycanvas,0,0);
   awsm_plasma.draw(mycanvas,240,140);
}
