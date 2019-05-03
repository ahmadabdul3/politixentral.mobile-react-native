import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import rawStyles from 'px/styles/components/page-section';

const baseStyles = StyleSheet.create(rawStyles);

export default class PageSection extends PureComponent {
  static defaultProps = {
    customStyles: {}
  };

  render() {
    const { title, titleSecondary, customStyles, children } = this.props;

    return (
      <View style={[ baseStyles.pageSection, customStyles.pageSection ]}>
        <Text style={baseStyles.sectionTitleBox}>
          <Text style={[ baseStyles.sectionTitle, customStyles.sectionTitle ]}>
            { !!title ? title.toUpperCase() : '' }
          </Text>
          {
            !!titleSecondary ? (
              <Text
                style={[
                  baseStyles.sectionTitleSecondary,
                  customStyles.sectionTitleSecondary,
                ]}
              >
                { '  |  ' + titleSecondary.toUpperCase() }
              </Text>
            ) : null
          }
        </Text>
        <View style={[ baseStyles.pageSectionContent, customStyles.pageSectionContent ]}>
          { children }
        </View>
      </View>
    );
  }
}

export class HorisontalScrollPageSection extends PureComponent {
  render() {
    const { title, titleSecondary, customStyles, children } = this.props;

    return (
      <PageSection
        title={title}
        titleSecondary={titleSecondary}
        customStyles={customStyles}
      >
        <ScrollView
          style={{
            paddingLeft: 0, paddingRight: 0,
            paddingTop: 0, paddingBottom: 15
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          snapToAlignment={"center"}
          decelerationRate="fast"
        >
          { children }
        </ScrollView>
        <View style={baseStyles.horizontalScrollPageSectionDots}>
          <View style={baseStyles.horizontalScrollPageSectionDot} />
          <View style={baseStyles.horizontalScrollPageSectionDot} />
        </View>
      </PageSection>
    );
  }
}

// snapToInterval={Dimensions.get('window').width}
