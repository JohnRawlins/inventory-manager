import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import barcodeScannerReducer from "../reducers/barcodeScannerReducer";
import productDetailsReducer from "../reducers/productDetailsReducer";
import inventoryReducer from "../reducers/inventoryReducer";

const store = createStore(
  combineReducers({
    barcodeScanner: barcodeScannerReducer,
    productDetails: productDetailsReducer,
    inventory:inventoryReducer,
  }),
  compose(
    applyMiddleware(thunk),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
