import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import colors from 'px/styles/colors';
import LOCAL_STORAGE from 'px/constants/local-storage';
import http from 'px/services/http';
import jwtDecode from 'jwt-decode';
import {
  TextInput,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  AsyncStorage,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { PrimaryButton, SecondaryButton } from 'px/components/buttons';
import {
  PageTitlePrimary,
  PageDescription,
  PageHeader,
  PageHeaderLargeTop,
  SectionTitlePrimary
} from 'px/components/page-text';
import { BaseInput } from 'px/components/inputs';
import { authenticate, saveUserToServer, logout } from 'px/services/auth';
import SocialMediaIcons from 'px/components/social_media_icons';
import {
  determinePushNotificationPermission,
  getDeviceId
} from 'px/services/push_notification_permissions';
import AlertAsync from 'px/services/alert_async';
import LinkText from 'px/components/link_text';

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
      if (!!addressData) newState = { ...addressData };
      return this.getSession();
    }).then(sessionData => {
      if (!!sessionData) newState.sessionData = sessionData;
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
    let fullAddress = '';
    let streetNameAdded = false;
    let cityStateAdded = false;

    if (!!addressData.streetName) {
      streetNameAdded = true;
      fullAddress += addressData.streetName;
    }

    if (!!addressData.streetNumber) fullAddress = addressData.streetNumber + ' ' + fullAddress;

    if (!!addressData.city && !!addressData.state) {
      cityStateAdded = true;
      if (streetNameAdded) fullAddress += ', ';
      fullAddress += addressData.city + ', ' + addressData.state;
    }

    if (cityStateAdded) return fullAddress;
    else return addressData.address;
  }

  updateNewAddress = (newAddress) => {
    this.setState({ newAddress });
  };

  submitUpdateAddress = async () => {
    const { setAddress } = this.props;
    const address = this.state.newAddress.trim();
    if (!!address === false) return;

    this.setState({ changeAddressSaving: true });
    try {
      const url = 'http://px-staging.herokuapp.com/address-info?address=' + address;
      let res = await http.get(url);
      console.log('RESPONSE', res);
      const data = { ...res.data };
      const builtAddress = this.buildAddress({ addressData: data });
      data.address = builtAddress;
      if (data.city !== 'New Haven') {
        await AlertAsync(
          'City not on PX',
          `${data.city}, ${data.state} is not partnered with PX, but that's ok.`
            + ` We will show you information for New Haven, CT instead.`,
          [{ text: 'Ok', onPress: () => {} }]
        );
      }
      await AsyncStorage.setItem(LOCAL_STORAGE.ADDRESS_INFO, JSON.stringify(data));
      setAddress({ address: builtAddress });
      this.setState({
        addressData: data,
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
      addressData,
      changeAddressInProgress,
      error,
      changeAddressSaving,
      sessionData,
    } = this.state;

    return (
      <View style={{
        height: '100%',
      }}>
        <ScrollView
          style={{
            paddingRight: 15,
            paddingLeft: 15,
            paddingTop: 20,
            paddingBottom: 20,
            flexGrow: 1,
            flexShrink: 1,
          }}>
          <Address address={address} beginChangeAddress={this.beginChangeAddress} />
          {
            addressData.city !== 'New Haven' ? (
              <View style={{
                marginTop: 5,
              }}>
                <Text>
                  {
                    `${addressData.city}, ${addressData.state} is not partnered with PX, but that's ok. We are showing you information for New Haven, CT instead. If you'd like your city to be on PX you can send us an email or message us on any of our social media pages (listed below), thanks!`
                  }
                </Text>
              </View>
            ) : null
          }
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
          <View style={{ marginTop: 30 }}>
            <SectionTitlePrimary text='Voter Registration' />
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <LinkText
                text='Click here'
                link='https://vote.gov/'
                styles={{ marginTop: 10, marginRight: 4, }} />
              <Text>
                to easily register to vote online.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexGrow: 0,
            flexShrink: 0,
            borderTopWidth: 1,
            borderTopColor: colors.backgroundGrayDarker,
            paddingRight: 15,
            paddingLeft: 15,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: colors.backgroundColor,
          }}>
          <SectionTitlePrimary
            text='Connect with us and send us feedback!'
            extraStyles={{ textAlign: 'center', width: '100%', marginBottom: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <SocialMediaIcons />
            <View>
              <Authentication
                sessionExists={sessionData}
                deleteSession={this.deleteSession}
                addSession={this.addSession}
              />
            </View>
          </View>
          <Text style={{
            marginTop: 15,
            textAlign: 'center',
            color: colors.textColor,
          }}>
            © 2019 PolitiXentral
          </Text>
        </View>
      </View>
    );
  }
}

class Authentication extends PureComponent {
  loginWithAuth0 = async (options) => {
    try {
      const response = await authenticate();
      const { jsonSessionInfo, result } = response;
      const pushNotificationPermission = await determinePushNotificationPermission();
      let deviceId;
      // console.log('push notification permission status', pushNotificationPermission);
      if (pushNotificationPermission === 'granted') deviceId = await getDeviceId();
      // console.log('got device id', deviceId);
      const userResponse = await saveUserToServer({ params: result.params, deviceId });
      const newUser = userResponse.user;
      await AsyncStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(newUser));
      this.props.addSession(jsonSessionInfo);
    } catch (e) {
      console.log('*** ERROR: ****************', e);
    }
  };

  logoutAuth0 = async () => {
    try {
      await logout();
      this.props.deleteSession();
    } catch (e) {
      console.log('error', e);
    }
  };

  render() {
    const { sessionExists } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        {
          !!sessionExists ? (
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
          !!error ? (
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
        <SectionTitlePrimary text='Current Address' />
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
