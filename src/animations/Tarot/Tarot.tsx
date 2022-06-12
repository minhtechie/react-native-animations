import {View, Image, Dimensions, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {tarotData} from '../../data/tarotData';
const {width} = Dimensions.get('window');

const Tarot = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <Image
          source={require('../../assets/images/tarot/tarot2.png')}
          style={styles.imageBody}
        />
        <Image
          source={require('../../assets/images/tarot/eyes.png')}
          style={styles.imageEyes}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBody: {
    width,
    height: 520,
  },
  imageEyes: {
    width: 150,
    height: 64,
    position: 'absolute',
    left: 135,
    top: 150,
  },
});
export default Tarot;
