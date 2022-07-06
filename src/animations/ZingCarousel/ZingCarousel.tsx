import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import {genresData} from '../../data/genresData';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../utils';

const CAROUSEL_ITEM_SIZE = WINDOW_WIDTH * 0.27;
const CAROUSEL_ITEM_IMAGE_SIZE = CAROUSEL_ITEM_SIZE * 0.8;
const CAROUSEL_ITEM_SPACER = (WINDOW_WIDTH - CAROUSEL_ITEM_SIZE * 3) / 2;
type PanGestureHandlerContextType = {
  x: number;
};

const CarouselItem = ({index, imageSource, translationX}) => {
  const inputRange = [
    (index - 3) * CAROUSEL_ITEM_SIZE,
    (index - 2) * CAROUSEL_ITEM_SIZE,
    (index - 1) * CAROUSEL_ITEM_SIZE,
  ];
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   scale: interpolate(
        //     -translationX.value,
        //     inputRange,
        //     [1, 1.25, 1],
        //     Extrapolate.CLAMP,
        //   ),
        // },
        {
          translateX: translationX.value,
        },
        {
          translateY: interpolate(-translationX.value, inputRange, [8, -18, 8]),
        },
      ],
    };
  });

  return (
    <View style={[styles.carouselItem]}>
      <Animated.Image
        source={imageSource}
        style={[styles.carouselItemImage, animationStyle]}
      />
    </View>
  );
};

const ZingCarousel = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(2);

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const clampedTranslationX = useDerivedValue(() => {
    return translationX.value;
    // const MAX_TRANSLATION_X = -((CARD_WIDTH / 2) * (tarotData.length - 1));
    // return Math.max(
    //   Math.min(translationX.value, -CARD_WIDTH * 2),
    //   MAX_TRANSLATION_X,
    // );
  });

  const bannerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(translationY.value, [-200, 0, 100], [2, 1, 1]),
        },
      ],
    };
  });

  useEffect(() => {
    setGenres([{id: 'left-space'}, ...genresData, {id: 'right-space'}]);
  }, []);

  const scrollHandler = useAnimatedScrollHandler(e => {
    translationY.value = e.contentOffset.y;
  });

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
      <StatusBar barStyle={'light-content'} />
      {genres.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <Animated.Image
          source={genres[activeItemIndex].bannerImage}
          style={[styles.banner, bannerAnimation]}
        />
      )}

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <View style={styles.spaceForBanner} />
        <Image
          source={require('../../images/zing/curve.png')}
          style={styles.curve}
        />
        <GestureHandlerRootView style={styles.carousel}>
          <PanGestureHandler onGestureEvent={animatedGestureHandler}>
            <Animated.View style={{flexDirection: 'row'}}>
              {genres.map((item, index) => {
                if (!item.image) {
                  return (
                    <View key={index} style={{width: CAROUSEL_ITEM_SPACER}} />
                  );
                }

                return (
                  <CarouselItem
                    key={index}
                    index={index}
                    imageSource={item.image}
                    translationX={clampedTranslationX}
                  />
                );
              })}
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>

        <View style={styles.scrollViewContent} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 400,
    position: 'absolute',
    resizeMode: 'cover',
  },
  spaceForBanner: {
    paddingTop: 400,
  },
  curve: {
    position: 'absolute',
    width: '105%',
    top: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT * 2,
    backgroundColor: '#09172a',
  },
  carousel: {
    position: 'absolute',
    top: 280,
    zIndex: 100,
  },
  carouselItem: {
    width: CAROUSEL_ITEM_SIZE,
    height: CAROUSEL_ITEM_SIZE * 1.25 + 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  carouselItemImage: {
    borderRadius: CAROUSEL_ITEM_IMAGE_SIZE / 2,
    width: CAROUSEL_ITEM_IMAGE_SIZE,
    height: CAROUSEL_ITEM_IMAGE_SIZE,
  },
});
export default ZingCarousel;
