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

  const formatPrice = () => {
    const result = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});

    return result.replace('VND', 'đ');
  };

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
      <View style={styles.dishInfo}>
        <View>
          <Text style={styles.dishName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.price}>{formatPrice()}</Text>
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
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: 'rgba(51, 51, 51, 0.8)',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
});
