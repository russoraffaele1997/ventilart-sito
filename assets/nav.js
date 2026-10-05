// Shared header/nav behaviour — included on every page (mobile menu toggle,
// dropdown open/close, scrim). Keep this identical across pages; page-specific
// scripts (hero, cards, forms) stay inline in each page instead.
(function(){
  var nav = document.getElementById('mainNav');
  var toggle = document.getElementById('navToggle');
  var scrim = document.getElementById('navScrim');
  function closeNav(){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); scrim.classList.remove('is-visible'); }
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    scrim.classList.toggle('is-visible', open);
  });
  scrim.addEventListener('click', closeNav);

  document.querySelectorAll('.nav-item').forEach(function(item){
    var trigger = item.querySelector('button.nav-link');
    if(!trigger) return;
    trigger.addEventListener('click', function(){
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.nav-item.is-open').forEach(function(o){ if(o!==item){ o.classList.remove('is-open'); o.querySelector('button.nav-link').setAttribute('aria-expanded','false'); } });
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  });

  document.querySelectorAll('.main-nav a').forEach(function(a){ a.addEventListener('click', closeNav); });
})();
