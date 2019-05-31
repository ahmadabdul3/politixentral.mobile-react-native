import http from 'px/services/http';
import { AsyncStorage, Alert } from 'react-native';
import LOCAL_STORAGE from 'px/constants/local-storage';
import { authenticate } from 'px/services/auth';
import AlertAsync from 'px/services/alert_async';

const baseUrl = 'https://px-staging.herokuapp.com/';
// const baseUrl = 'http://192.168.86.236:3000/';

export async function dataApiGet(resourceUrl, extraHeaders={}) {
  // try {
    const url = baseUrl + resourceUrl;
    const headers = await getHeaders();
    return http.get(url, { ...headers, ...extraHeaders });
  //   return result;
  // } catch (e) {
  //   console.log('e', e);
  //   if (!e.error.name === 'TokenExpiredError') throw (e);
  //   return AlertAsync(
  //     `Login Expired`,
  //     `Hi there! Looks like your login session expired, just tap 'Renew' to automatically renew it. You will NOT need to type in your email or password again.`,
  //     [
  //       { text: 'Cancel', onPress: () => {}, style: 'cancel' },
  //       { text: 'Renew', onPress: () => {}},
  //     ],
  //     { cancelable: false },
  //   ).then(async (r) => {
  //     if (r !== 'Renew') return {};
  //     const reauthResponse = await authenticate({ silent: true });
  //     const url = baseUrl + resourceUrl;
  //     const headers = await getHeaders();
  //     const result = await http.get(url, { ...headers, ...extraHeaders });
  //     return result;
  //   });
  // }
}

export async function dataApiPost(resourceUrl, data, extraHeaders={}) {
  const url = baseUrl + resourceUrl;
  const headers = await getHeaders();
  return http.post(url, data, { ...headers, ...extraHeaders });
}

export async function dataApiPatch(resourceUrl, data, extraHeaders={}) {
  const url = baseUrl + resourceUrl;
  const headers = await getHeaders();
  return http.patch(url, data, { ...headers, ...extraHeaders });
}

export async function dataApiPut(resourceUrl, data, extraHeaders={}) {
  const url = baseUrl + resourceUrl;
  const headers = await getHeaders();
  return http.put(url, data, { ...headers, ...extraHeaders });
}

export async function dataApiDelete(resourceUrl, data, extraHeaders={}) {
  const url = baseUrl + resourceUrl;
  const headers = await getHeaders();
  return http.delete(url, data, { ...headers, ...extraHeaders });
}

async function getHeaders() {
  const rawSession = await AsyncStorage.getItem(LOCAL_STORAGE.SESSION_INFO);
  if (!!rawSession === false) return {};
  const session = JSON.parse(rawSession);
  return { authorization: 'bearer ' + session.access_token };
}
