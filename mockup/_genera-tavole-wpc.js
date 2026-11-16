// Genera le 4 tavole della stratigrafia del WPC (in mockup/_stratigrafie/), secondo le istruzioni di posa Déco
// (Ultrashield Twix / Firewall Twix Wally): magatelli in larice autoclavato o in alluminio fissati alla parete,
// interasse massimo 50 cm, intercapedine di almeno 20 mm, clips a scomparsa; ogni doga bloccata in 1 punto se
// orizzontale, in 2 punti ravvicinati (con la clip in cima avvitata) se verticale; aperture di 10 mm in alto e in basso.
// Muratura presa dalla tavola del ceramico a omega, con la stessa assonometria.
// Uso: node mockup/_genera-tavole-wpc.js
const fs = require("fs");
const path = require("path");
const DIR = path.join(__dirname, "_stratigrafie");

const P = (x, y, z) => [x + 0.52 * z, -0.25641 * x - y + 0.36 * z];
const pt = (p) => p.map((v) => v.toFixed(1)).join(",");
const poly = (pts, fill, cls = "e") => `<polygon class="${cls}" points="${pts.map(pt).join(" ")}" fill="${fill}"/>`;
function scatola([x0, x1], [y0, y1], [z0, z1], col) {
  return poly([P(x0, y0, z0), P(x0, y0, z1), P(x0, y1, z1), P(x0, y1, z0)], col.lato) +
    poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], col.fronte) +
    poly([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], col.sopra);
}
const linea = (a, b, colore, sp = 1) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${colore}" stroke-width="${sp}" stroke-linecap="round"/>`;
function richiamo(n, [px, py], bx) {
  const a = px.toFixed(1), b = py.toFixed(1);
  return `<g class="callout"><line class="lead-halo" x1="${a}" y1="${b}" x2="${bx}" y2="${b}"/><line class="lead" x1="${a}" y1="${b}" x2="${bx}" y2="${b}"/><circle class="dot" cx="${a}" cy="${b}" r="4"/><circle class="badge" cx="${bx}" cy="${b}" r="17"/><text class="num" x="${bx}" y="${(py + 6).toFixed(1)}">${n}</text></g>`;
}
function vite(x, y, z) {
  const c = (r) => Array.from({ length: 16 }, (_, i) => P(x + r * Math.cos((i / 16) * 2 * Math.PI), y + r * Math.sin((i / 16) * 2 * Math.PI), z));
  return poly(c(5), "#59616a") + `<polygon points="${c(1.8).map(pt).join(" ")}" fill="#c9d0d6"/>`;
}
let seme = 11;
const caso = () => ((seme = (seme * 16807) % 2147483647) / 2147483647);

const LARICE = { fronte: "#c9a26b", sopra: "#dcbb88", lato: "#a6804e" };
const ALLUMINIO = { fronte: "#c3cad1", sopra: "#dde2e6", lato: "#8a939d" };
const WPC = { fronte: "#7a5236", sopra: "#9a6c4b", lato: "#5c3c26" };
const CLIP = { fronte: "#4a4f55", sopra: "#6b7178", lato: "#33373b" };

// muratura dalla tavola del ceramico a omega: tengo solo muro, giunti di malta e fori dei mattoni
function muro() {
  const src = fs.readFileSync(path.join(DIR, "ceramico-omega-silicone.html"), "utf8");
  const fig = src.match(/<div class="figure">(<svg[^>]*>)(<style>[\s\S]*?<\/style>)([\s\S]*?)<\/svg><\/div>/);
  const tieni = (fig[3].match(/<(polygon|line)[^>]*\/>/g) || []).filter((t) =>
    /class="m"|class="h"/.test(t) || /fill="#(9d5532|c47448|dc9a6e)"/.test(t));
  return { svg: fig[1], stile: fig[2], corpo: tieni.join("") };
}

// doga: scatola con venature sulla faccia e la scanalatura per la clip sul bordo (a metà spessore)
function doga(X, Y, z0, sp, orizzontale, fiancoSinistro = false) {
  let s = scatola(X, Y, [z0, z0 + sp], WPC);
  const za = z0 + sp * 0.36, zb = z0 + sp * 0.64;
  if (orizzontale) s += poly([P(X[0], Y[1], za), P(X[1], Y[1], za), P(X[1], Y[1], zb), P(X[0], Y[1], zb)], "#3d2716", "");          // scanalatura sul bordo alto
  else if (fiancoSinistro) s += poly([P(X[0], Y[0], za), P(X[0], Y[0], zb), P(X[0], Y[1], zb), P(X[0], Y[1], za)], "#3d2716", ""); // scanalatura sul fianco
  for (let i = 0; i < 4; i++) {
    if (orizzontale) {
      const y = Y[0] + 8 + caso() * (Y[1] - Y[0] - 16), a = X[0] + 6 + caso() * 60, b = X[1] - 6 - caso() * 60;
      s += linea(P(a, y, z0 + sp), P(b, y, z0 + sp), "#8e6444", 1.2);
    } else {
      const x = X[0] + 8 + caso() * (X[1] - X[0] - 16), a = Y[0] + 6 + caso() * 50, b = Y[1] - 6 - caso() * 50;
      s += linea(P(x, a, z0 + sp), P(x, b, z0 + sp), "#8e6444", 1.2);
    }
  }
  return s;
}

