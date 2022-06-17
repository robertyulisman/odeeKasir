import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {ToastDefault} from '../../../utils/Fungsi';
import {ADD_KERANJANG, RESET_KERANJANG} from './types';

// submit pesanan to keranjang
export const addKeranjang = data => async dispatch => {
  ToastDefault('pesanan berhasil dimasukkan kedalam keranjang');
  dispatch({
    payload: data,
    type: ADD_KERANJANG,
  });
};

export const resetKeranjang = () => async dispatch => {
  dispatch({
    type: RESET_KERANJANG,
  });
};
