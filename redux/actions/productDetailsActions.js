import axios from "axios";
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
  if (value !== null) {
    let { unmasked: unmaskedQuantity } = value;
    unmaskedQuantity = Number.parseInt(unmaskedQuantity);
    if (unmaskedQuantity < 1) {
      value = null;
    }
  }
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
