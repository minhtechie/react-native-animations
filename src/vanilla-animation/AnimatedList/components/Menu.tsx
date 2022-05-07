import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.container}>
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
