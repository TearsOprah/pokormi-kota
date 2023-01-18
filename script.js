const cards = document.querySelectorAll('.card');
const links = document.querySelectorAll('.card__description-buy');

const descriptions = {
  'с фуа-гра': 'Печень утки разварная с артишоками.',
  'с рыбой': 'Головы щучьи с чесноком да свежайшая сёмгушка.',
  'с курой': 'Филе из цыплят с трюфелями в бульоне.'
}

// сохраняем оригинальную разметку описания
const originalDescription = document.querySelector('.original-description').innerHTML;

function selectCard(ev, card) {

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

    // т.к. описание перезаписалось - внешний link.addEventListener не сработает
    const link = ev.target.closest('.grid-cards__item').querySelector('.card__description-buy')
    link.addEventListener('click', linkClick)
  }
}

// проходим по всем карточкам и вешаем слушатель
cards.forEach((card) => {

  // значение при инициализации - не кликнуто
  let isClicked = false;

  // при клике по карточке меняем значение
  card.addEventListener('click', () => {
    isClicked = true;
  })

  // если курсор покинул карточку - выделяем ее
  card.addEventListener('mouseleave', (ev) => {
    if (isClicked) {
      selectCard(ev, card)
    }
  })

  // если курсор навелся - снимаем клик
  card.addEventListener('mouseenter', () => {
    isClicked = false
  })
})


// при клике по ссылке вызываем selectCard
function linkClick(ev) {
  ev.preventDefault()
  const card = ev.target.closest('.grid-cards__item').querySelector('.card')
  selectCard(ev, card)
}

links.forEach((link) => {
  link.addEventListener('click', linkClick)
})