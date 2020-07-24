import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalColors } from "../../global/globalStyles";
import Product from "../../components/Product/Product";
import * as inventoryActions from "../../redux/actions/inventoryActions";
import Toast from "react-native-root-toast";
import { toastOptions } from "../../global/toastOptions";

const InventoryScreen = () => {
  const dispatch = useDispatch();

  const inventoryState = useSelector((state) => state.inventory, shallowEqual);

  useEffect(() => {
    if (inventoryState.refreshRequired || inventoryState.products === null) {
      dispatch(inventoryActions.getInventory());
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
      <View style={[styles.header]}>
        <Text style={styles.headerTitle}>{inventoryScreenName}</Text>
        <View style={styles.totalsContainer}>
          <View style={styles.totalCategoryContainer}>
            <Text style={styles.totalCateogoryValue}>
              {inventoryState.products ? inventoryState.products.length : 0}
            </Text>
            <Text style={styles.totalCategoryTitle}>Total Items</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.inventoryListContainer}
        data={inventoryState.products}
        renderItem={({ item }) => {
          return <Product product={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: globalColors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 42,
  },
  headerTitle: {
    color: globalColors.white,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 25,
  },
  totalsContainer: {
    position: "absolute",
    backgroundColor: globalColors.white,
    bottom: -40,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
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
    fontSize: 18,
    fontWeight: "bold",
    color: globalColors.primary,
  },
  totalCategoryTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  inventoryListContainer: {
    paddingHorizontal: 20,
    marginBottom: 160,
    paddingTop: 10,
  },
});

export const inventoryScreenName = "Inventory";

export default InventoryScreen;
