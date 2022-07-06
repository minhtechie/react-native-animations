import {Image, Platform, StyleSheet, Text} from 'react-native';
import React from 'react';
import {WINDOW_WIDTH} from '../../utils';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export const CARD_WIDTH = WINDOW_WIDTH / 4;

const Card = ({
  index,
  middleCardIndex,
  translationX,
}: {
  index: number;
  middleCardIndex: number;
  translationX: Animated.SharedValue<number>;
}) => {
  const overlapX = ((index - middleCardIndex) * -CARD_WIDTH) / 2;
  const translateY = Math.abs((index - middleCardIndex) * 16);

  const inputRange = [
    (index - 3) * CARD_WIDTH,
    (index - 2) * CARD_WIDTH,
    (index - 1) * CARD_WIDTH,
  ];

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value + overlapX,
        },
        {
          translateY: interpolate(
            -translationX.value,
            inputRange,
            [translateY, -translateY, translateY],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale: interpolate(
            -translationX.value,
            inputRange,
            [1, 1.25, 1],
            Extrapolate.CLAMP,
          ),
        },
        {rotate: `${(index - middleCardIndex) * 8}deg`},
      ],
    };
  });

  return (
    <Animated.Image
      style={[styles.card, animationStyle]}
      key={index}
      source={require('../../images/tarot/card.png')}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: undefined,
    aspectRatio: 924 / 1312,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  cardNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    position: 'absolute',
    top: 10,
  },
});
export default Card;
