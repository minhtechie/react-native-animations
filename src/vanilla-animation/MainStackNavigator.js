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
import TikTokTabNavigator from './TikTok/TikTokTabNavigator';

const Stack = createNativeStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
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
      <Stack.Screen name="Tinder" component={Tinder} />
      <Stack.Screen
        name="DraggableBottomSheet"
        component={DraggableBottomSheet}
        options={{title: 'Draggable Bottom Sheet'}}
      />

      <Stack.Screen
        name="ZoomableImage"
        component={ZoomableImage}
        options={{title: 'Swipe Deck'}}
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
        name="TikTikTokTabNavigatorTok"
        component={TikTokTabNavigator}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const HomeScreen = ({navigation}: any) => {
  const {navigate} = navigation;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('AnimatedList')}
        style={styles.item}>
        <Text>Animated List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('DraggableBottomSheet')}
        style={styles.item}>
        <Text>Draggable Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('Tinder')} style={styles.item}>
        <Text>Tinder</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('ZoomableImage')}
        style={styles.item}>
        <Text>Zoomable Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('SwipeableList')}
        style={styles.item}>
        <Text>Swipeable List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('PickPhoneColor')}
        style={styles.item}>
        <Text>Pick phone color</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('CubeCarousel')}
        style={styles.item}>
        <Text>Cube Carousel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('TikTikTokTabNavigatorTok')}
        style={styles.item}>
        <Text>TikTok</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
});
