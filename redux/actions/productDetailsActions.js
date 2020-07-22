import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { NumPadMode } from "../../components/NumPad/num-pad-values";
export const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
export const PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND";
export const CLEAR_PRODUCT_INFO = "CLEAR_PRODUCT_INFO";
export const LOADING = "LOADING";
export const CLOSE_NUMPAD = "CLOSE_NUMPAD";
export const OPEN_NUMPAD = "OPEN_NUMPAD";
export const SET_QUANTITY = "SET_QUANTITY";
export const SET_PRICE = "SET_PRICE";
export const SET_TOTAL_VALUE = "SET_TOTAL_VALUE";
export const ADD_PRODUCT_TO_INVENTORY = "ADD_PRODUCT_TO_INVENTORY";
export const CLEAR_INVENTORY_ACTION_MESSAGE = "CLEAR_INVENTORY_ACTION_MESSAGE";

export const getProductDetails = (barcode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING });

      const response = await axios.get(
        `http://192.168.1.92:5000/product/${barcode}`
      );

      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      if (!error.response) {
        dispatch({
          type: PRODUCT_NOT_FOUND,
          payload: { error: "Unable To Connect To Server", productCode: "" },
        });
      } else if (error.response.status === 404) {
        dispatch({
          type: PRODUCT_NOT_FOUND,
          payload: { error: error.response.data, productCode: barcode },
        });
      }
    }
  };
};

export const addProductToInventory = ({
  productCode,
  productTitle,
  productDescription,
  productImage,
}) => {
  return async (dispatch) => {
    const successMessage = `${productTitle} has been added to your inventory`;
    const failedMessage =
      "An error occurred while adding product to your inventory";
    const productExist = `${productTitle} is already in your inventory`;

    try {
      let productToAdd = {
        productKey: productCode,
        productTitle,
        productCode,
        productDescription,
        productImage,
      };

      const { productKey } = productToAdd;

      productToAdd = JSON.stringify(productToAdd);

      const requestedProduct = await AsyncStorage.getItem(productKey);

      if (requestedProduct) {
        dispatch({
          type: ADD_PRODUCT_TO_INVENTORY,
          payload: productExist,
        });
      } else {
        await AsyncStorage.setItem(productKey, productToAdd);

        dispatch({
          type: ADD_PRODUCT_TO_INVENTORY,
          payload: successMessage,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_TO_INVENTORY,
        payload: failedMessage,
      });
    }
  };
};

export const clearInventoryActionMessage = () => {
  return {
    type: CLEAR_INVENTORY_ACTION_MESSAGE,
  };
};

export const closeNumPad = () => {
  return {
    type: CLOSE_NUMPAD,
  };
};

export const openNumPad = (mode) => {
  return mode === NumPadMode.STOCK
    ? { type: OPEN_NUMPAD, payload: NumPadMode.STOCK }
    : { type: OPEN_NUMPAD, payload: NumPadMode.MONEY };
};

export const clearProductDetails = () => {
  return {
    type: CLEAR_PRODUCT_INFO,
  };
};

export const setQuantity = (value) => {
  return {
    type: SET_QUANTITY,
    payload: value,
  };
};

export const setPrice = (value) => {
  return {
    type: SET_PRICE,
    payload: value,
  };
};

export const setTotalValue = (value) => {
  return {
    type: SET_TOTAL_VALUE,
    payload: value,
  };
};
