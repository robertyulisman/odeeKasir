import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducers';
import keranjangReducer from './keranjangReducer';
import notificationReducer from './notificationReducer';
import pesananTokoReducer from './pesananTokoReducer';
import produkReducer from './produkReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  pesananToko: pesananTokoReducer,
  notification: notificationReducer,
  produk: produkReducer,
  keranjang: keranjangReducer,
});
