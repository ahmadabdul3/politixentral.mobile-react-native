import React, { PureComponent } from 'react';
import { Text, View, Button } from 'react-native';
import ROUTES from 'rx/constants/routes';

export default class EnterAddress extends PureComponent {
  goToApp = () => {
    this.props.navigation.navigate(ROUTES.ENTER_ADDRESS);
  }

  render() {
    return (
      <View>
        <Text>
          enter address
        </Text>
        <Button onPress={this.goToApp}>
          go
        </Button>
      </View>
    );
  }
}
