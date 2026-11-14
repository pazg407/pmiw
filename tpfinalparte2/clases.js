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
    this.numeroataque=0;
    this.ultimoataque= 0; //para q el mismo ataque no t saque mas d una vida
   this.muriendo = false;
    this.spritemuerte = 0;
    this.contadormuerte = 0;
    this.ymuerte = this.y;
  this.saltando = false;
    this.subiendo = false;
    this.yBase = this.y;
    this.contadorsalto = 0;
    this.spritesalto = 0;
  }
  mover() {
    if (this.atacando === false) {
      if (keyIsDown(LEFT_ARROW)) {
        this.direccion = -1;
        if (juego.escenario.camX > 0) {
          juego.escenario.mover(-1, this.velocidad);
        }
        this.contador++;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.direccion = 1;
        if (juego.escenario.camX < 1600) {
          juego.escenario.mover(1, this.velocidad);
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
if (keyIsDown(UP_ARROW) && this.saltando === false) { //SALTO
    this.saltando = true;
    this.subiendo = true;
  }

  if (this.saltando === true) {
  this.contadorsalto++;

  if (this.contadorsalto >= 5) {
    this.spritesalto++;
    this.contadorsalto = 0;
  }

  if (this.spritesalto >= 4) {
    this.spritesalto = 0;
  }

  if (this.subiendo === true) {
    this.y -= 5;

    if (this.y <= this.yBase - 80) {
      this.subiendo = false;
    }
  } else {
    this.y += 3;

    if (this.y >= this.yBase) {
      this.y = this.yBase;
      this.saltando = false;
      this.spritesalto = 0;
      this.contadorsalto = 0;
    }
  }
}
}

mostrar() {
    push();
   if (this.muriendo === true) {
  translate(this.x + 35, this.ymuerte);
} else {
  translate(this.x + 35, this.y);
}
    scale(this.direccion, 1);

   if (this.muriendo === true) {
  image(muerte[this.spritemuerte], -35, 0, 60, 110);
} else if (this.saltando === true) {
  image(yutsunsalto[this.spritesalto], -35, 0, 70, 120);
} else if (this.atacando === true) {
  image(yutsunataca[this.golpe], -35, 0, 70, 120);
} else {
  image(yutsun[this.sprite], -35, 0, 70, 120);
}
pop();
  }
  
atacar() {
    if (keyIsDown(80) && this.atacando===false) { //80 es la tecla P, con esa atacas
      this.numeroataque++;
      this.atacando=true;
      this.golpe=0;
      this.contadorgolpe=0;
    }

    if (this.atacando===true) {
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
  
morir() {

  if (this.muriendo === false) {
    this.muriendo = true;
    this.spritemuerte = 0;
    this.contadormuerte = 0;
    this.ymuerte = this.y;
  }

  this.contadormuerte++;

  if (this.spritemuerte < 2) {
    if (this.contadormuerte >= 15) {
      this.spritemuerte++;
      this.contadormuerte = 0;
    }
  } else {
    this.ymuerte += 4;

    if (this.ymuerte > height) {
      juego.estado = "perdiste";
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

  constructor(escenario, posx) {
    this.escenario = escenario;
    this.x=posx
      this.y=225;
    this.velocidad=1;
    this.sprite = 0;
    this.contador=0;
    this.vida = 3;
    this.direccion = -1;
    this.atacando = false;
    this.golpe = 0;
    this.contadorgolpe = 0;
    this.restavida= false;
    this.ultimoataque=0;
  }
  mostrar() {
    if (this.vida<=0) {
      return; //para q se deje de dibujar
    }
    let posicionX = this.x - this.escenario.camX;
    push();
    translate(posicionX + 35, this.y);
    scale(this.direccion, 1);
    if (this.atacando === true) {
      image(secuacesataca[this.golpe], -35, 0, 70, 120);
    } else {
      image(secuaces[this.sprite], -35, 0, 70, 120);
    }
    pop();
  }
  mover() {
    if (this.vida<=0) {
      return; //para q se deje de dibujar
    }
    let jugadorX = this.escenario.camX + juego.jugador.x;

    if (this.atacando === false) {

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
        this.contadorgolpe = 0;
        this.restavida=false;
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
    if (this.vida<=0) {
      return; //para q se deje de dibujar
    }
    if (this.atacando === true) {
      this.contadorgolpe++;

      if (this.contadorgolpe >= 5) {
        this.golpe++;
        this.contadorgolpe = 0;
      }

      if (this.golpe >= 9) {
        this.atacando = false;
        this.golpe = 0;
      }
    }
  }
  //esto es para sacarle vida a lso enemigos
  recibirgolpe() {
    this.vida--;
  }
}
