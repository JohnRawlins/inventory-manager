import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, style, fontStyling }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <View>
        <Text style={fontStyling}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default CustomButton;
