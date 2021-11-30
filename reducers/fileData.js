import * as fileDataActions from '../actions/fileData';

const initialStates = {
  file_uri: '',
  file_name: '',
  ocr_result: '임시 테스트 중',
  key: '',
  keys: [],
  subject: '임시 주제',
  summary: '임시 요약',
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
      // console.log('uri', action);
      return {
        ...state,
        file_uri: action.payload,
      }
    }
    case fileDataActions.CHN_FILE_NAME: {
      // console.log('name', action);
      return {
        ...state,
        file_name: action.payload,
      }
    }
    case fileDataActions.CHN_OCR_RESULT: {
      // console.log('ocr', action);
      return {
        ...state,
        ocr_result: action.payload,
      }
    }
    case fileDataActions.CHK_KEY: {
      return {
        ...state,
        key: action.payload,
      }
    }
    case fileDataActions.CHK_ALL_KEY: {
      return {
        ...state,
        keys: action.payload,
      }
    }
    case fileDataActions.CHK_SUBJECT: {
      return {
        ...state,
        keys: action.payload,
      }
    }
    case fileDataActions.CHK_SUMMARY: {
      return {
        ...state,
        keys: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default reducers;