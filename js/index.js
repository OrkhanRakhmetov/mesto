const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
    popupElement.classList.add('popup__is-opened');
    nameInput.value = prifileName.textContent;
    jobInput.value = profileJob.textContent;
}
const closePopup = function () {
    popupElement.classList.remove('popup__is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__inputs');
let nameInput = document.querySelector('.popup__input_name-info');
let jobInput = document.querySelector('.popup__input_job-info');
let prifileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
function formSubmitHandler(evt) {
    evt.preventDefault();
    prifileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);