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
import { Provider } from "react-redux";
import store from "./redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.appContainer}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName={inventoryScreenName}
              screenOptions={tabIcons}
              tabBarOptions={tabBarColors}
            >
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
