import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const TVShowCard = ({ show, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={styles.shadowContainer}>
        <Card>
          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${show.poster_path}`,
            }}
            style={styles.cover}
          />
          <Card.Content style={styles.content}>
            <Title style={[styles.title, { color: "red" }]}>{show.name}</Title>
            <Paragraph
              style={[
                styles.paragraph,
                { color: theme === "dark" ? "#B0B0B0" : "grey" },
              ]}
            >
              Rating: {show.vote_average}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150, // Fixed width
    margin: 8,
  },
  shadowContainer: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3, // Adjust shadow elevation
  },
  card: {
    flex: 1,
    borderRadius: 8,
    width: 150, // Fixed width
    height: 200, // Fixed height
  },
  cover: {
    width: "100%",
    height: 150, // Fixed height for the cover
  },
  content: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Centered text
  },
  paragraph: {
    fontSize: 14,
    textAlign: "center", // Centered text
  },
});

export default TVShowCard;
