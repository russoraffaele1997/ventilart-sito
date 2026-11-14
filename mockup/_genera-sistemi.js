// Genera le 4 pagine dei sistemi del mockup (sistema-*.html) con la stessa grafica della home.
// Testata, menu, chiusura e fondo pagina vengono da chi-siamo.html, così restano uguali in tutto il sito.
// Uso: node mockup/_genera-sistemi.js
const fs = require("fs");
const path = require("path");
const DIR = __dirname;

const modello = fs.readFileSync(path.join(DIR, "chi-siamo.html"), "utf8");
const iCss = modello.indexOf("  /* pagina chi siamo");
const iStyle = modello.indexOf("</style>");
const iCorpo = modello.indexOf("<!-- MANIFESTO -->");
const iCoda = modello.indexOf('<section class="cta"');
if ([iCss, iStyle, iCorpo, iCoda].some((i) => i < 0)) throw new Error("chi-siamo.html è cambiata: controlla i segnaposto");

const CSS = `  /* pagine dei sistemi */
  .sh{position:relative;min-height:calc(100vh - 106px);display:grid;grid-template-columns:1fr 1fr;background:var(--nero);color:#fff}
  .sh .testo{padding:110px 70px 90px max(24px,calc((100vw - 1240px)/2 + 24px));display:flex;flex-direction:column;justify-content:center}
  .sh .occhiello{color:rgba(255,255,255,.6)}
  .sh h1{font-size:clamp(44px,5.6vw,84px);font-weight:300;text-transform:uppercase;letter-spacing:-.02em;line-height:.98;margin:16px 0 26px}
  .sh .lead{font-size:clamp(18px,1.5vw,21px);line-height:1.6;color:rgba(255,255,255,.8);max-width:560px}
  .sh .chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:30px}
  .sh .chips span{border:1px solid rgba(255,255,255,.25);border-radius:99px;padding:6px 14px;font-size:13px;letter-spacing:.04em}
  .sh .foto{position:relative;overflow:hidden}
  .sh .foto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .sez{padding:120px 0}
  .sez h2{font-size:clamp(36px,4.6vw,64px);font-weight:300;letter-spacing:-.02em;line-height:1.05;margin:14px 0 26px}
  .sez .lead{font-size:20px;color:var(--tenue);max-width:760px}
  .vant{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--linea);border:1px solid var(--linea);margin-top:46px}
  .vant div{background:#fff;padding:34px 28px;min-height:240px}
  .vant b{display:block;font-size:13px;color:var(--rosso);letter-spacing:.14em;margin-bottom:18px}
  .vant h3{font-size:22px;font-weight:500;line-height:1.2;margin-bottom:10px}
  .vant p{color:var(--tenue);font-size:15px}
  .prop{background:var(--carta)}
  .prop .griglia{display:grid;grid-template-columns:1fr 1.25fr;gap:80px;align-items:start}
  .scheda{border-top:1px solid var(--linea)}
  .scheda div{display:grid;grid-template-columns:200px 1fr;gap:24px;padding:18px 0;border-bottom:1px solid var(--linea)}
  .scheda dt{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--tenue);padding-top:3px}
  .scheda dd{font-size:17px}
  .qual{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:46px}
  .qual div{border-top:2px solid var(--nero);padding-top:18px}
  .qual h3{font-size:20px;font-weight:500;margin-bottom:8px}
  .qual p{color:var(--tenue);font-size:16px}
  .strat{background:var(--nero);color:#fff}
  .strat .occhiello{color:rgba(255,255,255,.6)}
  .strat .lead{color:rgba(255,255,255,.72)}
  .strat .griglia{display:grid;grid-template-columns:1.1fr 1fr;gap:70px;align-items:center;margin-top:40px}
  .strat svg{width:100%;height:auto;display:block}
  .strati-el{list-style:none;counter-reset:s}
  .strati-el li{display:grid;grid-template-columns:44px 1fr;gap:6px 14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.14)}
  .strati-el li span{grid-row:span 2;width:30px;height:30px;border-radius:50%;background:#fff;color:var(--nero);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500}
  .strati-el b{font-weight:500;font-size:18px}
  .strati-el small{color:rgba(255,255,255,.66);font-size:15px}
  .posa .gruppo{margin-top:56px}
  .posa .gruppo > h3{font-size:13px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--tenue);padding-bottom:14px;border-bottom:1px solid var(--linea)}
  .opzioni{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}
  .opzione{background:var(--carta);display:grid;grid-template-columns:140px 1fr;gap:30px;align-items:center;padding:30px}
  .opzione.sola{grid-column:1/-1;grid-template-columns:140px 1fr;max-width:820px}
  .opzione svg{width:100%;height:auto;background:#fff}
  .opzione h4{font-size:24px;font-weight:400;line-height:1.15;margin-bottom:10px}
  .opzione p{color:var(--tenue);font-size:16px}
  .opzione .tag{display:inline-block;margin-top:14px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--rosso)}
  .altri{padding:100px 0;background:var(--carta)}
  .altri .riga{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:36px}
  .altri a{position:relative;display:block;aspect-ratio:4/3;overflow:hidden;color:#fff}
  .altri a img{transition:transform .6s}
  .altri a:hover img{transform:scale(1.04)}
  .altri a::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.6))}
  .altri a span{position:absolute;left:22px;bottom:18px;z-index:1;font-size:22px}
  @media (max-width:900px){
    .sh{grid-template-columns:1fr;min-height:0}
    .sh .testo{padding:70px 24px 50px}
    .sh .foto{height:360px;order:-1}
    .sez{padding:80px 0}
    .vant{grid-template-columns:1fr 1fr}
    .vant div{min-height:0}
    .prop .griglia,.strat .griglia{grid-template-columns:1fr;gap:36px}
    .scheda div{grid-template-columns:1fr;gap:4px}
    .qual,.opzioni,.altri .riga{grid-template-columns:1fr}
    .opzione,.opzione.sola{grid-template-columns:120px 1fr;gap:20px;padding:24px}
  }
  @media (max-width:520px){.vant{grid-template-columns:1fr}}
`;

