import React from 'react';
import {ImageSourcePropType} from 'react-native';

import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
import styles from './facebookStyles';

const Emoji = ({
  source,
  index,
  activeIndex,
}: {
  source: ImageSourcePropType;
  index: number;
  activeIndex: Animated.SharedValue<number>;
}) => {
  const animationStyle = useAnimatedStyle(() => {
    const animation = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [0.8, 1.5, 0.8],
      Extrapolate.CLAMP,
    );
    const animationMove = interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1, -10, 1],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          scale: withSpring(animation),
        },
      ],
      top: withTiming(animationMove),
    };
  });

  return (
    <Animated.Image source={source} style={[styles.emoji, animationStyle]} />
  );
};

export default Emoji;
