import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Button,
} from "react-native";
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

const BG = require("./assets/images/bg.jpg");

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeigth = Dimensions.get("screen").height;
  const gravity = 3;
  const BirdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeigth / 2);
  const [obsLeft, setObstLeft] = useState(screenWidth);
  const [obsLeft2, setObstLeft2] = useState(screenWidth + screenWidth / 2);
  const [obsNegHeight, setObsNegHeight] = useState(0);
  const [obsNegHeight2, setObsNegHeight2] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  obsWidth = 90;
  obsHeight = 300;
  gap = 200;
  let gameTimerId;
  let obstTimerId;
  let obstTimerId2;

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setTimeout(function () {
        setBirdBottom(birdBottom - gravity);
      }, 30);
      return () => clearInterval(gameTimerId);
    }
  }, [birdBottom]);

  useEffect(() => {
    if (obsLeft > -obsWidth) {
      obstTimerId = setTimeout(function () {
        setObstLeft(obsLeft - 5);
      }, 30);
      return () => clearInterval(gameTimerId);
    } else {
      setObstLeft(screenWidth);
      setObsNegHeight(-Math.random() * 100);
      setScore(score + 1);
    }
  }, [obsLeft]);

  useEffect(() => {
    if (obsLeft2 > -obsWidth) {
      obstTimerId2 = setTimeout(function () {
        setObstLeft2(obsLeft2 - 5);
      }, 30);
      return () => clearInterval(obstTimerId2);
    } else {
      setObstLeft2(screenWidth);
      setObsNegHeight2(-Math.random() * 100);
      setScore(score + 1);
    }
  }, [obsLeft2]);

  useEffect(() => {
    if (
      ((birdBottom < obsHeight + obsNegHeight ||
        birdBottom > obsHeight + obsNegHeight + gap + 30) &&
        obsLeft > screenWidth / 2 - 10 &&
        obsLeft < screenWidth / 2 + 10) ||
      ((birdBottom < obsHeight + obsNegHeight2 ||
        birdBottom > obsHeight + obsNegHeight2 + gap + 30) &&
        obsLeft2 > screenWidth / 2 - 10 &&
        obsLeft2 < screenWidth / 2 + 10)
    ) {
      gameOver();
    }
  });

  const jump = () => {
    if (!isGameOver) {
      setBirdBottom(birdBottom + 50);
    }
  };

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstTimerId);
    clearInterval(obstTimerId2);
    setIsGameOver(true);
  };

  const restart = () => {
    setIsGameOver(false);
    setBirdBottom(screenHeigth / 2);
    setObstLeft(screenWidth);
    setObstLeft2(screenWidth + screenWidth / 2);
    setObsNegHeight(0);
    setObsNegHeight2(0);
    setScore(0);
  };

  const restartView = () => {
    return (
      <View>
        <Button title="Restart" onPress={restart} />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Image style={styles.bg} source={BG} />
        <Text style={styles.scoreText}>Score : {score}</Text>

        {isGameOver && restartView()}
        <Bird birdBottom={birdBottom} BirdLeft={BirdLeft} />
        <Obstacles
          color="teal"
          obsHeight={obsHeight}
          obsWidth={obsWidth}
          gap={gap}
          obsLeft={obsLeft}
          randomBottom={obsNegHeight}
        />
        <Obstacles
          color="violet"
          obsHeight={obsHeight}
          obsWidth={obsWidth}
          gap={gap}
          obsLeft={obsLeft2}
          randomBottom={obsNegHeight2}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    position: "absolute",
    top: 20,
    left: 300,
    fontSize: 16,
    fontWeight: "800",
    paddingBottom: 10,
    zIndex: 100,
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
