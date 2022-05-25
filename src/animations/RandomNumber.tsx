import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        animatedValue.setValue(0);
      });
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

const arr = Array.from(Array(50).keys());

const randomRoundNumber = () => {
  return Math.floor(Math.random() * 50);
};

export default function LoginScreen() {
  const [randomedNumber, setRandomedNumber] = useState(-1);

  const randomNumber = () => {
    for (let i = 1; i <= 20; i++) {
      setTimeout(() => {
        setRandomedNumber(randomRoundNumber());
      }, 50 * i);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.numbersContainer}>
        {arr.map((value, index) => (
          <CircledNumber
            key={index}
            isFlashing={index === randomedNumber}
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
