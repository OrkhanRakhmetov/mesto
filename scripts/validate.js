// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const object = {
  formSelector: '.popup__inputs',//селектор формы
  inputSelector: '.popup__input',//селектор инпутов внутри этой формы
  submitButtonSelector: '.popup__button',//селектор кнопки сабмита этой формы
  inactiveButtonClass: 'popup__button_disabled',//класс модификатор для дизэйбла кнопки
  inputErrorClass: 'popup__input_type_error',//класс модификатор для инпутов при возникновении ошибки
  errorClass: 'popup__error_visible'//селектор контейнеров для ошибок этой формы
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
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

} const disableSubmitButton = (formElement, object) => {
  const submitButton = formElement.querySelector(object.submitButtonSelector);
  submitButton.classList.add(object.inactiveButtonClass);
  submitButton.setAttribute('disabled', true);
}

const enableSubmitButton = (formElement, object) => {
  const submitButton = formElement.querySelector(object.submitButtonSelector);
  submitButton.classList.remove(object.inactiveButtonClass);
  submitButton.removeAttribute('disabled');
}

function toggleButtonState(inputList, formElement, object) {
  
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(formElement, object);
  } else {
    enableSubmitButton(formElement, object);
  }
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
 // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, formElement, object);

  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
      toggleButtonState(inputList, formElement, object);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, formElement, object);
    });
  });
};

// функция запускает процесс наложения валидации на формы
function enableValidation(object) {
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, object);
  });
};
enableValidation(object);


