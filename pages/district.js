import React, { PureComponent } from 'react';
import ScaledImage from 'px/components/scaled-image';
import cityStyles from 'px/styles/pages/district';
import colors from 'px/styles/colors';
import EventCard from 'px/components/event-card';
import Demographic from 'px/components/demographic';
import { createMaterialTopTabNavigator } from 'react-navigation';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

export default class District extends PureComponent {
  name = 'Ward 8';

  render() {
    // const cityUrl = 'https://c1.staticflickr.com/4/3718/10819859084_6a7ed932a0_b.jpg';
    // const cityUrl = 'https://a1.r9cdn.net/rimg/dimg/ec/ed/84fcf3f7-city-14151-54f1cc6c.jpg?crop=true&width=1440&height=557&xhint=1736&yhint=2468';
    const cityUrl = 'https://pre00.deviantart.net/8392/th/pre/i/2018/240/d/4/new_haven_wards_by_duxfox-dclefw1.png';

    return (
      <View style={cityStyles.screen}>
        <View style={cityStyles.header}>
          <ScaledImage
            fullWidth
            maxHeight={250}
            uri={cityUrl}
          />
          <Text
            textShadowColor='black'
            textShadowOpacity={0.2}
            textShadowOffset={{ width: 1, height: 3 }}
            style={cityStyles.headerTitle}
          >
            { this.name }
          </Text>
        </View>
        <CityTabs />
      </View>
    );
  }
}

class CityHome extends PureComponent {
  render() {
    return (
      <ScrollView style={cityStyles.cityHome}>
        <View style={cityStyles.demographics}>
          <View style={cityStyles.demographicsRow}>
            <Demographic label='Population' value='48,000' />
            <Demographic label='Economic Class' value='Upper-Middle' />
          </View>
        </View>
        <Text style={cityStyles.cityDescription}>
          { this.name } is part of ut enim ad minim veniam,
          consectetur adipiscing elit, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat
        </Text>
      </ScrollView>
    );
  }
}

class CityEvents extends PureComponent {
  render() {
    const events = getEvents();
    const eventCards = events.map((info, index) => {
      const props = { ...info, key: index };
      if (index === events.length - 1) props.lastInSequence = true;
      return <EventCard { ...props } />;
    });
    return (
      <ScrollView style={cityStyles.cityEvents}>
        { eventCards }
      </ScrollView>
    );
  }
}

const CityTabs = createMaterialTopTabNavigator({
  Home: {
    screen: CityHome
  },
  Events: {
    screen: CityEvents
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.textColor,
    inactiveTintColor: colors.textColorLight,
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: colors.logoGreen,
    }
  }
});

function getEvents() {
  const description = `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`;

  return [
    {
      title: 'Music on The Green',
      description,
    },
    {
      title: 'Connecticut Open',
      description,
    },
    {
      title: 'Food Scene and Apizza',
      description,
    },
    {
      title: 'Yale Surgical Clinic',
      description,
    },
  ];
}
