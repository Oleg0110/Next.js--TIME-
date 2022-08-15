import axios from 'axios';
import { tokenLocalStorageName } from '../utils/constants';
import { BASIC_URL } from '../utils/httpLinks';
import { AuthResponse } from '../utils/interface/userInterface';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASIC_URL,
});

const ISSERVER = typeof window === 'undefined';

let currentToken;

if (!ISSERVER) {
  currentToken = localStorage.getItem(tokenLocalStorageName);
  // !!Problem
}

$api.interceptors.request.use((config) => {
  // console.log(11, currentToken);
  config.headers.Authorization = `Bearer ${currentToken}`;
  // console.log(config);

  return config;
});

$api.interceptors.response.use(
  (config) => {
    // console.log(2, config);
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${BASIC_URL}/refreshToken`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem(
          tokenLocalStorageName,
          response.data.tokens.accessToken
        );
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Not authorization');
      }
    }
    throw error;
  }
);

export default $api;
