import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import stylesObj from 'px/styles/components/animated-header-scroll';
const styles = StyleSheet.create(stylesObj);

console.log('stylesobj', stylesObj);

export const scrollRangeForAnimation = 100;

export default class AnimatedHeaderScroll extends PureComponent {
  state = {
    opacity: new Animated.Value(1),
    fontSize: new Animated.Value(24),
    paddingBottom: new Animated.Value(30),
    display: 'flex',
  };
  scrollView = null;
  headerCollapsed = false;

  onScrollEndSnapToEdge = event => {
      if (!this.scrollView) return;

      // const animationStartPoint = 0;
      // const animationHalfwayPoint = scrollRangeForAnimation / 2;
      // const animationEndPoint = scrollRangeForAnimation;
      // const y = event.nativeEvent.contentOffset.y;
      //
      // if (y > animationStartPoint && y < animationHalfwayPoint) {
      //     this.scrollView.scrollTo({ y: animationStartPoint });
      // } else if (y >= animationHalfwayPoint && y < animationEndPoint) {
      //     this.scrollView.scrollTo({ y: animationEndPoint });
      // }
  }

  registerScrollView = scrollView => {
      this.scrollView = scrollView ? scrollView._component : null;
  }

  animateHeader = (e) => {
    const { opacity, fontSize, paddingBottom } = this.state;
    const yPosition = e.nativeEvent.contentOffset.y;

    if (yPosition > 0 && !this.headerCollapsed) {
      this.headerCollapsed = true;
      // const opacityAnimation = Animated.timing(
      //   opacity,
      //   {
      //     toValue: 0,
      //     duration: 1000,
      //   }
      // );
      //
      // const fontSizeAnimation = Animated.timing(
      //   fontSize,
      //   {
      //     toValue: 1,
      //     duration: 1000,
      //   }
      // );
      //
      // const paddingBottomAnimation = Animated.timing(
      //   paddingBottom,
      //   {
      //     toValue: 0,
      //     duration: 1000,
      //   }
      // );
      //
      // opacityAnimation.start();
      // fontSizeAnimation.start();
      // paddingBottomAnimation.start();
      this.setState({ display: 'none' });
    } else if (yPosition < 5 && this.headerCollapsed) {
      this.headerCollapsed = false;
      // const opacityAnimation = Animated.timing(
      //   opacity,
      //   {
      //     toValue: 1,
      //     duration: 1000,
      //   }
      // );
      //
      // const fontSizeAnimation = Animated.timing(
      //   fontSize,
      //   {
      //     toValue: 24,
      //     duration: 1000,
      //   }
      // );
      //
      // const paddingBottomAnimation = Animated.timing(
      //   paddingBottom,
      //   {
      //     toValue: 30,
      //     duration: 1000,
      //   }
      // );
      //
      // opacityAnimation.start();
      // fontSizeAnimation.start();
      // paddingBottomAnimation.start();
      this.setState({ display: 'flex' });
    }
  }

  render() {
    const { opacity, fontSize, paddingBottom, display } = this.state;
    return (
      <View style={styles.screen}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>
            { this.props.title && this.props.title.toUpperCase() }
          </Text>
          <Animated.Text style={{
            ...stylesObj.pageSubtitle,
            // fontSize: fontSize,
            // opacity: opacity,
            // paddingBottom: paddingBottom,
            display,
          }}>
            { this.props.subtitle }
          </Animated.Text>
        </View>
        <Animated.ScrollView
          style={styles.scrollView}
          onScrollEndDrag={this.animateHeader}
          onMomentumScrollEnd={this.animateHeader}
          onScroll={() => {}}
          ref={this.registerScrollView}
        >
          { this.props.children }
        </Animated.ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     paddingTop: 50,
//   },
//   scrollView: {
//     backgroundColor: '#eee',
//   },
//   item: {
//     padding: 80,
//     backgroundColor: 'white',
//     margin: 10,
//   },
// });
