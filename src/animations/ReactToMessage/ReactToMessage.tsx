import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import AnimatedHeart from './AnimatedHeart';
import {WINDOW_WIDTH} from '../../utils';

function getUniqueID() {
  return Math.floor(Math.random() * Date.now()).toString();
}

const ReactToMessage = () => {
  const [heartCount, setHeartCount] = useState(0);
  const [hearts, setHearts] = useState<{id: string}[]>([]);

  const countAnimatedValue = useRef(new Animated.Value(0)).current;
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const handleCompleteAnimation = useCallback((id: string) => {
    setHearts(oldHearts => {
      return oldHearts.filter(heart => heart.id !== id);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageContainer}>
        <Image
          style={styles.messageAvatar}
          source={require('../../images/users/girl1.jpeg')}
        />
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>
            Like and subscribe to Minh Techie channel
          </Text>
          <Text style={styles.messageSentTime}>6:09</Text>
        </View>

        <TouchableOpacity
          style={styles.loveButton}
          activeOpacity={1}
          onPress={() => {
            if (timeout.current) {
              clearTimeout(timeout.current);
            }

            setHeartCount(heartCount + 1);
            setHearts(oldHearts => [...oldHearts, {id: getUniqueID()}]);

            timeout.current = setTimeout(() => {
              Animated.spring(countAnimatedValue, {
                toValue: 0,
                speed: 48,
                useNativeDriver: true,
              }).start();
            }, 500);
            Animated.spring(countAnimatedValue, {
              toValue: -64,
              speed: 48,
              useNativeDriver: true,
            }).start();
          }}>
          <View style={styles.loveCircle}>
            {heartCount ? (
              <Image
                style={styles.loveIcon}
                source={require('../../images/heart.png')}
              />
            ) : (
              <Image
                style={styles.loveIcon}
                source={require('../../images/heart-outline.png')}
              />
            )}
          </View>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.loveCountCircle,
            {
              transform: [
                {
                  translateY: countAnimatedValue,
                },
                {
                  scale: countAnimatedValue.interpolate({
                    inputRange: [-64, 0],
                    outputRange: [1, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.loveCountText}>{heartCount}</Text>
        </Animated.View>
        {hearts.map(({id}) => (
          <AnimatedHeart
            key={id}
            id={id}
            onCompleteAnimation={handleCompleteAnimation}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaeaea',
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
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  messageText: {
    fontSize: 20,
    color: '#333',
  },
  messageSentTime: {
    color: 'grey',
    fontSize: 14,
    marginTop: 4,
  },
  loveButton: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveCircle: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
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
  loveIcon: {
    width: 12,
    height: 12,
  },
  loveCountCircle: {
    position: 'absolute',
    bottom: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    right: -8,
    borderRadius: 16,
    backgroundColor: '#ffd500',
    zIndex: 100,
  },
  loveCountText: {
    color: 'white',
  },
});

export default ReactToMessage;
