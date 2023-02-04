import { Popup } from "./Popup.js"

//Класс PopupWithImage наследует от Popup. Этот класс перезаписывает родительский метод open.
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImg = this._popup.querySelector('.popup__big-img');
    this._popupTitle = this._popup.querySelector('.popup__img-desc');
  }

//Метод open класса PopupWithImage вставляет в попап картинку с src изображения и подписью к картинке.
  open(link, name) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}