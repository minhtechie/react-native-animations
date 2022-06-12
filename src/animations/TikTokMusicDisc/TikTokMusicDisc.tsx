import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Easing} from 'react-native';
import {getMusicNoteAnim} from './utils';

export default function TikTokMusicDisc() {
  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
  const musicNoteAnimation1 = {
    transform: [
      {
        translateX: musicNoteAnimatedValue1.interpolate({
          inputRange: [0, 1],
          outputRange: [8, -32],
        }),
      },
      {
        translateY: musicNoteAnimatedValue1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -64],
        }),
      },
      {
        rotate: musicNoteAnimatedValue1.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
    opacity: musicNoteAnimatedValue1.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 1, 0],
    }),
  };
  const musicNoteAnimation2 = {
    transform: [
      {
        translateX: musicNoteAnimatedValue2.interpolate({
          inputRange: [0, 1],
          outputRange: [8, -32],
        }),
      },
      {
        translateY: musicNoteAnimatedValue2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -64],
        }),
      },
      {
        rotate: musicNoteAnimatedValue2.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'],
        }),
      },
    ],
    opacity: musicNoteAnimatedValue2.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 1, 0],
    }),
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

  return (
    <View style={[styles.container]}>
      <View>
        <Animated.Image
          source={require('../../images/music-note.png')}
          style={[styles.floatingMusicNote, musicNoteAnimation1]}
        />
        <Animated.Image
          source={require('../../images/music-note.png')}
          style={[styles.floatingMusicNote, musicNoteAnimation2]}
        />
        <Animated.Image
          source={require('../../images/minh-logo.png')}
          style={[styles.musicDisc, discAnimation]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicDisc: {
    width: 64,
    height: 64,
  },
  floatingMusicNote: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 24,
    height: 24,
    tintColor: '#19b5f3',
  },
});
