function part3(){

myfont = new image("gfx/font_hotline.gif");
myfont.initTile(8,9,33);

// init variables
myscrolltext = new scrolltext_horizontal();
myscrolltext.scrtxt="                                          ^S6WHOAAH!!!                ^P1NOTICE:   THIS IS A MULTIPART DEMO ^P2               SO STAY WITH ME!         ^P2                           ^S2IT'S 1989 AND THIS IS AWSM TYPING... AFTER SEVERAL CRACKTRO REMAKES IT WAS TIME FOR SOMETHING ORIGINAL.... DID YOU NOTICE THE C64 LOAD SEQUENCE KICKING OFF THIS LITTLE PROD? I MADE IT NICE AND SIMPLE, JUST ONE JS FILE AND TWO LINES OF CODE TO INTEGRATE IT INTO YOUR DEMO - FEEL FREE TO USE IT!                            ^S6GETTING BORED ALREADY?   ^P1              THEN LET'S MOVE ON!      ^P1";
myscrolltext.init(mycanvas,myfont,10);

}





function render_part3(){
    border.fill(c64.colors["black"]);
    mycanvas.fill(c64.colors["blue"]);

myscrolltext.draw(118);


}
