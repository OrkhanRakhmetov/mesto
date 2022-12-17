// DOM-узлы
// Все попапы
const popups = document.querySelectorAll('.popup');
// Popup редактировать профиль
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddOpen = document.querySelector('.profile__add-button');

const formAddElement = document.querySelector('[name="popupAddCard"]');
const formEditElement = document.querySelector('[name="popupEditProfile"]');

const popupProfileForm = document.querySelector('.popup__inputs');
const popupProfileSubmit = document.querySelector('.popup__button');

const popupProfileName = popupProfileForm.querySelector('#name-user');
const popupProfileJob = popupProfileForm.querySelector('#job-desc');

const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__inputs');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
// Popup добавить карточку
const popupAddElement = document.querySelector('#popupAddCard');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
// Popup увеличить картинку
const popupImage = document.querySelector('#popupBigImg');
const bigImage = document.querySelector('.popup__big-img');
const descImage = document.querySelector('.popup__img-desc');
const descTitleImage = document.querySelector('.element__title');
const popupImageOpenButton = document.querySelector('.element__button-img');
// Добавление карточки пользователем
const elemenetsContainer = document.querySelector(".elements__list");
const nameImage = document.querySelector('.popup__input_name-img');
const linkImage = document.querySelector('.popup__input_link_img');
const popupAddCard = document.querySelector('.popup__inputs_add-img');

// Добавление шаблона
const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');

// Удаление карточки из массива
const handleDeleteCard = (e) => {
  e.target.closest('.element').remove();
}

// Добавление лайка
const handleLikeCard = (e) => {
  e.target.classList.toggle('element_heart-active');
}

// Открытие попапа 
const openPopup = (popup) => {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByClickEscape);
}

const openPopupAdd = () => {
  openPopup(formAddElement);
  formElement.reset();
  resetFormError(formElement, objectInputSettings);
  disableSubmitButton(formElement, objectInputSettings);
}

// Закрытие попапа 
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

//Обработка отправки введенных в попап редактирования данных
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Добавление карточки пользователем
const handleSubmitAdd = (e) => {
  e.preventDefault();
  renderCard({ name: nameImage.value, link: linkImage.value });
  closePopup(popupAddElement);
  e.target.reset()
}

// Увеличение карточки при нажатии на неё 
function handleBigImage(e) {
  bigImage.src = e.target.src;
  bigImage.alt = e.target.alt;
  descImage.textContent = e.target.alt;
  openPopup(popupImage);
}

//Подключение слушателей
//Открытие попапа редактирования профиля, с добавлением значений в импуты, которые отображены сейчас на сайте
popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetFormError(formElement, objectInputSettings);
  disableSubmitButton(formElement, objectInputSettings);
});

popupAddOpenButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement);
});

popupAddOpenButtonElement.addEventListener('click', () =>
  openPopup(popupAddElement));
formElement.addEventListener('submit', handleProfileFormSubmit);
popupAddCard.addEventListener('submit', handleSubmitAdd);

// Генерация карточки 
const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);
  const name = newCard.querySelector('.element__title');
  name.textContent = dataCard.name;
  const image = newCard.querySelector('.element__img');
  image.src = dataCard.link;
  image.alt = dataCard.name;
  const deleteBtn = newCard.querySelector('.element__delete');
  deleteBtn.addEventListener('click', handleDeleteCard);

  const likeBtn = newCard.querySelector('.element__heart');
  likeBtn.addEventListener('click', handleLikeCard);

  const cursorImage = newCard.querySelector('.element__button-img');
  cursorImage.addEventListener('click', handleBigImage);
  return newCard;
}

// Добавление карточки из массива
const renderCard = (dataCard) => {
  elemenetsContainer.prepend(generateCard(dataCard));
}

// Рендер всех карточек
elementsCards.forEach((dataCard) => {
  renderCard(dataCard);
})