// clip a T: piastra avvitata al magatello, gambo che passa nella fuga, ali che entrano nelle scanalature delle due doghe
function clipO(c, yj, prof, zB, sp) {           // doghe orizzontali: fuga sopra la doga che finisce a yj
  const za = zB + sp * 0.4, zb = zB + sp * 0.6;
  return scatola([c - 18, c + 18], [yj - 14, yj + 20], [prof, prof + 2], CLIP) + vite(c, yj + 3, prof + 2.3) +
    scatola([c - 18, c + 18], [yj + 1.5, yj + 4.5], [prof + 2, za], CLIP) +
    scatola([c - 18, c + 18], [yj - 8, yj + 14], [za, zb], CLIP);
}
function clipV(xj, ym, prof, zB, sp) {           // doghe verticali: fuga sul fianco, centrata in xj
  const za = zB + sp * 0.4, zb = zB + sp * 0.6;
  return scatola([xj - 14, xj + 14], [ym - 18, ym + 18], [prof, prof + 2], CLIP) + vite(xj, ym, prof + 2.3) +
    scatola([xj - 1.5, xj + 1.5], [ym - 18, ym + 18], [prof + 2, za], CLIP) +
    scatola([xj - 9, xj + 9], [ym - 18, ym + 18], [za, zb], CLIP);
}

// riquadro di dettaglio: sezione ingrandita della clip tra due doghe
function dettaglioClip(cx, cy, r, verso, prof, verticale) {
  const k = 2.2, X = (z) => cx - r + 12 + z * k;          // z (mm dalla parete) -> x nel riquadro
  const fug = (6 * k) / 2, sp = 22, zB = prof + 8, za = zB + sp * 0.36, zb = zB + sp * 0.64, sc = 9 * k;
  const R = (x0, y0, x1, y1, fill, extra = "") => `<rect x="${Math.min(x0, x1).toFixed(1)}" y="${Math.min(y0, y1).toFixed(1)}" width="${Math.abs(x1 - x0).toFixed(1)}" height="${Math.abs(y1 - y0).toFixed(1)}" fill="${fill}" ${extra}/>`;
  const bordo = 'stroke="#2a2420" stroke-opacity=".5"';
  let s = `<defs><clipPath id="dettclip"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`;
  s += `<line x1="${cx}" y1="${cy}" x2="${verso[0].toFixed(1)}" y2="${verso[1].toFixed(1)}" stroke="#1f2a33" stroke-width="1.2" stroke-dasharray="5 4"/>`;
  s += `<circle cx="${verso[0].toFixed(1)}" cy="${verso[1].toFixed(1)}" r="14" fill="none" stroke="#1f2a33" stroke-width="1.4"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#fbfaf7" stroke="#1f2a33" stroke-width="1.4"/><g clip-path="url(#dettclip)">`;
  s += R(cx - r, cy - r, X(0), cy + r, "#c47448", bordo);                       // muro
  s += R(X(0), cy - r, X(prof), cy + r, "#c9a26b", bordo);                      // magatello
  for (const d of [-1, 1]) {                                                    // le due doghe, con la scanalatura sul bordo
    const y0 = cy + d * fug, y1 = cy + d * r;
    s += R(X(zB), y0, X(zB + sp), y1, "#7a5236", bordo);
    s += R(X(za), y0, X(zb), y0 + d * sc, "#3d2716");
  }
  s += R(X(prof) - 2, cy - 7 * k, X(prof + 2), cy + 7 * k, "#4a4f55");         // piastra della clip
  s += R(X(prof) - 16 * k, cy - 1.6, X(prof), cy + 1.6, "#8a939d") + R(X(prof + 2), cy - 3.2, X(prof + 2) + 3, cy + 3.2, "#59616a"); // vite
  s += R(X(prof + 2), cy - 1.6 * k, X(za + 1), cy + 1.6 * k, "#4a4f55");       // gambo nella fuga
  s += R(X(za + 1), cy - fug - sc + 3, X(zb - 1), cy + fug + sc - 3, "#4a4f55"); // ali nelle scanalature
  s += `</g><text x="${cx + r + 14}" y="${cy - 44}" style="font:500 30px 'Jost',sans-serif;fill:#1f2a33">Dettaglio della clip</text>`;
  s += `<text x="${cx + r + 14}" y="${cy - 8}" style="font:500 30px 'Jost',sans-serif;fill:#1f2a33">${verticale ? "(vista dall’alto)" : "(vista di fianco)"}</text>`;
  return s;
}

