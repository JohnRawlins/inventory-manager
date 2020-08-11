import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { globalColors } from "../../global/globalStyles";
import Product from "../../components/Product/Product";
import SvgImage from "../../components/SvgImage/SvgImage";
import backArrow from "../../assets/backArrow";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchScreen = ({ navigation }) => {
  const inventoryState = useSelector((store) => store.inventory, shallowEqual);

  const { products } = inventoryState;

  const [inventorySearch, setInventorySearch] = useState({
    results: [],
    searchInput: "",
  });

  const filterInventory = (searchText) => {
    if (!products || !searchText) {
      return [];
    } else {
      return products.filter((product) => {
        const productTitle = product.productTitle.toLowerCase();
        const productToFind = searchText.toLowerCase();
        return productTitle.includes(productToFind);
      });
    }
  };

  const handleInventorySearchInput = (searchText) => {
    setInventorySearch({
      results: filterInventory(searchText),
      searchInput: searchText,
    });
  };

  return (
    <View style={styles.searchScreenContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <SvgImage style={styles.backArrow} name={backArrow} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          placeholderTextColor={globalColors.primary}
          style={styles.searchInput}
          onChangeText={(searchText) => handleInventorySearchInput(searchText)}
          value={inventorySearch.searchInput}
        />
      </View>
      <View style={styles.searchResultsContainer}>
        {inventorySearch.results.length > 0 && (
          <FlatList
            data={inventorySearch.results}
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
  searchScreenContainer: {
    flex: 1,
    backgroundColor: globalColors.white,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomColor: globalColors.lightGray,
    borderBottomWidth: 1,
  },
  searchResultsContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  backArrow: {
    width: 25,
    height: 25,
  },
  searchInput: {
    width: "85%",
    fontSize: 20,
    color: globalColors.primary,
  },
});

export const searchScreenName = "Search";

export default SearchScreen;
