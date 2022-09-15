/* анимация section "new" */
const imgBox = [...document.querySelectorAll('.preview__img-box')];

imgBox.forEach((elem) => {
  elem.addEventListener('mouseenter', (e) => {
    const prevDesc = e.target.querySelector('.preview__description');
    if (prevDesc.classList.contains('preview__description')) {
      prevDesc.classList.add('preview__description_hover');
    }
  });
  elem.addEventListener('mouseleave', (e) => {
    const prevDesc = e.target.querySelector('.preview__description');
    if (prevDesc.classList.contains('preview__description')) {
      prevDesc.classList.remove('preview__description_hover');
    }
  });
});

/* табы */

const tabs = () => {
  const button = document.querySelector('.tabs'); // ищем элемент с кнопками и записываем в константу
  const content = document.querySelector('.content-wrapper'); // ищем элемент с контентом и записываем в константу

  /* делаем активной вкладку из sessionStorage */
  const buttonActive = () => {
    const activeTab = sessionStorage.getItem('active-tab');

    if (activeTab === 'tv') {
      button.querySelector('[data-tab="tv"]').classList.add('tabs__title_active');
    }

    if (activeTab === 'films') {
      button.querySelector('[data-tab="films"]').classList.add('tabs__title_active');
    }
  };

  buttonActive();

  const getActiveTabName = () => button.querySelector('.tabs__title_active').dataset.tab; // возвращаем значение data-tab активной кнопки;

  const setActiveContent = () => { // объявляем функцию для установки активного элемента контента
    if (content.querySelector('.content_active')) { // если уже есть активный элемент контента
      content.querySelector('.content_active').classList.remove('content_active');// то скрываем его
    }
    content.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('content_active'); // затем ищем элемент контента, у которого значение data-tab совпадает со значением data-tab активной кнопки и отображаем его
  };

  if (!button.querySelector('.tabs__title_active')) { // если активной вкладки нет
    button.querySelector('.tabs__title').classList.add('tabs__title_active'); // то делаем активной по-умолчанию первую вкладку
  }

  setActiveContent(getActiveTabName());

  button.addEventListener('click', (e) => { // при клике на .tabs__head
    const caption = e.target.closest('.tabs__title'); // узнаем, был ли клик на кнопке
    if (!caption) return; // если клик был не на кнопке, то прерываем выполнение функции
    if (caption.classList.contains('tabs__title_active')) return; // если клик был на активной кнопке, то тоже прерываем выполнение функции и ничего не делаем

    if (button.querySelector('.tabs__title_active')) { // если уже есть активная кнопка
      button.querySelector('.tabs__title_active').classList.remove('tabs__title_active'); // то удаляем ей активный класс
    }

    caption.classList.add('tabs__title_active'); // затем добавляем активный класс кнопке, на которой был клик
    sessionStorage.setItem('active-tab', caption.dataset.tab); // записываем data атрибут в sessionStorage

    // sessionStorage.setItem('active-tab', caption.dataset.tab);
    console.log(sessionStorage.getItem('active-tab'));

    setActiveContent(getActiveTabName()); // устанавливаем активный элемент контента в соответствии с активной кнопкой
  });
};

tabs();

/* модалльное окно */

const singInButton = document.querySelector('.sing-in');
const modal = document.querySelector('.modal-wrapper');

singInButton.addEventListener('click', () => {
  modal.classList.add('modal-wrapper_active');
});

modal.addEventListener('click', (e) => {
  const caption = e.target;
  if (!caption.classList.contains('modal-wrapper_active')) return;
  modal.classList.remove('modal-wrapper_active');
});

/* Вход */

const loginForm = document.forms.modal;
const loginInStorage = sessionStorage.getItem('login');
const obj = { login: loginInStorage };

const loginBox = document.querySelector('.login-box');
const box = document.createElement('div');
box.classList.add('sing-up-box');

box.innerHTML = `<input type="text"
                        class="sing-up-box__input"
                        name="login"
                  />
                  <button class="sing-up-box__exit">Выход</button>`;

const input = box.querySelector('.sing-up-box__input');
const exit = box.querySelector('.sing-up-box__exit');

const setInput = () => {
  if (obj.login !== undefined || obj.login !== null) {
    singInButton.style.display = 'none';
    loginBox.append(box);
    input.value = obj.login;
    box.style.display = 'flex';
  }
};

setInput();

const goOut = () => {
  sessionStorage.clear();
  singInButton.style.display = 'flex';
  box.style.display = 'none';
};

if (obj.login === undefined || obj.login === null) {
  goOut();
}

exit.onclick = () => {
  goOut();
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  formData.forEach((value, key) => { obj[key] = value; });
  sessionStorage.setItem('login', obj.login);
  if (formData.get('login') !== '') {
    setTimeout(
      () => modal.classList.remove('modal-wrapper_active'),
      300,
    );
  }
  setInput();
});

input.addEventListener('change', () => {
  console.log(input.value);
  sessionStorage.setItem('login', input.value);
  if (input.value === '') {
    goOut();
  }
});
