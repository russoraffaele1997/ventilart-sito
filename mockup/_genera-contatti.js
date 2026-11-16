// Genera mockup/contatti.html con la stessa grafica del sito (testata, menu e fondo pagina da chi-siamo.html).
// Il modulo non invia dati a nessun server: compone un'email nel programma di posta di chi scrive,
// così gli elaborati DWG/PDF si allegano direttamente e non serve un servizio esterno.
// Uso: node mockup/_genera-contatti.js
const fs = require("fs");
const path = require("path");
const DIR = __dirname;

const modello = fs.readFileSync(path.join(DIR, "chi-siamo.html"), "utf8");
const iCss = modello.indexOf("  /* pagina chi siamo");
const iStyle = modello.indexOf("</style>");
const iCorpo = modello.indexOf("<!-- MANIFESTO -->");
const iFondo = modello.indexOf("<footer");
if ([iCss, iStyle, iCorpo, iFondo].some((i) => i < 0)) throw new Error("chi-siamo.html è cambiata: controlla i segnaposto");

const CSS = `  /* pagina contatti */
  .ch{background:var(--nero);color:#fff;padding:140px 0 110px}
  .ch .occhiello{color:rgba(255,255,255,.6)}
  .ch h1{font-size:clamp(46px,7vw,104px);font-weight:300;text-transform:uppercase;letter-spacing:-.02em;line-height:.96;margin:20px 0 30px;max-width:1000px}
  .ch p{font-size:clamp(18px,1.6vw,22px);line-height:1.55;color:rgba(255,255,255,.78);max-width:680px}
  .contatti{padding:110px 0}
  .contatti .griglia{display:grid;grid-template-columns:1fr 1.25fr;gap:80px;align-items:start}
  .recapiti{display:grid;gap:12px}
  .recapiti a,.recapiti div{display:block;background:var(--carta);padding:26px 28px;color:var(--nero);transition:background .15s}
  .recapiti a:hover{background:var(--pietra)}
  .recapiti small{display:block;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--tenue);margin-bottom:8px}
  .recapiti strong{display:block;font-size:24px;font-weight:400;line-height:1.25}
  .recapiti span{display:block;font-size:15px;color:var(--tenue);margin-top:6px}
  .modulo h2{font-size:clamp(32px,3.6vw,48px);font-weight:300;letter-spacing:-.02em;line-height:1.05;margin:14px 0 14px}
  .modulo > p{color:var(--tenue);font-size:17px;margin-bottom:30px}
  .modulo form{display:grid;grid-template-columns:1fr 1fr;gap:18px 20px}
  .modulo label{display:flex;flex-direction:column;gap:7px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--tenue)}
  .modulo .intero{grid-column:1 / -1}
  .modulo input,.modulo select,.modulo textarea{font:inherit;font-size:17px;letter-spacing:0;text-transform:none;color:var(--nero);background:#fff;border:1px solid var(--linea);border-radius:2px;padding:14px 16px;width:100%}
  .modulo textarea{min-height:150px;resize:vertical}
  .modulo input:focus,.modulo select:focus,.modulo textarea:focus{outline:2px solid var(--rosso);outline-offset:1px;border-color:transparent}
  .modulo .nota{grid-column:1 / -1;font-size:14px;color:var(--tenue);line-height:1.5}
  .modulo button{grid-column:1 / -1;justify-self:start;border:0;cursor:pointer;font:inherit}
  .elaborati{background:var(--salvia);padding:110px 0}
  .elaborati h2{font-size:clamp(34px,4vw,56px);font-weight:300;letter-spacing:-.02em;margin:14px 0 18px}
  .elaborati .lead{font-size:20px;color:rgba(20,23,25,.7);max-width:720px}
  .elaborati .cinque{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:46px}
  .elaborati .cinque div{background:rgba(255,255,255,.55);padding:26px 22px}
  .elaborati .cinque b{display:block;font-size:13px;color:var(--rosso);letter-spacing:.12em;margin-bottom:10px}
  .elaborati h3{font-size:18px;font-weight:500;line-height:1.25;margin-bottom:8px}
  .elaborati .cinque p{font-size:15px;color:rgba(20,23,25,.7)}
  @media (max-width:900px){
    .ch{padding:90px 0 80px}
    .contatti{padding:80px 0}
    .contatti .griglia{grid-template-columns:1fr;gap:50px}
    .modulo form{grid-template-columns:1fr}
    .elaborati{padding:80px 0}
    .elaborati .cinque{grid-template-columns:1fr 1fr}
  }
  @media (max-width:520px){
    .elaborati .cinque{grid-template-columns:1fr}
  }
`;

