import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {MusicLiveInterface} from './types';

export default function MusicLiveModal(props: MusicLiveInterface) {
  const {visible, onClose, imageBanner} = props;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <ImageBackground
          source={imageBanner}
          resizeMode="cover"
          style={styles.imageBackgroud}>
          <SafeAreaView>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('../../../assets/images/zing/left-arrow.png')}
                style={styles.iconBack}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </Modal>
  );
}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageBackgroud: {
    height: HEIGHT,
    width: WIDTH,
  },
  iconBack: {
    width: 20,
    height: 20,
    tintColor: 'white',
    position: 'absolute',
    marginLeft: 16,
  },
});
