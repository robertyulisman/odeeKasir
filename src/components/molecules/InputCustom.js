import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';
import Icon from 'react-native-vector-icons/AntDesign';

const InputCustom = props => {
  return (
    <>
      {props.label && (
        <TextBody
          style={{
            marginBottom: 5,
            marginTop: 10,
            marginLeft: 10,
          }}
          title={props.label}
        />
      )}
      <View
        style={{
          marginBottom: 10,
          borderWidth: 1,
          borderColor: Warna.grayscale.empat,
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: props.barcode ? 'center' : null,
          }}>
          <TextInput
            placeholderTextColor={Warna.grayscale.dua}
            style={{
              color: Warna.grayscale.satu,
              fontSize: 16,
              textAlignVertical: props.barcode ? 'center' : 'top',
              fontFamily: 'Nunito-Regular',
              flex: props.barcode ? 1 : 1,
            }}
            {...props}
          />
          {props.barcode && (
            <TouchableOpacity onPress={props.onPressBarcode}>
              <Icon name="barcode" size={40} color={Warna.hitam} />
              {/* <View
                style={{width: 40, height: 40, backgroundColor: 'red'}}></View> */}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {props.error && (
        <Text
          style={{
            color: Warna.merah,
            fontSize: 14,
            marginLeft: 10,
            marginTop: -5,
            marginBottom: 15,
            fontFamily: 'Nunito-Regular',
          }}>
          *{props.errorText}
        </Text>
      )}
    </>
  );
};

export default InputCustom;
