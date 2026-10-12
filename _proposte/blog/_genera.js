// Genera la pagina del blog e gli articoli con intestazione, menu e piè di pagina comuni.
// Uso: node _genera.js   (dalla cartella _proposte/blog)
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const A = '../../assets';

const articoli = [
  {
    slug: 'cos-e-una-facciata-ventilata',
    titolo: 'Cos’è una facciata ventilata e come funziona',
    lead: 'Un rivestimento staccato dal muro, un’intercapedine d’aria e un isolante continuo: come è fatto il sistema e perché protegge l’edificio meglio di un intonaco.',
    categoria: 'Guide',
    data: '12 ottobre 2026',
    lettura: '5 min',
    img: 'servizi/composito.jpg', pos: '50% 25%',
    corpo: `
<p>La facciata ventilata è un sistema di rivestimento esterno in cui il materiale di finitura non è incollato al muro, ma fissato meccanicamente a una struttura metallica. Tra il rivestimento e la parete resta uno spazio libero in cui l’aria circola dal basso verso l’alto. È proprio questa intercapedine a dare il nome al sistema e a determinarne buona parte dei vantaggi.</p>

<h2>Come è fatta, strato per strato</h2>
<p>Dall’interno verso l’esterno, una facciata ventilata è composta da cinque elementi:</p>
<ol class="layers">
  <li><span>1</span><b>Parete di supporto</b><em>Il muro esistente o di nuova costruzione, in muratura o calcestruzzo, su cui si ancora tutto il sistema.</em></li>
  <li><span>2</span><b>Isolante termico</b><em>Pannelli continui fissati alla parete, che avvolgono l’edificio senza interruzioni in corrispondenza di solai e pilastri.</em></li>
  <li><span>3</span><b>Sottostruttura</b><em>Staffe e profili, generalmente in alluminio, che reggono il rivestimento e permettono di correggere i fuori piombo del muro.</em></li>
  <li><span>4</span><b>Intercapedine ventilata</b><em>Lo spazio d’aria tra isolante e rivestimento, aperto in basso e in alto.</em></li>
  <li><span>5</span><b>Rivestimento</b><em>La “pelle” visibile: lastre in gres porcellanato, fibrocemento, doghe in legno o pannelli in composito.</em></li>
</ol>

<h2>L’effetto camino</h2>
<p>Quando il sole scalda il rivestimento, l’aria nell’intercapedine si riscalda, diventa più leggera e sale, uscendo dalla parte alta della facciata; dal basso entra aria più fresca. Si crea così un movimento d’aria continuo, chiamato <strong>effetto camino</strong>.</p>
<p>D’estate questo flusso porta via buona parte del calore prima che raggiunga il muro. Durante tutto l’anno, inoltre, l’aria in movimento aiuta a smaltire l’umidità che proviene dall’interno dell’edificio, mantenendo asciutti isolante e muratura.</p>

<h2>I vantaggi principali</h2>
<h3>Isolamento continuo</h3>
<p>Poiché l’isolante corre ininterrotto su tutta la superficie, si riducono i ponti termici, cioè i punti in cui il calore si disperde più facilmente, come i bordi dei solai e i pilastri.</p>
<h3>Protezione del muro</h3>
<p>Il rivestimento fa da schermo contro pioggia battente, sole diretto e sbalzi di temperatura. La parete retrostante lavora in condizioni più stabili e si degrada più lentamente.</p>
<h3>Durata e manutenzione ridotta</h3>
<p>I materiali di rivestimento sono pensati per resistere agli agenti atmosferici senza sfogliarsi né scrostarsi. E se una lastra si danneggia, si sostituisce singolarmente, senza intervenire sul resto della facciata.</p>
<h3>Nuova immagine dell’edificio</h3>
<p>Formati, colori e finiture permettono di riqualificare l’aspetto di un edificio datato o di dare carattere a una nuova costruzione.</p>

<div class="box"><b>Da sapere</b><p>In Italia la norma di riferimento per i rivestimenti di facciata ventilata a montaggio meccanico è la <strong>UNI 11018</strong>. Ogni sistema va comunque progettato sull’edificio specifico: carichi, vento, altezza e requisiti antincendio cambiano da caso a caso.</p></div>

<h2>Quando conviene</h2>
<p>La facciata ventilata è indicata sia nelle nuove costruzioni sia nella riqualificazione di edifici esistenti: condomini, scuole e uffici, capannoni e immobili commerciali. È particolarmente adatta quando si vuole migliorare l’efficienza energetica e, allo stesso tempo, risolvere problemi di intonaci degradati o infiltrazioni.</p>
<p>La scelta del rivestimento dipende dal risultato estetico desiderato, dall’esposizione dell’edificio e dal budget: ne parliamo nell’articolo dedicato ai materiali.</p>
`,
  },
  {
    slug: 'gres-fibrocemento-legno-composito',
    titolo: 'Gres, fibrocemento, legno o composito: come scegliere il rivestimento',
    lead: 'Quattro materiali, quattro caratteri diversi. Un confronto pratico per orientarsi tra estetica, peso, manutenzione e campi d’impiego.',
    categoria: 'Materiali',
    data: '12 ottobre 2026',
    lettura: '6 min',
    img: 'servizi/rivestimento-ceramico.webp', pos: '50% 50%',
    corpo: `
<p>La sottostruttura e l’isolante di una facciata ventilata sono simili in quasi tutti i progetti. Ciò che cambia davvero l’aspetto e il comportamento dell’edificio è il rivestimento. Ecco le caratteristiche dei quattro sistemi che realizziamo.</p>

<h2>Gres porcellanato</h2>
<p>Lastre ceramiche ottenute da impasti cotti ad alta temperatura, molto compatte e poco assorbenti. Sono disponibili anche in grande formato e in un’ampia gamma di finiture: effetto pietra, cemento, metallo, legno o tinta unita.</p>
<ul>
  <li><strong>Punti di forza:</strong> colore stabile nel tempo, resistenza al gelo e agli agenti atmosferici, pulizia semplice.</li>
  <li><strong>Da considerare:</strong> è un materiale relativamente pesante, che richiede una sottostruttura dimensionata di conseguenza.</li>
</ul>

<h2>Fibrocemento</h2>
<p>Lastre composte da cemento rinforzato con fibre, dalla superficie uniforme e opaca. Hanno un linguaggio essenziale, molto apprezzato nell’architettura contemporanea.</p>
<ul>
  <li><strong>Punti di forza:</strong> aspetto materico e omogeneo, buona lavorabilità, lastre più leggere del gres a parità di formato.</li>
  <li><strong>Da considerare:</strong> la gamma di finiture è più sobria; la resa estetica dipende molto dal disegno dei giunti.</li>
</ul>

<h2>Legno</h2>
<p>Doghe, listelli e frangisole che danno alla facciata un aspetto caldo e naturale. Oltre al legno vero e proprio, trattato per l’esterno, esistono prodotti tecnici che ne riproducono l’aspetto con manutenzione ridotta.</p>
<ul>
  <li><strong>Punti di forza:</strong> grande valore estetico, ottima integrazione nel verde, possibilità di schermare il sole con frangisole.</li>
  <li><strong>Da considerare:</strong> il legno naturale cambia colore con il tempo e richiede una manutenzione periodica; va valutato con attenzione anche il comportamento al fuoco.</li>
</ul>

<h2>Composito</h2>
<p>Pannelli multistrato leggeri e perfettamente planari, che permettono superfici continue, spigoli netti e forme anche curve.</p>
<ul>
  <li><strong>Punti di forza:</strong> leggerezza, planarità, finiture metalliche e colori brillanti, adatti a edifici commerciali e direzionali.</li>
  <li><strong>Da considerare:</strong> esistono composizioni diverse, con classi di reazione al fuoco diverse: la scelta va fatta in funzione dell’edificio e della normativa antincendio.</li>
</ul>

<h2>Il confronto in sintesi</h2>
<div class="table"><table>
  <tr><th>Materiale</th><th>Aspetto</th><th>Peso</th><th>Manutenzione</th><th>Impieghi tipici</th></tr>
  <tr><td>Gres porcellanato</td><td>Molte finiture, anche grandi formati</td><td>Medio-alto</td><td>Molto bassa</td><td>Residenziale, pubblico, terziario</td></tr>
  <tr><td>Fibrocemento</td><td>Uniforme, opaco, essenziale</td><td>Medio</td><td>Bassa</td><td>Architettura contemporanea, scuole, uffici</td></tr>
  <tr><td>Legno</td><td>Caldo, naturale, a doghe</td><td>Basso</td><td>Periodica (legno naturale)</td><td>Ville, edifici nel verde, frangisole</td></tr>
  <tr><td>Composito</td><td>Planare, metallico, continuo</td><td>Basso</td><td>Bassa</td><td>Commerciale, direzionale, industriale</td></tr>
</table></div>

<h2>Come orientarsi</h2>
<p>Non esiste un materiale migliore in assoluto. Nella scelta conviene partire da tre domande:</p>
<ol>
  <li><strong>Che immagine deve avere l’edificio?</strong> Materica e sobria, calda e naturale, oppure tecnica e lucida.</li>
  <li><strong>Com’è esposto?</strong> Sole, vento, vicinanza al mare e altezza dell’edificio incidono su materiali, fissaggi e requisiti.</li>
  <li><strong>Quanta manutenzione si è disposti a fare?</strong> Su un condominio, ad esempio, conta molto ridurre gli interventi futuri.</li>
</ol>
<p>Sulla stessa facciata si possono anche combinare due materiali: ad esempio gres per le superfici principali e legno per i frangisole o per l’ingresso.</p>

<div class="box"><b>Il nostro consiglio</b><p>Durante il sopralluogo valutiamo l’edificio e confrontiamo con il committente campioni e soluzioni, così da scegliere il rivestimento sulla base di dati concreti e non solo di un’immagine di catalogo.</p></div>
`,
  },
  {
    slug: 'facciata-ventilata-edificio-esistente',
    titolo: 'Facciata ventilata su un edificio esistente: le fasi dell’intervento',
    lead: 'Dal sopralluogo alla consegna: cosa succede in cantiere quando si riveste un edificio già costruito, e quali verifiche fare prima di iniziare.',
    categoria: 'Cantiere',
    data: '12 ottobre 2026',
    lettura: '5 min',
    img: 'servizi/fibrocemento-tecnico.webp', pos: '50% 50%',
    corpo: `
<p>Una facciata ventilata non è solo un intervento per le nuove costruzioni: è una delle soluzioni più efficaci per riqualificare un edificio esistente, perché unisce isolamento, protezione del muro e rinnovo estetico in un unico lavoro. Ecco come si svolge, fase per fase.</p>

<h2>1. Sopralluogo e rilievo</h2>
<p>Tutto parte da una visita in cantiere. Si rilevano le misure delle facciate, la posizione di finestre, balconi e impianti, e soprattutto lo stato del supporto: tipo di muratura, presenza di crepe, umidità o intonaci distaccati.</p>
<p>La natura della parete è decisiva, perché determina il tipo di tasselli e il numero di ancoraggi necessari per reggere in sicurezza la sottostruttura.</p>

<h2>2. Verifiche e progetto</h2>
<p>Sulla base del rilievo si sceglie il sistema e si sviluppano i dettagli costruttivi: spessore dell’isolante, passo delle staffe, soluzioni per davanzali, spigoli, attacco a terra e copertura.</p>
<div class="box"><b>Prima di iniziare</b><p>Con il proprio tecnico è bene verificare quali <strong>titoli edilizi</strong> servono per l’intervento e, negli edifici di una certa altezza, i <strong>requisiti antincendio</strong> previsti per le facciate. Sono aspetti che incidono sulla scelta dei materiali e vanno chiariti in fase di progetto.</p></div>

<h2>3. Offerta dettagliata</h2>
<p>Il progetto si traduce in un’offerta per singole voci: sottostruttura, isolante, rivestimento, lattonerie, ponteggi o piattaforme, smaltimenti. Un’offerta leggibile permette di confrontare le soluzioni e di sapere esattamente cosa è compreso.</p>

<h2>4. Allestimento del cantiere</h2>
<p>Si montano ponteggi o si organizzano piattaforme aeree, si delimitano le aree di lavoro e si proteggono gli accessi. Negli edifici abitati il lavoro avviene interamente dall’esterno: gli occupanti possono continuare a vivere e lavorare all’interno.</p>

<h2>5. Posa del sistema</h2>
<ol>
  <li><strong>Preparazione del supporto:</strong> rimozione delle parti incoerenti e ripristino dove serve.</li>
  <li><strong>Staffe e profili:</strong> fissaggio delle staffe alla parete e montaggio dei profili verticali, allineati anche dove il muro non è perfettamente a piombo.</li>
  <li><strong>Isolante:</strong> posa dei pannelli isolanti in modo continuo.</li>
  <li><strong>Rivestimento:</strong> montaggio delle lastre, delle doghe o dei pannelli, con particolare cura per giunti, spigoli e aperture.</li>
  <li><strong>Finiture:</strong> lattonerie, davanzali, chiusure in basso e in alto, che permettono all’aria di circolare e impediscono l’ingresso di animali e detriti.</li>
</ol>

<h2>6. Controlli e consegna</h2>
<p>Al termine si verificano allineamenti, fissaggi e finiture. Al committente viene consegnata la documentazione del lavoro: schede dei materiali impiegati, eventuali certificazioni dei prodotti e indicazioni per la manutenzione.</p>

<h2>Quanto dura un intervento?</h2>
<p>Dipende dalla superficie, dall’altezza dell’edificio, dal materiale scelto e dalla complessità dei dettagli. Per questo i tempi vengono indicati nell’offerta, dopo il sopralluogo, insieme alla sequenza delle lavorazioni.</p>
`,
  },
];

