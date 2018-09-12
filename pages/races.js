import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View } from 'react-native';
import racesStyles from 'px/styles/pages/races';

export default class Races extends PureComponent {
  render() {
    return (
      <View style={racesStyles.screen}>
        <LinearGradient
          colors={['#623CEA', '#623CEA']}
          style={racesStyles.header}
        >

          <Text style={racesStyles.headerTitle}>hi</Text>
        </LinearGradient>
      </View>
    );
  }
}
