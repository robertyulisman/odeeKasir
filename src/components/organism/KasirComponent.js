import {View, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// uitility
import {Warna} from '../../utils/Data';
import {formatNumber} from '../../utils/Fungsi';
// component
import TextBody from '../atoms/TextBody';
import TextJudul from '../atoms/TextJudul';
import TextHeading from '../atoms/TextHeading';
import ItemKeranjang from '../molecules/ItemKeranjang';
import Tombol from '../atoms/Tombol';
import EmptyOrder from '../molecules/EmptyOrder';
import Search from '../molecules/Search';
import BarcodeScanner from '../molecules/BarcodeScanner';

const KasirComponent = ({
  keranjang,
  onPressBars,
  onPressPlus,
  onPressDelete,
  onPressMinus,
  totalHarga,
  onPressSubmit,
  showKasir,
  valueSearch,
  onChangeTextSearch,
  onPressFocusSearch,
  onPressSearch,
  focusSearch,
  onPressCancelSearch,
}) => {
  return (
    <View
      style={{
        flex: 1.5,
        backgroundColor: Warna.primary.satu,
      }}>
      <View style={{paddingHorizontal: 10, flex: 1, marginBottom: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={onPressBars}
            style={{
              width: 30,
              height: 30,
              // backgroundColor: Warna.putih,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name={showKasir ? 'list-ul' : 'bars'}
              size={20}
              color={Warna.putih}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <TextJudul
              style={{
                color: Warna.putih,
                marginVertical: 20,
                marginLeft: 10,
              }}
              title="Item"
            />
          </View>

          {showKasir && (
            <>
              <TouchableOpacity
                onPress={onPressFocusSearch}
                style={{
                  backgroundColor: Warna.putih,
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginRight: 5,
                }}>
                <Icon name="search" size={20} color={Warna.primary.satu} />
              </TouchableOpacity>

              {/* <BarcodeScanner
                onChangeTextSearch={value => onChangeTextSearch(value)}
                styleContainer={{marginBottom: 10, marginLeft: 10}}
              /> */}
            </>
          )}
        </View>

        {keranjang.length > 0 ? (
          <FlatList
            keyExtractor={item => `${item._id}`}
            data={keranjang}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            renderItem={({item, index}) => {
              return (
                <ItemKeranjang
                  item={item}
                  onPressDelete={() => onPressDelete(item)}
                  onPressMinus={() => onPressMinus(item)}
                  onPressPlus={() => onPressPlus(item)}
                />
              );
            }}
          />
        ) : (
          <EmptyOrder title="NO DATA" deskripsi="Belum ada data" />
        )}
      </View>
      {/* Jumlah */}
      {keranjang.length > 0 && (
        <View
          style={{
            backgroundColor: Warna.putih,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TextBody title="Total" />
            <TextHeading title={formatNumber(totalHarga)} />
          </View>
          <Tombol
            small
            onPress={onPressSubmit}
            primary
            style={{margin: 10}}
            title="Proses"
          />
        </View>
      )}
    </View>
  );
};

export default KasirComponent;
