import React from "react";
import Moviecard from "./Moviecard";

const MovieList = ({ movies,title }) => {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold py-4 text-white pl-14">{title}</h2>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex space-x-6 pl-10 pr-4">
            {movies.length === 0 ? (
              <p className="text-green-500">Failed fetching movies</p>
            ) : (
              movies.map(movie => <Moviecard key={movie.id} movieData={movie} />)
            )}
          </div>
        </div>
      </div>
    );
}

export default MovieList;