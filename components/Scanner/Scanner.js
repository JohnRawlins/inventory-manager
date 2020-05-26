import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalColors } from "../../global/globalStyles";
import CustomButton from "../CustomButton/CustomButton";
import SvgImage from "../SvgImage/SvgImage";
import scanBox from "../../screens/barcode_scanner/assets/scanBox";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { inventoryScreenName } from "../../screens/inventory/InventoryScreen";
import { productDetailsScreenName } from "../../screens/product_details/ProductDetailsScreen";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as barcodeScannerActions from "../../redux/actions/barcodeScannerActions";
import * as productDetailActions from "../../redux/actions/productDetailsActions";
import NoProductInfoModal from "../NoProductInfoModal/NoProductInfoModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Scanner = () => {
  const screenDimensions = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const barcodeScannerState = useSelector(
    (state) => state.barcodeScanner,
    shallowEqual
  );

  const productDetailState = useSelector(
    (state) => state.productDetails,
    shallowEqual
  );

  const handleBarcodeScanned = ({ data: barcode }) => {
    dispatch(productDetailActions.getProductDetails(barcode));
    dispatch(barcodeScannerActions.barcodeScanned());
  };

  const handleCancelButton = () => {
    navigation.navigate(inventoryScreenName);
  };

  useFocusEffect(
    useCallback(() => {
      if (barcodeScannerState.cameraAvailable) {
        dispatch(productDetailActions.clearProductDetails());
        dispatch(barcodeScannerActions.barcodeScannerActive());
        return () => {
          dispatch(barcodeScannerActions.barcodeScannerOff());
        };
      }
    }, [dispatch, barcodeScannerState.cameraAvailable])
  );

  useEffect(() => {
    if (productDetailState.productInfoFound) {
      navigation.navigate(productDetailsScreenName, {
        barcode: productDetailState.productCode,
      });
    }
  }, [
    productDetailState.productInfoErrorMsg,
    productDetailState.productInfoFound,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      {productDetailState.productInfoErrorMsg !== "" && <NoProductInfoModal />}
      <BarCodeScanner
        style={[
          styles.barcodeScanner,
          {
            width: screenDimensions.width,
            height: screenDimensions.height,
          },
        ]}
        onBarCodeScanned={
          barcodeScannerState.isScanning ? handleBarcodeScanned : undefined
        }
      />
      <View style={styles.barcodeScannerContent}>
        <Text style={[styles.text, styles.heading]}>Scan Barcode</Text>
        <SvgImage name={scanBox} style={styles.scanBox} />
        <Text style={styles.text}>Scanning...</Text>
        <CustomButton
          style={styles.cancelButton}
          text={"Cancel"}
          onPress={handleCancelButton}
          fontStyling={{ color: "white" }}
        />
      </View>
      {productDetailState.loadingProduct ? <LoadingSpinner /> : null}
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
