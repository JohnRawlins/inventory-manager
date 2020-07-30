import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalColors } from "../../global/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { productDetailsScreenName } from "../../screens/product_details/ProductDetailsScreen";
import * as productDetailActions from "../../redux/actions/productDetailsActions";
import * as inventoryActions from "../../redux/actions/inventoryActions";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const productDetailState = useSelector(
    (state) => state.productDetails,
    shallowEqual
  );

  const handleRemoveProduct = () => {
    dispatch(
      inventoryActions.setRemoveProductModal({
        visible: true,
        confirmed: false,
        product,
      })
    );
  };

  const handleProductDetails = () => {
    dispatch(productDetailActions.getProductDetails(product.productCode));
  };

  useEffect(() => {
    if (productDetailState.productInInventory) {
      navigation.navigate(productDetailsScreenName);
    }
  }, [productDetailState.productInInventory, navigation, dispatch]);

  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={handleProductDetails}
      onLongPress={handleRemoveProduct}
    >
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
            {product.quantity.masked}
          </Text>
        </Text>
        <Text style={styles.productPrice}>
          Price{" "}
          <Text style={styles.priceValue} numberOfLines={1}>
            $ {product.price.masked}
          </Text>
        </Text>
        <Text style={styles.productTotal}>
          Total{" "}
          <Text style={styles.totalValue} numberOfLines={1}>
            $ {product.totalValue.masked}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 130,
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
  productImageContainer: {
    width: "25%",
    height: "100%",
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
    paddingHorizontal: 10,
  },
  productTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  productQuantity: {
    fontSize: 12,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    marginBottom: 5,
  },
  productTotal: {
    fontSize: 12,
  },
  quantityValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: globalColors.primary,
  },
  priceValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: globalColors.primary,
  },
  totalValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: globalColors.primary,
  },
});

export default Product;
