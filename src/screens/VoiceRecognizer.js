import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GoogleCloudSpeechToText from 'react-native-google-cloud-speech-to-text';
import {useDispatch} from 'react-redux';
import {apiKey} from '../../env';
import HeeboText from '../components/UI/HeeboText';
import Colors from '../constants/Colors';
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
                {!!convertedText && (
                  <HeeboText style={styles.convertedText}>
                    {convertedText}
                  </HeeboText>
                )}
                {!convertedText && (
                  <Text style={styles.micViewText}>Speak out Keywords !</Text>
                )}
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
    backgroundColor: 'transparent',
  },
  VoiceRecognizer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.micContainerColor,
    width: '100%',
    height: 220,
  },
  convertedText: {
    color: 'white',
    fontSize: 18,
  },
  micViewText: {
    color: 'whitesmoke',
    fontSize: 18,
  },
});

export default VoiceRecognizer;
