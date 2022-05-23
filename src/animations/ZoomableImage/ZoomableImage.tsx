import React, {useRef} from 'react';
import {Animated, View, PanResponder, StyleSheet} from 'react-native';
import type {ImageSourcePropType} from 'react-native';

import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../utils';

interface Point {
  x: number;
  y: number;
}

interface ZoomableImageProps {
  uri: ImageSourcePropType;
  width: number;
  height: number;
  cropWidth: number;
  cropHeight: number;
}

const calcDistance = (pointA: Point, pointB: Point) => {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2),
  );
};

// const calcCenterPoint = (pointA: Point, pointB: Point) => {
//   return {
//     x: (pointA.x + pointB.x) / 2,
//     y: (pointA.y + pointB.y) / 2,
//   };
// };

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  uri,
  width: imageWidth,
  height: imageHeight,
  cropWidth,
  cropHeight,
}) => {
  /**
   * prevScale, offsetX, offsetY: for keeping track of values from previous gesture
   * so it won't jump back to original value when start new gesture
   */
  const animatedScale = useRef<any>(new Animated.Value(1)).current;
  const prevScale = useRef<number>(1);
  const initialDistance = useRef<number>(0);
  const isPinching = useRef<boolean>(false);

  const animatedTranslateX = useRef<any>(new Animated.Value(0)).current;
  const animatedTranslateY = useRef<any>(new Animated.Value(0)).current;
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);

  const calcHiddenArea = (axis: 'x' | 'y', scale: number) => {
    return axis === 'x'
      ? (imageWidth * scale - cropWidth) / 2
      : (imageHeight * scale - cropHeight) / 2;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gesture) => {
      const {
        nativeEvent: {touches},
      } = evt;
      if (touches.length === 2) {
        /* PINCHING */
        const pointA = {x: touches[0].pageX, y: touches[0].pageY};
        const pointB = {x: touches[1].pageX, y: touches[1].pageY};

        if (!isPinching.current) {
          isPinching.current = true;
          /* Get the distance between 2 finger tips when start pinch gesture */
          initialDistance.current = calcDistance(pointA, pointB);
        } else {
          const distance = calcDistance(pointA, pointB);
          /**
           * Scale's calculated base on the distance between 2 fingers while pinching
           * divided by the initial distance.
           */
          let scale = (distance / initialDistance.current) * prevScale.current;
          if (scale > 5) {
            scale = 5;
          } else if (scale < 1) {
            scale = 1;
          }
          animatedScale.setValue(scale);
        }
      } else if (touches.length === 1 && !isPinching.current) {
        /* DRAGGING */
        const currentScale = animatedScale._value;
        /* Size of the hidden area when image is zoomed in */
        const maximumX = calcHiddenArea('x', currentScale);
        const maximumY = calcHiddenArea('y', currentScale);
        /* Total drag distance on X & Y axis */
        const dx = Math.abs((gesture.dx + offsetX.current) * currentScale);
        const dy = Math.abs((gesture.dy + offsetY.current) * currentScale);
        /**
         * When the dragging distance >= size of the hidden area
         * meaning the hidden area can now be seen, stop dragging
         */
        if (maximumX > 0 && dx < maximumX) {
          animatedTranslateX.setValue(gesture.dx + offsetX.current);
        }
        if (maximumY > 0 && dy < maximumY) {
          animatedTranslateY.setValue(gesture.dy + offsetY.current);
        }
      }
    },
    onPanResponderRelease: () => {
      const currentScale = animatedScale._value;
      if (isPinching.current) {
        /**
         * If user zooms in -> drags to the corner -> zooms out
         * there'll be a blank space so we must spring the image back
         * to the corner to remove that space
         */
        const hiddenAreaX = calcHiddenArea('x', currentScale);
        const hiddenAreaY = calcHiddenArea('y', currentScale);
        const dx = Math.abs(animatedTranslateX._value * currentScale);
        const dy = Math.abs(animatedTranslateY._value * currentScale);

        if (dx > hiddenAreaX) {
          const leftEdge = hiddenAreaX / currentScale;
          const toValue = animatedTranslateX._value > 0 ? leftEdge : -leftEdge;
          Animated.spring(animatedTranslateX, {
            toValue,
            useNativeDriver: true,
          }).start(() => animatedTranslateX.setValue(toValue));
        }
        if (dy > hiddenAreaY) {
          Animated.spring(animatedTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => animatedTranslateY.setValue(0));
        }
      }
      prevScale.current = currentScale;
      offsetX.current = animatedTranslateX._value;
      offsetY.current = animatedTranslateY._value;
      isPinching.current = false;
    },
  });

  const imageAnimation = {
    transform: [
      {scale: animatedScale},
      {translateX: animatedTranslateX},
      {translateY: animatedTranslateY},
    ],
  };

  return (
    <View style={[styles.container, {width: cropWidth, height: cropHeight}]}>
      <Animated.Image
        source={uri}
        style={[
          styles.image,
          {width: imageWidth, height: imageHeight},
          imageAnimation,
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default () => (
  <View style={styles.zoomableImageContainer}>
    <ZoomableImage
      uri={require('../../images/zoomable-image/avengers.jpg')}
      width={WINDOW_WIDTH}
      height={200}
      cropWidth={WINDOW_WIDTH}
      cropHeight={WINDOW_HEIGHT}
    />
  </View>
);

const styles = StyleSheet.create({
  zoomableImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    resizeMode: 'stretch',
    backgroundColor: '#bdbdbd',
  },
});
