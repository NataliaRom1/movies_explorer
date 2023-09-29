import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowSize from '../../hooks/useWindowSize';
import { BIG_SCREEN, AVERAGE_SCREEN, SMALL_SCREEN, MAX_NUMBER_OF_MOVIES_12, MAX_NUMBER_OF_MOVIES_8, MAX_NUMBER_OF_MOVIES_5, ADD_MOVIES_2, ADD_MOVIES_3 } from '../../utils/constants';


function MoviesCardList(props) {
  const { pathname } = useLocation();
  const windowSize = useWindowSize();
  const [maxNumberOfMovies, setMaxNumberOfMovies] = useState();

  function getSavedMovie(savedMovies, movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)
  }

  function handleMoreFilms() {
    if (windowSize > BIG_SCREEN) {
      setMaxNumberOfMovies(maxNumberOfMovies + ADD_MOVIES_3);
    } else {
      setMaxNumberOfMovies(maxNumberOfMovies + ADD_MOVIES_2);
    }
  }

  useEffect(() => {
    if (windowSize > BIG_SCREEN) {
      setMaxNumberOfMovies(MAX_NUMBER_OF_MOVIES_12);
    } else if (windowSize < AVERAGE_SCREEN && windowSize > SMALL_SCREEN) {
      setMaxNumberOfMovies(MAX_NUMBER_OF_MOVIES_8);
    } else {
      setMaxNumberOfMovies(MAX_NUMBER_OF_MOVIES_5);
    }
  }, [windowSize])

  return (
    <div className="card-section">
      <div className="card-list">
        {
          (pathname === "/movies") ?
            props.filteredMovies.slice(0, maxNumberOfMovies).map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                saved={getSavedMovie(props.savedMovies, movie)}
                savedMovies={props.savedMovies}
                onMovieLike={props.onMovieLike}
                onMovieDeleteLike={props.onMovieDeleteLike}
              />
            )) || []
            :
            props.finalFilteredSavedMovies.map((savedMovie) => (
              <MoviesCard
                key={savedMovie._id || savedMovie.movieId}
                movie={savedMovie}
                saved={getSavedMovie(props.savedMovies, savedMovie)}
                savedMovies={props.savedMovies}
                onMovieLike={props.onMovieLike}
                onMovieDeleteLike={props.onMovieDeleteLike}
              />
            )) || []
        }
      </div>
      {
        (pathname === '/movies') ?
          (maxNumberOfMovies < props.filteredMovies.length) ?
            <div className="card-list-container">
              <button className="card-list-container__button button" onClick={handleMoreFilms}>Ещё</button>
            </div>
            :
            ""
          :
          ""
      }
    </div>
  )
}

export default MoviesCardList;
