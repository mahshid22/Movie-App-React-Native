import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../../context/UserContext";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const User = () => {
  const router = useRouter();
  const {
    userName,
    updateUsername,
    watched,
    setWatched,
    toWatched,
    setToWatched,
  } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    updateUsername(newUsername);
    setIsEditing(false);
  };

  const handleAddToWatched = (item) => {
    setWatched((prev) => [...prev, item]);
    setToWatched((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleAddToToWatch = (item) => {
    setToWatched((prev) => [...prev, item]);
    setWatched((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleRemoveFromWatched = (item) => {
    setWatched((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleRemoveFromToWatch = (item) => {
    setToWatched((prev) => prev.filter((i) => i.id !== item.id));
  };

  const renderItem = (item, listType) => {
    const isWatched = listType === "watched";
    const isToWatch = listType === "toWatch";
    return (
      <View key={item.id}>
        {item.title ? (
          <MovieCard
            movie={item}
            onPress={() => router.push(`/detail?movieId=${item.id}`)}
          />
        ) : (
          <TVShowCard
            show={item}
            onPress={() => router.push(`/detail?tvId=${item.id}`)}
          />
        )}
        <View style={styles.cardActions}>
          {isToWatch && !isWatched && (
            <TouchableOpacity onPress={() => handleAddToWatched(item)}>
              <MaterialIcons name="check-circle" size={24} color={theme === 'dark' ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          )}
          {isWatched && !isToWatch && (
            <TouchableOpacity onPress={() => handleRemoveFromWatched(item)}>
              <MaterialIcons name="remove-circle" size={24} color={theme === 'dark' ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          )}
          {isWatched && !isToWatch && (
            <TouchableOpacity onPress={() => handleAddToToWatch(item)}>
              <MaterialIcons name="remove-circle-outline" size={24} color={theme === 'dark' ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          )}
          {isToWatch && !isWatched && (
            <TouchableOpacity onPress={() => handleRemoveFromToWatch(item)}>
              <MaterialIcons name="check-circle-outline" size={24} color={theme === 'dark' ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from User</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
  },
});
