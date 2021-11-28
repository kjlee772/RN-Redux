import * as fileDataActions from '../actions/fileData';

const initialStates = {
  file_uri: '',
  file_base64: '',
  file_name: '',
}

const reducers = (state=initialStates, action) => {
  const { type } = action;

  switch (type){
    case fileDataActions.CHN_FILE_URI: {
      console.log(action)
      return {
        ...state,
        // file_uri: action.payload
      }
    }
    case fileDataActions.CHN_FILE_BASE64: {

    }
    case fileDataActions.CHN_FILE_NAME: {

    }
  }
}