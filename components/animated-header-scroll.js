import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import stylesObj from 'px/styles/components/animated-header-scroll';
const styles = StyleSheet.create(stylesObj);

export const scrollRangeForAnimation = 100;

export default class AnimatedHeaderScroll extends PureComponent {
  state = {
    titlePaddingTop: new Animated.Value(60),
    marginTop: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };
  scrollView = null;
  headerCollapsed = false;

  registerScrollView = scrollView => {
      this.scrollView = scrollView ? scrollView._component : null;
  }

  animateHeader = (e) => {
    const yPosition = e.nativeEvent.contentOffset.y;
    if (yPosition < 1) return;

    let paddingTop = 60 - yPosition * 2;
    if (paddingTop < 25) paddingTop = 25;

    let marginTop = 0 - yPosition * 2;
    let opacity = 1 - yPosition * 0.01;

    if (yPosition < 10) {
      marginTop = 0;
      opacity = 1;
    }

    this.setState({
      marginTop,
      opacity,
      titlePaddingTop: paddingTop,
    });
  }

  render() {
    const { marginTop, opacity, titlePaddingTop } = this.state;

    return (
      <View style={styles.screen}>
        <View style={styles.pageHeader}>
          <View>
            <Text
              style={{
                ...stylesObj.pageSubtitle,
                marginTop,
                opacity,
              }}
            >
              { this.props.subtitle }
            </Text>
          </View>
          <Text style={{ ...stylesObj.pageTitle, paddingTop: titlePaddingTop }}>
            { this.props.title && this.props.title.toUpperCase() }
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          onScrollEndDrag={() => {}}
          onMomentumScrollEnd={() => {}}
          onScroll={this.animateHeader}
          scrollEventThrottle={16}
          ref={this.registerScrollView}
        >
          { this.props.children }
        </ScrollView>
      </View>
    );
  }
}
