import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {musicData} from '../../data/musicData';

const ZingCarousel = () => {
  const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const [activeImage, setActiveImage] = useState<string>(musicData[0].image);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentRef = useRef<FlatList>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const translateY = {
    translateY: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    }),
  };

  const headerAnimation = {
    transform: [translateY],
    opacity: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

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

  useEffect(() => {
    currentRef.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
      viewOffset: 60,
      viewPosition: 0.3,
    });
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Animated.Image
        source={activeImage}
        style={[styles.bannerMusic, bannerAnimation]}
      />
      <AnimatedSafeArea style={[headerAnimation]}>
        <View style={styles.boxHeader}>
          <View style={{flex: 1}}>
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.userIcon}
            />
          </View>
          <View style={styles.boxSearchInput}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/images/momo/search.png')}
                style={styles.searchIcon}
              />
              <AnimatedTextInput
                placeholder="Bài hát, playlist, nghệ sĩ..."
                placeholderTextColor="rgba(255, 255, 255, 0.8)"
                style={[styles.searchInput]}
              />
            </View>
            <View style={styles.boxMircro}>
              <Image
                source={require('../../assets/images/zing/micro.png')}
                style={styles.mircoIcon}
              />
            </View>
          </View>
          <View style={styles.boxBell}>
            <Image
              source={require('../../assets/images/momo/bell.png')}
              style={styles.bellIcon}
            />
          </View>
        </View>
      </AnimatedSafeArea>

      <ScrollView
        showsVerticalScrollIndicator={false}
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
        <View
          style={{
            paddingTop: 150,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: 600,
            }}>
            <FlatList
              horizontal
              initialScrollIndex={activeIndex}
              showsHorizontalScrollIndicator={false}
              ref={currentRef}
              onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  currentRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
              data={musicData}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.boxLiveMusic}
                    onPress={() => {
                      setActiveImage(item.image);
                      setActiveIndex(index);
                    }}>
                    <Image
                      source={item.image}
                      style={styles.imageLiveMusicItem}
                    />
                    <View style={styles.borderLiveMusicItem}>
                      <Text style={styles.liveMusicItemLiveTitle}>LIVE</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.image}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerMusic: {
    width: '100%',
    height: 400,
    position: 'absolute',
    resizeMode: 'cover',
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'space-around',
  },
  userIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  boxSearchInput: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 60,
    paddingVertical: 4,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    color: 'white',
    paddingVertical: 4,
    paddingLeft: 32,
    fontSize: 12,
  },
  boxMircro: {
    backgroundColor: '#1e90ff',
    borderRadius: 60,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    marginLeft: 4,
  },
  mircoIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  boxBell: {flex: 1, alignItems: 'flex-end'},
  bellIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  boxLiveMusic: {
    width: 80,
    height: 80,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLiveMusicItem: {
    borderRadius: 60,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'red',
    position: 'relative',
  },
  borderLiveMusicItem: {
    position: 'absolute',
    top: 72,
    backgroundColor: 'red',
  },
  liveMusicItemLiveTitle: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
    padding: 1,
  },
});
export default ZingCarousel;
