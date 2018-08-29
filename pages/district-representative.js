import React, { PureComponent } from 'react';
import districtRepStyles from 'px/styles/pages/district-representative';
import ShadowView from 'px/components/shadow-view';
import EventCard from 'px/components/event-card';
import Demographic from 'px/components/demographic';
import InitiativeSummary from 'px/components/initiative-summary';
import {
  View, Text, StyleSheet, Image, ScrollView
} from 'react-native';

export default class DistrictRepresentative extends PureComponent {
  name = 'Alder';


  render() {
    const personImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0-hgCk5RZ2_ZYfEGmGaa2kq3i-Wh-FZJVHbHXrBueWDFkdt0';

    return (
      <View style={districtRepStyles.screen}>
        <View style={districtRepStyles.header}>
          <ShadowView style={districtRepStyles.repImage}>
            <Image
              source={{ uri: personImage }}
              style={{ width: '100%', height: '100%' }}
              resizeMode='cover'
            />
          </ShadowView>
          <Text style={districtRepStyles.repName}>
            Aaron Greenberg
          </Text>
          <Text style={districtRepStyles.repDescription}>
            Ut enim ad minim veniam
          </Text>
          <View style={districtRepStyles.headerDemographics}>
            <Demographic label='City' value='New Haven' white />
            <Demographic label='Ward' value='8' white />
          </View>
        </View>
        <RepAbout />
        <Text style={districtRepStyles.bodyTitle}>
          Initiatives
        </Text>
        <ScrollView>
          <InitiativeSummary title='Pave roads' />
          <InitiativeSummary title='Increase something' />
          <InitiativeSummary title='Other initiative' />
        </ScrollView>
      </View>
    );
  }
}

class RepAbout extends PureComponent {
  render() {
    const desc = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat';

    return (
      <View style={districtRepStyles.repAbout}>
        <EventCard title='About' description={desc} />
      </View>
    );
  }
}
