import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from './loading';

import * as actions from '../actions/fileData';

const home_screen = ({ navigation }) => {
  // const dispatch = useDispatch();

  const { temp: whatsthis } = useSelector((state) => state.file_uri);

  const [from, set_from] = useState('home');
  const [file_uri, set_file_uri] = useState();
  const [file_base64, set_file_base64] = useState();
  const [file_name, set_file_name] = useState();
  const [file_data, set_file_data] = useState();
  const [all_key, set_all_key] = useState();
  const [all_data, set_all_data] = useState();
  const [subject, set_subject] = useState();
  const [loading_flag, set_loading_flag] = useState(false);

  const image_option = {
    quality: 1,
    includeBase64: true,
  }

  const _get_all_keys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      set_all_key(keys);
      _get_multi_value();
    }
    catch (e) {
      console.log(e, '!!! get all key error')
    }
  }

  const _get_multi_value = async () => {
    let values;
    try {
      values = await AsyncStorage.multiGet(all_key);
      let new_value = values.map(([key, value]) => [key, JSON.parse(value)]);
      set_all_data(new_value);
      _move_screen_storage();
    }
    catch (e) {
      console.log(e, '!!! get all value error')
    }
  }

  const _choose_image = () => {
    console.log('choose image called');
    launchImageLibrary(image_option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
      }
      else {
        // set_file_uri(response['assets'][0].uri);
        dispatch(actions(response['assets'][0].uri));
        set_file_base64(response['assets'][0].base64);
        set_file_name(response['assets'][0].fileName);
      }
    });
  }
  const _launch_camera = () => {
    console.log('launch camera called');
    launchCamera(image_option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
      }
      else {
        set_file_uri(response['assets'][0].uri);
        set_file_base64(response['assets'][0].base64);
        set_file_name(response['assets'][0].fileName);
      }
    });
  }

  const _edit_image = () => {
    console.log('edit image called');
    ImagePicker.openCropper({
      path: file_uri,
      width: 1024,
      height: 1024,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      set_file_uri(image.path);
      set_file_base64(image.data);
    }).catch((err) => {
      console.log('!!! edit error', err);
    });
  }

  const _edit_alert = () => {
    Alert.alert(
      '사진을 편집하겠습니까?',
      '',
      [
        {
          text: '예',
          onPress: () => _edit_image(),
        },
        {
          text: '아니오',
        }
      ]
    )
  }

  const _render_image = () => {
    if (file_uri) {
      return (
        <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => _edit_alert()} >
          <Image source={{ uri: file_uri }} style={styles.images} />
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: 'black', justifyContent: 'center' }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>사진을{'\n'}선택해주세요</Text>
        </TouchableOpacity>
      );
    }
  }

  const _move_screen_ocr = () => {
    navigation.navigate('Ocr', { file_name: file_name, file_uri: file_uri, file_data: file_data, subject: subject, from: from })
  }
  const _move_screen_storage = () => {
    navigation.navigate('Storage', { all_data: all_data, from: from })
  }
  const _move = () => {
    navigation.navigate('Storage')
  }

  const _ocr = () => {
    navigation.navigate('Ocr');
    // if (file_base64) {
    //   console.log('ocr called');
    //   set_loading_flag(true);
    //   fetch('http://:3001/new_ocr', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       file_base64: file_base64,
    //     })
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       set_file_data(res.Res);
    //       set_loading_flag(false);
    //     })
    //     .then(() => {
    //       _move_screen_ocr();
    //     })
    //     .catch(err => {
    //       console.log('Ocr problem: ' + err.message, err.code);
    //       set_loading_flag(false);
    //       return Alert.alert(
    //         '다시 시도해주세요',
    //         '',
    //         [
    //           {
    //             text: '예'
    //           }
    //         ]
    //       )
    //     })
    // }
    // else {
    //   return Alert.alert(
    //     '사진을 선택해주세요', '',
    //     [{ text: 'OK' }],
    //   )
    // }
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_image}>
        {_render_image()}
      </View>
      <View style={styles.view_menu}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={[styles.touch_btn, { marginRight: 10 }]} onPress={() => _launch_camera()} ><Text style={styles.text_btn}>사진 촬영하기</Text></TouchableOpacity>
          <TouchableOpacity style={styles.touch_btn} onPress={() => _choose_image()}><Text style={styles.text_btn}>사진 불러오기</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.touch_btn, { marginBottom: 10, width: 200 }]} onPress={() => _ocr()} ><Text style={styles.text_btn}>텍스트 추출하기</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.touch_btn, { width: 120 }]} onPress={() => _get_all_keys()} ><Text style={styles.text_btn}>저장소</Text></TouchableOpacity>
      </View>
      {loading_flag ?
        <Loading /> : <></>}
    </View>
  )
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	view_image: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		display: 'flex',
	},
	view_menu: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	images: {
		backgroundColor: 'black',
		resizeMode: 'contain',
		width: '100%',
		height: '100%',
	},
	text_btn: {
		fontSize: 27,
		fontWeight: 'bold',
	},
	touch_btn: {
		backgroundColor: 'gray',
		width: 170,
		height: 50,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
});

export default home_screen;