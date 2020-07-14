import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { globalColors } from "../../global/globalStyles";
import numPadValues from "./num-pad-values";
import { NumPadMode } from "../NumPad/num-pad-values";
import * as productDetailActions from "../../redux/actions/productDetailsActions";
import * as Haptics from "expo-haptics";

const NumPad = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState({
    masked: "",
    unmasked: "",
  });

  const productDetailsState = useSelector(
    (state) => state.productDetails,
    shallowEqual
  );

  const addCommas = (value) => {
    return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  };

  const handleInputErrorHapticFeedback = () => {
    Haptics.selectionAsync();
  };

  const maskValue = (value) => {
    if (productDetailsState.numPad.mode === NumPadMode.MONEY) {
      let money = value.split(".");
      let centsValue = "";
      let dollarsValue = "";

      if (money) {
        if (money.length === 1) {
          dollarsValue = money[0];
        } else if (money.length === 2) {
          dollarsValue = money[0];
          centsValue = money[1];
        }
      }
      let maskedDollarValue = addCommas(dollarsValue);
      if (value.includes(".")) {
        return `${maskedDollarValue}.${centsValue}`;
      } else {
        return `${maskedDollarValue}`;
      }
    } else {
      return addCommas(value);
    }
  };

  const maxCentsReached = (value) => {
    let cents = value.split(".");

    if (cents) {
      if (cents.length > 1) {
        let centsValue = cents[1];
        return centsValue.length > 2 ? true : false;
      }
    }
  };

  const removeDigit = (value) => {
    let updatedValue = value.split("");
    updatedValue.pop();
    updatedValue = updatedValue.join("");
    return updatedValue;
  };

  const formatAmount = async (keyPressed) => {
    const { unmasked: unmaskedValue, masked: maskedValue } = amount;
    let updatedUnmaskedValue = "";
    let updatedMaskedValue = "";

    if (keyPressed === "backspace" && unmaskedValue === "") {
      handleInputErrorHapticFeedback();
      return;
    }

    if (productDetailsState.numPad.mode === NumPadMode.MONEY) {
      if (
        (unmaskedValue.includes(".") && keyPressed === ".") ||
        (keyPressed === "." && unmaskedValue === "")
      ) {
        handleInputErrorHapticFeedback();
        return;
      }

      if (unmaskedValue === "0" && keyPressed !== "backspace") {
        keyPressed = `.${keyPressed === "." ? "" : keyPressed}`;
      }

      if (keyPressed === "backspace") {
        updatedUnmaskedValue =
          maskedValue === "0" ? "" : removeDigit(unmaskedValue);
      } else {
        updatedUnmaskedValue += unmaskedValue + keyPressed;
      }

      if (keyPressed === "0" && unmaskedValue.length < 1) {
        updatedUnmaskedValue += ".";
      }

      if (maxCentsReached(updatedUnmaskedValue)) {
        handleInputErrorHapticFeedback();
        return;
      }

      updatedMaskedValue = maskValue(updatedUnmaskedValue);
    } else {
      if (keyPressed === ".") {
        handleInputErrorHapticFeedback();
        return;
      }

      if (unmaskedValue === "0" && keyPressed !== "backspace") {
        handleInputErrorHapticFeedback();
        return;
      }

      if (keyPressed === "backspace") {
        updatedUnmaskedValue = removeDigit(unmaskedValue);
      } else {
        updatedUnmaskedValue = unmaskedValue + keyPressed;
      }

      updatedMaskedValue = maskValue(updatedUnmaskedValue);
    }

    setAmount({
      ...amount,
      masked: updatedMaskedValue,
      unmasked: updatedUnmaskedValue,
    });
  };

  const handleNumPadPress = (keyPressed) => {
    formatAmount(keyPressed);
  };

  const handleCancelRequest = () => {
    setAmount({
      masked: "",
      unmasked: "",
    });
    dispatch(productDetailActions.closeNumPad());
  };

  const handleSubmitRequest = () => {
    let cents = "";
    let numPadAmount = { ...amount };
    if (amount.unmasked === "") {
      numPadAmount = null;
    }

    if (amount.unmasked.charAt(amount.unmasked.length - 1) === ".") {
      numPadAmount.unmasked = amount.unmasked.split(".")[0];
      numPadAmount.masked = amount.masked.split(".")[0];
    }

    let dollarsAndCents = numPadAmount.unmasked.split(".");

    if (dollarsAndCents.length > 1) {
      cents = dollarsAndCents[1];
    }

    if (cents.length === 1) {
      numPadAmount.unmasked += "0";
      numPadAmount.masked += "0";
    }

    if (productDetailsState.numPad.mode === NumPadMode.STOCK) {
      dispatch(productDetailActions.setQuantity(numPadAmount));
      setAmount({
        masked: "",
        unmasked: "",
      });
    } else if (productDetailsState.numPad.mode === NumPadMode.MONEY) {
      dispatch(productDetailActions.setPrice(numPadAmount));
      setAmount({
        masked: "",
        unmasked: "",
      });
    }
  };

  const numPadKeys = numPadValues.map((keyValue, index) => {
    if (keyValue === "backspace") {
      return (
        <TouchableOpacity
          key={index.toString()}
          style={styles.numPadBackspace}
          onPress={() => handleNumPadPress(keyValue)}
        >
          <Ionicons name="md-backspace" size={35} />
        </TouchableOpacity>
      );
    } else
      return (
        <TouchableOpacity
          key={index.toString()}
          style={styles.numPadNumberWrapper}
          onPress={() => handleNumPadPress(keyValue)}
        >
          <Text style={styles.numPadNumber}>{keyValue}</Text>
        </TouchableOpacity>
      );
  });

  useEffect(() => {
    if (
      productDetailsState.quantity &&
      productDetailsState.numPad.mode === NumPadMode.STOCK
    ) {
      setAmount(productDetailsState.quantity);
    } else if (
      productDetailsState.price &&
      productDetailsState.numPad.mode === NumPadMode.MONEY
    ) {
      setAmount(productDetailsState.price);
    }
  }, [productDetailsState.numPad.visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={productDetailsState.numPad.visible}
    >
      <View style={styles.container}>
        <View style={styles.numPadContainer}>
          <View style={styles.numPadTitleContainer}>
            <TouchableOpacity onPress={handleCancelRequest}>
              <Entypo name="cross" size={30} color={globalColors.accent} />
            </TouchableOpacity>
            <Text style={styles.numPadTitle}>Enter Amount</Text>
            <TouchableOpacity onPress={handleSubmitRequest}>
              <Ionicons
                name="md-checkmark"
                size={30}
                color={globalColors.accent}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.numPadAmountContainer}>
            <Text style={styles.numPadAmount}>{amount.masked}</Text>
          </View>
          <View style={styles.numPadNumbersContainer}>{numPadKeys}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.40)",
  },
  numPadContainer: {
    backgroundColor: "white",
  },
  numPadTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  numPadTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  numPadAmountContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    padding: 20,
  },
  numPadAmount: {
    fontSize: 35,
  },
  numPadNumbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  numPadNumberWrapper: {
    alignItems: "center",
    width: "33.33%",
    padding: 15,
  },
  numPadNumber: {
    fontSize: 30,
  },
  numPadBackspace: {
    alignItems: "center",
    width: "33.33%",
    padding: 15,
    justifyContent: "center",
  },
});

export default NumPad;
