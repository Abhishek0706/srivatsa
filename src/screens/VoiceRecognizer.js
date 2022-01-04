import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import GoogleCloudSpeechToText from 'react-native-google-cloud-speech-to-text';
import {useDispatch, useSelector} from 'react-redux';

import HeeboText from '../components/UI/HeeboText';
import Colors from '../constants/Colors';
import {apiKey} from '../../env';
import * as ItemsAction from '../store/itemsAction';

const VoiceRecognizer = ({onPressOutside}) => {
  const dispatch = useDispatch();
  const [convertedText, setConvertedText] = useState('');

  useEffect(() => {
    GoogleCloudSpeechToText.setApiKey(apiKey);
    GoogleCloudSpeechToText.onVoice(onVoice);
    GoogleCloudSpeechToText.onVoiceStart(onVoiceStart);
    GoogleCloudSpeechToText.onVoiceEnd(onVoiceEnd);
    GoogleCloudSpeechToText.onSpeechError(onSpeechError);
    GoogleCloudSpeechToText.onSpeechRecognized(onSpeechRecognized);
    GoogleCloudSpeechToText.onSpeechRecognizing(onSpeechRecognizing);

    startRecognizingHandler();

    return () => {
      stopRecognizingHandler();
      GoogleCloudSpeechToText.removeListeners();
    };
  }, []);

  const onSpeechError = _error => {
    console.log('onSpeechError: ', _error);
  };

  const onSpeechRecognized = result => {
    setConvertedText('');
    dispatch(ItemsAction.add(result.transcript));
  };

  const onSpeechRecognizing = result => {
    setConvertedText(result.transcript);
  };

  const onVoiceStart = _event => {};
  const onVoice = _event => {};
  const onVoiceEnd = () => {};

  const startRecognizingHandler = async () => {
    GoogleCloudSpeechToText.start({speechToFile: true});
  };
  const stopRecognizingHandler = async () => {
    GoogleCloudSpeechToText.stop();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onPressOutside}>
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View style={styles.bottomView}>
          <TouchableWithoutFeedback>
            <View style={styles.VoiceRecognizer}>
              <Text style={{fontSize: 24, color: 'white'}}>....</Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <HeeboText style={styles.convertedText}>
                  {convertedText}
                </HeeboText>
                <Text style={styles.micViewText}>Speak out Keywords !</Text>
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
  VoiceRecognizer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.micContainerColor,
    width: '100%',
    height: 200,
  },
  convertedText: {
    color: 'white',
    fontSize: 18,
  },
  micViewText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VoiceRecognizer;
