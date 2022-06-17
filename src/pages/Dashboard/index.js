import React from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Switch,
  Keyboard,
} from 'react-native';

// library
import {useSelector, useDispatch} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
import BarcodeScanner from 'react-native-scan-barcode';
import KeyEvent from 'react-native-keyevent';

// utility
import {apiUrl, Warna} from '../../utils/Data';
import {formatNumber, ToastDefault} from '../../utils/Fungsi';
import {getProfileUser} from '../../config/redux/actions/profileActions';
import {
  getAllProduk,
  getKategori,
  updateProduk,
} from '../../config/redux/actions/produkAction';

// komponen
import TextBody from '../../components/atoms/TextBody';
import TextHeading from '../../components/atoms/TextHeading';
import TextJudul from '../../components/atoms/TextJudul';
import GambarCustom from '../../components/atoms/GambarCustom';
import SideBar from '../../components/molecules/SideBar';
import Tombol from '../../components/atoms/Tombol';
import {Flow} from 'react-native-animated-spinkit';
import ModalCustom from '../../components/atoms/ModalCustom';
import LoadingComp from '../../components/atoms/LoadingComp';
import axios from 'axios';

import EmptyOrder from '../../components/molecules/EmptyOrder';
import {addKeranjang} from '../../config/redux/actions/keranjangAction';

import ItemCard from '../../components/molecules/ItemCard';
import ItemKeranjang from '../../components/molecules/ItemKeranjang';
import KategoryCard from '../../components/molecules/KategoryCard';
import Footer from '../../components/molecules/Footer';
import KasirComponent from '../../components/organism/KasirComponent';
import HeaderBar from '../../components/molecules/HeaderBar';
import KategoriComponent from '../../components/organism/KategoriComponent';
import ProdukComponent from '../../components/organism/ProdukComponent';

// Service
import Connection from '../../config/service/Connection';
import Printer from '../../config/service/Printer';
import Receipt from '../../config/service/Receipt';

