export const INCREASE_COUNT = 'count/INCREASE_COUNT';
export const DECREASE_COUNT = 'count/DECREASE_COUNT';

export const SET_COUNT = 'count/SET_COUNT';

// Action creators
export const increaseCount = (para) => {
  return {
    type: INCREASE_COUNT,
    payload: para,
  }
};

export const decreaseCount = (para) => {
  return {
    type: DECREASE_COUNT,
    payload: para,
  }
};

export const setCount = () => {
  return {
    type: SET_COUNT,
  }
};