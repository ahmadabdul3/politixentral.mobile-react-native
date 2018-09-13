import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import Demographic from 'px/components/demographic';
import candidateProfileStyles from 'px/styles/pages/candidate-profile';
import {
  View, Text, StyleSheet, Image, ScrollView
} from 'react-native';

export default class RepHeader extends PureComponent {
  render() {
    const personImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0-hgCk5RZ2_ZYfEGmGaa2kq3i-Wh-FZJVHbHXrBueWDFkdt0';

    return (
      <LinearGradient
        colors={[ colors.brandPurpleDark, colors.brandPurple, colors.brandBlueOffPurple ]}
        style={candidateProfileStyles.header}
      >
        <ShadowView style={candidateProfileStyles.repImage}>
          <Image
            source={{ uri: personImage }}
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </ShadowView>
        <Text style={candidateProfileStyles.repName}>
          Aaron Greenberg
        </Text>
        <Text style={candidateProfileStyles.repDescription}>
          {`Alderman`.toUpperCase()}
        </Text>
        <HeaderDemographics />
      </LinearGradient>
    );
  }
}

class HeaderDemographics extends PureComponent {
  render() {
    return (
      <View style={candidateProfileStyles.headerDemographics}>
        <View style={candidateProfileStyles.headerDemographicsSeperator} />
        <View style={candidateProfileStyles.headerDemographicsRow}>
          <Demographic label='City' value='New Haven' white />
          <Demographic label='Ward' value='8' white />
        </View>
        <View style={candidateProfileStyles.headerDemographicsRow}>
          <Demographic label='Party' value='Democratic' white />
          <Demographic label='Years In Position' value='2' white />
        </View>
      </View>
    );
  }
}
