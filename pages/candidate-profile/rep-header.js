import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import Demographic from 'px/components/demographic';
import styles from 'px/styles/pages/candidate-profile';
import {
  View, Text, StyleSheet, Image, ScrollView, Animated, TouchableHighlight
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class RepHeader extends PureComponent {
  render() {
    const { politicianData } = this.props;
    return (
      <LinearGradient
        colors={[colors.backgroundPurple, colors.backgroundPurpleDarker]}
        style={styles.header}
      >
        <HeaderBio politicianData={politicianData} />
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
  get fullName() {
    const {
      firstName,
      middleName,
      lastName,
      suffix,
    } = this.props.politicianData;
    const suf = suffix ? `, ${suffix}` : '';
    return `${firstName} ${middleName} ${lastName}${suf}`;
  }

  get image() {
    const { firstName, lastName } = this.props.politicianData;

    if (firstName === 'Dave' && lastName === 'Reyes') {
      let personImageUrl = 'https://orig00.deviantart.net/819f/f/2018/261/e/9/screen_shot_2018_09_18_at_12_42_15_pm_by_duxfox-dcn63uc.png';
      return (
        <Image
          source={{ uri: personImageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode='cover'
        />
      );
    }

    return <Ionicons name="ios-person" size={80} color='white' />;
  }

  get title() {
    const {
      titlePrimary,
      titleSecondary
    } = this.props.politicianData;

    if (!titleSecondary) {
      return (
        <Text style={styles.repDescription}>
          { titlePrimary.toUpperCase() }
        </Text>
      );
    }

    return (
      <Text style={styles.repDescription}>
        { titlePrimary.toUpperCase() } | <Text style={styles.repDescriptionSubtitle}>
          { titleSecondary.toUpperCase() }
        </Text>
      </Text>
    )
  }

  render() {
    const {
      titlePrimary
    } = this.props.politicianData;

    return (
      <View style={styles.headerBio}>
        <ShadowView style={styles.repImage}>
          { this.image }
        </ShadowView>
        <View style={styles.headerBioText}>
          <Text style={styles.repName}>
            { this.fullName }
          </Text>
          <Text style={styles.repDescription}>
            { this.title }
          </Text>
          <HeaderDemographics politicianData={this.props.politicianData} />
        </View>
      </View>
    );
  }
}

class HeaderDemographics extends PureComponent {
  render() {
    const {
      city,
      levelOfResponsibility,
      areaOfResponsibility,
      party
    } = this.props.politicianData;
    return (
      <View style={styles.headerDemographics}>
        <View style={styles.headerDemographicsRow}>
          <Demographic label='City' value={city} white />
          {
            levelOfResponsibility === 'District' ? (
              <Demographic label='Ward' value={areaOfResponsibility} white />
            ) : <Demographic label='' value='' white />
          }
        </View>
        <View style={styles.headerDemographicsRow}>
          <Demographic label='Party' value={party} white />
          <Demographic label='' value='' white />
          {
            // <Demographic label='Years In Position' value='2' white />
          }
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
