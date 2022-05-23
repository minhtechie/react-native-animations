import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modal: {
    width: '80%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 8
  },
  header: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeBtn: {
    position: 'absolute',
    right: 16
  }
});
