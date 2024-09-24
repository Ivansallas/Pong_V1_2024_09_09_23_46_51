//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;
let resetBolinhaAtivado = false;
//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  fill("yellow")
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  fill("white")
  rect(x, y, raqueteComprimento,
    raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete = constrain(yRaquete - 10, 0, height - raqueteAltura);
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete = constrain(yRaquete + 10, 0, height - raqueteAltura);
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = (yBolinha - yRaqueteOponente - raqueteAltura / 2) * 0.1;
  yRaqueteOponente = constrain(yRaqueteOponente + velocidadeYOponente, 0, height - raqueteAltura);
}


function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura,
    xBolinha, yBolinha, raio);
  if (colidiu) {
    let diferencaY = yBolinha - (y + raqueteAltura / 2);
    velocidadeYBolinha = diferencaY * 0.2; // Ajusta o ângulo da bolinha
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}


function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);

  // Placar do jogador
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);

  // Placar do oponente
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}


function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

