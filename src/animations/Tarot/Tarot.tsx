import {
  View,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {tarotData} from '../../data/tarotData';
import {FlatList} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');

const Tarot = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
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
      <FlatList
        contentContainerStyle={styles.scrollViewTarot}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tarotData}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          return (
            <View style={styles.tarotCard}>
              <Image source={item.image} style={styles.tarotItemImage} />
            </View>
          );
        }}
      />
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
  scrollViewTarot: {
    marginTop: 100,
  },
  tarotCard: {
    marginRight: 12,
  },
  tarotItemImage: {
    height: 124,
    width: 72,
  },
});
export default Tarot;
