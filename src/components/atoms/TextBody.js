import React from 'react';
import {View, Text, Animated} from 'react-native';
import {Warna} from '../../utils/Data';

const TextBody = ({title, style, numberOfLines, ellipsizeMode}) => {
  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        {
          fontSize: 12,
          color: Warna.grayscale.dua,
          lineHeight: 20,
          fontFamily: 'Nunito-Regular',
        },

        style,
      ]}>
      {title}
    </Animated.Text>
  );
};

export default TextBody;
