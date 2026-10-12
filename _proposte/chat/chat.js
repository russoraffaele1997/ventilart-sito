/* Assistente Ventilàrt con risposte automatiche.
   Per cambiare le risposte modifica solo la parte "RISPOSTE" qui sotto:
   - parole: le parole che, se scritte dal visitatore, fanno scattare la risposta
   - testo:  la risposta (puoi andare a capo; [testo](link) diventa un link)
   - pulsanti: domande suggerite che compaiono sotto la risposta */
(function () {
  var BASE = document.currentScript.getAttribute('data-base') || '';   // percorso verso la home
  var CONTATTI = BASE + 'd-moderno.html#contatti';

  // ======================= RISPOSTE =======================
  var BENVENUTO = 'Buongiorno, sono l’assistente virtuale di Ventilàrt.\nPosso rispondere alle domande più frequenti sulle facciate ventilate. Scegli un argomento o scrivi la tua domanda.';
  var SUGGERIMENTI = ['Cos’è una facciata ventilata?', 'Quali materiali usate?', 'Quanto costa?', 'Richiedere un sopralluogo'];

  var RISPOSTE = [
    { parole: ['cos e', 'cosa e', 'come funziona', 'facciata ventilata', 'ventilata', 'intercapedine'],
      testo: 'È un rivestimento fissato a una struttura metallica, staccato dal muro: tra i due resta uno spazio d’aria che sale dal basso verso l’alto. Così l’edificio è più isolato, il muro resta asciutto e protetto.\nTrovi la spiegazione completa [nel nostro articolo](' + BASE + 'blog/cos-e-una-facciata-ventilata.html).',
      pulsanti: ['Quali materiali usate?', 'Quali sono i vantaggi?'] },

    { parole: ['material', 'rivestiment', 'gres', 'ceramic', 'fibrocemento', 'legno', 'composit', 'alluminio'],
      testo: 'Realizziamo facciate ventilate in quattro materiali:\n• gres porcellanato\n• fibrocemento\n• legno\n• composito\nLa scelta dipende dall’aspetto che si desidera, dall’esposizione dell’edificio e dalla manutenzione. Ne parliamo [in questo confronto](' + BASE + 'blog/gres-fibrocemento-legno-composito.html).',
      pulsanti: ['Quanto costa?', 'Richiedere un sopralluogo'] },

    { parole: ['vantagg', 'benefic', 'isolament', 'risparmi', 'umidit', 'caldo', 'freddo', 'conviene'],
      testo: 'I vantaggi principali:\n• isolamento continuo, con meno dispersioni d’inverno e meno caldo d’estate\n• muro protetto da pioggia e umidità\n• materiali che durano nel tempo con poca manutenzione\n• nuova immagine per l’edificio',
      pulsanti: ['Quali materiali usate?', 'Quanto costa?'] },

    { parole: ['cost', 'prezz', 'quanto viene', 'preventiv', 'spesa', 'euro', 'al metro', 'mq'],
      testo: 'Il costo dipende da superficie, materiale scelto, altezza dell’edificio e dettagli costruttivi, quindi non possiamo indicare un prezzo valido per tutti.\nDopo un sopralluogo prepariamo un’offerta dettagliata, voce per voce.',
      pulsanti: ['Richiedere un sopralluogo', 'Quanto durano i lavori?'] },

    { parole: ['tempi', 'durata', 'quanto dura', 'quanto tempo', 'giorni', 'settimane', 'mesi'],
      testo: 'Dipende dalla superficie e dalla complessità dell’edificio. I tempi sono indicati nell’offerta, dopo il sopralluogo, insieme alle fasi di lavoro.',
      pulsanti: ['Come si svolgono i lavori?', 'Richiedere un sopralluogo'] },

    { parole: ['fasi', 'come lavorate', 'cantiere', 'svolg', 'ponteggi', 'abitat', 'condomin'],
      testo: 'Le fasi sono: sopralluogo e rilievo, progetto e offerta, posa (struttura, isolante e rivestimento), controlli e consegna con la documentazione.\nSi lavora dall’esterno, quindi l’edificio può restare abitato. I dettagli [sono qui](' + BASE + 'blog/facciata-ventilata-edificio-esistente.html).',
      pulsanti: ['Quanto costa?', 'Richiedere un sopralluogo'] },

    { parole: ['zona', 'dove lavorate', 'dove operate', 'provinc', 'citta', 'regione', 'venite'],
      testo: '[Da completare: zona in cui lavora Ventilàrt.]\nPer un intervento in una zona specifica, scrivici dal modulo e ti rispondiamo.',
      pulsanti: ['Richiedere un sopralluogo'] },

    { parole: ['sopralluogo', 'contatt', 'telefon', 'chiamare', 'email', 'mail', 'parlare', 'appuntamento', 'whatsapp', 'numero'],
      testo: 'Volentieri! Compila il [modulo di contatto](' + CONTATTI + ') indicando comune del cantiere e tipo di intervento: ti ricontattiamo per fissare il sopralluogo.\nTelefono: [da inserire]\nEmail: [da inserire]',
      pulsanti: [] },

    { parole: ['bonus', 'detrazion', 'incentiv', 'ecobonus', 'superbonus'],
      testo: 'Le agevolazioni fiscali cambiano spesso e dipendono dal tipo di edificio e di intervento: ti consigliamo di verificarle con il tuo tecnico o commercialista. Noi possiamo fornire tutta la documentazione tecnica dei lavori.',
      pulsanti: ['Richiedere un sopralluogo'] },

    { parole: ['ciao', 'buongiorno', 'buonasera', 'salve'],
      testo: 'Buongiorno! Come posso aiutarti?',
      pulsanti: SUGGERIMENTI },

    { parole: ['grazie', 'perfetto', 'ok grazie'],
      testo: 'Grazie a te! Se ti serve altro, sono qui.',
      pulsanti: [] },
  ];

  var NON_CAPITO = 'Non ho una risposta pronta per questa domanda. Scrivici dal [modulo di contatto](' + CONTATTI + '): ti risponde direttamente il nostro ufficio tecnico.';
  // ========================================================

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'?!.,;:]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function links(s) { return esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>'); }

  function trova(domanda) {
    var q = ' ' + norm(domanda) + ' ', best = null, punti = 0;
    RISPOSTE.forEach(function (r) {
      var p = 0;
      r.parole.forEach(function (w) { if (q.indexOf(norm(w)) > -1) p += norm(w).length; });
      if (p > punti) { punti = p; best = r; }
    });
    return best;
  }

  // ---- interfaccia ----
  var btn = document.createElement('button');
  btn.className = 'vchat-btn'; btn.setAttribute('aria-label', 'Apri l’assistente virtuale'); btn.setAttribute('aria-expanded', 'false');
  var CHIUSO = '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg><span class="lbl"><b>Assistente virtuale</b><small>Chiedi pure, rispondo subito</small></span><span class="dot"></span>';
  btn.innerHTML = CHIUSO;
  var hint = document.createElement('div'); hint.className = 'vchat-hint'; hint.textContent = 'Sono l’assistente virtuale di Ventilàrt: come posso aiutarti?';
  var box = document.createElement('div');
  box.className = 'vchat'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Assistente Ventilàrt'); box.setAttribute('aria-hidden', 'true');
  box.innerHTML =
    '<div class="vchat-head"><img src="' + BASE + '../assets/logo/ventilart-simbolo.svg" alt=""><div><b>Assistente virtuale Ventilàrt</b><small><i class="on"></i>Online · risposte automatiche</small></div><button class="vchat-x" aria-label="Chiudi">×</button></div>' +
    '<div class="vchat-log" aria-live="polite"></div><div class="vchips"></div>' +
    '<form class="vchat-form"><input placeholder="Scrivi una domanda…" aria-label="Scrivi una domanda" maxlength="300"><button aria-label="Invia">↑</button></form>' +
    '<div class="vchat-note">Assistente automatico: per un preventivo usa il modulo di contatto.</div>';
  document.body.appendChild(hint); document.body.appendChild(btn); document.body.appendChild(box);

  var log = box.querySelector('.vchat-log'), chips = box.querySelector('.vchat-chips') || box.querySelector('.vchips'),
      form = box.querySelector('form'), input = form.querySelector('input'), avviato = false;

  function scroll() { log.scrollTop = log.scrollHeight; }
  function msg(testo, chi) { var d = document.createElement('div'); d.className = 'vmsg ' + chi; d.innerHTML = chi === 'bot' ? links(testo) : esc(testo); log.appendChild(d); scroll(); }
  function bottoni(lista) {
    chips.innerHTML = '';
    (lista || []).forEach(function (t) { var b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = function () { chiedi(t); }; chips.appendChild(b); });
  }
  function rispondi(testo, lista) {
    bottoni([]);
    var t = document.createElement('div'); t.className = 'vmsg bot vtyping'; t.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(t); scroll();
    setTimeout(function () { t.remove(); msg(testo, 'bot'); bottoni(lista); scroll(); }, 550 + Math.min(900, testo.length * 4));
  }
  function chiedi(domanda) {
    msg(domanda, 'me');
    var r = trova(domanda);
    if (r) rispondi(r.testo, r.pulsanti); else rispondi(NON_CAPITO, SUGGERIMENTI);
  }
  function apri(on) {
    box.classList.toggle('open', on); btn.classList.toggle('open', on); hint.classList.remove('show');
    box.setAttribute('aria-hidden', !on); btn.setAttribute('aria-expanded', on);
    btn.innerHTML = on ? '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>' : CHIUSO;
    if (on && !avviato) { avviato = true; rispondi(BENVENUTO, SUGGERIMENTI); }
    if (on) setTimeout(function () { input.focus(); }, 300);
  }
  btn.onclick = function () { apri(!box.classList.contains('open')); };
  box.querySelector('.vchat-x').onclick = function () { apri(false); btn.focus(); };
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) apri(false); });
  box.addEventListener('click', function (e) { if (e.target.tagName === 'A' && e.target.getAttribute('href').indexOf('#') > -1) apri(false); });
  // qualsiasi elemento della pagina con data-assistente apre la chat
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-assistente]');
    if (el) { e.preventDefault(); apri(true); }
  });
  window.apriAssistente = function () { apri(true); };
  form.onsubmit = function (e) { e.preventDefault(); var v = input.value.trim(); if (!v) return; input.value = ''; chiedi(v); };

  // piccolo invito dopo qualche secondo, una sola volta per visita
  try { if (!sessionStorage.getItem('vchat-hint')) { setTimeout(function () { if (!box.classList.contains('open')) { hint.classList.add('show'); setTimeout(function () { hint.classList.remove('show'); }, 6000); } }, 5000); sessionStorage.setItem('vchat-hint', '1'); } } catch (e) {}
})();
