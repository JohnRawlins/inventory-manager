import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalColors } from "../../global/globalStyles";
import * as globalSettings from "../../global/globalSettings";
import Product from "../../components/Product/Product";
import * as inventoryActions from "../../redux/actions/inventoryActions";
import Toast from "react-native-root-toast";
import { toastOptions } from "../../global/toastOptions";
import packages from "../../assets/packages";
import SvgImage from "../../components/SvgImage/SvgImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomModal from "../../components/CustomModal/CustomModal";
import SummaryCategory from "../../components/SummaryCategory/SummaryCategory";
import { TouchableOpacity } from "react-native-gesture-handler";
import { searchScreenName } from "../search/SearchScreen";

const InventoryScreen = ({ navigation }) => {
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
      let inventoryTotals = inventoryState.products.reduce(
        (accumulator, currentValue) => {
          let productTotalValue = currentValue.totalValue.unmasked;
          let productQuantityTotal = currentValue.quantity.unmasked;

          productQuantityTotal = parseInt(productQuantityTotal, 10);
          productQuantityTotal += accumulator.totalQty;

          productTotalValue = productTotalValue.replace(".", "");
          productTotalValue = parseInt(productTotalValue, 10);
          productTotalValue += accumulator.totalValue;

          return {
            totalValue: productTotalValue,
            totalQty: productQuantityTotal,
          };
        },
        { totalValue: 0, totalQty: 0 }
      );
      if (inventoryTotals.totalValue > Number.MAX_SAFE_INTEGER) {
        inventoryTotals.totalValue = maxTotal;
      } else {
        inventoryTotals.totalValue /= 100;
      }
      inventoryTotals.totalValue = inventoryTotals.totalValue.toFixed(2);
      inventoryTotals.totalValue = {
        unmasked: inventoryTotals.totalValue,
        masked: addCommas(inventoryTotals.totalValue),
      };
      dispatch(inventoryActions.updateInventoryTotal(inventoryTotals));
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
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.inventorySummaryContainer}>
          <Text style={styles.inventorySummaryTitle}>Inventory Summary</Text>
          <View style={styles.summaryCategoriesContainer}>
            <SummaryCategory
              title="Value"
              value={
                inventoryState.inventoryTotals
                  ? inventoryState.inventoryTotals.totalValue.masked
                  : 0.0
              }
              color={globalColors.darkGray}
            />
            <SummaryCategory
              title="Qty"
              value={
                inventoryState.inventoryTotals
                  ? inventoryState.inventoryTotals.totalQty
                  : 0
              }
              color={globalColors.accent}
            />
            <SummaryCategory
              title="Products"
              value={
                inventoryState.products ? inventoryState.products.length : 0
              }
              color={globalColors.primary}
            />
          </View>
        </View>
      </View>
      <View style={styles.inventoryListWrapper}>
        <View style={styles.inventoryListHeader}>
          <Text style={styles.inventoryListTitle}>Products</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(searchScreenName)}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={globalColors.primary}
            />
          </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    height: 140,
    justifyContent: "center",
    position: "relative",
    backgroundColor: globalColors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    marginBottom: 65,
  },
  headerTitle: {
    color: globalColors.white,
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 25,
  },
  inventorySummaryContainer: {
    alignSelf: "center",
    position: "absolute",
    backgroundColor: globalColors.white,
    bottom: -95,
    width: "100%",
    borderRadius: 10,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  summaryCategoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inventorySummaryTitle: {
    color: globalColors.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    marginLeft: 10,
  },

  inventoryListWrapper: {
    flexGrow: 1,
    marginBottom: 10,
    alignSelf: "center",
    width: "90%",
    paddingHorizontal: 10,
    marginTop: 40,
    backgroundColor: globalColors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },

  inventoryListContainer: {
    marginBottom: 250,
  },
  inventoryListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  inventoryListTitle: {
    color: globalColors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyInventoryContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  emptyInventoryImage: {
    width: 150,
    height: 150,
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
