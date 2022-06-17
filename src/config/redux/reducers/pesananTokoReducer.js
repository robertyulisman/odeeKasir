import {
  GET_PESANAN_TOKO,
  UPDATE_PESANAN_TOKO,
  RESET_PESANAN_TOKO,
} from '../actions/types';

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PESANAN_TOKO:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_PESANAN_TOKO:
      return {
        ...state,
        isSuccess: action.isSuccess,
      };

    case RESET_PESANAN_TOKO:
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };

    default:
      return state;
  }
}
