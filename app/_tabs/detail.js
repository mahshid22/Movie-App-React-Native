import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  fetchTVShowDetails,
  fetchMovieDetails,
  fetchShowTrailer,
  fetchMovieTrailer,
} from "../../utils/api";
import { WebView } from "react-native-webview";
const Detail = () => {
  const { movieId, tvId } = useLocalSearchParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState(null);
  console.log("🚀 ~ Detail ~ trailerId:", trailerId)
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
        } else if (isTv) {
          const tvDetails = await fetchTVShowDetails(tvId);
          setDetails(tvDetails);
          const tvTrailerId = await fetchShowTrailer(tvId);
          setTrailerId(tvTrailerId);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [movieId, tvId]);

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
    <ScrollView>
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
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
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
