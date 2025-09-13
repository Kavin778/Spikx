import React from "react";
import MovieList from "../components/MovieList";
import { useState,useEffect } from "react";
import { getTrendingMovies,getTopRatedMovies } from "../api/MoviesService";
import HeroList from "../components/HeroList";

const HomePage = () => {
    const [trendingMovies,setTrendingMovies]=useState([]);
    const [topRatedMovies,setTopRatedMovies]=useState([]);

    useEffect(()=>{
        const fetchMovies = async()=>{
            const trending = await getTrendingMovies();
            const topRated = await getTopRatedMovies();
            setTrendingMovies(trending);
            setTopRatedMovies(topRated);
        }
        fetchMovies();
    },[])
    if(trendingMovies.length===0 && topRatedMovies.length===0){
        return <p className="text-green-500">Loading...</p>
    }
    console.log(trendingMovies);
    return(
        <div className="min-h-screen ml-20 bg-gray-900 p-2">
            <HeroList movieData={trendingMovies}/>
            <MovieList title="Popular Movies" movies={trendingMovies}/>
            <MovieList title="Top Rated Movies" movies={topRatedMovies}/>
        </div>
    )
}

export default HomePage;