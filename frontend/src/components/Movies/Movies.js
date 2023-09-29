import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { notFoundError, SHORT_MOVIE_DURATION } from '../../utils/constants';

function Movies(props) {

  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || ""); //Поисковый запрос
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []); //Отфильтрованные фильмы
  const [isChecked, setIsChecked] = useState(false); //Нажат ли чекбокс
  const [isFiltered, setIsFiltered] = useState(false);

  function handleChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleFilter(searchQuery);
  }

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
    localStorage.setItem('isChecked', JSON.stringify(!isChecked));
  }

  function handleFilter(searchQuery) {
    setIsFiltered(true);
    if (searchQuery) {
      setSearchQuery(searchQuery);
      setFilteredMovies(props.movies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) ||
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())

      }) || []);
    } else {
      setFilteredMovies([]);
    }
  }

  // Итоговый фильтр в зависимости от чекбокса
  const finalFilteredMovies = isChecked
    ? filteredMovies.filter((filteredMovie) => filteredMovie.duration <= SHORT_MOVIE_DURATION)
    : filteredMovies;

  // Сохраняю текст из поискового запроса
  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  }, [searchQuery, filteredMovies]);

  // Вставляю в поиск запрос и фильмы
  useEffect(() => {
    if (localStorage.getItem('searchQuery')) {
      setIsFiltered(true)
      setSearchQuery(localStorage.getItem('searchQuery'));
      setFilteredMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    }
  }, [])

  // Вставляю состояние чекбокса
  useEffect(() => {
    setIsChecked(JSON.parse(localStorage.getItem('isChecked')));
  }, [])

  useEffect(() => {
    handleFilter(searchQuery);
  }, [isChecked])

  return (
    <section className="movies">
      <SearchForm
        searchQuery={searchQuery}
        handleChange={(evt) => handleChange(evt)}
        handleSubmit={(evt) => handleSubmit(evt)}
        handleCheckboxClick={handleCheckboxClick}
        isChecked={!JSON.parse(localStorage.getItem('isChecked'))}
      />

      {props.isLoading && <Preloader />}
      {<p className="movies__error">{props.error}</p>}
      {finalFilteredMovies !== null ?
        finalFilteredMovies.length === 0
          ? !isFiltered && !isChecked
            ? <p className="movies__error"></p>
            : <p className="movies__error">{notFoundError}</p>
          : <MoviesCardList
            movies={props.movies}
            savedMovies={props.savedMovies}
            onMovieLike={props.onMovieLike}
            onMovieDeleteLike={props.onMovieDeleteLike}
            filteredMovies={finalFilteredMovies}
          />
        :
        []
      }
    </section >
  )
}

export default Movies;
