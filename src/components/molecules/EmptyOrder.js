import React from 'react';
import {View, Text} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from '../atoms/GambarCustom';
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';

const EmptyOrder = ({title, deskripsi}) => {
  return (
    <View
      style={{
        backgroundColor: Warna.primary.lima,
        // height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
      }}>
      <GambarCustom
        style={{height: 150, width: 150}}
        source={require('../../assets/gambar/empty.png')}
      />
      <TextJudul
        title={title}
        style={{
          color: Warna.grayscale.satu,
          textAlign: 'center',
          marginTop: 10,
        }}
      />
      <TextBody
        style={{
          width: '70%',
          textAlign: 'center',
          marginHorizontal: 20,
        }}
        title={deskripsi}
      />
    </View>
  );
};

export default EmptyOrder;
