import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorits.css"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(favoriteIds);
  }, []);

  useEffect(() => {
    if (favoriteMovies.length > 0) {
      const fetchMoviesData = async () => {
        const movieDetails = await Promise.all(
          favoriteMovies.map((id) =>
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
              .then((response) => response.json())
              .catch((error) => console.error("Error fetching movie data:", error))
          )
        );
        setMoviesData(movieDetails);
      };

      fetchMoviesData();
    }
  }, [favoriteMovies]);

  const handleRemoveFromFavorites = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((id) => id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Your Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <div className="movie-list">
          {moviesData.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <h3>{movie.title}</h3>
              </Link>
              <button onClick={() => handleRemoveFromFavorites(movie.id)}>
                Remove 
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;