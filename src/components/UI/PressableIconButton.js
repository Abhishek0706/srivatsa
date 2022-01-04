import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import HeeboText from './HeeboText';

const PressableIconButton = ({name, title, onPressIn, onPressOut}) => {
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <View style={styles.buttonContainer}>
        <Icon name={name} size={24} color={Colors.primaryColor} />
        {title && <HeeboText>{title}</HeeboText>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    padding: 10,
  },
});

export default PressableIconButton;
