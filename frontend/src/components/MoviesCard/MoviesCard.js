import React, { useEffect, useState } from 'react';
import './MoviesCard.css'
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  function handleClick(e) {
    e.preventDefault();
    setIsLiked(!isLiked);
    if (props.saved) {
      props.onMovieDeleteLike(props.savedMovies.filter((savedMovie) => savedMovie.movieId === props.movie.id)[0]);
    } else {
      handleMovieLike();
    }
  }

  function handleMovieLike() {
    props.onMovieLike(props.movie);
  }

  function handleMovieDelete() {
    console.log(props.movie)
    props.onMovieDeleteLike(props.movie);
  }

  const src = props.movie.image.formats
    ? `https://api.nomoreparties.co/${props.movie.image.url}`
    : props.movie.image;

  const durationHour = Math.round(props.movie.duration / 60);
  const durationSec = props.movie.duration % 60;

  const cardLikeStatus = props.saved
    ? "card__like_active card__like button"
    : "card__like_disable card__like button"

  return (
    <article className="card">
      <a href={props.movie.trailerLink} target="_blank" >
        <img src={src} alt="Постер" className="card__img" />
      </a>
      <div className="card__container">
        <div className="card__description">
          <h2 className="card__heading">{props.movie.nameRU}</h2>
          {
            (pathname === "/saved-movies")
              ?
              <button className="card__delete button" type="submit" onClick={handleMovieDelete}></button>
              :
              <button className={cardLikeStatus} type="submit" onClick={(e) => handleClick(e)}></button>
          }
        </div>
        <p className="card__duration">{`${durationHour === 0 ? '' : durationHour + 'ч'} ${durationSec} мин `}</p>
      </div>
    </article>
  )
}

export default MoviesCard;
