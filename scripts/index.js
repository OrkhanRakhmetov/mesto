// Импорты

import { elementsCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


// Все попапы
const popups = document.querySelectorAll('.popup');
// Popup редактировать профиль
const popupEditProfile = document.querySelector('#popupEditProfile');//Попап редактирования профиля
const popupFormEditProfile = document.forms["popupEditProfile"];//Форма редактирования профиля
// const popupFormEditProfile = popupEditProfile.querySelector('.popup__inputs_edit-profile');//ФОРМА
const popupEditSubmit = popupFormEditProfile.querySelector('#popupEditSubmit');//кнопка из ПОПАПА
const popupOpenButtonElement = document.querySelector('.profile__edit-button');//Кнопка попапа редактирования профиля
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');//инпут имени пользователя
const jobInput = popupEditProfile.querySelector('.popup__input_type_job');//инпут рода деятельности пользователя
// Popup добавить карточку
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');//Кнопка попапа добавления картинки
const popupAddElement = document.querySelector('#popupAddCard');//ПОПАП
const popupAddForm = document.forms["popupAddCard"];//ФОРМА
const popupAddSubmit = popupAddForm.querySelector('.popup__button_add');//кнопка из ПОПАПА
const profileName = document.querySelector('.profile__title');//Имя пользователя
const profileJob = document.querySelector('.profile__subtitle');//Род деятельности пользователя
// Popup увеличить картинку
const popupImage = document.querySelector('#popupBigImg');
const bigImage = document.querySelector('.popup__big-img');
const descImage = popupImage.querySelector('.popup__img-desc');
// Добавление карточки пользователем
const elemenetsContainer = document.querySelector(".elements__list");
const nameImage = document.querySelector('.popup__input_name-img');
const linkImage = document.querySelector('.popup__input_link_img');
// Добавление шаблона
// const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');

function createCard(dataCard) {
  const card = new Card(dataCard, '#element-template', hendleBigImage);
  const cardElement = card.generateCard();
  return cardElement;
}
// Удаление карточки из массива
// const handleDeleteCard = (e) => {
//   e.target.closest('.element').remove();
// }

// Добавление лайка
// const handleLikeCard = (e) => {
//   e.target.classList.toggle('element_heart-active');
// }

// Открытие попапа !!!!
const openPopup = (popup) => {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByClickEscape);
}

// Закрытие попапа !!!
const closePopup = (popup) => {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByClickEscape);
}

// Закрытие попапа по нажатию Escape
function closePopupByClickEscape(e) {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}

// Закрытие попапа при нажатии на крестик и клике на пространстве за рамками попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//Функция обработки отправки введенных в попап редактирования данных
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//Функция добавления карточки пользователем
const handleSubmitAdd = (e) => {
  e.preventDefault();
  renderCard({ name: nameImage.value, link: linkImage.value });
  closePopup(popupAddElement);
  e.target.reset()
}

// Функция увеличения карточки при нажатии на неё 
function hendleBigImage(dataCard) {
  bigImage.src = dataCard.link;
  bigImage.alt = dataCard.name;
  descImage.textContent = dataCard.name;
  openPopup(popupImage);
}

//Функция открытия попапа добавления картинки
const openPopupAdd = () => {
  openPopup(popupAddElement);
  popupAddForm.reset();
  disableSubmitButton(popupAddForm, object);
}

//Подключение слушателей
//Открытие попапа редактирования профиля, с добавлением значений в импуты, которые отображены сейчас на сайте
popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  disableSubmitButton(popupFormEditProfile, object);
});

//Открытие попапа добавления картинки
popupAddOpenButtonElement.addEventListener('click', openPopupAdd);

// Генерация карточки 
// const generateCard = (dataCard) => {
//   const newCard = cardTemplate.cloneNode(true);
//   const name = newCard.querySelector('.element__title');
//   name.textContent = dataCard.name;
//   const image = newCard.querySelector('.element__img');
//   image.src = dataCard.link;
//   image.alt = dataCard.name;

//   newCard.querySelector('.element__delete').addEventListener('click', handleDeleteCard);
//   // const deleteBtn = newCard.querySelector();
//   // deleteBtn.addEventListener('click', );

//   newCard.querySelector('.element__heart').addEventListener('click', handleLikeCard);
//   // const likeBtn = newCard.querySelector('.element__heart');
//   // likeBtn.addEventListener('click', handleLikeCard);

//   newCard.querySelector('.element__button-img').addEventListener('click', () => handleBigImage(dataCard));
//   // const cursorImage = newCard.querySelector('.element__button-img');
//   // cursorImage.addEventListener('click', () => handleBigImage(dataCard));

//   return newCard;
// }

// Добавление карточки из массива
const renderCard = (dataCard) => {
  elemenetsContainer.prepend(createCard(dataCard));
}

popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupAddForm.addEventListener('submit', handleSubmitAdd);

// Рендер всех карточек
elementsCards.forEach(renderCard);

const object = {
  formSelector: '.popup__inputs',//селектор формы
  inputSelector: '.popup__input',//селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__button',//селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled',//класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error',//класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible'//селектор контейнеров для ошибок этой формы
};