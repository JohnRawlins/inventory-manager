import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalColors } from "../../global/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Product = ({ product }) => {
  return (
    <TouchableOpacity style={styles.productContainer} key={product.key}>
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri: product.productImage,
          }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {product.productTitle}
        </Text>
        <Text style={styles.productQuantity}>
          Quantity{" "}
          <Text style={styles.quantityValue} numberOfLines={1}>
            50
          </Text>
        </Text>
        <Text style={styles.productPrice}>
          Price{" "}
          <Text style={styles.priceValue} numberOfLines={1}>
            $100
          </Text>
        </Text>
      </View>
      <View style={styles.removeProductContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={globalColors.accent}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    height: 100,
    marginBottom: 20,
    elevation: 1,
    paddingRight: 10,
    backgroundColor: globalColors.white,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  removeProductContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  productImageContainer: {
    width: "25%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
    backgroundColor: globalColors.white,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  productInfoContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 12,
  },
  quantityValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: globalColors.primary,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: globalColors.primary,
  },
});

export default Product;
