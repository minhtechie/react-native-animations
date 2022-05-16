import React, { useRef, useState } from 'react';
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
import { menu1Data, menu2Data, menu3Data } from '../../data/menuData';
import Line from './components/Line';

export default ({ navigation }: any) => {
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
        style={[styles.searchPlaceholder, searchPlaceholderAnimation]}>
        <SafeAreaView />
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <SearchInput editable={false} pointerEvents="none" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Animated.Image
          source={require('../../assets/images/food-app/left-arrow.png')}
          style={[styles.backIcon, backIconAnimation]}
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
                contentOffset: { y: animatedValue },
              },
            },
          ],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}>
        <View style={styles.paddingForBanner} />

        <View style={styles.scrollViewContent}>
          <View style={styles.shopDetailsCard}>
            <View style={styles.shopNameWrapper}>
              <Text style={styles.shopName}>Minh Techie Restaurant</Text>
              <Image
                source={require('../../assets/images/food-app/right-arrow.png')}
                style={[styles.icon, styles.iconRightArrow]}
              />
            </View>
            <Line />
            <View style={styles.flexRow}>
              <View style={[styles.cardRow, styles.width30]}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingPointText}>4.5</Text>
                <Text style={styles.numberOfRatings}>(76)</Text>
              </View>
              <View style={styles.cardRow}>
                <View style={styles.dot}></View>
                <Text style={styles.primaryText}>Ratings and reviews</Text>
              </View>
              <Image
                source={require('../../assets/images/food-app/right-arrow.png')}
                style={[styles.icon, styles.iconRightArrow]}
              />
            </View>
            <Line />
            <View style={styles.flexRow}>
              <View>
                <Image
                  source={require('../../assets/images/food-app/distance.png')}
                  style={styles.icon}
                />
              </View>
              <View>
                <View style={styles.distanceRow}>
                  <Text style={styles.distance}>0.5 km</Text>
                  <Text style={styles.numberOfRatings}> (20 mins)</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={[styles.subText, styles.mLeft4]}>Deliver now</Text>
                  <View style={styles.column}></View>
                  <Image
                    source={require('../../assets/images/food-app/motorcycle.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.subText}>16.000đ</Text>
                </View>
              </View>
              <Image
                source={require('../../assets/images/food-app/right-arrow.png')}
                style={[styles.icon, styles.iconRightArrow]}
              />
            </View>
            <Line />
            <View style={styles.cardRow}>
              <Image
                source={require('../../assets/images/food-app/tag.png')}
                style={styles.icon}
              />
              <Text style={[styles.primaryText, styles.mLeft4]}>Enjoys discount on items</Text>
              <Image
                source={require('../../assets/images/food-app/right-arrow.png')}
                style={[styles.icon, styles.iconRightArrow]}
              />
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
      android: { elevation: 3 },
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
    // alignItems: 'center',
    padding: 16,
    marginTop: -40,
    marginBottom: 40,
    borderRadius: 8,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#d3d3d3',
        shadowOpacity: 1,
        shadowRadius: 3,
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
    marginBottom: 5
  },
  shopAddressTextRow: {
    fontSize: 12,
    marginVertical: 16,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  distance: {
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 4,
    marginRight: 2,
  },
  shopAddress: {
    color: '#586065',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#f6be00',
    fontSize: 16,
    marginRight: 5,
  },
  ratingPointText: {
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 4,
    marginRight: 2,
  },
  numberOfRatings: {
    color: '#607d8b',
    fontSize: 14,
    fontWeight: 400,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#222222',
    marginRight: 10,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: 400,
  },
  subText: {
    fontSize: 12,
    fontWeight: 400,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  iconRightArrow: {
    position: 'absolute',
    right: 0,
  },
  shopNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  width30: {
    width: '30%',
  },
  mLeft4: {
    marginLeft: 4,
  },
  column: {
    height: '100%',
    width: 0.5,
    backgroundColor: '#222222',
    marginHorizontal: 5,
  },
});
