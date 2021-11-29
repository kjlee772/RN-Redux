import * as fileDataActions from '../actions/fileData';

const initialStates = {
  file_uri: '',
  file_base64: '',
  file_name: '',
}

const reducers = (state = initialStates, action) => {
  const { type } = action;

  switch (type) {
    case fileDataActions.CHN_FILE_URI: {
      console.log('uri', action);
      return {
        ...state,
        // file_uri: action.payload
      }
    }
    case fileDataActions.CHN_FILE_BASE64: {
      console.log('base64', action);
      return {
        ...state,
        // file_base64: action.payload
      }
    }
    case fileDataActions.CHN_FILE_NAME: {
      console.log('name', action);
      return {
        ...state,
        // file_name: action.payload
      }
    }
  }
}

export default reducers;