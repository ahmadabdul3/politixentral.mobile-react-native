import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import stylesObj from 'px/styles/components/animated-header-scroll';
const styles = StyleSheet.create(stylesObj);

export const scrollRangeForAnimation = 100;

export default class AnimatedHeaderScroll extends PureComponent {
  state = {
    marginTop: new Animated.Value(-10),
    opacity: new Animated.Value(1),
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
    const yPosition = e.nativeEvent.contentOffset.y;
    this.setState({
      marginTop: -10 - yPosition * 0.5,
      opacity: 1 - yPosition * 0.005,
    });


    // if (yPosition > 0 && !this.headerCollapsed) {
    //   this.headerCollapsed = true;
    //   // const opacityAnimation = Animated.timing(
    //   //   opacity,
    //   //   {
    //   //     toValue: 0,
    //   //     duration: 1000,
    //   //   }
    //   // );
    //   //
    //   // opacityAnimation.start();
    //   this.setState({ marginTop: 0 });
    // } else if (yPosition < 5 && this.headerCollapsed) {
    //   this.headerCollapsed = false;
    //   // const opacityAnimation = Animated.timing(
    //   //   opacity,
    //   //   {
    //   //     toValue: 1,
    //   //     duration: 1000,
    //   //   }
    //   // );
    //   //
    //   // opacityAnimation.start();
    //   this.setState({ marginTop: 0 });
    // }
  }

  render() {
    const { marginTop, opacity } = this.state;
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
          <Text style={styles.pageTitle}>
            { this.props.title && this.props.title.toUpperCase() }
          </Text>
        </View>
        <Animated.ScrollView
          style={styles.scrollView}
          onScrollEndDrag={() => {}}
          onMomentumScrollEnd={() => {}}
          onScroll={this.animateHeader}
          scrollEventThrottle={16}
          ref={this.registerScrollView}
        >

          <View style={styles.scrollItems}>
            { this.props.children }
          </View>
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
