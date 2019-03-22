import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import { AuthSession } from 'expo';
import colors from 'px/styles/colors';
import LOCAL_STORAGE from 'px/constants/local-storage';
import http from 'px/services/http';
import jwtDecode from 'jwt-decode';
import {
  TextInput,
  Text, View, ScrollView, Image, TouchableHighlight, AsyncStorage, Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { PrimaryButton, SecondaryButton } from 'px/components/buttons';
import {
  PageTitlePrimary, PageDescription, PageHeader, PageHeaderLargeTop
} from 'px/components/page-text';
import { BaseInput } from 'px/components/inputs';
import queryString from 'query-string';

class Settings extends PureComponent {
  state = {
    addressData: '',
    address: '',
    changeAddressInProgress: false,
    newAddress: '',
    error: '',
    changeAddressSaving: false,
    sessionData: '',
  };

  componentDidMount() {
    let newState = {};
    this.getAddress().then(addressData => {
      if (addressData) newState = { ...addressData };
      return this.getSession();
    }).then(sessionData => {
      if (sessionData) newState.sessionData = sessionData;
      this.setState(newState);
    }).catch(e => {
        console.log('ERROR: ', e);
    });
  }

  beginChangeAddress = () => {
    this.setState({ changeAddressInProgress: true });
  };

  getSession = async () => {
    const sessionRawData = await AsyncStorage.getItem(LOCAL_STORAGE.SESSION_INFO);
    return sessionRawData;
    // const userInfo = await AsyncStorage.getItem(LOCAL_STORAGE.USER_INFO);
    // if (!sessionRawData) return;
    // const sessionData = JSON.parse(sessionRawData);
    // const idToken = sessionData.id_token;
    // const decoded = jwtDecode(idToken);
  };

  getAddress = async () => {
    const addressDataRaw = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS_INFO);
    const addressData = JSON.parse(addressDataRaw);
    return {
      address: this.buildAddress({ addressData }),
      addressData,
    };
  };

  buildAddress({ addressData }) {
    if (!addressData.streetName) return addressData.address;

    const { streetNumber, streetName, city, state } = addressData;
    return `${streetNumber} ${streetName}, ${city}, ${state}`;
  }

  updateNewAddress = (newAddress) => {
    this.setState({ newAddress });
  };

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
  };

  cancelUpdateAddress = () => {
    this.setState({ newAddress: '', changeAddressInProgress: false });
  };

  deleteSession = () => {
    this.setState({ sessionData: '' });
  };

  addSession = (sessionData) => {
    this.setState({ sessionData });
  };

  render() {
    const {
      address,
      newAddress,
      changeAddressInProgress,
      error,
      changeAddressSaving,
      sessionData,
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
        <Authentication
          sessionExists={sessionData}
          deleteSession={this.deleteSession}
          addSession={this.addSession}
        />
      </View>
    );
  }
}

class Authentication extends PureComponent {
  loginWithAuth0 = async () => {
    const auth0Domain = `https://politixentral.auth0.com`;
    const auth0ClientId = 'M8vNnfxiQPCk44riCwcVPQY79GmNUej_';

    const redirectUrl = AuthSession.getRedirectUrl();
    const authUrl = `${auth0Domain}/authorize?` + queryString.stringify({
      client_id: auth0ClientId,
      response_type: 'token id_token',
      redirect_uri: redirectUrl,
      scope: 'openid email',
      audience: 'https://data-api.politixentral.com',
      nonce: 'xyz-123-px-pass-SecRetz__werd_complex',
    });
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({
      authUrl: authUrl
    });

    if (result.type === 'success') {
      const sessionInfo = JSON.stringify(result.params);
      await AsyncStorage.setItem(LOCAL_STORAGE.SESSION_INFO, sessionInfo);
      this.props.addSession(sessionInfo);
      this.saveUserToServer(result.params);
    }
  };

  async saveUserToServer(params) {
    const idToken = params.id_token;
    const decoded = jwtDecode(idToken);
    const user = {
      email: decoded.email,
      auth0Id: decoded.sub,
      role: 'end-user',
    };
    try {
      const newUser = await http.post('http://px-staging.herokuapp.com/users', { user });
      await AsyncStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(newUser));
    } catch (e) {
      console.log('error', e);
    }
  }

  logoutAuth0 = async () => {
    const auth0Domain = `https://politixentral.auth0.com`;
    const auth0ClientId = 'M8vNnfxiQPCk44riCwcVPQY79GmNUej_';

    const redirectUrl = AuthSession.getRedirectUrl();
    const authUrl = `${auth0Domain}/v2/logout?` + queryString.stringify({
      client_id: auth0ClientId,
      returnTo: redirectUrl,
    });
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({
      authUrl: authUrl
    });

    if (result.type === 'success') {
      await AsyncStorage.setItem(LOCAL_STORAGE.SESSION_INFO, '');
      await AsyncStorage.setItem(LOCAL_STORAGE.USER_INFO, '');
      this.props.deleteSession();
    }
  };

  render() {
    const { sessionExists } = this.props;
    return (
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        {
          sessionExists ? (
            <SecondaryButton
              text='Log Out'
              customStyles={{ flexGrow: 1, flexShrink: 1 }}
              onPress={this.logoutAuth0} />
          ) : (
            <PrimaryButton
              text='Log In or Sign Up'
              customStyles={{ flexGrow: 1, flexShrink: 1 }}
              onPress={this.loginWithAuth0} />
          )
        }
      </View>
    )
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
        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'flex-start' }}>
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

export default class SettingsNav extends PureComponent {
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


class LoginModal extends PureComponent {
  render() {
    const { visible, closeModal } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View>
          <PageHeaderLargeTop>
            <PageTitlePrimary>
              WELCOME BACK
            </PageTitlePrimary>
            <PageDescription>
              Log In to enjoy the full app experience
            </PageDescription>
          </PageHeaderLargeTop>
          <View style={{ padding: 20, paddingRight: 15, paddingLeft: 15 }}>
            <BaseInput placeholder='Email' />
            <BaseInput placeholder='Password' />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
              <SecondaryButton
                onPress={closeModal}
                customStyles={{ marginRight: 3 }}
                text='Cancel' />
              <PrimaryButton
                onPress={() => {}}
                customStyles={{ marginLeft: 3 }}
                text='Log In' />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
