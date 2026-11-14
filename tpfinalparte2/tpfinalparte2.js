//Serena Gerace - María Paz García
// comisión 1
// "el jardin de senderos que se bifurcan"

let yutsun=[];
let yutsunataca=[];
let yutsunsalto = [];
let secuaces=[];
let secuacesataca = [];
let juego;
let fondo;
let fuente
let vidasjugador=[];
let muerte = [];
let pantallainicio;


function setup() {
  createCanvas(800, 400);
  juego = new principal();
  textFont (fuente);
}

function preload() {
  for (let i=0; i<10; i++) {
    yutsun[i] = loadImage("data/yutsun"+i+".png");
  }
  for (let i=0; i<6; i++) {
    yutsunataca[i] = loadImage("data/golpe"+i+".png");
  }
  for (let i=0; i<9; i++) {
    secuaces[i] = loadImage("data/secuaz"+i+".png");
  }
  for (let i=0; i<9; i++) {
    secuacesataca[i] = loadImage("data/ataque"+i+".png");
  }
  for (let i=0; i<6; i++) {
    vidasjugador[i] = loadImage("data/vidas" +i+ ".png");
  }
  for (let i = 0; i < 3; i++) {
  muerte[i] = loadImage("data/muerte" + i + ".png");
}
for (let i = 0; i < 4; i++) {
  yutsunsalto[i] = loadImage("data/salto" + i + ".png");
}
  fuente=loadFont ("data/fuente.ttf");
  fondo=loadImage("data/fondo.png");
  pantallainicio = loadImage("data/inicio.png");
}
function draw() {
  background(60);
  juego.dibujar();
  juego.detectarcolision();
  juego.controlarbotones();

}
