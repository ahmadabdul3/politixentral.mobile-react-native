import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import stylesObj from 'px/styles/components/animated-header-scroll';
const styles = StyleSheet.create(stylesObj);

export const scrollRangeForAnimation = 100;

export default class AnimatedHeaderScroll extends PureComponent {
  state = {
    titlePaddingTop: new Animated.Value(40),
    marginTop: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };
  headerCollapsed = false;
  scrollBeginPosition = null;

  collapseHeader() {
    const { opacity, marginTop, titlePaddingTop } = this.state;
    const duration = 300;
    this.headerCollapsed = true;

    Animated.parallel([
      Animated.timing(opacity, { duration, toValue: 0 }),
      Animated.timing(marginTop, { duration,  toValue: -150 }),
      Animated.timing(titlePaddingTop, { duration, toValue: 25 }),
    ]).start();
  }

  expandHeader() {
    const { opacity, marginTop, titlePaddingTop } = this.state;
    const duration = 300;
    this.headerCollapsed = false;

    Animated.parallel([
      Animated.timing(opacity, { duration, toValue: 1 }),
      Animated.timing(marginTop, { duration,  toValue: 0 }),
      Animated.timing(titlePaddingTop, { duration, toValue: 40 }),
    ]).start();
  }

  onScrollBeginDrag = (e) => {
    this.scrollBeginPosition = e.nativeEvent.contentOffset.y;
  }

  onScroll = (e) => {
    const yPosition = e.nativeEvent.contentOffset.y;
    if (yPosition > this.scrollBeginPosition) {
      if (!this.headerCollapsed) this.collapseHeader();
    } else if (yPosition < this.scrollBeginPosition) {
      if (yPosition < 50 && this.headerCollapsed) this.expandHeader();
    }
  }

  render() {
    const { marginTop, opacity, titlePaddingTop } = this.state;

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
          <Animated.Text
            style={{
              ...stylesObj.pageTitle,
              paddingTop: titlePaddingTop,
            }}
          >
            { this.props.title && this.props.title.toUpperCase() }
          </Animated.Text>
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
