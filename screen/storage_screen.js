import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Alert, Vibration } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/fileData';

const storage_screen = ({ navigation }) => {
  const dispatch = useDispatch();

  const from = 'storage';

  const { list_data: store_list_data } = useSelector((state) => state.fileData);

  const _delete_alert = (key) => {
    Alert.alert(
      '해당 데이터를 삭제하시겠습니까?',
      '',
      [
        {
          text: '예',
          onPress: () => _delete_data(key),
        },
        {
          text: '아니오',
        },
      ],
    )
  }
  const _delete_data = async (key) => {
    AsyncStorage.removeItem(key)
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

  const _move = (value) => {
    Vibration.vibrate(50)
    dispatch(actions.chn_file_name(value.file_name))
    dispatch(actions.chn_file_uri(value.file_uri));
    dispatch(actions.chn_ocr_result(value.ocr_result));
    dispatch(actions.chk_subject(value.subject));
    dispatch(actions.chk_summary(value.summary));
    navigation.navigate('Ocr', { from: from })
  }

  if (store_list_data) {
    let temp = store_list_data.map(([key, value]) => {
      return (
        <TouchableOpacity
          onLongPress={() => _delete_alert(key)}
          onPress={() => _move(value)}
          key={key} style={{ marginBottom: 3, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.list_image} resizeMode='contain' source={{ uri: value.file_uri }} />
            <Text style={styles.list_name}>{value.subject}</Text>
          </View>
        </TouchableOpacity>
      )
    });
    if (Object.keys(temp).length < 1) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>저장된 데이터가 없습니다.</Text>
        </View>
      );
    }
    else {
      return (
        <ScrollView>
          <View >
            {temp}
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  list_image: { 
    width: Dimensions.get('window').width / 2, 
    height: Dimensions.get('window').width / 2, 
    backgroundColor: 'black'
  },
  list_name: { 
    fontSize: 22, 
    color: 'black', 
    fontWeight: 'bold', 
    marginLeft: 3 
  },

});

export default storage_screen;