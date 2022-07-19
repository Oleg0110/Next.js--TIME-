import axios, { AxiosInstance } from 'axios';
import { useAppSelector } from '../hooks/redux';
import { token } from '../utils/constants';
import { BASIC_URL } from '../utils/httpLinks';
import { AuthResponse } from '../utils/interface/userInterface';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASIC_URL,
});

const ISSERVER = typeof window === 'undefined';
let isToken;
if (!ISSERVER) {
  // const { isAuth } = useAppSelector((state) => state.user);
  isToken = localStorage.getItem(token);
  // !!Problem
}
$api.interceptors.request.use((config) => {
  // console.log(11, isToken);
  config.headers.Authorization = `Bearer ${isToken}`;
  // console.log(config);

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
        const response = await axios.get<AuthResponse>(`${BASIC_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem(token, response.data.tokens.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Not authorization');
      }
    }
    throw error;
  }
);

export default $api;

// class ApiProviderStore {
//   private axiosWrapper: AxiosInstance;

//   userToken: any;

//   constructor() {
//     this.userToken = useAppSelector;
//     this.axiosWrapper = axios.create({ baseURL: BASIC_URL });
//   }

//   doFetch = () => {
//     const da = this.userToken((state) => state.user);
//     console.log(da);

//     this.axiosWrapper.interceptors.request.use((config) => {
//       console.log(11, isToken);
//       config.headers.Authorization = `Bearer ${isToken}`;
//       console.log(config);

//       return config;
//     });
//   };
// }

// export default ApiProviderStore;
