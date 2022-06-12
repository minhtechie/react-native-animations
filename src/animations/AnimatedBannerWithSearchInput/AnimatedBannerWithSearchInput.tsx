import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {WINDOW_HEIGHT} from '../../utils';
import SearchInput from './SearchInput';

export default ({navigation}: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const bannerAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-200, 0],
          outputRange: [2, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const searchInputContainerAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 40],
          outputRange: [0, 1, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const searchIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  const backIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <Animated.View
        style={[styles.searchInputContainer, searchInputContainerAnimation]}>
        <SafeAreaView />
        <SearchInput editable={false} pointerEvents="none" />
      </Animated.View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Animated.Image
          source={require('../../images/food-app/left-arrow.png')}
          style={[styles.backIcon, backIconAnimation]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <Animated.Image
          source={require('../../images/food-app/search.png')}
          style={[styles.searchIcon, searchIconAnimation]}
        />
      </TouchableOpacity>
      <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
        <Image
          style={styles.banner}
          source={require('../../images/minh-banner.png')}
        />
      </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: animatedValue},
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <View style={styles.paddingForBanner} />
        <View style={styles.scrollViewContent} />
      </ScrollView>
    </View>
  );
};

const BANNER_HEIGHT = 224;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    top: 48,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  searchIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
    zIndex: 50,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 48,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
    zIndex: 50,
  },
  searchInputContainer: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  bannerContainer: {
    position: 'absolute',
    height: BANNER_HEIGHT,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT,
    backgroundColor: 'white',
  },
});
