import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {onChange} from 'react-native-reanimated';

const selections: Array<any> = [
  {id: 1, name: 'Recommended Menu'},
  {id: 2, name: 'Crispy Chicken'},
  {id: 3, name: 'Dessert'},
  {id: 4, name: 'Special Menu'},
  {id: 5, name: 'Hot Menu'},
];

export default ({
  selectedValue,
  selectedChange,
}: {
  selectedValue: number;
  selectedChange: (e: number) => void;
}) => {
  const actionSheetRef = useRef<any>();

  const _openMenu = () => {
    actionSheetRef?.current?.setModalVisible(true);
  };
  return (
    <View style={styles.inputWrapper}>
      <TouchableOpacity style={styles.input} onPress={_openMenu}>
        <TextInput
          pointerEvents="none"
          placeholder="Search in Minh Techie Restaurant..."
          placeholderTextColor="#909090"
          value={selections[selectedValue - 1]?.name}
          editable={false}
        />
        <Image
          source={require('../../../assets/images/food-app/left-arrow.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef}>
        <ScrollView
          style={styles.scrollView}
          nestedScrollEnabled={true}
          onMomentumScrollEnd={() =>
            actionSheetRef.current?.handleChildScrollEnd()
          }>
          {selections.map(item => (
            <ItemMenu
              item={item}
              active={selectedValue === item.id}
              onSelectChange={selectedChange}
            />
          ))}
        </ScrollView>
      </ActionSheet>

      <Image
        source={require('../../../assets/images/food-app/search.png')}
        style={styles.searchIcon}
      />
    </View>
  );
};

const ItemMenu = ({
  item,
  onSelectChange,
  active,
}: {
  item: any;
  onSelectChange: (e: number) => void;
  active: boolean;
}) => (
  <TouchableOpacity
    style={[styles.menuItem, active ? styles.active : null]}
    onPress={() => onSelectChange(item.id)}>
    <Text>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menu: {},
  scrollView: {
    padding: 20,
    paddingTop: 10,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    position: 'absolute',
    right: 10,
    top: 10,
    transform: [{rotate: '-90deg'}],
  },
  inputWrapper: {
    justifyContent: 'center',
  },
  input: {
    zIndex: 10,
    display: 'flex',
    padding: 8,
    marginRight: 50,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    color: '#333',
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 16,
  },
});
