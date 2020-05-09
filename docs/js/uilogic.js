//burger-menu
[...document.querySelectorAll('.burger-menu , .burger-close')].map(function (
  el
) {
  el.addEventListener('click', function (e) {
    document.querySelector('.mod-menu').classList.toggle('menu-on');
  });
});

// accardeon
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('accardeon')) {
    event.preventDefault();
    event.target.classList.toggle('active');
    let list = event.target
      .closest('.footer__offer')
      .querySelector('.goods__list');
    if (list.style.maxHeight) {
      list.style.maxHeight = null;
    } else {
      list.style.maxHeight = list.scrollHeight + 'px';
    }
  }
});
document.addEventListener('click', (event) => {
  const btn = document.querySelector('.about-us__show-btn');
  if (event.target.classList.contains('show-btn')) {
    event.preventDefault();

    let img = document.querySelector('.about-us__text');
    if (img.style.maxHeight) {
      img.style.maxHeight = null;
      btn.textContent = 'Пoказати все';
    } else {
      hideTitle = true;
      img.style.maxHeight = img.scrollHeight + 'px';
      btn.textContent = 'Приховати все';
    }
  }
});

//smothscroll

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

//tabs

const [tabs, tabsPanels] = [
  Array.from(document.querySelectorAll('.tabs li')),
  Array.from(document.querySelectorAll('.tabs-panel')),
];

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(`#${tab.dataset.target}`);
    removeActiveClass([tabs, tabsPanels]);
    tab.classList.add('active');
    target.classList.add('active');
  });
});

const removeActiveClass = (el) => {
  el.forEach((item) => {
    item.find((e) => e.classList.contains('active')).classList.remove('active');
  });
};
