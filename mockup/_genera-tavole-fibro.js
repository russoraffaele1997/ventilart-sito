// Genera le 4 tavole della stratigrafia del fibrocemento (in mockup/_stratigrafie/).
// Schema dei sistemi preso dalle guide di posa EQUITONE (Planning & Application Guide UK) e Swisspearl (DIM):
//  - a vista, alluminio: staffe a L con taglio termico, profilo a T dietro il giunto verticale tra due pannelli,
//    profilo a L intermedio al centro del pannello, rivetti a testa larga (punti fissi e scorrevoli);
//  - sistema a omega: profili omega in lamiera zincata fissati direttamente alla muratura (niente staffe né T), rivetti inox;
//  - a scomparsa: profili verticali + profili orizzontali di aggancio; ganci (agraffe) fissati sul retro del
//    pannello con tasselli a sottosquadro, che si appendono ai profili orizzontali.
// Muratura, lana di roccia e staffe sono presi dalla tavola del ceramico a T, con la stessa assonometria.
// Uso: node mockup/_genera-tavole-fibro.js
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "_stratigrafie");

// assonometria dei disegni originali: x lungo il muro, y in altezza, z verso l'esterno
const P = (x, y, z) => [x + 0.52 * z, -0.25641 * x - y + 0.36 * z];
const pt = (p) => p.map((v) => v.toFixed(1)).join(",");
const poly = (pts, fill, cls = "e") => `<polygon class="${cls}" points="${pts.map(pt).join(" ")}" fill="${fill}"/>`;
const tratteggio = (pts) => `<polygon points="${pts.map(pt).join(" ")}" fill="none" stroke="#1f2a33" stroke-opacity=".7" stroke-width="1.3" stroke-dasharray="5 4"/>`;

// parallelepipedo: si vedono la faccia sinistra, quella davanti e quella sopra
function scatola([x0, x1], [y0, y1], [z0, z1], col) {
  return poly([P(x0, y0, z0), P(x0, y0, z1), P(x0, y1, z1), P(x0, y1, z0)], col.lato) +
    poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], col.fronte) +
    poly([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], col.sopra);
}
const FIBRO = { fronte: "#8e9396", sopra: "#b3b7ba", lato: "#6f7477" };
const ALU = { lato: "#9aa3ad", fronte: "#d3d9de", sopra: "#e6eaed" };      // come i profili delle tavole originali
const ZINC = { lato: "#8c949b", fronte: "#bcc3c8", sopra: "#d9dee1" };     // acciaio zincato, un filo più scuro
const GANCIO = { lato: "#7f8890", fronte: "#aab3bb", sopra: "#cfd5da" };

// grana del pannello, sempre uguale
let seme = 7;
const caso = () => ((seme = (seme * 16807) % 2147483647) / 2147483647);
function grana(x0, x1, y0, y1, z) {
  let s = "";
  const n = Math.round(((x1 - x0) * (y1 - y0)) / 900);
  for (let i = 0; i < n; i++) {
    const [px, py] = P(x0 + 5 + caso() * (x1 - x0 - 10), y0 + 5 + caso() * (y1 - y0 - 10), z);
    s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(0.5 + caso() * 1.1).toFixed(1)}" fill="${caso() < 0.5 ? "#a9adb0" : "#6c7174"}" opacity=".6"/>`;
  }
  return s;
}
function rivetto(x, y, z) {
  const cerchio = (r) => Array.from({ length: 18 }, (_, i) => P(x + r * Math.cos((i / 18) * 2 * Math.PI), y + r * Math.sin((i / 18) * 2 * Math.PI), z));
  return poly(cerchio(7), "#d9dde0") + `<polygon points="${cerchio(2).map(pt).join(" ")}" fill="#8a939d"/>`;
}
function richiamo(n, [px, py], bx) {
  const a = px.toFixed(1), b = py.toFixed(1);
  return `<g class="callout"><line class="lead-halo" x1="${a}" y1="${b}" x2="${bx}" y2="${b}"/><line class="lead" x1="${a}" y1="${b}" x2="${bx}" y2="${b}"/><circle class="dot" cx="${a}" cy="${b}" r="4"/><circle class="badge" cx="${bx}" cy="${b}" r="17"/><text class="num" x="${bx}" y="${(py + 6).toFixed(1)}">${n}</text></g>`;
}

// --- profili verticali (c = asse della staffa; faccia esterna dei profili a z = 176) ---------------------------
const ZF = 176;
const PROFILO = {
  // ogni profilo ha due parti, disegnate dove nel disegno originale c'erano anima e ala (così l'ordine con le staffe resta giusto)
  T: { dietro: (c, y, col) => scatola([c - 1.6, c + 1.6], y, [105, 170], col), davanti: (c, y, col) => scatola([c - 35.1, c + 35.1], y, [170, ZF], col) },
  L: { dietro: (c, y, col) => scatola([c - 1.6, c + 1.6], y, [105, 170], col), davanti: (c, y, col) => scatola([c - 1.6, c + 48.4], y, [170, ZF], col) },
  // omega a cappello: la parte larga (110) verso il pannello, i piedini verso il muro; il fianco sinistro è sulla staffa
  omega: {
    dietro: (c, y, col) => scatola([c - 21.6, c - 1.6], y, [140, 142.5], col) + scatola([c + 108.4, c + 128.4], y, [140, 142.5], col) +
      scatola([c - 1.6, c + 0.9], y, [140, 173], col) + scatola([c + 105.9, c + 108.4], y, [140, 173], col),
    davanti: (c, y, col) => scatola([c - 1.6, c + 108.4], y, [173, ZF], col),
  },
  Z: {
    dietro: (c, y, col) => scatola([c - 41.6, c - 1.6], y, [140, 142.5], col) + scatola([c - 1.6, c + 1.6], y, [142.5, 173], col),
    davanti: (c, y, col) => scatola([c - 1.6, c + 38.4], y, [173, ZF], col),
  },
};

