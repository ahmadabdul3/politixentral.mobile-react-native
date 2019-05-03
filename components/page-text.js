import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'px/styles/colors';
import { pageTitle, pageSubtitle, sectionTitle } from 'px/styles/typography';
import {
  horizontalSpacing,
  verticalSpacing,
  standardSpacingSize,
} from 'px/styles/utils';

export class PageHeader extends PureComponent {
  render() {
    return (
      <LinearGradient
        colors={[colors.secondary, colors.secondaryDark]}
        style={pageHeaderStyles.pageHeader}>
        { this.props.children }
      </LinearGradient>
    );
  }
}

const pageHeaderStyles = StyleSheet.create({
  pageHeader: {
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.backgroundGrayDarker
  },
});

export class PageHeaderLargeTop extends PureComponent {
  render() {
    return (
      <LinearGradient
        colors={[colors.secondary, colors.secondaryDark]}
        style={pageHeaderLargeTopStyles.pageHeader}>
        { this.props.children }
      </LinearGradient>
    );
  }
}

const pageHeaderLargeTopStyles = StyleSheet.create({
  pageHeader: {
    backgroundColor: colors.secondary,
    paddingTop: 40,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.backgroundGrayDarker
  },
});

export class PageTitlePrimary extends PureComponent {
  render() {
    const { text, customStyles } = this.props;

    return (
      <Text style={[ pageTitlePrimaryStyles.pageTitle, customStyles ]}>
        { text }
      </Text>
    );
  }
}

const pageTitlePrimaryStyles = StyleSheet.create({
  pageTitle: {
    ...horizontalSpacing,
    paddingLeft: standardSpacingSize,
    paddingTop: 0,
    paddingBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 26,
  },
});

export class PageDescription extends PureComponent {
  render() {
    const { text, customStyles } = this.props;

    return (
      <Text style={[pageDescriptionStyles.pageDescription, customStyles ]}>
        { text }
      </Text>
    );
  }
}

const pageDescriptionStyles = StyleSheet.create({
  pageDescription: {
    marginTop: 0,
    paddingLeft: standardSpacingSize + 1,
    paddingRight: standardSpacingSize,
    fontWeight: 'normal',
    fontSize: 22,
    lineHeight: 27,
    color: colors.secondaryLighter,
  },
});

export class SectionTitlePrimary extends PureComponent {
  render() {
    const { text, extraStyles } = this.props;
    return (
      <Text
        style={[{
          fontSize: 20, fontWeight: 'bold', color: colors.textColor
        }, extraStyles]}>
        { text }
      </Text>
    );
  }
}

export class PageSection extends PureComponent {
  render() {
    const { children, extraStyles } = this.props;
    return (
      <View style={[
        {
          marginTop: 40,
        },
        extraStyles
      ]}>
        { children }
      </View>
    );
  }
}
