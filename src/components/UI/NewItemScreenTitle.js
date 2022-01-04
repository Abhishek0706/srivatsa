import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const NewItemScreenTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Icon name="add" size={24} color={'darkblue'} />
      <Text style={styles.title}>I have...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    margin: 10,
    fontSize: 18,
    fontFamily: 'Spartan-ExtraBold',
    color: 'darkblue',
  },
});

export default NewItemScreenTitle;
