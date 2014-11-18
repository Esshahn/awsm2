function intro_init(){

  awsm_logo_blueScreen_canvas = new canvas(166,66);


  // load the assets
  awsm_logo_outline = new image("gfx/awsm_logo_outline.gif");
  awsm_logo_gradient = new image("gfx/grad_logo_outline.gif");
  bg_grey_tiles = new image("gfx/bg_grey_tiles.gif");
  rasterbar_grey = new image("gfx/rasterbar_grey.gif");
  colorcycle = new image("gfx/colorcycle.gif");
  myfont_small = new image("gfx/font_hotline.gif");
  myfont_small.initTile(8,9,33);
  myfont = new image("gfx/font_hotline_2x3.gif");
  myfont.initTile(16,24,33);

  // init variables


  myscrolltext = new scrolltext_horizontal();
  myscrollparam=[{myvalue: 0, amp: 36.0, inc:0.2, offset: -0.08}];
  myscrolltext.scrtxt="         WHOAAH!!!      ^P1NOTICE: THIS IS A     MULTIPART DEMO    ^P2   SO STAY WITH ME!   ^P2     IT'S 1989 AND THIS IS AWSM TYPING... AFTER SEVERAL CRACKTRO REMAKES IT WAS TIME FOR SOMETHING ORIGINAL.... DID YOU NOTICE THE C64 LOAD SEQUENCE KICKING OFF THIS LITTLE PROD? I MADE IT NICE AND SIMPLE, JUST ONE JS FILE AND TWO LINES OF CODE TO INTEGRATE IT INTO YOUR DEMO - FEEL FREE TO USE IT!                        GETTING BORED?   ^P1   THEN LET'S MOVE ON! ^P1";
  myscrolltext.init(mycanvas,myfont,2.4,myscrollparam);


  var my2dstarsparams=[
    {nb:50, speedy:0, speedx:2.5, color:'#FFFFFF', size:1},
    {nb:50, speedy:0, speedx:1.8, color:'#ffffff', size:1},
    {nb:50, speedy:0, speedx:1.4, color:'#ffffff', size:1},
              ];
  my2dstarfield=new starfield2D_dot(mycanvas,my2dstarsparams);



  if (demoIsLive) playSong('sid/Cool_Croc_Twins.sid',5);

}


function clearScreen(){

  if(typeof(counter) == "undefined") counter = 0;
  counter+=2;

  if(counter <= 120){
    mycanvas.fill(c64.colors["blue"]);
    stage.fill(c64.colors["light_blue"]);
    mycanvas.quad(0,100-counter,320,counter*2,this.c64.colors["light_blue"]);
  }

  if(counter > 120 && counter <= 410){
    if(typeof counter2 == "undefined") counter2 = 0;
    mycanvas.fill(c64.colors["light_blue"]);
    stage.fill(c64.colors["light_blue"]);
    border.quad(0,border.height-counter2,border.width,border.height,this.c64.colors["blue"]);
    border.quad(0,border.height-counter2+20,border.width,border.height,this.c64.colors["black"]);
    counter2+=2;
  }

  if(counter > 450){
    mycanvas.fill(c64.colors["black"]);
    stage.fill(c64.colors["black"]);
    border.clear();
    currentAnim++;
  }
}


function logoMoveAndGradient(){
  if(typeof(myRaster) == "undefined") myRaster = 11;
  if(typeof(mySinus) == "undefined"){
      mySinus = 0;
      mySinus2 = 0.1;
      mySinus3 = 0.2;

  }
  if (typeof(swing) == "undefined") swing = 84;

  if (myRaster <= -181) myRaster = 11;


  if(typeof(sinMax) == "undefined"){
    sinMax = 0;
    sinMin = 0;
  }

  myRaster -= 1;
  mySinus += 0.03;
  mySinus2 += 0.03;
  mySinus3 += 0.03;

  awsm_logo_outline.draw(awsm_logo_blueScreen_canvas,0,0);

  awsm_logo_blueScreen_canvas.contex.globalCompositeOperation='source-atop';
    awsm_logo_gradient.draw(awsm_logo_blueScreen_canvas,0,myRaster);
  awsm_logo_blueScreen_canvas.contex.globalCompositeOperation='source-over';

  this.sin = Math.ceil(Math.sin(mySinus)*swing);
  this.sin2 = Math.ceil(Math.sin(mySinus2)*swing);
  this.sin3 = Math.ceil(Math.sin(mySinus3)*swing);

  awsm_logo_outline.draw(mycanvas,77+this.sin,0);
  awsm_logo_outline.draw(mycanvas,77+this.sin2,0);
  mycanvas.contex.globalCompositeOperation='darker';
    mycanvas.quad(0,0,320,70,c64.colors["dark_grey"]);
  mycanvas.contex.globalCompositeOperation='source-over';
  awsm_logo_blueScreen_canvas.draw(mycanvas,77+this.sin3,0);


}


function drawGreyTiles(){
  if(typeof(moveX) == "undefined"){
    moveX = 0;
  }
  if(typeof(mySinusTiles) == "undefined") mySinusTiles = 0;
  mySinTiles = Math.ceil(Math.sin(mySinusTiles)*16);

  mycanvas.quad(0,85-mySinTiles,320,70+mySinTiles*2,"#ffffff");
  mycanvas.contex.globalCompositeOperation='darker';
    bg_grey_tiles.draw(mycanvas,moveX,moveX+70);
  mycanvas.contex.globalCompositeOperation='source-over';

  rasterbar_grey.draw(mycanvas,0,85-mySinTiles);
  rasterbar_grey.draw(mycanvas,0,155+mySinTiles);

  moveX --;
  mySinusTiles += 0.06;

  if(moveX<=-60){
    moveX = 0;
  }
}

function colorcycleFont(){
  if (typeof (colorcycleX) == "undefined") colorcycleX = -1280;

  colorcycleX += 8;
  if (colorcycleX > 0) {
    colorcycleX = -1280;
  }

  myfont_small.print(mycanvas,"* PRESS JOY 1 OR SPACE TO CONTINUE *",16,192);
  mycanvas.contex.globalCompositeOperation='darker';
    colorcycle.draw(mycanvas,colorcycleX,192);
  mycanvas.contex.globalCompositeOperation='source-over';


}

function intro_render(){
    stage.fill(c64.colors["black"]);

    if (typeof(currentAnim) == "undefined") currentAnim = 1;




    switch (currentAnim){
      case 1: clearScreen();
              break;
      case 2: mycanvas.fill(c64.colors["black"]);
              my2dstarfield.draw();
              drawGreyTiles();
              logoMoveAndGradient();
              myscrolltext.draw(110);
              colorcycleFont();

              break;
      case 3 : mycanvas.fill(c64.colors["black"]);
              playPart = "eaglesoft";
              break;
    }
}
