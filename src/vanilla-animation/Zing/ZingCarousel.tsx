import React, {useRef} from 'react';
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
  Platform,
} from 'react-native';
import {menu1Data, menu2Data} from '../../data/menuData';

const ZingCarousel = () => {
  const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);
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
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Animated.Image
        source={require('../../assets/images/zing/chill.jpeg')}
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
            paddingHorizontal: 16,
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
            <TextInput
              placeholder="Tìm kiếm bài hát,playlist...."
              placeholderTextColor="white"
              style={{
                backgroundColor: 'rgba(255, 255, 255,0.4)',
                fontSize: 12,
                color: 'white',
                borderRadius: 20,
                paddingVertical: 4,
                paddingLeft: 32,
              }}
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {menu1Data.concat(menu2Data).map(item => {
                return (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      marginRight: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
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
                        top: 70,
                        backgroundColor: 'red',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 10,
                          fontWeight:'bold'
                        }}>
                        LIVE
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
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
