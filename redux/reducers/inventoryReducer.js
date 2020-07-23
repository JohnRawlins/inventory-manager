import { GET_INVENTORY } from "../actions/inventoryActions";
import { ADD_PRODUCT_TO_INVENTORY } from "../actions/inventoryActions";
import { CLEAR_INVENTORY_ACTION_MESSAGE } from "../actions/inventoryActions";

const initialState = {
  products: [],
  inventoryActionMessage: "",
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY: {
      return {
        ...state,
        products: action.payload,
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

export default inventoryReducer;
