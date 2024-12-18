import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import colors from 'px/styles/colors';
import ShadowView from 'px/components/shadow-view';
import Demographic from 'px/components/demographic';
import styles from 'px/styles/pages/candidate-profile';
import {
  View, Text, StyleSheet, Image, ScrollView, TouchableHighlight,
  AsyncStorage, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from 'px/components/buttons';
import LOCAL_STORAGE from 'px/constants/local-storage';

export default class RepHeader extends PureComponent {
  openNewMessageForm = () => {
    const { openNewMessageForm } = this.props;
    AsyncStorage.getItem(LOCAL_STORAGE.SESSION_INFO).then(rawSession => {
      if (!!rawSession === false) {
        Alert.alert(
          'Please Log In',
          'You need to log in to send and view messages. You can log in or sign up in the settings page.',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false },
        );
      } else {
        openNewMessageForm();
      }
    }).catch(e => {
      console.log('*************************************');
      console.log(e);
      console.log('*************************************');
    });
  }
  render() {
    const { politicianData, openNewMessageForm } = this.props;
    return (
      <LinearGradient
        colors={[colors.secondary, colors.secondaryDark]}
        style={styles.header}
      >
        <HeaderBio politicianData={politicianData} />
        <HeaderStatement politicianData={politicianData} />
        <PrimaryButton
          text={'Send a Message'}
          customStyles={{
            flexGrow: 1, flexShrink: 1,
            marginTop: 20,
          }}
          onPress={this.openNewMessageForm} />
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
    const suf = !!suffix ? `, ${suffix}` : '';
    return `${firstName} ${middleName} ${lastName}${suf}`;
  }

  get image() {
    const { photoUrl } = this.props.politicianData;

    if (!!photoUrl) {
      return (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode='cover'
        />
      );
    }

    return <Ionicons name="ios-person" size={80} color={colors.secondaryDarker} />;
  }

  get title() {
    const {
      titlePrimary,
      titleSecondary
    } = this.props.politicianData;

    if (!!titleSecondary === false) {
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
        <View style={styles.repImage}>
          { this.image }
        </View>
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
    const { missionStatementStyles, politicianData } = this.props;
    let missionStatement = '';
    if (!!politicianData && !!politicianData.missionStatement) {
      missionStatement = politicianData.missionStatement;
    } else {
      missionStatement = 'This politician has not signed up to PX yet. This is where their mission statement will appear.';
    }

    return (
      <View style={[styles.missionStatement, missionStatementStyles]}>
        <Text style={styles.statementBody}>
          { missionStatement }
        </Text>
      </View>
    );
  }
}
