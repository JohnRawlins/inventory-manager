import { GET_PRODUCT_DETAILS } from "../actions/productDetailsActions";
import { PRODUCT_NOT_FOUND } from "../actions/productDetailsActions";
import { CLEAR_PRODUCT_INFO } from "../actions/productDetailsActions";
import { LOADING } from "../actions/productDetailsActions";

const initialState = {
  productTitle: "",
  productCode: "",
  productDescription: "",
  productImage: "",
  productInfoFound: false,
  productInfoErrorMsg: "",
  loadingProduct: false,
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
        productImage: "",
        productInfoFound: false,
        productInfoErrorMsg: "",
        loadingProduct: false,
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

    default: {
      return state;
    }
  }
};

export default productDetailsReducer;
