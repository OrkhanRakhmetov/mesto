// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const objectInputSettings = {
  formSelector: '.popup__inputs',//селектор формы
  inputSelector: '.popup__input',//селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__button',//селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled',//класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error',//класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible'//селектор контейнеров для ошибок этой формы
};

const showInputError = (formElement, inputElement, errorMessage, objectInputSettings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objectInputSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectInputSettings.errorClass);
};

const hideInputError = (formElement, inputElement, objectInputSettings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objectInputSettings.inputErrorClass);
  errorElement.classList.remove(objectInputSettings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, objectInputSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectInputSettings);
  } else {
    hideInputError(formElement, inputElement, objectInputSettings);
  }
};

function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputList) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputList.validity.valid;
  })

} const disableSubmitButton = (formElement, objectInputSettings) => {
  const submitButton = formElement.querySelector(objectInputSettings.submitButtonSelector);
  submitButton.classList.add(objectInputSettings.inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
}

const enableSubmitButton = (formElement, objectInputSettings) => {
  const submitButton = formElement.querySelector(objectInputSettings.submitButtonSelector);
  submitButton.classList.remove(objectInputSettings.inactiveButtonClass);
  submitButton.removeAttribute('disabled');
}

function toggleButtonState(inputList, formElement, objectInputSettings) {
  // });
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(formElement, objectInputSettings);
  } else {
    enableSubmitButton(formElement, objectInputSettings);
  }
};

const setEventListeners = (formElement, objectInputSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(objectInputSettings.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, objectInputSettings);
      toggleButtonState(inputList, formElement, objectInputSettings);
    });
  });
};

// функция запускает процесс наложения валидации на формы
function enableValidation(objectInputSettings) {
  const formList = Array.from(document.querySelectorAll(objectInputSettings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, objectInputSettings);
  });
};
enableValidation(objectInputSettings);


