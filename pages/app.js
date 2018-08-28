import React, { PureComponent } from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import City from 'px/pages/city';
import colors from 'px/styles/colors';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

class Ward extends PureComponent {
  name = 'ward';

  render() {
    return (
      <View style={styles.screen}>
        <Text>
          { this.name }
        </Text>
      </View>
    );
  }
}

class Alder extends PureComponent {
  name = 'alder';

  render() {
    return (
      <View style={styles.screen}>
        <Text>
          { this.name }
        </Text>
      </View>
    );
  }
}

export default createMaterialBottomTabNavigator({
  City: {
    screen: City,
  },
  Ward: {
    screen: Ward,
  },
  Alder: {
    screen: Alder,
  },
}, {
  tabBarPosition: 'bottom',
  lazy: true,
  activeTintColor: 'white',
  inactiveTintColor: colors.logoGreenLight,
  barStyle: {
    backgroundColor: colors.logoGreen,
  },
});

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    paddingTop: 25,
    height: '100%',
  },
});
