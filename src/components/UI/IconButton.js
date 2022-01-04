import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

import HeeboText from '../UI/HeeboText';

const IconButton = ({name, title, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.buttonContainer, props.style]}>
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
    backgroundColor: 'whitesmoke',
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
});

export default IconButton;
