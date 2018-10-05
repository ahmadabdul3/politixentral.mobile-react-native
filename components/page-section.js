import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import rawStyles from 'px/styles/components/page-section';

const styles = StyleSheet.create(rawStyles);

export default class PageSection extends PureComponent {
  render() {
    const { title, children } = this.props;

    return (
      <View style={styles.pageSection}>
        <Text style={styles.sectionTitle}>{ title && title.toUpperCase() }</Text>
        <View style={styles.pageSectionContent}>
          { children }
        </View>
      </View>
    );
  }
}
