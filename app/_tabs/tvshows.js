import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Text, StyleSheet, ScrollView } from "react-native";
import Carousel from "../components/Carousel";
import TVShowCard from "../components/TVShowCard";
import { fetchPopularsTVShow, fetchRecommendedShows } from "../../utils/api";
import { useRouter } from "expo-router";

const Tvshows = () => {
  const router = useRouter();
  const [popularTvshows, setPopularTvshows] = useState([]);
  const [recommendedTvshows, setRecommendedTvshows] = useState([]);
  useEffect(() => {
    const loacalDAta = async () => {
      try {
        const Tvshows = await fetchRecommendedShows();
        setRecommendedTvshows(Tvshows);
        const popTvshows = await fetchPopularsTVShow();
        setPopularTvshows(popTvshows);
      } catch (err) {
        console.log(err);
      }
    };
    loacalDAta();
    return () => {};
  }, []);
  const renderTVShowItem = ({ item }) => (
    <TVShowCard
      show={item}
      onPress={() => router.push(`/detail?tvId=${item.id}`)}
    />
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Popular Tvshows:</Text>
      <Carousel data={popularTvshows} renderItem={renderTVShowItem} />
      <Text style={styles.text}>Recommended Tvshows:</Text>
      <Carousel data={recommendedTvshows} renderItem={renderTVShowItem} />
    </ScrollView>
  );
};

export default Tvshows;

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
