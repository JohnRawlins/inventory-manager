import React from "react";
import InventoryScreen, {
  inventoryScreenName,
} from "../inventory/InventoryScreen";
import Tab from "../../navigation/Tab";
import { tabIcons, tabBarColors } from "../../navigation/tabSettings";
import BarcodeScannerScreen, {
  barcodeScannerScreenName,
} from "../barcode_scanner/BarcodeScannerScreen";

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={inventoryScreenName}
      screenOptions={tabIcons}
      tabBarOptions={tabBarColors}
    >
      <Tab.Screen
        name={barcodeScannerScreenName}
        component={BarcodeScannerScreen}
      />
      <Tab.Screen name={inventoryScreenName} component={InventoryScreen} />
    </Tab.Navigator>
  );
};

export const homeScreenName = "Home";

export default HomeScreen;
