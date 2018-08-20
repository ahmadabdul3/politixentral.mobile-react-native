import React, { PureComponent } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
} from 'react-native';
import EnterAddress from 'px/pages/enter-address';
import LOCAL_STORAGE from 'px/constants/local-storage';
import ROUTES from'px/constants/routes';

export default class Router extends PureComponent {
    render() {
      const Comp = createSwitchNavigator(
        {
          Loading: LoadingScreen,
          App: App,
          EnterAddress: EnterAddress,
        },
        {
          initialRouteName: 'EnterAddress',
        }
      );

      return <Comp />
    }
}

function App() {
  return (
    <View style={styles.app}>
      <Text>
        The app
      </Text>
    </View>
  );
}

class LoadingScreen extends PureComponent {
  constructor(props) {
    super(props);
    this._checkAddressPresence();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _checkAddressPresence = async () => {
    const address = await AsyncStorage.getItem(LOCAL_STORAGE.ADDRESS);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const route = address ? ROUTES.APP : ROUTES.ENTER_ADDRESS;
    this.props.navigation.navigate(route);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Text> Loading </Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    paddingTop: 30,
  },
});
