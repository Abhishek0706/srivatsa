import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HeeboText from '../components/UI/HeeboText';
import Colors from '../constants/Colors';
import {setSelected} from '../store/itemsAction';

const ItemCard = ({id, title}) => {
  const selected = useSelector(state => state.items).find(
    item => item.id === id,
  ).selected;

  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(setSelected(id));
      }}>
      <View
        style={[
          styles.cardContiner,
          {
            backgroundColor: selected ? Colors.selectedColor : 'whitesmoke',
          },
        ]}>
        <HeeboText
          style={{color: selected ? 'white' : Colors.primaryColor}}
          numberOfLines={2}>
          {title}
        </HeeboText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContiner: {
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
});

export default ItemCard;
