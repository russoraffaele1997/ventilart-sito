// Menu laterale: apertura, chiusura con ×, clic fuori o tasto Esc
(function () {
  var b = document.body, apri = document.getElementById('apri'), menu = document.getElementById('menu');
  if (!apri || !menu) return;
  function set(on) {
    b.classList.toggle('menu-open', on);
    apri.setAttribute('aria-expanded', on);
    menu.setAttribute('aria-hidden', !on);
    if (on) document.getElementById('chiudi').focus(); else apri.focus();
  }
  apri.onclick = function () { set(true); };
  document.getElementById('chiudi').onclick = function () { set(false); };
  document.getElementById('velo').onclick = function () { set(false); };
  addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
