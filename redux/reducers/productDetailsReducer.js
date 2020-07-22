import { GET_PRODUCT_DETAILS } from "../actions/productDetailsActions";
import { PRODUCT_NOT_FOUND } from "../actions/productDetailsActions";
import { CLEAR_PRODUCT_INFO } from "../actions/productDetailsActions";
import { CLOSE_NUMPAD } from "../actions/productDetailsActions";
import { OPEN_NUMPAD } from "../actions/productDetailsActions";
import { SET_QUANTITY } from "../actions/productDetailsActions";
import { SET_PRICE } from "../actions/productDetailsActions";
import { SET_TOTAL_VALUE } from "../actions/productDetailsActions";
import { LOADING } from "../actions/productDetailsActions";
import { ADD_PRODUCT_TO_INVENTORY } from "../actions/productDetailsActions";
import { CLEAR_INVENTORY_ACTION_MESSAGE } from "../actions/productDetailsActions";
import { NumPadMode } from "../../components/NumPad/num-pad-values";

const initialState = {
  productTitle: "",
  productCode: "",
  productDescription: "",
  productImage: "",
  productInfoFound: false,
  productInfoErrorMsg: "",
  inventoryActionMessage: "",
  loadingProduct: false,
  numPad: { visible: false, mode: null },
  quantity: null,
  price: null,
  totalValue: null,
};

const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS: {
      return {
        ...state,
        productTitle: action.payload.productTitle,
        productCode: action.payload.productCode,
        productDescription: action.payload.productDescription,
        productImage: action.payload.productImage,
        productInfoFound: true,
        productInfoErrorMsg: "",
        loadingProduct: false,
      };
    }
    case CLEAR_PRODUCT_INFO: {
      return {
        ...state,
        productTitle: "",
        productCode: "",
        productDescription: "",
        productImage: null,
        productInfoFound: false,
        productInfoErrorMsg: "",
        loadingProduct: false,
        numPad: { visible: false, mode: null },
        quantity: null,
        price: null,
      };
    }

    case PRODUCT_NOT_FOUND: {
      return {
        ...state,
        productTitle: "",
        productCode: action.payload.productCode,
        productDescription: "",
        productImage: "",
        productInfoFound: false,
        productInfoErrorMsg: action.payload.error,
        loadingProduct: false,
      };
    }

    case LOADING: {
      return {
        ...state,
        loadingProduct: true,
      };
    }

    case CLOSE_NUMPAD: {
      return {
        ...state,
        numPad: {
          ...state.numPad,
          visible: false,
          mode: null,
        },
      };
    }

    case OPEN_NUMPAD: {
      return {
        ...state,
        numPad: {
          ...state.numPad,
          visible: true,
          mode: action.payload,
        },
      };
    }

    case SET_QUANTITY: {
      return {
        ...state,
        numPad: {
          ...state.numPad,
          visible: false,
          mode: null,
        },
        quantity: action.payload,
      };
    }

    case SET_PRICE: {
      return {
        ...state,
        numPad: {
          ...state.numPad,
          visible: false,
          mode: null,
        },
        price: action.payload,
      };
    }

    case SET_TOTAL_VALUE: {
      return {
        ...state,
        totalValue: action.payload,
      };
    }

    case ADD_PRODUCT_TO_INVENTORY: {
      return {
        ...state,
        inventoryActionMessage: action.payload,
      };
    }

    case CLEAR_INVENTORY_ACTION_MESSAGE: {
      return {
        ...state,
        inventoryActionMessage: "",
      };
    }

    default: {
      return state;
    }
  }
};

export default productDetailsReducer;

export { NumPadMode };
