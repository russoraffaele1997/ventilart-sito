// Moduli di contatto del sito: inviano la richiesta al gestionale, che la
// spedisce per email a ventilart@ventilart.it. Nessun dato resta sul sito.
(function () {
  var INDIRIZZO = "https://gestionale.ventilart.it/api/richiesta-sito";
  var caricato = Date.now();

  document.querySelectorAll("form[data-richiesta]").forEach(function (modulo) {
    var esito = modulo.querySelector("[data-esito]") ||
      (modulo.nextElementSibling && modulo.nextElementSibling.matches("[data-esito]") ? modulo.nextElementSibling : null);
    var bottone = modulo.querySelector("button");
    var testoBottone = bottone ? bottone.textContent : "";

    function mostra(messaggio, ok) {
      if (!esito) return;
      esito.textContent = messaggio;
      esito.className = "esito " + (ok ? "ok" : "ko");
    }

    modulo.addEventListener("submit", function (e) {
      e.preventDefault();
      var dati = { tipo: modulo.getAttribute("data-richiesta"), _t: caricato };
      new FormData(modulo).forEach(function (v, k) { dati[k] = v; });
      if (bottone) { bottone.disabled = true; bottone.textContent = "Invio…"; }
      mostra("", true);

      fetch(INDIRIZZO, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dati) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (x) {
          if (x.ok && x.j.ok) {
            modulo.reset();
            mostra("Grazie! Abbiamo ricevuto la tua richiesta: ti ricontattiamo al più presto.", true);
          } else {
            mostra(x.j.errore || "Invio non riuscito. Riprova o chiamaci al 379 301 6458.", false);
          }
        })
        .catch(function () {
          mostra("Invio non riuscito: controlla la connessione, oppure chiamaci al 379 301 6458.", false);
        })
        .finally(function () {
          if (bottone) { bottone.disabled = false; bottone.textContent = testoBottone; }
        });
    });
  });
})();
