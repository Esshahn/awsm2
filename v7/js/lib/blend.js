
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
