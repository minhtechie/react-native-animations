import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const getRandomTime = () => {
  return Math.random() * 50;
};

const CircledNumber = ({
  isFlashing,
  value,
}: {
  isFlashing: boolean;
  value: number;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFlashing) {
      setTimeout(() => {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          animatedValue.setValue(0);
        });
      }, value * getRandomTime());
    }
  }, [isFlashing]);

  return (
    <Animated.View
      style={[
        styles.numberContainer,
        {
          backgroundColor: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['white', '#19b5f3', 'white'],
          }),
        },
      ]}
    >
      <Animated.Text
        style={{
          color: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['black', 'white', 'black'],
          }),
        }}
      >
        {value}
      </Animated.Text>
    </Animated.View>
  );
};

const data = Array.from(Array(50).keys());

const randomTrueOrFalse = () => {
  return Math.random() < 0.2 ? false : true;
};

export default function RandomNumber() {
  const [flashingItems, setFlashingItems] = useState<Array<boolean>>([]);

  const randomNumber = () => {
    const _flashingItems: Array<boolean> = [];

    data.forEach((value, index) => {
      _flashingItems[index] = randomTrueOrFalse();
    });

    setFlashingItems(_flashingItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.numbersContainer}>
        {data.map((value, index) => (
          <CircledNumber
            key={index}
            isFlashing={flashingItems[index]}
            value={index}
          />
        ))}
      </View>
      <TouchableOpacity onPress={randomNumber} style={styles.randomButton}>
        <Text style={styles.randomButtonText}>Random numbers</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  numbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#eaeaea',
    margin: 16,
    borderRadius: 16,
  },
  numberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  randomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#19b5f3',
  },
  randomButtonText: {
    color: 'white',
  },
});
