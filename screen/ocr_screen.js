import React from 'react';
import { View, Text, Image, TextInput, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ocr_screen = ({ navigation }) => {


  return (
    <View style={{ flex: 1, backgroundColor: '#DCF5FA' }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', marginBottom: 5, justifyContent: 'center' }}>
          {/* <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 4, resizeMode: 'contain' }} source={{ uri: file_uri }} /> */}
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '80%' }}>
            <TextInput style={{ backgroundColor: 'pink', color: 'black', marginBottom: 5, textAlign: 'center', fontSize: 22, fontWeight: 'bold', borderRadius: 5 }}
              placeholder={'주제를 입력해주세요.'}
              placeholderTextColor={'black'}
            />
          </View>
          <View style={{ width: '99%' }}>
            <TextInput style={{ backgroundColor: 'white', color: 'black', borderWidth: 1, borderRadius: 5 }}
              placeholderTextColor={'black'} multiline={true}
            />
          </View>
          <View style={{ width: '99%' }}>
            <TextInput style={{ backgroundColor: 'white', color: 'black', borderWidth: 1, borderRadius: 5 }}
              placeholderTextColor={'black'} multiline={true}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <TouchableOpacity style={styles.touch_btn}  ><Text style={styles.text_btn}>요약하기</Text></TouchableOpacity>
          <TouchableOpacity style={styles.touch_btn}  ><Text style={styles.text_btn}>저장하기</Text></TouchableOpacity>
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