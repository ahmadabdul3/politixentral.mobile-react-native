import React, { PureComponent } from 'react';
import ScaledImage from 'px/components/scaled-image';
import cityStyles from 'px/styles/pages/city';
import cardStyles from 'px/styles/components/card';
import colors from 'px/styles/colors';
import { createMaterialTopTabNavigator } from 'react-navigation';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';

export default class City extends PureComponent {
  name = 'New Haven';

  render() {
    // const cityUrl = 'https://c1.staticflickr.com/4/3718/10819859084_6a7ed932a0_b.jpg';
    // const cityUrl = 'https://a1.r9cdn.net/rimg/dimg/ec/ed/84fcf3f7-city-14151-54f1cc6c.jpg?crop=true&width=1440&height=557&xhint=1736&yhint=2468';
    const cityUrl = 'https://pbs.twimg.com/media/DguTMjfX0AAHaZP.jpg';

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
            <Demographic label='Population' value='258,000' />
            <Demographic label='Districts' value='13' />
          </View>
          <View style={cityStyles.demographicsRow}>
            <Demographic label='Economic Class' value='Middle' />
            <Demographic label='Political Party' value='Democratic' />
          </View>
        </View>
        <Text style={cityStyles.cityDescription}>
          New Haven is located in consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat
        </Text>
      </ScrollView>
    );
  }
}

class Demographic extends PureComponent {
  render() {
    const { label, value } = this.props;

    return (
      <View style={cityStyles.demographic}>
        <Text style={cityStyles.demographicLabel}>
          { label }
        </Text>
        <Text style={cityStyles.demographicValue}>
          { value }
        </Text>
      </View>
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

class EventCard extends PureComponent {
  render() {
    const {
      title,
      description,
      lastInSequence,
    } = this.props;

    const style = lastInSequence ? cardStyles.cardLast : cardStyles.card;

    return (
      <View
        shadowColor='black'
        shadowOpacity={0.2}
        shadowOffset={{ width: 0, height: 1 }}
        style={style}
      >
        <Text style={cityStyles.eventCardTitle}>{ title }</Text>
        <Text style={cityStyles.eventCardDescription}>{ description }</Text>
      </View>
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
