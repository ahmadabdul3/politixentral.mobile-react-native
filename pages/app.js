import React, { PureComponent } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import City from 'px/pages/city';
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

export default createMaterialTopTabNavigator({
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
});

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    paddingTop: 25,
    height: '100%',
  },
});
