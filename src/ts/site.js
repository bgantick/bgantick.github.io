function init () {
  return bindEvents();
}

function checkToggle (toggle, body) {
  if (toggle.checked) {
    body.classList.remove('o-body--light');
    body.classList.add('o-body--dark');
  } else {
    body.classList.add('o-body--light');
    body.classList.remove('o-body--dark');
  }
}

function bindEvents () {
  const body = document.querySelector('body');
  const toggleButton = document.querySelector('[data-role=theme-toggle]');
  checkToggle(toggleButton, body);
  toggleButton.addEventListener('change', e => {
    checkToggle(e.target, body)
  });
}

init();
