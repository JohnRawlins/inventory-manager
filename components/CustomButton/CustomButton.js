import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const CustomButton = ({onPress, text, style}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer,style]} onPress={onPress}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "blue",
    borderRadius: 10,
    shadowColor: "rgba(46, 229, 157, 0.4)",
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 13 },
    alignItems:'center'
  },
  text: {
    color: "white",
  },
});

export default CustomButton;
