import {View, Text} from 'react-native';
import React from 'react';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
import {DeviceEventEmitter} from 'react-native';

const Printer = () => {
  // state printer
  const _listeners = [];
  const [device, setDevice] = React.useState(null);
  const [paireDs, setPaireDs] = React.useState([]);
  const [foundDs, setFoundDs] = React.useState([]);
  const [bleOpend, setBleOpend] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [boundAddress, setBoundAddress] = React.useState('');
  const [name, setName] = React.useState('');
  const [debugMsg, setDebugMsg] = React.useState('');
  const [showModalDevice, setShowModalDevice] = React.useState(false);

  // use Effect Bluetooth
  React.useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        setBleOpend(Boolean(enabled));
        setLoading(false);

        _listeners.push(
          DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
            rsp => {
              _deviceAlreadPaired(rsp);
            },
          ),
        );
        _listeners.push(
          DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_DEVICE_FOUND,
            rsp => {
              _deviceFoundEvent(rsp);
            },
          ),
        );
        _listeners.push(
          DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_CONNECTION_LOST,
            () => {
              setName('');
              setBoundAddress('');
            },
          ),
        );
        _listeners.push(
          DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
            () => {
              ToastAndroid.show(
                'Device Not Support Bluetooth !',
                ToastAndroid.LONG,
              );
            },
          ),
        );
      },
      err => {
        err;
      },
    );
  }, []);

  // function bluetooth
  const _deviceAlreadPaired = rsp => {
    var ds = null;
    if (typeof rsp.devices === 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {}
    }
    if (ds && ds.length) {
      let pared = paireDs;
      pared = pared.concat(ds || []);
      setPaireDs(pared);
      // this.setState({
      //     pairedDs:pared
      // });
    }
  };

  const _deviceFoundEvent = rsp => {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device === 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          setFoundDs(found);
          // this.setState({
          //     foundDs: found
          // });
        }
      }
    }
  };

  const _scan = () => {
    setLoading(true);
    // this.setState({
    //     loading: true
    // })
    BluetoothManager.scanDevices().then(
      s => {
        const ss = s;
        const found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          // console.log('error', e);
          setShowModalDevice(false);
          //ignore
        }
        const fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
        setShowModalDevice(true);
        // this.setState({
        //     foundDs:fds,
        //     loading: false
        // });
      },
      er => {
        // console.log('error 2', er);
        setLoading(false);
        setShowModalDevice(false);
        // this.setState({
        //     loading: false
        // })
        alert('error' + JSON.stringify(er));
      },
    );
  };

  return [
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
  ];
};

export default Printer;
