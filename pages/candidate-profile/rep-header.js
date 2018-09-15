import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import Demographic from 'px/components/demographic';
import styles from 'px/styles/pages/candidate-profile';
import {
  View, Text, StyleSheet, Image, ScrollView
} from 'react-native';

export default class RepHeader extends PureComponent {
  render() {
    return (
      <LinearGradient
        colors={[ colors.brandPurpleDark, colors.brandPurple ]}
        style={styles.header}
      >
        <HeaderBio />
        <HeaderStatement />
      </LinearGradient>
    );
  }
}

class HeaderBio extends PureComponent {
  render() {
    const personImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0-hgCk5RZ2_ZYfEGmGaa2kq3i-Wh-FZJVHbHXrBueWDFkdt0';

    return (
      <View style={styles.headerBio}>
        <ShadowView style={styles.repImage}>
          <Image
            source={{ uri: personImage }}
            style={{ width: '100%', height: '100%' }}
            resizeMode='cover'
          />
        </ShadowView>
        <View style={styles.headerBioText}>
          <Text style={styles.repName}>
            Aaron Greenberg
          </Text>
          <Text style={styles.repDescription}>
            {`Alderman`.toUpperCase()}
          </Text>
          <HeaderDemographics />
        </View>
      </View>
    );
  }
}

class HeaderDemographics extends PureComponent {
  render() {
    return (
      <View style={styles.headerDemographics}>
        <View style={styles.headerDemographicsRow}>
          <Demographic label='City' value='New Haven' white />
          <Demographic label='Ward' value='8' white />
        </View>
        <View style={styles.headerDemographicsRow}>
          <Demographic label='Party' value='Democratic' white />
          <Demographic label='Years In Position' value='2' white />
        </View>
      </View>
    );
  }
}

class HeaderStatement extends PureComponent {
  render() {
    return (
      <View style={styles.missionStatement}>
        <Text style={styles.statementBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
        </Text>
      </View>
    );
  }
}