const TESTI = {
  murat: ["Muratura", "#c47448", "Parete di supporto su cui si fissano i magatelli."],
  magLegnoV: ["Magatelli in legno", "#c9a26b", "Listelli in larice trattato in autoclave, fissati alla parete in verticale a un interasse massimo di 50 cm. Il loro spessore crea l’intercapedine di ventilazione, di almeno 20 mm."],
  magAluV: ["Magatelli in alluminio", "#c3cad1", "Profili in alluminio fissati alla parete in verticale a un interasse massimo di 50 cm. Il loro spessore crea l’intercapedine di ventilazione, di almeno 20 mm."],
  magLegnoO: ["Magatelli in legno", "#c9a26b", "Listelli in larice trattato in autoclave, fissati alla parete in orizzontale a un interasse massimo di 50 cm. Il loro spessore crea l’intercapedine di ventilazione, di almeno 20 mm."],
  magAluO: ["Magatelli in alluminio", "#c3cad1", "Profili in alluminio fissati alla parete in orizzontale a un interasse massimo di 50 cm. Il loro spessore crea l’intercapedine di ventilazione, di almeno 20 mm."],
  clipO: ["Clips a scomparsa", "#4a4f55", "Clip a T avvitata al magatello: il gambo passa nella fuga e le ali entrano nelle scanalature delle due doghe vicine, così nessuna vite resta a vista. Ogni doga è bloccata in un solo punto, per lasciarla libera di dilatarsi."],
  clipV: ["Clips a scomparsa", "#4a4f55", "Clip a T avvitata al magatello: il gambo passa nella fuga e le ali entrano nelle scanalature sui fianchi delle due doghe, così nessuna vite resta a vista. Ogni doga è bloccata in due punti ravvicinati e la clip in cima è fissata con una vite."],
  partenza: ["Profilo di partenza", "#c3cad1", "Profilo in alluminio alla base del rivestimento, ad almeno 20 mm dal suolo: regge la prima doga."],
  dogheO: ["Doghe orizzontali in WPC", "#7a5236", "Doghe in legno composito agganciate alle clips. In alto e in basso resta un’apertura di almeno 10 mm per far circolare l’aria."],
  dogheV: ["Doghe verticali in WPC", "#7a5236", "Doghe in legno composito agganciate alle clips. In alto e in basso resta un’apertura di almeno 10 mm per far circolare l’aria."],
};
const NOTA = "Schema non in scala, secondo le istruzioni di posa del produttore delle doghe. Interassi, sezione dei magatelli e fissaggi alla parete si definiscono in progetto.";

function scrivi(file, titolo, m, fig, legenda) {
  const html = `<title>${titolo}</title>
<!-- Tavola generata da mockup/_genera-tavole-wpc.js: non modificarla a mano -->
<h1>${titolo}</h1>
<div class="figure">${m.svg.replace(/aria-label="[^"]*"/, `aria-label="${titolo}"`)}${m.stile}${fig}</svg></div>
<ol class="legend">
${legenda.map(([t, c, p], i) => `  <li><span class="n">${i + 1}</span><div><h2>${t}</h2><p><span class="swatch" style="background:${c}"></span>${p}</p></div></li>`).join("\n")}
</ol>
<p class="note">${NOTA}</p>
<div class="scroll"><svg viewBox="0 0 10 10"></svg></div>
`;
  fs.writeFileSync(path.join(DIR, file), html);
  console.log("scritta", file, "-", legenda.length, "voci");
}

