import React from 'react';
import {View, Text} from 'react-native';

const TextJudul = ({title, style}) => {
  return (
    <Text
      style={[
        {fontSize: 13, fontFamily: 'Nunito-ExtraBold', lineHeight: 20},
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TextJudul;
