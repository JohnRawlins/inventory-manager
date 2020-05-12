import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalColors } from "../../global/globalStyles";
import CustomButton from "../CustomButton/CustomButton";
import SvgImage from "../SvgImage/SvgImage";
import scanBox from "../../screens/barcode_scanner/assets/scanBox";
import { useNavigation } from "@react-navigation/native";
import { inventoryScreenName } from "../../screens/inventory/InventoryScreen";

const Scanner = () => {

  const screenDimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={[
          styles.barcodeScanner,
          { width: screenDimensions.width, height: screenDimensions.height },
        ]}
      />
      <View style={styles.barcodeScannerContents}>
        <Text style={[styles.text, styles.heading]}>Scan Barcode</Text>
        <SvgImage name={scanBox} style={styles.scanBox} />
        <Text style={styles.text}>Scanning...</Text>
        <CustomButton
          style={styles.cancelButton}
          text={"Cancel"}
          onPress={() => navigation.navigate(inventoryScreenName)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  barcodeScanner: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  barcodeScannerContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  scanBox: {
    width: 200,
    height: 200,
  },
  barcodeScannerContents: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  heading: {
    fontSize: 25,
  },
  cancelButton: {
    width: "80%",
    backgroundColor: globalColors.primary,
  },
});

export default Scanner;
