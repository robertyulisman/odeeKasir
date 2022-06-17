import {View, Text} from 'react-native';
import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const Connection = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [typeConnection, setTypeConnection] = React.useState('');

  React.useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setTypeConnection(state.type);
      Toast.show({
        type: state.isConnected ? 'info' : 'error',
        text1: state.isConnected ? 'ONLINE' : 'OFFLINE',
        text2: state.isConnected
          ? `Kembali ONLINE menngunakan ${state.type} `
          : 'kamu sedang OFFLINE',
      });
    });
  }, []);

  return [isConnected, typeConnection];
};

export default Connection;
