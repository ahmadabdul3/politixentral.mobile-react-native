import { createSwitchNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import EnterAddress from 'px/pages/enter-address';

function App() {
  return (
    <View>
      <Text>
        The app
      </Text>
    </View>
  );
}

export default createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: App,
    EnterAddress: EnterAddress,
  },
  {
    initialRouteName: 'EnterAddress',
  }
);
