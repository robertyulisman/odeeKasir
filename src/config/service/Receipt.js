import {View, Text} from 'react-native';
import React from 'react';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';

const Receipt = () => {
  const [errorPrint, setErrorPrint] = React.useState(false);

  const printReceipt = async () => {
    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText('Print Receipt\r\n', {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 2,
        heigthtimes: 2,
        fonttype: 1,
      });
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText('Test 1\r\n', {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
      });
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT,
      );
      await BluetoothEscposPrinter.printText('AA : aaa\r\n', {});
      await BluetoothEscposPrinter.printText('BB ：xsd201909210000001\r\n', {});

      await BluetoothEscposPrinter.printText('Telp : ：18664896621\r\n', {});
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      let columnWidths = [12, 6, 6, 8];
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['AA', 'BB', 'CC', 'DD'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['React-NativeTest', '1', '32000', '32000'],
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printColumn(
        columnWidths,
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.CENTER,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['React-NativeTest2', '1', '32000', '32000'],
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [12, 8, 12],
        [
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.LEFT,
          BluetoothEscposPrinter.ALIGN.RIGHT,
        ],
        ['DD', '2', '64000'],
        {},
      );
      await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printText('Persen ：100%\r\n', {});
      await BluetoothEscposPrinter.printText('Price ：64000.00\r\n', {});
      await BluetoothEscposPrinter.printText('Discon ：0.00\r\n', {});
      await BluetoothEscposPrinter.printText('Return ：0.00\r\n', {});
      await BluetoothEscposPrinter.printText('Pop ice ：64000.00\r\n', {});
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printText('Rp ：\r\n', {});
      await BluetoothEscposPrinter.printText('Rp :\r\n\r\n', {});
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printText('Thanks\r\n\r\n\r\n', {});
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT,
      );
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    } catch (e) {
      console.log('e.message =======================>', e.message);
      setErrorPrint(true);
      alert(e.message || 'ERROR');
    }
  };

  return [printReceipt, errorPrint];
};

export default Receipt;
