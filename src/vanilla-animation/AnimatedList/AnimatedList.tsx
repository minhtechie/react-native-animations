import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import SearchInput from './components/SearchInput';
import SearchModal from './components/SearchModal';
import {menu1Data, menu2Data, menu3Data} from '../../data/menuData';

export default ({navigation}: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [searchModalVisible, setSearchModalVisible] = useState(false);

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

  const searchPlaceholderAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
    }),
  };

  const searchIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <Animated.View
        style={[styles.searchPlaceholder, searchPlaceholderAnimation]}>
        <SafeAreaView />
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <SearchInput editable={false} pointerEvents="none" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/images/food-app/left-arrow.png')}
          style={[styles.backIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setSearchModalVisible(true)}>
        <Animated.Image
          source={require('../../assets/images/food-app/search.png')}
          style={[styles.searchIcon, searchIconAnimation]}
        />
      </TouchableOpacity>
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />
      <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
        <Image
          style={styles.banner}
          source={require('../../assets/images/food-app/foodBanner.png')}
        />
        <LinearGradient
          style={styles.gradient}
          colors={['black', 'black', 'transparent']}
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

        <View style={styles.scrollViewContent}>
          <View style={styles.shopDetailsCard}>
            <Text style={styles.shopName}>Minh Techie Restaurant</Text>
            <Text style={styles.shopAddressTextRow}>
              <Text style={styles.distance}>6.9km</Text>
              <Text> - </Text>
              <Text style={styles.shopAddress}>177a Bleecker Street</Text>
            </Text>
            <View style={styles.ratingsRow}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingPointText}>5</Text>
              <Text style={styles.numberOfRatings}>(999+)</Text>
            </View>
          </View>

          <Menu title="Recommended Menu">
            {menu1Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Crispy Chicken">
            {menu2Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Dessert">
            {menu3Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
        </View>
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
    right: 24,
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
    left: 24,
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
  searchPlaceholder: {
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
  gradient: {
    position: 'absolute',
    opacity: 0.6,
    width: '100%',
    height: 124,
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  shopDetailsCard: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: -40,
    marginBottom: 40,
    borderRadius: 8,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  shopName: {
    color: '#101825',
    fontSize: 24,
    fontWeight: 'bold',
  },
  shopAddressTextRow: {
    fontSize: 12,
    marginVertical: 16,
  },
  distance: {
    fontWeight: 'bold',
    color: '#607d8b',
  },
  shopAddress: {
    color: '#586065',
  },
  ratingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star: {
    color: '#f6be00',
    fontSize: 16,
  },
  ratingPointText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
    marginRight: 2,
  },
  numberOfRatings: {
    color: '#607d8b',
    fontSize: 12,
  },
});
