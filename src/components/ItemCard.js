import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HeeboText from '../components/UI/HeeboText';
import Colors from '../constants/Colors';

const ItemCard = ({id, title, onPress}) => {
  const selected = useSelector(state => state.items).find(
    item => item.id === id,
  ).selected;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.cardContiner,
          {
            backgroundColor: selected
              ? Colors.selectedColor
              : Colors.unSelectedColor,
          },
        ]}>
        <HeeboText style={{color: 'white'}} numberOfLines={2}>
          {title}
        </HeeboText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContiner: {
    borderRadius: 7,
    paddingHorizontal: 5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ItemCard;
