import React from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../components/Carousel";
sampleData = [
  { id: 1, title: "test" },
  { id: 2, title: "test" },
  { id: 3, title: "test" },
];

const renderItem=({item})=>(
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
)
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Homddde</Text>
      <Carousel data={sampleData} renderItem={renderItem}/>
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
  item:{
    width: Dimensions.get("window").width*0.75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 8,
    height: Dimensions.get("window").width*0.75
  },
  
});
