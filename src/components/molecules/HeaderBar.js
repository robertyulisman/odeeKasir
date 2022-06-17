import {View} from 'react-native';
import React from 'react';
import TextJudul from '../atoms/TextJudul';
import Search from './Search';

const HeaderBar = ({
  focusSearch,
  valueSearch,
  onChangeTextSearch,
  onPressFocusSearch,
  onPressSearch,
  onPressCancelSearch,
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TextJudul
        style={{flex: 1}}
        title={focusSearch ? 'Cari Produk' : 'Kategori'}
      />
      <Search
        valueSearch={valueSearch}
        onChangeTextSearch={onChangeTextSearch}
        onPressFocusSearch={onPressFocusSearch}
        onPressSearch={onPressSearch}
        focusSearch={focusSearch}
        onPressCancelSearch={onPressCancelSearch}
      />
    </View>
  );
};

export default HeaderBar;
