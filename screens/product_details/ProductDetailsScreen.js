import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { globalColors } from "../../global/globalStyles";
import SvgImage from "../../components/SvgImage/SvgImage";
import backArrow from "../../assets/backArrow";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useSelector, shallowEqual } from "react-redux";

const ProductDetailsScreen = () => {
  const productDetailState = useSelector(
    (state) => state.productDetails,
    shallowEqual
  );

  if (!productDetailState.productInfoFound) return null;

  return (
    <View style={styles.Container}>
      <View style={styles.firstProductInfoContainer}>
        <TouchableOpacity>
          <SvgImage name={backArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.productImageWrapper}>
          <Image
            source={{
              uri: productDetailState.productImage,
            }}
            style={styles.productImage}
          />
        </View>
        <Text numberOfLines={3} style={styles.productName}>
          {productDetailState.productTitle}
        </Text>
        <View style={styles.addToInventoryContainer}>
          <View style={styles.productCodeContainer}>
            <Text style={styles.productCodeHeading}>Product Code</Text>
            <Text style={styles.productCode}>
              {productDetailState.productCode}
            </Text>
          </View>
          <CustomButton
            style={styles.addToInventoryBtn}
            fontStyling={styles.addToInventoryBtnFont}
            text="Add To Inventory"
          />
        </View>
      </View>
      <ScrollView style={styles.secondProductInfoContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text style={styles.descriptionText}>
            {productDetailState.productDescription}
          </Text>
        </View>
        <View style={styles.quantityAndPriceContainer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityHeader}>Quantity</Text>
            <View style={styles.quantityValueWrapper}>
              <Text style={styles.quantityValue}>10</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceHeader}>Price</Text>
            <View style={styles.priceValueWrapper}>
              <Text style={styles.priceValue}>$25</Text>
            </View>
          </View>
        </View>
        <View style={styles.totalValueContainer}>
          <Text style={styles.totalValueHeading}>Total Value:</Text>
          <Text style={styles.totalValue}>$250</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: globalColors.primary,
  },
  firstProductInfoContainer: {
    height: "50%",
    backgroundColor: "white",
    borderBottomLeftRadius: 45,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 45,
  },
  secondProductInfoContainer: {
    flex: 1,
    backgroundColor: globalColors.primary,
    marginTop: 25,
    paddingHorizontal: 25,
  },
  backArrow: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  productImageWrapper: {
    width: "100%",
    height: "40%",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  productName: {
    width: "60%",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  addToInventoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  productCodeHeading: {
    marginRight: 5,
  },

  productCode: {
    fontWeight: "bold",
  },
  addToInventoryBtn: {
    fontWeight: "bold",
    backgroundColor: globalColors.accent,
  },
  addToInventoryBtnFont: {
    color: "white",
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginBottom: 45,
  },
  descriptionHeading: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  descriptionText: {
    color: "white",
  },

  quantityContainer: {
    width: "30%",
    alignItems: "center",
  },

  quantityAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 35,
  },

  quantityValueWrapper: {
    backgroundColor: globalColors.lightPrimary,
    width: "100%",
    paddingVertical: 45,
    borderRadius: 15,
  },
  quantityHeader: {
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  quantityValue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  priceContainer: {
    width: "30%",
    alignItems: "center",
  },

  priceValueWrapper: {
    backgroundColor: globalColors.lightPrimary,
    width: "100%",
    paddingVertical: 45,
    borderRadius: 15,
  },
  priceHeader: {
    marginBottom: 10,
    color: "white",
    fontWeight: "bold",
  },
  priceValue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  totalValueContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },

  totalValueHeading: {
    marginRight: 5,
    color: "white",
  },

  totalValue: {
    fontWeight: "bold",
    color: "white",
  },
});

export const productDetailsScreenName = "Product Details";

export default ProductDetailsScreen;
