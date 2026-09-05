
let fuente;
let fuenteTeclas;
let fondo1;
let fondojuego;
let pantalla = "menu"

let walterX = 100;
let walterY = 363;
let velocidadX = 0;
let velocidadY = 0;

let estadoWalter = "idle";
let frameActual = 0;
let velocidadAnimacion = 12;

//PARALLAX 
let fondofondo;
let fondoMedio;
let tiles;

let posXfondo = 0;
let posXmedio = 0;
let posXtiles = 0;

let posYfondo = 0;
let posYmedio = 0;
let posYtiles = 460;

// VELOCIDADES DEL PARALLAX
let velocidadBack = 0.2;
let velocidadMedio = 0.5;
let velocidadTiles = 1;



//MOVIMIENTOS
let walterIdle = [];
let walterCaminar = [];
let walterSaltar = [];
let walterMorir = [];

let mirandoDerecha = true;
let muriendo = false;

 let camaraX = 0;
 
//COLORES
let verdeBoton = "#476A3C";
let verdeHover = "#668F4B";
let verdeLima = "#D8F36B";
let crema = "#F4F7D0";
let verdeSombra = "#354D2C";

function preload() {
  fondo1 = loadImage("data/fondo1.jpg");
  fuente = loadFont("data/fuente.ttf");
  fuente2 = loadFont ("data/teclas.ttf");
  fondofondo = loadImage("data/fondoBack.png");
  fondoMedio = loadImage("data/medio.png");
  tiles = loadImage("data/tiles.png");

walterIdle[0] = loadImage("data/walteridle.png");

for (let i = 0; i < 5; i++) {
  walterCaminar[i] = loadImage(
    "data/waltercaminar" + (i + 1) + ".png"
  );
}

for (let i = 0; i < 5; i++) {
  walterMorir[i] = loadImage(
    "data/waltermorir" + (i + 1) + ".png"
  );
}
}

function setup() {
  createCanvas(800, 600);
  textFont(fuente);
    noSmooth();

}
function draw() {

  if (pantalla == "menu") {
    dibujarMenu();
  }
  else if (pantalla == "juego") {
  moverWalter();
  moverFondo(camaraX);
  animarWalter();
  dibujarJuego();
}
}

function mousePressed() {

  if (pantalla == "menu") {

    if (mouseX > 300 && mouseX < 500 &&
        mouseY > 400 && mouseY < 470) {

      pantalla = "juego";
    }
  }

else if (pantalla == "juego") {

  if (mouseX > 600 && mouseX < 700 &&
      mouseY > 50 && mouseY < 110) {

    estadoWalter = "morir";
    frameActual = 0;
  }
}
    }
 

function moverWalter() {

  if (estadoWalter == "morir") {
    return;
  }

  estadoWalter = "idle";

  if (keyIsPressed) {

    if (key == 'a' || key == 'A') {
      walterX -= 3;
      estadoWalter = "caminar";
      mirandoDerecha = false;
    }

    if (key == 'd' || key == 'D') {
      walterX += 3;
      estadoWalter = "caminar";
      mirandoDerecha = true;
    }
  }

  camaraX = walterX - 300;

  if (camaraX < 0) {
    camaraX = 0;
  }

  if (camaraX > 1600) {
    camaraX = 1600;
  }

  if (walterX < 0) {
    walterX = 0;
  }

  if (walterX > 2304) {
    walterX = 2304;
  }
}
function animarWalter() {

  if (estadoWalter == "caminar") {

    if (frameCount % velocidadAnimacion == 0) {
      frameActual++;

      if (frameActual >= walterCaminar.length) {
        frameActual = 0;
      }
    }

  } else if (estadoWalter == "idle") {

    frameActual = 0;

  } else if (estadoWalter == "morir") {

    if (frameCount % velocidadAnimacion == 0) {
      frameActual++;

      if (frameActual >= walterMorir.length) {
        frameActual = walterMorir.length - 1;
      }
    }
  }
}

function dibujarWalter() {

  push();

  if (estadoWalter == "idle") {

    image(walterIdle[0],walterX - camaraX,walterY,80,120);

  } else if (estadoWalter == "caminar") {

    if (mirandoDerecha) {

      image(walterCaminar[frameActual],walterX - camaraX,walterY,80,120);

    } else {

      translate(walterX - camaraX + 80, walterY);
      scale(-1, 1);

      image(walterCaminar[frameActual],0,0,80,120);
    }

  } else if (estadoWalter == "morir") {

    image( walterMorir[frameActual], walterX - camaraX, walterY, 80,120);
  }

  pop();
}

function moverFondo(camara) {

  posXfondo = -camara * velocidadBack;
  posXmedio = -camara * velocidadMedio;
  posXtiles = -camara * velocidadTiles;
}

function dibujarBoton(x, y, w, h, texto) {

 let apretada = false;

  if (keyIsPressed && key.toUpperCase() == texto) {
    apretada = true;
  }

  // SOMBRA EXTERIOR
  fill(verdeSombra);
  noStroke();
  rect(x, y + 8, w, 18, 5);

  // BOTÓN
  fill(verdeBoton);
  stroke(verdeLima);
  strokeWeight(4);
  rect(x, y, w, h, 5);

  // RELIEVE INTERNO
  if (apretada) {
    fill(verdeSombra);
    noStroke ();
    rect(x + 6, y + h - 8, w - 12, 5, 3);
  } else {
    fill(verdeHover);
    noStroke ();
    rect(x + 6, y + 6, w - 12, 5, 3);

    fill(verdeSombra);
    rect(x + 6, y + h - 11, w - 12, 5, 3);
  }

  // TEXTO
  fill(crema);
  textFont(fuente2);
  textSize(35);
  textAlign(CENTER, CENTER);
  noStroke();
  text(texto, x + w / 2, y + h / 2);
   }
