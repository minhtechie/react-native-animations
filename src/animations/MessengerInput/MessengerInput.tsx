import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';

import {WINDOW_WIDTH} from '../../utils';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ICON_SIZE = 20;
const PADDING_X = 8;
const CONTENT_WIDTH = WINDOW_WIDTH - PADDING_X * 2;
const EXPAND_BUTTON_WIDTH = 36;
const SUBMIT_BUTTON_WIDTH = 36;
const MAIN_SECTION_WIDTH =
  CONTENT_WIDTH - EXPAND_BUTTON_WIDTH - SUBMIT_BUTTON_WIDTH;
const INPUT_WIDTH = MAIN_SECTION_WIDTH / 2;

export default function MessengerInput() {
  const [message, setMessage] = useState('');

  const animatedSharedValue = useSharedValue(INPUT_WIDTH);

  const messageInputAnimation = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedSharedValue.value),
    };
  }, []);

  const featureIconAnimation = useAnimatedStyle(() => {
    return {
      width: withTiming(
        interpolate(
          animatedSharedValue.value,
          [INPUT_WIDTH, MAIN_SECTION_WIDTH],
          [20, 0],
          Extrapolate.CLAMP,
        ),
      ),
    };
  }, []);

  const expandButtonAnimation = useAnimatedStyle(() => {
    return {
      width: withTiming(
        interpolate(
          animatedSharedValue.value,
          [INPUT_WIDTH, MAIN_SECTION_WIDTH],
          [0, EXPAND_BUTTON_WIDTH],
          Extrapolate.CLAMP,
        ),
      ),
    };
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.bottomContainer}>
        {/* Start left section */}
        <AnimatedTouchableOpacity
          onPress={() => {
            animatedSharedValue.value = INPUT_WIDTH;
          }}
          style={[styles.expandButton, expandButtonAnimation]}>
          <Image
            source={require('../../../src/images/messenger/caret-right.png')}
            style={styles.icon}
          />
        </AnimatedTouchableOpacity>

        <Animated.Image
          source={require('../../../src/images/messenger/action.png')}
          style={[styles.icon, featureIconAnimation]}
        />
        <Animated.Image
          source={require('../../../src/images/messenger/camera.png')}
          style={[styles.icon, featureIconAnimation]}
        />
        <Animated.Image
          source={require('../../../src/images/messenger/gallery.png')}
          style={[styles.icon, featureIconAnimation]}
        />
        <Animated.Image
          source={require('../../../src/images/messenger/voice.png')}
          style={[styles.icon, featureIconAnimation]}
        />

        <AnimatedTextInput
          style={[styles.messageInput, messageInputAnimation]}
          onPressIn={() => {
            animatedSharedValue.value = MAIN_SECTION_WIDTH;
          }}
          onChangeText={text => setMessage(text)}
          value={message}
        />
        {/* End left section */}

        {/* Start right section */}
        <TouchableOpacity style={styles.submitButton}>
          {!message ? (
            <Image
              source={require('../../../src/images/messenger/like.png')}
              style={styles.icon}
            />
          ) : (
            <Image
              source={require('../../../src/images/messenger/send.png')}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_X,
    marginBottom: 16,
  },
  expandButton: {
    position: 'absolute',
    left: 0,
    overflow: 'hidden',
  },
  icon: {
    height: ICON_SIZE,
    resizeMode: 'contain',
    tintColor: '#0584FE',
  },
  messageInput: {
    height: 36,
    paddingHorizontal: 16,
    marginRight: SUBMIT_BUTTON_WIDTH,
    backgroundColor: '#333',
    zIndex: 100,
    borderRadius: 16,
    color: 'white',
  },
  submitButton: {
    position: 'absolute',
    right: 0,
    width: SUBMIT_BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
