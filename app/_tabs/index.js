import React from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";

sampleData =[
  {
    id:1,
    title: "Star Wars: Episode IV - A New Hope",
    
    poster: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
    Ratings: "8"
  },
  {
    id:2,
    title: "B",
    
    poster: "https://m.media-amazon.com/images/M/MV5BZDhlZmRlNmMtYmMyYy00Zjg0LWI0ZmQtYzNiNWM5YTU4YTI3XkEyXkFqcGdeQXVyNjQ0NjY3MDY@._V1_SX300.jpg",
    Ratings: "8"

  },
  {
    id:3,
    title: "C",
    poster: "https://m.media-amazon.com/images/M/MV5BOTM5Njc5ZTYtYzk1OS00ZmIxLTlkOTAtZmE3MjBiNjQ4MWQyXkEyXkFqcGdeQXVyNjIyNDgwMzM@._V1_SX300.jpg",
    Ratings: "8"

  }
]

const renderMovieItem=({item})=>(
  <MovieCard movie={item}/>
)
const renderTVShowItem=({item})=>(
  <TVShowCard show={item}/>
)
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Homddde</Text>
      <Text style={styles.text}>Movies:</Text>
      <Carousel data={sampleData} renderItem={renderMovieItem}/>
      <Text style={styles.text}>TV shows:</Text>
      <Carousel data={sampleData} renderItem={renderTVShowItem}/>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
  },
  item:{
    width: Dimensions.get("window").width*0.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 8,
    height: Dimensions.get("window").width*0.75
  },
  
});
