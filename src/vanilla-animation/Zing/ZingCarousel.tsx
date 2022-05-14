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

  const depositViewAnimation = {
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

  const textAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
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
        style={[
          {
            width: '100%',
            height: 400,
            position: 'absolute',
            resizeMode: 'cover',
          },
          bannerAnimation,
        ]}
      />
      <AnimatedSafeArea style={[depositViewAnimation]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 32,
            justifyContent: 'space-around',
          }}>
          <View style={{flex: 1}}>
            <Image
              source={require('../../assets/images/user.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
          <View style={{flex: 3}}>
            <AnimatedTextInput
              placeholder="Tìm kiếm bài hát,playlist...."
              placeholderTextColor="white"
              style={[
                {
                  backgroundColor: 'rgba(255, 255, 255,0.4)',
                  fontSize: 12,
                  color: 'white',
                  borderRadius: 20,
                  paddingVertical: 4,
                  paddingLeft: 32,
                },
                textAnimation,
              ]}
            />
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              source={require('../../assets/images/momo/bell.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: 'white',
              }}
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
            paddingTop: 300,
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
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setActiveImage(item.image);
                      setActiveIndex(index);
                    }}>
                    <Image
                      source={item.image}
                      style={{
                        borderRadius: 60,
                        width: 80,
                        height: 80,
                        borderWidth: 2,
                        borderColor: 'red',
                        position: 'relative',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 72,
                        backgroundColor: 'red',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 8,
                          fontWeight: 'bold',
                          padding: 1,
                        }}>
                        LIVE
                      </Text>
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
});
export default ZingCarousel;
