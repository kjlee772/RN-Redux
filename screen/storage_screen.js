import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const storage_screen = ({ navigation }) => {

  return (
    <View>
      <Text>
        Storage
      </Text>
    </View>
  )
}

export default storage_screen;