// --- base presa dalla tavola del ceramico a T: muratura, lana, staffe; i profili vengono ridisegnati -----------
const TOGLI = /fill="#(c9ccc8|eef0ec|fafbf8|1c1d1f|2f3134|55595e|c2b8a4|e7e0d1|f3eee4)"/; // biadesivo, silicone, lastra
function base(profili, col) {
  const src = fs.readFileSync(path.join(DIR, "ceramico-T-silicone.html"), "utf8");
  const fig = src.match(/<div class="figure">(<svg[^>]*>)(<style>[\s\S]*?<\/style>)([\s\S]*?)<\/svg><\/div>/);
  let corpo = fig[3]
    .replace(/<g(?: class="callout")?>[\s\S]*?<\/g>/g, "")
    .replace(/<polygon [^>]*>/g, (t) => (TOGLI.test(t) ? "" : t))
    .replace(/<circle cx="[^"]+" cy="[^"]+" r="[^"]+" fill="#(fbf8f1|b9ae98)" opacity="\.7"\/>/g, "");
  // i profili originali sono terne di poligoni (lato #9aa3ad, fronte #d3d9de, sopra #e6eaed): li sostituisco
  corpo = corpo.replace(/<polygon class="e" points="([^"]+)" fill="#9aa3ad"\/><polygon [^>]*fill="#d3d9de"\/><polygon [^>]*fill="#e6eaed"\/>/g, (m, pts) => {
    const p = pts.split(" ").map((q) => q.split(",").map(Number));
    const destra = p[0][0] > 500, c = destra ? 624 : 234;
    const anima = Math.abs(p[1][0] - p[0][0]) > 20;
    const x0 = anima ? c - 1.6 : c - 35.1, z0 = anima ? 105 : 170;
    const yDa = (q) => +(-0.25641 * x0 + 0.36 * z0 - q[1]).toFixed(1);
    const tipo = profili[destra ? 1 : 0];
    return PROFILO[tipo][anima ? "dietro" : "davanti"](c, [yDa(p[0]), yDa(p[3])], col);
  });
  const sez = src.match(/<div class="scroll">(<svg[^>]*>)([\s\S]*?)<\/svg><\/div>/);
  const sezCorpo = sez[2]
    .replace(/<polyline class="lead-halo"[^>]*\/>|<polyline class="sec-l"[^>]*\/>|<circle cx="[^"]+" cy="[^"]+" r="3" fill="var\(--ink\)"[^>]*\/>/g, "")
    .replace(/<text class="sec-t" x="760"[^>]*>[^<]*<\/text>/g, "")
    .replace(/<rect class="sec-e" [^>]*fill="#(eef0ec|2f3134|e7e0d1|d3d9de)"\/>/g, ""); // via biadesivo, silicone, lastra e profili
  return { svg: fig[1], stile: fig[2], corpo, sezSvg: sez[1], sezCorpo };
}

// --- profilo orizzontale di aggancio e ganci (sistema a scomparsa) --------------------------------------------
const XR = [100, 820];
// profilo orizzontale a C (doppio strato, come il P4 Phoenix): schiena contro i montanti, due ali e due labbri
const DC = 25; // profondità del profilo a C
function profiloC(yb, col, X = XR, z0 = ZF) {
  return scatola(X, [yb, yb + 50], [z0, z0 + 2], col) +
    scatola(X, [yb, yb + 2], [z0 + 2, z0 + DC], col) + scatola(X, [yb, yb + 10], [z0 + DC - 2, z0 + DC], col) +
    scatola(X, [yb + 48, yb + 50], [z0 + 2, z0 + DC], col) + scatola(X, [yb + 40, yb + 50], [z0 + DC - 2, z0 + DC], col);
}
// gancio nascosto dietro il pannello: tratteggiato (linee nascoste); la piastra è sul retro, il dente entra nel profilo a C
function gancioNascosto(x, yb, zB, z0 = ZF) {
  return tratteggio([P(x - 20, yb + 18, zB), P(x + 20, yb + 18, zB), P(x + 20, yb + 62, zB), P(x - 20, yb + 62, zB)]) +
    tratteggio([P(x - 20, yb + 26, z0 + DC - 8), P(x + 20, yb + 26, z0 + DC - 8), P(x + 20, yb + 46, z0 + DC - 8), P(x - 20, yb + 46, z0 + DC - 8)]);
}

// --- sezione orizzontale (unità della tavola originale: ala dei profili a y = 59.2, 0.8 px per mm in profondità) ---
const rect = (x, y, w, h, fill, cls = "sec-e") => `<rect${cls ? ` class="${cls}"` : ""} x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" width="${+w.toFixed(1)}" height="${+h.toFixed(1)}" fill="${fill}"/>`;
const YA = 59.2, K = 0.8;
const SEZ = {
  T: (c, f) => rect(c - 36, YA, 72, 4.8, f) + rect(c - 1.6, YA + 4.8, 3.2, 52, f),
  L: (c, f) => rect(c - 1.6, YA, 48, 4.8, f) + rect(c - 1.6, YA + 4.8, 3.2, 52, f),
  omega: (c, f) => rect(c - 1.6, YA, 88, 2.4, f) + rect(c - 1.6, YA + 2.4, 2.4, 26.4, f) + rect(c + 84, YA + 2.4, 2.4, 26.4, f) +
    rect(c - 17.6, YA + 26.4, 16, 2.4, f) + rect(c + 86.4, YA + 26.4, 16, 2.4, f),
  Z: (c, f) => rect(c - 1.6, YA, 32, 2.4, f) + rect(c - 1.6, YA + 2.4, 2.4, 24, f) + rect(c - 33.6, YA + 26.4, 32, 2.4, f),
};
function etichetta([px, py], ly, testo) {
  const a = +px.toFixed(1), b = +py.toFixed(1);
  return `<polyline class="lead-halo" fill="none" points="${a},${b} 735,${ly} 752,${ly}"/><polyline class="sec-l" fill="none" points="${a},${b} 735,${ly} 752,${ly}"/><circle cx="${a}" cy="${b}" r="3" fill="var(--ink)" stroke="var(--paper)"/><text class="sec-t" x="760" y="${ly + 4.5}">${testo}</text>`;
}

