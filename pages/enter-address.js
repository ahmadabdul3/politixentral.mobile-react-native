import React, { PureComponent } from 'react';
import {
  Text, View, Button, TextInput, StyleSheet, AsyncStorage, ScrollView
} from 'react-native';
import ROUTES from 'px/constants/routes';
import LOCAL_STORAGE from 'px/constants/local-storage';
import http from 'px/services/http';
import colors from 'px/styles/colors';
import { PrimaryButton } from 'px/components/buttons';
import { PageTitlePrimary, PageDescription } from 'px/components/page-text';
import AlertAsync from 'px/services/alert_async';


export default class EnterAddress extends PureComponent {
  placeholder = '123 Main St. New Haven';
  state = {
    address: '',
    error: '',
    loading: false,
  };

  updateAddress = (address) => {
    this.setState({ address });
  }

  goToApp = async () => {
    const address = this.state.address.trim();
    if (!!address === false) {
      this.setState({ error: 'Please enter an address.' });
      return;
    }
    try {
      this.setState({ loading: true });
      const url = 'http://px-staging.herokuapp.com/address-info?address=' + address;
      let res = await http.get(url);
      const data = { ...res.data };
      data.address = address;
      if (data.city !== 'New Haven') {
        await AlertAsync(
          'City not on PX',
          `${data.city}, ${data.state} is not partnered with PX, but that's ok.`
            + ` We will show you information for New Haven, CT instead.`,
          [{ text: 'Ok', onPress: () => {} }]
        );
      }
      await AsyncStorage.setItem(LOCAL_STORAGE.ADDRESS_INFO, JSON.stringify(data));
      this.setState({ loading: false });
      this.props.navigation.navigate(ROUTES.APP);
    } catch (e) {
      this.setState({ loading: false });
      console.log('error', e);
      this.setState({ error: 'There was an error, please try again' });
    }
  }

  render() {
    const { address, error } = this.state;

    return (
      <ScrollView style={{ backgroundColor: colors.secondary }}>
        <View style={[
          styles.enterAddressPage,
          {
            paddingTop: 100,
            paddingRight: 20,
            paddingLeft: 20,
          }
        ]}>
          <View style={{
            alignItems: 'flex-start',
            marginBottom: 50,
          }}>
            <PageTitlePrimary text='Welcome to PolitiXentral' customStyles={{
              paddingRight: 0,
              paddingLeft: 0
            }} />
            <PageDescription
            text='Please enter your address to get started. This will allow the app to find the elected officials that represent you.'
            customStyles={{
              paddingRight: 0,
              paddingLeft: 0
            }} />
          </View>
          <TextInput
            style={[
              styles.addressInput,
              {
                backgroundColor: 'white',
                borderWidth: 0,
              }
            ]}
            onChangeText={this.updateAddress}
            placeholder={this.placeholder}
            value={address}
            onSubmitEditing={this.goToApp}
            underlineColorAndroid='transparent'
          />
          {
            !!error ? (
              <Text style={{ color: 'white', marginTop: 10 }}>
                { error }
              </Text>
            ) : null
          }
          <PrimaryButton
            onPress={this.goToApp}
            customStyles={{
              backgroundColor: colors.primary,
              marginTop: 15,
            }}
            text='Continue to PX'
            loading={this.state.loading} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  enterAddressPage: {
    height: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  }
});
