// DOM-узлы
// Popup редактировать профиль
const popupEditProfile = document.querySelector('#popupEditProfile'); 
const popupOpenButtonElement = document.querySelector('.profile__edit-button'); 
const popupCloseButtonElement = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__inputs');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const prifileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
// Popup добавить карточку
const popupAddElement = document.querySelector('#popupAddCard');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupAddCloseButtonElement = document.querySelector('.popup__button_close-add');
// Popup увеличить картинку
const popupImage = document.querySelector('#popupBigImg');
const bigImage = document.querySelector('.popup__big-img');
const descImage = document.querySelector('.popup__img-desc');
const descTitleImage = document.querySelector('.element__title');
const popupImageOpenButton = document.querySelector('.element__button-img');
const popupImageCloseButton = document.querySelector('.popup__button_close-enlarge');
// Popup
const popup = document.querySelector('.popup');
// Добавление карточки пользователем
const elemenetsContainer = document.querySelector(".elements__list");
const nameImage = document.querySelector('.popup__input_name-img');
const linkImage = document.querySelector('.popup__input_link_img');
const popupAddCard = document.querySelector('.popup__inputs_add-img');

//Массив карточек 
const elementsCards = [
	{
	name: 'Архыз',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	name: 'Челябинская область',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	name: 'Иваново',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	name: 'Камчатка',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	name: 'Холмогорский район',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	}, 
	{
	name: 'Байкал',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

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

// Открытие попапа с сохранением введенных данных
const openPopup = (popup) => {
		popup.classList.add('popup_active');
    nameInput.value = prifileName.textContent;
    jobInput.value = profileJob.textContent;
}

//Закрытие попапа 
const closePopup = (popup) => {
	popup.classList.remove('popup_active');
}

// Закрытие попапа при клике на пространстве за рамками попапа
const closePopupByClickOnOverlay = function (e) {
  if (e.target === e.currentTarget) {
		closePopup(popupEditProfile);
		closePopup(popupAddElement);
		closePopup(popupImage);
  }
}

//Обработка отправки введенных в попап редактирования данных
function formSubmitHandler(e) {
    e.preventDefault();
    prifileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popup);
}

// Добавление карточки пользователем
const handleSubmitAdd = (e) => {
	e.preventDefault();
	renderCard({name: nameImage.value, link: linkImage.value});
	closePopup(popupAddElement);
}

// Увеличение карточки при нажатии на неё 
function handleBigImage(e) {
  bigImage.src = e.target.src;
  descImage.textContent = e.target.alt;
  openPopup(popupImage);
}

//Подключение слушателей
popupOpenButtonElement.addEventListener('click', () =>
openPopup(popupEditProfile));
popupCloseButtonElement.addEventListener('click', () =>
closePopup(popupEditProfile));
popupAddOpenButtonElement.addEventListener('click', () =>
openPopup(popupAddElement));
popupAddCloseButtonElement.addEventListener('click', () =>
closePopup(popupAddElement));
popupImageCloseButton.addEventListener('click', () =>
closePopup(popupImage));
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupAddElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);
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