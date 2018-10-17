import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import Demographic from 'px/components/demographic';
import styles from 'px/styles/pages/candidate-profile';
import {
  View, Text, StyleSheet, Image, ScrollView, Animated, TouchableHighlight
} from 'react-native';

export default class RepHeader extends PureComponent {
  render() {
    return (
      <LinearGradient
        colors={[colors.backgroundPurple, colors.backgroundPurpleDarker]}
        style={styles.header}
      >
        <HeaderBio />
        <HeaderStatement />
      </LinearGradient>
    );
  }
}

// <View style={candidateProfileStyles.tabHeader}>
//   <Text style={candidateProfileStyles.tabHeaderText}>
//     David Reyes
//   </Text>
// </View>

class HeaderBio extends PureComponent {
  render() {
    // const personImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0-hgCk5RZ2_ZYfEGmGaa2kq3i-Wh-FZJVHbHXrBueWDFkdt0';
    const personImage = 'https://orig00.deviantart.net/819f/f/2018/261/e/9/screen_shot_2018_09_18_at_12_42_15_pm_by_duxfox-dcn63uc.png';
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
            David Reyes
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
    const { missionStatementStyles } = this.props;
    return (
      <Animated.View style={[styles.missionStatement, missionStatementStyles]}>
        <Text style={styles.statementBody}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
        </Text>
      </Animated.View>
    );
  }
}
