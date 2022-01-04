import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

import HeeboText from '../UI/HeeboText';

const IconButton = ({name, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Icon name={name} size={24} color={Colors.primaryColor} />
        {title && (
          <HeeboText style={{color: Colors.primaryColor}}>{title}</HeeboText>
        )}
      </View>
    </TouchableOpacity>
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

export default IconButton;
