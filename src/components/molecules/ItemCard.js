import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {apiUrl, Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';

import FastImage from 'react-native-fast-image';
import Gambar from '../atoms/Gambar';
import {formatNumber} from '../../utils/Fungsi';
import TextJudul from '../atoms/TextJudul';

const ItemCard = ({onPressProduk, item}) => {
  // console.log('render item card');
  return (
    <TouchableOpacity
      onPress={onPressProduk}
      style={{
        width: 500 / 4 - 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: Warna.putih,
        margin: 5,
        alignItems: 'center',
      }}>
      <Gambar
        style={{width: 60, height: 60}}
        source={{
          uri:
            item.image === ''
              ? `${apiUrl}/asset/images/noImage.jpg`
              : `${apiUrl}/${item?.image}`,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
      />
      <TextBody
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          fontSize: 11,
          lineHeight: 22,
          textAlign: 'center',
        }}
        title={item.nama}
      />
      <TextJudul
        // numberOfLines={2}
        // ellipsizeMode="tail"
        style={{
          fontSize: 11,
          lineHeight: 22,
          textAlign: 'center',
        }}
        title={formatNumber(item.hargaMarkup)}
      />
    </TouchableOpacity>
  );
};

export default React.memo(ItemCard);
