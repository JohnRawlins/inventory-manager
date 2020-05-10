import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { barcodeScannerScreenName } from "../screens/barcode_scanner/BarcodeScannerScreen";
import { inventoryScreenName } from "../screens/inventory/InventoryScreen";
import { globalColors } from "../global/globalStyles";

const tabIcons = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    switch (route.name) {
      case barcodeScannerScreenName: {
        return (
          <MaterialCommunityIcons
            name="barcode-scan"
            size={size}
            color={color}
          />
        );
      }
      case inventoryScreenName: {
        return (
          <MaterialCommunityIcons name="view-list" size={size} color={color} />
        );
      }
    }
  },
});

const tabBarColors = {
  activeTintColor: globalColors.primary,
  inactiveTintColor: "gray",
};

export { tabIcons, tabBarColors };
