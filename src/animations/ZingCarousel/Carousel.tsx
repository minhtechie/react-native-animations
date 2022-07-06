/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {useComputedAnim} from './useComputedAnim';
import {Layouts} from './Layouts';

const data = [1, 2, 3, 4, 5];
const {width} = Dimensions.get('window');
const height = 300;

const Carousel = () => {
  const computedAnimResult = useComputedAnim(width, data.length);

  const handlerOffsetX = useSharedValue<number>(0);

  const offsetX = useDerivedValue(() => {
    const x = handlerOffsetX.value % computedAnimResult.WL;
    return x;
  }, [computedAnimResult]);

  const animatedListScrollHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, ctx: any) => {
        ctx.startContentOffsetX = handlerOffsetX.value;
      },
      onActive: (e, ctx: any) => {
        handlerOffsetX.value = ctx.startContentOffsetX + e.translationX;
        // console.log(
        //   handlerOffsetX.value,
        //   computedAnimResult.WL,
        //   handlerOffsetX.value % computedAnimResult.WL,
        // );
      },
    });

  return (
    <PanGestureHandler onHandlerStateChange={animatedListScrollHandler}>
      <Animated.View
        style={{
          // Specify the width and height of the carousel container, most of our calculations need to rely on the known width.
          width,
          height,
          flexDirection: 'row',
          position: 'relative',
        }}>
        {data.map((_, i) => {
          return (
            // Layouts are containers used to control the position of elements, which will be discussed below
            <Layouts
              width={width}
              index={i}
              key={i}
              offsetX={offsetX}
              computedAnimResult={computedAnimResult}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'black',
                }}>
                <Text style={{fontSize: 100}}>{i}</Text>
              </View>
            </Layouts>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Carousel;
