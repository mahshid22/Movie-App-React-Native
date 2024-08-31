import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Detail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Detail</Text>
    </View>
  );
};

export default Detail;

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
