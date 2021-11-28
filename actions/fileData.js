export const CHN_FILE_URI = 'fileData/CHN_FILE_URI';
export const CHN_FILE_BASE64 = 'fileData/CHN_FILE_BASE64';
export const CHN_FILE_NAME = 'fileData/CHN_FILE_NAME';

export const chn_file_uri = (uri) => {
  return {
    type: CHN_FILE_URI,
    payload: uri,
  }
};

export const chn_file_base64 = (base64) => {
  return {
    type: CHN_FILE_BASE64,
    payload: base64,
  }
};

export const chn_file_name = (name) => {
  return {
    type: CHN_FILE_NAME,
    payload: name,
  }
};