class principal {

  constructor() {
    this.escenario = new escenario();
    this.jugador = new jugador();
    this.enemigos = [];
    this.vidas = 6;
    this.estado = "inicio";
    this.oleada = 1;
    this.opacidad = 0;

    for (let i = 0; i < 2; i++) {
      this.enemigos[i] = new enemigo(this.escenario, 850 + i * 300);
    }
  }

  inicio() {
    image(pantallainicio, 0, 0, width, height);
    this.mostrartexto("LA EMBOSCADA", 400, 45, 28, color(255, 210, 0));
    this.mostrartexto("VS", 400, 205, 85, color(255, 190, 0));
    this.dibujarboton("CREDITOS", 10, 10, 170, 35, color(40), color(0), color(255));
    this.dibujarboton("JUGAR", 315, 255, 170, 40, color(255, 210, 0), color(0), color(0));
    this.dibujarboton("TUTORIAL", 315, 325, 170, 40, color(40), color(0), color(255));
  }
  mostrartexto(texto, x, y, tam, colortexto, opacidad=255) {
    textAlign(CENTER, CENTER);
    textSize(tam);
    fill(red(colortexto), green(colortexto), blue(colortexto), opacidad);
    stroke(0);
    strokeWeight(5);
    text(texto, x, y);
  }
  dibujarboton(texto, x, y, ancho, alto, colorfondo, colorborde, colortexto) {
    fill(colorfondo);
    stroke(colorborde);
    strokeWeight(3);
    rect(x, y, ancho, alto, 8);
    noStroke();
    fill(colortexto);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(texto, x + ancho/2, y + alto/2);
  }
  iconomusica() {
    if (musica.isPlaying()) {
      image(musicoff, 10, 365, 25, 25);
    } else {
      image(musicon, 10, 365, 25, 25);
    }
  }

