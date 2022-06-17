import {ADD_KERANJANG, RESET_KERANJANG} from '../actions/types';

const initialState = {
  keranjang: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_KERANJANG:
      return {
        ...state,
        keranjang:
          state.keranjang.length === 0
            ? [action.payload]
            : [...state.keranjang, action.payload],
      };

    case RESET_KERANJANG:
      return {
        ...state,
        keranjang: [],
      };

    default:
      return state;
  }
}
