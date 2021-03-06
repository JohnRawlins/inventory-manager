import { GET_PRODUCT_DETAILS } from "../actions/productDetailsActions";
import { PRODUCT_NOT_FOUND } from "../actions/productDetailsActions";
import { CLEAR_PRODUCT_INFO } from "../actions/productDetailsActions";
import { CLOSE_NUMPAD } from "../actions/productDetailsActions";
import { OPEN_NUMPAD } from "../actions/productDetailsActions";
import { SET_QUANTITY } from "../actions/productDetailsActions";
import { SET_PRICE } from "../actions/productDetailsActions";
import { SET_TOTAL_VALUE } from "../actions/productDetailsActions";
import { LOADING } from "../actions/productDetailsActions";
import { NumPadMode } from "../../components/NumPad/num-pad-values";

const initialState = {
  productTitle: "",
  productCode: "",
  productDescription: "",
  productImage: null,
  priceComparisons: [],
  productInfoFound: false,
  productInfoErrorMsg: "",
  loadingProduct: false,
  numPad: { visible: false, mode: null },
  quantity: null,
  price: null,
  totalValue: null,
  productInInventory: false,
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
        priceComparisons: action.payload.priceComparisons,
        productInfoFound: true,
        productInfoErrorMsg: "",
        loadingProduct: false,
        quantity: action.payload.quantity,
        price: action.payload.price,
        totalValue: action.payload.totalValue,
        productInInventory: action.payload.productInInventory,
      };
    }
    case CLEAR_PRODUCT_INFO: {
      return {
        ...initialState,
      };
    }

    case PRODUCT_NOT_FOUND: {
      return {
        ...state,
        productTitle: "",
        productCode: action.payload.productCode,
        productDescription: "",
        productImage: "",
        priceComparisons: [],
        productInfoFound: false,
        productInfoErrorMsg: action.payload.error,
        loadingProduct: false,
        quantity: null,
        price: null,
        totalValue: null,
        productInInventory: false,
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

    default: {
      return state;
    }
  }
};

export default productDetailsReducer;

export { NumPadMode };
