import {View, FlatList} from 'react-native';
import React from 'react';
import KategoryCard from '../molecules/KategoryCard';

const KategoriComponent = ({kategori, produk, scrollY, onPressKategori}) => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        extraData
        data={kategori}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        keyExtractor={item => `${item._id}kategory`}
        horizontal
        renderItem={({item, index}) => {
          return (
            <KategoryCard
              produk={produk}
              index={index}
              item={item}
              scrollY={scrollY}
              onPressKategori={() => onPressKategori(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default KategoriComponent;