const Dashboard = ({navigation}) => {
  // redux
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  // state data
  const kategori = useSelector(state => state.produk.dataKategori);
  const produk = useSelector(state => state.produk.dataProduk);
  const allProduk = useSelector(state => state.produk.allProduk);
  const [dataAllProduk, setDataAllProduk] = React.useState([]);
  const [dataAllProdukFilter, setDataAllProdukFilter] = React.useState([]);
  const [keranjang, setKeranjang] = React.useState([]);
  const dataKeranjang = useSelector(state => state.keranjang.keranjang);

  // state hasil
  const [totalHarga, setTotalHarga] = React.useState(0);
  const [diskon, setDiskon] = React.useState(0);
  const subTotalHarga = React.useMemo(() => {
    return totalHarga - diskon;
  }, []);

  // state umum
  const [textSearch, setTextSearch] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [focusSearch, setShowFocusSearch] = React.useState(false);
  const [showKasir, setShowKasir] = React.useState(true);
  const [loading2, setLoading2] = React.useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // cek service internet connection
  const [printReceipt, errorPrint] = Receipt();
  const [typeConnection, isConnected] = Connection();
  const [
    _listeners,
    device,
    setDevice,
    paireDs,
    setPaireDs,
    foundDs,
    setFoundDs,
    bleOpend,
    setBleOpend,
    loading,
    setLoading,
    boundAddress,
    setBoundAddress,
    name,
    setName,
    debugMsg,
    setDebugMsg,
    _scan,
    showModalDevice,
    setShowModalDevice,
  ] = Printer();

  const _renderRow = rows => {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: Warna.grayscale.empat,
            }}
            onPress={() => {
              setLoading(true);
              BluetoothManager.connect(row.address).then(
                s => {
                  setLoading(false);
                  boundAddress(row.address);
                  setName(row.name || 'UNKNOWN');
                  setShowModalDevice(false);
                },
                e => {
                  setLoading(false);
                  alert(e);
                  setShowModalDevice(false);
                },
              );
            }}>
            <TextBody title={row.name || 'UNKNOWN'} />
            <TextBody title={row.address} />
          </TouchableOpacity>,
        );
      }
    }
    return items;
  };

  React.useEffect(() => {
    // if you want to react to keyDown
    KeyEvent.onKeyDownListener(keyEvent => {
      alert('onKeyDown keyCode down:', JSON.stringify(keyEvent.keyCode));
      alert('Action down:', JSON.stringify(keyEvent.action));
      alert('Key down:', JSON.stringify(keyEvent.pressedKey));

      console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);
      console.log(`Key: ${keyEvent.pressedKey}`);
    });

    // if you want to react to keyUp
    KeyEvent.onKeyUpListener(keyEvent => {
      alert('onKeyUp keyCode up:', JSON.stringify(keyEvent.keyCode));
      alert('Action up:', JSON.stringify(keyEvent.action));
      alert('Key up:', JSON.stringify(keyEvent.pressedKey));
      console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);
      console.log(`Key: ${keyEvent.pressedKey}`);
    });

    // if you want to react to keyMultiple
    KeyEvent.onKeyMultipleListener(keyEvent => {
      alert(
        'onKeyMultiple keyCode multiple:',
        JSON.stringify(keyEvent.keyCode),
      );
      alert('Action multiple:', JSON.stringify(keyEvent.action));
      alert('Key multiple:', JSON.stringify(keyEvent.pressedKey));
      console.log(`onKeyMultiple keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);
      console.log(`Characters: ${keyEvent.characters}`);
    });
    return () => {
      // if you are listening to keyDown
      KeyEvent.removeKeyDownListener();

      // if you are listening to keyUp
      KeyEvent.removeKeyUpListener();

      // if you are listening to keyMultiple
      KeyEvent.removeKeyMultipleListener();
    };
  }, []);

  // use effect untuk menampilkan total harga
  React.useEffect(() => {
    const newData = keranjang.map(i => {
      return {
        ...i,
        total: i.hargaMarkup * i.jumlah,
      };
    });

    const total = newData.reduce((a, b) => a + (b.total || 0), 0);

    setTotalHarga(total);
  }, [keranjang]);

  React.useEffect(() => {
    // let isMounted = true;
    // if (isMounted) {
    getData();
    // }

    // return () => {
    //   isMounted = false;
    // };
  }, []);

  // get data user dan produk kategori
  const getData = React.useCallback(() => {
    dispatch(getProfileUser(user._id));
    dispatch(getKategori());
    dispatch(getAllProduk());
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // if (dataAllProdukFilter.length === 0) {
      setDataAllProdukFilter(allProduk);
      // }
    }
    return () => {
      isMounted = false;
    };
  }, [dataAllProdukFilter, allProduk]);

  console.log('dataAllProdukFilter.length 1', dataAllProdukFilter.length);
  console.log('allProduk.length 1', allProduk.length);

  // klik kategori untuk menampilkan list/ card produk
  const handlePressKategori = React.useCallback(item => {
    dispatch(updateProduk(item, kategori));
    // console.log('item', item.produk.length);

    // setDataProduk(item);
  }, []);

  // klik card produk untuk menambah item kedalam keranjang
  const handlePressProduk = item => {
    if (focusSearch && showKasir) {
      setShowFocusSearch(false);
      setTextSearch('');
      setDataAllProduk([]);
    } else if (focusSearch && showKasir === false) {
      // setShowFocusSearch(true);
      // setShowKasir(false);
      setShowFocusSearch(false);
      setShowKasir(true);
      setTextSearch('');
      setDataAllProduk([]);
    }
    const newItem = {
      ...item,
      jumlah: 1,
    };
    const produkExist = keranjang.find(data => data._id === item._id);

    if (produkExist !== undefined) {
      const newData = keranjang.map(data => {
        if (data._id === produkExist._id) {
          return {
            ...data,
            jumlah: data.jumlah + 1,
          };
        } else {
          return {
            ...data,
            jumlah: data.jumlah,
          };
        }
      });
      setKeranjang(newData);
    } else {
      setKeranjang(prevKeranjang => [...prevKeranjang, newItem]);
      // console.log('newItem', newItem);
    }

    console.log('keranjang 2', keranjang.length);
  };

  const handleReadBarcode = e => {
    alert('konek', e.data.JSON.stringify());
    // const dataFind = dataAllProdukFilter.find(
    //   item => item.idProduct.toUpperCase().indexOf(e.data.toUpperCase()) > -1,
    // );

    // if (dataFind) {
    //   alert('data ditemukan');
    // } else {
    //   alert('tidak ada data');
    // }

    // const newItem = {
    //   ...item,
    //   jumlah: 1,
    // };
    // const produkExist = keranjang.find(data => data._id === value._id);

    // if (produkExist !== undefined) {
    //   const newData = keranjang.map(data => {
    //     if (data._id === produkExist._id) {
    //       return {
    //         ...data,
    //         jumlah: data.jumlah + 1,
    //       };
    //     } else {
    //       return {
    //         ...data,
    //         jumlah: data.jumlah,
    //       };
    //     }
    //   });
    //   setKeranjang(newData);
    // } else {
    //   setKeranjang(prevKeranjang => [...prevKeranjang, newItem]);
    //   // console.log('newItem', newItem);
    // }
  };

  // menambah jumlah item keranjang
  const handleTambahItem = React.useCallback(
    item => {
      const produkExist = keranjang.find(data => data._id === item._id);
      if (produkExist !== undefined) {
        const newData = keranjang.map(data => {
          if (data._id === produkExist._id) {
            return {
              ...data,
              jumlah: data.jumlah + 1,
            };
          } else {
            return {
              ...data,
              jumlah: data.jumlah,
            };
          }
        });
        setKeranjang(newData);
      } else {
        setKeranjang([...keranjang]);
      }
    },
    [keranjang],
  );

  // mengurangi jumlah item keranjang
  const handleKurangItem = React.useCallback(
    item => {
      const produkExist = keranjang.find(data => data._id === item._id);
      if (produkExist !== undefined) {
        const newData = keranjang.map(data => {
          if (data._id === produkExist._id) {
            // console.log('data.jumlah', data.jumlah);
            if (data.jumlah > 1) {
              return {
                ...data,
                jumlah: data.jumlah - 1,
              };
            } else {
              ToastDefault(`jumlah item ${data.nama} sudah minimum`);
              return {
                ...data,
                jumlah: data.jumlah,
              };
            }
          } else {
            return {
              ...data,
              jumlah: data.jumlah,
            };
          }
        });
        setKeranjang(newData);
      } else {
        setKeranjang([...keranjang]);
      }
    },
    [keranjang],
  );

  // delete item keranjang
  const handleDeleteItem = React.useCallback(
    item => {
      const filterItem = keranjang.filter(data => data._id !== item._id);
      ToastDefault(`${item.nama} dihapus`);
      setKeranjang(filterItem);
    },
    [keranjang],
  );

  // submit orderan
  const handleSubmit = React.useCallback(() => {
    setShowModal(true);
  }, []);

  // konfirmasi orderan
  const handleKonfirmasi = () => {
    setLoading2(true);
    const kodePesanan = `${new Date().getTime().toString() * 4321}`;
    const dataPesanan = {
      idPesanan: `tokooffline#${new Date().getTime().toString().slice(2, 12)}`,
      kodePesanan: kodePesanan.slice(5, 11),
      item: keranjang,
      jumlah: totalHarga,
      diskon: diskon,
      totalHarga: subTotalHarga,
      type: 'offline',
    };

    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        axios
          .post(`${apiUrl}/api/pesananToko/kasir`, dataPesanan)
          .then(res => {
            // console.log('res.data', res.data);
            ToastDefault('Transaksi Berhasil');
            setLoading2(false);
            setIsConfirmed(true);
          })
          .catch(err => {
            console.log('err', err);
            ToastDefault(`Transaksi Gagal ${err}`);
            setLoading2(false);
            setIsConfirmed(true);
          });
      } else {
        dispatch(addKeranjang(dataPesanan));
        setLoading2(false);
        setIsConfirmed(true);
      }
    });
  };

  const handleOnfocusSearch = value => {
    if (value === 'kasir') {
      setShowFocusSearch(true);
      setShowKasir(false);
    } else {
      setShowFocusSearch(true);
    }
    console.log('focus');
  };

  const handleOnchangeText = React.useCallback(
    value => {
      setTextSearch(value);
    },
    [textSearch],
  );

  const handleSearch = () => {
    console.log('dataAllProdukFilter.length 2', dataAllProdukFilter.length);
    const dataFilter = dataAllProdukFilter.filter(
      item => item.nama.toUpperCase().indexOf(textSearch.toUpperCase()) > -1,
    );
    Keyboard.dismiss();
    setDataAllProduk(dataFilter);
    console.log('dataFilter', dataFilter);
  };

  const handleChangeSwitch = v => {
    setLoading(true);

    if (!v) {
      BluetoothManager.disableBluetooth().then(
        () => {
          setBleOpend(false);
          setLoading(false);
          setFoundDs([]);
          setPaireDs([]);
        },
        err => {
          alert(err);
        },
      );
    } else {
      BluetoothManager.enableBluetooth().then(
        r => {
          const paired = [];
          if (r && r.length > 0) {
            for (let i = 0; i < r.length; i++) {
              try {
                paired.push(JSON.parse(r[i]));
              } catch (e) {
                //ignore
              }
            }
          }
          setBleOpend(true);
          setLoading(false);

          setPaireDs(paired);
        },
        err => {
          // console.log('err hidupin bluetooth', err);
          setLoading(false);

          alert(err);
        },
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Warna.grayscale.empat}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        {/* Menu sidebar */}
        <SideBar />
        {/* Main/ Produk */}
        {!showKasir && (
          <View style={{width: focusSearch ? '90%' : 500, padding: 10}}>
            {/* Header Start */}
            <HeaderBar
              focusSearch={focusSearch}
              valueSearch={textSearch}
              onChangeTextSearch={value => handleOnchangeText(value)}
              onPressFocusSearch={() => handleOnfocusSearch('dashboard')}
              onPressSearch={handleSearch}
              onPressCancelSearch={() => {
                if (focusSearch && showKasir) {
                  setShowFocusSearch(false);
                  setShowKasir(false);
                  setTextSearch('');
                  setDataAllProduk([]);
                } else if (focusSearch && showKasir === false) {
                  setShowFocusSearch(false);
                  setShowKasir(true);
                  setTextSearch('');
                  setDataAllProduk([]);
                }

                Keyboard.dismiss();
              }}
            />

            {/* Header Finish */}
            {/* Kategori start */}
            {focusSearch ? null : (
              <KategoriComponent
                kategori={kategori}
                produk={produk}
                scrollY={scrollY}
                onPressKategori={item => handlePressKategori(item)}
              />
            )}

            {/* Kategori finish */}
            {/* Produk Start */}
            <Animated.ScrollView
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: false},
              )}
              showsVerticalScrollIndicator={false}>
              <TextJudul
                style={{marginTop: 10}}
                title={focusSearch ? '' : produk?.nama}
              />
              <ProdukComponent
                focusSearch={focusSearch}
                dataAllProduk={dataAllProduk}
                produk={produk}
                onPressProduk={item => handlePressProduk(item)}
              />
            </Animated.ScrollView>

            {/* Produk Finish */}
          </View>
        )}
        {/* Kasir */}
        {focusSearch === false && (
          <KasirComponent
            keranjang={keranjang}
            onPressBars={() => setShowKasir(kasir => !kasir)}
            onPressPlus={item => handleTambahItem(item)}
            onPressDelete={item => handleDeleteItem(item)}
            onPressMinus={item => handleKurangItem(item)}
            totalHarga={totalHarga}
            onPressSubmit={handleSubmit}
            showKasir={showKasir}
            focusSearch={focusSearch}
            // valueSearch={textSearch}
            onChangeTextSearch={value => handleOnchangeTextBarcode(value)}
            onPressFocusSearch={() => handleOnfocusSearch('kasir')}
            // onPressSearch={handleSearch}
          />
        )}
        <BarcodeScanner
          onBarCodeRead={handleReadBarcode}
          // style={{ flex: 1 }}
          // torchMode={this.state.torchMode}
          // cameraType={this.state.cameraType}
        />
      </View>
      {/* Footer */}
      <Footer
        isConnected={isConnected}
        typeConnection={typeConnection}
        loading={loading}
        valueSwitch={bleOpend}
        onValueChangeSwitch={v => handleChangeSwitch(v)}
        bleOpend={bleOpend}
        onPressScan={_scan}
        name={name}
        typeInternet={`koneksi : ${
          isConnected && typeConnection ? 'ONLINE' : 'tidak ada koneksi'
        }`}
      />

      <ModalCustom
        isModalVisible={showModal}
        content={
          <View
            style={{
              backgroundColor: Warna.putih,
              margin: 50,
            }}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Warna.abuAbuMuda,
              }}>
              <TextJudul title="Rincian Order" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <TextBody title="Total dibayar" />
              <TextJudul title={formatNumber(totalHarga)} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: Warna.abuAbuMuda,
                marginBottom: 10,
                borderStyle: 'dotted',
                borderRadius: 1,
              }}>
              <TextBody title="diskon" />
              <TextJudul title={formatNumber(diskon)} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <TextBody title="Subtotal" />
              <TextHeading title={formatNumber(subTotalHarga)} />
            </View>

            {loading2 ? (
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                }}>
                <LoadingComp primary />
              </View>
            ) : isConfirmed ? (
              <View
                style={{
                  padding: 10,
                  alignSelf: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Tombol
                  small
                  onPress={() => {
                    setKeranjang([]);
                    setShowModal(false);
                    setIsConfirmed(true);
                  }}
                  title="Selesai"
                />
                <Tombol
                  small
                  style={{marginLeft: 10}}
                  onPress={async () => {
                    printReceipt();
                    console.log('errorPrint', errorPrint);
                    if (errorPrint) {
                      return;
                    } else {
                      setShowModal(false);
                      setIsConfirmed(false);
                      setKeranjang([]);
                    }
                  }}
                  primary
                  title="Print"
                />
              </View>
            ) : (
              <View style={{padding: 10, alignItems: 'flex-end'}}>
                <Tombol
                  small
                  onPress={handleKonfirmasi}
                  primary
                  title="Konfirmasi"
                />
              </View>
            )}
          </View>
        }
        onBackButtonPress={() => setShowModal(false)}
      />
      <ModalCustom
        isModalVisible={showModalDevice}
        content={
          <View
            style={{
              backgroundColor: Warna.putih,
              margin: 50,
            }}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: Warna.abuAbuMuda,
              }}>
              <TextJudul title="List Device" />
            </View>
            <ScrollView>
              {_renderRow(foundDs)}
              {_renderRow(paireDs)}
            </ScrollView>
          </View>
        }
        onBackButtonPress={() => setShowModalDevice(false)}
      />
    </View>
  );
};

export default withNavigation(Dashboard);
