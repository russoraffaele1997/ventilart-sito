// Genera le pagine del menu (Chi siamo, Lavorazioni, I nostri progetti, Contatti).
// Per ora sono pagine "in lavorazione": grafica, menu e piè di pagina sono quelli del blog.
// Uso: node _genera-pagine.js  (dalla cartella _proposte)

const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const A = '../assets';

const pagine = [
  {
    file: 'chi-siamo.html',
    voce: 'Chi siamo',
    titolo: 'Chi siamo',
    desc: 'Ventilàrt è un’impresa specializzata nella progettazione e posa di facciate ventilate.',
    prossimamente: 'La storia di Ventilàrt, la squadra e la zona in cui lavoriamo.',
  },
  {
    file: 'lavorazioni.html',
    voce: 'Lavorazioni',
    titolo: 'Lavorazioni',
    desc: 'Facciate ventilate in gres porcellanato, fibrocemento, legno e composito.',
    prossimamente: 'Le schede dettagliate di ogni sistema: materiali, finiture, sottostruttura e campi di impiego.',
  },
  {
    file: 'progetti.html',
    voce: 'I nostri progetti',
    titolo: 'I nostri progetti',
    desc: 'Le facciate ventilate realizzate da Ventilàrt.',
    prossimamente: 'Le foto e le schede dei nostri cantieri, man mano che vengono completati.',
  },
  {
    file: 'contatti.html',
    voce: 'Contatti',
    titolo: 'Contatti',
    desc: 'Richiedi un sopralluogo o un’informazione a Ventilàrt.',
    prossimamente: 'Orari, email e il modulo per richiedere un sopralluogo direttamente da questa pagina.',
    extra: `
  <div class="recapiti">
    <a class="rec" href="tel:+393318364042"><span class="ico">☎</span><b>Telefono</b><span>331 836 4042</span></a>
    <a class="rec" href="https://wa.me/393318364042" target="_blank" rel="noopener"><span class="ico">✆</span><b>WhatsApp</b><span>Scrivici un messaggio</span></a>
    <a class="rec" href="https://www.google.com/maps/search/?api=1&amp;query=Via+Padula+19+Casoria+NA" target="_blank" rel="noopener"><span class="ico">⌖</span><b>Sede</b><span>Via Padula 19, 80026 Casoria (NA)</span></a>
  </div>
`,
  },
];

// Voci del menu: le stesse in tutte le pagine
const MENU = [
  ['Chi siamo', 'chi-siamo.html'],
  ['Lavorazioni', 'lavorazioni.html'],
  ['I nostri progetti', 'progetti.html'],
  ['Blog', 'blog/index.html'],
  ['Contatti', 'contatti.html'],
];

const head = (p) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.titolo} — Ventilàrt</title>
<meta name="description" content="${p.desc.replace(/"/g, '&quot;')}">
<link rel="icon" href="${A}/logo/ventilart-simbolo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&family=Barlow+Condensed:wght@600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="blog/blog.css">
<link rel="stylesheet" href="chat/chat.css">
<link rel="stylesheet" href="anim/anim.css">
</head>
<body>
<div class="wrap">
  <div class="top">
    <a href="d-moderno.html" class="brand"><img src="${A}/logo/ventilart-orizzontale.svg" alt="Ventilàrt"></a>
    <div class="r">
      <a class="btn" href="d-moderno.html#contatti">Richiedi un sopralluogo</a>
      <button class="burger" id="apri" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu"><span></span></button>
    </div>
  </div>
`;

const foot = `
<footer>
  <div class="wrap">
    <div><img src="${A}/logo/ventilart-orizzontale-bianco.svg" alt="Ventilàrt"><p>Progettazione e posa di facciate ventilate.</p><p style="margin-top:14px">Via Padula 19, 80026 Casoria (NA)<br>Tel. <a href="tel:+393318364042">331 836 4042</a></p><p style="margin-top:14px">© Ventilàrt · P.IVA [da inserire]</p></div>
    <div><h4>Sito</h4><ul>${MENU.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
    <div><h4>Informazioni</h4><ul><li><a href="#">Privacy</a></li><li><a href="#">Cookie</a></li></ul></div>
  </div>
</footer>

<div class="veil" id="velo"></div>
<aside class="drawer" id="menu" aria-hidden="true">
  <div class="dh"><img src="${A}/logo/ventilart-orizzontale-bianco.svg" alt="Ventilàrt"><button class="close" id="chiudi" aria-label="Chiudi il menu">×</button></div>
  <nav>
${MENU.map(([t, h]) => `    <a href="${h}">${t}</a>`).join('\n')}
  </nav>
  <div class="df">
    <b>Contatti</b>
    <span>Tel. <a href="tel:+393318364042">331 836 4042</a></span>
    <span>Via Padula 19, 80026 Casoria (NA)</span>
    <span>[email da inserire]</span>
    <a class="btn" href="d-moderno.html#contatti">Richiedi un sopralluogo</a>
  </div>
</aside>
<script src="blog/menu.js"></script>
<script src="anim/anim.js"></script>
<script src="chat/chat.js" data-base=""></script>
</body>
</html>
`;

for (const p of pagine) {
  fs.writeFileSync(path.join(DIR, p.file), head(p) + `
  <div class="intro">
    <span class="pill">${p.voce}</span>
    <h1>${p.titolo}</h1>
    <p>${p.desc}</p>
  </div>
${p.extra || ''}
  <div class="wip">
    <span class="wip-tag"><span class="dot"></span>Pagina in lavorazione</span>
    <h2>Stiamo preparando questa pagina</h2>
    <p>Presto qui troverai: ${p.prossimamente.charAt(0).toLowerCase() + p.prossimamente.slice(1)}</p>
    <div class="wip-btns">
      <a class="btn" href="d-moderno.html">Torna alla pagina principale</a>
      <a class="btn outline" href="#" data-assistente>Chiedi all’assistente virtuale</a>
    </div>
  </div>
</div>
` + foot);
}
console.log('create:', pagine.map((p) => p.file).join(', '));
