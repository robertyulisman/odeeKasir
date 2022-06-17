import React from 'react';
import {View, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';

const Gambar = ({source, style, resizeMode}) => {
  return (
    <Animated.View
      style={[
        {
          overflow: 'hidden',
        },
        style,
      ]}>
      <FastImage
        style={{flex: 1, width: undefined, height: undefined}}
        source={source}
        resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.contain}
      />
    </Animated.View>
  );
};

export default Gambar;
