import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const C1 = require("../assets/images/c11.png");
const C2 = require("../assets/images/c12.png");

const Obstacles = ({
  color,
  obsLeft,
  obsWidth,
  obsHeight,
  gap,
  randomBottom,
}) => {
  return (
    <>
      <View
        style={{
          position: "absolute",

          width: obsWidth,
          height: obsHeight,
          left: obsLeft,
          bottom: randomBottom + obsHeight + gap,
        }}
      >
        <Image
          source={C1}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>

      <View
        style={{
          position: "absolute",

          width: obsWidth,
          height: obsHeight,
          left: obsLeft,
          bottom: randomBottom,
        }}
      >
        <Image
          source={C2}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>
    </>
  );
};

export default Obstacles;

const styles = StyleSheet.create({});
