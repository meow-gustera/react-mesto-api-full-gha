class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  //проверка статуса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // получить список всех карточек в виде массива (GET)
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // добавить карточку (POST)
  postNewCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // получить данные пользователя (GET)
  getProfileData() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // Загрузка информации о пользователе с сервера (PATCH)
  editProfile(newName, newAbout) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // удалить карточку (DELETE)
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // заменить аватар (PATCH)
  editAvatar(newAvatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(
        newAvatar
      )
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // “залайкать” карточку (PUT)
  likeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  // удалить лайк карточки (DELETE)
  removeLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  preloadInfo() {
    return Promise.all(
      [
        this.getProfileData(),
        this.getInitialCards()
      ])
  }
}

const newApi = new Api({
  baseUrl: 'https://mestogustera-api.nomoredomains.monster/',
  headers: {
    'Content-Type': 'application/json'
  }
});


export default newApi;