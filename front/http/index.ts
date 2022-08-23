import { tokenLocalStorageName } from '../utils/constants';
import { BASIC_URL } from '../utils/httpLinks';
import { AuthResponse } from '../utils/interface/userInterface';
import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASIC_URL,
});

const ISSERVER = typeof window === 'undefined';

let token;

if (!ISSERVER) {
  token = localStorage.getItem(tokenLocalStorageName);
}

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
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
