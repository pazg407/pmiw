//TPfinal parte 1 - comisión 1
//Serena Gerace - https://youtu.be/fDDxi8f597w
//María Paz García - https://www.youtube.com/watch?v=d6kdTum6t9k
let musica;
let imagenes=[];
let pantalla=0;
let texto=[];
let fuenteN, fuenteR;
let musicon, musicoff;
let iniciocreditos = 0;
function preload() {
  for (let i=0; i<20; i++) {
    imagenes[i] = loadImage("data/img"+i+".png");
  }
  texto=loadStrings("data/jardinn.txt");
  fuenteN= loadFont("data/negrita.ttf");
  fuenteR= loadFont("data/normal.ttf");
  musica= loadSound("data/musicaa.mp3");
  musicoff = loadImage("data/musicaoff.png");
  musicon= loadImage("data/musicaon.png");
}

function setup() {
  createCanvas(800, 450);
  textFont(fuenteN);
  textAlign(CENTER, CENTER);
}
function mostrarpantalla(num, tam, posx, posy, post, ancho, alt, rojo=false) {
  image(imagenes[num], 0, 0, width, height);
  if (rojo) {
    fill(120, 20, 20, 180);
  } else {
    fill(10, 15, 18, 200);
  }
  noStroke();
  rect(posx-10, posy-30, ancho, alt, 15);

  fill(255);
  textSize(tam);
  textAlign(CENTER, CENTER);

  text(texto[post].replace(/\\n/g, "\n"), posx-10, posy-30, ancho, alt);
}
function pantalladecision(num1, num2, posx1, posx2, posy, ancho, alt) {
  textSize(17);
  //hover
  if (detectarzona(posx1-10, posy-30, ancho, alt)) {
    fill(120, 95, 55);
  } else {
    fill(60);
  }
  rect(posx1-10, posy-30, ancho, alt, alt/5);

  //hover2
  if (detectarzona(posx2-10, posy-30, ancho, alt)) {
    fill(120, 95, 55, 220);
  } else {
    fill(128, 128, 128, 150);
  }
  rect(posx2-10, posy-30, ancho, alt, alt/5);
  fill(255);
  text(texto[num1], posx1-10, posy-30, ancho, alt);
  text(texto[num2], posx2-10, posy-30, ancho, alt);
}
function elegir(x, y, tamx, tamy, destino) {
  if (detectarzona(x, y, tamx, tamy)) {
    pantalla = destino;
  }
}

function detectarzona(x, y, tamx, tamy) {
  if (mouseX>x && mouseX<x+tamx && mouseY>y && mouseY< y+tamy) {
    return true;
  } else {
    return false;
  }
}
function botones(x, y, tamx, tamy, nombre) {
  if (detectarzona(x, y, tamx, tamy)) {
    fill(120, 95, 55);
  } else {
    fill(60);
  }
  rect(x, y, tamx, tamy, tamy/4);
  textSize(tamy/3);
  fill(255);
  text(nombre, x+tamx/2, y+tamy/2);
}

