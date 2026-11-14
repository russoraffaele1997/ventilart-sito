// Crea il preloader "una facciata che prende forma" e lo inserisce nella home del mockup.
// Uso: node preloader.js <pezzi.json> <cartella sito>
const fs = require("fs");
const pezzi = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const sito = process.argv[3];

// riquadro stretto attorno al logo (stesse coordinate del file originale, solo senza il margine bianco)
const VB = { x: 2, y: -1, w: 1600, h: 1312 };
const viewBox = `${VB.x} ${VB.y} ${VB.w} ${VB.h}`;

// 1) logo per il sito: identico all'originale, solo con il riquadro stretto (serve alla hero e al passaggio finale)
const orig = fs.readFileSync(sito + "/assets/logo/ventilart-logo-nuovo.svg", "utf8");
fs.writeFileSync(
  sito + "/assets/logo/ventilart-logo-sito.svg",
  orig.replace(/viewBox="[^"]+" width="\d+" height="\d+"/, `viewBox="${viewBox}" role="img" aria-label="Ventilàrt"`)
);

// 2) ordine di montaggio: dal basso verso l'alto, come in cantiere; prima i grigi, poi i rossi.
//    da: posizione di partenza (frazioni della larghezza del logo) e rotazioni in gradi.
const trova = (fill, x, y) => {
  const p = pezzi.pannelli.find((q) => q.fill === fill && Math.round(q.b.x0) === x && Math.round(q.b.y0) === y);
  if (!p) throw new Error("pannello non trovato " + fill + " " + x + "," + y);
  return p;
};
const G = "#3A3F45", R = "#D81F28";
const SEQ = [
  [trova(G, 347, 672), { x: -1.2, y: 0.15, rY: 60, z: -200 }],
  [trova(G, 643, 685), { y: 1.0, rX: -55, z: -200 }],
  [trova(G, 831, 699), { x: 0.25, y: 1.0, rX: -55, z: -200 }],
  [trova(G, 347, 347), { x: -1.2, rY: 60, z: -200 }],
  [trova(G, 644, 347), { z: 700, rX: 18 }],
  [trova(G, 347, 85), { x: -1.2, y: -0.15, rY: 60, z: -200 }],
  [trova(G, 347, 0), { y: -1.0, rX: 55, z: -200 }],
  [trova(G, 643, 0), { y: -1.0, rX: 55, z: -200 }],
  [trova(R, 984, 674), { x: 1.3, y: 0.2, rY: -75, z: -260 }],
  [trova(R, 990, 347), { x: 1.3, rY: -75, z: -260 }],
  [trova(R, 983, 0), { x: 1.3, y: -0.2, rY: -75, z: -260 }],
];
if (SEQ.length !== pezzi.pannelli.length) throw new Error("manca qualche pannello");

const pct = (v, o, l) => (((v - o) / l) * 100).toFixed(2) + "%";
const svgPezzi = SEQ.map(([p, da], i) => {
  const cx = (p.b.x0 + p.b.x1) / 2, cy = (p.b.y0 + p.b.y1) / 2;
  const origine = `${pct(cx, VB.x, VB.w)} ${pct(cy, VB.y, VB.h)}`;
  const dati = Object.entries(da).map(([k, v]) => `data-${k.toLowerCase()}="${v}"`).join(" ");
  const tipo = p.fill === R ? "rosso" : "grigio";
  return `    <svg class="pl-pz ${tipo}" viewBox="${viewBox}" style="transform-origin:${origine}" ${dati} aria-hidden="true"><path fill="${p.fill}" fill-rule="evenodd" d="${p.d.join("")}"/></svg>`;
}).join("\n");
const svgScritta = `    <svg class="pl-scritta" viewBox="${viewBox}" aria-hidden="true"><path fill="${G}" fill-rule="evenodd" d="${pezzi.scritta.join("")}"/><path fill="${pezzi.vRossa.fill}" d="${pezzi.vRossa.d}"/></svg>`;

const TESTA = `<!-- PRELOADER (testa) -->
<script>
  // il preloader si vede una volta per visita; con ?intro nell'indirizzo si rivede sempre
  try { if (sessionStorage.getItem('vt-intro') && !/[?&]intro/.test(location.search)) document.documentElement.classList.add('senza-intro'); } catch (e) {}
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('senza-intro');
</script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<style>
  #preloader{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;pointer-events:auto}
  #preloader .pl-fondo{position:absolute;inset:0;background:#F4F4F2}
  #preloader .pl-logo{position:relative;width:min(300px,58vw);aspect-ratio:${VB.w} / ${VB.h};perspective:1400px;transform-origin:50% 50%}
  #preloader .pl-logo svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;backface-visibility:hidden}
  #preloader .pl-pz,#preloader .pl-scritta{opacity:0}
  html.senza-intro #preloader{display:none}
  html.intro-in-corso{overflow:hidden}
  html.intro-in-corso .hero .marchio{visibility:hidden}
</style>
<!-- /PRELOADER (testa) -->`;