// --- testi della legenda -------------------------------------------------------------------------------------
const L = (t, c, p) => [t, c, p];
const TESTI = {
  murat: L("Muratura", "#c47448", "Supporto in laterizio su cui si ancorano le staffe."),
  lana: L("Lana di roccia", "#dcc477", "Pannelli isolanti appoggiati alla muratura. Davanti resta l’intercapedine ventilata."),
  staffaAlu: L("Staffe", "#bfc6cd", "Staffe a L in alluminio con piastra di taglio termico (in rosso), fissate alla muratura con tasselli. Le staffe di portata reggono peso e vento, quelle di controvento solo il vento: di solito una di portata ogni tre."),
  staffaZinc: L("Staffa", "#bfc6cd", "Staffa a L fissata alla muratura con tassello e separatore termico (in rosso). Su ogni profilo una staffa è punto fisso, le altre lo lasciano scorrere."),
  profT: L("Profilo a T", "#d3d9de", "Montante verticale in alluminio dietro il giunto tra due pannelli: ogni pannello si fissa sulla sua metà dell’ala."),
  profL: L("Profilo a L", "#d3d9de", "Montante intermedio in alluminio, al centro del pannello."),
  profTclip: L("Profili verticali a T e a L", "#d3d9de", "Montanti in alluminio fissati alle staffe: sono il primo strato della sottostruttura e reggono i profili orizzontali."),
  profO: L("Profilo omega", "#bcc3c8", "Montante a cappello in acciaio zincato dietro il giunto tra due pannelli: la parte larga (almeno 100 mm) fa da appoggio a tutti e due."),
  profZ: L("Profilo a Z", "#bcc3c8", "Montante intermedio in acciaio zincato, al centro del pannello."),
  profOclip: L("Profilo omega", "#bcc3c8", "Montante a cappello in acciaio zincato, fissato alle staffe. Regge i profili orizzontali."),
  rivAlu: L("Rivetti", "#d9dde0", "Rivetti in alluminio a testa larga, a vista, anche nel colore del pannello. Per ogni pannello due sono punti fissi, gli altri lasciano lavorare il pannello."),
  rivInox: L("Rivetti", "#d9dde0", "Rivetti in acciaio inox a testa larga, a vista: su profili zincati non si usano rivetti in alluminio. Per ogni pannello due sono punti fissi."),
  orizz: L("Profilo orizzontale", "#d3d9de", "Profilo di aggancio fissato ai montanti verticali, su cui si appendono i pannelli."),
  orizzC: L("Profilo orizzontale a C", "#d3d9de", "Secondo strato della sottostruttura: profili orizzontali fissati ai montanti, su cui si agganciano i pannelli."),
  ganci: L("Clips (agraffe)", "#aab3bb", "Fissati sul retro del pannello con tasselli a sottosquadro, senza forarlo da parte a parte. Si appendono al profilo orizzontale. Tratteggiate perché nascosti dietro il pannello."),
  panRiv: L("Pannello in fibrocemento", "#8e9396", "Rivettato ai profili, con giunto verticale aperto di circa 10 mm sul profilo centrale del giunto. Dietro resta l’intercapedine ventilata."),
  panClip: L("Pannello in fibrocemento", "#8e9396", "Appeso ai profili orizzontali con le clips: in facciata non si vede nessun fissaggio. Dietro resta l’intercapedine ventilata."),
};
const NOTA = "Schema non in scala, secondo le guide di posa dei produttori di pannelli in fibrocemento. Profili, interassi, numero e posizione di rivetti e clips si definiscono in progetto con il calcolo della sottostruttura.";

