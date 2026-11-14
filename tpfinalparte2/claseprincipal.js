class principal {

  constructor() {
    this.escenario = new escenario();
    this.jugador = new jugador();
    this.enemigos = [];
    this.vidas = 6;
    this.estado = "inicio";
    this.oleada = 1;
    

    for (let i = 0; i < 3; i++) {
      this.enemigos[i] = new enemigo(this.escenario, 850 + i * 300);
    }
  }

  inicio() {
    image(pantallainicio, 0, 0, 800, 400);

    textAlign(CENTER, CENTER);
    textSize(28);
    fill(255, 210, 0);
    stroke (0);
     strokeWeight(5)
    text("YU TSUN", 400, 45);

   textSize(85);
  fill(255, 190, 0);
  stroke (0);
  strokeWeight(5)
    text("VS", 400, 205);

//jugar
  fill(255, 210, 0);
  rect(315, 290, 170, 45, 8);
    noStroke();
    fill(0);
    textSize(20);
    text("JUGAR", 400, 312);

//tutorial
    fill(40);
    rect(315, 345, 170, 40, 8);
    noStroke();
    fill(255);
    textSize(16);
    text("TUTORIAL", 400, 365);
  }
  dibujar() {
     if (this.estado === "inicio") {
    this.inicio();
    return;
  }
   
if (this.estado === "muriendo") {
  this.escenario.mostrar();

  for (let i = 0; i < 3; i++) {
    this.enemigos[i].mostrar();
  }
  this.jugador.morir();
  this.jugador.mostrar();
  return;
}

if (this.estado === "perdiste") {
  background(0);
  fill(255, 210, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("¡PERDISTE!", width/2, 150);

  fill(255, 210, 0);
  rect(275, 215, 250, 65, 15);

  fill(0);
  textSize(18);
  text("REINTENTAR", width/2, 247);

  return;
}

if (this.estado === "ganaste") {
  background(0);
  fill(255, 210, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("¡GANASTE!", width/2, 150);

  return;
}

  
 //juego normal!!!!
    this.escenario.mostrar();
    this.jugador.mover();
    this.jugador.atacar();
    this.jugador.mostrar();
 
    for (let i = 0; i < 3; i++) {
      this.enemigos[i].mover();
      this.enemigos[i].atacar();
      this.enemigos[i].mostrar();
    }
 this.detectarcolision(); 
   for (let i=0; i<6; i++) {
      if (this.vidas === i + 1) {
        image(vidasjugador[i], 20, 20, 150, 50);
      }
    }
this.agregarenemigos();
  }
  perdervida() { //para yutsun
    if (this.vidas>0) {
      this.vidas--;
    }

    if (this.vidas === 0) {
    this.estado = "muriendo";
  }
}
 
  detectarcolision() {
    for (let i = 0; i < 3; i++) {
      if (this.enemigos[i].atacando === true && this.enemigos[i].golpe >= 3 && this.enemigos[i].restavida === false && this.jugador.saltando === false && this.jugador.saltando === false ) {
        this.perdervida();
        this.enemigos[i].restavida = true
        this.jugador.saltando === false;
      }
    }
    for (let i = 0; i < 3; i++) {
      let enemigo = this.enemigos[i];
      let jugadorX = this.escenario.camX + this.jugador.x;

      if (this.jugador.atacando === true && enemigo.ultimoataque!== this.jugador.numeroataque && ((enemigo.x > jugadorX && enemigo.x - jugadorX < 70) ||(enemigo.x < jugadorX && jugadorX - enemigo.x < 70))) {
        enemigo.recibirgolpe(); 
        enemigo.ultimoataque= this.jugador.numeroataque;
        //este if delimita la distancia en la q tiene q estar el jugador y el enemigo para q el golpe impacte
      }
    }
  }
agregarenemigos() { //si detecta que murieron los 3 secuaces, manda la segunda oleada
  let muertos = 0;

  for (let i = 0; i < 3; i++) {
    if (this.enemigos[i].vida <= 0) {
      muertos++;
    }
  }

  if (muertos === 3) {
    if (this.oleada === 1) {
      this.oleada = 2;

      for (let i = 0; i < 3; i++) {
        this.enemigos[i] = new enemigo(this.escenario, 1000 + i * 300);
      }

    } else if (this.oleada === 2) {
      this.estado = "ganaste";
    }
  }
}
controlarbotones() {
   if (mouseIsPressed) {
if (this.estado === "inicio") {
    if (mouseX > 315 && mouseX < 485 && mouseY > 290 && mouseY < 335) {
        this.estado = "jugando";
   }
  }      
    
  if (this.estado === "perdiste") {
      if (mouseX > 275 && mouseX < 525 &&
          mouseY > 215 && mouseY < 280) {
        juego = new principal();
      }
    }

  }  }
}
