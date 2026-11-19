// Genera mockup/privacy.html e mockup/cookie.html con la grafica del sito (testata e fondo da chi-siamo.html).
// Testi scritti su come funziona davvero il sito: nessun cookie, nessun modulo che invia dati a un server.
// Uso: node mockup/_genera-legali.js
const fs = require("fs");
const path = require("path");
const DIR = __dirname;

const modello = fs.readFileSync(path.join(DIR, "chi-siamo.html"), "utf8");
const iCss = modello.indexOf("  /* pagina chi siamo");
const iStyle = modello.indexOf("</style>");
const iCorpo = modello.indexOf("<!-- MANIFESTO -->");
const iFondo = modello.indexOf("<footer");
if ([iCss, iStyle, iCorpo, iFondo].some((i) => i < 0)) throw new Error("chi-siamo.html è cambiata: controlla i segnaposto");

const CSS = `  /* pagine legali */
  .lh{background:var(--nero);color:#fff;padding:120px 0 90px}
  .lh .occhiello{color:rgba(255,255,255,.6)}
  .lh h1{font-size:clamp(40px,6vw,84px);font-weight:300;text-transform:uppercase;letter-spacing:-.02em;line-height:.98;margin:18px 0 0}
  .legale{padding:90px 0 110px}
  .legale .testo{max-width:780px}
  .legale h2{font-size:26px;font-weight:500;margin:46px 0 12px}
  .legale h2:first-child{margin-top:0}
  .legale p,.legale li{font-size:17px;line-height:1.7;color:#30363b}
  .legale ul{padding-left:22px;margin:10px 0}
  .legale a{text-decoration:underline}
  .legale .agg{margin-top:50px;font-size:14px;color:var(--tenue)}
  @media (max-width:900px){ .lh{padding:80px 0 60px} .legale{padding:60px 0 80px} }
`;
const AGG = "Ultimo aggiornamento: novembre 2026.";

const PRIVACY = `
<h2>Titolare del trattamento</h2>
<p>Ventilàrt S.r.l., Via Padula 19, 80026 Casoria (NA), P.IVA e codice fiscale 11200091210. Email <a href="mailto:ventilart@ventilart.it">ventilart@ventilart.it</a>, telefono <a href="tel:+393793016458">379 301 6458</a>, PEC <a href="mailto:ventilart@pec.ventilart.it">ventilart@pec.ventilart.it</a>.</p>

<h2>Quali dati trattiamo</h2>
<ul>
  <li><b>Dati che ci invii tu</b> quando ci scrivi un’email, ci chiami o ci contatti su WhatsApp: nome, recapiti, contenuto della richiesta ed eventuali elaborati di progetto allegati.</li>
  <li><b>Dati tecnici di navigazione</b>: come per ogni sito, il server che lo ospita registra automaticamente dati tecnici delle visite (ad esempio indirizzo IP, data e ora, pagina richiesta), necessari al funzionamento e alla sicurezza del sito.</li>
</ul>
<p>Il modulo della pagina <a href="contatti.html">Contatti</a> non invia dati al nostro sito: prepara un’email nel tuo programma di posta, che decidi tu se spedire.</p>

<h2>Perché li trattiamo</h2>
<ul>
  <li>Per rispondere alle tue richieste e preparare offerte: il trattamento è necessario per dare seguito a misure precontrattuali richieste da te (art. 6.1.b del Regolamento UE 2016/679, “GDPR”).</li>
  <li>Per il funzionamento e la sicurezza del sito: legittimo interesse del titolare (art. 6.1.f GDPR).</li>
</ul>

<h2>Per quanto tempo</h2>
<p>I dati delle richieste sono conservati per il tempo necessario a gestirle e, se ne nasce un rapporto di lavoro, per la durata prevista dagli obblighi di legge. I dati tecnici di navigazione sono conservati dal fornitore di hosting per il tempo strettamente necessario.</p>

<h2>A chi li comunichiamo</h2>
<p>I dati non vengono venduti né diffusi. Possono essere trattati da fornitori che ci supportano, come il servizio di hosting del sito e quello di posta elettronica, nominati se necessario responsabili del trattamento. Il sito carica i caratteri tipografici dal servizio Google Fonts: per farlo il tuo browser contatta i server di Google, che ricevono il tuo indirizzo IP.</p>

<h2>I tuoi diritti</h2>
<p>Puoi chiedere in ogni momento l’accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità e opporti al trattamento (artt. 15–22 GDPR), scrivendo a <a href="mailto:ventilart@ventilart.it">ventilart@ventilart.it</a>. Hai anche diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>).</p>

<h2>Cookie</h2>
<p>Il sito non usa cookie: trovi i dettagli nella <a href="cookie.html">cookie policy</a>.</p>
`;

const COOKIE = `
<h2>Cookie</h2>
<p>Questo sito <b>non usa cookie</b>: né tecnici, né di analisi statistica, né di profilazione o pubblicità. Per questo non ti chiediamo alcun consenso all’ingresso.</p>

<h2>Memoria locale del browser</h2>
<p>Il sito salva solo un’informazione tecnica nella memoria di sessione del tuo browser (<i>sessionStorage</i>), per non ripetere l’animazione di apertura a ogni pagina durante la stessa visita. Non contiene dati personali, non viene inviata a noi né a terzi e si cancella da sola quando chiudi la scheda del browser.</p>

<h2>Servizi di terze parti</h2>
<p>Il sito carica i caratteri tipografici da Google Fonts. Google Fonts non imposta cookie, ma per fornire i caratteri il tuo browser contatta i server di Google, che ricevono il tuo indirizzo IP. I link esterni presenti sul sito (Google Maps, WhatsApp) si aprono solo se li clicchi: da quel momento valgono le regole di quei servizi.</p>

<h2>Come gestire i cookie</h2>
<p>Puoi in ogni momento controllare e cancellare cookie e dati dei siti dalle impostazioni del tuo browser.</p>

<h2>Contatti</h2>
<p>Per qualsiasi domanda scrivi a <a href="mailto:ventilart@ventilart.it">ventilart@ventilart.it</a>. Per sapere come trattiamo i dati personali leggi l’<a href="privacy.html">informativa privacy</a>.</p>
`;

function pagina(file, titolo, occhiello, testo) {
  let testa = modello.slice(0, iCss) + CSS + modello.slice(iStyle, iCorpo);
  testa = testa.replace(/<title>[^<]*<\/title>/, `<title>${titolo} — Ventilàrt</title>`);
  testa = testa.replace(' aria-current="page"', "");
  const corpo = `<section class="lh">
  <div class="wrap">
    <span class="occhiello">${occhiello}</span>
    <h1>${titolo}</h1>
  </div>
</section>

<section class="legale">
  <div class="wrap">
    <div class="testo">
${testo}
      <p class="agg">${AGG}</p>
    </div>
  </div>
</section>

`;
  fs.writeFileSync(path.join(DIR, file), testa + corpo + modello.slice(iFondo));
  console.log("scritto", file);
}
pagina("privacy.html", "Informativa privacy", "Privacy", PRIVACY);
pagina("cookie.html", "Cookie policy", "Cookie", COOKIE);
