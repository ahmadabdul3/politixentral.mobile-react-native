import React, { PureComponent } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import colors from 'px/styles/colors';
import rawStyles from 'px/styles/components/content-summary-card';
const styles = StyleSheet.create(rawStyles);

export class ClickableContentSummaryBox extends PureComponent {
  static defaultProps = {
    cardTitle: '',
    ViewType: View,
  };

  render() {
    const {
      cardTitle, onPress, ViewType, children
    } = this.props;

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          { cardTitle.toUpperCase() }
        </Text>
        <ViewType>
          <TouchableHighlight
            onPress={this.onPress}
            underlayColor={colors.backgroundGrayDarker}
          >
            <View style={styles.cardChildrenBox}>
              { children }
            </View>
          </TouchableHighlight>
        </ViewType>
      </View>
    );
  }
}