const head = (titolo, desc, base) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titolo}</title>
<meta name="description" content="${desc.replace(/"/g, '&quot;')}">
<link rel="icon" href="${A}/logo/ventilart-simbolo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="blog.css">
<link rel="stylesheet" href="../chat/chat.css">
<link rel="stylesheet" href="../anim/anim.css">
</head>
<body>
<div class="wrap">
  <div class="top">
    <a href="../d-moderno.html" class="brand"><img src="${A}/logo/ventilart-orizzontale.svg" alt="Ventilàrt"></a>
    <div class="r">
      <a class="btn" href="../d-moderno.html#contatti">Richiedi un sopralluogo</a>
      <button class="burger" id="apri" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu"><span></span></button>
    </div>
  </div>
`;

const foot = `
<footer>
  <div class="wrap">
    <div><img src="${A}/logo/ventilart-orizzontale-bianco.svg" alt="Ventilàrt"><p>Progettazione e posa di facciate ventilate.</p><p style="margin-top:14px">© Ventilàrt · P.IVA [da inserire]</p></div>
    <div><h4>Sito</h4><ul><li><a href="../d-moderno.html#chi-siamo">Chi siamo</a></li><li><a href="../d-moderno.html#lavorazioni">Lavorazioni</a></li><li><a href="../d-moderno.html#progetti">I nostri progetti</a></li><li><a href="index.html">Blog</a></li><li><a href="../d-moderno.html#contatti">Contatti</a></li></ul></div>
    <div><h4>Informazioni</h4><ul><li><a href="#">Privacy</a></li><li><a href="#">Cookie</a></li></ul></div>
  </div>