const corpo = `<!-- APERTURA -->
<section class="ch">
  <div class="wrap">
    <span class="occhiello">Contatti</span>
    <h1>Parliamo del tuo progetto</h1>
    <p>Imprese, studi tecnici, enti e privati: scrivici o chiamaci, ti risponde direttamente un nostro referente tecnico.</p>
  </div>
</section>

<!-- RECAPITI E MODULO -->
<section class="contatti">
  <div class="wrap griglia">
    <div class="recapiti">
      <a href="tel:+393793016458"><small>Telefono</small><strong>379 301 6458</strong><span>Lunedì–venerdì, 8:30–18:00</span></a>
      <a href="mailto:ventilart@ventilart.it"><small>Email</small><strong>ventilart@ventilart.it</strong><span>Per elaborati di progetto e richieste di offerta</span></a>
      <a href="https://www.google.com/maps/search/?api=1&amp;query=Via+Padula+19+80026+Casoria+NA" target="_blank" rel="noopener"><small>Sede</small><strong>Via Padula 19<br>80026 Casoria (NA)</strong><span>Apri in Google Maps ↗</span></a>    </div>

    <div class="modulo">
      <span class="occhiello">Richiesta di offerta</span>
      <h2>Scrivici</h2>
      <p>Compila i campi: si aprirà un’email già pronta nel tuo programma di posta, a cui potrai allegare gli elaborati di progetto.</p>
      <form id="richiesta" novalidate>
        <label>Nome e cognome<input name="nome" autocomplete="name" required></label>
        <label>Azienda o studio<input name="azienda" autocomplete="organization"></label>
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Telefono<input name="telefono" type="tel" autocomplete="tel"></label>
        <label>Sei<select name="profilo">
          <option>Impresa</option><option>Studio tecnico / progettista</option><option>Ente pubblico</option><option>Privato</option>
        </select></label>
        <label>Località del cantiere<input name="localita" placeholder="Comune e provincia"></label>
        <label class="intero">Sistema di interesse<select name="sistema">
          <option>Da valutare insieme</option><option>Rivestimento ceramico</option><option>Fibrocemento</option><option>WPC</option><option>Alluminio composito</option>
        </select></label>
        <label class="intero">Descrizione dell’intervento<textarea name="messaggio" placeholder="Tipo di edificio, superficie indicativa, tempistiche…" required></textarea></label>
        <p class="nota">Il modulo non invia dati in automatico: prepara un’email che spedisci tu. I dati servono solo a rispondere alla tua richiesta.</p>
        <button class="bottone rosso" type="submit">Prepara l’email</button>
      </form>
    </div>
  </div>
</section>

<!-- COSA INVIARCI -->
<section class="elaborati">
  <div class="wrap">
    <span class="occhiello">Per un’offerta preliminare</span>
    <h2>Cosa inviarci</h2>
    <p class="lead">Con questi elementi possiamo valutare l’intervento e preparare un’offerta preliminare.</p>
    <div class="cinque">
      <div><b>01</b><h3>Elaborati di progetto</h3><p>Piante, prospetti e sezioni in formato DWG o PDF.</p></div>
      <div><b>02</b><h3>Località</h3><p>Comune e indirizzo del cantiere.</p></div>
      <div><b>03</b><h3>Superfici</h3><p>Metri quadrati indicativi da rivestire.</p></div>
      <div><b>04</b><h3>Sistema</h3><p>Il rivestimento previsto, se già scelto.</p></div>
      <div><b>05</b><h3>Tempistiche</h3><p>Periodo previsto per l’avvio dei lavori.</p></div>
    </div>
  </div>
</section>

<script>
  // il modulo compone un'email (mailto): nessun dato passa da server esterni
  document.getElementById('richiesta').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, mancano = [].filter.call(f.querySelectorAll('[required]'), function (c) { return !c.value.trim(); });
    if (mancano.length) { mancano[0].focus(); mancano[0].reportValidity && mancano[0].reportValidity(); return; }
    var v = function (n) { return (f.elements[n].value || '').trim(); };
    var corpo = [
      'Nome: ' + v('nome'), 'Azienda o studio: ' + v('azienda'), 'Email: ' + v('email'), 'Telefono: ' + v('telefono'),
      'Profilo: ' + v('profilo'), 'Località del cantiere: ' + v('localita'), 'Sistema di interesse: ' + v('sistema'), '',
      v('messaggio'), '', '(Allego gli elaborati di progetto in formato DWG o PDF)'
    ].join('\\n');
    location.href = 'mailto:ventilart@ventilart.it?subject=' + encodeURIComponent('Richiesta di offerta' + (v('localita') ? ' – ' + v('localita') : '')) + '&body=' + encodeURIComponent(corpo);
  });
</script>

`;

let testa = modello.slice(0, iCss) + CSS + modello.slice(iStyle, iCorpo);
testa = testa.replace(/<title>[^<]*<\/title>/, "<title>Contatti — Ventilàrt</title>");
testa = testa.replace(' aria-current="page"', "");
testa = testa.split('<a href="contatti.html">Contatti</a>').join('<a href="contatti.html" aria-current="page">Contatti</a>');
fs.writeFileSync(path.join(DIR, "contatti.html"), testa + corpo + modello.slice(iFondo));
console.log("scritto contatti.html");
