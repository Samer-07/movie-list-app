import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import GenreFilter from "../GenreFilter/GenreFilter"; 
import "./Home.css";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    fetch(GENRE_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch genres. Check your API key.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.genres) {
          console.log("Fetched genres:", data.genres);
          setGenres(data.genres);
          setLoading(false); 
        } else {
          throw new Error("No genres data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
        setError("Error loading genres. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;

    setLoading(true);
    const MOVIE_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;

    fetch(MOVIE_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies. Check your API key.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          console.log("Movies data:", data.results);
          setMovies(data.results);
        } else {
          throw new Error("No movies found for this genre.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Error loading movies. Please try again later.");
        setLoading(false);
      });
  }, [selectedGenre]);

 
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div> 
        <p>Loading... Please wait.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Movie List</h1>
      
      <GenreFilter genres={genres} setSelectedGenre={setSelectedGenre} />
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found for this genre.</p>
        )}
      </div>
      <div>
      <h1 className="title">Välkommen</h1>
      <h2 className="subtitle">Här du kan hitt dina favoria filmer</h2>
      </div>
    </div>
  );
};

export default Home;
