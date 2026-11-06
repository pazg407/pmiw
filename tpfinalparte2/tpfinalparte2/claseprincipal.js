class principal {

  constructor() {
    this.jugador = new jugador();
    this.enemigo = new enemigo();
    this.escenario = new escenario();
    this.vidas = 3;
    
//detectarColision()
perdervida() {
    this.vidas--;

    if (this.vidas <= 0) {
      this.estado = "perdiste";
