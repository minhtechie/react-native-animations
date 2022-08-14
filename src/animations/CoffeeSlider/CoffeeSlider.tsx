import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  PanResponder,
  Animated,
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {WINDOW_HEIGHT} from '../../utils';

const COFFEE_DATA = [
  {
    id: 1,
    name: 'Caramel Cold Drink',
    image: require('../../images/coffee/1.png'),
  },
  {
    id: 2,
    name: 'Iced Coffe Mocha',
    image: require('../../images/coffee/2.png'),
  },
  {
    id: 3,
    name: 'Caramelized Pecan Latte',
    image: require('../../images/coffee/3.png'),
  },
  {
    id: 4,
    name: 'Caramelized Pecan Latte',
    image: require('../../images/coffee/3.png'),
  },
  {
    id: 5,
    name: 'Caramelized Pecan Latte',
    image: require('../../images/coffee/3.png'),
  },
  {
    id: 6,
    name: 'Vietnamese-Style Iced Coffee',
    image: require('../../images/coffee/6.png'),
  },
];

const SLIDER_HEIGHT = WINDOW_HEIGHT - 120;
const IMG_HEIGHT = SLIDER_HEIGHT * 0.7;

const getOpacity = (index: number) => {
  switch (index) {
    case 0:
    case 1:
      return 1;
    case 2:
      return 0.5;
    default:
      return 0;
  }
};

const CoffeeItem = ({
  image,
  style,
}: {
  image: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.sliderItem, style]}>
      <Image source={image} style={styles.sliderImage} />
    </View>
  );
};

export default function CoffeeSlider() {
  // const [currentPageIndex, setCurrentPageIndex] = useState(0);
  let imageScale = 1;
  let prevTranslateY = 0;
  let imageTranslateY = 0;

  // const animatedValue = useRef(new Animated.Value(0)).current;
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderMove: (e, gesture) => {
  //       animatedValue.setValue();
  //     },
  //     onPanResponderRelease: (e, gesture) => {},
  //   }),
  // ).current;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: 120}}>{/* <Text>Up</Text> */}</SafeAreaView>
      <View style={styles.slider}>
        {COFFEE_DATA.map(({id, image}, index) => {
          const isFirstItem = index === 0;
          imageScale = isFirstItem ? 1 : imageScale * 0.5;
          imageTranslateY = isFirstItem
            ? 0
            : prevTranslateY + -IMG_HEIGHT * imageScale;
          prevTranslateY = imageTranslateY;

          return (
            <CoffeeItem
              key={id}
              image={image}
              style={[
                styles.sliderItem,
                {
                  transform: [
                    {translateY: imageTranslateY},
                    {
                      scale: imageScale,
                    },
                  ],
                  // opacity: getOpacity(index),
                  opacity: 1,
                },
              ]}
            />
          );
        }).reverse()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sliderItem: {
    position: 'absolute',
  },
  sliderImage: {
    height: IMG_HEIGHT,
    aspectRatio: 0.65,
    resizeMode: 'contain',
  },
});
