import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';

type MenuItemProps = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: number;
  description: string;
  style?: ViewStyle;
};
export default ({
  id,
  name,
  image,
  price,
  description,
  style,
}: MenuItemProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
      <View style={styles.dishInfo}>
        <View>
          <Text style={styles.dishName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eaeaea',
    paddingVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  dishInfo: {
    flex: 1,
    flexWrap: 'wrap',
  },
  dishName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: 'rgba(51, 51, 51, 0.8)',
    marginBottom: 8,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FE4A00',
  },
});