// --- doghe orizzontali su magatelli verticali ----------------------------------------------------------------
function orizzontali(file, titolo, alluminio) {
  const m = muro(), bx = [-165, 885];
  const larga = alluminio ? 40 : 70, prof = alluminio ? 20 : 30, col = alluminio ? ALLUMINIO : LARICE;
  const zB = prof + 8, sp = 22;       // retro della doga: magatello + spessore della clip
  const assi = [100, 340, 580];
  let fig = m.corpo;
  for (const x of assi) {
    fig += scatola([x, x + larga], [0, 610], [0, prof], col);
    if (alluminio) fig += poly([P(x + 3, 610, 3), P(x + larga - 3, 610, 3), P(x + larga - 3, 610, prof - 3), P(x + 3, 610, prof - 3)], "#7d868f"); // profilo cavo
    for (const y of [530, 590]) fig += vite(x + larga / 2, y, prof + 0.3);
  }
  // profilo di partenza
  fig += scatola([40, 720], [16, 30], [prof, prof + 2], ALLUMINIO) + scatola([40, 720], [16, 19], [prof + 2, zB + sp - 4], ALLUMINIO);
  // doghe dal basso verso l'alto, con fuga di 6
  const H = 70, f = 6;
  // prima tutte le clips (una per ogni fuga su ogni magatello), poi le doghe che le coprono:
  // tra una doga e l'altra resta a vista solo la parte nella fuga, sopra l'ultima doga la clip intera
  const tops = Array.from({ length: 6 }, (_, i) => 19 + H + i * (H + f));
  const ultima = tops[tops.length - 1];
  for (const yj of tops) for (const x of assi) fig += clipO(x + larga / 2, yj, prof, zB, sp);
  for (const yj of tops) fig += doga([40, 720], [yj - H, yj], zB, sp, true);
  fig += dettaglioClip(-95, -840, 82, P(340 + larga / 2, ultima + 3, zB + sp * 0.5), prof, false);
  const rich = [[P(20, 300, 0), bx[0]], [P(115, 565, prof), bx[0]], [P(580 + larga / 2 + 12, ultima + 11, zB + sp * 0.6), bx[1]],
    [P(700, 17, zB + sp - 4), bx[1]], [P(650, 220, zB + sp), bx[1]]];
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");
  scrivi(file, titolo, m, fig, [TESTI.murat, alluminio ? TESTI.magAluV : TESTI.magLegnoV, TESTI.clipO, TESTI.partenza, TESTI.dogheO]);
}

// --- doghe verticali su magatelli orizzontali ----------------------------------------------------------------
function verticali(file, titolo, alluminio) {
  const m = muro(), bx = [-165, 885];
  const alto = alluminio ? 40 : 70, prof = alluminio ? 20 : 30, col = alluminio ? ALLUMINIO : LARICE;
  const zB = prof + 8, sp = 22;
  const assi = [40, 290, 540];
  let fig = m.corpo;
  for (const y of assi) {
    fig += scatola([20, 760], [y, y + alto], [0, prof], col);
    if (alluminio) fig += poly([P(20, y + 3, 3), P(20, y + 3, prof - 3), P(20, y + alto - 3, prof - 3), P(20, y + alto - 3, 3)], "#7d868f");
    for (const x of [60, 150]) fig += vite(x, y + alto / 2, prof + 0.3);
  }
  // doghe verticali da sinistra a destra, fuga 6
  const W = 70, f = 6, x0 = 230, n = 6, Y = [20, 470];
  // prima la clip di partenza, poi dopo ogni doga le clips del suo fianco destro (la doga dopo le copre)
  const coperti = assi.slice(0, 2);
  // prima tutte le clips (partenza + una per ogni fuga su ogni magatello coperto), poi le doghe che le coprono
  const fughe = [x0 - 3, ...Array.from({ length: n }, (_, i) => x0 + W + f / 2 + i * (W + f))];
  for (const xj of fughe) for (const y of coperti) fig += clipV(xj, y + alto / 2, prof, zB, sp);
  for (let i = 0; i < n; i++) fig += doga([x0 + i * (W + f), x0 + i * (W + f) + W], Y, zB, sp, false, i === 0);
  const xu = x0 + n * (W + f) - f;
  fig += dettaglioClip(-95, -840, 82, P(xu + 3, 290 + alto / 2, zB + sp * 0.5), prof, true);
  const rich = [[P(120, 200, 0), bx[0]], [P(100, 560 + alto / 2, prof), bx[0]], [P(xu + 11, 290 + alto / 2 + 12, zB + sp * 0.6), bx[1]],
    [P(xu - 30, 150, zB + sp), bx[1]]];
  fig += rich.map(([p, x], i) => richiamo(i + 1, p, x)).join("");
  scrivi(file, titolo, m, fig, [TESTI.murat, alluminio ? TESTI.magAluO : TESTI.magLegnoO, TESTI.clipV, TESTI.dogheV]);
}

orizzontali("wpc-orizzontali-legno.html", "Doghe orizzontali in WPC su magatelli in legno", false);
orizzontali("wpc-orizzontali-alluminio.html", "Doghe orizzontali in WPC su magatelli in alluminio", true);
verticali("wpc-verticali-legno.html", "Doghe verticali in WPC su magatelli in legno", false);
verticali("wpc-verticali-alluminio.html", "Doghe verticali in WPC su magatelli in alluminio", true);
