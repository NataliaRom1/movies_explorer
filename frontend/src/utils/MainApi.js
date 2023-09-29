// export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://api.movies.nr.nomoreparties.sbs';

// Проверка, всё ли в порядке с ответом
const check = (res) => {
  if (res.ok) {
    // console.log(res)
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
    .then(res => check(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then(res => check(res));
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(res => check(res))
    .then(data => data);
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(res => check(res))
    .then(data => data);
};

// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => check(res))
    .then(data => data);
};

// Отправка отредактированных данных профиля на сервер
export const setUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, email }), //Делаем из объекта строку JSON
  }).then(res => check(res))
}

// Получение сохраненных фильмов пользователя
export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => check(res))
    .then(data => data);
}

// Постановка лайка
export const addLike = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then(res => check(res));
}

// Cнятие лайка 
export const removeLike = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(res => check(res));
};
