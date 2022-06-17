import {View, FlatList} from 'react-native';
import React from 'react';
import EmptyOrder from '../molecules/EmptyOrder';
import ItemCard from '../molecules/ItemCard';

const ProdukComponent = ({
  focusSearch,
  dataAllProduk,
  produk,
  onPressProduk,
}) => {
  return (
    <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
      {focusSearch ? (
        dataAllProduk.length > 0 ? (
          <FlatList
            extraData
            contentContainerStyle={{
              alignContent: 'center',
              alignItems: 'center',
            }}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            numColumns={7}
            key={'_'}
            keyExtractor={item => `_${item._id}`}
            data={dataAllProduk}
            renderItem={({item, index}) => {
              return (
                <ItemCard
                  item={item}
                  onPressProduk={() => onPressProduk(item)}
                />
              );
            }}
          />
        ) : (
          <EmptyOrder title="NO DATA" />
        )
      ) : (
        <FlatList
          extraData
          contentContainerStyle={{
            alignContent: 'center',
            alignItems: 'center',
          }}
          maxToRenderPerBatch={20}
          initialNumToRender={20}
          numColumns={4}
          key={'#'}
          keyExtractor={item => `#${item._id}`}
          data={produk?.produk}
          renderItem={({item, index}) => {
            return (
              <ItemCard item={item} onPressProduk={() => onPressProduk(item)} />
            );
          }}
        />
      )}
    </View>
  );
};

export default ProdukComponent;
