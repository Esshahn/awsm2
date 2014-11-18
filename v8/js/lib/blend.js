function Shutter(canvas,lines,speed, color){
  this.canvas = canvas;
  this.lines = lines;
  this.speed = speed;
  this.color = color;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.thickness = 0;
  this.step = this.canvas.height / this.lines;

  this.out = function(){
    if(this.thickness <= this.step){
      for(var i = 0; i < this.height; i+=this.step){
        this.canvas.quad(0,i,this.width,Math.floor(this.thickness),this.color);
      }
      this.thickness += this.speed;
    }else{
      this.canvas.quad(0,0,this.width,this.height,this.color);
    }
  }

  this.in = function(){
    if(this.thickness <= this.step){
      for(var i = 0; i < this.height; i+=this.step){
        this.canvas.quad(0,i,this.width,this.step-Math.floor(this.thickness),this.color);
      }
      this.thickness += this.speed;
    }
  }

}


function Tiles(canvas,tilesX,tilesY,wait,color){
  this.canvas = canvas;
  this.tilesX = tilesX;
  this.tilesY = tilesY;
  this.wait = wait;
  this.color = color;

  this.tilesWidth = this.canvas.width / this.tilesX;
  this.tilesHeight = this.canvas.height / this.tilesY;

  this.allTiles = [];

  this.position = 0;

  for (var i = 0; i< this.tilesY; i++){
    for (var j = 0; j< this.tilesX; j++){
        this.tile = {
          x : this.tilesWidth*j,
          y : this.tilesHeight*i,
          width : this.tilesWidth,
          height: this.tilesHeight
        }
        this.position++;

        this.allTiles.push(this.tile);

    }
  }

  this.allTiles = shuffle(this.allTiles);

  for (var i = 0; i< this.allTiles.length; i++){
    this.allTiles[i].pos = i;
    this.allTiles[i].wait = i*this.wait;
  }

  this.flyUp = function(){
    for (var i = 0; i< this.allTiles.length; i++){

      if (this.allTiles[i].y > -this.tilesHeight){

          this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y,this.tilesWidth,this.tilesHeight,this.color);
          //this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y,this.allTiles[i].pos,2,"#ff0000");

          if (this.allTiles[i].wait > 0){
            this.allTiles[i].wait --;
          }else{
            this.allTiles[i].y --;
          }
      }

    }
  }


  this.shrinkYUp = function(){
    for (var i = 0; i< this.allTiles.length; i++){

      if (this.allTiles[i].height > 0){
          this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y,this.tilesWidth,Math.floor(this.allTiles[i].height),this.color);
          if (this.allTiles[i].wait > 0){
            this.allTiles[i].wait --;
          }else{
            this.allTiles[i].height -= 0.5;
          }
      }

    }
  }


  this.shrinkYDown = function(){
    for (var i = 0; i< this.allTiles.length; i++){

      if (this.allTiles[i].height > 0){
          this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y+this.tilesHeight-Math.floor(this.allTiles[i].height),this.tilesWidth,Math.floor(this.allTiles[i].height),this.color);
          if (this.allTiles[i].wait > 0){
            this.allTiles[i].wait --;
          }else{
            this.allTiles[i].height -= 0.5;
          }
      }

    }
  }

}



function clearScreen(){
  stage.fill(c64.colors["black"]);
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
    playPart++;
  }
}


function whiteToBlack(){
  if (typeof(wtbCounter) == "undefined") wtbCounter = 0;

  if (wtbCounter <= 20)  mycanvas.fill(c64.colors["white"]);
  if (wtbCounter >= 20 && wtbCounter <= 40)  mycanvas.fill(c64.colors["light_grey"]);
  if (wtbCounter >= 40 && wtbCounter <= 60)  mycanvas.fill(c64.colors["grey"]);
  if (wtbCounter >= 60 && wtbCounter <= 80)  mycanvas.fill(c64.colors["dark_grey"]);
  if (wtbCounter >= 80 && wtbCounter <= 100)  mycanvas.fill(c64.colors["black"]);
  if (wtbCounter >= 100)  playPart++;

  wtbCounter+=3;

}
