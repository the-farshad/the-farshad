// Rotates the lines of the .roles block, one every 3 seconds.
(function () {
  var roles = document.querySelector('.roles');
  if (!roles || !roles.firstElementChild) return;
  var first = roles.firstElementChild;
  var count = roles.children.length;
  var current = 1;
  setInterval(function () {
    if (current === count) {
      first.style.marginTop = '0px';
      current = 1;
    } else {
      first.style.marginTop = (-current * roles.clientHeight) + 'px';
      current++;
    }
  }, 3000);
})();
