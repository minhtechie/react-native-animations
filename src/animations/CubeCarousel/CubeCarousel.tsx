import * as React from 'react';
import {
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  View,
  SafeAreaView,
  Image,
} from 'react-native';

import users from '../../data/usersData';

const {width} = Dimensions.get('window');
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

export default class CubeCarousel extends React.Component {
  state = {
    x: new Animated.Value(0),
  };

  getStyle(index: number) {
    const {x} = this.state;
    const offset = index * width;

    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: 'clamp',
    });

    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: 'clamp',
    });

    const extra = width / ratio / Math.cos(angle / 2) - width / ratio;
    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: 'clamp',
    });

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        {perspective},
        {translateX},
        {rotateY},
        {translateX: translateX1},
        {translateX: translateX2},
      ],
    };
  }

  getMaskStyle(index: number) {
    const {x} = this.state;
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: 'clamp',
    });
    return {
      backgroundColor: 'black',
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  }

  render() {
    const {x} = this.state;
    return (
      <View style={styles.container}>
        {users.map((user, i) => (
          <Animated.View style={this.getStyle(i)} key={user.id}>
            <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                <Image style={styles.image} source={user.avatar} />
              </View>
            </SafeAreaView>
            <Animated.View style={this.getMaskStyle(i)} />
          </Animated.View>
        ))}
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          contentContainerStyle={{width: width * users.length}}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          decelerationRate={0.99}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    height: 28,
    width: 250,
    borderRadius: Platform.OS === 'android' ? 0 : 10,
  },
});
