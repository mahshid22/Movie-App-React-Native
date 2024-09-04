//popular movie

//popular TV Show

//Search

//recommended movies

//recommended tv shows

//details

//trailer

//similar movies

import axios from "axios";

const API_KEY = "0ccd6fe236be70e53344b0810f4b34cb";

const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

//fetching popular movies
export const fetchPopularsMovies = async () => {
  try {
    const response = await api.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//fetching popular tv show
export const fetchPopularsTVShow = async () => {
  try {
    const response = await api.get("/tv/popular");
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//fetching recomended movies
export const fetchRecommendedMovies = async () => {
  try {
    const response = await api.get("/movie/top_rated");
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//fetching recomended tv shows
export const fetchRecommendedShows = async () => {
  try {
    const response = await api.get("/tv/top_rated");
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
