import React from "react";
import {
  Linking,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import priceTagIcon from "./assets/priceTagIcon";
import SvgImage from "../SvgImage/SvgImage";
import { globalColors } from "../../global/globalStyles";

const PriceComparison = ({ name, price, url }) => {
  const handleProductURL = () => {
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.priceComparisonContainer}
      onPress={handleProductURL}
    >
      <View style={styles.iconWrapper}>
        <SvgImage style={styles.priceTagIcon} name={priceTagIcon} />
      </View>
      <View style={styles.priceComparisonDetails}>
        <Text style={styles.productName} numberOfLines={3}>
          {name}
        </Text>
        <Text style={styles.productPrice}> {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  priceComparisonContainer: {
    padding: 10,
    width: 160,
    borderRadius: 15,
    marginRight: 20,
    backgroundColor: globalColors.white,
  },
  iconWrapper: {
    alignItems: "center",
    padding: 15,
  },
  priceTagIcon: {
    width: 50,
    height: 50,
  },
  priceComparisonDetails: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  productName: {
    color: globalColors.primary,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    color: globalColors.primary,
  },
});

export default PriceComparison;
