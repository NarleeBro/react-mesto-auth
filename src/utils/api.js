class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkRes(res) {
    return res.ok ? res.json() : Promise.reject;
  }

  getInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }

  getCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }

  setUserInfo(data) {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.yourname,
        about: data.yourjob,
      }),
    }).then(this._checkRes);
  }

  setNewAvatar(data) {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRes);
  }

  addCard(item) {
    return fetch("https://nomoreparties.co/v1/cohort-66/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.placename,
        link: item.link,
      }),
    }).then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLiked) {
    let method = "DELETE";
    if (isLiked) {
      method = "PUT";
    }
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }

  /* deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
  } */

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkRes);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "e831aae7-60b4-4f1e-b303-432cbd525640",
    "Content-Type": "application/json",
  },
});

export default api;
