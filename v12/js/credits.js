function credits_init()
{

  credits_gradient = new image("gfx/credits_gradient.gif");
  credits_font = new image("gfx/slimfont_awsm.gif");
  credits_font.initTile(10,20,32);

  credits_scroller_canvas = new canvas (160,200);

  credits_scroller = new scrolltext_horizontal();
  credits_scrollparam=[{myvalue: 0, amp: 32.0, inc:0.25, offset: -0.06}];
  credits_scroller.scrtxt="() ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;.,";
  credits_scroller.init(credits_scroller_canvas,credits_font,1.3,credits_scrollparam);

  playSong('sid/Arctic_Circles.sid',0);


}



function credits_render()
{


    stage.fill(c64.colors.black);
    credits_scroller_canvas.clear();
    mycanvas160.clear();

    credits_scroller.draw(170);

    credits_font.print(credits_scroller_canvas,"PRESS JOY MM OR SPACE TO CONTINUE ",0,180);

    credits_scroller_canvas.contex.globalCompositeOperation='source-atop';
    credits_gradient.draw(credits_scroller_canvas,0,0);
    credits_scroller_canvas.contex.globalCompositeOperation='source-over';

    credits_scroller_canvas.draw(mycanvas160,0,0);


}
