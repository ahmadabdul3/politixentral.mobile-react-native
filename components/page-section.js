import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import rawStyles from 'px/styles/components/page-section';

const baseStyles = StyleSheet.create(rawStyles);

export default class PageSection extends PureComponent {
  static defaultProps = {
    customStyles: {}
  };

  render() {
    const { title, customStyles, children } = this.props;

    return (
      <View style={[ baseStyles.pageSection, customStyles.pageSection ]}>
        <Text style={[ baseStyles.sectionTitle, customStyles.sectionTitle ]}>
          { title && title.toUpperCase() }
        </Text>
        <View style={[ baseStyles.pageSectionContent, customStyles.pageSectionContent ]}>
          { children }
        </View>
      </View>
    );
  }
}