</footer>

<div class="veil" id="velo"></div>
<aside class="drawer" id="menu" aria-hidden="true">
  <div class="dh"><img src="${A}/logo/ventilart-orizzontale-bianco.svg" alt="Ventilàrt"><button class="close" id="chiudi" aria-label="Chiudi il menu">×</button></div>
  <nav>
    <a href="../d-moderno.html#chi-siamo"><small>01</small>Chi siamo</a>
    <a href="../d-moderno.html#lavorazioni"><small>02</small>Lavorazioni</a>
    <a href="../d-moderno.html#progetti"><small>03</small>I nostri progetti</a>
    <a href="index.html"><small>04</small>Blog</a>
    <a href="../d-moderno.html#contatti"><small>05</small>Contatti</a>
  </nav>
  <div class="df">
    <b>Contatti</b>
    <span>Tel. [da inserire]</span>
    <span>[email da inserire]</span>
    <a class="btn" href="../d-moderno.html#contatti">Richiedi un sopralluogo</a>
  </div>
</aside>
<script src="menu.js"></script>
<script src="../anim/anim.js"></script>
<script src="../chat/chat.js" data-base="../"></script>
</body>
</html>
`;

const scheda = a => `
    <a class="post" href="${a.slug}.html">
      <div class="im"><img src="${A}/${a.img}" alt="" style="object-position:${a.pos}"><span class="pill dark">${a.categoria}</span></div>
      <div class="b"><h3>${a.titolo}</h3><p>${a.lead}</p><div class="meta"><span>${a.data} · ${a.lettura}</span><span>Leggi →</span></div></div>
    </a>`;

// pagina elenco
fs.writeFileSync(path.join(DIR, 'index.html'),
  head('Blog — Ventilàrt', 'Guide e approfondimenti sulle facciate ventilate: materiali, funzionamento e fasi dell’intervento.') + `
  <div class="intro">
    <span class="pill">Blog</span>
    <h1>Approfondimenti sulle facciate ventilate</h1>
    <p>Guide pratiche su materiali, funzionamento e cantiere, per committenti, tecnici e amministratori.</p>
  </div>
  <div class="posts">${articoli.map(scheda).join('')}
  </div>
