import React, { PureComponent } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import EnterAddress from 'px/pages/enter-address';
import App from 'px/pages/app';
import LOCAL_STORAGE from 'px/constants/local-storage';
import ROUTES from'px/constants/routes';
import {
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';

export default class Router extends PureComponent {
    render() {
      const Comp = createSwitchNavigator(
        {
          Loading: LoadingScreen,
          App: App,
          EnterAddress: EnterAddress,
        },
        {
          initialRouteName: 'Loading',
        }
      );

      return <Comp />;
    }
}

class LoadingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.checkAddressPresence();
  }

  // Fetch the token from storage then navigate to our appropriate place
  checkAddressPresence = async () => {
    const addressInfo = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS_INFO);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const route = addressInfo ? ROUTES.APP : ROUTES.ENTER_ADDRESS;
    this.props.navigation.navigate(route);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Text> Loading </Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
