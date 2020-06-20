import React from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { globalColors } from "../../global/globalStyles";
import { color } from "react-native-reanimated";
const Numpad = () => {
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
          <View style={styles.numPadNumbersContainer}>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.numPadNumberWrapper}>
              <Text style={styles.numPadNumber}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.numPadNumberWrapper,
                { justifyContent: "flex-end" },
              ]}
            >
              <Ionicons name="md-backspace" size={35} />
            </TouchableOpacity>
          </View>
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
    borderColor: '#e0e0e0'
  },
  numPadTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  numPadAmountContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
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
});

export default Numpad;
