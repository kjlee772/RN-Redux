import * as fileDataActions from '../actions/fileData';

const initialStates = {
  file_uri: '',
  file_name: '',
  file_base64: '',
  ocr_result: '',
  subject: '',
  summary: '',
  list_data: [],
}

const reducers = (state = initialStates, action) => {
  const { type } = action;

  switch (type) {
    case fileDataActions.MAKE_LIST: {
      return {
        ...state,
        list_data: action.payload,
      }
    }
    case fileDataActions.CHN_FILE_URI: {
      return {
        ...state,
        file_uri: action.payload,
      }
    }
    case fileDataActions.CHN_FILE_NAME: {
      return {
        ...state,
        file_name: action.payload,
      }
    }
    case fileDataActions.CHN_FILE_BASE64: {
      return {
        ...state,
        file_base64: action.payload,
      }
    }
    case fileDataActions.CHN_OCR_RESULT: {
      return {
        ...state,
        ocr_result: action.payload,
      }
    }
    case fileDataActions.CHK_SUBJECT: {
      return {
        ...state,
        subject: action.payload,
      }
    }
    case fileDataActions.CHK_SUMMARY: {
      return {
        ...state,
        summary: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default reducers;