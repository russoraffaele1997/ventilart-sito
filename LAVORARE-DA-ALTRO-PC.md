# Lavorare al sito Ventilàrt da un altro computer

Istruzioni per Claude (e per Raffaele) quando si apre il sito su un PC diverso.

## Dove si trova il lavoro
- Il **nuovo sito** è in preparazione nella cartella `_proposte/` (ramo `main`).
  Le pagine fuori da `_proposte/` sono ancora il sito vecchio.
- Pagina principale: `_proposte/d-moderno.html` (ispirata al modello Webflow "Fazora", rifatta da zero).
- Blog: `_proposte/blog/`. Le pagine si **generano** con `node _genera.js` (dentro `_proposte/blog`):
  per cambiare testi, articoli, menu o piè di pagina del blog si modifica `_genera.js` e si rilancia.
- Assistente virtuale (risposte automatiche, gratuito): `_proposte/chat/chat.js`, elenco "RISPOSTE" in cima.
- Animazioni stile Fazora: `_proposte/anim/`.
- Loghi: `assets/logo/` (verticale, orizzontale, simbolo; versioni `-bianco` per fondi scuri).
  La V della scritta è stata ridisegnata come la V del simbolo (richiesta del 12/10/2026).
  Il logo ufficiale (svg, pdf, png) è sul Desktop del PC fisso, cartella `Ventilàrt`.
- Le altre proposte (`a-galleria`, `b-studio`, `c-preventivo`) sono scartate: tenute solo come riferimento.

## Come vederlo in locale
1. `git clone https://github.com/russoraffaele1997/ventilart-sito.git`
   (oppure, se già scaricato: `git pull`).
2. Dalla cartella del sito: `npx http-server . -p 5500 -c-1`
3. Aprire http://localhost:5500/_proposte/d-moderno.html

Non servono chiavi né Supabase: è un sito statico (solo HTML, CSS, JS).

## Scelte già fatte con Raffaele (12/10/2026)
- Tono **professionale e sobrio**, niente slogan ("la nostra specialità" è stato bocciato).
- Le 4 lavorazioni (gres porcellanato, fibrocemento, legno, composito) hanno **lo stesso risalto**.
- **Nessuna foto** dell'unico lavoro fatto (scuola di Parete) per ora.
- Menu a panino laterale: Chi siamo, Lavorazioni, I nostri progetti, Blog, Contatti. Stile scelto: "antracite e rosso" (pannello squadrato sfumato antracite, riga rossa a sinistra, voci in maiuscolo con carattere Barlow Condensed, riempimento rosso al passaggio, V del logo in filigrana in basso). Niente finestrella nella foto iniziale.
- Pagina larga 1440 px. Provati e **scartati**: barre laterali, menu fisso a sinistra, tutta larghezza,
  filigrana ai lati, loghi partner finti, etichette chiare/scure adattive (le etichette sulle foto sono tutte scure).
- Assistente virtuale ben visibile (pulsante "Assistente virtuale" + inviti nella pagina).

## Da completare
- Contatti veri: telefono, email, sede, Partita IVA (ora ci sono "[da inserire]"; il sito vecchio ha contatti finti di Treviso).
- Testo "Chi siamo": anno di fondazione, sede, zona di lavoro (anche nella risposta "zona" dell'assistente).
- Pagina "I nostri progetti": vuota finché non c'è un lavoro da mostrare.
- Verificare i diritti d'uso delle 4 foto in `assets/servizi/` (composito.jpg è ritagliata per togliere loghi di altre aziende).
- Far controllare al tecnico il riferimento alla norma UNI 11018 negli articoli.
- Modulo contatti e assistente non inviano ancora nulla: serve scegliere dove pubblicare il sito (hosting) e come ricevere le richieste.
- Quando il nuovo sito è approvato: spostarlo al posto di quello vecchio.

Raffaele non è tecnico: parlare in italiano semplice e spiegare ogni passaggio.
