function dibujarJuego() {

  background("#172C1C");

  image(fondofondo, posXfondo, posYfondo);

  image(fondoMedio, posXmedio, posYmedio);

  image(tiles, posXtiles, posYtiles);

  dibujarWalter();

  
  //teclas
dibujarBoton(160, 50, 60, 60, "W");
dibujarBoton(90, 115, 60, 60, "A");
dibujarBoton(160, 115, 60, 60, "S");
dibujarBoton(230, 115, 60, 60, "D");
 textAlign(CENTER,CENTER);
dibujarBoton(600, 50, 100, 60, "DIE");
}
