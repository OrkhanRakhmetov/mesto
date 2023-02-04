// Импорты
import { elementsCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import {
  popupAddOpenButtonElement,
  popupEditOpenButtonElement,
  nameInput,
  jobInput,
  formList,
  object
} from "./constants.js";

const user = new UserInfo({ profileName: '.profile__title', profileInfo: '.profile__subtitle' });

const popupWithImage = new PopupWithImage('#popupBigImg');
popupWithImage.setEventListeners();

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

const section = new Section({items: elementsCards, renderer: renderCard}, '.elements__list');
section.renderItems();

const popupEdit = new PopupWithForm({
  handleSubmitForm: (inputValues) => {
    user.setUserInfo({
      name: inputValues.name,
      job: inputValues.job,
    });
    popupEdit.close();
  }
}, '#popupEditProfile');
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  handleSubmitForm: (inputValues) => {
    const cardElement = createCard(inputValues);
    section.addItem(cardElement);
    popupAdd.close();
  }
}, '#popupAddCard');
popupAdd.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', function () {
  popupEdit.open();
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  formValidators['popupEditProfile'].resetValidation();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  popupAdd.open();
  formValidators['popupAddCard'].resetValidation();
});

function createCard(data) {
  const card = new Card({ 
  dataCard: data, handleCardClick }, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}



// Валидация
const formValidators = {}

const enableValidation = (config) => {
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(object);

//Функция обработки отправки введенных в попап редактирования данных
// function handleProfileFormSubmit(e) {
//   e.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// }

// //Функция добавления карточки пользователем
// const handleSubmitAdd = (e) => {
//   e.preventDefault();
//   renderCard({ name: nameImage.value, link: linkImage.value });
//   closePopup(popupAddElement);
//   e.target.reset()
// }

// Функция увеличения карточки при нажатии на неё
// function handleBigImage(name, link) {
//   bigImage.src = link;
//   bigImage.alt = name;
//   descImage.textContent = name;
//   openPopup(popupImage);
// }

//Функция открытия попапа добавления картинки
// const openPopupAdd = () => {
//   openPopup(popupAddElement);
//   popupAddForm.reset();
//   formValidators['popupAddCard'].resetValidation();
// }

//Подключение слушателей
//Открытие попапа редактирования профиля, с добавлением значений в импуты, которые отображены сейчас на сайте
// popupOpenButtonElement.addEventListener('click', () => {
//   openPopup(popupEditProfile);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   formValidators['popupEditProfile'].resetValidation();
// });

// //Открытие попапа добавления картинки
// popupAddOpenButtonElement.addEventListener('click', openPopupAdd);

// popupFormEditProfile.addEventListener('submit', handleProfileFormSubmit);
// popupAddForm.addEventListener('submit', handleSubmitAdd);

// // Добавление карточки из массива
// const renderCard = (dataCard) => {
//   elemenetsContainer.prepend(createCard(dataCard));
// }

// // Рендер всех карточек
// elementsCards.forEach(renderCard);

// const popupEdit = new PopupWithForm('#popupEditProfile', { handleSubmitForm: handleEditFormSubmit });
// popupEdit.setEventListeners();

// const popupAdd = new PopupWithForm('#popupAddCard', { handleSubmitForm: handleAddFormSubmit });
// popupAdd.setEventListeners();
// function handleEditFormSubmit(values) {
//   user.setUserInfo({
//     name: values.Name,
//     job: values.Job
//   });
//   popupEdit.close();
// }
// function handleAddFormSubmit(values) {
//   const cardObject = {};
//   cardObject.name = values.NameImg;
//   cardObject.link = values.LinkImg;
//   renderCard(cardObject);
//   popupAdd.close();
// }