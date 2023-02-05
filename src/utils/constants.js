export const popupEditProfile = document.querySelector('#popupEditProfile');//Попап редактирования профиля
export const popupFormEditProfile = document.forms["popupEditProfile"];//Форма редактирования профиля
export const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');//Кнопка попапа редактирования профиля
export const nameInput = popupEditProfile.querySelector('.popup__input_type_name');//инпут имени пользователя
export const jobInput = popupEditProfile.querySelector('.popup__input_type_job');//инпут рода деятельности пользователя
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');//Кнопка попапа добавления картинки
export const popupAddForm = document.forms["popupAddCard"];//ФОРМА
export const popupImage = document.querySelector('#popupBigImg');
export const formList = Array.from(document.querySelectorAll('.popup__inputs'));

export const object = {
  formSelector: '.popup__inputs',//селектор формы
  inputSelector: '.popup__input',//селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__button',//селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled',//класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error',//класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible'//селектор контейнеров для ошибок этой формы
};
