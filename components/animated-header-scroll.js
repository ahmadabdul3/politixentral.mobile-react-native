import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import stylesObj from 'px/styles/components/animated-header-scroll';
const styles = StyleSheet.create(stylesObj);

export const scrollRangeForAnimation = 100;

export default class AnimatedHeaderScroll extends PureComponent {
  state = {
    marginTop: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };
  headerCollapsed = false;
  scrollBeginPosition = null;

  collapseHeader(yPosition) {
    const { opacity, marginTop } = this.state;
    const duration = 200;
    this.headerCollapsed = true;

    Animated.parallel([
      Animated.timing(opacity, { duration, toValue: 0 }),
      Animated.timing(marginTop, { duration,  toValue: -150 }),
    ]).start();
  }

  expandHeader(yPosition) {
    const { opacity, marginTop } = this.state;
    const duration = 150;
    this.headerCollapsed = false;

    Animated.parallel([
      Animated.timing(opacity, { duration, toValue: 1 }),
      Animated.timing(marginTop, { duration,  toValue: 0 }),
    ]).start();
  }

  onScrollBeginDrag = (e) => {
    this.scrollBeginPosition = e.nativeEvent.contentOffset.y;
  }

  onScroll = (e) => {
    const yPosition = e.nativeEvent.contentOffset.y;
    if (yPosition > this.scrollBeginPosition) {
      if (!this.headerCollapsed) this.collapseHeader(yPosition);
    } else if (yPosition < this.scrollBeginPosition) {
      if (yPosition < 50 && this.headerCollapsed) this.expandHeader(yPosition);
    }
  }

  render() {
    const { marginTop, opacity } = this.state;
    const { customStyles } = this.props;

    return (
      <View style={styles.screen}>
        <View style={styles.pageHeader}>
          <View>
            <Animated.Text
              style={{
                ...stylesObj.pageSubtitle,
                marginTop,
                opacity,
              }}
            >
              { this.props.subtitle }
            </Animated.Text>
          </View>
          <Text style={[stylesObj.pageTitle, customStyles && customStyles.pageTitle]}>
            { this.props.title && this.props.title.toUpperCase() }
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
        >
          { this.props.children }
        </ScrollView>
      </View>
    );
  }
}
