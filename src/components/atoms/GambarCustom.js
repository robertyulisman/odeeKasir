import React from 'react';
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';

import {Warna} from '../../utils/Data';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
// import shorthash from 'shorthash';

const GambarCustom = ({source, style, resizeMode, onPress, image}) => {
  const [showImage, setShowImage] = React.useState(false);
  const [imageSource, setImageSource] = React.useState('');

  // React.useEffect(() => {
  //   const uri = source?.uri;
  //   const name = uri !== undefined && shorthash.unique(uri);

  //   console.log('name', name);

  //   const path = `${FileSystem.cacheDirectory}`;
  // }, []);
  return (
    <>
      {image ? (
        <TouchableOpacity
          style={[
            {
              overflow: 'hidden',
            },
            style,
          ]}
          onPress={() => {
            setImageSource(source);
            setShowImage(true);
          }}>
          {source?.uri === undefined ? (
            <Image
              style={{
                resizeMode: resizeMode ? resizeMode : 'contain',
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              source={source}
            />
          ) : (
            <FastImage
              style={{flex: 1, width: undefined, height: undefined}}
              source={source}
              resizeMode={
                resizeMode ? resizeMode : FastImage.resizeMode.contain
              }
            />
          )}
        </TouchableOpacity>
      ) : (
        <View
          style={[
            {
              overflow: 'hidden',
            },
            style,
          ]}>
          <Image
            style={{
              resizeMode: resizeMode ? resizeMode : 'contain',
              flex: 1,
              width: undefined,
              height: undefined,
            }}
            source={source}
          />
        </View>
      )}
      <ImageView
        images={[imageSource]}
        imageIndex={0}
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      />
    </>
  );
};

export default GambarCustom;
