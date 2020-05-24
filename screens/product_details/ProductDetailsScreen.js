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

const ProductDetailsScreen = ({ route }) => {
  const barcode = route.params ? route.params.barcode : "No Product Info";
  return (
    <View style={styles.Container}>
      <View style={styles.firstProductInfoContainer}>
        <TouchableOpacity>
          <SvgImage name={backArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.productImageWrapper}>
          <Image
            source={{
              uri: "https://images.barcodelookup.com/8257/82577760-1.jpg",
            }}
            style={styles.productImage}
          />
        </View>
        <Text numberOfLines={3} style={styles.productName}>
          Funko Pop! Television: Bob Ross - Bob Ross Collectible Figure
        </Text>
        <View style={styles.addToInventoryContainer}>
          <View style={styles.productCodeContainer}>
            <Text style={styles.productCodeHeading}>Product Code:</Text>
            <Text style={styles.productCode}>627100002316</Text>
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
            From the joy of painting, Bob Ross, as a stylized POP vinyl from
            Funko!*Stylized collectable stands 3 Â¾ inches tall, perfect for any
            Bob Ross fan!*Collect and display all television pop!{" "}
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
    borderBottomLeftRadius: 75,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  secondProductInfoContainer: {
    flex: 1,
    backgroundColor: globalColors.primary,
    marginTop: 35,
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

  productCodeContainer: {
    flexDirection: "row",
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
