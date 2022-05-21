import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {musicData} from '../../data/musicData';

const ZingCarousel = () => {
  const [activeImageBanner, setActiveImageBanner] = useState<string>(
    musicData[0].image,
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Image source={activeImageBanner} style={styles.bannerMusic} />
      <SafeAreaView>
        <View style={styles.boxHeader}>
          <View style={styles.boxUser}>
            <Image
              source={require('../../assets/images/user.png')}
              style={styles.userIcon}
            />
          </View>
          <View style={styles.boxSearchInput}>
            <View style={styles.boxSearchIconAndSearchInput}>
              <Image
                source={require('../../assets/images/momo/search.png')}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Bài hát, playlist, nghệ sĩ..."
                placeholderTextColor="rgba(255, 255, 255, 0.8)"
                style={styles.searchInput}
              />
            </View>
            <View style={styles.boxMircro}>
              <Image
                source={require('../../assets/images/zing/micro.png')}
                style={styles.mircoIcon}
              />
            </View>
          </View>
          <View style={styles.boxBell}>
            <Image
              source={require('../../assets/images/momo/bell.png')}
              style={styles.bellIcon}
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.spaceTop} />
        <View style={styles.boxContent}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={musicData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.boxLiveMusic}
                  onPress={() => {
                    setActiveImageBanner(item.bannerImage);
                  }}>
                  <Image
                    source={item.image}
                    style={styles.imageLiveMusicItem}
                  />
                  <View style={styles.borderLiveMusicItem}>
                    <Text style={styles.liveMusicItemLiveTitle}>LIVE</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.image}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerMusic: {
    width: '100%',
    height: 400,
    position: 'absolute',
    resizeMode: 'cover',
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'space-around',
  },
  boxUser: {flex: 1},
  userIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  boxSearchIconAndSearchInput: {
    flex: 1,
    justifyContent: 'center',
  },
  boxSearchInput: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 60,
    paddingVertical: 4,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    color: 'white',
    paddingVertical: 4,
    paddingLeft: 32,
    fontSize: 12,
  },
  boxMircro: {
    backgroundColor: '#1e90ff',
    borderRadius: 60,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    marginLeft: 4,
  },
  mircoIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  boxBell: {flex: 1, alignItems: 'flex-end'},
  bellIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  boxContent: {
    height: 600,
    backgroundColor: 'white',
  },
  boxLiveMusic: {
    width: 80,
    height: 80,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLiveMusicItem: {
    borderRadius: 60,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'red',
    position: 'relative',
  },
  borderLiveMusicItem: {
    position: 'absolute',
    top: 72,
    backgroundColor: 'red',
  },
  liveMusicItemLiveTitle: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
    padding: 1,
  },
  spaceTop: {
    paddingTop: 150,
  },
});
export default ZingCarousel;
