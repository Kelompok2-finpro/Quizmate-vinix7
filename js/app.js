// Navigasi sederhana: tombol Enter di halaman login = Masuk.
(function () {
  'use strict';
  var isLogin = /(^|\/)(index\.html)?$/.test(location.pathname);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && isLogin) {
      var masuk = document.querySelector('.hotspot[aria-label="Masuk"]');
      if (masuk) masuk.click();
    }
  });
})();
