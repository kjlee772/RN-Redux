import React, { useState, } from 'react';
import { View, Text, Image, TextInput, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch, } from 'react-redux';
import * as actions from '../actions/fileData';

const ocr_screen = (props) => {
  const dispatch = useDispatch();

  const from = props.route.params.from;

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
    const json_value = JSON.stringify(value);
    AsyncStorage.setItem(key, json_value)
      .then(() => {
        Alert.alert('저장 완료');
        console.log('save success!!');
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

  return (
    <View style={{ flex: 1, backgroundColor: '#DCF5FA' }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', marginBottom: 5, justifyContent: 'center' }}>
          <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 4, resizeMode: 'contain' }} source={{ uri: store_file_uri }} />
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '80%' }}>
            <TextInput style={{ backgroundColor: 'pink', color: 'black', marginBottom: 5, textAlign: 'center', fontSize: 22, fontWeight: 'bold', borderRadius: 5 }}
              placeholder={'주제를 입력해주세요.'}
              value={from === 'home' ? null : subject}
              placeholderTextColor={'black'}
              onChangeText={set_subject}
            />
          </View>
          <View style={{ width: '99%' }}>
            <TextInput style={{ backgroundColor: 'white', color: 'black', borderWidth: 1, borderRadius: 5 }}
              value={ocr_result}
              placeholderTextColor={'black'} multiline={true}
              onChangeText={set_ocr_result}
            />
          </View>
          <View style={{ width: '99%' }}>
            <TextInput style={{ backgroundColor: 'white', color: 'black', borderWidth: 1, borderRadius: 5 }}
              value={from === 'home' ? null : summary}
              placeholderTextColor={'black'} multiline={true}
              onChangeText={set_summary}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          {/* {this.state.from === 'storage'
            ? null
            : <TouchableOpacity style={styles.touch_btn} 
            // onPress={() => this.summary()} 
            ><Text style={styles.text_btn}>요약하기</Text></TouchableOpacity>
          } */}
          <TouchableOpacity style={styles.touch_btn}
            onPress={() => _save(store_file_name, data_object)}
          ><Text style={styles.text_btn}>저장하기</Text></TouchableOpacity>
        </View>
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
    width: 150,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ocr_screen;