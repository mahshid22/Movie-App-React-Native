import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import { fetchRecommendedMovies, fetchPopularsMovies } from "../../utils/api";
import { useRouter } from "expo-router";

const Movies = () => {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  useEffect(() => {
    const loacalDAta = async () => {
      try {
        const movies = await fetchRecommendedMovies();
        setRecommendedMovies(movies);
        const popMovies = await fetchPopularsMovies();
        setPopularMovies(popMovies);
      } catch (err) {
        console.log(err);
      }
    };
    loacalDAta();
    return () => {};
  }, []);
  const renderMovieItem = ({ item }) => <MovieCard movie={item}       onPress={() => router.push(`/detail?movieId= ${item.id}`)}
  />;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Popular Movies:</Text>
      <Carousel data={popularMovies} renderItem={renderMovieItem} />
      <Text style={styles.text}>Recommended Movies:</Text>
      <Carousel data={recommendedMovies} renderItem={renderMovieItem} />
    </ScrollView>
  );
};

export default Movies;

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
