import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GoogleCloudSpeechToText from 'react-native-google-cloud-speech-to-text';
import {useDispatch, useSelector} from 'react-redux';

import VoiceRecognizer from './VoiceRecognizer';
import {apiKey} from '../../env';
import ItemCard from '../components/ItemCard';
import ModalView from '../components/ModalView';
import HeeboText from '../components/UI/HeeboText';
import IconButton from '../components/UI/IconButton';
import NewItemScreenTitle from '../components/UI/NewItemScreenTitle';
import Colors from '../constants/Colors';
import * as ItemsAction from '../store/itemsAction';

const introdata =
  'Like chair, table, bible, iphone 7, Nike Blue UK 9 Running Shoes, RedShirt, MBW X5 Car, RV, Airgum, Drome, Rain coat, Horse etc';

const NewItemScreen = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NewItemScreenTitle />,
    });
  });

  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

  const [newKeyword, setnewKeyword] = useState('');
  const [showMic, setShowMic] = useState(true);
  const [granted, setGranted] = useState(true);

  const setnewKeywordHandler = data => {
    setnewKeyword(data);
    if (data) setShowMic(false);
    else setShowMic(true);
  };

  const addNewKeywordHandler = () => {
    if (!newKeyword) return;
    dispatch(ItemsAction.add(newKeyword));
    setnewKeyword('');
    setShowMic(true);
  };

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (result !== PermissionsAndroid.RESULTS.GRANTED) setGranted(false);
    };

    requestMicrophonePermission();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onItemSelected = id => {
    dispatch(ItemsAction.setSelected(id));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <HeeboText
          style={{
            textAlign: 'right',
          }}>{`${newKeyword.length}/800`}</HeeboText>
        <HeeboText style={styles.topContainerHeader}>
          List all items others can rent, borrow or buy
        </HeeboText>
        <HeeboText style={styles.topContainerDescription}>
          {introdata}
        </HeeboText>
        <View style={styles.inputContainer}>
          <TextInput
            blurOnSubmit={false}
            underlineColorAndroid={'white'}
            placeholder="Add Keyword.."
            value={newKeyword}
            onChangeText={setnewKeywordHandler}
            onSubmitEditing={addNewKeywordHandler}
            style={styles.textInput}
            color={Colors.primaryColor}
          />
          {granted && showMic && (
            <IconButton name={'mic'} onPress={openModal} />
          )}
          {(!granted || !showMic) && (
            <IconButton
              name={'add'}
              title={'ADD'}
              onPress={addNewKeywordHandler}
            />
          )}
        </View>
        {!items.filter(item => item.selected === true).length && (
          <View style={styles.browse}>
            <HeeboText style={styles.browseText}>Browse</HeeboText>
          </View>
        )}
        {!!items.filter(item => item.selected === true).length && (
          <View style={styles.selectAllCintainer}>
            <TouchableOpacity
              onPress={() => {
                dispatch(ItemsAction.selectAll());
              }}>
              <HeeboText style={{color: Colors.primaryColor}}>
                Select All
              </HeeboText>
            </TouchableOpacity>
            <HeeboText
              style={{
                color: 'lightgrey',
              }}>{`${
              items.filter(item => item.selected === true).length
            } selected`}</HeeboText>
            <IconButton
              name={'trash-bin-outline'}
              onPress={() => {
                dispatch(ItemsAction.deleteSelected());
              }}
              style={{backgroundColor: 'white'}}
            />
          </View>
        )}
        <View style={styles.scrollviewContainer}>
          <ScrollView contentContainerStyle={styles.scrollview}>
            {items.map(item => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                onPress={() => onItemSelected(item.id)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity style={styles.nextButton}>
            <HeeboText style={styles.nextButtonText}>{'>  Next'}</HeeboText>
          </TouchableOpacity>
        </View>
        {modalVisible && <VoiceRecognizer onPressOutside={closeModal} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  textInput: {
    width: 240,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginHorizontal: 10,
    paddingVertical: 0,
    fontFamily: 'Heebo-Medium',
  },
  scrollview: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  scrollviewContainer: {
    height: 300,
    borderTopWidth: 2,
    borderBottomWidth: 3,
    borderColor: 'whitesmoke',
    marginVertical: 5,
    paddingVertical: 10,
  },
  micViewText: {
    color: 'white',
    fontSize: 16,
  },
  dotsContainer: {
    height: 20,
    width: '100%',
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  browse: {
    width: 60,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: 'lightgrey',
    paddingVertical: 3,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  selected: {
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'lightgrey',
    padding: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },

  browseText: {
    color: Colors.primaryColor,
  },
  topContainerHeader: {
    color: Colors.primaryColor,
    fontSize: 18,
  },
  topContainerDescription: {
    color: 'lightgray',
    fontSize: 12,
  },
  nextButton: {
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    borderRadius: 50,
    padding: 10,
  },
  nextButtonText: {
    fontSize: 20,
    color: 'white',
  },
  nextButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  convertedText: {
    color: 'white',
    fontSize: 18,
  },
  selectAllCintainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    paddingLeft: 15,
    alignItems: 'center',
  },
});

export default NewItemScreen;
