export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(dataCard, templateSelector, hendleBigImage) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._templateSelector = templateSelector;
    this._hendleBigImage = hendleBigImage;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.element__img');
    this._likeElement = this._element.querySelector('.element__heart');
    this._deleteElement = this._element.querySelector('.element__delete');
    this._titleElement = this._element.querySelector('.element__title');

    this._setEventListeners();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;

    return this._element;
  }

  _handleDeleteCard() {
    this._element.closest('.element').remove();
  }

  _handleLikeCard() {
    this._likeElement.classList.toggle('element_heart-active');
  }

  
  _setEventListeners() {

    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._imgElement.addEventListener('click', () => {
      this._hendleBigImage(this._name, this._link);
    });

  }
}