import React from "react";
import { View, Text } from "react-native";

const ProductDetailsScreen = ({ route }) => {
  const barcode = route.params ? route.params.barcode : "No Product Info";
  return (
    <View>
      <Text>{barcode}</Text>
    </View>
  );
};

export const productDetailsScreenName = "Product Details";

export default ProductDetailsScreen;
