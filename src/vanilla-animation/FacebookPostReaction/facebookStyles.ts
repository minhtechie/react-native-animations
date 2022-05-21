import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  safeAreaView: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  post: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
  },
  authorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  authorName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  postedTime: {
    color: 'grey',
    fontSize: 11,
  },
  postContentText: {
    fontSize: 14,
    color: '#1c1e21',
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  likeIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  likeText: {
    fontSize: 11,
    color: '#767676',
  },
  emojisContainer: {
    position: 'absolute',
    bottom: 48,
    left: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    borderRadius: 16,
    padding: 4,
    backgroundColor: 'white',
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  emoji: {
    width: 24,
    height: 24,
  },
});
