import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Animated, StyleSheet} from 'react-native';
import {WINDOW_WIDTH} from '../../utils';

const colors = [
  {code: '#fedec5', name: 'Gold'},
  {code: '#6d7a71', name: 'Green'},
  {code: '#eeeee6', name: 'Silver'},
  {code: '#545351', name: 'Space gray'},
];
const iphoneImages = [
  require('../../images/pick-phone/iphone_11_pro_max_gold.png'),
  require('../../images/pick-phone/iphone_11_pro_max_midnight_green.png'),
  require('../../images/pick-phone/iphone_11_pro_max_silver.png'),
  require('../../images/pick-phone/iphone_11_pro_max_space_gray.png'),
];

const PickPhoneColor = () => {
  const [pickedColorIndex, setPickedColorIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(5)).current;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={iphoneImages[pickedColorIndex]}
          style={[
            styles.image,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 2, 5],
                outputRange: [0, 0.2, 1],
              }),
              transform: [
                {perspective: 850},
                {
                  rotateY: animatedValue.interpolate({
                    inputRange: [0, 5],
                    outputRange: ['60deg', '0deg'],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.imageMask,
            {
              backgroundColor: colors[pickedColorIndex].code,
              transform: [{scale: animatedValue}],
            },
          ]}
        />
      </View>
      <View style={styles.grid}>
        {colors.map(({code, name}, index) => (
          <TouchableOpacity
            key={code}
            style={[styles.cell]}
            onPress={() => {
              if (index !== pickedColorIndex) {
                setPickedColorIndex(index);
                animatedValue.setValue(0);
                Animated.timing(animatedValue, {
                  toValue: 5,
                  duration: 1200,
                  useNativeDriver: true,
                }).start();
              }
            }}>
            <View style={[styles.colorOption, {backgroundColor: code}]} />
            <Text style={[index === pickedColorIndex && styles.hightlighted]}>
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '75%',
    height: '75%',
    zIndex: 100,
    resizeMode: 'contain',
  },
  imageMask: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
    borderRadius: WINDOW_WIDTH / 2,
    position: 'absolute',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cell: {
    flexBasis: '25%',
    alignItems: 'center',
    marginVertical: 16,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 1},
    marginBottom: 8,
  },
  hightlighted: {
    fontWeight: '500',
  },
});

export default PickPhoneColor;
