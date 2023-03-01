export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    /* отклоняем промис, чтобы перейти
    в блок catch, если сервер вернул ошибку */
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserData() {
    return fetch(
      this._baseUrl + '/users/me',
      { headers: this._headers }
    )
      .then(res => this._getResponse(res))
  }

  getInitialCards() {
    return fetch(
      this._baseUrl + '/cards/',
      { headers: this._headers }
    )
      .then(res => this._getResponse(res))
  }

  editProfile({ name, job }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => this._getResponse(res))
  }

  changeAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar/', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._getResponse(res))
  }

  addNewCard({ name, link }) {
    return fetch(this._baseUrl + '/cards/', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._getResponse(res))
  }

  deleteCard(_id) {
    return fetch(this._baseUrl + '/cards/' + _id, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponse(res))
  }

  addLike(_id) {
    return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getResponse(res))
  }

  deleteLike(_id) {
    return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponse(res))
  }
}

