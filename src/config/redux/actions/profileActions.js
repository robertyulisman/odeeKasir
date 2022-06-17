import axios from 'axios';
import {apiUrl} from '../../../utils/Data';
import {GET_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE} from './types';

// get profile
export const getProfileUser = idUser => async dispatch => {
  await axios
    .get(`${apiUrl}/api/admin/${idUser}`)
    .then(response => {
      // console.log(`get profile`, response.data);
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    })
    .catch(err => console.log(`err get profile`, err));
};

// update profile
// export const updateProfileUser =
//   (idUser, dataUser, userType) => async dispatch => {
//     await axios
//       .put(`${apiUrl}/api/${userType}/update/${idUser}`, dataUser)
//       .then(response => {
//         console.log(`update profile`, response.data);
//         dispatch({
//           type: UPDATE_PROFILE,
//           payload: response.data,
//         });
//       })
//       .catch(err => console.log(`err update profile`, err));
//   };

// Clear profile
export const clearProfileUser = () => {
  return {
    type: CLEAR_PROFILE,
  };
};