const CORPO = `<!-- PRELOADER: una facciata che prende forma -->
<div id="preloader" aria-hidden="true">
  <div class="pl-fondo"></div>
  <div class="pl-logo">
${svgPezzi}
${svgScritta}
  </div>
</div>
<script>
  (function () {
    var el = document.getElementById('preloader'), html = document.documentElement;
    if (!el || html.classList.contains('senza-intro')) return;
    html.classList.add('intro-in-corso');
    var finito = false;
    function fine() {
      if (finito) return; finito = true;
      html.classList.remove('intro-in-corso');
      var m = document.querySelector('.hero .marchio'); if (m) m.style.visibility = '';
      el.remove();
      try { sessionStorage.setItem('vt-intro', '1'); } catch (e) {}
    }
    setTimeout(fine, 9000); // rete di sicurezza: il sito non resta mai bloccato
    el.addEventListener('click', fine); // un clic salta l'animazione

    function parti() {
      if (!window.gsap) return fine();
      var logo = el.querySelector('.pl-logo'), L = logo.offsetWidth;
      var tl = gsap.timeline();

      // 1-4) i pannelli arrivano uno alla volta e si agganciano al loro posto
      el.querySelectorAll('.pl-pz').forEach(function (p, i) {
        var d = p.dataset, rosso = p.classList.contains('rosso');
        var at = rosso ? 1.75 + (i - 8) * 0.15 : 0.2 + i * 0.15;
        tl.fromTo(p,
          { x: (+d.x || 0) * L, y: (+d.y || 0) * L, z: +d.z || 0, rotationX: +d.rx || 0, rotationY: +d.ry || 0 },
          { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, duration: rosso ? 0.6 : 0.62,
            ease: rosso ? 'back.out(1.25)' : 'power3.out' }, at);
        tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'none' }, at);
      });

      // 5) la scritta compare, con il suo carattere originale, da sinistra a destra
      var s = el.querySelector('.pl-scritta');
      tl.fromTo(s, { opacity: 1, clipPath: 'inset(76% 100% 0% 0%)', y: 8 },
        { clipPath: 'inset(76% 0% 0% 0%)', y: 0, duration: 1.0, ease: 'power2.inOut' }, 2.5)
        .set(s, { clipPath: 'none' });

      // 6) breve pausa, poi il logo va al suo posto nella hero e lo sfondo si dissolve
      tl.call(function () {
        var m = document.querySelector('.hero .marchio');
        var r = m && m.getBoundingClientRect(), a = logo.getBoundingClientRect();
        var t = gsap.timeline({ onComplete: fine });
        if (r && r.width && r.bottom > 0 && r.top < innerHeight) {
          html.classList.remove('intro-in-corso'); // la pagina torna scorrevole; il marchio resta nascosto finché il logo non arriva
          m.style.visibility = 'hidden';
          t.to(logo, { x: r.left + r.width / 2 - (a.left + a.width / 2), y: r.top + r.height / 2 - (a.top + a.height / 2),
            scale: r.width / a.width, duration: 1.4, ease: 'power2.inOut' }, 0)
           .to(el.querySelector('.pl-fondo'), { opacity: 0, duration: 1.2, ease: 'power1.inOut' }, 0.2)
           .add(function () { m.style.visibility = ''; });
        } else {
          t.to(el, { opacity: 0, duration: 1.0, ease: 'power1.inOut' });
        }
      }, null, '+=0.5');
    }
    if (window.gsap) parti(); else document.addEventListener('DOMContentLoaded', parti);
  })();
</script>
<!-- /PRELOADER -->`;

const f = sito + "/mockup/index.html";
let h = fs.readFileSync(f, "utf8");
h = h.replace(/<!-- PRELOADER \(testa\) -->[\s\S]*?<!-- \/PRELOADER \(testa\) -->\n?/, "");
h = h.replace(/<!-- PRELOADER: [\s\S]*?<!-- \/PRELOADER -->\n?/, "");
h = h.replace("</head>", TESTA + "\n</head>");
h = h.replace("<body>", "<body>\n" + CORPO);
h = h.replace('src="../assets/logo/ventilart-logo.svg"', 'src="../assets/logo/ventilart-logo-sito.svg"');
fs.writeFileSync(f, h);
console.log("preloader inserito; hero con il nuovo logo:", h.includes("ventilart-logo-sito.svg"));
