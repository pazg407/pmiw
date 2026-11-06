//Serena Gerace - María Paz García
// comisión 1
// "el jardin de senderos que se bifurcan"

let yutsun=[];
let yutsunataca=[];
let yutsun1;
let secuaces=[];
let secuacesataca = [];
let enemigo1;
let fondo;
let escenario1;

function setup() {
  createCanvas(800, 400);
  yutsun1 = new jugador();
  escenario1 = new escenario ();
  enemigo1 = new enemigo ();
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
   
  fondo=loadImage("data/fondo.png");

}
function draw() {
  background(60);

  escenario1.mostrar();

  yutsun1.mover();
  yutsun1.atacar();
  yutsun1.mostrar();
  enemigo1.mover();
  enemigo1.atacar();
  enemigo1.mostrar();
  
}
