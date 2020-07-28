import AsyncStorage from "@react-native-community/async-storage";
export const GET_INVENTORY = "GET_INVENTORY";
export const ADD_PRODUCT_TO_INVENTORY = "ADD_PRODUCT_TO_INVENTORY";
export const CLEAR_INVENTORY_ACTION_MESSAGE = "CLEAR_INVENTORY_ACTION_MESSAGE";
export const REMOVE_PRODUCT_FROM_INVENTORY = "REMOVE_PRODUCT_FROM_INVENTORY";

export const getInventory = () => {
  return async (dispatch) => {
    try {
      const productKeys = await AsyncStorage.getAllKeys();
      let products = await AsyncStorage.multiGet(productKeys);
      if (products.length > 0) {
        products = products.map((product) => {
          const value = JSON.parse(product[1]);
          return value;
        });
      }
      dispatch({
        type: GET_INVENTORY,
        payload: products,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const addProductToInventory = ({
  productCode,
  productTitle,
  productDescription,
  productImage,
  price,
  quantity,
}) => {
  return async (dispatch) => {
    const successMessage = `${productTitle} has been added to your inventory`;
    const failedMessage =
      "An error occurred while adding product to your inventory";
    const productExistMessage = `${productTitle} has been updated`;

    try {
      let productToAdd = {
        key: productCode,
        productTitle,
        productCode,
        productDescription,
        productImage,
        price,
        quantity,
      };

      const { key } = productToAdd;

      productToAdd = JSON.stringify(productToAdd);

      const requestedProduct = await AsyncStorage.getItem(key);

      await AsyncStorage.setItem(key, productToAdd);

      const responseMessage = requestedProduct
        ? productExistMessage
        : successMessage;

      dispatch({
        type: ADD_PRODUCT_TO_INVENTORY,
        payload: responseMessage,
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_TO_INVENTORY,
        payload: failedMessage,
      });
    }
  };
};

export const removeProductFromInventory = ({ key, productTitle }) => {
  return async (dispatch) => {
    const successMessage = `${productTitle} has been successfully removed`;
    const failedMessage = `An error occurred while trying to remove product from inventory`;
    try {
      await AsyncStorage.removeItem(key);
      dispatch({
        type: REMOVE_PRODUCT_FROM_INVENTORY,
        payload: successMessage,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_PRODUCT_FROM_INVENTORY,
        payload: failedMessage,
      });
    }
  };
};

export const clearInventoryActionMessage = (actionMessages) => {
  for (const messageType in actionMessages) {
    actionMessages[messageType] = "";
  }
  return {
    type: CLEAR_INVENTORY_ACTION_MESSAGE,
    payload: actionMessages,
  };
};
