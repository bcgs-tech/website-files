// BrightCorner — small shared behaviours
document.querySelectorAll('.js-yr').forEach(function(el){
  el.textContent = new Date().getFullYear();
});

// mobile menu
var mb = document.querySelector('.menu-btn'), nv = document.getElementById('mainnav');
if (mb && nv) mb.addEventListener('click', function(){
  var open = nv.classList.toggle('open');
  mb.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// gallery filter buttons (visual state only until real images are in)
document.querySelectorAll('.filters button').forEach(function(b){
  b.addEventListener('click', function(){
    document.querySelectorAll('.filters button').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
    b.setAttribute('aria-pressed','true');
  });
});

// forms are not wired to a backend yet
function stub(form, msg){
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var p = form.querySelector('.stub') || document.createElement('p');
    p.className = 'stub';
    p.style.cssText = 'color:#68BD45;font-weight:500;margin:1rem 0 0';
    p.textContent = msg;
    form.appendChild(p);
  });
}
document.querySelectorAll('.js-news').forEach(function(f){ stub(f, 'Thanks — connect this form to your mailing list.'); });
// The enquiry form now posts to Formspree directly — no JS interception.
// If the endpoint is still FORM_ID, warn in the console rather than failing silently.
document.querySelectorAll('form.enquiry').forEach(function(f){
  if ((f.getAttribute('action') || '').indexOf('FORM_ID') > -1) {
    console.warn('Enquiry form: replace FORM_ID in contact.html with your Formspree endpoint id.');
  }
});

/* ── Hero slider ──────────────────────────────────────────────
   Auto-advances, pauses on hover and on keyboard focus, supports
   arrow keys, dot navigation and touch swipe. Respects the user's
   reduced-motion setting by not auto-playing.
   Works on any element with [data-carousel]; set the delay with
   data-interval="5000" (milliseconds).
   ─────────────────────────────────────────────────────────── */
document.querySelectorAll('[data-carousel]').forEach(function (root) {
  var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
  if (slides.length < 2) return;

  var dotWrap = root.querySelector('.dots');
  var delay = parseInt(root.dataset.interval, 10) || 5000;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i = 0, timer = null;

  // build the dots from the number of slides
  var dots = slides.map(function (_, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Slide ' + (n + 1) + ' of ' + slides.length);
    b.addEventListener('click', function () { go(n); restart(); });
    dotWrap.appendChild(b);
    return b;
  });

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      s.classList.toggle('is-active', k === i);
      s.setAttribute('aria-hidden', k === i ? 'false' : 'true');
    });
    dots.forEach(function (d, k) {
      d.setAttribute('aria-current', k === i ? 'true' : 'false');
    });
  }

  function next() { go(i + 1); }
  function prev() { go(i - 1); }
  function start() { if (!calm && !timer) timer = setInterval(next, delay); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  root.querySelector('.next').addEventListener('click', function () { next(); restart(); });
  root.querySelector('.prev').addEventListener('click', function () { prev(); restart(); });

  // pause while the pointer or keyboard focus is inside
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);

  // pause when the tab is in the background
  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  // arrow keys
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft') { prev(); restart(); }
  });

  // touch swipe
  var x0 = null;
  root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); }
    x0 = null;
    start();
  }, { passive: true });

  go(0);
  start();
});
