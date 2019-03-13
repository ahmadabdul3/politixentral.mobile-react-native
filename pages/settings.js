import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import colors from 'px/styles/colors';
import LOCAL_STORAGE from 'px/constants/local-storage';
import http from 'px/services/http';
import {
  TextInput,
  Text, View, ScrollView, Image, TouchableHighlight, AsyncStorage, Button,
  TouchableOpacity
} from 'react-native';
import { PrimaryButton, SecondaryButton } from 'px/components/buttons';

class Settings extends PureComponent {
  state = {
    addressData: '',
    address: '',
    changeAddressInProgress: false,
    newAddress: '',
    error: '',
    changeAddressSaving: false,
  };

  componentDidMount() {
    this.getAddress().then(() => {}).catch(e => console.log(e));
  }

  beginChangeAddress = () => {
    this.setState({ changeAddressInProgress: true });
  };

  getAddress = async () => {
    try {
      const addressDataRaw = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS_INFO);
      const addressData = JSON.parse(addressDataRaw);
      const address = this.buildAddress({ addressData });
      if (address) this.setState({ address, addressData });
      // return true;
    } catch (exception) {
      // return false;
    }
  };

  buildAddress({ addressData }) {
    if (!addressData.streetName) return addressData.address;

    const { streetNumber, streetName, city, state } = addressData;
    return `${streetNumber} ${streetName}, ${city}, ${state}`;
  }

  updateNewAddress = (newAddress) => {
    this.setState({ newAddress });
  }

  submitUpdateAddress = async () => {
    const { setAddress } = this.props;
    const address = this.state.newAddress.trim();
    if (!address) return;

    this.setState({ changeAddressSaving: true });
    try {
      const url = 'http://px-staging.herokuapp.com/address-info?address=' + address;
      let res = await http.get(url);
      console.log('RESPONSE', res);
      const data = { ...res.data };
      const builtAddress = this.buildAddress({ addressData: data });
      data.address = builtAddress;
      await AsyncStorage.setItem(LOCAL_STORAGE.ADDRESS_INFO, JSON.stringify(data));
      setAddress({ address: builtAddress });
      this.setState({
        address: builtAddress,
        newAddress: '',
        changeAddressInProgress: false,
        changeAddressSaving: false,
      });
    } catch (e) {
      console.log('error', e);
      this.setState({
        error: 'There was an error, please try again',
        changeAddressSaving: false,
      });
    }
  }

  cancelUpdateAddress = () => {
    this.setState({ newAddress: '', changeAddressInProgress: false });
  }

  render() {
    const {
      address,
      newAddress,
      changeAddressInProgress,
      error,
      changeAddressSaving,
    } = this.state;

    return (
      <View style={{ paddingRight: 15, paddingLeft: 15, paddingTop: 20, paddingBottom: 20 }}>
        <Address address={address} beginChangeAddress={this.beginChangeAddress} />
        {
          changeAddressInProgress ?
            <NewAddressForm
              newAddress={newAddress}
              updateNewAddress={this.updateNewAddress}
              submitUpdateAddress={this.submitUpdateAddress}
              cancelUpdateAddress={this.cancelUpdateAddress}
              error={error}
              loading={changeAddressSaving} />
            : null
        }
      </View>
    );
  }
}

class NewAddressForm extends PureComponent {
  addressInput;

  componentDidMount() {
    setTimeout(() => {
      this.addressInput.focus();
    }, 100);
  }

  render() {
    const {
      newAddress,
      updateNewAddress,
      submitUpdateAddress,
      cancelUpdateAddress,
      error,
      loading,
    } = this.props;

    return (
      <View>
        <TextInput
          value={newAddress}
          onChangeText={updateNewAddress}
          placeholder='New Address'
          style={{
            height: 40,
            borderColor: colors.backgroundGrayDarker,
            borderRadius: 3,
            backgroundColor: 'white',
            borderWidth: 1,
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 10,
          }}
          ref={(r) => { this.addressInput = r; }}
        />
        {
          error ? (
            <Text style={{ marginTop: 5, textAlign: 'center' }}>{ error }</Text>
          ) : null
        }
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <SecondaryButton
            text='Cancel'
            onPress={cancelUpdateAddress}
            customStyles={{ marginRight: 3 }} />
          <PrimaryButton
            text='Update'
            onPress={submitUpdateAddress}
            customStyles={{ marginLeft: 3 }}
            loading={loading} />
        </View>
      </View>
    );
  }
}

class Address extends PureComponent {
  render() {
    const { address, beginChangeAddress } = this.props;
    return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.textColor }}>
          Current Address
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'flex-start' }}>
          <View style={{ flexGrow: 1, flexShrink: 1, paddingTop: 5 }}>
            <Text>{ address || "Cannot determine your address" }</Text>
          </View>
          <TouchableOpacity
            onPress={beginChangeAddress}
            style={{
              flexGrow: 0,
              flexShrink: 0,
              padding: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Text style={{
              flexGrow: 0,
              flexShrink: 0,
              fontSize: 14,
              color: colors.secondary,
              marginLeft: 10,
            }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class CandidatesNav extends PureComponent {
  render() {
    const { address, setAddress, navigation } = this.props;
    const Nav = createStackNavigator({
      Home: {
        screen: (props) => {
          const { address, setAddress } = props.screenProps;
          return <Settings address={address} setAddress={setAddress} />;
        },
        navigationOptions: ({ navigation }) => ({
          // title: `${navigation.state.params.name}'s Profile'`,
          title: 'POLITIXENTRAL',
          headerStyle: {
            backgroundColor: colors.secondary,
            borderBottomColor: colors.secondaryLight,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }),
      },
    });
    return <Nav screenProps={{ address, setAddress }} />;
  }
}
