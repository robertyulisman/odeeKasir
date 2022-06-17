import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import Tombol from '../../components/atoms/Tombol';
import {loginUser} from '../../config/redux/actions/authAction';
import {Warna} from '../../utils/Data';
import TombolBack from '../../components/atoms/TombolBack';
import LoadingComp from '../../components/atoms/LoadingComp';
import TextHeading from '../../components/atoms/TextHeading';
import InputCustom from '../../components/molecules/InputCustom';
import TextBody from '../../components/atoms/TextBody';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {auth, errors} = useSelector(state => state);
  // const {errors} = useSelector(state => state);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLanjut, setIsLanjut] = useState(false);
  const handleOnChange = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      // console.log('oke, silahkan login');
      setLoading(false);
      setForm({
        email: '',
        password: '',
      });
      navigation.navigate('Dashboard');
    }
    if (errors) {
      console.log('errors', errors);
      setError(errors);
      setLoading(false);
    }
    // if (errors.noHp === 'User tidak ditemukan') {
    //   console.log('errrooor', errors);
    //   setLoading(false);
    //   setTimeout(() => {
    //     setForm({
    //       ...form,
    //       pin: '',
    //     });
    //     setIsLanjut(false);
    //   }, 2000);
    // } else if (errors.pin === 'Pin Salah') {
    setLoading(false);
    // }
  }, [auth.isAuthenticated, errors]);

  const handleSubmit = () => {
    setLoading(true);
    console.log('form', form);
    dispatch(loginUser(form));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Warna.grayscale.lima,
      }}>
      <ScrollView
        contentContainerStyle={{
          marginBottom: 20,
          width: 500,
          alignSelf: 'center',
        }}>
        <TombolBack />

        <TextBody
          style={{marginTop: 20, marginVertical: 10}}
          title={'Selamat Datang kembali,'}
        />
        <TextHeading title={'ADMIN KASIR'} />
        {/* <GambarCustom
          style={{width: '100%', height: 200}}
          source={require('../../assets/gambar/login.png')}
        /> */}

        <View style={{marginHorizontal: 20}}>
          <InputCustom
            value={form.email}
            onChangeText={value => handleOnChange(value, 'email')}
            error={error?.email}
            errorText={error?.email}
            placeholder="Masukkan Email"
            keyboardType="email-address"
            label="Email"
            onFocus={() => setError(null)}
          />
          <InputCustom
            value={form.password}
            onChangeText={value => handleOnChange(value, 'password')}
            error={error?.password}
            errorText={error?.password}
            placeholder="Masukkan Password"
            keyboardType="email-address"
            secureTextEntry={true}
            label="Password"
            onFocus={() => setError(null)}
          />
        </View>

        {loading ? (
          <LoadingComp primary />
        ) : (
          <>
            <Tombol
              style={{marginHorizontal: 20, marginTop: 20, marginBottom: 20}}
              primary
              title={'Masuk'}
              onPress={handleSubmit}
            />

            {/* <FooterAuth
              rightText={'Silahkan Hubungi Admin'}
              leftText={'Belum punya Akun ?'}
              onPress={() => {}}
            /> */}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default withNavigation(Login);
