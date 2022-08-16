import React, {useRef} from 'react';
import {Animated, PanResponder, Platform, StyleSheet, View} from 'react-native';

import {WINDOW_HEIGHT} from '../../utils';

const SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y = SHEET_MIN_HEIGHT - SHEET_MAX_HEIGHT; // negative number
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const DraggableBottomView = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();

        // lastGestureDy.current += gesture.dy;
        // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        // } else if (lastGestureDy.current > 0) {
        //   lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        // }
        if (gesture.dy > 0) {
          // is dragging down
          if (lastGestureDy.current !== 0 && gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // is dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction: 'up' | 'down') => {
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle} pointerEvents={'none'} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: SHEET_MAX_HEIGHT,
    bottom: -SHEET_MAX_HEIGHT + SHEET_MIN_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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
