// Genera mockup/metodo.html con la stessa grafica del sito.
// Testata, menu, chiusura e fondo pagina vengono da chi-siamo.html, come per le pagine dei sistemi.
// Uso: node mockup/_genera-metodo.js
const fs = require("fs");
const path = require("path");
const DIR = __dirname;

const modello = fs.readFileSync(path.join(DIR, "chi-siamo.html"), "utf8");
const iCss = modello.indexOf("  /* pagina chi siamo");
const iStyle = modello.indexOf("</style>");
const iCorpo = modello.indexOf("<!-- MANIFESTO -->");
const iCoda = modello.indexOf('<section class="cta"');
if ([iCss, iStyle, iCorpo, iCoda].some((i) => i < 0)) throw new Error("chi-siamo.html è cambiata: controlla i segnaposto");

const CSS = `  /* pagina metodo */
  .mh{background:var(--nero);color:#fff;padding:140px 0 120px}
  .mh .occhiello{color:rgba(255,255,255,.6)}
  .mh h1{font-size:clamp(46px,7vw,104px);font-weight:300;text-transform:uppercase;letter-spacing:-.02em;line-height:.96;margin:20px 0 30px;max-width:1000px}
  .mh p{font-size:clamp(18px,1.6vw,22px);line-height:1.55;color:rgba(255,255,255,.78);max-width:680px}
  .mh .linea{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:70px}
  .mh .linea a{border-top:2px solid rgba(255,255,255,.25);padding-top:16px;color:#fff;transition:border-color .2s}
  .mh .linea a:hover{border-color:var(--rosso)}
  .mh .linea b{display:block;font-size:13px;letter-spacing:.14em;color:var(--rosso);margin-bottom:6px}
  .mh .linea span{font-size:16px}
  .fase{padding:110px 0;scroll-margin-top:80px}
  .fase:nth-of-type(even){background:var(--carta)}
  .fase .griglia{display:grid;grid-template-columns:.9fr 1.3fr;gap:80px;align-items:start}
  .fase .num{font-size:clamp(80px,10vw,150px);font-weight:300;line-height:.85;color:var(--rosso);letter-spacing:-.04em}
  .fase h2{font-size:clamp(34px,4vw,56px);font-weight:300;letter-spacing:-.02em;line-height:1.05;margin:22px 0 0}
  .fase .testo > p{font-size:20px;line-height:1.6;color:var(--tenue);max-width:640px}
  .fase ul{list-style:none;margin-top:34px;border-top:1px solid var(--linea)}
  .fase li{padding:16px 0 16px 34px;border-bottom:1px solid var(--linea);position:relative;font-size:17px}
  .fase li::before{content:"";position:absolute;left:0;top:26px;width:18px;height:2px;background:var(--rosso)}
  .fase .foto2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:40px}
  .fase .foto2 figure{position:relative;aspect-ratio:4/3;overflow:hidden;margin:0}
  .fase .foto2 img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .principi{background:var(--salvia);padding:110px 0}
  .principi h2{font-size:clamp(34px,4vw,56px);font-weight:300;letter-spacing:-.02em;margin:14px 0 46px}
  .principi .tre{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .principi .tre div{background:rgba(255,255,255,.55);padding:34px 28px}
  .principi .tre b{display:block;width:34px;height:3px;background:var(--rosso);margin-bottom:24px}
  .principi h3{font-size:22px;font-weight:500;margin-bottom:10px}
  .principi p{color:rgba(20,23,25,.7);font-size:16px}
  @media (max-width:900px){
    .mh{padding:90px 0 80px}
    .mh .linea{grid-template-columns:1fr 1fr;margin-top:46px}
    .fase{padding:80px 0}
    .fase .griglia{grid-template-columns:1fr;gap:28px}
    .principi .tre{grid-template-columns:1fr}
  }
  @media (max-width:520px){ .fase .foto2{grid-template-columns:1fr} }
`;

