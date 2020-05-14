import React, { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalColors } from "../../global/globalStyles";
import CustomButton from "../CustomButton/CustomButton";
import SvgImage from "../SvgImage/SvgImage";
import scanBox from "../../screens/barcode_scanner/assets/scanBox";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { inventoryScreenName } from "../../screens/inventory/InventoryScreen";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as barcodeScannerActions from "../../redux/actions/barcodeScannerActions";

const Scanner = () => {
  const screenDimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };

  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const state = useSelector((state) => state.barcodeScanner, shallowEqual);

  const handleBarcodeScanned = ({ data: barcode }) => {
    navigation.navigate("Inventory");
    dispatch(barcodeScannerActions.barcodeScanned());
  };

  const handleCancelButton = () => {
    dispatch(barcodeScannerActions.barcodeScannerOff());
    navigation.navigate(inventoryScreenName);
  }

  useEffect(() => {
    if (
      isFocused &&
      state.isScanning === false &&
      state.cameraAvailable === true
    ) {
      dispatch(barcodeScannerActions.barcodeScannerActive());
    }
  }, [isFocused, state.isScanning, state.cameraAvailable, dispatch]);

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={[
          styles.barcodeScanner,
          { width: screenDimensions.width, height: screenDimensions.height },
        ]}
        onBarCodeScanned={state.isScanning ? handleBarcodeScanned : undefined}
      />
      <View style={styles.barcodeScannerContent}>
        <Text style={[styles.text, styles.heading]}>Scan Barcode</Text>
        <SvgImage name={scanBox} style={styles.scanBox} />
        <Text style={styles.text}>Scanning...</Text>
        <CustomButton
          style={styles.cancelButton}
          text={"Cancel"}
          onPress={handleCancelButton}
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
  barcodeScannerContent: {
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
