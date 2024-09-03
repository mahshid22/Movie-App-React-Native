//popular movie

//popular TV Show

//Search

//recommended movies

//recommended tv shows

//details

//trailer

//similar movies

import axios from "axios"

const API_KEY = "apikey"

const BASE_URL="https://api.themoviedb.org/3"

const api= axios.create({
    baseURL: BASE_URL,
    params:{
        api_key:API_KEY,
    },
});

//fetching popular movies
export const fetchPopularsMovies= async()=>{
    try{
        const response = await api.get("/movies/popular");
        return response.data
    }catch(error){
        console.error(error);
        throw error
    }
}

//fetching popular tv show
export const fetchPopularsTVShow= async()=>{
    try{
        const response = await api.get("/tv/popular");
        return response.data
    }catch(error){
        console.error(error);
        throw error
    }
}