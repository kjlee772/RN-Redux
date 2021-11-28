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

  const increaseCount = useCallback((para) => {
    console.log(para)
    setLocalCount(localCount + 1);
    dispatch(actions.increaseCount(para));
  }, [localCount, dispatch]);

  const decreaseCount = useCallback((para) => {
    console.log(para)

    setLocalCount(localCount - 1);
    dispatch(actions.decreaseCount(para));
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
      <Button onPress={()=>increaseCount('para')} title='+'>
      </Button>
      <Button onPress={()=>decreaseCount('para')} title='-'>
      </Button>
    </View>
  )
};

export default CountFC;