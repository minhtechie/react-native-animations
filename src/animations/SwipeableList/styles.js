import {StyleSheet} from 'react-native';

import {WINDOW_WIDTH} from '../../utils';

export const ITEM_HEIGHT = 64;
export const DELETE_BUTTON_WIDTH = WINDOW_WIDTH / 3;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    margin: 12,
  },
  itemText: {
    color: 'white',
  },
  itemLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  itemRight: {
    position: 'absolute',
    transform: [
      {
        translateX: DELETE_BUTTON_WIDTH * 2,
      },
    ],
    width: DELETE_BUTTON_WIDTH,
    height: '100%',
    right: 0,
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
});
