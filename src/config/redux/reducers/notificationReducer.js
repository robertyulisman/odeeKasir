import {
  NOTIFIKASI,
  UPDATE_NOTIFIKASI,
  DELETE_NOTIFIKASI,
  RESET_NOTIFICATION,
} from './../actions/types';

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTIFIKASI:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_NOTIFIKASI:
      console.log('action notifikasi', action);
      return {
        ...state,
        data: state.data,
        isSuccess: action.isSuccess,
      };
    case DELETE_NOTIFIKASI:
      return {
        ...state,
        data: state.data,
        isSuccess: action.isSuccess,
      };
    case RESET_NOTIFICATION:
      return {
        ...state,
        isSuccess: false,
        isError: false,
        message: '',
      };

    default:
      return state;
  }
}
