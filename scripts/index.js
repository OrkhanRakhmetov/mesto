// Занесение  DOM-элементов в переменные
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__inputs');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const prifileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');


// Открытие попапа с сохранением введенных данных
const openPopup = function () {
    popupElement.classList.add('popup_active');
    nameInput.value = prifileName.textContent;
    jobInput.value = profileJob.textContent;
}

//Закрытие попапа 
const closePopup = function () {
    popupElement.classList.remove('popup_active');
}

// Закрытие попапа при клике на пространстве за рамками попапа
const closePopupByClickOnOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
}

//Обработка отправки введенных в попап данных
function formSubmitHandler(evt) {
    evt.preventDefault();
    prifileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

//Подключение слушателей
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);