import React from "react";
import "./GenreFilter.css"
const GenreFilter = ({ genres, setSelectedGenre, selectedGenre }) => {
  return (
    <div className="genre-filter">
      
      <select 
        value={selectedGenre} 
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default GenreFilter;
