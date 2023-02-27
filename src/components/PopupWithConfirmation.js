import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector(".popup__inputs");
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        this._handleSubmitForm();
    });
}

handleSubmitConfirm(submit) {
  this._handleSubmitForm = submit;
}
}