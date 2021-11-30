import React from 'react';
import { View } from 'react-native';

const loading = () => {
  return (
    <View style={{ backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    </View >
  )
}

export default loading;