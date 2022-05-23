import React from 'react';
import {ImageSourcePropType} from 'react-native';

import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
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
    return {
      transform: [
        {
          scale: withSpring(
            interpolate(
              activeIndex.value,
              [index - 1, index, index + 1],
              [1, 1.75, 0.8],
              Extrapolate.CLAMP,
            ),
          ),
        },
      ],
    };
  });

  return (
    <Animated.Image source={source} style={[styles.emoji, animationStyle]} />
  );
};

export default Emoji;
