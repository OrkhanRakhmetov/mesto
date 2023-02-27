// Импорты
import './index.css';
// import { elementsCards } from '../utils/cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import {
  popupAddOpenButtonElement,
  popupEditOpenButtonElement,
  popupAvatarOpenButtonElement,
  nameInput,
  jobInput,
  formList,
  validationConfig
} from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'c97515cb-2876-46b4-889b-f0708374c781',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userProfile.setUserInfo(userData);
    section.renderCards(initialCards);
  })
  .catch(err => console.log(err));


const createCard = (dataCard) => {
  const card = new Card(dataCard, handleCardClick, '#element-template', userProfile.getProfileId(), { handleDeleteCard, handleLikeCard });

  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

const handleDeleteCard = (card) => {
  popupWithConfirmation.open();
  popupWithConfirmation.handleSubmitConfirm(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.handleDeleteClickButton()
        popupWithConfirmation.close();
      })
      .catch(err => console.log(err));
  })
}

const handleLikeCard = (card) => {
  if (card.isLiked()) {
    api
      .deleteLike(card.id)
      .then(res => {
        card.setLikesLength(res.likes)
      })
      .catch(err => console.log(err))
  }
  else {
    api
      .addLike(card.id)
      .then(res => {
        card.setLikesLength(res.likes)
      })
      .catch(err => console.log(err))
  }
}

const popupWithConfirmation = new PopupWithConfirmation("#popupConfirm");
popupWithConfirmation.setEventListeners();

const userProfile = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

const popupWithImage = new PopupWithImage('#popupBigImg');
popupWithImage.setEventListeners();

const section = new Section({ renderer: renderCard }, '.elements__list');

const popupEdit = new PopupWithForm(handleEditSubmitForm, '#popupEditProfile');
popupEdit.setEventListeners();

const handleEditSubmitForm = (inputValues) => {
  popupEdit.setButtonText("Сохранение...");
  formValidators['popupEditSubmit'].disableSubmitButton();
  api
    .editProfile({
      name: inputValues.name,
      job: inputValues.job,
    })
    .then((user) => {
      userProfile.setUserInfo({
        name: user.name,
        job: user.about
      });
      popupEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      formValidators['popupEditSubmit'].enableSubmitButton();
      popupAdd.setButtonText("Создать");
    });
};
const popupAdd = new PopupWithForm(handleAddSubmitForm, '#popupAddCard');
popupAdd.setEventListeners();

const popupChangeAvatar = new PopupWithForm(handleAvatarSubmitForm, '#popupNewAvatar');
popupChangeAvatar.setEventListeners();






const handleAddSubmitForm = (inputValues) => {
  popupAdd.setButtonText("Сохранение...");
  formValidators['popupAddSubmit'].disableSubmitButton();
  api
    .addNewCard({
      name: inputValues.title,
      link: inputValues.link
    })
    .then((card) => {
      section.addItem(card);
      popupAdd.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      formValidators['popupAddSubmit'].enableSubmitButton();
      popupAdd.setButtonText("Создать");
    });
};


const handleAvatarSubmitForm = (data) => {
  popupChangeAvatar.setButtonText("Сохранение...");
  formValidators['popupAvatarSubmit'].disableSubmitButton();
  api
    .changeAvatar(data)
    .then((user) => {
      userProfile.changeAvatar(user.avatar);
      popupChangeAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      formValidators['popupAvatarSubmit'].enableSubmitButton();
      popupChangeAvatar.setButtonText("Создать");
    });
};

const handleCardClick = (link, name) => {
  popupWithImage.open(link, name);
}

popupEditOpenButtonElement.addEventListener('click', function () {
  popupEdit.open();
  const userInfo = userProfile.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  formValidators['popupEditProfile'].resetValidation();
});

popupAddOpenButtonElement.addEventListener('click', function () {
  popupAdd.open();
  formValidators['popupAddCard'].resetValidation();
});

popupAvatarOpenButtonElement.addEventListener('click', function () {
  formValidators['popupNewAvatar'].resetValidation()
  popupChangeAvatar.open();
});


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

enableValidation(validationConfig);