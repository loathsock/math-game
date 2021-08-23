import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import {
  getRandomArbitrary,
  randomizedOperationFuncs,
  randomizedOperationNumbers,
  shuffleArray,
  operationEval,
  correctAnswer,
  correctAnswerForPlayerOne,
  correctAnswerForPlayerTwo,
  gameOver,
} from "./gameLogic";
import GameOver from "./GameOver";

const GameScreen = () => {
  const [numbers, setNumbers] = useState({});
  const [operationResult, setOperationResult] = useState();
  const [operation, setOperation] = useState();
  const [shuffledArrayChoices, setShuffledArrayChoices] = useState([]);
  const [choices, setChoices] = useState([]);
  const [updateQuestions, setUpdateQuestions] = useState(false);
  const [playerOneCounter, setPlayerOneCounter] = useState(0);
  const [playerTwoCounter, setPlayerTwoCounter] = useState(0);
  const [playerOneWins, setplayerOneWins] = useState(false);
  const [playerTwoWins, setplayerTwoWins] = useState(false);

  const nums = randomizedOperationNumbers();
  const randOp = randomizedOperationFuncs();

  useEffect(() => {
    setShuffledArrayChoices([]);
    // IN CASE LEFT-HAND-SIDE NUMBER IS LESS THAN RIGHT-HAND-SIDE ONLY IN SUBTRACTION
    if (nums.leftHandSideNumber && nums.rightHandSideNumber) {
      if (
        nums.leftHandSideNumber < nums.rightHandSideNumber &&
        randOp === "-"
      ) {
        const leftNum = nums.leftHandSideNumber;
        const rightNum = nums.rightHandSideNumber;
        nums.leftHandSideNumber = rightNum;
        nums.rightHandSideNumber = leftNum;
        setNumbers(nums);
      } else {
        setNumbers(nums);
      }
    }
    setOperation(randOp);
  }, []);

  useEffect(() => {
    if (numbers.leftHandSideNumber && numbers.rightHandSideNumber) {
      const opResult = operationEval(
        numbers.leftHandSideNumber,
        operation,
        numbers.rightHandSideNumber
      );
      setOperationResult(opResult);
      const choiceOne = getRandomArbitrary(opResult, 8);
      const choiceTwo = getRandomArbitrary(8, opResult);

      setChoices([
        opResult,
        choiceOne !== opResult ? choiceOne : getRandomArbitrary(opResult, 15),
        choiceTwo !== opResult ? choiceTwo : getRandomArbitrary(15, opResult),
      ]);
    }
  }, [numbers]);

  useEffect(() => {
    const shuffledArray = shuffleArray(choices);
    setShuffledArrayChoices(shuffledArray);
    console.log(shuffledArrayChoices);
    console.log(choices);
  }, [choices]);

  useEffect(() => {
    setUpdateQuestions(false);
    if (nums.leftHandSideNumber && nums.rightHandSideNumber) {
      if (
        nums.leftHandSideNumber < nums.rightHandSideNumber &&
        randOp === "-"
      ) {
        const leftNum = nums.leftHandSideNumber;
        const rightNum = nums.rightHandSideNumber;
        nums.leftHandSideNumber = rightNum;
        nums.rightHandSideNumber = leftNum;
        setNumbers(nums);
      } else {
        setNumbers(nums);
      }
    }
    setOperation(randOp);
    if (gameOver(playerOneCounter)) {
      console.log(true);
    }
  }, [updateQuestions]);

  return (
    <SafeAreaView
      style={
        playerTwoWins || playerOneWins
          ? styles.gameOverScreen
          : styles.container
      }
    >
      {playerTwoWins && (
        <Text style={{ color: "white" }}> Player Two wins</Text>
      )}
      {playerOneWins && (
        <Text style={{ color: "white" }}> Player One Wins</Text>
      )}
      <View
        style={
          playerTwoWins || playerOneWins
            ? { display: "none" }
            : styles.playerOneContainer
        }
      >
        <View style={gridStyles.playerTwoGrid}>
          <View style={gridStyles.operation}>
            <Text style={{ color: "white", fontSize: 28 }}>
              {" "}
              {numbers.leftHandSideNumber} {""}
              {operation === "*"
                ? "×"
                : [operation === "/" ? "÷" : operation]}{" "}
              {numbers.rightHandSideNumber}
            </Text>
          </View>

          <View style={gridStyles.choiceButtonContainer}>
            {shuffledArrayChoices &&
              shuffledArrayChoices.map((choice) => (
                <TouchableOpacity
                  onPress={() => {
                    if (correctAnswerForPlayerTwo(choice, operationResult)) {
                      setUpdateQuestions(true);
                      setPlayerTwoCounter((prev) =>
                        prev === 1 ? setplayerTwoWins(true) : prev + 1
                      );
                    }
                    if (!correctAnswerForPlayerTwo(choice, operationResult)) {
                      setUpdateQuestions(true);
                      setPlayerTwoCounter((prev) =>
                        playerTwoCounter <= 0 ? (prev = 0) : prev - 1
                      );
                    }
                  }}
                  key={Math.random() * 1500}
                  style={gridStyles.choiceButton}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>
                    {" "}
                    {choice}{" "}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          <View style={gridStyles.counter}>
            <Text style={{ color: "white", fontSize: 18 }}>
              {" "}
              {playerTwoCounter}
            </Text>
          </View>
        </View>
      </View>

      {/* ---------------------   -------------- PLAYER ONE -------------------------------------- */}
      <View
        style={
          playerTwoWins || playerOneWins
            ? { display: "none" }
            : styles.midScreenMenu
        }
      >
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => {
            console.log("press");
          }}
        >
          <FontAwesomeIcon icon={faPause} size={36} color={"white"} />
        </TouchableOpacity>
      </View>

      <View
        style={
          playerTwoWins || playerOneWins
            ? { display: "none" }
            : styles.playerTwoContainer
        }
      >
        <View style={styles.playerOneContainer}>
          <View style={gridStyles.playerOneGrid}>
            <View style={gridStyles.operation}>
              <Text style={{ color: "white", fontSize: 28 }}>
                {" "}
                {numbers.leftHandSideNumber} {""}
                {operation === "*"
                  ? "×"
                  : [operation === "/" ? "÷" : operation]}{" "}
                {numbers.rightHandSideNumber}{" "}
              </Text>
            </View>

            <View style={gridStyles.choiceButtonContainer}>
              {shuffledArrayChoices &&
                shuffledArrayChoices.map((choice) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (correctAnswerForPlayerOne(choice, operationResult)) {
                        setUpdateQuestions(true);
                        setPlayerOneCounter((prev) =>
                          prev === 1 ? setplayerOneWins(true) : prev + 1
                        );
                      }
                      if (!correctAnswerForPlayerOne(choice, operationResult)) {
                        setUpdateQuestions(true);
                        setPlayerOneCounter((prev) =>
                          playerOneCounter <= 0 ? (prev = 0) : prev - 1
                        );
                      }
                    }}
                    key={Math.random() * 1500}
                    style={gridStyles.choiceButton}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {" "}
                      {choice}{" "}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={gridStyles.counter}>
              <Text style={{ color: "white", fontSize: 18 }}>
                {" "}
                {playerOneCounter}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .5)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" && StatusBar.currentHeight,
    height: "10%",
  },
  gameOverContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },

  playerOneContainer: {
    flex: 1,
    backgroundColor: "#14A9B2",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "48%",
    zIndex: -1,
  },

  playerTwoContainer: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "48%",
    zIndex: -1,
  },

  midScreenMenu: {
    position: "relative",
    backgroundColor: "#df5745",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "4%",
  },
  pauseButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: "18%",
    backgroundColor: "orange",
    color: "white",
    borderRadius: 12,
  },
  gameOverScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .8)",
  },
});

const gridStyles = StyleSheet.create({
  playerOneGrid: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: -1,
  },
  playerTwoGrid: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    transform: [{ rotate: "180deg" }],
    backgroundColor: "#14A9B2",
  },

  operation: {
    width: "70%",
    height: 50,
    backgroundColor: "#313f4d",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  choiceButtonContainer: {
    width: "80%",
    height: 60,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  choiceButton: {
    width: 80,
    height: 60,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  counter: {
    width: 80,
    height: 60,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
});

export default GameScreen;
