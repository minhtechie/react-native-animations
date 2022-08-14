import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {musicData} from '../../data/musicData';
import {WINDOW_HEIGHT} from '../../utils';

const ZingCarousel = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <Image source={musicData[0].bannerImage} style={styles.banner} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.spaceForBanner} />
        <FlatList
          style={styles.carousel}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={musicData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.carouselItem} activeOpacity={1}>
                <Image source={item.image} style={styles.carouselItemImage} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.image}
          onScroll={e => {
            animatedValue.setValue(e.nativeEvent.contentOffset.x);
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
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: 320,
    position: 'absolute',
    resizeMode: 'cover',
  },
  spaceForBanner: {
    paddingTop: 320,
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
    width: 80,
    height: 80,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItemImage: {
    borderRadius: 60,
    width: 80,
    height: 80,
  },
});
export default ZingCarousel;
