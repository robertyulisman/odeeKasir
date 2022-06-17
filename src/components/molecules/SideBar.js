import {View, Text, TouchableOpacity} from 'react-native';
Icon;
import React from 'react';
import TextBody from '../atoms/TextBody';
import {Warna} from '../../utils/Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../config/redux/actions/authAction';
import {clearProfileUser} from '../../config/redux/actions/profileActions';

const SideBar = ({navigation}) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutUser());
    dispatch(clearProfileUser());
    navigation.navigate('Login');
  };
  return (
    <View
      style={{
        width: 80,
        backgroundColor: Warna.putih,
        height: '100%',
        alignItems: 'center',
      }}>
      {/* <View
        style={{
          width: 80,
          paddingVertical: 10,
          backgroundColor: Warna.putih,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <TextBody title="Kasir" />
      </View> */}
      {/* Menu */}
      <TouchableOpacity
        style={{
          backgroundColor: Warna.putih,
          //   marginTop: 10,
          borderRadius: 5,
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
          // paddingVertical: 5,
          borderRightWidth: 3,
          borderRightColor: Warna.primary.satu,
        }}>
        <Icon name="home" size={24} color={Warna.grayscale.tiga} />
        <TextBody title="Kasir" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogOut}
        style={{
          backgroundColor: Warna.putih,
          marginTop: 10,
          borderRadius: 10,
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
          position: 'absolute',
          bottom: 10,
        }}>
        <Icon name="sign-out" size={24} color={Warna.grayscale.tiga} />
        <TextBody title="Keluar" />
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(SideBar);
