import React from 'react';
import {StatusBar, Alert} from 'react-native';
import 'react-native-gesture-handler';
import Router from './src/config/router/Router';
import {apiUrl, Warna} from './src/utils/Data';
import {decode, encode} from 'base-64';
import Toast from 'react-native-toast-message';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {useSelector} from 'react-redux';
import axios from 'axios';
import AlertDefault from './src/components/atoms/AlertDefault';
import Permission from './src/config/service/Permission';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const App = props => {
  const {profile} = useSelector(state => state.profile);

  Permission();

  // handle error
  const reporter = error => {
    // Logic for reporting to devs
    // Example : Log issues to github issues using github apis.
    console.log('Report Error', error); // sample
    const data = {
      user: profile?._id,
      error: error,
    };
    axios
      .post(`${apiUrl}/api/errorReport/${profile._id}`, data)
      .then(res => console.log('error sended', res.data))
      .catch(err => console.log('error not sent', err));
  };

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      const data = {
        user: profile._id,
        error: `${e.name} ${e.message}`,
      };
      axios
        .post(`${apiUrl}/api/errorReport/${profile._id}`, data)
        .then(res => console.log('error sended', res.data))
        .catch(err => console.log('error not sent', err));
      reporter(e);
      Alert.alert(
        'Unexpected error occurred',
        `
          Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}
  
          We have reported this to our team ! Please close the app and start again!
          `,
        [
          {
            text: 'Close',
          },
        ],
      );
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };

  setJSExceptionHandler(errorHandler);

  setNativeExceptionHandler(errorString => {
    //You can do something like call an api to report to dev team here
    //example
    // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
    //
    const data = {
      user: profile._id,
      error: errorString,
    };
    axios
      .post(`${apiUrl}/api/errorReport/${profile._id}`, data)
      .then(res => console.log('error sended', res.data))
      .catch(err => console.log('error not sent', err));
  });
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Warna.grayscale.lima}
        barStyle="dark-content"
      />
      <Router />
      <Toast position="bottom" />
      <AlertDefault />
    </>
  );
};

export default App;
