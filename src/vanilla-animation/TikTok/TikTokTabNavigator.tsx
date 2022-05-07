import React, {useState} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';

import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import VideoItem from './VideoItem';
import videosData from '../../data/videosData';
import {WINDOW_HEIGHT} from '../../utils';

const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const bottomTabHeight = useBottomTabBarHeight();

  return (
    <FlatList
      data={videosData}
      pagingEnabled
      renderItem={({item, index}) => (
        <VideoItem data={item} isActive={activeVideoIndex === index} />
      )}
      onScroll={e => {
        const index = Math.round(
          e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight),
        );
        setActiveVideoIndex(index);
      }}
    />
  );
};

export default () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: 'black'},
        headerShown: false,
        tabBarActiveTintColor: 'white',
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tiktok/home.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tiktok/search.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewVideo"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tiktok/new-video.png')}
              style={[
                styles.newVideoButton,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Inbox"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tiktok/message.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/images/tiktok/user.png')}
              style={[
                styles.bottomTabIcon,
                focused && styles.bottomTabIconFocused,
              ]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  bottomTabIconFocused: {
    tintColor: 'white',
  },
  newVideoButton: {
    width: 48,
    height: 24,
  },
});