// --- le 4 varianti --------------------------------------------------------------------------------------------
function variante({ file, titolo, sist, fissaggio }) {
  const omega = sist === "omega", clips = fissaggio === "clips";
  const profili = clips ? (omega ? ["omega", "omega"] : ["T", "L"]) : (omega ? ["omega", "Z"] : ["T", "L"]);
  const col = omega ? ZINC : ALU;
  const b = base(profili, col);
  const H = 300, sp = 12, bx = [-165, 1015];
  const zB = clips ? ZF + DC + 5 : ZF;       // retro del pannello
  let fig = b.corpo, legenda = [TESTI.murat, TESTI.lana, omega ? TESTI.staffaZinc : TESTI.staffaAlu];
  let rich = [[[62.4, -202.0], bx[0]], [[800.8, -608.6], bx[1]], [[261.3, -583.0], bx[0]]];

  // profilo verticale principale
  const xProf = omega ? 330 : 250;
  legenda.push(clips ? (omega ? TESTI.profOclip : TESTI.profTclip) : (omega ? TESTI.profO : TESTI.profT));
  rich.push([P(xProf, 450, ZF), bx[0]]);

  if (!clips) {
    // profilo intermedio, due pannelli con il giunto sul profilo principale, rivetti a vista
    legenda.push(omega ? TESTI.profZ : TESTI.profL);
    rich.push([P(640, 450, ZF), bx[1]]);
    const giunto = omega ? 234 + 53.4 : 234;
    const A = [giunto + 5, 858], B = [40, giunto - 5];
    for (const X of [B, A]) fig += scatola(X, [0, H], [zB, zB + sp], FIBRO) + grana(X[0], X[1], 0, H, zB + sp);
    const linee = omega ? [giunto - 25, giunto + 25, 642.4] : [giunto - 18, giunto + 18, 647.4];
    for (const x of linee) for (const y of [45, 150, 255]) fig += rivetto(x, y, zB + sp + 0.5);
    legenda.push(omega ? TESTI.rivInox : TESTI.rivAlu, TESTI.panRiv);
    rich.push([P(linee[2], 150, zB + sp), bx[1]], [P(800, 20, zB + sp), bx[1]]);
  } else {
    // profili orizzontali; i ganci sono sul retro del pannello (tratteggiati)
    fig += profiloC(480, col) + profiloC(236, col);
    const X = [40, 858];
    fig += scatola(X, [0, H], [zB, zB + sp], FIBRO) + grana(X[0], X[1], 0, H, zB + sp);
    for (const x of [180, 450, 720]) fig += gancioNascosto(x, 236, zB + sp);
    legenda.push(TESTI.orizzC, TESTI.ganci, TESTI.panClip);
    rich.push([P(450, 528, ZF + DC), bx[1]], [P(740, 270, zB + sp), bx[1]], [P(800, 20, zB + sp), bx[1]]);
  }
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");

  // --- sezione orizzontale ---
  let sez = b.sezCorpo, et = [];
  const f = omega ? "#bcc3c8" : "#d3d9de";
  sez += SEZ[profili[0]](230, f) + SEZ[profili[1]](590, f);
  const rivS = (c, y0) => rect(c - 6, y0 - 2.4, 12, 2.4, "#d9dde0") + rect(c - 1.5, y0, 3, YA + 4.8 - y0, "#9aa3ad");
  if (!clips) {
    const y0 = YA - sp * K, g = omega ? 230 + 42.4 : 230;
    sez += rect(30, y0, g - 5 - 30, sp * K, "#8e9396") + rect(g + 5, y0, 710 - g - 5, sp * K, "#8e9396");
    for (const c of omega ? [g - 20, g + 20, 604] : [g - 18, g + 18, 612]) sez += rivS(c, y0);
    et.push([[690, y0 + 4.8], 22, "Pannello in fibrocemento"], [[612, y0 - 1.2], 40, "Rivetto"], [[g, y0 + 4.8], 58, "Giunto aperto"],
      [[omega ? g + 40 : 231.6, omega ? YA + 1.2 : 90], 76, omega ? "Profilo omega" : "Profilo a T"],
      [[omega ? 605 : 615, YA + 1.2], 94, omega ? "Profilo a Z" : "Profilo a L"]);
  } else {
    const yB = YA - 24 * K, y0 = yB - sp * K;
    sez += rect(30, YA - 2.4, 680, 2.4, f) + rect(30, YA - 14 * K, 680, 2.4, f);       // profilo orizzontale (piatto e labbro)
    sez += rect(30, y0, 680, sp * K, "#8e9396");
    for (const c of [130, 370, 650]) sez += rect(c - 16, yB, 32, 2.4, "#aab3bb") + rect(c - 1.2, yB + 2.4, 2.4, YA - 14 * K - yB - 2.4, "#aab3bb") + rect(c - 1.5, y0 + 4, 3, sp * K - 4, "#59616a", "");
    et.push([[690, y0 + 4.8], 22, "Pannello in fibrocemento"], [[370, yB + 1.2], 40, "Clips (agraffe)"], [[680, YA - 1.2], 58, "Profilo orizzontale"],
      [[omega ? 270 : 231.6, omega ? YA + 1.2 : 90], 76, omega ? "Profilo omega" : "Profilo a T"]);
  }
  et.push([[680, 100], 112, "Intercapedine ventilata"], [[586, 130], 130, "Staffa"], [[680, 160], 150, "Lana di roccia"],
    [[550, 197.6], 172, "Taglio termico"], [[566, 224], 194, "Tassello"], [[690, 244], 244, "Muratura"]);
  sez = sez.replace(/(<text class="sec-t" x="20")/, et.map(([p, ly, t]) => etichetta(p, ly, t)).join("") + "$1");

  const html = `<title>${titolo}</title>
<!-- Tavola generata da mockup/_genera-tavole-fibro.js: non modificarla a mano -->
<h1>${titolo}</h1>
<div class="figure">${b.svg.replace(/aria-label="[^"]*"/, `aria-label="${titolo}"`)}${b.stile}${fig}</svg></div>
<ol class="legend">
${legenda.map(([t, c, p], i) => `  <li><span class="n">${i + 1}</span><div><h2>${t}</h2><p><span class="swatch" style="background:${c}"></span>${p}</p></div></li>`).join("\n")}
</ol>
<p class="note">${NOTA}</p>
<div class="scroll">${b.sezSvg}${sez}</svg></div>
`;
  fs.writeFileSync(path.join(DIR, file), html);
  console.log("scritta", file, "-", legenda.length, "voci,", rich.length, "numeri");
}

