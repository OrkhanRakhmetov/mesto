import { Popup } from "./Popup.js";

//Класс PopupWithForm, который наследует от Popup.
//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export class PopupWithForm extends Popup {
  constructor( { handleSubmitForm }, selector) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__inputs')
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  //Приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })

  }

  close() {
    super.close();
    this._form.reset();
  }
}


//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.