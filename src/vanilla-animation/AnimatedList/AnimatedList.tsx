import React, {useEffect, useRef, useState} from 'react';
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
import {WINDOW_HEIGHT} from '../../utils';

const HEADER_HEIGHT = 120;

export default ({navigation}: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);
  const [cords, setCords] = useState([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const selectRef = useRef<any>({value: 1, silent: false});

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

  useEffect(() => {
    const scrollHandler = () => {
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: cords[selectedValue] + HEADER_HEIGHT,
        animated: false,
      });
    };

    if (
      selectRef.current.value !== selectedValue &&
      !selectRef.current.silent
    ) {
      scrollHandler();
    }

    selectRef.current.silent = false;
    selectRef.current.value = selectedValue;
  }, [selectedValue, cords]);

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.y /
        (WINDOW_HEIGHT -
          HEADER_HEIGHT -
          selectedValue * 15 -
          40 -
          (Platform.OS === 'android' ? 0 : 75)),
    );

    if (index > 0 && selectedValue !== index) {
      selectRef.current.silent = true;
      setSelectedValue(index);
    }
  };
  const _selectedChange = (e: any) => setSelectedValue(e);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <Animated.View
        style={[styles.searchPlaceholder, searchPlaceholderAnimation]}>
        <SafeAreaView />
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <SearchInput
            selectedValue={selectedValue}
            selectedChange={_selectedChange}
          />
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
        ref={scrollViewRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animatedValue,
                },
              },
            },
          ],
          {useNativeDriver: false, listener: event => handleScroll(event)},
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

          <Menu
            title="Recommended Menu"
            id={1}
            cords={cords}
            setCords={setCords}>
            {menu1Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Crispy Chicken" id={2} cords={cords} setCords={setCords}>
            {menu2Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Dessert" id={3} cords={cords} setCords={setCords}>
            {menu3Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Special Menu" id={4} cords={cords} setCords={setCords}>
            {menu1Data.map(item => (
              <MenuItem {...item} key={item.id} />
            ))}
          </Menu>
          <Menu title="Hot Menu" id={5} cords={cords} setCords={setCords}>
            {menu1Data.map(item => (
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
