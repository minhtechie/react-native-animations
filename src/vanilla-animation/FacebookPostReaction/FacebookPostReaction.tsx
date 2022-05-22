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
import styles, {EMOJIS_CONTAINER_HEIGHT, EMOJI_SIZE} from './facebookStyles';

const FacebookPostReaction = () => {
  const [showEmojis, setShowEmojis] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const likeAnimatedValue = useRef(new Animated.Value(1)).current;
  const loveAnimatedValue = useRef(new Animated.Value(1)).current;
  const hahaAnimatedValue = useRef(new Animated.Value(1)).current;
  const wowAnimatedValue = useRef(new Animated.Value(1)).current;
  const sadAnimatedValue = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const moveX = gesture.moveX;
        if (moveX >= 0 && moveX < 200) {
          const index = Math.floor(moveX / (EMOJIS_CONTAINER_HEIGHT / 5));
          switch (index) {
            case 1: {
              likeAnimatedValue.setValue(2);
              loveAnimatedValue.setValue(1);
              hahaAnimatedValue.setValue(1);
              wowAnimatedValue.setValue(1);
              sadAnimatedValue.setValue(1);
              break;
            }
            case 2: {
              likeAnimatedValue.setValue(1);
              loveAnimatedValue.setValue(2);
              hahaAnimatedValue.setValue(1);
              wowAnimatedValue.setValue(1);
              sadAnimatedValue.setValue(1);
              break;
            }
            case 3: {
              likeAnimatedValue.setValue(1);
              loveAnimatedValue.setValue(1);
              hahaAnimatedValue.setValue(2);
              wowAnimatedValue.setValue(1);
              sadAnimatedValue.setValue(1);
              break;
            }
            case 4: {
              likeAnimatedValue.setValue(1);
              loveAnimatedValue.setValue(1);
              hahaAnimatedValue.setValue(1);
              wowAnimatedValue.setValue(2);
              sadAnimatedValue.setValue(1);
              break;
            }
            case 5: {
              likeAnimatedValue.setValue(1);
              loveAnimatedValue.setValue(1);
              hahaAnimatedValue.setValue(1);
              wowAnimatedValue.setValue(1);
              sadAnimatedValue.setValue(2);
              break;
            }
          }
        }
      },
      // onPanResponderRelease: (event, gesture) => {},
    }),
  ).current;

  useEffect(() => {
    if (showEmojis) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      animatedValue.setValue(0);
    }
  }, [showEmojis, animatedValue]);

  const emojisContainerAnimation = {
    transform: [{scale: animatedValue}],
  };

  return (
    <View style={styles.container}>
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
            source={require('../../assets/images/facebook-emojis/like.png')}
            style={styles.likeIcon}
          />
          <Text style={styles.likeText}>Like</Text>
        </TouchableOpacity>

        {showEmojis && (
          <Animated.View
            style={[styles.emojisContainer, emojisContainerAnimation]}
            {...panResponder.panHandlers}>
            <Animated.Image
              source={require('../../assets/images/facebook-emojis/like.gif')}
              style={[styles.emoji, {transform: [{scale: likeAnimatedValue}]}]}
            />
            <Animated.Image
              source={require('../../assets/images/facebook-emojis/love.gif')}
              style={[styles.emoji, {transform: [{scale: loveAnimatedValue}]}]}
            />
            <Animated.Image
              source={require('../../assets/images/facebook-emojis/haha.gif')}
              style={[styles.emoji, {transform: [{scale: hahaAnimatedValue}]}]}
            />
            <Animated.Image
              source={require('../../assets/images/facebook-emojis/wow.gif')}
              style={[styles.emoji, {transform: [{scale: wowAnimatedValue}]}]}
            />
            <Animated.Image
              source={require('../../assets/images/facebook-emojis/sad.gif')}
              style={[styles.emoji, {transform: [{scale: sadAnimatedValue}]}]}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default FacebookPostReaction;
