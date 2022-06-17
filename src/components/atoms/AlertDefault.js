import React, {Component} from 'react';
import {Modal, Text, View, StatusBar} from 'react-native';
import {Warna} from '../../utils/Data';
import GambarCustom from './GambarCustom';
import ModalCustom from './ModalCustom';
// import ModalCustom from './ModalCustom';
import TextBody from './TextBody';
import TextHeading from './TextHeading';
import Tombol from './Tombol';

export class AlertDefault extends Component {
  static myComponentInstance;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      title: '',
      type: '',
      message: '',
    };

    AlertDefault.myComponentInstance = this;
  }

  static show({title, type, message, onPress = null}) {
    AlertDefault.myComponentInstance._show(title, type, message, onPress);
  }

  static handleOnPress = () => {
    console.log('test');
  };

  _show(title, type, message, onPress) {
    this.setState({visible: true, title, type, message});
    if (onPress) {
      return (this.handleOnPress = onPress);
    }
  }
  render() {
    const {type, message, title} = this.state;
    const typeImage =
      type === 'sukses'
        ? require(`../../assets/gambar/sukses.png`)
        : type === 'error'
        ? require(`../../assets/gambar/error.png`)
        : require(`../../assets/gambar/info.png`);
    return (
      <View>
        <StatusBar backgroundColor={type === 'error' ? Warna.merah : null} />
        <ModalCustom
          isModalVisible={this.state.visible}
          content={
            <View
              style={{
                height: 250,
                backgroundColor: Warna.grayscale.lima,
                borderRadius: 10,
                // overflow: 'hidden',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <GambarCustom
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  position: 'absolute',
                  // left: -10,
                  top: -40,
                }}
                source={typeImage}
              />
              <View style={{flex: 1, marginHorizontal: 20}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextHeading
                    style={{paddingVertical: 10, marginTop: 20}}
                    title={title}
                  />
                  <TextBody style={{textAlign: 'center'}} title={message} />
                </View>
                {type !== 'info' ? (
                  <Tombol
                    style={{
                      marginVertical: 10,
                      backgroundColor:
                        type === 'error'
                          ? '#FE5050'
                          : type === 'info'
                          ? Warna.primary.satu
                          : type === 'sukses'
                          ? Warna.primary.satu
                          : null,
                    }}
                    // textStyle={{color: Warna.grayscale.lima}}
                    primary
                    title="Oke"
                    onPress={() => this.setState({visible: false, type: ''})}
                  />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {type === 'info' && (
                      <Tombol
                        textStyle={{
                          color:
                            type === 'error'
                              ? '#FE5050'
                              : type === 'info'
                              ? Warna.primary.satu
                              : type === 'sukses'
                              ? Warna.primary.satu
                              : null,
                        }}
                        style={{
                          marginVertical: 10,
                          marginRight: 10,
                          borderColor:
                            type === 'error'
                              ? '#FE5050'
                              : type === 'info'
                              ? Warna.primary.satu
                              : type === 'sukses'
                              ? Warna.primary.satu
                              : null,
                        }}
                        secondary
                        title="Batal"
                        onPress={() =>
                          this.setState({visible: false, type: ''})
                        }
                      />
                    )}

                    <Tombol
                      style={{
                        marginVertical: 10,
                        backgroundColor:
                          type === 'error'
                            ? '#FE5050'
                            : type === 'info'
                            ? Warna.primary.satu
                            : type === 'sukses'
                            ? Warna.primary.satu
                            : null,
                      }}
                      primary
                      title="Oke"
                      onPress={() => {
                        this.handleOnPress();
                        this.setState({visible: false, type: ''});
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          }
          onBackButtonPres={() => this.setState({visible: false, type: ''})}
        />
      </View>
    );
  }
}

export default AlertDefault;
