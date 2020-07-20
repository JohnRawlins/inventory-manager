import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { globalColors } from "../../global/globalStyles";
import * as productDetailActions from "../../redux/actions/productDetailsActions";
import * as barcodeScannerActions from "../../redux/actions/barcodeScannerActions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const NoProductInfoModal = () => {
  const dispatch = useDispatch();

  const productDetailState = useSelector(
    (state) => state.productDetails,
    shallowEqual
  );

  const handleRetry = () => {
    dispatch(productDetailActions.clearProductDetails());
    dispatch(barcodeScannerActions.barcodeScannerActive());
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={productDetailState.productInfoErrorMsg ? true : false}
      onRequestClose={handleRetry}
    >
      <View style={styles.noProductInfoModalContainer}>
        <View style={styles.moodalContainer}>
          <Text style={styles.modalMessage}>
            {productDetailState.productInfoErrorMsg}
          </Text>
          <CustomButton
            style={styles.retryBtn}
            text={"Retry"}
            fontStyling={styles.retryBtnFont}
            onPress={handleRetry}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  noProductInfoModalContainer: {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.85)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  moodalContainer: {
    alignItems: "center",
    backgroundColor: globalColors.white,
    paddingVertical: 60,
    width: "80%",
  },
  retryBtn: {
    backgroundColor: globalColors.primary,
    width: "80%",
  },
  retryBtnFont: {
    color: "white",
    fontWeight: "bold",
  },
  modalMessage: {
    color: globalColors.primary,
    width: "80%",
    fontSize: 20,
    marginBottom: 40,
    textAlign: "center",
  },
});

export default NoProductInfoModal;
