import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); 
  useEffect(() => {
    console.log("API Key:", API_KEY);

    console.log("Fetching movie with ID:", id);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched movie data:", data);
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setError(error.message); 
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>; 
  if (!movie) return <p>Loading...</p>; 

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
      />
      <p className="overview">{movie.overview || "No overview available."}</p>
      <p className="release-date"><strong>Release Date:</strong> {movie.release_date}</p>
      <p className="rating"><strong>Rating:</strong> {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
