import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NumPad from "../../components/NumPad/NumPad";
import { NumPadMode } from "../../components/NumPad/num-pad-values";
import * as productDetailActions from "../../redux/actions/productDetailsActions";
import { globalColors } from "../../global/globalStyles";
import SvgImage from "../../components/SvgImage/SvgImage";
import backArrow from "../../assets/backArrow";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useWindowDimensions } from "react-native";
import { toastOptions } from "../../global/toastOptions";
import Toast from "react-native-root-toast";

const ProductDetailsScreen = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height * 0.5;

  const dispatch = useDispatch();

  const productDetailState = useSelector(
    (state) => state.productDetails,
    shallowEqual
  );

  const handleStockNumPad = () => {
    dispatch(productDetailActions.openNumPad(NumPadMode.STOCK));
  };

  const handleMoneyNumPad = () => {
    dispatch(productDetailActions.openNumPad(NumPadMode.MONEY));
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleAddProduct = () => {
    dispatch(productDetailActions.addProductToInventory(productDetailState));
  };

  const showAddProductToast = () => {
    Toast.show(productDetailState.inventoryActionMessage, {
      ...toastOptions,
      onHidden: () => {
        dispatch(productDetailActions.clearInventoryActionMessage());
      },
    });
  };

  const addCommas = (value) => {
    return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  };

  const removeDecimal = (value) => {
    if (value.includes(".")) {
      return value.replace(".", "");
    } else {
      return value + "00";
    }
  };

  const calculateTotalValue = () => {
    const maxValue = addCommas(Number.MAX_SAFE_INTEGER.toString());
    let { quantity, price } = productDetailState;
    if (quantity && price) {
      quantity = Number.parseInt(quantity.unmasked, 10);
      price = Number.parseInt(removeDecimal(price.unmasked));
      let totalValue = quantity * price;
      if (!Number.isSafeInteger(totalValue)) {
        Toast.show(
          `Total Value has reached limit of $${maxValue}`,
          toastOptions
        );
        dispatch(productDetailActions.setTotalValue(null));
        return;
      }
      totalValue /= 100;
      totalValue = totalValue.toFixed(2);
      let monetaryValue = totalValue.split(".");
      let dollars = monetaryValue[0];
      let cents = monetaryValue[1];
      dollars = addCommas(dollars);
      monetaryValue = `${dollars}.${cents}`;
      dispatch(
        productDetailActions.setTotalValue({
          masked: monetaryValue,
          unmasked: totalValue,
        })
      );
    } else {
      dispatch(productDetailActions.setTotalValue(null));
    }
  };

  useEffect(() => {
    calculateTotalValue();
  }, [productDetailState.price, productDetailState.quantity]);

  if (productDetailState.inventoryActionMessage) {
    showAddProductToast();
  }

  return (
    <ScrollView style={styles.Container}>
      <NumPad />
      <View
        style={[styles.firstProductInfoContainer, { height: windowHeight }]}
      >
        <TouchableOpacity onPress={handleBackButton}>
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
            onPress={handleAddProduct}
          />
        </View>
      </View>
      <View style={styles.secondProductInfoContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text style={styles.descriptionText}>
            {productDetailState.productDescription}
          </Text>
        </View>
        <View style={styles.quantityAndPriceContainer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityHeader}>Quantity</Text>
            <TouchableOpacity
              style={styles.quantityValueWrapper}
              onPress={handleStockNumPad}
            >
              <Text style={styles.quantityValue}>
                {productDetailState.quantity
                  ? productDetailState.quantity.masked
                  : "0"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceHeader}>Price</Text>
            <TouchableOpacity
              style={styles.priceValueWrapper}
              onPress={handleMoneyNumPad}
            >
              <Text style={styles.priceValue}>
                <Text style={styles.priceDollarSign}>$</Text>
                {productDetailState.price
                  ? productDetailState.price.masked
                  : "0.00"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.totalValueContainer}>
          <Text style={styles.totalValueHeading}>Total Value:</Text>
          <Text style={styles.totalValue}>
            $
            {productDetailState.totalValue
              ? productDetailState.totalValue.masked
              : "0.00"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: globalColors.primary,
  },
  firstProductInfoContainer: {
    backgroundColor: globalColors.white,
    borderBottomLeftRadius: 45,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 45,
  },
  secondProductInfoContainer: {
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
    width: "45%",
    alignItems: "center",
  },

  quantityAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  quantityValueWrapper: {
    backgroundColor: globalColors.lightPrimary,
    width: "100%",
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 10,
    overflow: "hidden",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    width: "45%",
    alignItems: "center",
  },

  priceValueWrapper: {
    backgroundColor: globalColors.lightPrimary,
    width: "100%",
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    paddingRight: 10,
  },
  priceDollarSign: {
    letterSpacing: 10,
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
