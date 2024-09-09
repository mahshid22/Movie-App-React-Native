import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import {
  fetchPopularsTVShow,
  fetchPopularsMovies,
  fetchSearchResults,
} from "../../utils/api";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import { useTheme } from '../../context/ThemeContext'; 

const Home = () => {
  const { theme } = useTheme(); 
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loacalDAta = async () => {
      try {
        const movies = await fetchPopularsMovies();
        setPopularMovies(movies);
        const tvShowa = await fetchPopularsTVShow();
        setPopularTvShows(tvShowa);
      } catch (err) {
        console.log(err);
      }
    };
    loacalDAta();
  }, []);

  const handleQueryChange = async (query) => {
    setSearchQuery(query);
    if (query.length) {
      try {
        const searchResult = await fetchSearchResults(query);
        setSuggestions(searchResult);
      } catch (err) {}
    } else {
      setSuggestions([]);
    }
  };

  const handleQuerySubmit = (event) => {
    const query = event.nativeEvent.text.trim();
    if (query.length > 0) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const renderMovieItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push(`/detail?movieId=${item.id}`)}
    />
  );
  const renderTVShowItem = ({ item }) => (
    <TVShowCard
      show={item}
      onPress={() => router.push(`/detail?tvId=${item.id}`)}
    />
  );

  return (
    <ScrollView style={[styles.container,{backgroundColor:theme==='dark'?'#000000':'#FFFFFF'}]}>
      <SearchBar
        query={searchQuery}
        onQueryChange={handleQueryChange}
        onQuerySubmit={handleQuerySubmit}
        suggestions={suggestions}
      />
      <Text style={[styles.text,{color:theme==='dark'?'#FFFFFF':'#000000'}]}>Movies:</Text>
      <Carousel data={popularMovies} renderItem={renderMovieItem} />
      <Text style={[styles.text,{color:theme==='dark'?'#FFFFFF':'#000000'}]}>TV shows:</Text>
      <Carousel data={popularTvShows} renderItem={renderTVShowItem} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "left",
  },
  item: {
    width: Dimensions.get("window").width * 0.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 8,
    height: Dimensions.get("window").width * 0.75,
  },
});
