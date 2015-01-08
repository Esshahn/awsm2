function tunnel_init()
{
  stage.fill(c64.colors.black);

  logo_awsm_tunnel = new image("gfx/logo_awsm_tunnel.gif");

  mycanvas_tunnel = new canvas(140, 200) ;

  lessFPSCounter = 0;

  movX = 40 ;
  movY = 40 ;
  movAngle = 0.5 ;

  vbl = 0 ;

  orig = [];
  orig2 = [] ;
  k=0 ;

  nbdots = 25 ;
  min = -250 ;
  max = 0 ;
  step = 3;

  eye = {x:0, y:0, z:0};
  speed= 5 ;

  spri = 0 ;

  tunnel_zDist = 0;
  displaymode = 1;

  a=0 ;

  for (var j=min; j<max; j+=step) {
    for (var i=0; i<nbdots; i++) {
      var obj = {
        x:30*Math.cos(i*Math.PI*2/nbdots),
        y:60*Math.sin(i*Math.PI*2/nbdots),
        z:j
      };

      orig[k] = { x:obj.x, y:obj.y,z:obj.z} ;
      orig2[k++] = { x:obj.x, y:obj.y,z:obj.z} ;
    }
  }

  mysprite = [];
  mysprite[0] = generateDot(c64.colors.green) ;
  mysprite[1] = generateDot(c64.colors.yellow) ;
  mysprite[2] = generateDot(c64.colors.purple) ;
  mysprite[3] = generateDot(c64.colors.light_blue) ;

  tunnel_checker_canvas = new canvas (20,200);
  tunnel_checker = new Tunnel_checker(c64.colors.dark_grey,c64.colors.black,12,24,-0.2,0.4);
}


function generateDot(color) {
  var cvs = new canvas(2,2);
  cvs.quad(0,0,1,1,color) ;
  return cvs;
}

function transform_3D_to_2D (pt) {
  var tempo = (eye.z + pt.z) ;
  return ( {x: (pt.x<<7) / tempo, y: (pt.y<<7) / tempo} ) ;
}

function do_3d(dest,sprite,speed) {
  var x=0 ;
  var y=0 ;
  var k=0 ;
  var cosa = Math.cos(a) ;
  var sina = Math.sin(a) ;
  var sina2 = Math.sin(a/movAngle) ;
  var toto1 = 40*sina ;
  var toto2 = 40*sina2 ;

  for (var j=min; j<max; j+=step) {
    for (var i=0; i<nbdots; i++) {
      orig2[k].z += speed ;
      if ( i%2 === 0 ) orig2[k].z += speed/10 ;
      if (orig2[k].z>max) {
        orig2[k].z -= max-min ;
        orig2[k].x = orig[k].x + toto1 ;
        orig2[k].y = orig[k].y + toto2 ;
      }
      var p = transform_3D_to_2D(orig2[k]) ;
      var alpha = 0.1+(orig2[k].z-min)/(max-min) ;
      var X = Math.floor(dest.canvas.width/2+p.x-movX*cosa);
      var Y = Math.floor(dest.canvas.height/2+p.y-movY*sina2);

      if ( (X>0) && (Y>0) && (X<dest.canvas.width) && (Y<dest.canvas.height)) sprite.draw(dest,X,Y,alpha,0,1,1);

      k++;
    }
  }
}


function Tunnel_checker(color1,color2,xtilesize,ytilesize,xspeed,yspeed){
  this.color1 = color1;
  this.color2 = color2;
  this.xtilesize = xtilesize;
  this.ytilesize = ytilesize;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.xmove = 0;
  this.ymove = 0;

  this.draw = function (canvas){
    this.canvas = canvas;
    this.xstart = 0;
    this.xmove += this.xspeed;
    this.ymove += this.yspeed;
    this.canvas.fill(this.color2);

    if (Math.abs(this.xmove) >= this.xtilesize){
      this.xmove = 0;
    }

    if (Math.abs(this.ymove) >= this.ytilesize){
      this.ymove = 0;
    }

    for (var j= -this.ytilesize; j<= (this.canvas.height+this.ytilesize)/this.ytilesize; j++){
      if (this.xstart === 0){
        this.xstart = this.xtilesize;
      }else{
        this.xstart = 0;
      }
      for (var i= -xtilesize; i<= (this.canvas.width+this.xtilesize)/this.xtilesize; i+=2){
          this.canvas.quad(Math.floor(this.xmove+this.xstart+i*this.xtilesize),Math.floor(this.ymove+j*this.ytilesize),this.xtilesize,this.ytilesize,this.color1);
      }
    }
  };

}


function tunnel_render()
{

  lessFPSCounter ++;
  if (lessFPSCounter%3===0){
    mycanvas160.fill(c64.colors.black);
    mycanvas_tunnel.clear();

    eye.z=Math.sin(tunnel_zDist)*100-100;
    tunnel_zDist+= 0.02;
    tunnel_alpha = 0.3+Math.abs(Math.sin(tunnel_zDist))/2;
    a+= 0.03;

    vbl ++ ;
    if (vbl%100===0) {
      spri++ ;
      spri = spri % mysprite.length ;
    }

    if (vbl%100===0) {
      displaymode ++;
    }



    switch(displaymode){

      case 1:
                do_3d(mycanvas_tunnel,mysprite[spri],5) ;
                mycanvas_tunnel.draw(mycanvas160,20,0,tunnel_alpha) ;
                break;
      case 2:
                do_3d(mycanvas_tunnel,mysprite[spri],10) ;
                mycanvas_tunnel.draw(mycanvas160,20,0,tunnel_alpha) ;
                break;
      case 3:
                tunnel_zDist += 0.02;
                a+= 0.03;
                do_3d(mycanvas_tunnel,mysprite[spri],40) ;
                mycanvas_tunnel.draw(mycanvas160,20,0,tunnel_alpha) ;
                break;
      case 4:
                do_3d(mycanvas_tunnel,mysprite[spri],5) ;
                mycanvas_tunnel.draw(mycanvas160,20,0,tunnel_alpha) ;
                mycanvas_tunnel.draw(mycanvas160,180,200,tunnel_alpha,180) ;
                break;
      case 5:
                displaymode = 1;
    }

  }

  tunnel_checker.draw(tunnel_checker_canvas);


  // draw the colored roundness of the cylinder

  tunnel_checker_canvas.contex.globalCompositeOperation='lighter';
  tunnel_checker_canvas.quad(2,0,16,200,c64.colors.grey);
  tunnel_checker_canvas.quad(5,0,10,200,c64.colors.dark_grey);
  tunnel_checker_canvas.contex.globalCompositeOperation='source-over';

  // draw black "curves" that make the cylinder top and bottom rounded

  tunnel_checker_canvas.quad(0,0,2,2,c64.colors.black);
  tunnel_checker_canvas.quad(0,0,5,1,c64.colors.black);
  tunnel_checker_canvas.quad(15,0,3,1,c64.colors.black);
  tunnel_checker_canvas.quad(18,0,2,2,c64.colors.black);

  tunnel_checker_canvas.quad(0,198,2,2,c64.colors.black);
  tunnel_checker_canvas.quad(0,199,5,1,c64.colors.black);
  tunnel_checker_canvas.quad(15,199,3,1,c64.colors.black);
  tunnel_checker_canvas.quad(18,198,2,2,c64.colors.black);

  tunnel_checker_canvas.draw(mycanvas160,5,0);

  logo_awsm_tunnel.draw(mycanvas160,0,20);
  colorReduce(mycanvas160);
}