import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Colors from '../constants/Colors';

const ModalView = ({onPressOutside, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onPressOutside}>
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View style={styles.bottomView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={{fontSize: 24, color: 'white'}}>....</Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  bottomView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.micContainerColor,
    width: '100%',
    height: 200,
  },
});

export default ModalView;
