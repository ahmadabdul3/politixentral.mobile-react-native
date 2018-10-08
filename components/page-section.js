import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
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
            { title && title.toUpperCase() }
          </Text>
          {
            titleSecondary && (
              <Text
                style={[
                  baseStyles.sectionTitleSecondary,
                  customStyles.sectionTitleSecondary,
                ]}
              >
                { '  |  ' + titleSecondary.toUpperCase() }
              </Text>
            )
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
            paddingLeft: 10, paddingRight: 10,
            paddingTop: 5, paddingBottom: 15
          }}
          horizontal={true}
        >
          { children }
        </ScrollView>
      </PageSection>
    );
  }
}
