import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { globalColors } from "../../global/globalStyles";
import Product from "../../components/Product/Product";

const InventoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.headerTitle}>{inventoryScreenName}</Text>
        <View style={styles.totalsContainer}>
          <View style={styles.totalCategoryContainer}>
            <Text style={styles.totalCateogoryValue}>2,000</Text>
            <Text style={styles.totalCategoryTitle}>Total Items</Text>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.inventoryListContainer}
        data={null}
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