variante({ file: "fibrocemento-T-rivetti.html", titolo: "Fibrocemento rivettato su profili a T e a L in alluminio", sist: "T", fissaggio: "rivetti" });
variante({ file: "fibrocemento-T-clips.html", titolo: "Fibrocemento con ganci a scomparsa su profili a T", sist: "T", fissaggio: "clips" });
// --- sistema a omega: niente staffe e niente profili a T, gli omega sono fissati direttamente alla muratura ---
// Muratura e profili omega sono quelli della tavola del ceramico a omega (alette verso l'esterno, faccia a z = 78).
function baseOmega() {
  const src = fs.readFileSync(path.join(DIR, "ceramico-omega-silicone.html"), "utf8");
  const fig = src.match(/<div class="figure">(<svg[^>]*>)(<style>[\s\S]*?<\/style>)([\s\S]*?)<\/svg><\/div>/);
  const corpo = fig[3]
    .replace(/<g(?: class="callout")?>[\s\S]*?<\/g>/g, "")
    .replace(/<polygon [^>]*>/g, (t) => (TOGLI.test(t) ? "" : t))
    .replace(/<circle cx="[^"]+" cy="[^"]+" r="[^"]+" fill="#(fbf8f1|b9ae98)" opacity="\.7"\/>/g, "");
  const sez = src.match(/<div class="scroll">(<svg[^>]*>)([\s\S]*?)<\/svg><\/div>/);
  const sezCorpo = sez[2]
    .replace(/<polyline class="lead-halo"[^>]*\/>|<polyline class="sec-l"[^>]*\/>|<circle cx="[^"]+" cy="[^"]+" r="3" fill="var\(--ink\)"[^>]*\/>/g, "")
    .replace(/<text class="sec-t" x="760"[^>]*>[^<]*<\/text>/g, "")
    .replace(/<rect class="sec-e" [^>]*fill="#(eef0ec|2f3134|e7e0d1)"\/>/g, "");
  return { svg: fig[1], stile: fig[2], corpo, sezSvg: sez[1], sezCorpo };
}
const TESTI_O = {
  murat: L("Muratura", "#c47448", "Supporto in laterizio su cui si fissano direttamente i profili."),
  prof: L("Profilo omega", "#c3cad1", "Montante verticale in lamiera zincata, fissato direttamente alla muratura con tasselli sul fondo del canale, senza staffe. Le due alette restano verso l’esterno."),
  profRiv: L("Profilo omega", "#c3cad1", "Montante verticale in lamiera zincata, fissato direttamente alla muratura con tasselli sul fondo del canale, senza staffe. Dietro il giunto ogni pannello si fissa su un’aletta."),
  riv: L("Rivetti", "#d9dde0", "Rivetti in acciaio inox a testa larga, a vista, sulle alette dei profili: su lamiera zincata non si usano rivetti in alluminio. Per ogni pannello due sono punti fissi."),
};
function varianteOmega({ file, titolo, fissaggio }) {
  const clips = fissaggio === "clips";
  const b = baseOmega();
  const ZA = 78, H = 300, sp = 12, bx = [-165, 885];
  const zB = clips ? ZA + 24 : ZA;
  let fig = b.corpo, legenda = [TESTI_O.murat, clips ? TESTI_O.prof : TESTI_O.profRiv];
  let rich = [[[62.4, -202.0], bx[0]], [[207.5, -567.2], bx[0]]];
  if (!clips) {
    const giunto = 207.4, B = [60, giunto - 5], A = [giunto + 5, 780];
    for (const X of [B, A]) fig += scatola(X, [0, H], [zB, zB + sp], FIBRO) + grana(X[0], X[1], 0, H, zB + sp);
    for (const x of [170, 244.8, 606.8, 681.6]) for (const y of [45, 150, 255]) fig += rivetto(x, y, zB + sp + 0.5);
    legenda.push(TESTI_O.riv, TESTI.panRiv);
    rich.push([P(681.6, 150, zB + sp), bx[1]], [P(740, 20, zB + sp), bx[1]]);
  } else {
    const prof = (yb) => scatola([100, 760], [yb, yb + 45], [ZA, ZA + 2.5], ZINC) + scatola([100, 760], [yb + 42.5, yb + 45], [ZA + 2.5, ZA + 14], ZINC) + scatola([100, 760], [yb + 45, yb + 53], [ZA + 11.5, ZA + 14], ZINC);
    fig += prof(480) + prof(236);
    const X = [60, 780];
    fig += scatola(X, [0, H], [zB, zB + sp], FIBRO) + grana(X[0], X[1], 0, H, zB + sp);
    for (const x of [180, 420, 660]) fig += tratteggio([P(x - 20, 266, zB + sp), P(x + 20, 266, zB + sp), P(x + 20, 300, zB + sp), P(x - 20, 300, zB + sp)]) +
      tratteggio([P(x - 20, 281, ZA + 14), P(x + 20, 281, ZA + 14), P(x + 20, 289, ZA + 14), P(x - 20, 289, ZA + 14)]);
    legenda.push(TESTI.orizz, TESTI.ganci, TESTI.panClip);
    rich.push([P(450, 505, ZA + 14), bx[1]], [P(680, 283, zB + sp), bx[1]], [P(740, 20, zB + sp), bx[1]]);
  }
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");

  // sezione orizzontale (tavola omega originale: alette a y = 66.6, 1.3 px per mm)
  const YO = 66.6, KO = 1.3;
  let sez = b.sezCorpo, et = [];
  if (!clips) {
    const y0 = YO - sp * KO, g = 195.8;
    sez += rect(40, y0, g - 5 - 40, sp * KO, "#8e9396") + rect(g + 5, y0, 720 - g - 5, sp * KO, "#8e9396");
    for (const c of [133.4, 258.2, 453.4, 578.2]) sez += rect(c - 6, y0 - 3, 12, 3, "#d9dde0") + rect(c - 1.5, y0, 3, YO + 5 - y0, "#9aa3ad");
    et.push([[700, y0 + 7.8], 26, "Pannello in fibrocemento"], [[578.2, y0 - 1.5], 46, "Rivetto"], [[g, y0 + 7.8], 66, "Giunto aperto"]);
  } else {
    const yB = YO - 24 * KO, y0 = yB - sp * KO, yL = YO - 14 * KO;
    sez += rect(40, YO - 3, 680, 3, "#bcc3c8") + rect(40, yL, 680, 3, "#bcc3c8") + rect(40, y0, 680, sp * KO, "#8e9396");
    for (const c of [160, 400, 620]) sez += rect(c - 16, yB, 32, 3, "#aab3bb") + rect(c - 1.5, yB + 3, 3, yL - yB - 3, "#aab3bb") + rect(c - 1.75, y0 + 5, 3.5, sp * KO - 5, "#59616a", "");
    et.push([[700, y0 + 7.8], 22, "Pannello in fibrocemento"], [[400, yB + 1.5], 42, "Clips (agraffe)"], [[680, yL + 1.5], 60, "Profilo orizzontale"]);
  }
  et.push([[690, 128], 128, "Intercapedine ventilata"], [[552.2, 144.7], 148, "Profilo omega"], [[519.8, 202], 202, "Tassello"], [[700, 224], 224, "Muratura"]);
  sez = sez.replace(/(<text class="sec-t" x="20")/, et.map(([p, ly, t]) => etichetta(p, ly, t)).join("") + "$1");

  const html = `<title>${titolo}</title>
<!-- Tavola generata da mockup/_genera-tavole-fibro.js: non modificarla a mano -->
<h1>${titolo}</h1>
<div class="figure">${b.svg.replace(/aria-label="[^"]*"/, `aria-label="${titolo}"`)}${b.stile}${fig}</svg></div>
<ol class="legend">
${legenda.map(([t, c, p], i) => `  <li><span class="n">${i + 1}</span><div><h2>${t}</h2><p><span class="swatch" style="background:${c}"></span>${p}</p></div></li>`).join("\n")}
</ol>
<p class="note">${NOTA}</p>
<div class="scroll">${b.sezSvg}${sez}</svg></div>
`;
  fs.writeFileSync(path.join(DIR, file), html);
  console.log("scritta", file, "-", legenda.length, "voci,", rich.length, "numeri");
}

