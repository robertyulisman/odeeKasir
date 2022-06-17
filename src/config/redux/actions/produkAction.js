import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {ToastDefault} from '../../../utils/Fungsi';
import {GET_KATEGORI, GET_PRODUK, GET_ALL_PRODUK, UPDATE_PRODUK} from './types';

// get profile
export const getKategori = () => async dispatch => {
  await axios
    .get(`${apiUrl}/api/kategori`)
    .then(response => {
      dispatch({
        type: GET_KATEGORI,
        payload: response.data,
      });
      dispatch({
        type: GET_PRODUK,
        produk: response.data[0],
      });
    })
    .catch(err => console.log(`err get kategori`, err));
};

export const getAllProduk = () => async dispatch => {
  await axios
    .get(`${apiUrl}/api/produk`)
    .then(response => {
      // console.log(`sukses get kategori`, response.data);
      dispatch({
        type: GET_ALL_PRODUK,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get all produk`, err));
};

export const updateProduk = (data, dataKategori) => dispatch => {
  // console.log('data', data);
  const newData = dataKategori.map(item => {
    if (item._id === data._id) {
      return {
        ...item,
        selected: true,
      };
    } else {
      return {
        ...item,
        selected: false,
      };
    }
  });
  dispatch({
    type: UPDATE_PRODUK,
    payload: newData,
    produk: data,
  });
};
