import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./moviecard.css";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = favoriteMovies.filter((id) => id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favoriteMovies.push(movie.id);
      localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
      </Link>
      <button
        className={isFavorite ? "favorite-active" : ""}
        onClick={handleFavorite}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;