const FASI = [
  {
    id: "analisi", titolo: "Analisi del progetto",
    testo: "Il lavoro parte dagli elaborati del progettista. Su piante, prospetti e sezioni valutiamo superfici, aperture e punti singolari della facciata e individuiamo il sistema di rivestimento più adatto all’edificio.",
    voci: ["Elaborati progettuali in formato DWG o PDF", "Computo delle superfici da rivestire", "Individuazione dei nodi: aperture, spigoli, attacco a terra e in copertura", "Proposta del sistema di rivestimento e di fissaggio"],
  },
  {
    id: "rilievo", titolo: "Sopralluogo e rilievo",
    testo: "In cantiere verifichiamo che lo stato di fatto corrisponda al progetto: geometria della facciata, natura e stato della muratura di supporto, planarità e fuori piombo delle pareti.",
    voci: ["Rilievo geometrico della facciata", "Verifica della muratura di supporto", "Controllo di planarità e fuori piombo", "Documentazione fotografica dello stato di fatto"],
  },
  {
    id: "progettazione", titolo: "Progettazione esecutiva",
    testo: "Definiamo sistema, stratigrafia e nodi costruttivi. Ancoraggi e sottostruttura sono dimensionati in funzione del supporto e delle sollecitazioni di progetto, peso del rivestimento e azione del vento.",
    voci: ["Scelta del sistema e del tipo di fissaggio", "Stratigrafia e dettagli dei nodi costruttivi", "Dimensionamento di ancoraggi e sottostruttura", "Disposizione delle lastre e dei giunti"],
  },
  {
    id: "installazione", titolo: "Installazione della facciata",
    testo: "Le nostre squadre eseguono il tracciamento, il montaggio della sottostruttura e la posa del rivestimento con il sistema di fissaggio previsto, nel rispetto di punti fissi, giunti di dilatazione e intercapedine di ventilazione.",
    voci: ["Tracciamento del reticolo di riferimento", "Montaggio della sottostruttura", "Posa del rivestimento", "Controllo di allineamenti, fughe e planarità"],
    foto: [["progetti/san-rocco-casoria-staffe.jpg", "Staffe fissate alla muratura"], ["progetti/don-milani-parete-posa.jpg", "Posa del rivestimento"]],
  },
  {
    id: "consegna", titolo: "Consegna e documentazione",
    testo: "A fine lavori verifichiamo l’opera insieme al committente e consegniamo la documentazione tecnica di lavori e materiali.",
    voci: ["Verifica finale dell’opera", "Documentazione tecnica dei materiali impiegati", "Documentazione dei lavori eseguiti"],
  },
];

const corpo = `<!-- APERTURA -->
<section class="mh">
  <div class="wrap">
    <span class="occhiello">Il metodo Ventilàrt</span>
    <h1>Dal progetto alla consegna</h1>
    <p>Cinque fasi, un unico referente tecnico e la posa eseguita dalle nostre squadre.</p>
    <nav class="linea" aria-label="Fasi del metodo">
${FASI.map((f, i) => `      <a href="#${f.id}"><b>0${i + 1}</b><span>${f.titolo}</span></a>`).join("\n")}
    </nav>
  </div>
</section>

${FASI.map((f, i) => `<!-- FASE ${i + 1} -->
<section class="fase" id="${f.id}">
  <div class="wrap griglia">
    <div>
      <div class="num">0${i + 1}</div>
      <h2>${f.titolo}</h2>
    </div>
    <div class="testo">
      <p>${f.testo}</p>
      <ul>
${f.voci.map((v) => `        <li>${v}</li>`).join("\n")}
      </ul>${f.foto ? `
      <div class="foto2">
${f.foto.map(([src, alt]) => `        <figure><img src="../assets/foto/${src}" alt="${alt}"></figure>`).join("\n")}
      </div>` : ""}
    </div>
  </div>
</section>
`).join("\n")}
<!-- PRINCIPI -->
<section class="principi">
  <div class="wrap">
    <span class="occhiello">Come lavoriamo</span>
    <h2>Tre principi, in ogni cantiere</h2>
    <div class="tre">
      <div><b></b><h3>Un solo referente</h3><p>Un unico interlocutore tecnico dall’analisi del progetto alla consegna.</p></div>
      <div><b></b><h3>Squadre interne</h3><p>La posa è eseguita dal nostro personale.</p></div>
      <div><b></b><h3>Documentazione completa</h3><p>Di lavori e materiali, consegnata a fine cantiere.</p></div>
    </div>
  </div>
</section>

`;

let testa = modello.slice(0, iCss) + CSS + modello.slice(iStyle, iCorpo);
testa = testa.replace(/<title>[^<]*<\/title>/, "<title>Metodo — Ventilàrt</title>");
testa = testa.replace(' aria-current="page"', "");
testa = testa.split('<a href="metodo.html">').join('<a href="metodo.html" aria-current="page">');
fs.writeFileSync(path.join(DIR, "metodo.html"), testa + corpo + modello.slice(iCoda));
console.log("scritto metodo.html");
