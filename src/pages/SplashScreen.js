import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import GambarCustom from '../components/atoms/GambarCustom';
import {Warna} from '../utils/Data';
import {Flow} from 'react-native-animated-spinkit';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.putih,
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <StatusBar
        translucent
        animated={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{marginTop: 100, marginBottom: 20}}></View>

        <GambarCustom
          style={{
            width: '100%',
            height: 250,
          }}
          source={require('../assets/gambar/gambarSplashscreen.png')}
        />
        <Flow size={48} color={Warna.primary.satu}></Flow>
        <Text
          style={{
            color: Warna.hitam,
            fontFamily: 'Nunito-Regular',
            marginTop: 50,
          }}>
          Version 1.0
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
