import React, { useEffect, useState } from 'react';
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { notFoundError, SHORT_MOVIE_DURATION } from '../../utils/constants';

function SavedMovies(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSavedMovies, setFilteredSavedMovies] = useState(props.savedMovies);
  const [isChecked, setIsChecked] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  function handleChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleFilter();
  }

  function handleFilter() {
    setIsFiltered(!isFiltered);
    if (searchQuery) {
      setSearchQuery(searchQuery);
      setFilteredSavedMovies(props.savedMovies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())) ||
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      }) || []);
    } else {
      setFilteredSavedMovies([]);
    }
  }

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
    if (!isFiltered) {
      setFilteredSavedMovies(props.savedMovies)
    }
  }

  // Итоговый фильтр в зависимости от чекбокса
  const finalFilteredSavedMovies = isChecked
    ? filteredSavedMovies.filter((filteredSavedMovie) => filteredSavedMovie.duration <= SHORT_MOVIE_DURATION)
    : filteredSavedMovies;

  useEffect(() => {
    setFilteredSavedMovies(props.savedMovies)
    setIsChecked(false);
  }, [])

  useEffect(() => {
    if (!searchQuery && !isChecked) {
      setFilteredSavedMovies(props.savedMovies)
    } else if (searchQuery && !isChecked) {
      handleFilter()
    } else {
      handleCheckboxClick()
      handleFilter()
    }
  }, [props.savedMovies])

  return (
    <section className="saved-movies">
      <SearchForm
        searchQuerySave={searchQuery}
        handleChangeSave={(evt) => handleChange(evt)}
        handleSubmitSave={(evt) => handleSubmit(evt)}
        handleCheckboxClickSave={handleCheckboxClick}
        isCheckedSave={isChecked}
      />
      {props.isLoading && <Preloader />}
      {<p className="movies__error">{props.error}</p>}
      {(finalFilteredSavedMovies.length === 0 && isFiltered) || (finalFilteredSavedMovies.length === 0 && isChecked) ?
        <p className="movies__error">{notFoundError}</p>
        :
        <MoviesCardList
          movies={props.movies}
          savedMovies={props.savedMovies}
          onMovieLike={props.onMovieLike}
          onMovieDeleteLike={props.onMovieDeleteLike}
          filteredSavedMovies={filteredSavedMovies}
          finalFilteredSavedMovies={
            (finalFilteredSavedMovies.length === 0 && filteredSavedMovies.length === 0)
              ? props.savedMovies
              : finalFilteredSavedMovies
          }
        />
      }
    </section>
  )
}

export default SavedMovies;
