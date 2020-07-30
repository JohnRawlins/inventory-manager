import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { globalColors } from "../../global/globalStyles";

const CustomModal = ({ message, visible, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          <Text style={styles.modalMessage}>{message}</Text>
          <CustomButton
            style={styles.confirmButton}
            fontStyling={styles.confirmButtonFont}
            text="Yes"
            onPress={onConfirm}
          />
          <CustomButton
            style={styles.cancelButton}
            fontStyling={styles.cancelButtonFont}
            text="Cancel"
            onPress={onCancel}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "rgba(0,0,0,0.80)",
  },
  modalContentContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: globalColors.white,
  },
  modalMessage: {
    fontSize: 24,
    color: globalColors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: globalColors.accent,
    marginBottom: 20,
  },
  confirmButtonFont: {
    fontSize: 22,
    fontWeight: "bold",
    color: globalColors.white,
  },
  cancelButtonFont: {
    color: globalColors.primary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default CustomModal;
