import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  TextInput,
  Text, View, ScrollView, Image, TouchableHighlight, AsyncStorage, Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import colors from 'px/styles/colors';
import {
  PageTitlePrimary, PageDescription, PageHeader
} from 'px/components/page-text';

class PageComponent extends PureComponent {
  render() {
    return (
      <ScrollView>
        <PageHeader>
          <PageTitlePrimary>
            MESSAGES
          </PageTitlePrimary>
          <PageDescription>
            Communicate with your Representatives and let your voice be heard.
          </PageDescription>
        </PageHeader>
        <View>
          <MessageSummary />
        </View>
      </ScrollView>
    );
  }
}

class MessageSummary extends PureComponent {
  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 3,
        minHeight: 50,
      }}>
        <TouchableHighlight
          onPress={this.goToProfile}
          underlayColor={colors.backgroundGrayDarker}
        >
          <View>

          </View>
        </TouchableHighlight>
      </View>
    );
  }
}


export default class PageNav extends PureComponent {
  render() {
    const Nav = createStackNavigator({
      Home: {
        screen: PageComponent,
        navigationOptions: ({ navigation }) => ({
          // title: `${navigation.state.params.name}'s Profile'`,
          title: 'POLITIXENTRAL',
          headerStyle: {
            backgroundColor: colors.secondary,
            borderBottomColor: colors.secondaryLight,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
        }),
      },
    });
    return <Nav />;
  }
}
