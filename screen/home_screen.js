import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from './loading';

import { useSelector, useDispatch, } from 'react-redux';
import * as actions from '../actions/fileData';

const home_screen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then(
        (key) => AsyncStorage.multiGet(key)
          .then(
            (values) => dispatch(actions.make_list(values.map(([key, value]) => [key, JSON.parse(value)])))
          )
          .catch(err => { throw err })
      )
      .catch(err => { throw err })
  }, [])

  const dispatch = useDispatch();

  const from = 'home';

  // const [file_uri, set_file_uri] = useState();
  const [file_base64, set_file_base64] = useState();
  // const [file_name, set_file_name] = useState();
  // const [ocr_result, set_ocr_result] = useState();

  const { file_uri: store_file_uri } = useSelector((state) => state.fileData);
  // const { file_name: store_file_name } = useSelector((state) => state.fileData);
  // const { ocr_result: store_ocr_result } = useSelector((state) => state.fileData);

  const [loading_flag, set_loading_flag] = useState(false);

  const image_option = {
    quality: 1,
    includeBase64: true,
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
        dispatch(actions.chn_file_uri(response['assets'][0].uri));
        set_file_base64(response['assets'][0].base64);
        dispatch(actions.chn_file_name(response['assets'][0].fileName));
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
        dispatch(actions.chn_file_uri(response['assets'][0].uri));
        set_file_base64(response['assets'][0].base64);
        dispatch(actions.chn_file_name(response['assets'][0].fileName));
      }
    });
  }

  const _edit_image = () => {
    console.log('edit image called');
    ImagePicker.openCropper({
      path: store_file_uri,
      width: Dimensions.get('window').width,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      dispatch(actions.chn_file_uri(image.path));
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
    if (store_file_uri) {
      return (
        <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => _edit_alert()} >
          <Image source={{ uri: store_file_uri }} style={styles.images} />
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

  const _move = () => {
    navigation.navigate('Storage')
  }

  const _ocr = () => {
    // navigation.navigate('Ocr');
    if (file_base64) {
      console.log('ocr called');
      set_loading_flag(true);
      fetch('http://221.158.52.168:3001/new_ocr', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          file_base64: file_base64,
        })
      })
        .then(res => res.json())
        .then(res => {
          dispatch(actions.chn_ocr_result(res.Res));
          set_loading_flag(false);
        })
        .then(() => {
          navigation.navigate('Ocr', { from: from });
        })
        .catch(err => {
          console.log('Ocr problem: ' + err.message, err.code);
          set_loading_flag(false);
          return Alert.alert(
            '다시 시도해주세요',
            '',
            [
              {
                text: '예'
              }
            ]
          )
        })
    }
    else {
      return Alert.alert(
        '사진을 선택해주세요', '',
        [{ text: 'OK' }],
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_image}>
        {_render_image()}
      </View>
      <View style={styles.view_menu}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={[styles.touch_btn, { marginRight: 10 }]}
            onPress={() => _launch_camera()}
          ><Text style={styles.text_btn}>사진 촬영하기</Text></TouchableOpacity>
          <TouchableOpacity style={styles.touch_btn}
            onPress={() => _choose_image()}
          ><Text style={styles.text_btn}>사진 불러오기</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.touch_btn, { marginBottom: 10, width: 200 }]}
          onPress={() => _ocr()}
        ><Text style={styles.text_btn}>텍스트 추출하기</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.touch_btn, { width: 120 }]}
          onPress={() => _move()}
        ><Text style={styles.text_btn}>저장소</Text></TouchableOpacity>
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