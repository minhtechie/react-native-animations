import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default ({
  title,
  id,
  children,
  cords,
  setCords,
}: {
  id: number;
  title: string;
  cords: Array<any>;
  setCords: (e: any) => void;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={styles.container}
      key={id}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        cords[id] = layout.y;
        setCords(cords);
      }}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});
