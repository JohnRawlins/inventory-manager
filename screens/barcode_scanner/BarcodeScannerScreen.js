import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Scanner from "../../components/Scanner/Scanner";
import { BarCodeScanner } from "expo-barcode-scanner";
import SvgImage from "../../components/SvgImage/SvgImage";
import noCameraAccess from "./assets/noCameraAccessSvg";
import { globalColors } from "../../global/globalStyles";

const BarcodeScannerScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setPermissionGranted(status === "granted");
      } catch (error) {
        console.log("Error during request for access to camera");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {permissionGranted === null ? (
        <ActivityIndicator size="large" color={globalColors.primary} />
      ) : permissionGranted ? (
        <Scanner />
      ) : (
        <>
          <SvgImage style={styles.noCameraAccessImage} name={noCameraAccess} />
          <Text>Unable To Access Camera</Text>
        </>
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
