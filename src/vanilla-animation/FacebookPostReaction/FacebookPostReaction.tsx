import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  PanResponder,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import emojisData from './emojisData';
import styles, {
  EMOJI_SIZE,
  EMOJI_MARGIN,
  EMOJI_BAR_PADDING,
  EMOJI_BAR_BORDER_RADIUS,
} from './facebookStyles';

const EMOJI_SPACE = EMOJI_SIZE + EMOJI_MARGIN * 2 + EMOJI_BAR_PADDING;

const FacebookPostReaction = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState<null | number>(
    null,
  );

  const emojisBarAnimatedValue = useRef(new Animated.Value(0)).current;
  const emojiAnimatedValue = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const moveX = gesture.moveX;
        if (
          moveX >= EMOJI_BAR_BORDER_RADIUS &&
          moveX <= EMOJI_SPACE * emojisData.length
        ) {
          const index = Math.round(moveX / EMOJI_SPACE) - 1;
          Animated.timing(emojiAnimatedValue.current[index], {
            toValue: 1.75,
            duration: 75,
            useNativeDriver: false,
          }).start();
          emojiAnimatedValue.current.forEach((value, i) => {
            if (index !== i) {
              value.setValue(1);
            }
          });
        }
      },
      onPanResponderRelease: (event, gesture) => {
        const moveX = gesture.moveX;
        const index = Math.round(moveX / EMOJI_SPACE) - 1;
        setSelectedEmojiIndex(index);
        setShowEmojis(false);
      },
    }),
  ).current;

  useEffect(() => {
    if (showEmojis) {
      Animated.timing(emojisBarAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      emojisBarAnimatedValue.setValue(0);
      emojiAnimatedValue.current.forEach(value => {
        value.setValue(1);
      });
    }
  }, [showEmojis, emojisBarAnimatedValue, emojiAnimatedValue]);

  const emojisBarAnimation = {
    transform: [{scale: emojisBarAnimatedValue}],
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => {
        setShowEmojis(false);
      }}>
      <SafeAreaView style={styles.safeAreaView} />

      <View style={styles.post}>
        <View style={styles.authorInfoRow}>
          <Image
            source={require('../../../src/assets/images/minh-logo.png')}
            style={styles.authorAvatar}
          />
          <View>
            <Text style={styles.authorName}>Minh Techie</Text>
            <Text style={styles.postedTime}>Today</Text>
          </View>
        </View>

        <View>
          <Text style={styles.postContentText}>
            Like and subscribe to Minh Techie channel
          </Text>
          <Image
            source={require('../../../src/assets/images/minh-banner.png')}
            style={styles.postImage}
          />
        </View>

        <TouchableOpacity
          style={styles.actionContainer}
          onLongPress={() => {
            setShowEmojis(!showEmojis);
          }}>
          <Image
            source={
              selectedEmojiIndex !== null
                ? emojisData[selectedEmojiIndex]
                : require('../../assets/images/facebook-emojis/like.png')
            }
            style={styles.likeIcon}
          />
          <Text style={styles.likeText}>Like</Text>
        </TouchableOpacity>

        {showEmojis && (
          <Animated.View
            style={[styles.emojisBar, emojisBarAnimation]}
            {...panResponder.panHandlers}>
            {/* render emojis */}
            {emojisData.map((emojiSource, index) => {
              return (
                <Animated.Image
                  key={index}
                  source={emojiSource}
                  style={[
                    styles.emoji,
                    {
                      transform: [
                        {
                          scale: emojiAnimatedValue.current[index],
                        },
                      ],
                    },
                  ]}
                />
              );
            })}
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FacebookPostReaction;
