import React from "react";
import { StyleSheet, View, Text } from "react-native";

const BarcodeScannerScreen = () => {
  return (
    <View>
      <Text>Barcode Scanner Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

const barcodeScannerScreenName = "Barcode Scanner";

export { barcodeScannerScreenName };

export default BarcodeScannerScreen;
