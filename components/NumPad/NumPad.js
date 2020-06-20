import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { globalColors } from "../../global/globalStyles";
import numPadValues from "./num-pad-values";
const NumPad = () => {
  const handleNumPadPress = (key) => {};
  const numPadKeys = numPadValues.map((keyValue, index) => {
    if (keyValue === "backspace") {
      return (
        <TouchableOpacity key={index.toString()} style={styles.numPadBackspace}>
          <Ionicons name="md-backspace" size={35} />
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity
          key={index.toString()}
          style={styles.numPadNumberWrapper}
          onPress={() => handleNumPadPress(keyValue)}
        >
          <Text style={styles.numPadNumber}>{keyValue}</Text>
        </TouchableOpacity>
      );
  });

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.container}>
        <View style={styles.numPadContainer}>
          <View style={styles.numPadTitleContainer}>
            <TouchableOpacity>
              <Entypo name="cross" size={30} color={globalColors.accent} />
            </TouchableOpacity>
            <Text style={styles.numPadTitle}>Enter Amount</Text>
            <TouchableOpacity>
              <Ionicons
                name="md-checkmark"
                size={30}
                color={globalColors.accent}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.numPadAmountContainer}>
            <Text style={styles.numPadAmount}>$5.00</Text>
          </View>
          <View style={styles.numPadNumbersContainer}>{numPadKeys}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.40)",
  },
  numPadContainer: {
    backgroundColor: "white",
  },
  numPadTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  numPadTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  numPadAmountContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    padding: 20,
  },
  numPadAmount: {
    fontSize: 35,
  },
  numPadNumbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  numPadNumberWrapper: {
    alignItems: "center",
    width: "33.33%",
    padding: 15,
  },
  numPadNumber: {
    fontSize: 30,
  },
  numPadBackspace: {
    alignItems: "center",
    width: "33.33%",
    padding: 15,
    justifyContent: "center",
  },
});

export default NumPad;
