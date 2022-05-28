import React, {useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Emoji from './Emoji';
import emojisData from './emojisData';
import styles, {
  EMOJI_SIZE,
  EMOJI_MARGIN,
  EMOJI_BAR_PADDING,
} from './facebookStyles';

const EMOJI_SPACE = EMOJI_SIZE + EMOJI_MARGIN * 2 + EMOJI_BAR_PADDING;

const getEmojiIndex = (positionX: number) => {
  'worklet';
  return Math.ceil(positionX / EMOJI_SPACE) - 1;
};

const FacebookPostReaction = () => {
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<null | number>(
    null,
  );
  const emojisBarSharedValue = useSharedValue(0);
  const emojisBarAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: emojisBarSharedValue.value}],
    };
  }, []);
  const activeEmojiIndexSharedValue = useSharedValue(-1);

  const selectEmoji = (x: number) => {
    const index = Math.ceil(x / EMOJI_SPACE) - 1;
    setSelectedEmojiIndex(index);
  };

  const isLongPressed = useSharedValue(false);

  const longPress = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      emojisBarSharedValue.value = withTiming(1, {duration: 150});
      isLongPressed.value = true;
    });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      if (isLongPressed.value) {
        stateManager.activate();
      } else {
        stateManager.fail();
      }
    })
    .onUpdate(event => {
      if (event.y > -50 && event.y < 10) {
        activeEmojiIndexSharedValue.value = getEmojiIndex(event.x);
      } else {
        runOnJS(setSelectedEmojiIndex)(null);
        activeEmojiIndexSharedValue.value = -1;
      }
    })
    .onEnd(event => {
      if (event.y > -50 && event.y < 10) {
        runOnJS(selectEmoji)(event.x);
        activeEmojiIndexSharedValue.value = -1;
        emojisBarSharedValue.value = withTiming(0);
      } else {
        runOnJS(setSelectedEmojiIndex)(null);
        activeEmojiIndexSharedValue.value = -1;
        emojisBarSharedValue.value = withTiming(0);
      }
    })
    .onTouchesUp(() => {
      isLongPressed.value = false;
    });

  const composed = Gesture.Simultaneous(longPress, panGesture);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeAreaView} />

      <View style={styles.post}>
        <TouchableWithoutFeedback
          style={styles.authorInfoRow}
          onPress={() => {
            emojisBarSharedValue.value = withTiming(0, {duration: 150});
          }}>
          <Image
            source={require('../../../src/images/minh-logo.png')}
            style={styles.authorAvatar}
          />
          <View>
            <Text style={styles.authorName}>Quy</Text>
            <Text style={styles.postedTime}>Today</Text>
          </View>
        </TouchableWithoutFeedback>

        <View>
          <Text style={styles.postContentText}>Alo 1234</Text>
        </View>
        <View style={styles.gestureHandlerRootView}>
          <GestureDetector gesture={composed}>
            <>
              <View style={styles.actionContainer}>
                <Image
                  source={
                    selectedEmojiIndex !== null
                      ? emojisData[selectedEmojiIndex]
                      : require('../../images/facebook-emojis/like.png')
                  }
                  style={styles.likeIcon}
                />
                <Text style={styles.likeText}>Like</Text>
              </View>
              <Animated.View
                style={[styles.emojisBar, emojisBarAnimationStyle]}>
                {emojisData.map((emojiSource, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedEmojiIndex(index);
                        emojisBarSharedValue.value = withTiming(0, {
                          duration: 150,
                        });
                      }}>
                      <Emoji
                        source={emojiSource}
                        index={index}
                        activeIndex={activeEmojiIndexSharedValue}
                      />
                    </TouchableOpacity>
                  );
                })}
              </Animated.View>
            </>
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default FacebookPostReaction;
