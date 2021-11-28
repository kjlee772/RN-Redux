import * as countActions from '../actions/count';

const initialStates = {
  count: 0,
  
}

const reducers = (state = initialStates, action) => {
  const { type } = action;
  switch (type) {
    case countActions.INCREASE_COUNT: {
      console.log(action);
      return {
        ...state,
        count: state.count + 1,
      }
    }
    case countActions.DECREASE_COUNT: {
      console.log(action);
      return {
        ...state,
        count: state.count - 1,
      }
    }
    default: {
      return state;
    }
  }
}

export default reducers;