import {
  GET_PRODUK,
  GET_KATEGORI,
  GET_ALL_PRODUK,
  UPDATE_PRODUK,
} from '../actions/types';

const initialState = {
  dataKategori: [],
  dataProduk: null,
  allProduk: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_KATEGORI:
      return {
        ...state,
        dataKategori: action.payload,
      };

    case GET_ALL_PRODUK:
      return {
        ...state,
        allProduk: action.payload,
      };
    case GET_PRODUK:
      return {
        ...state,
        dataProduk: action.produk,
      };

    case UPDATE_PRODUK:
      return {
        ...state,
        dataKategori: action.payload,
        dataProduk: action.produk,
      };

    default:
      return state;
  }
}
