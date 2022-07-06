export interface IComputedAnimResult {
  MAX: number;
  MIN: number;
  WL: number;
  LENGTH: number;
}

export function useComputedAnim(
  width: number,
  LENGTH: number,
): IComputedAnimResult {
  /*
   * 1. After removing the width of the head and tail elements, the distance that the middle can slide
   * Because when approaching the head and tail, move them to the other side
   */
  const MAX = (LENGTH - 2) * width;
  const MIN = -MAX;
  const WL = width * LENGTH;

  return {
    MAX,
    MIN,
    WL,
    LENGTH,
  };
}
