import React from "react";
import Moviecard from "./Moviecard";

const MovieList = ({ movies,title }) => {
    return(
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2 text-white pl-2">{title}</h2>
            <div className="flex overflow-x-auto no-scrollbar space-x-2 p-1">
                {movies.length===0?(
                    <p className="text-green-500">Failed fetching movies</p>
                ):(
                    movies.map((movie)=>(
                        <Moviecard key={movie.id} movieData={movie}/>
                    ))
                )}
            </div>
        </div>
    )
}

export default MovieList;