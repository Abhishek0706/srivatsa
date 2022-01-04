import React from 'react';
import {Text} from 'react-native';

const HeeboText = props => (
  <Text {...props} style={{...props.style, fontFamily: 'Heebo-Medium'}}>
    {props.children}
  </Text>
);

export default HeeboText;
