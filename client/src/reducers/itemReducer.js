import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(
          (item) =>
            item._id === action.payload.id
              ? //return action payload (modified item) instead of
                //  original item when item id is updated item id
                action.payload
              : item //ids not the same, return original item
        ),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
