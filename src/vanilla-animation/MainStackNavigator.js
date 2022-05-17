import React from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AnimatedList from './AnimatedList/AnimatedList';
import DraggableBottomSheet from './DraggableBottomSheet/DraggableBottomSheet';
import Tinder from './Tinder/Tinder';
import ZoomableImage from './ZoomableImage/ZoomableImage';
import SwipeableList from './SwipeableList/SwipeableList';
import CubeCarousel from './CubeCarousel/CubeCarousel';
import PickPhoneColor from './PickPhoneColor/PickPhoneColor';
import ReactToMessage from './ReactToMessage/ReactToMessage';
import DoubleTapToHeart from './DoubleTapToHeart/DoubleTapToHeart';
import MoMoHeader from './MomoHeader/MomoHeader';
import ZingCarousel from './Zing/ZingCarousel';
import AnimatedBannerWithSearchInput from './AnimatedBannerWithSearchInput/AnimatedBannerWithSearchInput';
import TikTokMusicDisc from './TikTokMusicDisc/TikTokMusicDisc';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: '',
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AnimatedList"
        component={AnimatedList}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="AnimatedBannerWithSearchInput"
        component={AnimatedBannerWithSearchInput}
        options={{header: () => null}}
      />
      <Stack.Screen name="Tinder" component={Tinder} />
      <Stack.Screen
        name="DraggableBottomSheet"
        component={DraggableBottomSheet}
        options={{title: 'Draggable Bottom Sheet'}}
      />
      <Stack.Screen
        name="ZoomableImage"
        component={ZoomableImage}
        options={{title: 'Zoomable Image'}}
      />
      <Stack.Screen
        name="SwipeableList"
        component={SwipeableList}
        options={{title: 'Swipeable List'}}
      />
      <Stack.Screen
        name="PickPhoneColor"
        component={PickPhoneColor}
        options={{title: 'Pick Phone Color'}}
      />
      <Stack.Screen
        name="CubeCarousel"
        component={CubeCarousel}
        options={{title: 'Cube Carousel'}}
      />
      <Stack.Screen
        name="TikTokMusicDisc"
        component={TikTokMusicDisc}
        options={{title: 'TikTok Music Disc'}}
      />
      <Stack.Screen
        name="ReactToMessage"
        component={ReactToMessage}
        options={{title: 'React To Message'}}
      />
      <Stack.Screen
        name="DoubleTapToHeart"
        component={DoubleTapToHeart}
        options={{title: 'Double Tap To Heart'}}
      />
      <Stack.Screen
        name="MoMoHeader"
        component={MoMoHeader}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="ZingCarousel"
        component={ZingCarousel}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const MenuItem = ({onPress, label}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}: any) => {
  const {navigate} = navigation;
  return (
    <SafeAreaView style={styles.container}>
      <MenuItem
        onPress={() => navigate('AnimatedList')}
        label="Animated List"
      />
      <MenuItem
        onPress={() => navigate('AnimatedBannerWithSearchInput')}
        label="Animated Banner with Search Input"
      />
      <MenuItem
        onPress={() => navigate('DraggableBottomSheet')}
        label="Draggable Bottom Sheet"
      />
      <MenuItem onPress={() => navigate('Tinder')} label="Tinder" />
      <MenuItem
        onPress={() => navigate('ZoomableImage')}
        label="Zoomable Image"
      />
      <MenuItem
        onPress={() => navigate('SwipeableList')}
        label="Swipeable List"
      />
      <MenuItem
        onPress={() => navigate('PickPhoneColor')}
        label="Pick phone color"
      />
      <MenuItem
        onPress={() => navigate('CubeCarousel')}
        label="Cube Carousel"
      />
      <MenuItem
        onPress={() => navigate('TikTokMusicDisc')}
        label="TikTok Music Disc"
      />
      <MenuItem
        onPress={() => navigate('ReactToMessage')}
        label="React To Message"
      />
      <MenuItem
        onPress={() => navigate('DoubleTapToHeart')}
        label="Double Tap To Heart"
      />
      <MenuItem onPress={() => navigate('MoMoHeader')} label="MoMo Header" />
      <MenuItem onPress={() => navigate('ZingCarousel')} label="ZingCarousel" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  item: {
    width: '50%',
    alignItems: 'center',
    padding: 8,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#0584FE',
  },
  text: {
    color: 'white',
  },
});
