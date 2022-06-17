import {View, Text, Animated, TouchableOpacity} from 'react-native';
import React from 'react';
import TextBody from '../../components/atoms/TextBody';
import {formatNumber} from '../../utils/Fungsi';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Warna} from '../../utils/Data';

const ItemKeranjang = ({item, onPressPlus, onPressMinus, onPressDelete}) => {
  console.log('render item kategori keranjang');
  return (
    <Animated.View
      style={{
        backgroundColor: Warna.putih,
        marginBottom: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 5,
      }}>
      <View style={{flex: 2}}>
        <TextBody style={{fontSize: 11}} title={item.nama} />
      </View>
      <View style={{flex: 1}}>
        <TextBody
          style={{fontSize: 11}}
          title={formatNumber(item.hargaMarkup || 0)}
        />
      </View>
      <View style={{width: 20}}>
        <TextBody style={{fontSize: 11}} title={item.jumlah} />
      </View>
      <TouchableOpacity
        onPress={onPressPlus}
        style={{
          width: 25,
          height: 25,
          borderRadius: 13,
          backgroundColor: Warna.primary.satu,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="plus" size={18} color={Warna.putih} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressMinus}
        style={{
          marginLeft: 5,
          width: 25,
          height: 25,
          borderRadius: 13,
          backgroundColor: Warna.secondary.satu,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="minus" size={18} color={Warna.putih} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDelete}
        style={{
          marginLeft: 5,
          width: 25,
          height: 25,
          borderRadius: 13,
          backgroundColor: Warna.merah,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="trash" size={18} color={Warna.putih} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return nextProps.item._id === prevProps.item._id;
};

export default React.memo(ItemKeranjang);