varianteOmega({ file: "fibrocemento-omega-rivetti.html", titolo: "Fibrocemento rivettato su profili omega fissati alla muratura", fissaggio: "rivetti" });
varianteOmega({ file: "fibrocemento-omega-clips.html", titolo: "Fibrocemento con clips a scomparsa su profili omega fissati alla muratura", fissaggio: "clips" });

// --- CERAMICO con graffe a vista ("manine"): schema dei sistemi a graffe su profili verticali a T e a L ---------
// Staffe a L con taglio termico (di portata e di controvento), profilo a T dietro il giunto verticale, profilo a L
// intermedio, graffe in inox verniciate nel colore della lastra fissate ai profili nelle fughe orizzontali.
const CERAMICA = { fronte: "#e7e0d1", sopra: "#f3eee4", lato: "#c2b8a4" };
const GRAFFA = { fronte: "#cfc5b0", sopra: "#e6dfcf", lato: "#a99f8a" };
function granaCeramica(x0, x1, y0, y1, z) {
  let s = "";
  const n = Math.round(((x1 - x0) * (y1 - y0)) / 1400);
  for (let i = 0; i < n; i++) {
    const [px, py] = P(x0 + 5 + caso() * (x1 - x0 - 10), y0 + 5 + caso() * (y1 - y0 - 10), z);
    s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(0.6 + caso() * 1.3).toFixed(1)}" fill="${caso() < 0.5 ? "#fbf8f1" : "#b9ae98"}" opacity=".7"/>`;
  }
  return s;
}
// graffa, in due tempi:
//  - corpo (prima delle lastre): piastra rivettata sul profilo e anima che passa nella fuga -> resta nascosto,
//    si intravede solo nella fuga e dove la lastra sopra non c'è ancora;
//  - asolette (dopo le lastre): le piccole linguette piegate sul bordo delle lastre, l'unica parte a vista.
const FUGA = 10;
function graffaCorpo(cx, yf, larga, zL, sp) {
  return scatola([cx - larga, cx + larga], [yf - 26, yf + FUGA + 26], [ZF, ZF + 1.5], GRAFFA) +
    scatola([cx - larga + 4, cx + larga - 4], [yf + 3, yf + FUGA - 3], [ZF + 1.5, zL + sp], GRAFFA);
}
function graffaAsolette(cx, yf, ganci, zL, sp, sopra = true) {
  let s = "";
  for (const dx of ganci) {
    s += scatola([cx + dx - 5, cx + dx + 5], [yf - 7, yf + 3], [zL + sp, zL + sp + 1.2], GRAFFA);              // trattiene la lastra sotto
    if (sopra) s += scatola([cx + dx - 5, cx + dx + 5], [yf + FUGA - 3, yf + FUGA + 7], [zL + sp, zL + sp + 1.2], GRAFFA); // regge la lastra sopra
  }
  return s;
}
// riquadro di dettaglio: vista frontale ingrandita dell'incrocio delle fughe, con le sole asolette a vista
function dettaglioGraffa(cx, cy, r, verso) {
  const k = 3.2, g = FUGA * k, a = [8 * k, 5 * k];
  const lastra = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e7e0d1" stroke="#2a2420" stroke-opacity=".45"/>`;
  const asoletta = (x, y) => `<rect x="${(x - a[0] / 2).toFixed(1)}" y="${(y - a[1] / 2).toFixed(1)}" width="${a[0]}" height="${a[1]}" rx="2" fill="#cfc5b0" stroke="#2a2420" stroke-opacity=".6"/>`;
  const L = 2 * r;
  let s = `<defs><clipPath id="dett"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`;
  s += `<line x1="${cx}" y1="${cy}" x2="${verso[0].toFixed(1)}" y2="${verso[1].toFixed(1)}" stroke="#1f2a33" stroke-width="1.2" stroke-dasharray="5 4"/>`;
  s += `<circle cx="${verso[0].toFixed(1)}" cy="${verso[1].toFixed(1)}" r="14" fill="none" stroke="#1f2a33" stroke-width="1.4"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#fbfaf7" stroke="#1f2a33" stroke-width="1.4"/>`;
  s += `<g clip-path="url(#dett)"><rect x="${cx - r}" y="${cy - r}" width="${L}" height="${L}" fill="#8f877a"/>`;  // fughe in ombra
  s += lastra(cx - r, cy - r, r - g / 2, r - g / 2) + lastra(cx + g / 2, cy - r, r - g / 2, r - g / 2) +
    lastra(cx - r, cy + g / 2, r - g / 2, r - g / 2) + lastra(cx + g / 2, cy + g / 2, r - g / 2, r - g / 2);
  s += `<rect x="${cx - 22 * k}" y="${cy - g / 2 + 3 * k}" width="${44 * k}" height="${g - 6 * k}" fill="#b9ae98"/>`; // anima della graffa nella fuga
  for (const dx of [-20, 20]) s += asoletta(cx + dx * k * 0.9, cy - g / 2 - 2.5 * k) + asoletta(cx + dx * k * 0.9, cy + g / 2 + 2.5 * k);
  s += `</g><text x="${cx + r + 14}" y="${cy - 44}" text-anchor="start" style="font:500 30px 'Jost',sans-serif;fill:#1f2a33">Dettaglio: a vista</text>`;
  s += `<text x="${cx + r + 14}" y="${cy - 8}" text-anchor="start" style="font:500 30px 'Jost',sans-serif;fill:#1f2a33">solo le asolette</text>`;
  return s;
}
(function tavolaGraffe() {
  const b = base(["T", "L"], ALU);
  const zL = ZF + 2, sp = 9, bx = [-165, 1015];
  let fig = b.corpo;
  // lastre: fila bassa (due lastre con giunto sul profilo a T) e una lastra della fila sopra, a destra
  const lastre = [[[40, 229], [0, 240]], [[239, 858], [0, 240]], [[40, 229], [250, 330]], [[239, 858], [250, 420]]];
  // graffe: 4 asolette all'incrocio delle fughe (profilo a T), 2 sul profilo intermedio a L
  const G = [[234, 240, 26, [-20, 20], true], [647.4, 240, 20, [0], true]];
  for (const [cx, yf, larga] of G) fig += graffaCorpo(cx, yf, larga, zL, sp);
  for (const [X, Y] of lastre) fig += scatola(X, Y, [zL, zL + sp], CERAMICA) + granaCeramica(X[0], X[1], Y[0], Y[1], zL + sp);
  for (const [cx, yf, , ganci, sopra] of G) fig += graffaAsolette(cx, yf, ganci, zL, sp, sopra);
  fig += dettaglioGraffa(-95, -840, 82, P(234, 245, zL + sp));
  const rich = [[[62.4, -202.0], bx[0]], [[800.8, -608.6], bx[1]], [[261.3, -583.0], bx[0]], [P(215, 520, ZF), bx[0]],
    [P(660, 470, ZF), bx[1]], [P(647.4, 243, zL + sp + 1.2), bx[1]], [P(800, 20, zL + sp), bx[1]]];
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");
  const legenda = [
    TESTI.murat, TESTI.lana,
    L("Staffa", "#bfc6cd", "Staffa a L in alluminio con taglio termico (in rosso) contro la muratura, fissata con tassello. Le staffe di portata reggono peso e vento, quelle di controvento solo il vento: di solito una di portata ogni tre."),
    L("Profilo a T", "#d3d9de", "Montante verticale in alluminio dietro il giunto verticale tra due lastre."),
    L("Profilo a L", "#d3d9de", "Montante intermedio in alluminio, al centro della lastra."),
    L("Graffe a vista", "#cfc5b0", "Graffe in acciaio inox fissate ai profili nelle fughe orizzontali, nascoste dietro le lastre: in vista restano solo le piccole asolette sul bordo, verniciate nel colore delle lastre. Ogni graffa regge il bordo basso della lastra sopra e trattiene quello alto della lastra sotto: quattro asolette all’incrocio delle fughe, due sui profili intermedi."),
    L("Lastra ceramica", "#e7e0d1", "Lastra sottile (da 6 a 9 mm) appoggiata ai profili e tenuta solo dalle graffe sui bordi, senza fori e senza colla. Dietro resta l’intercapedine ventilata."),
  ];
  const nota = "Schema non in scala, secondo le schede dei sistemi a graffe a vista. Profili, interassi e numero delle graffe si definiscono in progetto con il calcolo della sottostruttura.";
  const titolo = "Lastre ceramiche con graffe a vista su profili a T e a L";
  const html = `<title>${titolo}</title>
<!-- Tavola generata da mockup/_genera-tavole-fibro.js: non modificarla a mano -->
<h1>${titolo}</h1>
<div class="figure">${b.svg.replace(/aria-label="[^"]*"/, `aria-label="${titolo}"`)}${b.stile}${fig}</svg></div>
<ol class="legend">
${legenda.map(([t, c, p], i) => `  <li><span class="n">${i + 1}</span><div><h2>${t}</h2><p><span class="swatch" style="background:${c}"></span>${p}</p></div></li>`).join("\n")}
</ol>
<p class="note">${nota}</p>
<div class="scroll">${b.sezSvg}</svg></div>
`;
  fs.writeFileSync(path.join(DIR, "ceramico-T-graffe.html"), html);
  console.log("scritta ceramico-T-graffe.html -", legenda.length, "voci,", rich.length, "numeri");
})();

