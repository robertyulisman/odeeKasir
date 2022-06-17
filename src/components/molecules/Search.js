import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Warna} from '../../utils/Data';

const Search = ({
  valueSearch,
  onChangeTextSearch,
  onPressFocusSearch,
  onPressSearch,
  focusSearch,
  onPressCancelSearch,
  styleContainer,
}) => {
  return (
    <View
      style={{
        backgroundColor: Warna.putih,
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
        overflow: 'hidden',
        alignSelf: 'flex-end',
        ...styleContainer,
      }}>
      <TextInput
        value={valueSearch}
        onChangeText={onChangeTextSearch}
        keyboardType="email-address"
        style={{flex: 1, paddingHorizontal: 20}}
        placeholder="Cari Produk"
        placeholderTextColor={Warna.grayscale.tiga}
        onFocus={onPressFocusSearch}
      />
      <TouchableOpacity
        onPress={onPressSearch}
        disabled={!focusSearch}
        style={{
          backgroundColor: Warna.primary.satu,
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          marginRight: 5,
        }}>
        <Icon name="search" size={20} color={Warna.putih} />
      </TouchableOpacity>
      {focusSearch && (
        <TouchableOpacity
          onPress={onPressCancelSearch}
          style={{
            backgroundColor: Warna.merah,
            width: 30,
            height: 30,

            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            marginRight: 5,
          }}>
          <Icon name="times" size={17} color={Warna.putih} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;
