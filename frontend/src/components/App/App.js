import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { errorMessage } from '../../utils/constants';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [info, setInfo] = useState('');

  // Обработчик клика открытия бургера
  function handleBurgerClick() {
    setIsBurgerOpen(true);
  }

  // Обработчик клика по крестику
  function closeBurgerClick() {
    setIsBurgerOpen(false);
  }

  // Проверка токена
  function checkToken() {
    mainApi.checkToken()
      .then((user) => {
        if (user) {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', JSON.stringify(true));
          setCurrentUser(user.data);
        }
      })
      .catch(err => console.log(err));
  }

  // Регистрация
  function handleRegisteration({ name, email, password }) {
    mainApi.register(name, email, password)
      .then(() => {
        setLoggedIn(true);
        handleLogin({ name, email, password });
        navigate('/movies', { replace: true });
        localStorage.setItem('loggedIn', JSON.stringify(true));
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(409)) {
          setInfo('Пользователь уже зарегистрирован');
        } else {
          setInfo('Произошла ошибка при регистрации');
        }
      })
  }

  // Авторизаиця
  function handleLogin({ email, password }) {
    mainApi.authorize(email, password)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser({
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
        })
        navigate('/movies', { replace: true });
        localStorage.setItem('loggedIn', JSON.stringify(true));
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(401)) {
          setInfo('Вы ввели некоректные данные');
        } else {
          setInfo('Произошла ошибка при авторизации');
        }
      })
  }

  // Выход из аккаунта
  function handleSignOut() {
    mainApi.signOut()
      .then(() => {
        setLoggedIn(false);
        setInfo('');
        localStorage.clear();
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  // Обновление данных пользователя
  function handleUpdateUser(data) {
    mainApi.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data.user);
        setInfo('Данные успешно изменены');
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
        if (err.includes(409)) {
          setInfo('Пользователь уже существует');
        } else {
          setInfo('Произошла ошибка при обновлении данных');
        }
      })
  };

  // Обработчик клика по лайку
  function handleAddMovieLike(movie) {
    mainApi.addLike(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setError(errorMessage);
      })
  }

  // Обработчик клика по крестику
  function handleDeleteMovieLike(movie) {
    mainApi.removeLike(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((savedMovie) => movie.movieId !== savedMovie.movieId));
      })
      .catch((err) => {
        console.log(err);
        setError(errorMessage);
      })
  }

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getUserInfo(), moviesApi.getInitialMovies(), mainApi.getSavedMovies()])
        .then(([userData, movies, savedMovies]) => {
          setCurrentUser(userData.data);
          setMovies(movies);
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log('Ошибка: ', err);
          setError(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [loggedIn])

  return (
    <div className="root">
      {/* «Внедряем» данные с помощью провайдера контекста */}
      <CurrentUserContext.Provider value={currentUser}>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  loggedIn={loggedIn}
                  onBurgerClick={handleBurgerClick}
                  isOpen={isBurgerOpen}
                  onClose={closeBurgerClick}
                />
                <Main />
                <Footer />
              </>
            } />

          <Route path="/signup" element={
            loggedIn ? <Navigate to="/movies" replace /> :
              <Register onRegister={handleRegisteration} info={info} setInfo={setInfo} />
          } />

          <Route path="/signin" element={
            loggedIn ? <Navigate to="/movies" replace /> :
              <Login onLogin={handleLogin} info={info} setInfo={setInfo} />
          } />

          <Route path="/profile" element={
            <ProtectedRoute loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}>
              <>
                <Header
                  loggedIn={loggedIn}
                  onBurgerClick={handleBurgerClick}
                  isOpen={isBurgerOpen}
                  onClose={closeBurgerClick}
                />
                <Profile onSignOut={handleSignOut} onUpdateUser={handleUpdateUser} info={info} setInfo={setInfo} />
              </>
            </ProtectedRoute>
          } />

          <Route path="/movies" element={
            <ProtectedRoute loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}>
              <>
                <Header
                  loggedIn={loggedIn}
                  onBurgerClick={handleBurgerClick}
                  isOpen={isBurgerOpen}
                  onClose={closeBurgerClick}

                />
                <Movies
                  movies={movies}
                  savedMovies={savedMovies}
                  onMovieLike={handleAddMovieLike}
                  onMovieDeleteLike={handleDeleteMovieLike}
                  error={error}
                />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}>
              <>
                <Header
                  loggedIn={loggedIn}
                  onBurgerClick={handleBurgerClick}
                  isOpen={isBurgerOpen}
                  onClose={closeBurgerClick}
                />
                <SavedMovies
                  movies={movies}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  onMovieLike={handleAddMovieLike}
                  onMovieDeleteLike={handleDeleteMovieLike}
                  isLoading={isLoading}
                  error={error}
                />
                <Footer />
              </>
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;