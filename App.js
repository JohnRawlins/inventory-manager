import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ProductDetailsScreen, {
  productDetailsScreenName,
} from "./screens/product_details/ProductDetailsScreen";
import HomeScreen, { homeScreenName } from "./screens/home/HomeScreen";
import { Provider } from "react-redux";
import store from "./redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.appContainer}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name={homeScreenName} component={HomeScreen} />
              <Stack.Screen
                name={productDetailsScreenName}
                component={ProductDetailsScreen}
              />
            </Stack.Navigator>
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
