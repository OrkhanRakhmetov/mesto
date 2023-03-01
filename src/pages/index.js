// Импорты
import './index.css';
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
    section.renderCards(initialCards.reverse());
  })
  .catch(err => console.log(err));


const createCard = (dataCard) => {
  const card = new Card(dataCard, handleCardClick, '#element-template', userProfile.getProfileId(), {
    handleDeleteCard: (_id) => {
      popupWithConfirmation.open();
      popupWithConfirmation.handleSubmitConfirm(() => {
        api
          .deleteCard(_id)
          .then(() => {
            card.handleDeleteClickButton();
            popupWithConfirmation.close();
          })
          .catch(err => console.log(err));
      })
    },
    handleLikeCard: (_id) => {
      if (card.isLikedByMe()) {
        api
          .deleteLike(card._id)
          .then(res => {
            console.log(res);
            card.setLikesLength(res.likes)
          })
          .catch(err => console.log(err))
      }
      else {
        api
          .addLike(_id)
          .then(res => {
            card.setLikesLength(res.likes)
          })
          .catch(err => console.log(err))
      }
    }
  })

  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

const handleCardClick = (link, name) => {
  popupWithImage.open(link, name);
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

const popupEdit = new PopupWithForm({
  handleSubmitForm: inputValues => {
    popupEdit.setButtonText("Сохранение...");
    formValidators['popupEditProfile'].disableSubmitButton();
    api
      .editProfile({
        name: inputValues.name,
        job: inputValues.job,
      })
      .then((user) => {
        console.log(user);
        userProfile.setUserInfo(user);
        popupEdit.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        formValidators['popupEditProfile'].enableSubmitButton();
        popupAdd.setButtonText("Создать");
      })
  }
},
  '#popupEditProfile');
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({
  handleSubmitForm: (inputValues) => {
    popupAdd.setButtonText("Сохранение...");
    formValidators['popupAddCard'].disableSubmitButton();
    api
      .addNewCard({
        name: inputValues.name,
        link: inputValues.link,
      })
      .then((card) => {
        renderCard(card);
        popupAdd.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        formValidators['popupAddCard'].enableSubmitButton();
        popupAdd.setButtonText("Создать");
      });
  }
}, '#popupAddCard');
popupAdd.setEventListeners();

const popupChangeAvatar = new PopupWithForm({
  handleSubmitForm: (link) => {
    popupChangeAvatar.setButtonText("Сохранение...");
    formValidators['popupAvatarForm'].disableSubmitButton();
    api
      .changeAvatar(link.link)
      .then((user) => {
        userProfile.setUserInfo(user);
        popupChangeAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        formValidators['popupAvatarForm'].enableSubmitButton();
        popupChangeAvatar.setButtonText("Создать");
      });
  }
}, '#popupNewAvatar');
popupChangeAvatar.setEventListeners();

popupAvatarOpenButtonElement.addEventListener('click', function () {
  popupChangeAvatar.open();
  formValidators['popupAvatarForm'].resetValidation();
});

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