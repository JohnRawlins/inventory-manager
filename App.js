import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BarcodeScannerScreen, {
  barcodeScannerScreenName,
} from "./screens/barcode_scanner/BarcodeScannerScreen";
import Tab from "./navigation/Tab";
import InventoryScreen, {
  inventoryScreenName,
} from "./screens/inventory/InventoryScreen";
import { tabIcons, tabBarColors } from "./navigation/tabSettings";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.appContainer}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={tabIcons} tabBarOptions={tabBarColors}>
            <Tab.Screen
              name={barcodeScannerScreenName}
              component={BarcodeScannerScreen}
            />
            <Tab.Screen
              name={inventoryScreenName}
              component={InventoryScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
