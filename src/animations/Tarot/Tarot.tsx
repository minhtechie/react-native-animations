import {View, Image, Dimensions, StatusBar, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {tarotData} from '../../data/tarotData';
import {WINDOW_WIDTH} from '../../utils';
const {width} = Dimensions.get('window');

const Tarot = () => {
  const [cards, setCards] = useState([]);
  const [middleCardIndex, setMiddleCardIndex] = useState(0);

  useEffect(() => {
    setCards(tarotData);
    setMiddleCardIndex(Math.floor(tarotData.length / 2));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <Image
          source={require('../../images/tarot/reader-no-eyes.png')}
          style={styles.readerImage}
        />
        <Image
          source={require('../../images/tarot/eyes.png')}
          style={styles.readerEyesImage}
        />
      </View>
      <View style={styles.cardsContainer}>
        {cards.map((item, index) => {
          const animationStyle = {
            transform: [
              {translateX: (index + 1) * -42},
              {translateY: Math.abs((index - middleCardIndex) * 16)},
              {rotate: (index - middleCardIndex) * 8 + 'deg'},
            ],
          };
          return (
            <View style={[styles.card, animationStyle]} key={index}>
              <Image
                source={require('../../images/tarot/eye.png')}
                style={styles.eye}
              />
            </View>
          );
        })}
        <Image
          source={require('../../images/tarot/ellipse.png')}
          style={styles.ellipse}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  readerImage: {
    width,
    height: undefined,
    aspectRatio: 750 / 990,
    marginBottom: WINDOW_WIDTH * 0.06,
  },
  readerEyesImage: {
    width: 150,
    height: 64,
    position: 'absolute',
    top: WINDOW_WIDTH * 0.4,
    left: WINDOW_WIDTH * 0.35,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 0.192 * WINDOW_WIDTH,
    height: undefined,
    aspectRatio: 72 / 124,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#32519f',
  },
  eye: {
    width: 48,
    height: 48,
    tintColor: 'white',
  },
  ellipse: {
    position: 'absolute',
    bottom: -WINDOW_WIDTH * 0.65,
    width: WINDOW_WIDTH,
    height: undefined,
    aspectRatio: 390 / 258,
    alignSelf: 'center',
    tintColor: 'white',
  },
});
export default Tarot;
