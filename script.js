const cards = document.querySelectorAll('.card');
const links = document.querySelectorAll('.card__description-buy');

const descriptions = {
  'с фуа-гра': 'Печень утки разварная с артишоками.',
  'с рыбой': 'Головы щучьи с чесноком да свежайшая сёмгушка.',
  'с курой': 'Филе из цыплят с трюфелями в бульоне.'
}

// сохраняем оригинальную разметку описания
const originalDescription = document.querySelector('.original-description').innerHTML;

// приравняем клик по 'купи' к клику по карточке
function clickLink(ev) {
  ev.preventDefault();
  ev.target.closest('.grid-cards__item').querySelector('.card').click();
}

// проходим по всем карточкам и вешаем слушатель
cards.forEach((card) => {
  card.addEventListener('click', (ev) => {

    // накидываем класс выделения на карточку
    card.classList.toggle('card_selected')

    // ищем наклейку с весом и накидываем ей класс выделения
    ev.target.closest('.grid-cards__item')
      .querySelector('.card__label')
      .classList.toggle('card__label_selected')

    // ищем подзаголовок
    const subTitle = card.querySelector('.card__subtitle').textContent;

    // ищем элемент с описанием
    const descriptionElement = ev.target.closest('.grid-cards__item')
      .querySelector('.card__description');

    // если карточка выделена - меняем описание, если нет - возвращаем оригинальное
    if (card.classList.contains('card_selected')) {
      descriptionElement.textContent = descriptions[subTitle];
    } else {
      descriptionElement.innerHTML = originalDescription
    }

    // ищем ссылку купи
    const link = ev.target.closest('.grid-cards__item').querySelector('.card__description-buy')

    // извне работать не будет при перезаписи оригинального описания
    link.addEventListener('click', clickLink)
  })
})

links.forEach((link) => {
  link.addEventListener('click', clickLink)
})