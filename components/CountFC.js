import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions/count';

const CountFC = () => {
  const dispatch = useDispatch();
  const [localCount, setLocalCount] = useState(0);

  const { count: storeCount } = useSelector((state) => state.count);

  useEffect(() => {
    console.log('Component did mount.');
  }, []);

  const increaseCount = useCallback(() => {
    console.log('+')
    setLocalCount(localCount + 1);
    dispatch(actions.increaseCount());
  }, [localCount, dispatch]);

  const decreaseCount = useCallback(() => {
    console.log('-')
    setLocalCount(localCount - 1);
    dispatch(actions.decreaseCount());
  }, [localCount, dispatch]);

  return (
    <View>
      <View>
        <View>
          <Text>{`localCount: ${localCount}`}</Text>
        </View>
        <View>
          <Text>{`storeCount: ${storeCount}`}</Text>
        </View>
      </View>
      <Button onPress={()=>increaseCount()} title='+'>
      </Button>
      <Button onPress={()=>decreaseCount()} title='-'>
      </Button>
    </View>
  )
};

export default CountFC;