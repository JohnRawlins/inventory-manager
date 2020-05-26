import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { globalColors } from "../../global/globalStyles";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={globalColors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default LoadingSpinner;
