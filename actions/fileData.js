export const CHN_FILE_URI = 'fileData/CHN_FILE_URI';
export const CHN_FILE_NAME = 'fileData/CHN_FILE_NAME';
export const CHN_FILE_BASE64 = 'fileData/CHN_FILE_BASE64'
export const CHN_OCR_RESULT = 'fileData/CHN_OCR_RESULT';
export const CHK_SUBJECT = 'fileData/CHK_SUBJECT';
export const CHK_SUMMARY = 'fileData/CHK_SUMMARY';

export const MAKE_LIST = 'fileData/MAKE_LIST';

export const make_list = (para) => {
  return {
    type: MAKE_LIST,
    payload: para,
  }
}

export const chn_file_uri = (uri) => {
  return {
    type: CHN_FILE_URI,
    payload: uri,
  }
};

export const chn_file_name = (name) => {
  return {
    type: CHN_FILE_NAME,
    payload: name,
  }
};

export const chn_file_base64 = (base64) => {
  return {
    type: CHN_FILE_BASE64,
    payload: base64,
  }
};

export const chn_ocr_result = (result) => {
  return {
    type: CHN_OCR_RESULT,
    payload: result,
  }
};

export const chk_subject = (subject) => {
  return {
    type: CHK_SUBJECT,
    payload: subject,
  }
};

export const chk_summary = (summary) => {
  return {
    type: CHK_SUMMARY,
    payload: summary,
  }
};