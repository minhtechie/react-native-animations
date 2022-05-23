import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../utils/';

const getRandomSignedNum = () => (Math.random() < 0.5 ? -1 : 1);
const getRandomXOutput = () => {
  return getRandomSignedNum() < 0
    ? -Math.random() * WINDOW_WIDTH * 0.7
    : Math.random();
};
const getRandomRotateOutput = () => {
  return [getRandomSignedNum() < 0 ? '-60deg' : '60deg', '0deg'];
};

type AnimatedHeartProps = {
  id: string;
  onCompleteAnimation: (id: string) => void;
};
const AnimatedHeart = ({id, onCompleteAnimation}: AnimatedHeartProps) => {
  const animatedValueY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValueY, {
      toValue: -WINDOW_HEIGHT,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => onCompleteAnimation(id));
  }, [animatedValueY, onCompleteAnimation, id]);

  const randomXOutput = useRef(getRandomXOutput()).current;
  const randomRotateOutput = useRef(getRandomRotateOutput()).current;

  return (
    <Animated.Image
      source={require('../../images/heart.png')}
      style={[
        styles.heartIcon,
        {
          transform: [
            {
              translateY: animatedValueY.interpolate({
                inputRange: [-WINDOW_HEIGHT, 0],
                outputRange: [-WINDOW_HEIGHT, 0],
              }),
            },
            {
              translateX: animatedValueY.interpolate({
                inputRange: [-WINDOW_HEIGHT, 0],
                outputRange: [randomXOutput, 0],
              }),
            },
            {
              rotate: animatedValueY.interpolate({
                inputRange: [-WINDOW_HEIGHT, 0],
                outputRange: randomRotateOutput,
              }),
            },
            {
              scale: animatedValueY.interpolate({
                inputRange: [-50, 0],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: animatedValueY.interpolate({
            inputRange: [-WINDOW_HEIGHT, 0],
            outputRange: [0, 1],
          }),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  heartIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 0,
  },
});

export default AnimatedHeart;
