import React, { useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Scanner from "../../components/Scanner/Scanner";
import SvgImage from "../../components/SvgImage/SvgImage";
import noCameraAccess from "./assets/noCameraAccessSvg";
import { globalColors } from "../../global/globalStyles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as barcodeScannerActions from "../../redux/actions/barcodeScannerActions";

const BarcodeScannerScreen = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.barcodeScanner, shallowEqual);

  useEffect(() => {
    dispatch(barcodeScannerActions.requestCameraPermission());
  }, []);

  if (
    state.loadingBarcodeScanner === false &&
    state.cameraAvailable === false
  ) {
    return (
      <View style={styles.container}>
        <SvgImage style={styles.noCameraAccessImage} name={noCameraAccess} />
        <Text>Unable To Access Camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {state.loadingBarcodeScanner ? (
        <ActivityIndicator size="large" color={globalColors.primary} />
      ) : (
        <Scanner />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  noCameraAccessImage: {
    width: "50%",
    height: "50%",
  },
});

const barcodeScannerScreenName = "Barcode Scanner";

export { barcodeScannerScreenName };

export default BarcodeScannerScreen;
