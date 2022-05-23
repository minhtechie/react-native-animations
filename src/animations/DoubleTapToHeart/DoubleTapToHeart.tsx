import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WINDOW_WIDTH} from '../../utils';

const DoubleTapToHeart = () => {
  const [isHearted, setIsHearted] = useState(false);
  const lastTap = useRef(0);
  const isAnimating = useRef(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isHearted) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => (isAnimating.current = false));
    } else {
      animatedValue.setValue(0);
      isAnimating.current = false;
    }
  }, [animatedValue, isHearted]);

  const heartAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.1, 0.8, 1],
          outputRange: [0, 2, 2, 1],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 0.1, 0.8, 1],
          outputRange: [0, -40, -40, 1],
        }),
      },
    ],
  };
  const heartCircleAnimation = {
    opacity: animatedValue,
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.messageContainer}
        onPress={() => {
          const now = Date.now();
          const DELAY = 300;
          if (lastTap.current && now - lastTap.current < DELAY) {
            if (!isAnimating.current) {
              setIsHearted(!isHearted);
              isAnimating.current = true;
            }
          } else {
            lastTap.current = now;
          }
        }}>
        <Image
          style={styles.messageAvatar}
          source={require('../../../src/images/users/girl1.jpeg')}
        />
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>
            Like and subscribe to Minh Techie channel
          </Text>
        </View>

        {isHearted && (
          <View style={styles.heartContainer}>
            <Animated.View style={[styles.heartCircle, heartCircleAnimation]} />
            <Animated.Image
              style={[styles.heartIcon, heartAnimation]}
              source={require('../../../src/images/heart.png')}
            />
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
  },
  messageAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  messageContent: {
    width: WINDOW_WIDTH * 0.7,
    backgroundColor: '#19A3FE',
    borderRadius: 8,
    padding: 8,
  },
  messageText: {
    fontSize: 20,
    color: 'white',
  },
  heartContainer: {
    position: 'absolute',
    bottom: -8,
    right: 0,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: 'grey',
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
          width: 0.5,
          height: 0.5,
        },
      },
    }),
  },
  heartIcon: {
    position: 'absolute',
    width: 18,
    height: 18,
  },
});

export default DoubleTapToHeart;
