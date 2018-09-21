'use strict';

(function () {
  var matched = location.hash.match(/errorLines=([\d,]+)/);
  if (matched) return;

  function adjust() {
    window.scrollBy(0, -55);
    var el = document.querySelector('.inner-link-active');
    if (el) el.classList.remove('inner-link-active');

    var id = location.hash.replace(/([\[\].'"@$])/g, '\\$1');
    var el = document.querySelector(id);
    if (el) el.classList.add('inner-link-active');
  }

  window.addEventListener('hashchange', adjust);

  if (location.hash) {
    setTimeout(adjust, 0);
  }
})();

(function () {
  var els = document.querySelectorAll('[href^="#"]');
  var href = location.href.replace(/#.*$/, '');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.href = href + el.getAttribute('href');
  }
})();