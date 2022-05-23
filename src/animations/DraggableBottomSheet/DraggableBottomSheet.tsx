import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

import {WINDOW_HEIGHT} from '../../utils';

const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;

const DraggableBottomView = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollOffset = useRef(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      animatedValue.setOffset(scrollOffset.current);
      animatedValue.setValue(0);
    },
    onPanResponderMove: (evt, gesture) => {
      animatedValue.setValue(gesture.dy);
    },
    onPanResponderRelease: (evt, gesture) => {
      animatedValue.flattenOffset();
      if (gesture.dy > 0) {
        // is dragging down
        if (scrollOffset.current !== 0 && gesture.dy <= 100) {
          springAnimation('up');
        } else {
          springAnimation('down');
        }
      } else {
        // is dragging up
        if (scrollOffset.current !== -300 && gesture.dy >= -100) {
          springAnimation('down');
        } else {
          springAnimation('up');
        }
      }
    },
  });

  const springAnimation = (direction: 'up' | 'down') => {
    scrollOffset.current = direction === 'down' ? 0 : -300;
    Animated.spring(animatedValue, {
      toValue: direction === 'down' ? 50 : -300,
      useNativeDriver: false,
    }).start();
  };

  const popoverAnimation = {
    height: animatedValue.interpolate({
      inputRange: [-300, 0, 50],
      outputRange: [SHEET_MAX_HEIGHT, 100, 100],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Animated.View style={[styles.popover, popoverAnimation]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle} pointerEvents={'none'} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
    bottom: 0,
    elevation: 10,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  draggableArea: {
    width: 100,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
});

export default DraggableBottomView;