// --- CERAMICO allineato agli schemi Phoenix -------------------------------------------------------------------
function scriviTavola(file, titolo, b, fig, legenda, nota) {
  const html = `<title>${titolo}</title>
<!-- Tavola generata da mockup/_genera-tavole-fibro.js: non modificarla a mano -->
<h1>${titolo}</h1>
<div class="figure">${b.svg.replace(/aria-label="[^"]*"/, `aria-label="${titolo}"`)}${b.stile}${fig}</svg></div>
<ol class="legend">
${legenda.map(([t, c, p], i) => `  <li><span class="n">${i + 1}</span><div><h2>${t}</h2><p><span class="swatch" style="background:${c}"></span>${p}</p></div></li>`).join("\n")}
</ol>
<p class="note">${nota}</p>
<div class="scroll">${b.sezSvg}</svg></div>
`;
  fs.writeFileSync(path.join(DIR, file), html);
  console.log("scritta", file, "-", legenda.length, "voci");
}
const NOTA_CER = "Schema non in scala, secondo le schede dei sistemi di sottostruttura per facciate ventilate. Profili, interassi e fissaggi si definiscono in progetto con il calcolo della sottostruttura.";
const TESTI_CER = {
  profT: L("Profilo a T", "#d3d9de", "Montante verticale in alluminio dietro il giunto verticale tra due lastre."),
  profL: L("Profilo a L", "#d3d9de", "Montante intermedio in alluminio, al centro della lastra."),
};

