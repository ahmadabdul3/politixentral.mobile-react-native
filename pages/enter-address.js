import React, { PureComponent } from 'react';
import { Text, View, Button, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import ROUTES from 'px/constants/routes';
import LOCAL_STORAGE from 'px/constants/local-storage';


export default class EnterAddress extends PureComponent {
  placeholder = '123 Main St. New Haven, CT, 06512';
  state = {
    address: '',
  };

  updateAddress = (address) => {
    this.setState({ address });
  }

  goToApp = async () => {
    const address = this.state.address.trim();
    if (!address) return;
    await AsyncStorage.setItem(LOCAL_STORAGE.ADDRESS, address);
    this.props.navigation.navigate(ROUTES.APP);
  }

  render() {
    const { address } = this.state;

    return (
      <View style={styles.enterAddressPage}>
        <Text>
          enter address
        </Text>
        <TextInput
          style={styles.addressInput}
          onChangeText={this.updateAddress}
          placeholder={this.placeholder}
          value={address}
          onSubmitEditing={this.goToApp}
        />
        <Button onPress={this.goToApp} title='go' />
      </View>
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
