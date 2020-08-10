import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalColors } from "../../global/globalStyles";

const SummaryCategory = ({ title, value, color }) => {
  return (
    <View style={styles.summaryCategory}>
      <View
        style={[styles.summaryCategoryBar, { backgroundColor: color }]}
      ></View>
      <View style={styles.summaryCategoryContent}>
        <Text style={[styles.summaryTotalValue, { color }]}>{value}</Text>
        <Text style={[styles.summaryCategoryTitle, { color }]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryCategory: {
    flexDirection: "row",
    backgroundColor: globalColors.white,
    overflow: "hidden",
    paddingRight: 15,
    borderRadius: 20,
    width: "28%",
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  summaryCategoryContent: {
    width: "100%",
    justifyContent: "space-between",
  },
  summaryTotalValue: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 12,
  },
  summaryCategoryTitle: {
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
  summaryCategoryBar: {
    width: 5,
    height: "100%",
    backgroundColor: "red",
  },
});

export default SummaryCategory;
