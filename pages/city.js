import React, { PureComponent } from 'react';
import ScaledImage from 'px/components/scaled-image';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class City extends PureComponent {
  name = 'New Haven';

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <ScaledImage
            fullWidth
            maxHeight={250}
            uri={'https://c1.staticflickr.com/4/3718/10819859084_6a7ed932a0_b.jpg'}
          />
          <Text>
            { this.name }
          </Text>
        </View>
        <ScrollView style={styles.bodyData}>
          <Text>
            info
          </Text>
          <Text>
            info
          </Text>
          <Text>
            info
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    paddingTop: 25,
    height: '100%',
  },
  header: {
    flexGrow: 0,
    flexShrink: 0,
  },
  bodyData: {
    flexGrow: 1,
    flexShrink: 1,
  }
});