// P1: sottostruttura verticale a T e a L, lastra incollata con biadesivo e silicone strutturale
(function ceramicoP1() {
  const b = base(["T", "L"], ALU);
  const bx = [-165, 1015];
  let fig = b.corpo;
  const BIA = { lato: "#c9ccc8", fronte: "#eef0ec", sopra: "#fafbf8" }, SIL = { lato: "#1c1d1f", fronte: "#2f3134", sopra: "#55595e" };
  const cordoni = (c, tipo, y) => tipo === "T"
    ? scatola([c + 27, c + 34], y, [ZF, ZF + 14], BIA) + scatola([c + 10, c + 24], y, [ZF, ZF + 14], SIL) +
      scatola([c - 24, c - 10], y, [ZF, ZF + 14], SIL) + scatola([c - 34, c - 27], y, [ZF, ZF + 14], BIA)
    : scatola([c + 38, c + 45], y, [ZF, ZF + 14], BIA) + scatola([c + 14, c + 30], y, [ZF, ZF + 14], SIL);
  fig += cordoni(624, "L", [0, 595.2]) + cordoni(234, "T", [0, 595.2]);
  // lastra come nella tavola originale (stesse misure), incollata sui cordoni
  const X = [436.8, 858], Y = [0, 396.8], z0 = ZF + 14;
  fig += scatola(X, Y, [z0, z0 + 30], CERAMICA) + granaCeramica(X[0], X[1], Y[0], Y[1], z0 + 30);
  const rich = [[[62.4, -202.0], bx[0]], [[800.8, -608.6], bx[1]], [[261.3, -583.0], bx[0]], [[305.2, -468.0], bx[0]],
    [P(655, 450, ZF), bx[1]], [P(203, 330, ZF + 14), bx[0]], [P(217, 120, ZF + 14), bx[0]], [P(800, 60, z0 + 30), bx[1]]];
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");
  const legenda = [TESTI.murat, TESTI.lana, TESTI.staffaAlu, TESTI_CER.profT, TESTI_CER.profL,
    L("Biadesivo", "#eef0ec", "Nastro continuo sul bordo dei profili. Fissa lo spessore dell’incollaggio e tiene ferma la lastra mentre il silicone indurisce."),
    L("Silicone strutturale", "#2f3134", "Cordolo continuo affiancato al biadesivo, sullo stesso spessore. Trasmette il peso della lastra senza fissaggi a vista."),
    L("Lastra ceramica", "#e7e0d1", "Incollata sui profili: in facciata non si vede nessun fissaggio. Dietro resta l’intercapedine ventilata.")];
  scriviTavola("ceramico-T-incollata.html", "Lastre ceramiche incollate su profili a T e a L", b, fig, legenda, NOTA_CER);
})();

// P4: doppio strato (montanti verticali a T e a L + profili orizzontali a C), ganci a scomparsa sul retro della lastra
(function ceramicoP4() {
  const b = base(["T", "L"], ALU);
  const bx = [-165, 1015], sp = 10, zB = ZF + DC + 5, H = 300;
  let fig = b.corpo + profiloC(480, ALU) + profiloC(236, ALU);
  const lastre = [[[40, 445], [0, H]], [[455, 858], [0, H]]];
  for (const [X, Y] of lastre) fig += scatola(X, Y, [zB, zB + sp], CERAMICA) + granaCeramica(X[0], X[1], Y[0], Y[1], zB + sp);
  for (const x of [130, 360, 540, 770]) fig += gancioNascosto(x, 236, zB + sp);
  const rich = [[[62.4, -202.0], bx[0]], [[800.8, -608.6], bx[1]], [[261.3, -583.0], bx[0]], [P(250, 430, ZF), bx[0]],
    [P(450, 528, ZF + DC), bx[1]], [P(790, 270, zB + sp), bx[1]], [P(800, 20, zB + sp), bx[1]]];
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");
  const legenda = [TESTI.murat, TESTI.lana, TESTI.staffaAlu, TESTI.profTclip, TESTI.orizzC,
    L("Ganci a scomparsa", "#aab3bb", "Ganci in alluminio fissati sul retro della lastra con ancoranti dedicati, che si appendono ai profili a C. Tratteggiati perché nascosti dietro la lastra."),
    L("Lastra ceramica", "#e7e0d1", "Appesa ai profili orizzontali: in facciata non si vede nessun fissaggio e ogni lastra si può smontare da sola. Dietro resta l’intercapedine ventilata.")];
  scriviTavola("ceramico-T-ganci.html", "Lastre ceramiche con ganci a scomparsa su doppia orditura", b, fig, legenda, NOTA_CER);
})();
