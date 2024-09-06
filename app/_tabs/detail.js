import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  fetchTVShowDetails,
  fetchMovieDetails,
  fetchShowTrailer,
  fetchMovieTrailer,
  fetchSimilarShows,
  fetchSimilarMovies,
} from "../../utils/api";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";

import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Detail = () => {
  const router = useRouter();
  const { movieId, tvId } = useLocalSearchParams();
  const [details, setDetails] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState(null);
  const {
    userName,
    updateUsername,
    watched,
    setWatched,
    toWatched,
    setToWatched,
  } = useUser();
  isMovie = Boolean(movieId);
  isTv = Boolean(tvId);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (isMovie) {
          console.log("movieeeeeee");
          const movieDetails = await fetchMovieDetails(movieId);
          setDetails(movieDetails);
          const movieTrailerId = await fetchMovieTrailer(movieId);
          setTrailerId(movieTrailerId);
          const similarMovies = await fetchSimilarMovies(movieId);
          setSimilars(similarMovies);
        } else if (isTv) {
          const tvDetails = await fetchTVShowDetails(tvId);
          setDetails(tvDetails);
          const tvTrailerId = await fetchShowTrailer(tvId);
          setTrailerId(tvTrailerId);
          const similarTvShows = await fetchSimilarShows(tvId);
          setSimilars(similarTvShows);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [movieId, tvId]);

  const handleMarkAsWatched = async() => {
    if (details) {
      const newWatched = { ...watched, details };
      setWatched(newWatched)
      await AsyncStorage.setItem("watched",JSON.stringify(newWatched))
    }
  };
  const handleMarkAsToWatched = async() => {
    if (details) {
      const neToWatch = { ...toWatched, details };
      setToWatched(neToWatch)
      await AsyncStorage.setItem("toWatched",JSON.stringify(neToWatch))
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!details) {
    return <Text style={[styles.text]}>No details available</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      {trailerId ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${trailerId}` }}
            style={styles.video}
            javaScriptEnabled
            domStorageEnabled
            allowsInlineMediaPlayback
            onError={(error) => console.log(error)}
          />
        </View>
      ) : (
        <Text>no trailer</Text>
      )}
      <View style={styles.detailsContainer}>
        <Text style={[styles.title]}>{details.title || details.name}</Text>
        <Text style={[styles.sectionTitle]}>Overview</Text>
        <Text style={[styles.text]}>{details.overview}</Text>
        <Text style={[styles.sectionTitle]}>Rating</Text>
        <Text style={[styles.text]}>{details.vote_average}</Text>
        <Text style={[styles.sectionTitle]}>Release Date</Text>
        <Text style={[styles.text]}>
          {details.release_date || details.first_air_date}
        </Text>
        <Text style={[styles.sectionTitle]}>Runtime</Text>
        <Text style={[styles.text]}>
          {details.runtime ? `${details.runtime} minutes` : "N/A"}
        </Text>
        <Text style={[styles.sectionTitle]}>Genres</Text>
        <Text style={[styles.text]}>
          {details.genres?.map((genre) => genre.name).join(", ")}
        </Text>
        <Text style={[styles.sectionTitle]}>Production Companies</Text>
        <Text style={[styles.text]}>
          {details.production_companies
            ?.map((company) => company.name)
            .join(", ") || "N/A"}
        </Text>
        <Text style={[styles.sectionTitle]}>Budget</Text>
        <Text style={[styles.text]}>
          {details.budget ? `$${details.budget.toLocaleString()}` : "N/A"}
        </Text>
        <Text style={[styles.sectionTitle]}>Revenue</Text>
        <Text style={[styles.text]}>
          {details.revenue ? `$${details.revenue.toLocaleString()}` : "N/A"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMarkAsWatched}
        >
          <Text style={styles.buttonText}>mark as watched</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMarkAsToWatched}
        >
          <Text style={styles.buttonText}>mark as To watched</Text>
        </TouchableOpacity>
      </View>
      {!!similars.length && (
        <View style={styles.similarContainer}>
          <Text style={styles.similarTitle}>
            {isMovie ? "similar movies" : "similar tv show"}
          </Text>

          <Carousel
            data={similars}
            renderItem={({ item }) =>
              isMovie ? (
                <MovieCard
                  movie={item}
                  onPress={() => router.push(`/detail?movieId=${item.id}`)}
                />
              ) : (
                <TVShowCard
                  show={item}
                  onPress={() => router.push(`/detail?tvId=${item.id}`)}
                />
              )
            }
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    height: 200,
    marginBottom: 16,
    marginTop: 45,
  },
  video: {
    flex: 1,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  noTrailerText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  buttonContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
    backgroundColor: "gray",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  similarContainer: {
    marginTop: 16,
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
