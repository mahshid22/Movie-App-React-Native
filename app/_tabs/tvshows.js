import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Tvshows = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Tvshows</Text>
    </View>
  );
};

export default Tvshows;

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
