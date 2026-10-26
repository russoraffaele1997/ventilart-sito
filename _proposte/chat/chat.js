/* Assistente virtuale Ventilàrt — chatbot con risposte automatiche (nessun servizio esterno).
 *
 * Come modificarlo:
 *  - CONTATTI: telefono, WhatsApp, sede.
 *  - MATERIALI: schede tecniche dei quattro sistemi (una voce per argomento).
 *  - ARGOMENTI: domande generali (cos'è, vantaggi, norme, costi, ecc.).
 *  Nei testi: **grassetto**, [testo](link), righe che iniziano con "• " diventano elenchi.
 *
 * Fonti dei dati tecnici (ottobre 2026): siti ufficiali Equitone/Etex, Dèco (Ultrashield Stilo),
 * Cosentino (Dekton), Laminam, Phoenix Italy (sottostrutture), norma UNI 11018-1:2023,
 * Guida tecnica VV.F. "Requisiti di sicurezza antincendio delle facciate negli edifici civili".
 */
(function () {
  var BASE = document.currentScript.getAttribute('data-base') || '';   // percorso verso la cartella del sito
  var PAG = {
    modulo: BASE + 'd-moderno.html#contatti',
    contatti: BASE + 'contatti.html',
    lavorazioni: BASE + 'lavorazioni.html',
    artFacciata: BASE + 'blog/cos-e-una-facciata-ventilata.html',
    artMateriali: BASE + 'blog/gres-fibrocemento-legno-composito.html',
    artEsistente: BASE + 'blog/facciata-ventilata-edificio-esistente.html',
    progetti: BASE + 'progetti.html',
    progBarbuti: BASE + 'progetto-barbuti-san-leucio.html',
  };

  // ======================= CONTATTI =======================
  var C = {
    tel: '331 836 4042',
    telLink: 'tel:+393318364042',
    wa: '393318364042',
    sede: 'Via Padula 19, 80026 Casoria (NA)',
    mappa: 'https://www.google.com/maps/search/?api=1&query=Via+Padula+19+Casoria+NA',
  };

  // ======================= MATERIALI =======================
  // Ogni materiale: nome, parole che lo riconoscono, e una risposta per argomento.
  var MATERIALI = {
    gres: {
      nome: 'gres porcellanato',
      parole: ['gres', 'gress', 'porcellanato', 'ceramica', 'ceramico', 'ceramiche', 'laminam', 'dekton', 'ultracompatt', 'piastrell', 'lastre in gres'],
      intro: '**Gres porcellanato**\nSono lastre ceramiche cotte ad altissima temperatura: compatte, praticamente impermeabili e stabili nel colore. Per le facciate usiamo lastre di grande formato e superfici ultracompatte, come **Laminam** e **Dekton**.\n• non assorbono acqua e resistono a gelo, sole e agenti chimici\n• moltissime finiture: pietra, cemento, marmo, legno, tinta unita\n• quasi nessuna manutenzione',
      spessore: 'Per le facciate ventilate in gres si usano in genere lastre da **6 a 12 mm**:\n• 6 mm per le grandi lastre sottili (fino a 160×320 cm)\n• 8–10 mm per i formati più comuni (es. 60×120, 120×240 cm)\n• 12 mm o più per le superfici ultracompatte tipo Dekton (sono previsti anche 8 e 20 mm)',
      formati: 'I moduli più usati sono **60×120, 120×240, 120×278 e 160×320 cm**, oltre ai sottomoduli. Le lastre Dekton per facciata partono da **320×144 cm**.\nSi possono tagliare su misura, anche in cantiere, con gli utensili giusti.',
      peso: 'Il peso dipende dallo spessore. Come riferimento, una lastra ultracompatta Dekton da **12 mm pesa circa 30 kg/m²** (dato Cosentino). Le lastre sottili da 6 mm sono molto più leggere: per questo si usano spesso sui grandi formati.',
      fuoco: 'Il gres è un materiale minerale e non alimenta le fiamme. Le superfici ultracompatte **Dekton sono in classe A1** (la più alta, incombustibile, secondo EN 13501-1).\nIn più, le lastre per facciata hanno **sul retro una rete in fibra di vetro incollata**: in caso di urto trattiene i frammenti.',
      fissaggio: 'Per il gres ci sono tre famiglie di fissaggio sulla sottostruttura in alluminio:\n• **a vista** con graffe (clip) o rivetti: semplice e veloce da posare\n• **a scomparsa** con ganci fissati sul retro della lastra: facciata pulita, senza elementi visibili\n• **incollaggio strutturale** su profili verticali\nLa scelta dipende da formato, altezza dell’edificio ed effetto voluto.',
      manutenzione: 'Praticamente nessuna: il gres non assorbe acqua e non teme raggi UV, gelo e smog. Si pulisce con acqua e detergenti neutri. Esistono anche **finiture autopulenti**.',
      durata: 'Il gres non scolorisce: i colori sono stabili perché il materiale è cotto e non verniciato. Resiste a gelo, sbalzi termici, raggi UV e agenti chimici, quindi mantiene planarità e aspetto nel tempo.',
      finiture: 'Le finiture sono tantissime: **effetto pietra, cemento, marmo, legno, metallo e tinta unita**, opache o lucide. Si possono abbinare formati diversi sulla stessa facciata.',
      sostenibilita: 'Laminam dichiara lastre composte al **100% da materiali riciclati e riciclabili**. In generale il gres è un materiale minerale, inerte e durevole.',
      prezzo: null,
    },
    fibro: {
      nome: 'fibrocemento',
      parole: ['fibrocemento', 'fibro cemento', 'fibro', 'equitone', 'cemento fibrorinforzato', 'eternit', 'cedral', 'cemento'],
      intro: '**Fibrocemento**\nSono pannelli a base di **cemento, fibre e additivi**, colorati in massa: superficie opaca e materica, aspetto sobrio e architettonico. Usiamo i pannelli **Equitone**.\n• leggeri e molto stabili, anche nei grandi formati\n• durata indicata dal produttore: **oltre 50 anni**\n• posa verticale, orizzontale, sfalsata o libera',
      spessore: 'I pannelli in fibrocemento per facciata hanno spessore **8–10 mm**.',
      formati: 'Il formato di partenza è circa **305×122 cm**. I pannelli **si tagliano in qualsiasi dimensione o forma**, quindi la facciata si disegna su misura.',
      peso: 'Il fibrocemento è leggero rispetto a pietra e gres spesso. Il peso preciso dipende dalla linea e dallo spessore scelti: lo indichiamo nel progetto, con la scheda tecnica del pannello.',
      fuoco: 'I pannelli **Equitone sono in classe A2-s1, d0** secondo EN 13501-1: combustibilità limitata, bassissima produzione di fumo, nessuna goccia incandescente.',
      fissaggio: 'Il fibrocemento si fissa su sottostruttura in alluminio:\n• **a vista con rivetti**: la soluzione più diffusa, i rivetti possono essere in tinta con il pannello\n• **a scomparsa con ganci** sul retro del pannello',
      manutenzione: 'Bassa manutenzione: i pannelli resistono ad acqua, temperature estreme, agenti chimici e organismi viventi. Sono possibili **trattamenti antigraffiti e antismog**. I singoli pannelli si smontano facilmente se serve.',
      durata: 'Equitone indica una **durata superiore a 50 anni**. Il colore è nella massa del pannello, la forma resta stabile e la ventilazione retrostante tiene lontani umidità, muffa e gelo.',
      finiture: 'Equitone ha diverse linee:\n• **[natura]** e **[pictura]**: superfici lisce colorate\n• **[tectiva]**: superficie levigata con venature naturali\n• **[textura]**: superficie leggermente materica\n• **[linea]**: superficie rigata tridimensionale\n• **[lunara]**: superficie con effetto pietra\nCi sono molte tinte, anche personalizzabili.',
      sostenibilita: 'I pannelli Equitone sono **riciclabili**, hanno la certificazione **Cradle to Cradle® Bronze** e sono **conformi ai CAM** (Criteri Ambientali Minimi), utili negli appalti pubblici.',
    },
    legno: {
      nome: 'legno',
      parole: ['legno', 'deco', 'dèco', 'ultrashield', 'stilo', 'frangisole', 'frangi sole', 'doghe', 'listelli', 'lamelle', 'wpc', 'legno composito', 'brise soleil', 'teak', 'cedro'],
      intro: '**Legno (Dèco Ultrashield)**\nPer doghe e frangisole usiamo **Ultrashield di Dèco**: un legno composito protetto da uno scudo esterno. Ha il calore del legno ma **non si spacca, non scolorisce e non va trattato**.\n• resistente a muffe, parassiti, cloro, salsedine e raggi UV\n• realizzato al **95% con materiali riciclati** (fibre di legno rigenerate e bottiglie di plastica)\n• frangisole **Stilo** orizzontali o verticali, fissi, scorrevoli o mobili',
      spessore: 'I frangisole **Stilo Ultrashield** hanno cinque profili:\n• **Stilo S**: 60×42 mm\n• **Stilo M**: 100×52 mm\n• **Stilo L**: 120×62 mm\n• **Stilo Slim**: 108×31 mm\n• **Stilo Extra Slim**: 56×31 mm',
      formati: 'I frangisole **Stilo Ultrashield** hanno cinque profili:\n• **Stilo S**: 60×42 mm\n• **Stilo M**: 100×52 mm\n• **Stilo L**: 120×62 mm\n• **Stilo Slim**: 108×31 mm\n• **Stilo Extra Slim**: 56×31 mm\nSi montano in orizzontale o in verticale, con passo e inclinazione decisi in progetto.',
      peso: 'Il peso dipende dal profilo scelto e dal passo dei frangisole: lo calcoliamo in progetto insieme alla struttura di sostegno.',
      fuoco: 'Per il legno composito la classe di reazione al fuoco dipende dal prodotto e dall’uso: la verifichiamo in progetto sulla scheda tecnica, in base ai requisiti antincendio dell’edificio.',
      fissaggio: 'Dèco ha un sistema di fissaggio brevettato, **Easyclip**: piastre di base con tasselli e perni, senza telai aggiuntivi. Permette di **regolare l’inclinazione** dei frangisole e di posarli a filo di pavimenti e soffitti.',
      manutenzione: 'Ultrashield **non richiede oliature né trattamenti** speciali: è resistente a spaccature e scolorimento dei raggi UV. Basta una pulizia periodica con acqua.',
      durata: 'Lo scudo protettivo che avvolge il profilo lo rende **immune a muffe, parassiti, cloro, salsedine e intemperie** e molto resistente alle spaccature e allo scolorimento UV.',
      finiture: 'Le finiture di Ultrashield Stilo sono: **Teak, Red Cedar, Cedar, Snow, Antique Walnut e Charcoal**.',
      sostenibilita: 'Ultrashield è fatto al **95% con materiali riciclati** (fibre di legno duro rigenerate e bottiglie di plastica) ed è certificato **FSC** ed **EPD**.',
      extra: 'Con Ultrashield abbiamo realizzato la facciata a lamelle delle **Sete di San Leucio** (Barbuti S.p.A.): barre **Stilo da 3 × 10 cm posate di taglio** su struttura in alluminio preverniciato ([guarda il progetto](' + PAG.progBarbuti + ')). Abbiamo posato anche i frangisole **Stilo M** sulla scuola **IC Basile Don Milani di Parete (CE)**.',
    },
    comp: {
      nome: 'composito',
      parole: ['composito', 'compositi', 'alluminio composito', 'pannelli compositi', 'acp', 'acm', 'alucobond', 'alluminio', 'metallico', 'metallo', 'lamiera'],
      intro: '**Composito**\nSono pannelli formati da **due lamiere di alluminio con un nucleo interno**: leggeri, rigidi e perfettamente planari. Danno superfici continue e moderne, anche curve.\n• colori RAL, finiture opache, lucide, metallizzate o effetto legno\n• formati molto grandi\n• gamme disponibili in **classe A2-s1, d0**',
      spessore: 'Il composito è sottile e leggero: lo spessore preciso dipende dal tipo di pannello e dal nucleo scelto, e lo indichiamo nel progetto con la scheda tecnica.',
      formati: 'Larghezza **100–120 cm** (o multipli) e altezza **da 100 fino a 600 cm**, in misure standard o su misura. Con sottostrutture adatte si realizzano anche **facciate curve**.',
      peso: 'È uno dei rivestimenti più leggeri: le due lamiere di alluminio sono sottili e il nucleo è leggero. Questo facilita trasporto e posa, anche in quota.',
      fuoco: 'La reazione al fuoco dipende dal **nucleo** del pannello. Per le facciate si usano gamme in **classe A2-s1, d0**, con nucleo minerale. La classe giusta si sceglie in base all’altezza e al tipo di edificio.',
      fissaggio: 'Due soluzioni sulla sottostruttura in alluminio:\n• **a vista con rivetti** su profili verticali\n• **a cassetta**: il pannello viene piegato e agganciato, senza fissaggi visibili',
      manutenzione: 'Le lamiere hanno trattamenti superficiali che le proteggono da raggi UV, pioggia e smog. Basta un lavaggio periodico con acqua e detergente neutro.',
      durata: 'I trattamenti di finitura proteggono colore e superficie da raggi UV e agenti atmosferici; i pannelli restano rigidi e planari anche sugli edifici alti.',
      finiture: 'Colori **RAL**, finiture **opache, lucide, metallizzate** ed **effetto legno**.',
      sostenibilita: 'L’alluminio è un materiale riciclabile. Il dato preciso di contenuto riciclato dipende dal pannello scelto.',
    },
  };

  // Argomenti tecnici che hanno una risposta per ogni materiale
  var ATTRIBUTI = {
    spessore: ['spessor', 'spess', 'mm', 'millimetr', 'sottil', 'quanto e spess'],
    formati: ['formati', 'formato', 'dimension', 'misur', 'grandezz', 'quanto grand', 'lastre grandi', 'modul', 'profili', 'profilo'],
    peso: ['peso', 'pesa', 'pesant', 'kg', 'chili', 'leggero', 'leggerezza'],
    fuoco: ['resistenza al fuoco', 'fuoco', 'incendi', 'antincendi', 'brucia', 'bruciano', 'ignifug', 'fiamm', 'classe a1', 'classe a2', 'a2 s1', 'reazione al fuoco', 'combust'],
    fissaggio: ['fissagg', 'fissa', 'fissano', 'aggancio', 'agganci', 'ganci', 'rivett', 'clip', 'graff', 'incoll', 'attacc', 'montagg', 'monta', 'si posa', 'posato', 'easyclip', 'a vista', 'a scomparsa', 'cassetta'],
    manutenzione: ['manutenz', 'trattat', 'va trattato', 'pulir', 'pulizia', 'pulisce', 'sporc', 'lavar', 'trattament', 'oliatur', 'verniciat'],
    durata: ['durata', 'durano', 'quanto dura', 'dura nel tempo', 'quanto dura il materiale', 'quanti anni', 'invecch', 'scolor', 'sbiad', 'raggi uv', 'resist', 'gelo', 'salsedin', 'mare'],
    finiture: ['finitur', 'colori', 'colore', 'tinte', 'ral', 'effetto', 'aspetto', 'textur', 'estetic', 'cataloghi', 'campionari'],
    sostenibilita: ['sostenib', 'ricicl', 'ambient', 'ecolog', 'green', 'criteri ambientali', 'cradle', 'fsc', 'epd'],
  };
  var DOMANDA_ATTR = { spessore: 'gli spessori', formati: 'i formati', peso: 'il peso', fuoco: 'la reazione al fuoco', fissaggio: 'come si fissa', manutenzione: 'la manutenzione', durata: 'quanto dura', finiture: 'finiture e colori', sostenibilita: 'la sostenibilità' };
  var NOMI_ATTR = { spessore: 'Spessori', formati: 'Formati', peso: 'Peso', fuoco: 'Reazione al fuoco', fissaggio: 'Fissaggio', manutenzione: 'Manutenzione', durata: 'Durata', finiture: 'Finiture e colori', sostenibilita: 'Sostenibilità' };

  // ======================= ARGOMENTI GENERALI =======================
  var ARGOMENTI = [
    { id: 'cose', parole: ['cos e', 'cosa e', 'che cos', 'cosa sono', 'facciata ventilata', 'facciate ventilate', 'parete ventilata', 'definizion', 'spiegami'],
      testo: 'Una **facciata ventilata** è un rivestimento esterno **staccato dal muro** e fissato a una sottostruttura metallica. È composta da:\n• la parete dell’edificio con l’**isolante**\n• un’**intercapedine d’aria**\n• il **rivestimento** esterno (gres, fibrocemento, legno, composito…)\nL’aria entra dal basso ed esce dall’alto (**effetto camino**), porta via calore e umidità e protegge il muro.\nTrovi la spiegazione completa [nel nostro articolo](' + PAG.artFacciata + ').',
      pulsanti: ['Come funziona d’estate e d’inverno?', 'Quali sono i vantaggi?', 'Quali materiali usate?'] },

    { id: 'funziona', parole: ['come funziona', 'funzionament', 'effetto camino', 'intercapedin', 'estate', 'inverno', 'circola', 'aria', 'ventilazion'],
      testo: 'Il funzionamento è semplice:\n• **d’estate** il sole scalda il rivestimento, l’aria nell’intercapedine sale e porta via il calore prima che arrivi al muro: casa più fresca\n• **d’inverno** l’isolante continuo riduce le dispersioni e la ventilazione asciuga l’umidità, evitando condense e muffe\nLe aperture in basso e in alto della facciata permettono questo ricambio continuo d’aria.',
      pulsanti: ['Quali sono i vantaggi?', 'Com’è fatta la sottostruttura?'] },

    { id: 'vantaggi', parole: ['vantagg', 'benefic', 'conviene', 'perche sceglier', 'pro e contro', 'punti di forza', 'a cosa serve'],
      testo: 'I vantaggi principali di una facciata ventilata:\n• **risparmio energetico**: isolante continuo, meno ponti termici, meno caldo d’estate\n• **muro protetto** da pioggia, gelo e umidità\n• **niente condensa e muffe** grazie alla ventilazione\n• **migliore isolamento acustico**\n• **durata e poca manutenzione**: i rivestimenti sono resistenti e i pannelli si sostituiscono singolarmente\n• **nuova immagine** per l’edificio, con tantissime possibilità di materiali e colori',
      pulsanti: ['Ci sono svantaggi?', 'Differenza con il cappotto?', 'Quanto costa?'] },

    { id: 'svantaggi', parole: ['svantagg', 'difett', 'limiti', 'contro', 'problemi', 'negativ'],
      testo: 'Ad essere onesti, ci sono anche aspetti da considerare:\n• il **costo iniziale** è più alto di un intonaco o di un cappotto tradizionale (si recupera in durata, risparmio e manutenzione)\n• serve una **progettazione accurata** della sottostruttura e degli ancoraggi\n• la posa richiede **squadre specializzate**\nPer questo partiamo sempre da un sopralluogo e da un progetto su misura.',
      pulsanti: ['Differenza con il cappotto?', 'Richiedere un sopralluogo'] },

    { id: 'cappotto', parole: ['cappotto', 'termocappotto', 'meglio il cappotto', 'o cappotto', 'o il cappotto', 'cappotto o', 'vs cappotto', 'rispetto al cappotto', 'intonaco'],
      testo: 'Facciata ventilata e cappotto isolano entrambi, ma in modo diverso:\n• **cappotto**: l’isolante è incollato al muro e finito con intonaco. Costa meno, ma la finitura è più esposta a sporco, crepe e urti\n• **facciata ventilata**: isolante e rivestimento sono separati da un’intercapedine d’aria. Funziona meglio d’estate, smaltisce l’umidità, il rivestimento dura di più e offre molte più scelte estetiche\nPer un edificio esposto, alto o di pregio la ventilata è di solito la scelta più duratura.',
      pulsanti: ['Quanto costa?', 'Quali materiali usate?'] },

    { id: 'strati', parole: ['stratigraf', 'strati', 'compost', 'componenti', 'com e fatta', 'sottostruttur', 'struttura', 'staffe', 'staffa', 'profili in alluminio', 'telaio', 'tassell', 'ancoragg', 'hilti'],
      testo: 'Una facciata ventilata è fatta così, dal muro verso l’esterno:\n• **staffe** in alluminio fissate al muro con tasselli certificati (usiamo sistemi **Hilti**)\n• **isolante** (di solito pannelli in lana minerale) fissato alla parete\n• **profili** verticali in alluminio a L, a T o tubolari, regolabili per compensare i fuori piombo\n• **intercapedine d’aria** di qualche centimetro\n• **rivestimento** fissato ai profili, a vista o a scomparsa\nLa sottostruttura è calcolata per resistere al peso del rivestimento e alla spinta del vento.',
      pulsanti: ['Che tipi di fissaggio esistono?', 'Che isolante usate?'] },

    { id: 'fissaggi', parole: ['tipi di fissaggio', 'tipo di fissaggio', 'fissaggi', 'a vista o a scomparsa', 'scomparsa', 'nascost', 'invisibil'],
      testo: 'I sistemi di fissaggio si dividono in due famiglie:\n• **a vista**: rivetti, viti o graffe (clip) visibili sulla facciata. Sono semplici, veloci da posare ed economici\n• **a scomparsa**: ganci fissati sul retro del pannello, incollaggio strutturale o sistemi a cassetta. La facciata resta pulita, senza elementi visibili\nScegliamo il sistema in base al materiale, al formato, all’altezza e all’effetto voluto.',
      pulsanti: ['Fissaggio del gres', 'Fissaggio del fibrocemento', 'Fissaggio del composito'] },

    { id: 'isolante', parole: ['isolant', 'lana di roccia', 'lana minerale', 'lana di vetro', 'eps', 'polistirene', 'coibent', 'quanti centimetri di isolante'],
      testo: 'Nelle facciate ventilate si usano di solito **pannelli in lana minerale** (di roccia o di vetro): isolano bene, lasciano passare il vapore e **non sono combustibili**, un aspetto importante per la sicurezza antincendio.\nLo **spessore** dell’isolante si calcola in base alla zona climatica e alle prestazioni richieste per l’edificio.',
      pulsanti: ['E per l’antincendio?', 'Quali sono i vantaggi?'] },

    { id: 'norme', parole: ['norma', 'norme', 'normativ', 'uni 11018', 'uni11018', 'legge', 'regole', 'certificaz', 'marcatura', 'eta', 'calcol', 'vento', 'statica', 'sism'],
      testo: 'I riferimenti principali sono:\n• **UNI 11018-1:2023**: la norma italiana sulle facciate ventilate (sostituisce la UNI 11018 del 2003). Riguarda sicurezza in uso, comportamento agli agenti atmosferici, isolamento termico e acustico, sostenibilità e sicurezza in caso d’incendio\n• **Guida tecnica dei Vigili del Fuoco** sui requisiti antincendio delle facciate degli edifici civili\n• le **schede tecniche e le certificazioni** dei produttori di pannelli e ancoraggi\nLa sottostruttura viene **calcolata** per peso proprio e carico del vento.',
      pulsanti: ['E per l’antincendio?', 'Com’è fatta la sottostruttura?'] },

    { id: 'antincendio', parole: ['antincendio', 'sicurezza antincendio', 'vigili del fuoco', 'prevenzione incendi', 'normativa incendi', 'e per l antincendio', 'classe di reazione'],
      testo: 'La sicurezza antincendio è un punto chiave:\n• la **Guida tecnica dei Vigili del Fuoco** sulle facciate (richiamata dal DM 25 gennaio 2019) vale per gli edifici nuovi e per quelli esistenti in cui si rifà **più del 50% della facciata**\n• la reazione al fuoco dei materiali si classifica secondo la **EN 13501-1** (A1, A2-s1 d0, B…)\n• dei nostri materiali: **Dekton A1**, **Equitone A2-s1, d0**, **composito disponibile in A2-s1, d0**\nVerifichiamo sempre in progetto i requisiti del singolo edificio, anche in base all’altezza.',
      pulsanti: ['Che isolante usate?', 'Richiedere un sopralluogo'] },

    { id: 'acustica', parole: ['acustic', 'rumor', 'insonorizz', 'traffico'],
      testo: 'Sì, la facciata ventilata migliora anche l’**isolamento acustico**: la combinazione di rivestimento, intercapedine d’aria e isolante in lana minerale attenua i rumori esterni, per esempio del traffico.',
      pulsanti: ['Quali sono i vantaggi?'] },

    { id: 'materiali', parole: ['materiali', 'quali materiali', 'che materiali', 'rivestimenti', 'che rivestimenti', 'cosa posate', 'soluzioni', 'sistemi'],
      testo: 'Realizziamo facciate ventilate con **quattro sistemi**:\n• **gres porcellanato** (Laminam, Dekton): lastre grandi, resistentissime\n• **fibrocemento** (Equitone): pannelli materici dal design sobrio\n• **legno** (Dèco Ultrashield): doghe e frangisole senza manutenzione\n• **composito**: pannelli in alluminio leggeri, lisci e moderni\nDi quale vuoi sapere di più?',
      pulsanti: ['Gres porcellanato', 'Fibrocemento', 'Legno', 'Composito', 'Come scelgo il materiale?'] },

    { id: 'scegliere', parole: ['come scelgo', 'quale scegliere', 'quale conviene', 'quale e meglio', 'migliore', 'confront', 'differenze tra', 'differenza tra', 'consigli', 'consiglia', 'cosa mi consigli'],
      testo: 'Dipende da cosa conta di più per te:\n• **massima resistenza e zero manutenzione** → gres porcellanato\n• **aspetto architettonico e materico, ottima resistenza al fuoco** → fibrocemento Equitone\n• **calore del legno e schermatura solare** → legno Dèco con frangisole\n• **superfici lisce, leggere, grandi o curve** → composito\nSpesso li combiniamo sullo stesso edificio. Leggi il [confronto completo](' + PAG.artMateriali + ') o raccontaci il tuo progetto.',
      pulsanti: ['Richiedere un sopralluogo', 'Quanto costa?'] },

    { id: 'altri', parole: ['hpl', 'pietra', 'marmo', 'vetro', 'cotto', 'terracotta', 'klinker', 'trespa', 'zinco', 'rame', 'corten'],
      testo: 'Lavoriamo principalmente con **gres porcellanato, fibrocemento, legno e composito**. Se il tuo progetto prevede un materiale diverso, scrivici: valutiamo insieme la soluzione e la sottostruttura più adatte.',
      pulsanti: ['Richiedere un sopralluogo', 'Quali materiali usate?'] },

    { id: 'costo', parole: ['costa', 'costi', 'costo', 'costano', 'prezz', 'quanto viene', 'quanto si spende', 'spesa', 'euro', 'al metro', 'al mq', 'mq', 'metro quadro', 'economic', 'budget', 'preventiv'],
      testo: 'Il costo di una facciata ventilata dipende da molti fattori:\n• **materiale** e formato del rivestimento\n• **superficie** e numero di aperture (finestre, angoli, dettagli)\n• **altezza** dell’edificio e ponteggi\n• tipo di **fissaggio** (a vista o a scomparsa) e spessore dell’isolante\nPer questo non indichiamo prezzi generici: dopo il sopralluogo prepariamo un’**offerta dettagliata voce per voce**, senza impegno.',
      pulsanti: ['Richiedere un sopralluogo', 'Ci sono bonus fiscali?'] },

    { id: 'tempi', parole: ['tempi', 'tempo', 'quanto dura il lavoro', 'durata dei lavori', 'quanto tempo', 'giorni', 'settimane', 'mesi', 'quando potete', 'tempistic'],
      testo: 'I tempi dipendono da superficie, materiale e complessità dell’edificio. Te li indichiamo nell’offerta, con il programma delle fasi di lavoro, dopo il sopralluogo.',
      pulsanti: ['Come si svolgono i lavori?', 'Richiedere un sopralluogo'] },

    { id: 'fasi', parole: ['fasi', 'come lavorate', 'come si svolg', 'cantiere', 'ponteggi', 'ponteggio', 'abitat', 'condomin', 'esistente', 'ristruttur', 'riqualific', 'rifacimento'],
      testo: 'Ecco come lavoriamo:\n• **sopralluogo e rilievo** dell’edificio e del supporto\n• **progetto e offerta** dettagliata\n• **posa**: staffe e sottostruttura, isolante, rivestimento\n• **controlli e consegna** con la documentazione dei materiali\nSu un edificio esistente si lavora **dall’esterno**, con ponteggi o piattaforme: chi ci abita può restare in casa. Approfondisci [qui](' + PAG.artEsistente + ').',
      pulsanti: ['Quanto costa?', 'Richiedere un sopralluogo'] },

    { id: 'bonus', parole: ['bonus', 'detrazion', 'incentiv', 'ecobonus', 'superbonus', 'agevolaz', 'conto termico', 'sgravi'],
      testo: 'Le agevolazioni fiscali sugli interventi di isolamento cambiano spesso e dipendono dal tipo di edificio, dall’intervento e dalla situazione fiscale. Ti consigliamo di verificarle con il tuo tecnico o commercialista: noi forniamo **tutta la documentazione tecnica** dei lavori e dei materiali.',
      pulsanti: ['Richiedere un sopralluogo'] },

    { id: 'garanzia', parole: ['garanzi', 'garantit', 'assicuraz'],
      testo: 'Alla consegna forniamo la **documentazione del lavoro eseguito** e le schede e certificazioni dei materiali posati. Le garanzie sui prodotti sono quelle dei produttori (Equitone, Dèco, Laminam, Dekton…): te le indichiamo nell’offerta per il sistema scelto.',
      pulsanti: ['Richiedere un sopralluogo'] },

    { id: 'chisiamo', parole: ['chi siete', 'chi e ventilart', 'ventilart', 'azienda', 'impresa', 'esperienza', 'partner', 'fornitori', 'con chi lavorate', 'marchi'],
      testo: '**Ventilàrt** è un’impresa specializzata nella **progettazione e posa di facciate ventilate**, con sede a **Casoria (NA)**. Seguiamo tutto l’intervento, dal sopralluogo alla consegna, con un unico referente.\nLavoriamo con materiali e sistemi **Dèco, Laminam, Dekton, Equitone e Hilti**.',
      pulsanti: ['Quali materiali usate?', 'Avete già realizzato lavori?', 'Contatti'] },

    { id: 'lavori', parole: ['realizzaz', 'lavori fatti', 'lavori realizzati', 'progetti', 'referenz', 'esempi', 'cantieri fatti', 'avete gia', 'avete fatto', 'fatto lavori', 'fatto dei lavori', 'lavori eseguiti', 'portfolio', 'don milani', 'barbuti', 'san leucio', 'sete'],
      testo: 'Tra i nostri lavori:\n• la facciata a lamelle in **Dèco Ultrashield Stilo** per la nuova produzione delle **Sete di San Leucio** di **Barbuti S.p.A.** (Caserta): [guarda il progetto](' + PAG.progBarbuti + ')\n• i **frangisole Dèco Ultrashield Stilo M** sulla scuola **IC Basile Don Milani di Parete (CE)**\nTrovi foto e schede nella pagina [I nostri progetti](' + PAG.progetti + ').',
      pulsanti: ['Legno', 'Richiedere un sopralluogo'] },

    { id: 'zona', parole: ['zona', 'dove lavorate', 'dove operate', 'provinc', 'citta', 'regione', 'venite', 'lavorate a', 'lavorate in', 'campania', 'napoli', 'caserta', 'salerno', 'fuori'],
      testo: 'La nostra sede è a **Casoria (NA)**. Per sapere se possiamo seguire il tuo intervento, dicci il **comune del cantiere**: chiedi un sopralluogo qui in chat oppure chiamaci al [' + C.tel + '](' + C.telLink + ').',
      pulsanti: ['Richiedere un sopralluogo', 'Contatti'] },

    { id: 'contatti', parole: ['contatt', 'telefon', 'chiamar', 'chiamo', 'numero', 'cellulare', 'whatsapp', 'email', 'mail', 'indirizzo', 'sede', 'dove siete', 'dove vi trovo', 'orari', 'ufficio'],
      testo: 'Ecco i nostri contatti:\n• **Telefono**: [' + C.tel + '](' + C.telLink + ')\n• **WhatsApp**: [scrivici](https://wa.me/' + C.wa + ')\n• **Sede**: [' + C.sede + '](' + C.mappa + ')\nSe vuoi, ti preparo io la richiesta di sopralluogo con tutti i dati: bastano un paio di domande.',
      pulsanti: ['Richiedere un sopralluogo'] },

    { id: 'ambiti', parole: ['nuove costruzioni', 'nuova costruzione', 'nuovi edifici', 'edifici nuovi', 'edifici esistenti', 'fate anche', 'lavorate su', 'lavorate per', 'lavorate anche', 'privati', 'condomini', 'enti pubblici', 'scuole', 'capannon', 'industrial', 'commercial', 'appalti'],
      testo: 'Sì, lavoriamo sia su **nuove costruzioni** sia su **edifici esistenti** da riqualificare:\n• condomini, case e ville\n• scuole ed edifici pubblici\n• edifici commerciali e industriali\nCollaboriamo con imprese, studi tecnici, enti e privati.',
      pulsanti: ['Come si svolgono i lavori?', 'Richiedere un sopralluogo'] },

    { id: 'curve', parole: ['curv', 'curva', 'curve', 'forme', 'sagomat', 'su misura', 'angoli', 'spigoli', 'tagli'],
      testo: 'Sì, si possono realizzare anche facciate **curve** o con forme particolari:\n• il **composito** si presta molto bene alle superfici curve\n• **gres** e **fibrocemento** seguono le curve con sottostrutture specifiche e pannelli tagliati su misura\n• il fibrocemento si taglia **in qualsiasi forma**\nAngoli e spigoli si risolvono con pezzi speciali e profili dedicati.',
      pulsanti: ['Composito', 'Richiedere un sopralluogo'] },

    { id: 'pavimenti', parole: ['pavimen', 'grandi metrature', 'a terra', 'interni', 'rivestimenti interni'],
      testo: 'Oltre alle facciate posiamo anche **grandi lastre a pavimento** su superfici ampie. Raccontaci il progetto e ti diamo tutte le informazioni.',
      pulsanti: ['Richiedere un sopralluogo'] },
  ];

  // Chiacchiere e comandi
  var SMALL = [
    { parole: ['ciao', 'buongiorno', 'buonasera', 'salve', 'hey', 'ehi'], testo: function () { return saluto() + '! Come posso aiutarti? Puoi chiedermi qualsiasi cosa sulle facciate ventilate.'; }, pulsanti: ['Cos’è una facciata ventilata?', 'Quali materiali usate?', 'Richiedere un sopralluogo'] },
    { parole: ['chi sei', 'sei un robot', 'sei umano', 'sei una persona', 'sei vero', 'intelligenza artificiale', 'bot'], testo: 'Sono l’**assistente virtuale** di Ventilàrt: rispondo in automatico alle domande più frequenti. Per parlare con una persona del nostro ufficio tecnico chiama il [' + C.tel + '](' + C.telLink + ') o scrivici su [WhatsApp](https://wa.me/' + C.wa + ').', pulsanti: ['Contatti', 'Richiedere un sopralluogo'] },
    { parole: ['come stai', 'tutto bene'], testo: 'Tutto bene, grazie! Pronto a parlare di facciate ventilate 🙂 Cosa ti serve?', pulsanti: ['Quali materiali usate?'] },
    { parole: ['grazie', 'gentilissim', 'perfetto', 'ottimo'], testo: 'Figurati! Se hai altre domande sono qui. Quando vuoi, posso anche prepararti la richiesta di sopralluogo.', pulsanti: ['Richiedere un sopralluogo'] },
    { parole: ['arrivederci', 'a presto', 'buona giornata', 'buona serata', 'addio'], testo: 'A presto! Per qualsiasi cosa ci trovi al [' + C.tel + '](' + C.telLink + ').', pulsanti: [] },
    { parole: ['aiuto', 'menu', 'cosa sai fare', 'cosa puoi fare', 'argomenti', 'help'], testo: 'Posso aiutarti su:\n• cos’è e come funziona una facciata ventilata\n• i nostri **quattro materiali**: spessori, formati, fissaggi, fuoco, manutenzione, colori\n• norme, antincendio, costi, tempi, bonus\n• contatti e **richiesta di sopralluogo** guidata', pulsanti: ['Cos’è una facciata ventilata?', 'Quali materiali usate?', 'Richiedere un sopralluogo'] },
  ];

  var BENVENUTO = [
    function () { return saluto() + ', sono l’assistente virtuale di **Ventilàrt** 👋'; },
    'Posso spiegarti come funziona una facciata ventilata, confrontare i materiali, darti dati tecnici o prepararti una **richiesta di sopralluogo**. Scegli un argomento o scrivi pure la tua domanda.',
  ];
  var SUGGERIMENTI = ['Cos’è una facciata ventilata?', 'Quali materiali usate?', 'Quanto costa?', 'Richiedere un sopralluogo'];

  // ======================= RICHIESTA DI SOPRALLUOGO (guidata) =======================
  var PASSI = [
    { campo: 'nome', domanda: 'Perfetto, ti preparo la richiesta. Come ti chiami?', valida: function (v) { return v.length >= 2; }, errore: 'Mi scrivi il tuo nome?' },
    { campo: 'comune', domanda: function (d) { return 'Piacere, ' + d.nome.split(' ')[0] + '! In quale **comune** si trova l’edificio?'; }, valida: function (v) { return v.length >= 2; }, errore: 'Mi indichi il comune del cantiere?' },
    { campo: 'edificio', domanda: 'Che tipo di edificio è?', scelte: ['Condominio', 'Casa o villa', 'Edificio pubblico o scuola', 'Commerciale o industriale', 'Altro'] },
    { campo: 'intervento', domanda: 'Di che intervento si tratta?', scelte: ['Nuova costruzione', 'Rifacimento di una facciata esistente', 'Solo frangisole', 'Non so ancora'] },
    { campo: 'superficie', domanda: 'Più o meno, quanta superficie di facciata?', scelte: ['Meno di 100 m²', '100–500 m²', '500–1.000 m²', 'Oltre 1.000 m²', 'Non lo so'] },
    { campo: 'materiale', domanda: 'Hai già in mente un materiale?', scelte: ['Gres porcellanato', 'Fibrocemento', 'Legno', 'Composito', 'Consigliatemi voi'] },
    { campo: 'telefono', domanda: 'Ultima cosa: a quale **numero di telefono** possiamo richiamarti?', valida: function (v) { return v.replace(/[^\d]/g, '').length >= 8; }, errore: 'Il numero non mi sembra completo: me lo riscrivi?' },
  ];

  var NON_CAPITO = [
    'Non sono sicuro di aver capito. Prova a riformulare, oppure scegli uno di questi argomenti:',
    'Su questo non ho una risposta pronta. Per una domanda specifica ti conviene parlare con il nostro ufficio tecnico: chiama il [' + C.tel + '](' + C.telLink + ') o scrivici su [WhatsApp](https://wa.me/' + C.wa + ').',
  ];
  // ===================================================================

  // ---- testo ----
  function saluto() { var h = new Date().getHours(); return h < 13 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera'; }
  function norm(s) { return (' ' + s + ' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'`´?!.,;:()"“”«»\-\/]/g, ' ').replace(/\s+/g, ' '); }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function formatta(s) {
    var righe = esc(s).split('\n'), out = '', lista = false;
    righe.forEach(function (r) {
      var li = /^• /.test(r);
      if (li && !lista) { out += '<ul>'; lista = true; }
      if (!li && lista) { out += '</ul>'; lista = false; }
      r = r.replace(/^• /, '')
        .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, t, u) {
          var ext = /^(https?:|tel:)/.test(u) && u.indexOf(location.host) < 0;
          return '<a href="' + u + '"' + (ext && u.indexOf('tel:') ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>';
        });
      out += li ? '<li>' + r + '</li>' : (r ? '<p>' + r + '</p>' : '');
    });
    return out + (lista ? '</ul>' : '');
  }

  // ---- comprensione: parole chiave tolleranti agli errori di battitura ----
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var p = [], i, j;
    for (j = 0; j <= b.length; j++) p[j] = j;
    for (i = 1; i <= a.length; i++) {
      var prev = p[0]; p[0] = i;
      for (j = 1; j <= b.length; j++) {
        var t = p[j];
        p[j] = Math.min(p[j] + 1, p[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = t;
      }
    }
    return p[b.length];
  }
  // punteggio di una parola chiave dentro la domanda (0 = assente)
  function punti(q, parole, chiave) {
    var k = norm(chiave).trim();
    if (!k) return 0;
    if (q.indexOf(' ' + k) > -1) return k.length + 2;               // corrispondenza esatta (anche come radice)
    if (k.indexOf(' ') > -1 || k.length < 6) return 0;              // frasi e parole corte: solo esatte
    for (var i = 0; i < parole.length; i++) {
      var w = parole[i];
      if (w.length < 5) continue;
      var pref = w.slice(0, k.length);
      var soglia = k.length >= 9 ? 2 : 1;
      if (lev(pref, k) <= soglia || lev(w, k) <= soglia) return k.length - 1;   // errore di battitura
    }
    return 0;
  }
  function punteggio(q, parole, lista) {
    var tot = 0;
    lista.forEach(function (k) { tot += punti(q, parole, k); });
    return tot;
  }
  // per i materiali conta la parola che corrisponde meglio (non la somma), così i sinonimi non si sommano
  function puntiMateriale(q, parole, id) {
    return MATERIALI[id].parole.reduce(function (m, k) { return Math.max(m, punti(q, parole, k)); }, 0);
  }
  function trovaMateriali(q, parole) {
    return Object.keys(MATERIALI)
      .map(function (id) {
        var pos = MATERIALI[id].parole.reduce(function (m, k) { var i = q.indexOf(' ' + norm(k).trim()); return i > -1 && i < m ? i : m; }, 1e9);
        return { id: id, p: puntiMateriale(q, parole, id), pos: pos };
      })
      .filter(function (x) { return x.p > 0; })
      .sort(function (a, b) { return a.pos - b.pos || b.p - a.p; });   // nell'ordine in cui compaiono nella domanda
  }
  function trovaAttributo(q, parole) {
    var best = null, top = 0;
    Object.keys(ATTRIBUTI).forEach(function (id) {
      var p = punteggio(q, parole, ATTRIBUTI[id]);
      if (p > top) { top = p; best = id; }
    });
    return { id: best, punti: top };
  }
  function trovaArgomento(q, parole, lista) {
    var best = null, top = 0;
    lista.forEach(function (a) {
      var p = punteggio(q, parole, a.parole);
      if (p > top) { top = p; best = a; }
    });
    return { arg: best, punti: top };
  }

  // ---- memoria della conversazione (resta passando da una pagina all'altra) ----
  var KEY = 'ventilart-chat-v2';
  var S = { log: [], materiale: null, attributo: null, flusso: null, dati: {}, errori: 0, aperta: false };
  try { var salvato = JSON.parse(sessionStorage.getItem(KEY)); if (salvato && salvato.log) S = salvato; } catch (e) {}
  function salva() { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  // ---- motore delle risposte ----
  function rispostaMateriale(id, attr) {
    var m = MATERIALI[id], testo;
    if (attr && m[attr]) testo = m[attr];
    else testo = m.intro;
    S.materiale = id; S.attributo = attr || null;
    var altri = Object.keys(NOMI_ATTR).filter(function (a) { return a !== attr && m[a]; }).slice(0, 4);
    var chips = altri.map(function (a) { return NOMI_ATTR[a] + ' — ' + m.nome; });
    if (attr) {
      var altriMat = Object.keys(MATERIALI).filter(function (x) { return x !== id; });
      chips = [NOMI_ATTR[attr] + ' — ' + MATERIALI[altriMat[0]].nome, NOMI_ATTR[attr] + ' — ' + MATERIALI[altriMat[1]].nome].concat(chips.slice(0, 2));
    }
    var out = [testo];
    if (!attr && m.extra) out.push(m.extra);
    return { testi: out, pulsanti: chips.concat(['Richiedere un sopralluogo']) };
  }

  function capisci(domanda) {
    var q = norm(domanda), parole = q.trim().split(' ');

    // pulsanti "Argomento — materiale"
    var mChip = domanda.match(/^(.+) — (.+)$/);
    if (mChip) {
      var attrChip = Object.keys(NOMI_ATTR).filter(function (a) { return NOMI_ATTR[a] === mChip[1]; })[0];
      var matChip = Object.keys(MATERIALI).filter(function (m) { return MATERIALI[m].nome === mChip[2]; })[0];
      if (attrChip && matChip) return rispostaMateriale(matChip, attrChip);
    }

    // richiesta di sopralluogo / preventivo
    if (/sopralluog|preventiv|richied|richiest|appuntament|venite a vedere|fare un lavoro|ho un (edificio|palazzo|condominio|capannone)/.test(q)) {
      return avviaFlusso();
    }

    var mats = trovaMateriali(q, parole);
    var mat = mats.length ? mats[0].id : null;
    var attr = trovaAttributo(q, parole);
    var arg = trovaArgomento(q, parole, ARGOMENTI);
    var small = trovaArgomento(q, parole, SMALL);
    var corta = parole.length <= 4;

    // due o più materiali nella stessa domanda: confronto
    if (mats.length >= 2) {
      if (attr.id) {
        S.materiale = mats[0].id; S.attributo = attr.id;
        return { testi: mats.slice(0, 3).map(function (m) { return MATERIALI[m.id][attr.id] || MATERIALI[m.id].intro; }),
          pulsanti: ['Come scelgo il materiale?', 'Richiedere un sopralluogo'] };
      }
      return argomento('scegliere');
    }

    // "e il fibrocemento?" → stesso argomento di prima, altro materiale
    if (mat && !attr.id && S.attributo && corta && /^ (e|ed|invece|mentre|anche) /.test(q)) return rispostaMateriale(mat, S.attributo);

    // materiale + argomento tecnico
    if (mat && attr.id && attr.punti >= arg.punti - 2) return rispostaMateriale(mat, attr.id);
    // argomento tecnico senza materiale: uso quello di cui si parlava
    if (!mat && attr.id && attr.punti >= arg.punti && S.materiale) return rispostaMateriale(S.materiale, attr.id);
    if (!mat && attr.id === 'fissaggio' && !S.materiale && attr.punti >= arg.punti) return argomento('fissaggi');
    if (!mat && attr.id === 'fuoco' && !S.materiale && attr.punti >= arg.punti) return argomento('antincendio');
    if (!mat && attr.id && attr.punti > arg.punti) {
      S.attributo = attr.id;
      return { testi: ['Di quale materiale vuoi sapere ' + DOMANDA_ATTR[attr.id] + '?'],
        pulsanti: Object.keys(MATERIALI).map(function (m) { return NOMI_ATTR[attr.id] + ' — ' + MATERIALI[m].nome; }) };
    }
    // solo materiale
    if (mat && arg.punti <= mats[0].p) return rispostaMateriale(mat, null);

    // argomenti generali e chiacchiere
    if (small.arg && small.punti >= arg.punti && small.punti >= 3) {
      var ts = typeof small.arg.testo === 'function' ? small.arg.testo() : small.arg.testo;
      return { testi: [ts], pulsanti: small.arg.pulsanti };
    }
    if (arg.arg && arg.punti >= 4) {
      return { testi: [arg.arg.testo], pulsanti: arg.arg.pulsanti };
    }
    return null;
  }

  function argomento(id) { var a = ARGOMENTI.filter(function (x) { return x.id === id; })[0]; return { testi: [a.testo], pulsanti: a.pulsanti }; }

  // ---- flusso guidato ----
  function avviaFlusso() {
    S.flusso = 0; S.dati = {};
    return { testi: [domandaPasso(0)], pulsanti: (PASSI[0].scelte || []).concat(['Annulla']) };
  }
  function domandaPasso(i) { var d = PASSI[i].domanda; return typeof d === 'function' ? d(S.dati) : d; }
  function passoFlusso(v) {
    if (/^ ?(annulla|stop|esci|lascia stare|basta) ?$/i.test(norm(v))) {
      S.flusso = null;
      return { testi: ['Nessun problema, ho annullato la richiesta. Se cambi idea basta scrivere “sopralluogo”.'], pulsanti: SUGGERIMENTI };
    }
    var p = PASSI[S.flusso];
    if (p.valida && !p.valida(v.trim())) return { testi: [p.errore], pulsanti: ['Annulla'] };
    S.dati[p.campo] = v.trim();
    S.flusso++;
    if (S.flusso < PASSI.length) {
      return { testi: [domandaPasso(S.flusso)], pulsanti: (PASSI[S.flusso].scelte || []).concat(['Annulla']) };
    }
    S.flusso = null;
    return riepilogo();
  }
  function riepilogo() {
    var d = S.dati;
    var righe = [
      'Richiesta di sopralluogo — sito Ventilàrt',
      'Nome: ' + d.nome,
      'Comune del cantiere: ' + d.comune,
      'Edificio: ' + d.edificio,
      'Intervento: ' + d.intervento,
      'Superficie indicativa: ' + d.superficie,
      'Materiale: ' + d.materiale,
      'Telefono: ' + d.telefono,
    ];
    var wa = 'https://wa.me/' + C.wa + '?text=' + encodeURIComponent(righe.join('\n')).replace(/[()*]/g, function (c) { return '%' + c.charCodeAt(0).toString(16).toUpperCase(); });
    return {
      testi: [
        'Grazie ' + d.nome.split(' ')[0] + ', ecco il riepilogo:\n• **Comune**: ' + d.comune + '\n• **Edificio**: ' + d.edificio + '\n• **Intervento**: ' + d.intervento + '\n• **Superficie**: ' + d.superficie + '\n• **Materiale**: ' + d.materiale + '\n• **Telefono**: ' + d.telefono,
        'Per inviarla tocca **[Invia la richiesta su WhatsApp](' + wa + ')**: si apre WhatsApp con il messaggio già scritto, devi solo premere invio.\nPreferisci parlarci subito? Chiama il [' + C.tel + '](' + C.telLink + ').\nI dati non vengono salvati sul sito: li invii tu.',
      ],
      pulsanti: ['Ricomincia la richiesta', 'Ho un’altra domanda'],
    };
  }

  function rispondi(domanda) {
    if (S.flusso !== null && S.flusso !== undefined) return passoFlusso(domanda);
    if (/^ ?(ricomincia la richiesta) ?$/.test(norm(domanda))) return avviaFlusso();
    if (/^ ?(ho un altra domanda) ?$/.test(norm(domanda))) return { testi: ['Certo, chiedi pure!'], pulsanti: SUGGERIMENTI };
    if (/^ ?(contatti) ?$/.test(norm(domanda))) return argomento('contatti');
    var r = capisci(domanda);
    if (r) { S.errori = 0; return r; }
    S.errori++;
    return S.errori >= 2
      ? { testi: [NON_CAPITO[1]], pulsanti: ['Richiedere un sopralluogo', 'Cosa sai fare?'] }
      : { testi: [NON_CAPITO[0]], pulsanti: SUGGERIMENTI };
  }

  // ======================= INTERFACCIA =======================
  var btn = document.createElement('button');
  btn.className = 'vchat-btn'; btn.setAttribute('aria-label', 'Apri l’assistente virtuale'); btn.setAttribute('aria-expanded', 'false');
  var CHIUSO = '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg><span class="lbl"><b>Assistente virtuale</b><small>Chiedi pure, rispondo subito</small></span><span class="dot"></span>';
  btn.innerHTML = CHIUSO;
  var hint = document.createElement('div'); hint.className = 'vchat-hint'; hint.textContent = 'Ciao! Hai domande sulle facciate ventilate? Chiedi pure.';
  var box = document.createElement('div');
  box.className = 'vchat'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Assistente virtuale Ventilàrt'); box.setAttribute('aria-hidden', 'true');
  box.innerHTML =
    '<div class="vchat-head"><img src="' + BASE + '../assets/logo/ventilart-simbolo.svg" alt=""><div><b>Assistente virtuale Ventilàrt</b><small><i class="on"></i>Online · risponde in automatico</small></div>' +
    '<button class="vchat-r" aria-label="Nuova conversazione" title="Nuova conversazione">↺</button><button class="vchat-x" aria-label="Chiudi">×</button></div>' +
    '<div class="vchat-log" aria-live="polite"></div><div class="vchips"></div>' +
    '<form class="vchat-form"><input placeholder="Scrivi un messaggio…" aria-label="Scrivi un messaggio" maxlength="400" autocomplete="off"><button aria-label="Invia">↑</button></form>' +
    '<div class="vchat-note">Assistente automatico · per i dettagli ti risponde il nostro ufficio tecnico</div>';
  document.body.appendChild(hint); document.body.appendChild(btn); document.body.appendChild(box);

  var log = box.querySelector('.vchat-log'), chips = box.querySelector('.vchips'),
      form = box.querySelector('form'), input = form.querySelector('input'), occupato = false;

  function scroll() { log.scrollTop = log.scrollHeight; }
  function disegna(testo, chi, anim) {
    var d = document.createElement('div'); d.className = 'vmsg ' + chi + (anim ? '' : ' noanim');
    d.innerHTML = chi === 'bot' ? formatta(testo) : esc(testo);
    log.appendChild(d); scroll();
  }
  function msg(testo, chi) { S.log.push({ c: chi, t: testo }); if (S.log.length > 80) S.log.shift(); salva(); disegna(testo, chi, true); }
  function bottoni(lista) {
    chips.innerHTML = '';
    S.chips = lista || []; salva();
    (lista || []).forEach(function (t) { var b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = function () { invia(t); }; chips.appendChild(b); });
  }
  function scrivi(testi, lista, fine) {
    bottoni([]); occupato = true;
    var i = 0;
    (function prossimo() {
      if (i >= testi.length) { occupato = false; bottoni(lista); if (fine) fine(); return; }
      var t = testi[i++]; if (typeof t === 'function') t = t();
      var dots = document.createElement('div'); dots.className = 'vmsg bot vtyping'; dots.innerHTML = '<i></i><i></i><i></i>'; log.appendChild(dots); scroll();
      var attesa = Math.min(1800, 450 + t.length * 6);   // "scrive" più a lungo per le risposte lunghe
      setTimeout(function () { dots.remove(); msg(t, 'bot'); setTimeout(prossimo, 250); }, attesa);
    })();
  }
  function invia(testo) {
    if (occupato) return;
    msg(testo, 'me');
    var r = rispondi(testo); salva();
    scrivi(r.testi, r.pulsanti);
  }
  function benvenuto() { scrivi(BENVENUTO, SUGGERIMENTI); }
  function nuova() {
    S = { log: [], materiale: null, attributo: null, flusso: null, dati: {}, errori: 0, aperta: true };
    log.innerHTML = ''; salva(); benvenuto();
  }
  function apri(on) {
    box.classList.toggle('open', on); btn.classList.toggle('open', on); hint.classList.remove('show');
    box.setAttribute('aria-hidden', !on); btn.setAttribute('aria-expanded', on);
    btn.innerHTML = on ? '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>' : CHIUSO;
    S.aperta = on; salva();
    if (on && !S.log.length) benvenuto();
    if (on) setTimeout(function () { input.focus(); scroll(); }, 300);
  }

  // ripristina la conversazione dalla pagina precedente
  S.log.forEach(function (m) { disegna(m.t, m.c, false); });
  if (S.log.length) bottoni(S.chips || SUGGERIMENTI);

  btn.onclick = function () { apri(!box.classList.contains('open')); };
  box.querySelector('.vchat-x').onclick = function () { apri(false); btn.focus(); };
  box.querySelector('.vchat-r').onclick = function () { if (!occupato) nuova(); };
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) apri(false); });
  box.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a && a.getAttribute('href').indexOf('#') > -1 && a.target !== '_blank') apri(false); });
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-assistente]');
    if (el) { e.preventDefault(); apri(true); }
  });
  window.apriAssistente = function () { apri(true); };
  form.onsubmit = function (e) { e.preventDefault(); var v = input.value.trim(); if (!v || occupato) return; input.value = ''; invia(v); };
  if (S.aperta) apri(true);

  // piccolo invito dopo qualche secondo, una sola volta per visita
  try { if (!sessionStorage.getItem('vchat-hint') && !S.log.length) { setTimeout(function () { if (!box.classList.contains('open')) { hint.classList.add('show'); setTimeout(function () { hint.classList.remove('show'); }, 6000); } }, 5000); sessionStorage.setItem('vchat-hint', '1'); } } catch (e) {}

  // per i test dalla console: window.__vchat.prova('domanda')
  window.__vchat = { azzera: function () { S.materiale = null; S.attributo = null; S.flusso = null; S.errori = 0; }, prova: function (q) { var r = rispondi(q); return r.testi.map(function (t) { return typeof t === 'function' ? t() : t; }).join('\n---\n'); } };
})();
