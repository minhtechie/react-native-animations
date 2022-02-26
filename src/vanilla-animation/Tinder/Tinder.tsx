import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
  View,
  Dimensions,
} from 'react-native';
import usersData from '../../data/usersData';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const SwipeDeck = () => {
  const swipeRight = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: windowWidth * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue({x: 0, y: 0});
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    });
  };

  const swipeLeft = () => {
    Animated.spring(animatedValue, {
      toValue: {
        x: -windowWidth * 2,
        y: 0,
      },
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue({x: 0, y: 0});
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    });
  };

  const resetPosition = () => {
    Animated.timing(animatedValue, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animatedValue.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > windowWidth * 0.25) {
          swipeRight();
        } else if (gesture.dx < -windowWidth * 0.25) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const animatedValue = useRef(new Animated.ValueXY()).current;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const renderCards = () => {
    return usersData
      .map((item, index) => {
        let cardAnimation = {};
        let likeTextAnimation = {};
        let nopeTextAnimation = {};

        if (index >= currentCardIndex) {
          if (index === currentCardIndex) {
            cardAnimation = {
              transform: [
                {translateX: animatedValue.x},
                {
                  translateY: animatedValue.y.interpolate({
                    inputRange: [-windowHeight * 0.035, windowHeight * 0.035],
                    outputRange: [-windowHeight * 0.035, windowHeight * 0.035],
                    extrapolate: 'clamp',
                  }),
                },
                {
                  rotate: animatedValue.x.interpolate({
                    inputRange: [-windowWidth * 1.5, windowWidth * 1.5],
                    outputRange: ['-120deg', '120deg'],
                  }),
                },
              ],
            };

            likeTextAnimation = {
              opacity: animatedValue.x.interpolate({
                inputRange: [0, windowWidth * 0.25],
                outputRange: [0, 1],
              }),
            };

            nopeTextAnimation = {
              opacity: animatedValue.x.interpolate({
                inputRange: [-windowWidth * 0.25, 0],
                outputRange: [1, 0],
              }),
            };
          }
          return (
            <Animated.View key={item.id} style={[styles.card, cardAnimation]}>
              <Animated.Image source={item.avatar} style={styles.image} />
              {index === currentCardIndex && (
                <React.Fragment>
                  <Animated.Text
                    style={[styles.text, styles.likeText, likeTextAnimation]}>
                    LIKE
                  </Animated.Text>
                  <Animated.Text
                    style={[styles.text, styles.nopeText, nopeTextAnimation]}>
                    NOPE
                  </Animated.Text>
                </React.Fragment>
              )}
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {renderCards()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '90%',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  text: {
    position: 'absolute',
    top: 50,
    fontSize: 32,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  likeText: {
    left: 20,
    color: '#32CD32',
    borderColor: '#32CD32',
  },
  nopeText: {
    right: 20,
    color: 'red',
    borderColor: 'red',
  },
});

export default SwipeDeck;
