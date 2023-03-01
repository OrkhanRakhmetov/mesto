export class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(dataCard, handleCardClick, templateSelector, userId, { handleDeleteCard, handleLikeCard }) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._id = dataCard._id;
    this._ownerId = dataCard.owner._id;
    this._userId = userId;
    this._likes = dataCard.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
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
  _handleDeleteButton() {
    if (this._ownerId != this._userId) {
      this._deleteElement.classList.add('element__delete_hidden');
    }
  }

  handleDeleteClickButton() {
    this._element.remove();
  }

  _clickLike = () => {
    if (this.isLikedByMe()) {
      this._likeElement.classList.add('element_heart-active')
    } 
  }

  setLikesLength(likes) {
    this._likes = likes;
    this._numberOfLikes.textContent = this._likes.length;
    this._clickLike();
  }

  isLikedByMe() {
    return this._likes.some(like => like._id === this._userId);
  }

  _checkLikeButton() {
    if (this.isLikedByMe()) {
      this._clickLike();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.element__img');
    this._likeElement = this._element.querySelector('.element__heart');
    this._deleteElement = this._element.querySelector('.element__delete');
    this._titleElement = this._element.querySelector('.element__title');
    this._numberOfLikes = this._element.querySelector('.element__number_of-likes');// надо сделать стили .element___number_of-likes

    this._handleDeleteButton();
    this._checkLikeButton();
    this._setEventListeners();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteCard(this._id);
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeCard(this._id);
    });

    this._imgElement.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

}