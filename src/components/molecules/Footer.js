import {View, Text, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import {Warna} from '../../utils/Data';
import TextBody from '../atoms/TextBody';
import {Flow} from 'react-native-animated-spinkit';

const Footer = ({
  loading,
  valueSwitch,
  onValueChangeSwitch,
  bleOpend,
  onPressScan,
  name,
  typeInternet,
}) => {
  return (
    <View
      style={{
        backgroundColor: Warna.primary.satu,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <TextBody style={{color: Warna.putih}} title={typeInternet} />
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
        }}>
        {loading ? (
          <Flow size={48} color={Warna.grayscale.lima} />
        ) : (
          <Switch
            value={valueSwitch}
            onValueChange={v => onValueChangeSwitch(v)}
          />
        )}
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {loading || bleOpend === false ? null : (
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              alignItems: 'center',
              backgroundColor: Warna.putih,
              borderRadius: 5,
            }}
            onPress={onPressScan}>
            <TextBody style={{color: Warna.hitam}} title={'Scan Devices'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 2, alignItems: 'center'}}>
        {name !== '' && (
          <TextBody
            style={{color: Warna.hitam}}
            title={`Connected : ${name}`}
          />
        )}
      </View>
    </View>
  );
};

export default Footer;
