import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {genresData} from '../../data/genresData';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../utils';

const CAROUSEL_ITEM_SIZE = WINDOW_WIDTH * 0.27;
const CAROUSEL_ITEM_IMAGE_SIZE = CAROUSEL_ITEM_SIZE * 0.8;
const CAROUSEL_ITEM_SPACER = (WINDOW_WIDTH - CAROUSEL_ITEM_SIZE * 3) / 2;

const ZingCarousel = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(2);

  const scrollYValue = useRef(new Animated.Value(0)).current;
  const scrollXValue = useRef(new Animated.Value(0)).current;

  const bannerAnimation = {
    transform: [
      {
        scale: scrollYValue.interpolate({
          inputRange: [-200, 0, 100],
          outputRange: [2, 1, 1],
        }),
      },
    ],
  };

  useEffect(() => {
    setGenres([{id: 'left-space'}, ...genresData, {id: 'right-space'}]);
  }, []);

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          scrollYValue.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}>
        <View style={styles.spaceForBanner} />
        <Image
          source={require('../../images/zing/curve.png')}
          style={styles.curve}
        />
        <FlatList
          style={styles.carousel}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CAROUSEL_ITEM_SIZE}
          decelerationRate={0}
          bounces={false}
          data={genres}
          scrollEventThrottle={16}
          renderItem={({item, index}) => {
            if (!item.image) {
              return <View style={{width: CAROUSEL_ITEM_SPACER}} />;
            }
            const inputRange = [
              (index - 3) * CAROUSEL_ITEM_SIZE,
              (index - 2) * CAROUSEL_ITEM_SIZE,
              (index - 1) * CAROUSEL_ITEM_SIZE,
            ];
            const scale = scrollXValue.interpolate({
              inputRange,
              outputRange: [1, 1.25, 1],
              extrapolate: 'clamp',
            });
            const translateY = scrollXValue.interpolate({
              inputRange,
              outputRange: [8, -8, 8],
            });

            return (
              <TouchableOpacity style={styles.carouselItem}>
                <Animated.Image
                  source={item.image}
                  style={[
                    styles.carouselItemImage,
                    {transform: [{scale}, {translateY}]},
                  ]}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          onScroll={e => {
            scrollXValue.setValue(e.nativeEvent.contentOffset.x);
          }}
          onMomentumScrollEnd={e => {
            const index =
              Math.round(e.nativeEvent.contentOffset.x / CAROUSEL_ITEM_SIZE) +
              2;
            setActiveItemIndex(index);
          }}
        />

        <View style={styles.scrollViewContent} />
      </ScrollView>
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
