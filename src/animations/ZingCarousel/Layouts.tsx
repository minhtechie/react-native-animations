import React from 'react';
import {FlexStyle, View} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {IComputedAnimResult} from './useComputedAnim';
import {useOffsetX} from './useOffset';

export const Layouts: React.FC<{
  index: number;
  width: number;
  height?: FlexStyle['height'];
  offsetX: Animated.SharedValue<number>;
  computedAnimResult: IComputedAnimResult;
}> = props => {
  const {
    index,
    width,
    children,
    height = '100%',
    offsetX,
    computedAnimResult,
  } = props;

  const x = useOffsetX({
    offsetX,
    index,
    width,
    computedAnimResult,
  });

  const offsetXStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value - index * width}],
    };
  }, []);

  return (
    <Animated.View style={offsetXStyle}>
      <View style={{width, height}}>{children}</View>
    </Animated.View>
  );
};

export default Layouts;
