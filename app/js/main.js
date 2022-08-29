/* анимация section "new" */
const imgBox = [...document.querySelectorAll('.preview__img-box')];

imgBox.map((elem) => {
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
