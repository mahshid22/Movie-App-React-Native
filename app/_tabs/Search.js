import React, {useState,useEffect } from "react";

import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import {
  fetchSearchResults,
  fetchSimilarShows,
  fetchSimilarMovies,
} from "../../utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

const SearchScreen = () => {
  const { query } = useLocalSearchParams();
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]);
  const [details, setDetails] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const searchMoveOrShows = async () => {
      try {
        const results = await fetchSearchResults(query);
        setSearchResult(results);
        if (results.length > 0) {
          const firstItem = results[0];
          const isMovie = !!firstItem.title;
          setItemType(isMovie ? "movie" : "tv");
          if (isMovie) {
            const similarMovie = await fetchSimilarMovies(firstItem.id);
            setSimilar(similarMovie);
          } else {
            const similarTv = await fetchSimilarShows(firstItem.id);
            setSimilar(similarTv);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    searchMoveOrShows();
  }, [query]);

  const renderSearchResultItem = ({item}) => {
    const isMovie = !!item.title;
    return isMovie ? (
      <MovieCard
        movie={item}
        onPress={() => router.push(`/detail?movieId=${item.id}`)}
      />
    ) : (
      <TVShowCard
        show={item}
        onPress={() => router.push(`/detail?tvShowId=${item.id}`)}
      />
    );
  };
  const renderSimilarItems = ({ item }) => {
    return itemType === "movie" ? (
      <MovieCard
        movie={item}
        onPress={() => router.push(`/detail?movieId=${item.id}`)}
      />
    ) : (
      <TVShowCard
        show={item}
        onPress={() => router.push(`/detail?tvShowId=${item.id}`)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Search result for "{query}"</Text>
      <Carousel data={searchResult} renderItem={renderSearchResultItem} />
      {similar.length > 0 && (
        <>
          <Text style={styles.headerText}>similar items for "{query}"</Text>
          <Carousel data={similar} renderItem={renderSimilarItems} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left'
  },
});
export default SearchScreen;
