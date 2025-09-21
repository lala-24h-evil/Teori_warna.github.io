class Bentuk {
  constructor(x, y, warna) {
    this.x = x;
    this.y = y;
    this.warna = color(warna);
    this.scale = 5;
    this.offset = random(100);
  }

  tampilHati() {
    fill(this.warna);
    noStroke();
    beginShape();
    for (let t = 0; t < TWO_PI; t += 0.01) {
      let x = 16 * pow(sin(t), 3);
      let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(this.x + x * this.scale, this.y + y * this.scale);
    }
    endShape(CLOSE);
  }

  gerak() {
    this.offset += 0.03;
    this.y = height / 2 + sin(this.offset) * 20;
  }

  gantiWarna(warna) {
    this.warna = color(warna);
  }

  static campur(a, b) {
    let r = (red(a.warna) + red(b.warna)) / 2;
    let g = (green(a.warna) + green(b.warna)) / 2;
    let b2 = (blue(a.warna) + blue(b.warna)) / 2;
    return color(r, g, b2);
  }
}

let bentuk1, bentuk2;
let bentukGabungan = null;
let teksWarna = "Putih";

const namaWarna = {
  red: "Merah",
  blue: "Biru",
  yellow: "Kuning",
  green: "Hijau",
  purple: "Ungu",
  orange: "Oranye",
  white: "Putih",
  pink: "Pink",
  cyan: "Cyan",
  brown: "Cokelat",
  black: "Hitam"
};

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas-container");

  bentuk1 = new Bentuk(width / 2 - 120, height / 2, "red");
  bentuk2 = new Bentuk(width / 2 + 120, height / 2, "blue");

  // Kontainer kontrol
  let controls = createDiv();
  controls.id("controls");
  controls.parent("canvas-container");
  controls.style("display", "flex");
  controls.style("justify-content", "center");
  controls.style("gap", "10px");
  controls.style("margin-top", "15px");
  controls.style("flex-wrap", "wrap");

  // dropdown warna bentuk1
  let select1 = createSelect();
  for (let w in namaWarna) select1.option(namaWarna[w], w);
  select1.changed(() => ubahWarna1(select1.value()));
  styleSelect(select1);
  select1.parent("controls");

  // tombol gabung
  let btnGabung = createButton("❤️ Gabungkan (G)");
  btnGabung.mousePressed(gabungkan);
  styleButton(btnGabung, "#ff4d94");
  btnGabung.parent("controls");

  // dropdown warna bentuk2
  let select2 = createSelect();
  for (let w in namaWarna) select2.option(namaWarna[w], w);
  select2.changed(() => ubahWarna2(select2.value()));
  styleSelect(select2);
  select2.parent("controls");

  // tombol reset
  let btnReset = createButton("🔄 Reset (R)");
  btnReset.mousePressed(resetWarna);
  styleButton(btnReset, "#ff8000");
  btnReset.parent("controls");
}

function draw() {
  background("#ffe6f0");

  if (bentukGabungan) {
    bentukGabungan.gerak();
    bentukGabungan.tampilHati();
  } else {
    bentuk1.gerak();
    bentuk1.tampilHati();

    bentuk2.gerak();
    bentuk2.tampilHati();
  }

  fill(80);
  textSize(18);
  textAlign(CENTER);
  text("Warna: " + teksWarna, width / 2, height - 30);
}

// styling dropdown
function styleSelect(sel) {
  sel.style("padding", "8px 15px");
  sel.style("border", "2px solid #ff4d94");
  sel.style("border-radius", "8px");
  sel.style("background", "white");
  sel.style("font-size", "14px");
  sel.style("cursor", "pointer");
}

// styling tombol
function styleButton(btn, warna) {
  btn.style("padding", "8px 15px");
  btn.style("border", "none");
  btn.style("border-radius", "8px");
  btn.style("background", warna);
  btn.style("color", "white");
  btn.style("font-weight", "bold");
  btn.style("cursor", "pointer");
}

// fungsi warna
function ubahWarna1(warna) {
  bentuk1.gantiWarna(warna);
}

function ubahWarna2(warna) {
  bentuk2.gantiWarna(warna);
}

function gabungkan() {
  let hasil = Bentuk.campur(bentuk1, bentuk2);
  bentukGabungan = new Bentuk(width / 2, height / 2, hasil);
  teksWarna = "Campuran";
  bentuk1 = null;
  bentuk2 = null;
}

function resetWarna() {
  bentukGabungan = null;
  bentuk1 = new Bentuk(width / 2 - 120, height / 2, "white");
  bentuk2 = new Bentuk(width / 2 + 120, height / 2, "white");
  teksWarna = "Putih";
}

// kontrol keyboard
function keyPressed() {
  if (key === "r" || key === "R") resetWarna();
  if (key === "g" || key === "G") gabungkan();
}
