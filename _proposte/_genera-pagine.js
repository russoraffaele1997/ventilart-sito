// Genera le pagine del menu (Chi siamo, Lavorazioni, I nostri progetti, Contatti).
// Per ora sono pagine "in lavorazione": grafica, menu e piè di pagina sono quelli del blog.
// Uso: node _genera-pagine.js  (dalla cartella _proposte)

const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const A = '../assets';

const pagine = [
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
${p.css ? `<link rel="stylesheet" href="${p.css}">` : ''}
${p.og ? `<meta property="og:image" content="${p.og}">` : ''}
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

// ---------------------------------------------------------------------
// CHI SIAMO
// ---------------------------------------------------------------------
fs.writeFileSync(path.join(DIR, 'chi-siamo.html'), head({
  titolo: 'Chi siamo',
  desc: 'Ventilàrt nasce dall’incontro di due imprenditori dell’edilizia per dare nuova vita agli edifici con le facciate ventilate.',
  css: 'chi-siamo.css',
}) + `
  <div class="intro">
    <span class="pill">Chi siamo</span>
    <h1>Chi siamo</h1>
    <p>Ventilàrt nasce dall’incontro di due imprenditori dell’edilizia con un obiettivo comune: dare nuova vita agli edifici attraverso le facciate ventilate.</p>
  </div>

  <div class="persone">
    <div class="persona">
      <h2>Mauro Ferrara</h2>
      <span class="ruolo">Socio fondatore</span>
      <p>Una lunga esperienza nel mondo dell’edilizia e nei sistemi di riqualificazione energetica degli edifici: conosce a fondo come si comporta un involucro e come migliorarne le prestazioni.</p>
    </div>
    <div class="persona">
      <h2>Raffaele Russo</h2>
      <span class="ruolo">Socio fondatore</span>
      <p>Imprenditore edile specializzato in interventi di demolizione e ricostruzione per la rigenerazione e la valorizzazione delle aree urbane.</p>
    </div>
  </div>

  <article class="body">
    <h2>Perché nasce Ventilàrt</h2>
    <p>Riqualificare la facciata di un edificio oggi significa fare i conti con tre problemi concreti. Ventilàrt è nata per risolverli con un unico sistema.</p>
    <ul class="motivi">
      <li><span>1</span><b>Meno dipendenza dall’intonaco</b><em>Trovare maestranze esperte nell’intonaco è sempre più difficile. La facciata ventilata si monta a secco, con componenti industriali: un sistema preciso, ripetibile e dai risultati costanti.</em></li>
      <li><span>2</span><b>Un’alternativa al cappotto tradizionale</b><em>Niente più isolante incollato e rasato sul muro: il rivestimento è fissato a una sottostruttura metallica, staccato dalla parete, con un’intercapedine d’aria che lavora a favore dell’edificio.</em></li>
      <li><span>3</span><b>Un salto di qualità estetico</b><em>Gres porcellanato e ceramica, fibrocemento, HPL, composito e WPC permettono di trasformare un immobile datato in un edificio di pregio, dal linguaggio contemporaneo.</em></li>
    </ul>

    <p>Seguiamo ogni intervento dal sopralluogo alla consegna, con un unico referente e i materiali dei migliori produttori del settore. Scopri <a href="lavorazioni.html" style="text-decoration:underline">cosa fa una facciata ventilata e i sistemi che posiamo</a>.</p>
  </article>

  <div class="cta">
    <img src="${A}/logo/ventilart-simbolo.svg" alt="">
    <div><h2>Parliamo del tuo edificio</h2><p>Veniamo a fare un sopralluogo e ti proponiamo il sistema di facciata più adatto.</p></div>
    <a class="btn light" href="d-moderno.html#contatti">Richiedi un sopralluogo</a>
  </div>
</div>
` + foot);
console.log('chi siamo: chi-siamo.html');

// ---------------------------------------------------------------------
// LAVORAZIONI
// ---------------------------------------------------------------------
fs.writeFileSync(path.join(DIR, 'lavorazioni.html'), head({
  titolo: 'Lavorazioni',
  desc: 'Facciate ventilate in gres porcellanato, fibrocemento, HPL, composito e WPC: comfort termico, zero manutenzione e un nuovo valore per l’edificio.',
  css: 'chi-siamo.css',
}) + `
  <div class="intro">
    <span class="pill">Lavorazioni</span>
    <h1>Lavorazioni</h1>
    <p>Progettiamo e posiamo facciate ventilate: un rivestimento staccato dal muro, fissato a una sottostruttura metallica, con un’intercapedine d’aria che protegge l’edificio.</p>
  </div>

  <article class="body">
    <h2>Cosa fa una facciata ventilata</h2>
    <div class="due">
      <div class="box">
        <b>Comfort termico</b>
        <p>Il rivestimento scherma la parete dal sole, che non batte più direttamente sul muro, e l’aria che scorre nell’intercapedine porta via il calore: d’estate l’edificio si surriscalda molto meno, anche senza isolante. Quando serve, il cappotto si inserisce sotto il rivestimento e le prestazioni migliorano ancora.</p>
      </div>
      <div class="box">
        <b>Zero manutenzione</b>
        <p>I materiali che posiamo non vanno pitturati né trattati: niente ritinteggiature periodiche, basta un lavaggio con acqua. La parete, protetta dal rivestimento, non subisce più pioggia battente e sbalzi di temperatura: niente crepe né intonaco che si stacca.</p>
      </div>
      <div class="box">
        <b>Una facciata sana</b>
        <p>L’intercapedine ventilata smaltisce l’umidità che arriva dall’interno e dall’esterno: il muro resta asciutto, senza condense, muffe ed efflorescenze.</p>
      </div>
      <div class="box">
        <b>Valore e immagine</b>
        <p>Una facciata nuova cambia il modo in cui l’edificio viene percepito e ne aumenta il valore: materiali di qualità, geometrie pulite e finiture durature trasformano un immobile vecchio in un immobile di livello superiore.</p>
      </div>
    </div>

    <h2>I sistemi che posiamo</h2>
    <ul class="motivi">
      <li><span>1</span><b>Gres porcellanato e ceramica</b><em>Lastre anche di grande formato (Laminam, Dekton), stabili nel colore e resistentissime: per facciate che restano come nuove nel tempo.</em></li>
      <li><span>2</span><b>Fibrocemento</b><em>Pannelli materici dal linguaggio architettonico essenziale (Equitone), con un’ottima resistenza al fuoco.</em></li>
      <li><span>3</span><b>WPC – Wood Polymer Composite</b><em>Doghe, lamelle e frangisole Dèco Ultrashield: il calore del legno, senza oliature né scolorimenti.</em></li>
      <li><span>4</span><b>HPL e composito</b><em>Pannelli leggeri e planari per superfici continue, lisce e moderne.</em></li>
    </ul>
    <div class="box">
      <b>Sotto il rivestimento</b>
      <p>Ogni sistema poggia su una sottostruttura in alluminio con staffe e ancoranti calcolati sul supporto (cemento armato, laterizio, blocchi), con o senza isolante. Progettiamo i dettagli, posiamo con la nostra squadra e consegniamo la documentazione dei materiali impiegati.</p>
    </div>
  </article>

  <div class="cta">
    <img src="${A}/logo/ventilart-simbolo.svg" alt="">
    <div><h2>Quale sistema per il tuo edificio?</h2><p>Veniamo a fare un sopralluogo e ti proponiamo la soluzione più adatta.</p></div>
    <a class="btn light" href="d-moderno.html#contatti">Richiedi un sopralluogo</a>
  </div>
</div>
` + foot);
console.log('lavorazioni: lavorazioni.html');

// ---------------------------------------------------------------------
// I NOSTRI PROGETTI: elenco e una scheda per ogni lavoro.
// Per aggiungere un progetto: un nuovo oggetto in PROGETTI (foto in assets/foto/progetti/).
// ---------------------------------------------------------------------
const PROGETTI = [
  {
    file: 'progetto-barbuti-san-leucio.html',
    etichetta: 'WPC',
    titolo: 'Le Sete di San Leucio',
    sottotitolo: 'Nuova sede produttiva Barbuti S.p.A.',
    luogo: 'San Leucio, Caserta',
    riassunto: 'Facciata a lamelle verticali in Dèco Ultrashield Stilo, posate di taglio su sottostruttura in alluminio preverniciato.',
    copertina: 'barbuti-san-leucio-facciata.jpg',
    scheda: [
      ['Committente', 'Barbuti S.p.A.'],
      ['Opera', 'Nuova produzione delle Sete di San Leucio'],
      ['Luogo', 'San Leucio, Caserta'],
      ['Intervento', 'Facciata a lamelle verticali'],
      ['Rivestimento', 'WPC Dèco Ultrashield Stilo, barra 3 × 10 cm posata di taglio'],
      ['Sottostruttura', 'Alluminio preverniciato'],
      ['Realizzazione', 'Ventilàrt'],
    ],
    corpo: `
    <h2>Il progetto</h2>
    <p>Per l’apertura della nuova produzione delle <strong>Sete di San Leucio</strong>, Barbuti S.p.A. ci ha affidato la facciata dell’ingresso: un rivestimento a <strong>lamelle verticali</strong> che accompagna il portale ad arco e dà all’edificio un’immagine calda, ordinata e contemporanea.</p>
    <p>Le barre <strong>Dèco Ultrashield Stilo</strong> da 3 × 10 cm sono posate <strong>di taglio</strong>: verso l’esterno si vede il lato da 3 cm, mentre i 10 cm di profondità creano un ritmo fitto di lamelle che filtra luce e vista e disegna la facciata con giochi d’ombra che cambiano durante il giorno.</p>
    <p>Le lamelle sono fissate a una <strong>sottostruttura in alluminio preverniciato</strong>, nello stesso tono del rivestimento: la struttura si confonde con le doghe e la facciata si legge come un’unica superficie.</p>

    <h2>Cos’è il Dèco Ultrashield</h2>
    <p><strong>Ultrashield</strong> è il <strong>WPC (Wood Polymer Composite)</strong> di <strong>Dèco</strong> pensato per l’esterno: ha l’aspetto e il calore del legno, ma non ne ha i limiti.</p>
    <ul class="strati">
      <li><span>1</span><b>Anima in WPC</b><em>Fibre di legno duro rigenerate unite a plastica riciclata: oltre il 95% del materiale viene dal riciclo.</em></li>
      <li><span>2</span><b>Scudo esterno</b><em>Un guscio protettivo avvolge il profilo e lo difende da raggi UV, umidità, macchie, muffe e salsedine.</em></li>
    </ul>
    <div class="box">
      <b>In pratica</b>
      <p>Non si spacca, non si deforma e non scolorisce; non va oliato né verniciato. Per mantenerlo basta un lavaggio con acqua. È certificato FSC ed EPD.</p>
    </div>`,
    foto: [
      ['barbuti-san-leucio-posa.jpg', 'Posa delle lamelle: piattaforma aerea in quota e squadra a terra.'],
      ['barbuti-san-leucio-struttura.jpg', 'Fissaggio della lamella alla struttura nella parte inferiore.'],
      ['barbuti-san-leucio-dettaglio.jpg', 'Le lamelle di taglio viste da vicino, con i fissaggi alla struttura.'],
    ],
  },
  {
    file: 'progetto-scuola-don-milani-parete.html',
    etichetta: 'WPC',
    titolo: 'Scuola Don Milani',
    sottotitolo: 'IC Basile Don Milani',
    luogo: 'Parete, Caserta',
    riassunto: 'Sistema di frangisole a doghe orizzontali in Dèco Ultrashield per schermare le finestre delle aule.',
    copertina: 'don-milani-parete-facciata.jpg',
    scheda: [
      ['Committente', 'Costruzioni Vitale S.r.l.'],
      ['Opera', 'Scuola IC Basile Don Milani'],
      ['Luogo', 'Parete, Caserta'],
      ['Intervento', 'Frangisole per le finestre delle aule'],
      ['Rivestimento', 'Doghe in WPC Dèco Ultrashield 60 × 40 mm, posate in orizzontale'],
      ['Sottostruttura', 'Alluminio preverniciato con staffe regolabili'],
      ['Realizzazione', 'Ventilàrt'],
    ],
    corpo: `
    <h2>Il progetto</h2>
    <p>Per la scuola <strong>IC Basile Don Milani</strong> di Parete, su incarico di <strong>Costruzioni Vitale S.r.l.</strong>, abbiamo progettato e posato un <strong>sistema di frangisole</strong> davanti alle finestre delle aule: una schermatura a doghe orizzontali che avvolge il primo piano dell’edificio.</p>
    <p>Le doghe in <strong>WPC Dèco Ultrashield da 60 × 40 mm</strong> sono distanziate in modo da fermare il sole diretto lasciando passare la luce e la vista verso l’esterno. Il risultato è una facciata calda e uniforme, che cambia completamente l’immagine dell’edificio scolastico.</p>
    <p>Le doghe sono fissate a montanti in <strong>alluminio preverniciato</strong> su <strong>staffe regolabili</strong>: la regolazione permette di recuperare i fuori piombo del muro e di ottenere linee perfettamente dritte e parallele su tutta la facciata.</p>

    <h2>Cosa cambia per le aule</h2>
    <ul class="strati">
      <li><span>1</span><b>Meno caldo</b><em>Il sole non batte più direttamente sui vetri: le aule si surriscaldano molto meno nei mesi caldi.</em></li>
      <li><span>2</span><b>Luce più morbida</b><em>Le doghe filtrano la luce e riducono l’abbagliamento su banchi e lavagne, senza dover tenere le tapparelle abbassate.</em></li>
      <li><span>3</span><b>Zero manutenzione</b><em>Il Dèco Ultrashield non va verniciato né oliato e non scolorisce: per un edificio pubblico significa nessun costo di manutenzione negli anni.</em></li>
    </ul>
    <div class="box">
      <b>Il materiale</b>
      <p>Dèco Ultrashield è un <strong>WPC (Wood Polymer Composite)</strong>: anima in fibre di legno e plastica riciclata, protetta da uno scudo esterno contro UV, umidità e macchie. Lo abbiamo raccontato meglio nel progetto <a href="progetto-barbuti-san-leucio.html" style="text-decoration:underline">Le Sete di San Leucio</a>.</p>
    </div>`,
    foto: [
      ['don-milani-parete-posa.jpg', 'Posa delle doghe sui montanti: piattaforma aerea in quota e squadra a terra.'],
      ['don-milani-parete-struttura.jpg', 'Preparazione dei profili in alluminio della sottostruttura.'],
      ['don-milani-parete-insieme.jpg', 'L’angolo dell’edificio in fase di finitura.'],
    ],
  },
  {
    file: 'progetto-san-rocco-casoria.html',
    etichetta: 'Gres porcellanato',
    titolo: 'Residenze in via San Rocco',
    sottotitolo: 'CRG | Crafted Residential Group',
    luogo: 'Casoria, Napoli',
    riassunto: 'Facciata ventilata in gres porcellanato effetto travertino, lastre retinate 270 × 180 cm su montanti a T e staffe Hilti.',
    copertina: 'san-rocco-casoria-dettaglio.jpg',
    copertinaAlt: 'La superficie in gres effetto travertino con il profilo nero da 5 cm',
    scheda: [
      ['Committente', 'CRG | Crafted Residential Group'],
      ['Opera', 'Edificio residenziale di nuova costruzione'],
      ['Luogo', 'Via San Rocco, Casoria (NA)'],
      ['Intervento', 'Facciata ventilata'],
      ['Rivestimento', 'Gres porcellanato effetto travertino, lastre retinate 270 × 180 cm'],
      ['Sottostruttura', 'Montanti a T in alluminio su staffe Hilti'],
      ['Dettagli', 'Profili in alluminio preverniciato nero da 5 cm'],
      ['Stato', 'In fase di completamento'],
      ['Realizzazione', 'Ventilàrt'],
    ],
    corpo: `
    <h2>Il progetto</h2>
    <p>Per un nuovo edificio residenziale in <strong>via San Rocco a Casoria</strong>, CRG | Crafted Residential Group ci ha affidato la realizzazione della <strong>facciata ventilata in gres porcellanato</strong>: un intervento che dà valore al fabbricato fin dalla sua costruzione, sia sul piano estetico sia su quello energetico.</p>
    <p>Il rivestimento è composto da <strong>lastre di grande formato da 270 × 180 cm</strong> in gres <strong>effetto travertino</strong>: poche fughe, superfici ampie e la materia calda della pietra naturale, con la resistenza e la stabilità del gres. Le lastre sono <strong>retinate</strong> sul retro: la rete di rinforzo aumenta la sicurezza della facciata, perché in caso di rottura trattiene i frammenti.</p>
    <p>Seguendo le indicazioni del progetto architettonico, tra le lastre abbiamo inserito <strong>profili da 5 cm in alluminio preverniciato nero</strong>: le linee scure scandiscono la facciata e creano l’<strong>effetto sfalsato</strong> delle lastre che caratterizza l’edificio.</p>
    <p>I lavori sono <strong>in fase di completamento</strong>: le foto mostrano il cantiere in corso, i render l’edificio come sarà a lavori finiti.</p>

    <h2>Sotto il rivestimento</h2>
    <ul class="strati">
      <li><span>1</span><b>Staffe Hilti</b><em>Ancorate alla struttura dell’edificio, regolano la distanza dal muro e assorbono i fuori piombo.</em></li>
      <li><span>2</span><b>Montanti a T in alluminio</b><em>Il telaio verticale che porta le lastre e crea l’intercapedine d’aria della facciata ventilata.</em></li>
      <li><span>3</span><b>Lastre retinate in gres 270 × 180 cm</b><em>Fissate ai montanti, staccate dalla parete: proteggono l’edificio dal sole e dalla pioggia senza bisogno di manutenzione.</em></li>
    </ul>`,
    progettazione: [
      ['san-rocco-casoria-render-angolo.jpg', 'Render di progetto: il volume rivestito in lastre effetto travertino.'],
      ['san-rocco-casoria-render-strada.jpg', 'Render di progetto: l’edificio visto dalla strada.'],
      ['san-rocco-casoria-prospetti.jpg', 'I prospetti di progetto con la disposizione sfalsata delle lastre.', 'largo'],
    ],
    foto: [
      ['san-rocco-casoria-cantiere.jpg', 'L’edificio durante i lavori, con il ponteggio.'],
      ['san-rocco-casoria-facciata.jpg', 'Le lastre posate lungo la facciata, con i profili neri tra una lastra e l’altra.'],
      ['san-rocco-casoria-staffe.jpg', 'Le staffe Hilti fissate alla parete, prima dei montanti.'],
    ],
  },
];

const FOTO = `${A}/foto/progetti`;

fs.writeFileSync(path.join(DIR, 'progetti.html'), head({
  titolo: 'I nostri progetti', desc: 'Le facciate ventilate realizzate da Ventilàrt.', css: 'progetti.css',
}) + `
  <div class="intro">
    <span class="pill">I nostri progetti</span>
    <h1>I nostri progetti</h1>
    <p>Le facciate realizzate da Ventilàrt: materiali, soluzioni e foto dal cantiere.</p>
  </div>
  <div class="posts progetti">
${PROGETTI.map((p) => `    <a class="post" href="${p.file}">
      <div class="im"><img src="${FOTO}/${p.copertina}" alt="${p.titolo}" loading="lazy"><span class="pill dark">${p.etichetta}</span></div>
      <div class="b">
        <h3>${p.titolo}</h3>
        <p>${p.riassunto}</p>
        <div class="meta"><span>${p.sottotitolo} · ${p.luogo}</span><span>Vedi il progetto →</span></div>
      </div>
    </a>`).join('\n')}
  </div>
</div>
` + foot);

for (const p of PROGETTI) {
  fs.writeFileSync(path.join(DIR, p.file), head({
    titolo: `${p.titolo} · ${p.sottotitolo}`, desc: p.riassunto, css: 'progetti.css', og: `${FOTO}/${p.copertina}`,
  }) + `
  <div class="ahead">
    <a class="pill" href="progetti.html">← I nostri progetti</a>
    <h1>${p.titolo}</h1>
    <p class="lead">${p.sottotitolo} — ${p.riassunto}</p>
    <div class="meta-row"><span class="pill">${p.luogo}</span><span class="pill">${p.etichetta}</span></div>
  </div>
  <div class="cover verticale"><img src="${FOTO}/${p.copertina}" alt="${p.copertinaAlt || p.titolo + ': la facciata finita'}"></div>
  <div class="scheda table"><table>
${p.scheda.map(([k, v]) => `    <tr><td>${k}</td><td>${v}</td></tr>`).join('\n')}
  </table></div>
  <article class="body">${p.corpo}
  </article>
${p.progettazione ? `  <div class="progettazione">
    <h2>Il progetto architettonico</h2>
${p.progettazione.map(([img, did, largo]) => `    <figure${largo ? ' class="largo"' : ''}><img src="${FOTO}/${img}" alt="${did}" loading="lazy"><figcaption>${did}</figcaption></figure>`).join('\n')}
  </div>
` : ''}  <div class="galleria">
${p.foto.map(([img, did]) => `    <figure><div class="ft"><img src="${FOTO}/${img}" alt="${did}" loading="lazy"></div><figcaption>${did}</figcaption></figure>`).join('\n')}
  </div>
  <div class="cta">
    <img src="${A}/logo/ventilart-simbolo.svg" alt="">
    <div><h2>Hai un progetto simile?</h2><p>Raccontaci l’edificio: veniamo a fare un sopralluogo e ti proponiamo il sistema più adatto.</p></div>
    <a class="btn light" href="d-moderno.html#contatti">Richiedi un sopralluogo</a>
  </div>
</div>
` + foot);
}
console.log('progetti:', ['progetti.html', ...PROGETTI.map((p) => p.file)].join(', '));
