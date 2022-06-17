import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {apiUrl, Warna} from '../../utils/Data';
import TextBody from '../../components/atoms/TextBody';
import FastImage from 'react-native-fast-image';
import Gambar from '../../components/atoms/Gambar';

const KategoryCard = ({onPressKategori, scrollY, item, index, produk}) => {
  console.log('render item kategori card');
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  // console.log('produk._id', produk._id);
  // console.log('item._id', item._id);

  return (
    <AnimatedTouchable
      onPress={onPressKategori}
      style={{
        maxHeight: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: [140, 50],
          extrapolate: 'clamp',
        }),
        maxWidth: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: [80, 80],
          extrapolate: 'clamp',
        }),
        width: 80,
        // height: 60,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: Warna.putih,
        marginVertical: 10,
        padding: 10,
        // borderWidth: item.selected ? 1 : 0,
        // borderColor: item.selected ? Warna.primary.satu : null,
        borderWidth: item._id === produk?._id ? 1 : 0,
        borderColor: item._id === produk?._id ? Warna.primary.satu : null,
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      <Gambar
        resizeMode="contain"
        style={{
          width: 70,
          height: 70,
          maxWidth: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [70, 40],
            extrapolate: 'clamp',
          }),
          maxHeight: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [70, 40],
            extrapolate: 'clamp',
          }),
        }}
        source={{
          uri: `${apiUrl}/${item.image}`,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
      />
      <TextBody
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          fontSize: 11,
          lineHeight: 22,
          textAlign: 'center',
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
        title={item.nama}
      />
      {/* {item.nama}
                    </TextBody> */}
    </AnimatedTouchable>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  const selected = nextProps.produk?._id;
  const prevSelected = prevProps.produk?._id;

  const isSelectedEqual = selected === prevSelected;
  return isSelectedEqual;
  // return nextProps.item._id === prevProps.item._id;
};

export default React.memo(KategoryCard, arePropsEqual);
