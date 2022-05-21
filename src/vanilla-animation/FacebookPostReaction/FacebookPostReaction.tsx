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
import styles from './facebookStyles';

const FacebookPostReaction = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log(gesture.dx);
        // animatedValue.setValue(gesture.dx);
      },
      onPanResponderRelease: (event, gesture) => {},
    }),
  ).current;

  const animatedValue = useRef(new Animated.Value(0)).current;

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
          <View style={styles.emojisContainer} {...panResponder.panHandlers}>
            <Image
              source={require('../../assets/images/facebook-emojis/like.gif')}
              style={styles.emoji}
            />
            <Image
              source={require('../../assets/images/facebook-emojis/love.gif')}
              style={styles.emoji}
            />
            <Image
              source={require('../../assets/images/facebook-emojis/haha.gif')}
              style={styles.emoji}
            />
            <Image
              source={require('../../assets/images/facebook-emojis/wow.gif')}
              style={styles.emoji}
            />
            <Image
              source={require('../../assets/images/facebook-emojis/sad.gif')}
              style={styles.emoji}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default FacebookPostReaction;