  dibujar() {

    if (this.estado === "inicio") {
      this.inicio();
      this.iconomusica();
      return;
    } else if (this.estado === "muriendo") {
      this.escenario.mostrar();

      for (let i = 0; i < 2; i++) {
        this.enemigos[i].mostrar();
      }
      this.jugador.morir();
      this.jugador.mostrar();
      this.iconomusica();
      return;
    } else if (this.estado === "perdiste") {
      background(0);
      this.mostrartexto("¡PERDISTE!", width/2, 150, 40, color(255, 210, 0));
      this.dibujarboton("REINTENTAR", 275, 215, 250, 65, color(255, 210, 0), color(0), color(0));
      this.iconomusica();
      return;
    } else if (this.estado === "ganaste") {
      background(0);
      this.mostrartexto("¡GANASTE!", width/2, 150, 40, color(255, 210, 0));
      this.dibujarboton("REINICIAR", 275, 215, 250, 65, color(255, 210, 0), color(0), color(0));
      this.iconomusica();
      return;
    } else if (this.estado === "tutorial") {
      image(controles, 110, 0, 600, 300);
      fill(255);
      textSize(15);
      text("Tendrás que matar a los enemigos que se interponen en tu camino hacia el tren.", 0, 320, width, 50);
      this.dibujarboton("VOLVER", 620, 355, 170, 35, color(40), color(0), color(255));
      this.iconomusica();
      return;
    } else if (this.estado === "creditos") {
      background(0);
      if (this.opacidad<255) {
        this.opacidad+=3;
      }
      this.mostrartexto("CRÉDITOS", width/2, 70, 40, color(255, 210, 0), this.opacidad);
      this.mostrartexto("Serena Gerace", width/2, 150, 25, color(255), this.opacidad);
      this.mostrartexto("María Paz García", width/2, 190, 25, color(255), this.opacidad);
      this.mostrartexto("El jardín de senderos que se bifurcan", width/2, 240, 20, color(255), this.opacidad);
      this.mostrartexto("Comisión 1", width/2, 280, 15, color(255), this.opacidad);
      this.dibujarboton("VOLVER", 620, 355, 170, 35, color(40), color(0), color(255));
      this.iconomusica();
      return;
    }

    // juego normal
    this.escenario.mostrar();
    this.jugador.mover();
    this.jugador.atacar();
    this.jugador.mostrar();

    for (let i = 0; i < 2; i++) {
      this.enemigos[i].mover();
      this.enemigos[i].atacar();
      this.enemigos[i].mostrar();
      this.enemigos[i].mostrarvida();
    }

    this.detectarcolision();

    for (let i = 0; i < 6; i++) {
      if (this.vidas === i + 1) {
        image(vidasjugador[i], 20, 20, 150, 50);
      }
    }

    this.agregarenemigos();
    this.iconomusica();
  }
  reiniciar() {
    this.escenario = new escenario();
    this.jugador = new jugador();
    this.enemigos = [];
    this.vidas = 6;
    this.oleada = 1;
    this.estado = "inicio";

    for (let i = 0; i < 2; i++) {
      this.enemigos[i] = new enemigo(this.escenario, 850 + i * 300);
    }
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
    for (let i = 0; i < 2; i++) {
      if (this.enemigos[i].atacando === true && this.enemigos[i].golpe >= 3 && this.enemigos[i].restavida === false && this.jugador.saltando === false && this.jugador.saltando === false ) {
        this.perdervida();
        this.enemigos[i].restavida = true;
      }
    }
    for (let i = 0; i < 2; i++) {
      let enemigo = this.enemigos[i];
      let jugadorX = this.escenario.camX + this.jugador.x;

      if (this.jugador.atacando === true && enemigo.ultimoataque!== this.jugador.numeroataque && ((enemigo.x > jugadorX && enemigo.x - jugadorX < 70) ||(enemigo.x < jugadorX && jugadorX - enemigo.x < 70))) {
        enemigo.recibirgolpe();
        enemigo.ultimoataque= this.jugador.numeroataque;
        //este if delimita la distancia en la q tiene q estar el jugador y el enemigo para q el golpe impacte
      }
    }
  }
  agregarenemigos() { //si detecta que murieron los 2 secuaces, manda la segunda oleada
    let muertos = 0;

    for (let i = 0; i < 2; i++) {
      if (this.enemigos[i].vida <= 0) {
        muertos++;
      }
    }

    if (muertos === 2) {
      if (this.oleada === 1) {
        this.oleada = 2;

        for (let i = 0; i < 2; i++) {
          this.enemigos[i] = new enemigo(this.escenario, 1000 + i * 300);
        }
      } else if (this.oleada === 2) {
        this.estado = "ganaste";
      }
    }
  }

  detectarboton() {
    if (mouseIsPressed) {

      if (this.estado === "inicio") {

        if (mouseX > 315 && mouseX < 485 && mouseY > 255 && mouseY < 295) {
          this.estado = "jugando";
        } else if (mouseX > 315 && mouseX < 485 && mouseY > 325 && mouseY < 365) {
          this.estado = "tutorial";
        } else if (mouseX > 10 && mouseX < 180 && mouseY > 10 && mouseY < 45) {
          this.estado = "creditos";
          this.opacidad = 0;
        }
      } else if (this.estado === "tutorial" || this.estado === "creditos") {

        if (mouseX > 620 && mouseX < 790 && mouseY > 355 && mouseY < 390) {
          this.estado = "inicio";
        }
      } else if (this.estado === "perdiste" || this.estado === "ganaste") {

        if (mouseX > 275 && mouseX < 525 && mouseY > 215 && mouseY < 280) {
          this.reiniciar();
        }
      }
    }
  }
}
function mousePressed() { // para q funcione el boton d la musica
  if (mouseX > 10 && mouseX < 35 && mouseY > 365 && mouseY < 390) {
    if (musica.isPlaying()) {
      musica.pause();
    } else {
      musica.play();
    }
  } else {
    juego.detectarboton();
  }
}
