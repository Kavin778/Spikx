import React from "react";
import { ArrowLeftCircleIcon,ArrowRightCircleIcon } from "@heroicons/react/16/solid"
import { useState,useRef,useEffect } from "react"
import { getMovieImages } from "../api/MoviesService";
import HeroBanner from "./HeroBanner";

const HeroList = ({movieData}) =>{
    const [currentIndex,setCurrentIndex]=useState(0);
    const timeoutRef = useRef(null);
    const movies = movieData.slice(0,6);

    const goToPrevious=()=>{
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? movies.length-1: currentIndex-1;
        setCurrentIndex(newIndex);
    }

    const goToNext=()=>{
        const isLastSlide = currentIndex === movies.length-1;
        const newIndex = isLastSlide ?0:currentIndex+1;
        setCurrentIndex(newIndex);
    }
    const goToSlide = (slideIndex)=>{
        setCurrentIndex(slideIndex);
    }

    useEffect(()=>{
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(()=>{
            goToNext();
        },5000);
        return()=>{if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }}
    },[currentIndex,movies.length])

    const currentMovie = movies[currentIndex];   
    return(
        <div>
            <HeroBanner movieData={currentMovie}/>
        </div>
    )
}

export default HeroList;