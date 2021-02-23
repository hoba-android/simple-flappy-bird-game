import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
const BIRD = require("../assets/images/bird.png");

const Bird = ({ birdBottom, BirdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 50;
  return (
    <View
      style={{
        position: "absolute",
        left: BirdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
        width: birdWidth,
        height: birdHeight,
      }}
    >
      <Image
        source={BIRD}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      />
    </View>
  );
};

export default Bird;

const styles = StyleSheet.create({
  container: {},
});
