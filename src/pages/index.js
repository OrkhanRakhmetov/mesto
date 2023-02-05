// Импорты
// import './index.css';
import { elementsCards } from '../utils/cards.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { Section } from '../scripts/Section.js';
import {
  popupAddOpenButtonElement,
  popupEditOpenButtonElement,
  nameInput,
  jobInput,
  formList,
  object
} from "../utils/constants.js";

const user = new UserInfo({ profileName: '.profile__title', profileInfo: '.profile__subtitle' });

const popupWithImage = new PopupWithImage('#popupBigImg');
popupWithImage.setEventListeners();

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

const section = new Section({ items: elementsCards, renderer: renderCard }, '.elements__list');
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
    dataCard: data, handleCardClick
  }, '#element-template');
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