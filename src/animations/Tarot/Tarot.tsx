import {View, Image, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {tarotData} from '../../data/tarotData';
import {WINDOW_WIDTH} from '../../utils';
import Card, {CARD_WIDTH} from './Card';

const getCardIndex = (positionX: number) => {
  'worklet';
  return Math.ceil(positionX / (CARD_WIDTH / 2 - 12)) - 1;
};

type PanGestureHandlerContextType = {
  x: number;
};

const Tarot = () => {
  const [cards, setCards] = useState([]);
  const [middleCardIndex, setMiddleCardIndex] = useState(0);
  // const [selectedCardIndex, setSelectedCardIndex] = useState<null | number>(
  //   null,
  // );

  const translationX = useSharedValue(0);
  const clampedTranslationX = useDerivedValue(() => {
    // return translationX.value;
    const MAX_TRANSLATION_X = -((CARD_WIDTH / 2) * (tarotData.length - 1));
    return Math.max(
      Math.min(translationX.value, -CARD_WIDTH * 2),
      MAX_TRANSLATION_X,
    );
  });
  const swipeVelocity = useSharedValue(0);

  useEffect(() => {
    setCards(tarotData);
    setMiddleCardIndex(Math.floor(tarotData.length / 2));
  }, []);

  const animatedGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureHandlerContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslationX.value;
    },
    onActive: (e, context) => {
      translationX.value = e.translationX + context.x;
    },
    onEnd: e => {
      translationX.value = withDecay({velocity: e.velocityX});
    },
  });

  return (
    <View style={styles.container}>
      {/* <Image
        source={{uri: 'https://wallpaperaccess.com/full/4503212.jpg'}}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      /> */}
      <StatusBar hidden />
      <GestureHandlerRootView style={styles.cardsContainer}>
        <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View style={styles.cardsContainer}>
            {cards.map((item, index) => {
              return (
                <Card
                  key={index}
                  index={index}
                  middleCardIndex={middleCardIndex}
                  translationX={clampedTranslationX}
                />
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  gestureHandler: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Tarot;
