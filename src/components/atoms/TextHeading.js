import React from 'react';
import {View, Text} from 'react-native';

const TextHeading = ({title, style}) => {
  return (
    <Text
      style={[
        {
          fontSize: 20,
          fontFamily: 'Nunito-ExtraBold',
          lineHeight: 22,
          paddingVertical: 5,
        },
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TextHeading;
