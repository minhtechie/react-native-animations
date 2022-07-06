import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';
import type {IComputedAnimResult} from './useComputedAnim';

interface IOpts {
  index: number;
  width: number;
  computedAnimResult: IComputedAnimResult;
  offsetX: Animated.SharedValue<number>;
}

export const useOffsetX = (opts: IOpts) => {
  const {offsetX, index, width, computedAnimResult} = opts;
  const {MAX, WL, MIN, LENGTH} = computedAnimResult;

  const x = useDerivedValue(() => {
    // offset value of each element from the origin
    const Wi = width * index;

    // The starting value of each element, if it crosses the boundary, the starting position should be flipped to the other side
    const startPos = Wi > MAX ? MAX - Wi : Wi < MIN ? MIN - Wi : Wi;
    console.log(Wi, startPos, MAX);

    const inputRange = [
      // WL is the movable area with the head and tail removed
      -WL,
      // Here are the position conditions before crossing the boundary
      -((LENGTH - 2) * width + width / 2) - startPos - 1,
      // Here is the position condition after crossing the boundary
      -((LENGTH - 2) * width + width / 2) - startPos,
      // origin
      0,
      // opposite
      (LENGTH - 2) * width + width / 2 - startPos,
      // opposite
      (LENGTH - 2) * width + width / 2 - startPos + 1,
      // opposite
      WL,
    ];

    const outputRange = [
      // Corresponding to the WL cycle for a week, so return to the starting position
      startPos,
      1.5 * width - 1,
      // Turn to the other side after crossing
      -((LENGTH - 2) * width + width / 2),
      // return to starting position
      startPos,
      // Turn to the other side after crossing
      (LENGTH - 2) * width + width / 2,
      -(1.5 * width - 1),
      // Corresponding to the WL cycle for a week, so return to the starting position
      startPos,
    ];

    // Return the calculated X value. This value is an absolute position relative to the origin, but our elements are arranged in sequence, so we subtract index*width and place them at the origin.
    return interpolate(
      offsetX.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP,
    );
  }, []);
  return x;
};