</div>
` + foot);

// articoli
for (const a of articoli) {
  const altri = articoli.filter(x => x !== a);
  fs.writeFileSync(path.join(DIR, a.slug + '.html'),
    head(a.titolo + ' — Ventilàrt', a.lead) + `
  <article>
    <header class="ahead">
      <a class="pill" href="index.html">← Blog</a>
      <h1>${a.titolo}</h1>
      <p class="lead">${a.lead}</p>
      <div class="meta-row"><span class="pill">${a.categoria}</span><span class="pill">${a.data}</span><span class="pill">Lettura ${a.lettura}</span></div>
    </header>
    <div class="cover"><img src="${A}/${a.img}" alt="" style="object-position:${a.pos}"></div>
    <div class="body">${a.corpo}</div>
  </article>

  <div class="cta">
    <img src="${A}/logo/ventilart-simbolo-bianco.svg" alt="">
    <div><h2>Hai un edificio da valutare?</h2><p>Richiedi un sopralluogo: ti indichiamo il sistema più adatto e prepariamo un’offerta dettagliata.</p></div>
    <a class="btn light" href="../d-moderno.html#contatti">Richiedi un sopralluogo</a>
  </div>

  <section class="more">
    <h2>Leggi anche</h2>
    <div class="posts">${altri.map(scheda).join('')}
    </div>
  </section>
</div>
` + foot);
}
console.log('creati:', ['index', ...articoli.map(a => a.slug)].join(', '));