function mousePressed() {

  if (detectarzona(10, 410, 25, 25)) {
    if (!musica.isPlaying()) {
      musica.play();
    } else {
      musica.stop();
    }
  }

  if (pantalla === 0) {
    if (detectarzona(350, 250, 110, 50)) {
      pantalla = 1;
    } else if (detectarzona(width/2-50, 350, 110, 50)) {
      pantalla = 20;
      iniciocreditos = millis();
    }

  } else if (pantalla === 20) {
    if (detectarzona(670, 370, 120, 50)) {
      pantalla = 0;
    }

  } else if (pantalla === 3) {
    elegir(70, 320, 320, 100, 4);
    elegir(440, 320, 320, 100, 13);

  } else if (pantalla === 5) {
    elegir(70, 320, 250, 70, 6);
    elegir(440, 320, 250, 70, 10);

  } else if (pantalla === 15) {
    elegir(70, 320, 250, 70, 18);
    elegir(440, 320, 250, 70, 16);

  } else if (pantalla === 9 || pantalla === 12 || pantalla === 17) {
    if (detectarzona(340, 370, 120, 50)) {
      pantalla = 0;
    }

  } else if (pantalla === 19) {
    if (detectarzona(670, 370, 120, 50)) {
      pantalla = 7;
    }

  } else if (detectarzona(670, 370, 120, 50)) {
    pantalla++;
  }
}
//elegir(x,y,tamx,tamy,destino)
function draw() {
  if (pantalla===0) {
    image(imagenes[0], 0, 0, width, height);
    botones(width/2-50, 250, 110, 50, "INICIAR");
    botones(width/2-50, 350, 110, 50, "CRÉDITOS");

  } else if (pantalla===1) {
    mostrarpantalla(1, 20, 10, 310, 2, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla===2) {
    mostrarpantalla(2, 20, 10, 310, 3, width, 120);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla===3) {
    mostrarpantalla(3, 20, 10, 40, 4, width, 80);
    pantalladecision(5, 6, 80, 450, 350, 320, 100);
    
  } else if (pantalla===4) {
    mostrarpantalla(4, 20, 10, 310, 7, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla===5) {
    mostrarpantalla(5, 20, 20, 30, 8, width-25, 120);
    pantalladecision(9, 10, 80, 450, 350, 250, 70);
    
  } else if (pantalla===6) {
    mostrarpantalla(6, 17, 10, 285, 11, width, 130);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla===7) {
    mostrarpantalla(7, 17, 10, 290, 12, width, 130);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla===8) {
    mostrarpantalla(8, 17, 10, 290, 13, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla===9) {
    mostrarpantalla(9, 17, 10, 290, 14, width, 100);
    botones(340, 370, 120, 50, "REINICIAR");
    
  } else if (pantalla === 10) {
    mostrarpantalla(10, 17, 10, 290, 15, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla === 11) {
    mostrarpantalla(11, 17, 10, 290, 16, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla === 12) {
    mostrarpantalla(12, 17, 10, 290, 17, width, 100, true);
    botones(340, 370, 120, 50, "REINICIAR");
    
  } else if (pantalla === 13) {
    mostrarpantalla(17, 17, 10, 290, 18, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla === 14) {
    mostrarpantalla(16, 17, 10, 290, 19, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla === 15) {
    mostrarpantalla(13, 17, 10, 250, 20, width, 60);
    pantalladecision(21, 22, 80, 450, 350, 250, 80);
    
  } else if (pantalla === 16) {
    mostrarpantalla(14, 17, 10, 290, 23, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla === 17) {
    mostrarpantalla(15, 17, 10, 40, 24, width, 100);
    fill(120, 20, 20, 180);
    noStroke();
    rect(150, 300, 500, 80, 15);

    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(texto[26], 150, 300, 500, 70);
    botones(340, 370, 120, 50, "REINICIAR");
    
  } else if (pantalla === 18) {
    mostrarpantalla(18, 17, 10, 290, 27, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
    
  } else if (pantalla === 19) {
    mostrarpantalla(6, 17, 10, 290, 28, width, 100);
    botones(670, 370, 120, 50, "SIGUIENTE");
  
  } else if (pantalla === 20) {
  image(imagenes[19], 0, 0, width, height);
  
  let tiempo = millis()-iniciocreditos;
  creditos("CRÉDITOS", 400, 80, 35, 0, tiempo);
  creditos("Serena Gerace", 400, 150, 25, 1500, tiempo);
  creditos("María Paz García", 400, 200, 25, 3000, tiempo);
  creditos("Comisión 1", 400, 260, 20, 4500, tiempo);
  creditos("Programación para medios interactivos orientada a las tecnologías web - 2026", 400, 310, 18, 6000, tiempo);
  fill(255);
  textSize(20);
  botones(670, 370, 120, 50, "VOLVER");
 }
  if (musica.isPlaying()) {
  image(musicoff, 10, 410, 25, 25);
 }  
   else {
  image(musicon, 10, 410, 25, 25);
 }
}
function creditos(contenido,x,y,tam,demora,tiempo) {
  let opacidad = tiempo-demora;

  if (opacidad>255) {
    opacidad=255;
  }

  if (opacidad<0) {
    opacidad=0;
  }

  fill(255, opacidad);
  textSize(tam);
  text(contenido,x,y);
}
