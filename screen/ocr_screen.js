import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Alert, Vibration } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch, } from 'react-redux';
import * as actions from '../actions/fileData';

const ocr_screen = (props) => {
  useEffect(() => {
    if(from === 'home'){
      set_summary('');
    }
  }, [])

  const dispatch = useDispatch();

  const from = props.route.params.from;
  const [modal_visible, set_modal_visible] = useState(false);

  const { file_uri: store_file_uri } = useSelector((state) => state.fileData);
  const { file_name: store_file_name } = useSelector((state) => state.fileData);
  const { ocr_result: store_ocr_result } = useSelector((state) => state.fileData);
  const { subject: store_subject } = useSelector((state) => state.fileData);
  const { summary: store_summary } = useSelector((state) => state.fileData);

  const [ocr_result, set_ocr_result] = useState(store_ocr_result);
  const [subject, set_subject] = useState(store_subject);
  const [summary, set_summary] = useState(store_summary);

  const data_object = {
    file_uri: store_file_uri,
    file_name: store_file_name,
    ocr_result: ocr_result,
    subject: subject,
    summary: summary,
  }

  const _save = async (key, value) => {
    Vibration.vibrate(50)
    const json_value = JSON.stringify(value);
    AsyncStorage.setItem(key, json_value)
      .then(() => {
        Alert.alert('저장 완료');
      })
      .then(() => {
        AsyncStorage.getAllKeys()
          .then(
            (key) => AsyncStorage.multiGet(key)
              .then(
                (values) => dispatch(actions.make_list(values.map(([key, value]) => [key, JSON.parse(value)])))
              )
              .catch(err => { throw err })
          )
          .catch(err => { throw err })
      })
      .catch(err => { throw err; })
  }

  const _open_modal = () => {
    Vibration.vibrate(50)
    set_modal_visible(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DCF5FA' }}>
      <ScrollView>
        <View style={styles.view_image}>
          <Image style={styles.ocr_image} source={{ uri: store_file_uri }} />
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '80%' }}>
            <TextInput style={styles.text_subject}
              placeholder={'주제를 입력해주세요.'}
              value={from === 'home' ? null : subject}
              placeholderTextColor={'black'}
              onChangeText={set_subject}
            />
          </View>
          <View style={{ width: '99%' }}>
            <TextInput style={styles.text_main}
              value={ocr_result}
              placeholderTextColor={'black'} multiline={true}
              onChangeText={set_ocr_result}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <TouchableOpacity style={styles.touch_btn} onPress={() => _open_modal()}>
            <Text style={styles.text_btn}>요약</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch_btn} onPress={() => _save(store_file_name, data_object)}>
            <Text style={styles.text_btn}>저장</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={modal_visible} backdropOpacity={0.2}
          animationIn='pulse' animationOut='slideOutDown'
          onBackButtonPress={() => set_modal_visible(false)} onBackdropPress={() => set_modal_visible(false)}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput style={styles.text_summary}
              value={from === 'home' ? null : summary}
              placeholderTextColor={'black'} multiline={true}
              onChangeText={set_summary}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text_btn: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  touch_btn: {
    backgroundColor: 'gray',
    width: Dimensions.get('window').width/4,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  view_image: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center'
  },
  ocr_image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'contain'
  },
  text_subject: {
    backgroundColor: 'pink',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    borderRadius: 5
  },
  text_main: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  text_summary: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: Dimensions.get('window').height / 1.2
  },
});

export default ocr_screen;