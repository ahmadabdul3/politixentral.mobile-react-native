import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import ShadowView from 'px/components/shadow-view';
import { createStackNavigator } from 'react-navigation';
import CandidateProfile from 'px/pages/candidate-profile';
import AnimatedHeaderScroll from 'px/components/animated-header-scroll';
import { HorisontalScrollPageSection } from 'px/components/page-section';
import { ClickableContentSummaryBox } from 'px/components/content-summary-card';

import colors from 'px/styles/colors';
import styles from 'px/styles/pages/candidates';


class Candidates extends PureComponent {
  render() {
    return (
      <AnimatedHeaderScroll
        title='my officials'
        subtitle='Here are the elected individuals that currently hold office in your city and state'
      >
        <HorisontalScrollPageSection title='#8' titleSecondary='ward'>
          <CandidateSummary
            nav={this.props}
            title='alderman'
            officialName='David Reyes'
            officialLabel='ward 8'
          />
        </HorisontalScrollPageSection>
        <HorisontalScrollPageSection title='new haven' titleSecondary='city'>
          <CandidateSummary
            nav={this.props}
            title='mayor'
            officialName='Toni Harp'
            officialLabel='new haven'
          />
          <CandidateSummary
            nav={this.props}
            title='treasurer'
            officialName='Someone Else'
            officialLabel='new haven'
          />
          <CandidateSummary
            nav={this.props}
            title='othertitle'
            officialName='Another Person'
            officialLabel='new haven'
          />
        </HorisontalScrollPageSection>
        <HorisontalScrollPageSection title='ct' titleSecondary='state'>
            <CandidateSummary
              nav={this.props}
              title='representative'
              officialName='Al Paolillo'
              officialLabel='connecticut'
            />
        </HorisontalScrollPageSection>
      </AnimatedHeaderScroll>
    );
  }
}

class CandidateSummary extends PureComponent {
  goToProfile = () => {
    this.props.nav.navigation.navigate('Alder');
  }

  render() {
    const { title, officialName } = this.props;

    return (
      <ClickableContentSummaryBox
        cardTitle={title}
        onPress={this.goToProfile}
        ViewType={ShadowView}
      >
        <View style={styles.candidateSummaryBody}>
          <View style={styles.currentOfficialImage} />
          <Text style={styles.currentOfficialName}>
            { officialName }
          </Text>
        </View>
        <View style={styles.viewFullProfile}>
          <Text style={styles.viewFullProfileText}>
            { `full profile`.toUpperCase() }
          </Text>
          <SimpleLineIcons name="arrow-right-circle" size={15} color={colors.accent} />
        </View>
      </ClickableContentSummaryBox>
    );
  }
}

const nav = createStackNavigator({
  Officials: {
    screen: Candidates,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
  Alder: {
    screen: CandidateProfile,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: 'white',
    }),
  },
});

export default nav;
