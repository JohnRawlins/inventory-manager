import { GET_INVENTORY } from "../actions/inventoryActions";
import { ADD_PRODUCT_TO_INVENTORY } from "../actions/inventoryActions";
import { CLEAR_INVENTORY_ACTION_MESSAGE } from "../actions/inventoryActions";
import { REMOVE_PRODUCT_FROM_INVENTORY } from "../actions/inventoryActions";
import { UPDATE_INVENTORY_TOTAL_VALUE } from "../actions/inventoryActions";

const initialState = {
  products: null,
  inventoryTotalValue: null,
  inventoryActionMessages: {
    addProduct: "",
    removeProduct: "",
  },
  refreshRequired: false,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVENTORY: {
      return {
        ...state,
        products: action.payload,
        refreshRequired: false,
      };
    }
    case ADD_PRODUCT_TO_INVENTORY: {
      return {
        ...state,
        inventoryActionMessages: {
          ...state.inventoryActionMessages,
          addProduct: action.payload,
        },
        refreshRequired: true,
      };
    }

    case REMOVE_PRODUCT_FROM_INVENTORY: {
      return {
        ...state,
        inventoryActionMessages: {
          ...state.inventoryActionMessages,
          removeProduct: action.payload,
        },
        refreshRequired: true,
      };
    }

    case UPDATE_INVENTORY_TOTAL_VALUE: {
      return {
        ...state,
        inventoryTotalValue: action.payload,
      };
    }

    case CLEAR_INVENTORY_ACTION_MESSAGE: {
      return {
        ...state,
        inventoryActionMessages: action.payload,
        refreshRequired: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default inventoryReducer;
