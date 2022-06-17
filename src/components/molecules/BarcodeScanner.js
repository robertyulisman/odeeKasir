import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Warna} from '../../utils/Data';

const BarcodeScanner = ({
  valueSearch,
  onChangeTextSearch,
  onPressFocusSearch,
  onPressSearch,
  focusSearch,
  styleContainer,
  onEndEditing,
}) => {
  return (
    <View
      style={{
        backgroundColor: Warna.putih,
        width: 150,
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
        keyboardType="number-pad"
        style={{flex: 1, paddingHorizontal: 20}}
        placeholder="Barcode"
        placeholderTextColor={Warna.grayscale.tiga}
        onEndEditing={onEndEditing}
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
        <Icon name="barcode" size={20} color={Warna.putih} />
      </TouchableOpacity>
    </View>
  );
};

export default BarcodeScanner;
