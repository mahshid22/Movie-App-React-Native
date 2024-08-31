import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Homddde</Text>
    </View>
  );
};

export default Home;

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
