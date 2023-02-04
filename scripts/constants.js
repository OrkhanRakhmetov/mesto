// Все попапы
export const popups = document.querySelectorAll('.popup');
// Popup редактировать профиль
export const popupEditProfile = document.querySelector('#popupEditProfile');//Попап редактирования профиля
export const popupFormEditProfile = document.forms["popupEditProfile"];//Форма редактирования профиля
export const popupEditSubmit = popupFormEditProfile.querySelector('#popupEditSubmit');//кнопка из ПОПАПА
export const popupEditOpenButtonElement = document.querySelector('.profile__edit-button');//Кнопка попапа редактирования профиля
export const nameInput = popupEditProfile.querySelector('.popup__input_type_name');//инпут имени пользователя
export const jobInput = popupEditProfile.querySelector('.popup__input_type_job');//инпут рода деятельности пользователя
// Popup добавить карточку
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');//Кнопка попапа добавления картинки
export const popupAddElement = document.querySelector('#popupAddCard');//ПОПАП
export const popupAddForm = document.forms["popupAddCard"];//ФОРМА
export const popupAddSubmit = popupAddForm.querySelector('.popup__button_add');//кнопка из ПОПАПА
export const profileName = document.querySelector('.profile__title');//Имя пользователя
export const profileJob = document.querySelector('.profile__subtitle');//Род деятельности пользователя
// Popup увеличить картинку
export const popupImage = document.querySelector('#popupBigImg');
export const bigImage = document.querySelector('.popup__big-img');
export const descImage = popupImage.querySelector('.popup__img-desc');
// Добавление карточки пользователем
export const elemenetsContainer = document.querySelector(".elements__list");
export const nameImage = document.querySelector('.popup__input_name-img');
export const linkImage = document.querySelector('.popup__input_link_img');
export const formList = Array.from(document.querySelectorAll('.popup__inputs'));

export const object = {
  formSelector: '.popup__inputs',//селектор формы
  inputSelector: '.popup__input',//селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__button',//селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled',//класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error',//класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible'//селектор контейнеров для ошибок этой формы
};