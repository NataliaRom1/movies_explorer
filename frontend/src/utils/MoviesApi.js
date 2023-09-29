class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // проверка статуса запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // регистрация
  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
