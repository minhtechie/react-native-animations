import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {WINDOW_HEIGHT} from '../../utils/';

const getRandomSignedNum = () => (Math.random() < 0.5 ? -1 : 1);
const getRandomXOutput = () => {
  if (getRandomSignedNum() < 0) {
    return -(Math.floor(Math.random() * 300) + 20);
  } else {
    return Math.floor(Math.random() * 10) + 20;
  }
};
const getRandomRotateOutput = () => {
  return [getRandomSignedNum() < 0 ? '-60deg' : '60deg', '0deg'];
};

type AnimatedHeartProps = {
  id: string;
  onCompleteAnimation: (id: string) => void;
};
const AnimatedHeart = ({id, onCompleteAnimation}: AnimatedHeartProps) => {
  const heartAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heartAnimatedValue, {
      toValue: -WINDOW_HEIGHT,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => onCompleteAnimation(id));
  }, [heartAnimatedValue, onCompleteAnimation, id]);

  const randomXOutput = useRef(getRandomXOutput()).current;
  const randomRotateOutput = useRef(getRandomRotateOutput()).current;

  return (
    <Animated.Image
      source={require('../../assets/images/heart.png')}
      style={[
        styles.heartIcon,
        {
          transform: [
            {
              translateX: heartAnimatedValue.interpolate({
                inputRange: [-300, 0],
                outputRange: [randomXOutput, 0],
              }),
            },
            {
              translateY: heartAnimatedValue.interpolate({
                inputRange: [-WINDOW_HEIGHT, -10, 0],
                outputRange: [-WINDOW_HEIGHT, -50, 0],
              }),
            },
            {
              rotate: heartAnimatedValue.interpolate({
                inputRange: [-WINDOW_HEIGHT, 0],
                outputRange: randomRotateOutput,
              }),
            },
            {
              scale: heartAnimatedValue.interpolate({
                inputRange: [-50, 0],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: heartAnimatedValue.interpolate({
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
