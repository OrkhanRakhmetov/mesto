export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Публичный метод open отвечает за открытие попапа.
  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Публичный метод close отвечает за закрытие попапа.
  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //Приватный метод _handleEscClose содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
  //Публичный метод setEventListeners добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_active') || e.target.classList.contains('popup__close'))
        this.close();
    })
  }
//Публичный метод setButtonText отвечает за изменение надписи на кнопке попапа.
  setButtonText(text) {
    this._button.textContent = text;
  };
}