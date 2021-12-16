import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, Dimensions, Vibration, BackHandler } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

import Loading from './loading';
import camera_img from '../camera.png';
import gallery_img from '../gallery.png';

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
    const backAction = () => {
      Vibration.vibrate(50)
      Alert.alert('앱을 종료하시겠습니까?', '', [
        {
          text: '확인',
          onPress: () => BackHandler.exitApp()
        },
        { text: '취소', }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [])

  const dispatch = useDispatch();

  const from = 'home';
  const [menu_visible, set_menu_visible] = useState(true);
  const [modal_visible, set_modal_visible] = useState(false);

  const { file_uri: store_file_uri } = useSelector((state) => state.fileData);
  const { file_base64: store_file_base64 } = useSelector((state) => state.fileData);

  const [loading_flag, set_loading_flag] = useState(false);

  const image_option = {
    quality: 1,
    includeBase64: true,
  }
  const _choose_image = () => {
    Vibration.vibrate(50)
    launchImageLibrary(image_option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
      }
      else {
        dispatch(actions.chn_file_uri(response['assets'][0].uri));
        dispatch(actions.chn_file_base64(response['assets'][0].base64));
        dispatch(actions.chn_file_name(response['assets'][0].fileName));
        _close_modal();
      }
    });
  }
  const _launch_camera = () => {
    Vibration.vibrate(50)
    launchCamera(image_option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode, response.errorMessage);
      }
      else {
        dispatch(actions.chn_file_uri(response['assets'][0].uri));
        dispatch(actions.chn_file_base64(response['assets'][0].base64));
        dispatch(actions.chn_file_name(response['assets'][0].fileName));
        _close_modal();
      }
    });
  }

  const _edit_image = () => {
    ImagePicker.openCropper({
      path: store_file_uri,
      width: Dimensions.get('window').width,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      dispatch(actions.chn_file_uri(image.path));
      dispatch(actions.chn_file_base64(image.data));
    }).catch((err) => {
      console.log('!!! edit error', err);
    });
  }

  const _edit_alert = () => {
    Vibration.vibrate(50);
    Alert.alert(
      '사진을 편집하겠습니까?',
      '',
      [
        {
          text: '예',
          onPress: () =>{_edit_image()},
        },
        {
          text: '아니오',
        }
      ]
    )
  }

  const _render_image = () => {
    if (store_file_base64) {
      return (
        <TouchableOpacity style={styles.render_image} onPress={() => _edit_alert()} >
          <Image source={{ uri: store_file_uri }} style={styles.images} />
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={styles.render_image}>
          <Text style={styles.render_image_text}>사진을{'\n'}선택해주세요</Text>
        </TouchableOpacity>
      );
    }
  }

  const _ocr = () => {
    // if (store_file_base64) {
    //   Vibration.vibrate(50)
    //   navigation.navigate('Ocr', { from: from });
    // }
    Vibration.vibrate(50)
    if (store_file_base64) {
      set_loading_flag(true);
      fetch('http://localhost:3001/new_ocr', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          file_base64: store_file_base64,
        })
      })
        .then(res => res.json())
        .then(res => {
          let processed_res = res.Res.replace(/\n/g, '');
          let split_res = processed_res.split('.');
          let del_space = []
          split_res.forEach(element => {
            let temp = element.replace(/^\s+|\s+$/g, '');
            temp = temp.concat('.')
            del_space.push(temp);
          });
          let final_res = del_space.join('\n');
          dispatch(actions.chn_ocr_result(final_res));
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

  const _open_modal = () => {
    Vibration.vibrate(50)
    set_menu_visible(false);
    set_modal_visible(true);
  }
  const _close_modal = () => {
    set_modal_visible(false);
    set_menu_visible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.view_image}>
        {_render_image()}
      </View>
      <View style={styles.view_menu}>
        {menu_visible
          ?
          <>
            <TouchableOpacity style={styles.touch_btn} onPress={() => _open_modal()}>
              <Text style={styles.text_btn}>사진 선택하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch_btn} onPress={() => _ocr()}>
              <Text style={styles.text_btn}>텍스트 추출하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch_btn} onPress={() => {Vibration.vibrate(50), navigation.navigate('Storage')}}>
              <Text style={styles.text_btn}>저장소</Text>
            </TouchableOpacity>
          </>
          :
          <></>
        }
      </View>
      {loading_flag ? <Loading /> : <></>}
      <Modal isVisible={modal_visible} backdropOpacity={0}
        animationIn='pulse' animationOut='slideOutDown'
        onBackButtonPress={() => _close_modal()} onBackdropPress={() => _close_modal()}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 3.71 }}></View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.touch_btn_dif} onPress={() => _launch_camera()}>
              <View style={{ alignItems: 'center' }}>
                <Image source={camera_img} resizeMode='contain' style={styles.dif_back} />
                <Text style={{ color: 'black', fontSize: 27, marginTop: -20 }}>카메라</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch_btn_dif} onPress={() => _choose_image()}>
              <View style={{ alignItems: 'center' }}>
                <Image source={gallery_img} resizeMode='contain' style={styles.dif_back} />
                <Text style={{ color: 'black', fontSize: 27, marginTop: -20 }}>갤러리</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  render_image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  render_image_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
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
    width: Dimensions.get('window').width / 2,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  },
  touch_btn_dif: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dif_back: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
  }
});

export default home_screen;