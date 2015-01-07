function tunnel_init()
{
  stage.fill(c64.colors.black);

  mycanvas_tunnel = new canvas(160, 200) ;

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

  a=0 ;
  fzoom = 1 ; // variateur de vitesse pour le zoom principal

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

/*
  for (var j=min; j<max; j+=step) {
    for (var i=0; i<nbdots; i++) {
      var obj = {
        x:2*Math.cos(i*Math.PI*2/nbdots),
        y:4*Math.sin(i*Math.PI*2/nbdots),
        z:j
      };
      if ( i%2 === 0) obj.x = 30*Math.cos(i*Math.PI*2/nbdots) ;
      if ( i%2 === 0) obj.y = 60*Math.sin(i*Math.PI*2/nbdots) ;

      orig[k] = { x:obj.x, y:obj.y,z:obj.z} ;
      orig2[k++] = { x:obj.x, y:obj.y,z:obj.z} ;
    }
  }
*/
  mysprite = [];
  mysprite[0] = generateDot(c64.colors.green) ;
  mysprite[1] = generateDot(c64.colors.yellow) ;
  mysprite[2] = generateDot(c64.colors.purple) ;
  mysprite[3] = generateDot(c64.colors.light_blue) ;
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

function do_3d(dest,sprite) {
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

      if ( (X>0) && (Y>0) && (X<dest.canvas.width) && (Y<dest.canvas.height)) sprite.draw(dest,X,Y-20,alpha,0,1,1);

    //  if ((X>0) && (Y>0) && (X<dest.canvas.width) && (Y<dest.canvas.height)) sprite.draw(dest,X,180+Y/10,alpha/3,0,1,1);

      k++;
    }
  }
}


function tunnel_render()
{


  lessFPSCounter ++;
  if (lessFPSCounter%3===0){
    mycanvas160.fill(c64.colors.black);
    mycanvas_tunnel.clear();

    eye.z=Math.sin(tunnel_zDist)*100-100;
    tunnel_zDist+=0.02;
    tunnel_alpha = 0.3+Math.abs(Math.sin(tunnel_zDist));
    a+=0.03;
    fzoom += 0.1 ;
    vbl ++ ;
    if (vbl%100===0) { spri++ ; spri = spri % mysprite.length ;}

    do_3d(mycanvas_tunnel,mysprite[spri]) ;
    mycanvas_tunnel.draw(mycanvas160,0,0,tunnel_alpha) ;
    mycanvas_tunnel.draw(mycanvas160,160,200,tunnel_alpha,180) ;
  }




  colorReduce(mycanvas160);
}
