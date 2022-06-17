import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {ToastDefault} from '../../../utils/Fungsi';
import {
  GET_PESANAN_TOKO,
  RESET_PESANAN_TOKO,
  UPDATE_PESANAN_TOKO,
} from './types';

// get profile
export const getPesananToko = idUser => async dispatch => {
  await axios
    .get(`${apiUrl}/api/pesananToko/kurir/${idUser}`)
    .then(response => {
      console.log(`sukses get pesanan toko`, response.data);
      dispatch({
        type: GET_PESANAN_TOKO,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get pesanan toko`, err));
};

export const updatePesananToko = (id, data) => async dispatch => {
  await axios
    .put(`${apiUrl}/api/pesananToko/update/${id}`, data)
    .then(response => {
      console.log(`sukses update pesanan toko`, response.data);
      ToastDefault('Pesanan berhasil diproses');

      dispatch({
        type: UPDATE_PESANAN_TOKO,
        isSuccess: true,
        isError: false,
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PESANAN_TOKO,
        isSuccess: false,
        isError: true,
      });
      console.log(`err update pesanan toko`, err);
    });
};

export const resetPesananToko = () => dispatch => {
  dispatch({
    type: RESET_PESANAN_TOKO,
  });
};
