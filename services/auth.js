import { AuthSession, SecureStore, Constants } from 'expo';
import LOCAL_STORAGE from 'px/constants/local-storage';
import http from 'px/services/http';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import { AsyncStorage } from 'react-native';

const auth0Domain = `https://politixentral.auth0.com`;
const auth0ClientId = 'M8vNnfxiQPCk44riCwcVPQY79GmNUej_';

export async function authenticate(options) {
  const prompt = {};
  if (!!options && !!options.silent) prompt.prompt = 'none';

  const authUrl = getAuthUrl({ prompt });
  console.log('REDIRECT URL ');
  console.log('REDIRECT URL ', AuthSession.getRedirectUrl());
  console.log('REDIRECT URL ');
  const result = await AuthSession.startAsync({
    authUrl: authUrl
  });

  console.log('*** AUTH RESULT ***');
  console.log('*** AUTH RESULT ***', result);
  console.log('*** AUTH RESULT ***');

  if (result.type === 'success') {
    const sessionInfo = JSON.stringify(result.params);
    const asyncres = await AsyncStorage.setItem(LOCAL_STORAGE.SESSION_INFO, sessionInfo);
    console.log('RETURNING RESULT DATA');
    return {
      result,
      jsonSessionInfo: sessionInfo,
    };
  }

  throw (result);
}

export async function logout(options) {
  const redirectUrl = AuthSession.getRedirectUrl();
  const authUrl = `${auth0Domain}/v2/logout?` + queryString.stringify({
    client_id: auth0ClientId,
    returnTo: redirectUrl,
  });
  const result = await AuthSession.startAsync({ authUrl: authUrl });

  if (result.type === 'success') {
    await AsyncStorage.setItem(LOCAL_STORAGE.SESSION_INFO, '');
    await AsyncStorage.setItem(LOCAL_STORAGE.USER_INFO, '');
    return result;
  }

  throw (result);
}

export async function saveUserToServer({ params, deviceId }) {
  const idToken = params.id_token;
  const decoded = jwtDecode(idToken);
  const user = {
    email: decoded.email,
    auth0Id: decoded.sub,
    role: 'end-user',
    deviceId,
  };
  const saveres = await http.post('https://px-staging.herokuapp.com/users', { user });
  return saveres;
  // return await http.post('http://192.168.86.175:3000/users', { user });
}


function getAuthUrl(options) {
  const endpoint = (!!options && !!options.endpoint) ? options.endpoint : 'authorize';
  const prompt = (!!options && !!options.prompt) ? options.prompt : {};
  const redirectUrl = AuthSession.getRedirectUrl();

  return `${auth0Domain}/${endpoint}?` + queryString.stringify({
    client_id: auth0ClientId,
    response_type: 'token id_token',
    redirect_uri: redirectUrl,
    scope: 'openid email',
    audience: 'https://data-api.politixentral.com',
    nonce: 'xyz-123-px-pass-SecRetz__werd_complex',
    device: Constants.deviceName,
    ...prompt
  });
}
