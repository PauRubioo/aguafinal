let litrosChamarra  = 10000;
let litrosPlayera   = 2700;
let litrosPantalon  = 7000;
let litrosRopaInt   = 2000;
let litrosZapatos   = 4000;
let litrosGorra = 800;
let litrosAccesorios = 50;
let litrosLentes = 500;
let litrosMochila = 10000;
let litrosCinturon = 2200;

// ---- cuántas veces se presionó cada botón ----
let vecesC = 0;   // chamarra
let vecesP = 0;   // playera
let vecesPa = 0;  // pantalon
let vecesR = 0;   // ropa interior
let vecesZ = 0;   // zapatos
let vecesG = 0;   // gorra
let vecesA = 0;
let vecesL = 0;
let vecesM = 0;
let vecesCi = 0;
// ---- para animar la ola ----
let ola = 0;

// ---- glitch ----
let timerGlitch = 0;

// ---- imágenes ----
let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10;
preload + setup
function preload() {
  img1 = loadImage("/assets/chamarra.png");
  img2 = loadImage("/assets/playera.png");
  img3 = loadImage("/assets/pantalon.png");
  img4 = loadImage("/assets/calcetines.png");
  img5 = loadImage("/assets/zapatos.png");
  img6 =  loadImage("/assets/gorra.png");
  img7 =  loadImage("/assets/accesorios.png");
  img8 =  loadImage("/assets/lentes.png");
  img9 =  loadImage("/assets/mochila.png");
  img10 =  loadImage("/assets/cinturon.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  textFont("Georgia");
}
function draw() {

  // 1. SUMAR litros según cuántas veces presionaron cada botón
  let total = 0;
  total = total + (vecesC  * litrosChamarra);
  total = total + (vecesP  * litrosPlayera);
  total = total + (vecesPa * litrosPantalon);
  total = total + (vecesR  * litrosRopaInt);
  total = total + (vecesZ  * litrosZapatos);
  total = total + (vecesG  * litrosGorra);
  total = total + (vecesA  * litrosAccesorios);
  total = total + (vecesL  * litrosLentes);
  total = total + (vecesM  * litrosMochila);
  total = total + (vecesCi * litrosCinturon);
  // 2. CALCULAR qué tan "sucio" está el mundo (0 = limpio, 1 = apocalipsis)
  //    usamos min() para que no pase de 1 aunque sigan haciendo clic
  let suciedad = min(total / 50000, 1);
  let sucio    = min(total / 10000, 1);

  // 3. COLORES que cambian con la suciedad
  //    lerpColor mezcla dos colores según un valor de 0 a 1
  let colorFondo  = lerpColor(color(200,230,255), color(10,5,20),  suciedad);
  let colorAgua   = lerpColor(color(100,200,255), color(40,0,60),   suciedad);
  let colorTexto  = lerpColor(color(50,80,150),  color(200,0,80),   suciedad);

  // 4. FONDO
  background(colorFondo);

  // 5. AGUA que baja (empieza llena arriba y va bajando)
  //    nivel 1 = lleno (superficie arriba), nivel 0 = vacío (superficie abajo)
  let nivel = 1 - suciedad;
  dibujarAgua(nivel, colorAgua);

  // 6. TÍTULO — cambia de tierno a tétrico
  noStroke();
  fill(colorTexto);
  textSize(70);
  textAlign(CENTER);
  text("s/agua", width/2, 85);

  textSize(20);
  text("¿Cuántas prendas traes hoy?", width/2, 120);

  // 7. CONTADOR de litros
  fill(0, 0, 0, 120);
  rect(width/2 - 170, 138, 340, 75, 12);
  fill(colorTexto);
  textSize(42);
  text(total + " litros", width/2, 192);

  // 8. BOTONES
  dibujarBoton(140, 490, img1, "Chamarra",   vecesC,  litrosChamarra, suciedad);
  dibujarBoton(330, 490, img2, "Playera",    vecesP,  litrosPlayera,  suciedad);
  dibujarBoton(520, 490, img3, "Pantalón",   vecesPa, litrosPantalon, suciedad);
  dibujarBoton(710, 490, img4, "Ropa int.",  vecesR,  litrosRopaInt,  suciedad);
  dibujarBoton(900, 490, img5, "Zapatos",    vecesZ,  litrosZapatos,  suciedad);
  dibujarBoton(1090, 490, img6, "Gorra",     vecesG,  litrosGorra,  suciedad);
  dibujarBoton(1280, 490, img7, "Accesorios", vecesA,  litrosAccesorios,  suciedad);
  dibujarBoton(1470, 490, img8, "Lentes",     vecesL,  litrosLentes,  suciedad);
  dibujarBoton(1660, 490, img9, "Mochila",    vecesM,  litrosMochila,  suciedad);
  dibujarBoton(1850, 490, img10, "Cinturón",   vecesCi, litrosCinturon, suciedad);
  // 9. GLITCH si la suciedad es alta
  if (suciedad > 0.6) {
    aplicarGlitch(suciedad);
    timerGlitch = timerGlitch + 1;
  } else {
    timerGlitch = 0;
  }

  ola = ola + 0.02; // mueve la ola cada frame
}

function dibujarAgua(nivel, colorAgua) {

  // yAgua = donde está la superficie del agua
  // nivel 1 → superficie arriba (y=0), nivel 0 → superficie abajo (y=height)
  let yAgua = height - (height * nivel);

  // rectángulo del agua: desde la superficie hasta el fondo
  noStroke();
  fill(red(colorAgua), green(colorAgua), blue(colorAgua), 160);
  rect(0, yAgua, width, height - yAgua);

  // ola encima: curva de seno animada
  fill(red(colorAgua), green(colorAgua), blue(colorAgua), 120);
  beginShape();
  vertex(0, height);
  for (let x = 0; x <= width; x = x + 10) {
    let y = yAgua + sin(x * 0.02 + ola) * 10;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function dibujarBoton(x, y, img, nombre, veces, litros, suciedad) {
  let tam = 150;

  // color del botón cambia según la suciedad general
  // lerpColor mezcla celeste tierno → oscuro tétrico
  let colorBtn = lerpColor(color(180,220,255), color(40,5,50), suciedad);

  // borde más grueso si fue presionado al menos una vez
  if (veces > 0) {
    stroke(255, 80 - suciedad*80, 120);
    strokeWeight(3);
  } else {
    stroke(150, 200, 240);
    strokeWeight(1);
  }

  fill(colorBtn);
  rect(x, y, tam, tam, 14);

  // imagen de la prenda
  noStroke();
  image(img, x + 25, y + 12, 100, 90);

  // nombre de la prenda
  fill(30, 50, 100);
  textSize(14);
  textAlign(CENTER);
  text(nombre, x + tam/2, y + tam + 20);

  // litros de esa prenda
  fill(80, 120, 180);
  textSize(12);
  text(litros + " L c/u", x + tam/2, y + tam + 36);

  // contador de cuántas veces se presionó (x1, x2, x3...)
  if (veces > 0) {
    fill(255, 80, 120);
    textSize(16);
    text("x" + veces, x + tam/2, y + tam + 55);
  }
}
function mousePressed() {
  // cada botón tiene su zona: x, y, hasta x+150, y+150
  if (mouseX >= 140  && mouseX <= 290  && mouseY >= 490 && mouseY <= 640) vecesC  = vecesC  + 1;
  if (mouseX >= 330  && mouseX <= 480  && mouseY >= 490 && mouseY <= 640) vecesP  = vecesP  + 1;
  if (mouseX >= 520  && mouseX <= 670  && mouseY >= 490 && mouseY <= 640) vecesPa = vecesPa + 1;
  if (mouseX >= 710  && mouseX <= 860  && mouseY >= 490 && mouseY <= 640) vecesR  = vecesR  + 1;
  if (mouseX >= 900  && mouseX <= 1050 && mouseY >= 490 && mouseY <= 640) vecesZ  = vecesZ  + 1;
  if (mouseX >= 1090 && mouseX <= 1240 && mouseY >= 490 && mouseY <= 640) vecesG  = vecesG  + 1;
  if (mouseX >= 1280 && mouseX <= 1430 && mouseY >= 490 && mouseY <= 640) vecesA  = vecesA  + 1;
  if (mouseX >= 1470 && mouseX <= 1620 && mouseY >= 490 && mouseY <= 640) vecesL  = vecesL  + 1;
  if (mouseX >= 1660 && mouseX <= 1810 && mouseY >= 490 && mouseY <= 640) vecesM  = vecesM  + 1;
  if (mouseX >= 1850 && mouseX <= 2000 && mouseY >= 490 && mouseY <= 640) vecesCi = vecesCi + 1;
  if (mouseX >= 2040 && mouseX <= 2190 && mouseY >= 490 && mouseY <= 640) vecesCo = vecesCo + 1;
}

function aplicarGlitch(suciedad) {

  // más suciedad = más glitch
  // floor(map(suciedad, 0.6, 1, 2, 12)) calcula cuántas franjas hacer
  let numFranjas = floor(map(suciedad, 0.6, 1, 2, 12));

  // franjas desplazadas (slice glitch)
  for (let i = 0; i < numFranjas; i++) {
    let fy = random(height);
    let fh = random(4, 25);
    let dx = random(-30, 30);
    copy(0, fy, width, fh, dx, fy, width, fh);
  }

  // líneas de color cada ciertos frames
  if (timerGlitch % 5 === 0) {
    for (let i = 0; i < 4; i++) {
      fill(random(150,255), 0, random(100,200), 180);
      noStroke();
      rect(0, random(height), width, random(1, 5));
    }
  }

  // texto que parpadea cuando es muy intenso
  if (suciedad > 0.85 && timerGlitch % 8 < 4) {
    fill(255, 0, 80, 200);
    textSize(random(40, 70));
    textAlign(CENTER);
    text("Podrias estar dejando sin agua a otros", width/2 + random(-10,10), random(300, 600));
  }

  
}