import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApi = async api => {
  const token = await AsyncStorage.getItem('token');
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
//  console.log({token})
  return new Promise((resolve, reject) => {
    // console.log({api, config})
    axios(api, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const postApi = async (api, data) => {
  const token = await AsyncStorage.getItem('token');

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return new Promise((resolve, reject) => {
    console.log(api, data, config);
    axios
      .post(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const loginApi = async (api, data) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    console.log({api, data});
    axios
      .post(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const patchApi = async (api, data) => {
  const token = await AsyncStorage.getItem('token');
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  };

  return new Promise((resolve, reject) => {
    console.log({api, data, config});
    axios
      .patch(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

export const putApi = async (api, data) => {
  const token = await AsyncStorage.getItem('token');
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  return new Promise((resolve, reject) => {
    console.log({api, data, config});
    axios
      .put(api, data, config)
      .then(resolve)
      .catch(err => {
        reject(err.response);
        handleAuthorization(err.response?.status);
      });
  });
};

const handleAuthorization = status => {
  if (status !== 401) return;
  AsyncStorage.clear();
};

export const logOutApi = () => {
  console.log('clear token')
  AsyncStorage.clear();
}
