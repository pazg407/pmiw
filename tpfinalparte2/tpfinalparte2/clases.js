class jugador {

  constructor() {
    this.x=350;
    this.y=225;
    this.velocidad=3;
    this.sprite = 0;
    this.contador=0;
    this.contadorgolpe=0;
    this.atacando=false;
    this.golpe=0;
    this.direccion=1;
  }
 mover() {
  if (this.atacando == false) {
    if (keyIsDown(LEFT_ARROW)) {
      this.direccion = -1;
      if (escenario1.camX > 0) {
        escenario1.mover(-1, this.velocidad);
      }
      this.contador++;

    } else if (keyIsDown(RIGHT_ARROW)) {
      this.direccion = 1;
      if (escenario1.camX < 1600) {
        escenario1.mover(1, this.velocidad);
      }
      this.contador++;
    } else {
      this.sprite = 0;
      this.contador = 0;
    }

    if (this.contador >= 5) {
      this.sprite++;
      this.contador = 0;
    }

    if (this.sprite >= 10) {
      this.sprite = 0;
    }
  }
}
  mostrar() {
  push();
  translate(this.x + 35, this.y);
  scale(this.direccion, 1);

  if (this.atacando == true) {
    image(yutsunataca[this.golpe], -35, 0, 70, 120);
  } else {
    image(yutsun[this.sprite], -35, 0, 70, 120);
  }

  pop();
}
  atacar() {
    if (keyIsDown(80) && this.atacando==false) { //80 es la tecla P, con esa atacas
      this.atacando=true;
      this.golpe=0;
      this.contadorgolpe=0;
   }

    if (this.atacando==true) {
      this.contadorgolpe++;

      if (this.contadorgolpe>=5) {
        this.golpe++;
        this.contadorgolpe=0;
      }

      if (this.golpe>=6) {
        this.atacando=false;
        this.golpe=0;
      }
    }
  }
}

class escenario {

  constructor() {
    this.camX = 0;
  }

  mover(direccion, velocidad) {
    this.camX += direccion * velocidad;
    this.camX = constrain(this.camX, 0, 1600);
  }

  mostrar() {
    image(fondo, 0, 0, 800, 400, this.camX, 0, 800, 400);
  }
}

class enemigo {

  constructor() {
    this.x=escenario1.camX + 850;
    this.y=225;
    this.velocidad=1;
    this.sprite = 0;
    this.contador=0;
    this.vida = 3;
    this.direccion = -1;
    this.atacando = false;
    this.golpe = 0;
    this.contadorGolpe = 0;
  }
mostrar() {
   let posicionX = this.x - escenario1.camX;
  push();
  translate(posicionX + 35, this.y);
  scale(this.direccion, 1);
  if (this.atacando == true) {
    image(secuacesataca[this.golpe], -35, 0, 70, 120);
  } else {
    image(secuaces[this.sprite], -35, 0, 70, 120);
  }
  pop();
}
mover() {
  let jugadorX = escenario1.camX + yutsun1.x;

  if (this.atacando == false) {

    if (this.x > jugadorX + 60) { //derecha
   
      this.x -= this.velocidad;
      this.direccion = 1;
      this.contador++;

    } else if (this.x < jugadorX - 60) { //izq
      this.x += this.velocidad;
      this.direccion = -1;
      this.contador++;

    } else { //ataca
      this.contador = 0;
      this.sprite = 0;

      this.atacando = true;
      this.golpe = 0;
      this.contadorGolpe = 0;
    }

    if (this.contador >= 5) {
      this.sprite++;
      this.contador = 0;
    }

    if (this.sprite >= 9) {
      this.sprite = 0;
    }
  }
}
atacar() {
  if (this.atacando == true) {
  this.contadorGolpe++;

    if (this.contadorGolpe >= 5) {
    this.golpe++;
    this.contadorGolpe = 0;
    }

    if (this.golpe >= 9) {
    this.atacando = false;
    this.golpe = 0;
    }
 }
  }
   }
