import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalColors } from "../../global/globalStyles";
import * as globalSettings from "../../global/globalSettings";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Product from "../../components/Product/Product";
import * as inventoryActions from "../../redux/actions/inventoryActions";
import Toast from "react-native-root-toast";
import { toastOptions } from "../../global/toastOptions";
import packages from "../../assets/packages";
import SvgImage from "../../components/SvgImage/SvgImage";
import CustomModal from "../../components/CustomModal/CustomModal";

const InventoryScreen = () => {
  const dispatch = useDispatch();

  const inventoryState = useSelector((state) => state.inventory, shallowEqual);

  const numberOfProducts =
    inventoryState.products === null ? 0 : inventoryState.products.length;

  const handleRemoveProduct = () => {
    dispatch(
      inventoryActions.removeProductFromInventory(
        inventoryState.inventoryModal.removeProduct.product
      )
    );
  };

  const handleRemoveProductCancel = () => {
    dispatch(
      inventoryActions.setRemoveProductModal({
        visible: false,
        confirmed: false,
        product: null,
      })
    );
  };

  useEffect(() => {
    if (inventoryState.refreshRequired || inventoryState.products === null) {
      dispatch(inventoryActions.getInventory());
    }
  }, [dispatch, inventoryState.refreshRequired, inventoryState.products]);

  useEffect(() => {
    const maxTotal = 9000000000000000;
    const addCommas = (value) => {
      return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    };

    const calculateInventoryTotal = () => {
      let total = inventoryState.products.reduce(
        (accumulator, currentValue) => {
          let productTotal = currentValue.totalValue.unmasked;
          productTotal = productTotal.replace(".", "");
          productTotal = parseInt(productTotal, 10);
          return accumulator + productTotal;
        },
        0
      );
      if (total > Number.MAX_SAFE_INTEGER) {
        total = maxTotal;
      } else {
        total /= 100;
      }
      total = total.toFixed(2);
      total = { unmasked: total, masked: addCommas(total) };
      dispatch(inventoryActions.updateInventoryTotal(total));
    };
    if (inventoryState.refreshRequired === false && inventoryState.products) {
      calculateInventoryTotal();
    }
  }, [dispatch, inventoryState.refreshRequired, inventoryState.products]);

  useEffect(() => {
    const showInventoryActionToast = () => {
      if (inventoryState.inventoryActionMessages.removeProduct) {
        Toast.show(inventoryState.inventoryActionMessages.removeProduct, {
          ...toastOptions,
          onHidden: () => {
            dispatch(
              inventoryActions.clearInventoryActionMessage(
                inventoryState.inventoryActionMessages
              )
            );
          },
        });
      }
    };
    showInventoryActionToast();
  }, [dispatch, inventoryState.inventoryActionMessages.removeProduct]);

  return (
    <View style={styles.container}>
      <CustomModal
        message={globalSettings.removeProductModalMessage}
        visible={inventoryState.inventoryModal.removeProduct.visible}
        onConfirm={handleRemoveProduct}
        onCancel={handleRemoveProductCancel}
      />
      <View style={[styles.header]}>
        <Text style={styles.headerTitle}>{inventoryScreenName}</Text>
        <View style={styles.totalsContainer}>
          <View style={styles.totalCategoryContainer}>
            <View
              style={[
                styles.categoryIconBackground,
                styles.totalQuantityBackground,
              ]}
            >
              <MaterialCommunityIcons
                name="barcode-scan"
                size={15}
                color="#ffca99"
              />
            </View>
            <Text style={styles.totalCateogoryValue}>
              {inventoryState.products ? inventoryState.products.length : 0}
            </Text>
            <Text style={styles.totalCategoryTitle}>Total Quantity</Text>
          </View>
          <View style={styles.totalCategoryContainer}>
            <View
              style={[
                styles.categoryIconBackground,
                styles.totalValueBackground,
              ]}
            >
              <FontAwesome name="money" size={15} color="#8cb4f5" />
            </View>
            <Text style={styles.totalCateogoryValue}>
              ${" "}
              {inventoryState.inventoryTotalValue
                ? inventoryState.inventoryTotalValue.masked
                : 0.0}
            </Text>
            <Text style={styles.totalCategoryTitle}>Total Value</Text>
          </View>
        </View>
      </View>
      {numberOfProducts < 1 ? (
        <View style={styles.emptyInventoryContainer}>
          <SvgImage style={styles.emptyInventoryImage} name={packages} />
          <Text style={styles.emptyInventoryText}>No Products Found</Text>
        </View>
      ) : (
        <FlatList
          style={styles.inventoryListContainer}
          data={inventoryState.products}
          renderItem={({ item }) => {
            return <Product product={item} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: globalColors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  headerTitle: {
    color: globalColors.white,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 25,
  },
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: globalColors.white,
    bottom: -60,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  totalCategoryContainer: {
    alignItems: "center",
  },
  totalCateogoryValue: {
    fontSize: 13,
    marginVertical: 5,
    fontWeight: "bold",
    color: globalColors.primary,
  },
  totalCategoryTitle: {
    fontSize: 12,
  },
  inventoryListContainer: {
    paddingHorizontal: 20,
    marginBottom: 195,
    paddingTop: 10,
  },
  categoryIconBackground: {
    borderRadius: 50,
    padding: 10,
  },
  totalQuantityBackground: {
    backgroundColor: globalColors.accent,
  },
  totalValueBackground: {
    backgroundColor: globalColors.primary,
  },
  emptyInventoryContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyInventoryImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyInventoryText: {
    fontSize: 15,
    fontWeight: "bold",
    color: globalColors.darkGray,
  },
});

export const inventoryScreenName = "Inventory";

export default InventoryScreen;
