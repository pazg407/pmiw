function dibujarMenu  (){
image(fondo1, 0, 0);

  fill (verdeLima);
  stroke (0);
  textSize(42);
   
  text("WALTER THE FROG", 100, 140);
 
  //START!!!1
  if (mouseX > 300 && mouseX < 500 &&
      mouseY > 400 && mouseY < 470) {
    fill(verdeHover);
  } else {
    fill(verdeBoton);
  }
  
  let movimiento = sin(frameCount * 0.05) * 5;
  
  
  stroke(verdeBoton);
  rect(300, 400 + movimiento, 200, 70, 15 );
 


  //START TEXTO 
  fill(crema);
  textSize(32);
  text("START", 313, 445 + movimiento);

}
