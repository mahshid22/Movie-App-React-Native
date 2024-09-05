import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View, Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const MovieCard = ({ movie, onPress }) => {
  const { theme } = useTheme(); // Access the current theme

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={styles.shadowContainer}>
        <Card>
          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }}
            style={styles.cover}
          />
          <Card.Content style={styles.content}>
            <Title style={[styles.title, { color: "red" }]}>
              {movie.original_title}
            </Title>
            <Paragraph
              style={[
                styles.paragraph,
                { color: theme === "dark" ? "#B0B0B0" : "grey" },
              ]}
            >
              Rating: {movie.vote_average}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    margin: 8,
  },
  shadowContainer: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    width: 150,
    height: 200,
  },
  cover: {
    width: "100%",
    height: 150,
  },
  content: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default MovieCard;
