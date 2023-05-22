class Auth {
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

  //Регистрация в сервисе
  signUp(password, email) {
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  //для авторизации
  signIn(password, email) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }

  //проверка валидности токена и получения email 
  getAuthUserData(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        return this._checkStatus(res);
      })
  }
}

const authApi = new Auth({
  baseUrl: 'https://mestogustera-api.nomoredomains.monster/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default authApi;

