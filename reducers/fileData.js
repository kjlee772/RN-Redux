import * as fileDataActions from '../actions/fileData';

const initialStates = {
  file_uri: '',
  file_name: '',
  file_base64: '',
  // ocr_result: '혈압은 사람의 건강과 관련한 중요한 지표로 사용되어 혈압 측정은 의료기관에서 가장 일반적으로 수행되는 검사이다.\n고혈압은 동맥경화, 뇌졸중, 심근경색과 같은 합병증을 유발한다.\n또한 저혈압은 두통, 현기증을 유발한다.\n따라서 이러한 피해를 예방하기 위해 정기적인혈압 검사가 중요하고, 이미 혈압과 관련한 질환을 가지고 있는 사람들에게는 특히 더 중요하다.\n중요성에도 불구하고 혈압 측정에는 여러 가지 문제가 있다.\n대부분 cuff를 이용한 혈압 측정 방식을 사용하며, 이 방식은 높은 측정 정확도를 제공하지만 몇 가지 단점도 존재한다.\n실험자는 측정값이 정확하도록 하게 하기 위해 일정한 측정 규칙을 따라야 하는데, 이러한 규칙은 실험자를 지루하게 할 수 있으며 시간과 노력이 많이 든다.\n이를 통해 측정 자체가 실험자에게 스트레스나 불안을 야기할 수 있으며, 이러한 요소는 측정된 혈압 값에 영향을 줄 수있다.\n앞서 언급한 요인들 때문에, 본 연구에서는 사용자에게 실시간으로 혈압을 측정하여 제공할 수 있는 혈압 측정 시스템을 개발하는데 초점을 맞추고 있다.\n웨어러블 기기의 센서를 이용하여 비침습적인 혈압 예측과, 불연속적인 혈압 측정에서 벗어난 연속적인 혈압 예측을 하고, 생체 데이터전처리 및 모델링을 통해 인공지능 모델의 Health-Care 적용 기술력을 확보할 것이다.\n3) 연구 방법\n본 연구와 관련하여 배재홍, 김민기는 충남대학교 Data Science 연구팀의 도움을 받아 머신러닝 방법론을 활용한 예측, 분석 모델을 조사 및 수립하였다.\n먼저 수집된 다양한 공개 데이터를 전처리 과정을 거친 후, 실험에 사용되는 각 머신러닝 모델들에 맞는 입력 값을 정의하였다.\n그 다음, 정의한 입력값을 여러 조건을 나누어 머신러닝 학습모델들에 학습시키고그 결과를 분석하였다.\n그 후 분석된 결과를 토대로 어떤 모델이 가장 우수한지, 그리고 실생활에 적용 가능한지 여부를 조사하였다.\n.',
  ocr_result: '혈압은 사람의 건강과 관련한 중요한 지표로 사용되어 혈압 측정은 의료기관에서 가장 일반적으로 수행되는 검사이다.\n고혈압은 동맥경화, 뇌졸중, 심근경색과 같은 합병증을 유발한다.\n또한 저혈압은 두통, 현기증을 유발한다.',
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