// ---------------------------------------------------------------------------
// Disegni tecnici (sezione orizzontale vista dall'alto): muro a sinistra, rivestimento a destra.
// ---------------------------------------------------------------------------
const C = { muro: "#b9b2a6", iso: "#e8dca4", staffa: "#5d6670", prof: "#30363B", aria: "#eef3f6", fix: "#d7202b" };

function sezione({ profilo = "T", fissaggio = "gancio", colore = "#d8d0c3", spess = 14, numeri = true, zoom = false }) {
  const H = 320;
  const xm = 30, wm = 90;           // muratura
  const xi = xm + wm, wi = 90;      // isolante
  const xa = xi + wi;               // inizio intercapedine
  const xp = 300;                   // faccia del profilo verso il rivestimento
  const xr = xp + (fissaggio === "silicone" ? 8 : fissaggio === "gancio" ? 12 : 2); // faccia interna del rivestimento
  const yc = H / 2;
  const W = xr + spess + 24;
  const vb = zoom ? `${xa - 6} 20 ${W - 14 - (xa - 6)} ${H - 40}` : `0 0 ${W} ${H}`;
  let s = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sezione della facciata ventilata">
  <defs><pattern id="tratt" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#8f887c" stroke-width="2"/></pattern>
  <pattern id="lana" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M0 6 q4.5 -6 9 0 t9 0" fill="none" stroke="#c9b866" stroke-width="1.4"/></pattern></defs>
  <rect x="${xm}" y="20" width="${wm}" height="${H - 40}" fill="${C.muro}"/><rect x="${xm}" y="20" width="${wm}" height="${H - 40}" fill="url(#tratt)" opacity=".45"/>
  <rect x="${xi}" y="20" width="${wi}" height="${H - 40}" fill="${C.iso}"/><rect x="${xi}" y="20" width="${wi}" height="${H - 40}" fill="url(#lana)"/>
  <rect x="${xa}" y="20" width="${xr - xa}" height="${H - 40}" fill="${C.aria}"/>`;
  // frecce dell'aria
  for (const y of [62, 258]) s += `<circle cx="${(xa + xp - 44) / 2}" cy="${y}" r="9" fill="none" stroke="#8fb0c2" stroke-width="1.5"/><circle cx="${(xa + xp - 44) / 2}" cy="${y}" r="2.5" fill="#8fb0c2"/>`; // aria che sale verso chi guarda
  // staffa a L con tassello nel muro (con il profilo a omega la staffa arriva sull'ala superiore del profilo)
  const yb = profilo === "omega" ? yc - 52 : yc;
  s += `<rect x="${xm + 40}" y="${yb - 3}" width="${wm - 40}" height="6" fill="#8a8f95"/>
  <path d="M${xi - 2} ${yb - 26} h8 v${26 - 4} h${xp - 40 - xi} v8 h${-(xp - 40 - xi) - 8} z" fill="${C.staffa}"/>`;
  // profilo
  if (profilo === "T") {
    s += `<rect x="${xp - 44}" y="${yc - 4}" width="40" height="8" fill="${C.prof}"/><rect x="${xp - 6}" y="${yc - 60}" width="6" height="120" fill="${C.prof}"/>`;
  } else if (profilo === "omega") {
    s += `<path d="M${xp - 44} ${yc - 64} V${yc - 40} H${xp - 3} V${yc + 40} H${xp - 44} V${yc + 64}" fill="none" stroke="${C.prof}" stroke-width="6" stroke-linejoin="miter"/>`;
  } else {
    s += `<rect x="${xp - 44}" y="${yc - 4}" width="40" height="8" fill="${C.prof}"/><rect x="${xp - 6}" y="${yc - 45}" width="6" height="90" fill="${C.prof}"/>`;
  }
  // fissaggio
  if (fissaggio === "silicone") {
    for (const y of [yc - 40, yc + 32]) s += `<rect x="${xp}" y="${y}" width="${xr - xp}" height="10" rx="3" fill="${C.fix}"/>`;
  } else if (fissaggio === "gancio") {
    for (const y of [yc - 46, yc + 30]) s += `<path d="M${xp} ${y} h${xr - xp + 4} v16 h-4 v-10 h${-(xr - xp)} z" fill="${C.fix}"/>`;
  } else if (fissaggio === "rivetto") {
    for (const y of [yc - 30, yc + 26]) s += `<rect x="${xp - 10}" y="${y}" width="${xr - xp + spess + 14}" height="5" fill="${C.fix}"/><rect x="${xr + spess}" y="${y - 4}" width="5" height="13" rx="1" fill="${C.fix}"/>`;
  } else if (fissaggio === "cassetta") {
    s += `<path d="M${xp} ${yc - 96} h${xr - xp + spess} v6 h${-(xr - xp + spess) + 6} v20 h-6 z" fill="${C.fix}"/><path d="M${xp} ${yc + 96} h${xr - xp + spess} v-6 h${-(xr - xp + spess) + 6} v-20 h-6 z" fill="${C.fix}"/>`;
  }
  // rivestimento
  s += `<rect x="${xr}" y="20" width="${spess}" height="${H - 40}" fill="${colore}" stroke="#141719" stroke-width="1.2"/>`;
  if (numeri) {
    // numeri in alto sopra ogni strato
    const top = [[xm + wm / 2, 1], [xi + wi / 2, 3], [(xa + xp - 46) / 2 + 10, 4], [xr + spess / 2, 7]];
    const bot = [[xi + 10, 2], [xp - 24, 5], [xr - 3, 6]];
    for (const [x, t] of top) s += `<circle cx="${x}" cy="10" r="10" fill="#fff"/><text x="${x}" y="14.5" font-size="12" font-family="Jost,sans-serif" fill="#141719" text-anchor="middle">${t}</text>`;
    for (const [x, t] of bot) s += `<circle cx="${x}" cy="${H - 10}" r="10" fill="#fff"/><text x="${x}" y="${H - 5.5}" font-size="12" font-family="Jost,sans-serif" fill="#141719" text-anchor="middle">${t}</text>`;
  }
  return s + "</svg>";
}

// ---------------------------------------------------------------------------
// I quattro sistemi. Solo informazioni già presenti sul vecchio sito, nel manuale tecnico
// o date da Ventilàrt; niente marchi dei produttori (per ora non li citiamo).
// ---------------------------------------------------------------------------
const STRATI_BASE = (sotto, fiss, riv) => [
  ["Muratura esistente", "Il supporto: ne verifichiamo il tipo prima di scegliere gli ancoraggi."],
  ["Staffe e ancoraggi", "Staffe in alluminio fissate al muro con tasselli adatti alla muratura."],
  ["Isolante", "Pannelli continui posati sul muro, senza interruzioni (anche non combustibili, come la lana di roccia)."],
  ["Intercapedine ventilata", "L'aria entra in basso ed esce in alto: porta via calore e umidità."],
  ["Sottostruttura", sotto],
  ["Fissaggio", fiss],
  ["Rivestimento", riv],
];

const SISTEMI = [
  {
    file: "sistema-ceramico.html",
    nome: "Rivestimento ceramico",
    breve: "Lastre in gres porcellanato e ceramica",
    foto: "rivestimento-ceramico-travertino.jpg",
    alt: "Facciata ventilata in lastre ceramiche effetto travertino",
    colore: "#e3d9c6",
    spess: 12,
    lead: "Lastre ceramiche cotte ad altissima temperatura: compatte, praticamente impermeabili e stabili nel colore. Per le facciate usiamo lastre di grande formato e superfici ultracompatte.",
    chips: ["Grande formato", "Non assorbe acqua", "Colore stabile", "Zero manutenzione"],
    vantaggi: [
      ["Non assorbe acqua", "Resiste a gelo, sbalzi termici, raggi UV, smog e agenti chimici: mantiene planarità e aspetto nel tempo."],
      ["Colori che non cambiano", "Il gres è cotto, non verniciato: il colore è stabile e non scolorisce al sole."],
      ["Sicuro", "Le lastre per facciata hanno sul retro una rete in fibra di vetro incollata: in caso di urto trattiene i frammenti."],
      ["Zero manutenzione", "Si pulisce con acqua e detergenti neutri; esistono anche finiture autopulenti."],
    ],
    scheda: [
      ["Materiale", "Gres porcellanato e superfici ceramiche ultracompatte"],
      ["Spessore", "Da 6 a 12 mm; le superfici ultracompatte anche 8 e 20 mm"],
      ["Formati più usati", "60 × 120, 120 × 240, 120 × 278, 160 × 320 cm e sottomoduli"],
      ["Reazione al fuoco", "Materiale minerale, non alimenta le fiamme"],
      ["Assorbimento d'acqua", "Praticamente nullo"],
      ["Manutenzione", "Praticamente nessuna"],
    ],
    qualita: [
      ["Finiture", "Effetto pietra, cemento, marmo, legno, metallo e tinta unita, opache o lucide. Si possono abbinare formati diversi sulla stessa facciata."],
      ["Lastre di progetto", "Oltre ai moduli standard si lavora su grandi lastre su misura, come le lastre retinate 270 × 180 cm effetto travertino di Palazzo Rue."],
      ["Sostenibilità", "Il gres è un materiale minerale, inerte e durevole; esistono lastre composte interamente da materiali riciclati e riciclabili."],
    ],
    strati: STRATI_BASE(
      "Montanti verticali in alluminio, a T oppure a omega.",
      "Silicone strutturale oppure aggancio meccanico.",
      "Lastre ceramiche di grande formato."
    ),
    sezioneBase: { profilo: "T", fissaggio: "gancio" },
    posa: [
      {
        titolo: "Sottostruttura",
        opzioni: [
          { nome: "Con profili a T", testo: "Montanti verticali con sezione a T fissati alle staffe: l'ala esterna del profilo fa da appoggio alle lastre.", svg: { profilo: "T", fissaggio: "nessuno" } },
          { nome: "Con profili a omega", testo: "Montanti verticali con sezione a omega (a cappello) fissati alle staffe: offrono un appoggio largo e rigido alle lastre.", svg: { profilo: "omega", fissaggio: "nessuno" } },
        ],
      },
      {
        titolo: "Fissaggio delle lastre",
        opzioni: [
          { nome: "Incollaggio con silicone strutturale", testo: "Le lastre sono incollate ai profili con un sigillante strutturale: nessun elemento visibile, la facciata resta continua.", tag: "Fissaggio invisibile", svg: { profilo: "T", fissaggio: "silicone" } },
          { nome: "Aggancio meccanico", testo: "Ganci fissati sul retro della lastra la agganciano alla sottostruttura, oppure graffe a vista: la lastra si smonta e si sostituisce singolarmente.", tag: "Lastra sostituibile", svg: { profilo: "T", fissaggio: "gancio" } },
        ],
      },
    ],
  },
  {
    file: "sistema-fibrocemento.html",
    nome: "Fibrocemento",
    breve: "Pannelli colorati in massa, opachi e materici",
    foto: "fibrocemento-doghe.jpg",
    alt: "Facciata ventilata in lastre di fibrocemento rigate",
    colore: "#9a9d9c",
    spess: 10,
    lead: "Pannelli a base di cemento, fibre e additivi, colorati in massa: superficie opaca e materica, per facciate dal linguaggio sobrio e architettonico.",
    chips: ["Colorato in massa", "Leggero", "Tagliabile su misura", "Ottimo al fuoco"],
    vantaggi: [
      ["Colore nella massa", "Il colore attraversa tutto il pannello: la superficie resta uniforme e la forma stabile nel tempo."],
      ["Leggero e su misura", "Pannelli leggeri e molto stabili anche nei grandi formati, che si tagliano in qualsiasi forma: la facciata si disegna su misura."],
      ["Ottimo comportamento al fuoco", "Combustibilità limitata, bassissima produzione di fumo, nessuna goccia incandescente."],
      ["Posa libera", "Verticale, orizzontale, sfalsata o libera, per disegnare la facciata come vuole il progetto."],
    ],
    scheda: [
      ["Materiale", "Cemento, fibre e additivi, colorato in massa"],
      ["Spessore", "8–10 mm"],
      ["Formato", "Circa 305 × 122 cm, tagliabile in qualsiasi dimensione o forma"],
      ["Reazione al fuoco", "Classe A2-s1, d0 (EN 13501-1)"],
      ["Durata", "Oltre 50 anni, secondo i produttori"],
      ["Manutenzione", "Bassa"],
    ],
    qualita: [
      ["Finiture", "Superfici lisce colorate, levigate con venature naturali, leggermente materiche, rigate tridimensionali o effetto pietra. Molte tinte, anche personalizzabili."],
      ["Manutenzione", "I pannelli resistono ad acqua, temperature estreme, agenti chimici e organismi viventi. Sono possibili trattamenti antigraffiti e antismog."],
      ["Sostenibilità", "Pannelli riciclabili; esistono prodotti conformi ai CAM (Criteri Ambientali Minimi), un vantaggio concreto negli appalti pubblici."],
    ],
    strati: STRATI_BASE(
      "Montanti verticali in alluminio.",
      "Ganci a scomparsa oppure rivetti a vista.",
      "Pannelli in fibrocemento."
    ),
    sezioneBase: { profilo: "T", fissaggio: "rivetto" },
    posa: [
      {
        titolo: "Fissaggio dei pannelli",
        opzioni: [
          { nome: "Agganciato", testo: "Ganci fissati sul retro del pannello lo agganciano alla sottostruttura: nessun fissaggio visibile in facciata.", tag: "Fissaggio invisibile", svg: { profilo: "T", fissaggio: "gancio" } },
          { nome: "Fissato con rivetti", testo: "Il pannello è fissato ai profili con rivetti a vista, anche nello stesso colore del pannello: posa semplice e veloce.", tag: "Rivetti anche in tinta", svg: { profilo: "T", fissaggio: "rivetto" } },
        ],
      },
    ],
  },
  {
    file: "sistema-wpc.html",
    nome: "WPC",
    breve: "Doghe e frangisole effetto legno",
    foto: "progetti/barbuti-san-leucio-facciata.jpg",
    alt: "Facciata in doghe di WPC effetto legno",
    colore: "#8a5a3b",
    spess: 18,
    lead: "Doghe, lamelle e frangisole in un composito di fibre di legno e polimeri: il calore del legno, senza i suoi limiti.",
    chips: ["Effetto legno", "Non si deforma", "Niente oliature", "Frangisole"],
    vantaggi: [
      ["Il legno senza pensieri", "Non si spacca, non si deforma e non scolorisce; non va oliato né verniciato."],
      ["Protetto", "Un guscio esterno avvolge il profilo e lo difende da raggi UV, umidità, macchie, muffe, parassiti, cloro e salsedine."],
      ["Frangisole che lavorano", "Davanti alle finestre schermano il sole diretto, riducono il surriscaldamento e lasciano passare luce e vista."],
      ["Da materiale riciclato", "Fibre di legno rigenerate unite a plastica riciclata: gran parte del materiale viene dal riciclo."],
    ],
    scheda: [
      ["Materiale", "Composito di fibre di legno e polimeri, con guscio protettivo esterno"],
      ["Elementi", "Doghe, lamelle, listelli e frangisole"],
      ["Posa", "Orizzontale o verticale; frangisole fissi, scorrevoli o mobili"],
      ["Finiture", "Essenze effetto legno chiare, calde e scure"],
      ["Reazione al fuoco", "Dipende dal prodotto: la verifichiamo in progetto sulla scheda tecnica"],
      ["Manutenzione", "Nessuna oliatura o trattamento: basta acqua"],
    ],
    qualita: [
      ["Com'è fatto", "Un'anima in composito di legno e polimeri, avvolta da uno scudo esterno che la protegge dagli agenti atmosferici."],
      ["Sottostruttura in tono", "Le doghe si montano su una sottostruttura in alluminio, anche preverniciata nel tono del rivestimento, come nei nostri progetti."],
      ["Frangisole su misura", "Passo e inclinazione delle lamelle si decidono in progetto, in base all'esposizione della facciata."],
    ],
    strati: STRATI_BASE(
      "Montanti in alluminio, anche preverniciati nel tono del rivestimento.",
      "Clip di aggancio oppure rivetti.",
      "Doghe in WPC con anima in alluminio."
    ),
    sezioneBase: { profilo: "T", fissaggio: "gancio" },
    posa: [
      {
        titolo: "Fissaggio delle doghe",
        opzioni: [
          { nome: "Agganciato", testo: "Le doghe sono trattenute da clip di aggancio fissate alla sottostruttura: nessun fissaggio visibile.", tag: "Fissaggio invisibile", svg: { profilo: "T", fissaggio: "gancio" } },
          { nome: "Fissato con rivetti", testo: "Le doghe sono fissate ai profili con rivetti: un collegamento diretto e robusto.", tag: "Collegamento diretto", svg: { profilo: "T", fissaggio: "rivetto" } },
        ],
      },
    ],
  },
  {
    file: "sistema-alluminio-composito.html",
    nome: "Alluminio composito",
    breve: "Pannelli leggeri e planari, anche curvi",
    foto: "composito-a.jpg",
    alt: "Facciata ventilata in pannelli di alluminio composito",
    colore: "#c3c8cc",
    spess: 8,
    lead: "Pannelli formati da due lamiere di alluminio con un nucleo interno: leggeri, rigidi e perfettamente planari, per superfici continue e moderne, anche curve.",
    chips: ["Leggerissimo", "Planare", "Anche curvo", "Colori RAL"],
    vantaggi: [
      ["Leggerissimo", "Uno dei rivestimenti più leggeri: lamiere sottili e nucleo leggero facilitano trasporto e posa, anche in quota."],
      ["Perfettamente planare", "Superfici continue e spigoli netti; i pannelli restano rigidi e planari anche sugli edifici alti."],
      ["Anche curvo", "Con sottostrutture adatte si realizzano facciate curve e forme particolari."],
      ["Finiture durevoli", "I trattamenti di finitura proteggono colore e superficie da raggi UV, pioggia e smog."],
    ],
    scheda: [
      ["Composizione", "Due lamiere di alluminio con nucleo interno"],
      ["Formati", "Larghezza 100–120 cm (o multipli), altezza da 100 a 600 cm, anche su misura"],
      ["Reazione al fuoco", "Gamme in classe A2-s1, d0 con nucleo minerale"],
      ["Finiture", "Colori RAL, opache, lucide, metallizzate ed effetto legno"],
      ["Manutenzione", "Lavaggio periodico con acqua e detergente neutro"],
      ["Riciclabilità", "L'alluminio è un materiale riciclabile"],
    ],
    qualita: [
      ["Sicurezza antincendio", "La reazione al fuoco dipende dal nucleo del pannello: per le facciate si usano gamme con nucleo minerale, scelte in base all'altezza e al tipo di edificio."],
      ["Superfici continue", "Pannelli grandi e piegati sui bordi: la facciata appare come una superficie unica, senza fissaggi in vista."],
      ["Durata", "Le finiture proteggono il colore nel tempo; basta un lavaggio periodico."],
    ],
    strati: STRATI_BASE(
      "Montanti verticali in alluminio.",
      "Aggancio a cassetta, senza fissaggi visibili.",
      "Pannelli in alluminio composito piegati sui bordi."
    ),
    sezioneBase: { profilo: "T", fissaggio: "cassetta" },
    posa: [
      {
        titolo: "Fissaggio dei pannelli",
        opzioni: [
          { nome: "Agganciato a cassetta", testo: "Il pannello è piegato sui bordi a formare una cassetta e viene agganciato alla sottostruttura: nessun fissaggio visibile, superficie continua.", tag: "Unico sistema di posa", sola: true, svg: { profilo: "T", fissaggio: "cassetta" } },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
function pagina(s) {
  let testa = modello.slice(0, iCss) + CSS + modello.slice(iStyle, iCorpo);
  testa = testa.replace(/<title>[^<]*<\/title>/, `<title>${s.nome} — Ventilàrt</title>`);
  testa = testa.replace(' aria-current="page"', "");
  testa = testa.split(`<a href="${s.file}">`).join(`<a href="${s.file}" aria-current="page">`);
  const coda = modello.slice(iCoda);
  const altri = SISTEMI.filter((x) => x !== s);
  const corpo = `<!-- HERO DEL SISTEMA -->
<section class="sh">
  <div class="testo">
    <span class="occhiello">Sistemi · ${s.breve}</span>
    <h1>${s.nome}</h1>
    <p class="lead">${s.lead}</p>
    <div class="chips">${s.chips.map((c) => `<span>${c}</span>`).join("")}</div>
  </div>
  <div class="foto"><img src="../assets/foto/${s.foto}" alt="${s.alt}"></div>
</section>

<!-- VANTAGGI -->
<section class="sez">
  <div class="wrap">
    <span class="occhiello">Vantaggi</span>
    <h2>Perché sceglierlo</h2>
    <div class="vant">
${s.vantaggi.map(([t, p], i) => `      <div><b>0${i + 1}</b><h3>${t}</h3><p>${p}</p></div>`).join("\n")}
    </div>
  </div>
</section>

<!-- PROPRIETÀ E QUALITÀ -->
<section class="sez prop">
  <div class="wrap">
    <div class="griglia">
      <div>
        <span class="occhiello">Proprietà</span>
        <h2>Scheda del materiale</h2>
        <p class="lead">I valori esatti dipendono dal prodotto scelto: li confermiamo in progetto sulla scheda tecnica del produttore.</p>
      </div>
      <dl class="scheda">
${s.scheda.map(([k, v]) => `        <div><dt>${k}</dt><dd>${v}</dd></div>`).join("\n")}
      </dl>
    </div>
    <div class="qual">
${s.qualita.map(([t, p]) => `      <div><h3>${t}</h3><p>${p}</p></div>`).join("\n")}
    </div>
  </div>
</section>

<!-- STRATIGRAFIA: tolta per ora, la rifacciamo bene (i dati sono in s.strati) -->

<!-- SISTEMI DI POSA -->
<section class="sez posa">
  <div class="wrap">
    <span class="occhiello">Sistemi di posa</span>
    <h2>Come si monta</h2>
    <p class="lead">La soluzione giusta dipende da formato, altezza dell'edificio ed effetto voluto: la scegliamo insieme in fase di progetto.</p>
${s.posa.map((g) => `    <div class="gruppo">
      <h3>${g.titolo}</h3>
      <div class="opzioni">
${g.opzioni.map((o) => `        <div class="opzione${o.sola ? " sola" : ""}">
          ${sezione({ ...o.svg, colore: s.colore, spess: s.spess, numeri: false, zoom: true })}
          <div><h4>${o.nome}</h4><p>${o.testo}</p>${o.tag ? `<span class="tag">${o.tag}</span>` : ""}</div>
        </div>`).join("\n")}
      </div>
    </div>`).join("\n")}
  </div>
</section>

<!-- GLI ALTRI SISTEMI -->
<section class="altri">
  <div class="wrap">
    <span class="occhiello">Gli altri sistemi</span>
    <div class="riga">
${altri.map((x) => `      <a href="${x.file}"><img src="../assets/foto/${x.foto}" alt="${x.alt}"><span>${x.nome}</span></a>`).join("\n")}
    </div>
  </div>
</section>

`;
  return testa + corpo + coda;
}

for (const s of SISTEMI) {
  fs.writeFileSync(path.join(DIR, s.file), pagina(s));
  console.log("scritto", s.file);
}
