/* Animazioni allo scorrimento (stile Fazora). Gli elementi compaiono dal basso
   quando entrano nello schermo; nei gruppi (schede) compaiono uno dopo l'altro. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('anim');

  // elementi singoli
  var singoli = '.center, .about .mark, .about .txt, .split .slider, .split .panel, .banner, .faq .l, .faq > div:last-child, ' +
                '.contact .info, form.card, #blog > div:last-child, footer .wrap > div, .intro, .ahead, .cover, .cta, .more h2, .body > *';
  // gruppi: i figli compaiono in sequenza
  var gruppi = '.feats, .works, .posts';

  var tutti = [];
  document.querySelectorAll(singoli).forEach(function (el) { el.classList.add('rv'); tutti.push(el); });
  document.querySelectorAll(gruppi).forEach(function (g) {
    [].forEach.call(g.children, function (el, i) { el.classList.add('rv'); el.style.setProperty('--d', (i % 4) * 0.1 + 's'); tutti.push(el); });
  });

  var io = new IntersectionObserver(function (voci) {
    voci.forEach(function (v) { if (v.isIntersecting) { v.target.classList.add('in'); io.unobserve(v.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  tutti.forEach(function (el) { io.observe(el); });

  // foto iniziale: testi in sequenza all'apertura della pagina
  var hero = document.querySelector('.hero');
  if (hero) {
    var txt = hero.querySelectorAll('.txt > *');
    txt.forEach(function (el, i) { el.classList.add('rv'); el.style.setProperty('--d', 0.25 + i * 0.12 + 's'); });
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      hero.classList.add('in'); txt.forEach(function (el) { el.classList.add('in'); });
    }); });
  }

  // freccia sulle schede
  document.querySelectorAll('.work, .post .im').forEach(function (el) {
    var s = document.createElement('span'); s.className = 'go'; s.setAttribute('aria-hidden', 'true'); s.textContent = '↗'; el.appendChild(s);
  });
})();
